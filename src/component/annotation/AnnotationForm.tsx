import {InputWithLabel} from "../common/InputWithLabel.tsx";
import noop from "lodash/noop";
import {MR, usePost} from "../../client/query/usePost.tsx";
import {H1} from "../common/H1.tsx";
import {Button} from "../common/Button.tsx";
import {ArAnnotation} from "../../client/ArModel.ts";
import {toName} from "../../util/toName.ts";

const defaultAnnotation = {
  "@context": "http://www.w3.org/ns/anno.jsonld",
  "type": "Annotation",
  "body": {
    "type": "TextualBody",
    "value": "quisque efficitur vel nunc eget vehicula sagittis maecenas tellus nec lobortis nisl nibh nisl ut malesuada libero duis lorem fringilla phasellus porttitor fusce ac nunc pretium tellus maecenas dapibus dolor tristique efficitur ut aenean montes gravida rhoncus ornare metus praesent integer vehicula dolor ipsum sed ornare dis sodales orci nisi maecenas varius ultrices a risus integer condimentum nam augue odio aliquam nec cursus maecenas montes penatibus iaculis interdum egestas imperdiet dolor lobortis quisque hendrerit maecenas ut dignissim vehicula dis pulvinar nulla fringilla amet",
    "purpose": "classifying"
  },
  "target": "http://www.example.com/world.html",
  "name": "http://localhost:8080/w3c/foo/lorem-ipsum-2"
}

export function AnnotationForm(props: {
  containerName: string,
  onClose: () => void
  onCreate: (annotationName: string) => void
}) {
  const createAnnotation: MR<ArAnnotation> = usePost('/w3c/{containerName}')

  const handleSubmit = () => {
    createAnnotation.mutate({
      params: {path: {containerName: props.containerName}},
      body: defaultAnnotation as unknown as string,
    }, {
      onSuccess: (data) => props.onCreate(toName(data.id))
    })
  }

  return <>
    <H1>Annotation form</H1>
    <form
      onSubmit={handleSubmit}
    >
      <InputWithLabel
        value={props.containerName} label="Container"
        disabled
        onChange={noop}
      />
      <Button onClick={handleSubmit}>Create</Button>
      <Button onClick={props.onClose}>Close</Button>
    </form>
  </>
}