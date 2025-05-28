import {InputWithLabel} from "../common/form/InputWithLabel.tsx";
import {MR, usePost} from "../../client/query/usePost.tsx";
import {H1} from "../common/H1.tsx";
import {Button} from "../common/Button.tsx";
import {ArContainer} from "../../client/ArModel.ts";
import {toName} from "../../util/toName.ts";
import {useState} from "react";
import cloneDeep from "lodash/cloneDeep";
import {isString} from "lodash";
import {useQueryClient} from "@tanstack/react-query";

export function ContainerEditor(props: {
  onClose: () => void
  onCreate: (annotationName: string) => void
}) {
  const queryClient = useQueryClient()

  const [slug, setSlug] = useState('')
  const [form, setForm] = useState(cloneDeep(defaultForm))
  const [error, setError] = useState<string>('')

  const createContainer: MR<ArContainer> = usePost('/w3c')

  const handleSubmit = () => {
    if (error) {
      return;
    }
    const mutationBody = {
      ...form,
      // openapi type says string but AR api expects json:
      type: JSON.parse(form.type)
    } as unknown as string;

    createContainer.mutate({
      params: {
        header: {Slug: slug}
      },
      body: mutationBody,
    }, {
      onSuccess: async (data) => {
        props.onCreate(toName(data.id));
        await queryClient.invalidateQueries({queryKey: ['/my/containers']})
        props.onCreate(toName(data.id));
      }
    })
  }

  function handleChangeFormType(
    update: string
  ) {
    let parsed: any;
    let errorUpdate = ''
    try {
      parsed = JSON.parse(update);
      if (
        !Array.isArray(parsed)
        || !parsed.every(el => isString(el))
      ) {
        errorUpdate = 'Please enter an array of strings'
      }
    } catch (e) {
      errorUpdate = 'Please enter valid json'
    }
    setError(errorUpdate)
    setForm(prev => ({...prev, type: update}));
  }

  return <>
    <form
      onSubmit={handleSubmit}
    >
      <div>
        <H1>Create container</H1>
        <div className="grid grid-cols-2 gap-5">

          <div>
            <InputWithLabel
              value={form.label}
              label="Label"
              onChange={label => setForm(prev => ({...prev, label}))}
              className="mt-5"
            />

            <InputWithLabel
              value={slug || ''}
              label="Name"
              onChange={slug => setSlug(slug)}
              className="mt-5"
            />
            <div className="mt-5">
              <InputWithLabel
                label="Type"
                errorLabel={error}
                value={form.type}
                onChange={handleChangeFormType}
              />
            </div>
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

        </div>
      </div>
    </form>
  </>
}

const defaultForm: ContainerPost = {
  '@context': [
    'http://www.w3.org/ns/anno.jsonld',
    'http://www.w3.org/ns/ldp.jsonld'
  ],
  type: '["Annotation", "SomethingElse"]',
  label: '',
  readOnlyForAnonymousUsers: true,
}

type ContainerPost = Omit<
  ArContainer,
  | 'id' | 'via' | 'last' | 'first' | 'total' | 'type'
> & {
  // String needs to be converted in json array:
  type: string
};
