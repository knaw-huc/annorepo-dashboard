import {InputWithLabel} from "../common/InputWithLabel.tsx";
import noop from "lodash/noop";
import {MR, usePost} from "../../client/query/usePost.tsx";
import {H1} from "../common/H1.tsx";
import {Button} from "../common/Button.tsx";
import {ArAnnotation} from "../../client/ArModel.ts";
import {toName} from "../../util/toName.ts";
import {useState} from "react";
import cloneDeep from "lodash/cloneDeep";
import omit from "lodash/omit";
import {TextareaWithLabel} from "../common/TextareaWithLabel.tsx";
import {Warning} from "../common/Warning.tsx";

const defaultAnnotation: ArAnnotation = {
  "@context": "http://www.w3.org/ns/anno.jsonld",
  "type": "Annotation",
  "body": {
    "type": "TextualBody",
    "value": "quisque efficitur vel nunc eget vehicula sagittis maecenas tellus nec lobortis nisl nibh nisl ut malesuada libero duis lorem fringilla phasellus porttitor fusce ac nunc pretium tellus maecenas dapibus dolor tristique efficitur ut aenean montes gravida rhoncus ornare metus praesent integer vehicula dolor ipsum sed ornare dis sodales orci nisi maecenas varius ultrices a risus integer condimentum nam augue odio aliquam nec cursus maecenas montes penatibus iaculis interdum egestas imperdiet dolor lobortis quisque hendrerit maecenas ut dignissim vehicula dis pulvinar nulla fringilla amet",
    "purpose": "classifying"
  },
  "target": "http://www.example.com/world.html",
  "id": "to-generate-by-AR",
}

type FormAnnotation = Omit<ArAnnotation, 'body' | 'id'> & { body: string };

export function AnnotationForm(props: {
  containerName: string,
  onClose: () => void
  onCreate: (annotationName: string) => void
}) {
  const {containerName} = props;
  const [slug, setSlug] = useState('')
  const [form, setForm] = useState<FormAnnotation>(
    {
      ...cloneDeep(omit(defaultAnnotation, 'id')),
      body: JSON.stringify(defaultAnnotation.body, null, 2)
    }
  )
  const [error, setError] = useState<string>('')

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
      onSuccess: (data) => props.onCreate(toName(data.id))
    })
  }

  return <>
    <form
      onSubmit={handleSubmit}
    >
      <div>
        <H1>Annotation form</H1>
        <div className="grid grid-cols-2 gap-5">

          <div>
            <InputWithLabel
              value={containerName}
              label="Container"
              disabled
              onChange={noop}
            />

            <InputWithLabel
              value={slug || ''}
              label="Name"
              onChange={update => setSlug(update)}
            />
            <InputWithLabel
              value={form.target || ''}
              label="Target"
              onChange={update => setForm(prev => ({...prev, target: update}))}
            />
            <InputWithLabel
              value={form.type || ''}
              label="Type"
              onChange={update => setForm(prev => ({...prev, type: update}))}
            />
            <div className="mt-5">
              <span className="mr-5">
                <Button
                  disabled={!!error}
                  onClick={handleSubmit}
                >
                  Create
                </Button>
              </span>
              <Button onClick={props.onClose}>Close</Button>
            </div>
          </div>

          <div className="pb-5">
            {error && <Warning>{error}</Warning>}
            <TextareaWithLabel
              label="Body"
              value={form.body}
              onChange={update => {
                let parsed: string;
                try {
                  parsed = JSON.parse(update);
                  setError('')
                } catch (e) {
                  setError('Please enter valid json body')
                }
                setForm(prev => ({
                  ...prev,
                  body: JSON.stringify(parsed, null, 2)
                }));
              }}
            />
          </div>

        </div>
      </div>
    </form>
  </>
}