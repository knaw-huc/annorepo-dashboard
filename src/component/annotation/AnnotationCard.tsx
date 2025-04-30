import {ArAnnotation} from "../../client/ArModel.ts";
import {Card} from "../common/Card.tsx";
import {toName} from "../../util/toName.ts";
import {Pipe} from "../common/Pipe.tsx";
import {A} from "../common/A.tsx";
import {External} from "../common/icon/External.tsx";
import {H5} from "../common/H5.tsx";

export function AnnotationCard(props: {
  annotation: ArAnnotation
}) {
  const {annotation} = props;
  const name = toName(annotation.via || annotation.id);
  return <Card
    header={<H5>
      {name}
      <Pipe/>
      {annotation.type}
    </H5>}
    footer={
      <>
        <A href={annotation.id}>Source <External/></A>
        <Pipe/>
        <A href={annotation.target}>Target <External/></A>
      </>}
  >
    <pre className="mt-2 whitespace-pre-wrap">{JSON.stringify(annotation.body, null, 2)}</pre>
  </Card>
}