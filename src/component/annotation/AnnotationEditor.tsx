import {InputWithLabel} from "../common/form/InputWithLabel.tsx";
import noop from "lodash/noop";
import {MR, usePost} from "../../client/query/usePost.tsx";
import {H1} from "../common/H1.tsx";
import {Button} from "../common/Button.tsx";
import {ArAnnotation} from "../../client/ArModel.ts";
import {toName} from "../../util/toName.ts";
import {useState} from "react";
import cloneDeep from "lodash/cloneDeep";
import {Textarea} from "../common/form/Textarea.tsx";
import {Warning} from "../common/Warning.tsx";
import {useQueryClient} from "@tanstack/react-query";
import {invalidateBy} from "../../client/query/useGet.tsx";
import {useConfig} from "../ConfigProvider.tsx";
import {get, isString, set} from "lodash";
import {AnnotationEditorFieldType} from "../Config.ts";
import {
  useContainerFieldDistinctValues
} from "../../client/endpoint/useContainerFieldDistinctValues.tsx";
import {DropdownInput} from "../common/form/DropdownInput.tsx";

export function toDefaultAnnotationFieldValue(
  type: AnnotationEditorFieldType
): string {
  switch (type) {
    case "dateTime":
      return new Date().toISOString();
    case "text":
      return ""
    default:
      return ""
  }
}

export function AnnotationEditor(props: {
  containerName: string,
  onClose: () => void
  onCreate: (annotationName: string) => void
}) {
  const config = useConfig()
  const {containerName} = props;
  const [slug, setSlug] = useState('')

  const configFields = config.annotationEditor.fields

  const initialForm = cloneDeep(defaultAnnotation);
  configFields.forEach(field => {
    set(initialForm, field.path, toDefaultAnnotationFieldValue(field.type))
  })

  const [form, setForm] = useState(initialForm)
  const [bodyError, setBodyError] = useState<string>('')
  const queryClient = useQueryClient()
  const createAnnotation: MR<ArAnnotation> = usePost('/w3c/{containerName}')

  const typeSuggestions = useContainerFieldDistinctValues(containerName, 'type')
  const filteredTypeSuggestions = typeSuggestions.data
      ?.filter(suggestion => suggestion.includes(form.type))
    ?? []
  const handleSubmit = () => {
    if (bodyError) {
      return;
    }
    const toSubmit = {...form, body: form.body}

    // openapi type says string but AR api expects json:
    const mutationBody = toSubmit as unknown as string;

    createAnnotation.mutate({
      params: {
        path: {containerName},
        header: {Slug: slug}
      },
      body: mutationBody,
    }, {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({
          predicate: query => invalidateBy(query, 'containerName')
        })
        props.onCreate(toName(data.id));
      }
    })
  }

  return <>
    <form
      onSubmit={handleSubmit}
    >
      <div>
        <H1>Create annotation</H1>
        <div className="grid grid-cols-2 gap-5">

          <div>
            <InputWithLabel
              value={containerName}
              label="Container"
              disabled
              onChange={noop}
              className="mt-5"
            />

            <InputWithLabel
              value={slug || ''}
              label="Name"
              onChange={update => setSlug(update)}
              className="mt-5"
            />

            <InputWithLabel
              value={isString(form.target)
                ? form.target
                : JSON.stringify(form.target, null, 2)
              }
              label="Target"
              onChange={update => setForm(prev => ({...prev, target: update}))}
              className="mt-5"
            />

            <DropdownInput
              label="Type"
              value={form.type || ''}
              suggestions={filteredTypeSuggestions}
              onChange={update => setForm(prev => ({
                ...prev,
                type: update
              }))}
              className="mt-3"
            />

            {/*TODO: add suggestions*/}
            {configFields.map(lf => <InputWithLabel
                key={lf.path}
                value={get(form, lf.path) || ''}
                label={lf.label}
                onChange={update => setForm(prev => {
                  const next = {...prev}
                  set(next, lf.path, update);
                  return next
                })}
                className="mt-5"
                disabled={lf.type === 'dateTime'}
              />
            )}

            <div className="mt-5">
              <Button
                disabled={!!bodyError}
                onClick={handleSubmit}
                className="mr-5"
              >
                Create
              </Button>

              <Button onClick={props.onClose}>Close</Button>

            </div>
          </div>

          <div className="pb-5">
            {bodyError && <Warning>{bodyError}</Warning>}
            <Textarea
              label="Body"
              value={JSON.stringify(form.body, null, 2)}
              onChange={update => {
                let parsed: any;
                try {
                  parsed = JSON.parse(update);
                  setBodyError('')
                } catch (e) {
                  setBodyError('Please enter valid json')
                }
                setForm(prev => ({...prev, body: parsed}));
              }}
              className="mt-5"
            />
          </div>

        </div>
      </div>
    </form>
  </>
}

type AnnotationPost = Omit<ArAnnotation, 'id'>

const defaultAnnotation: AnnotationPost = {
  "@context": "http://www.w3.org/ns/anno.jsonld",
  type: "Annotation",
  body: {
    value: "",
    type: "TextualBody",
    purpose: "classifying"
  },
  target: "http://www.example.com/world.html",

}
