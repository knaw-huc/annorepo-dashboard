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

export function AnnotationForm(props: {
  containerName: string,
  onClose: () => void
  onCreate: (annotationName: string) => void
}) {
  const {containerName} = props;
  const [slug, setSlug] = useState('')
  const [form, setForm] = useState(cloneDeep(defaultForm))
  const [error, setError] = useState<string>('')
  const queryClient = useQueryClient()
  const createAnnotation: MR<ArAnnotation> = usePost('/w3c/{containerName}')

  const handleSubmit = () => {
    if (error) {
      return;
    }
    const toSubmit = {...form, body: JSON.parse(form.body)}

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
          predicate: (query) =>
            JSON.stringify(query.queryKey).includes(containerName)
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
              value={form.target || ''}
              label="Target"
              onChange={update => setForm(prev => ({...prev, target: update}))}
              className="mt-5"
            />
            <InputWithLabel
              value={form.type || ''}
              label="Type"
              onChange={update => setForm(prev => ({...prev, type: update}))}
              className="mt-5"
            />
            <div className="mt-5">
              <Button
                disabled={!!error}
                onClick={handleSubmit}
                className="mr-5"
              >
                Create
              </Button>
              <Button onClick={props.onClose}>Close</Button>
            </div>
          </div>

          <div className="pb-5">
            {error && <Warning>{error}</Warning>}
            <Textarea
              label="Body"
              value={form.body}
              onChange={update => {
                let parsed: any;
                try {
                  parsed = JSON.parse(update);
                  setError('')
                } catch (e) {
                  setError('Please enter valid json body')
                }
                const body = JSON.stringify(parsed, null, 2);
                setForm(prev => ({...prev, body}));
              }}
            />
          </div>

        </div>
      </div>
    </form>
  </>
}

const defaultForm: AnnotationPost = {
  "@context": "http://www.w3.org/ns/anno.jsonld",
  type: "Annotation",
  body: JSON.stringify({
    value: "",
    type: "TextualBody",
    purpose: "classifying"
  }, null, 2),
  target: "http://www.example.com/world.html",
}

type AnnotationPost = Omit<ArAnnotation, 'body' | 'id'> & { body: string };
