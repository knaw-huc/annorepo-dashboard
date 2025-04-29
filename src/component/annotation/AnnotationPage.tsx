import {PropsWithChildren} from "react";
import {H2} from "../common/H2.tsx";
import {ArAnnotation, ArAnnotationPage} from "../../client/ArModel.ts";
import {toName} from "../../util/toName.ts";
import {Pipe} from "../common/Pipe.tsx";
import {External} from "../common/icon/External.tsx";
import {A} from "../common/A.tsx";
import {Card} from "../common/Card.tsx";

export function AnnotationPage(props: PropsWithChildren<{
  page: ArAnnotationPage
}>) {

  return <div>
    <H2>Annotations</H2>
    <div
      className="grid grid-cols-3 gap-5"
    >
      {props.page.items.map(item => <Annotation key={item.id} annotation={item}/>)}
    </div>
  </div>
}

export function Annotation(props: {
  annotation: ArAnnotation
}) {
  const {annotation} = props;
  return <Card>
    <p className="font-bold">
      {toName(new URL(annotation.via ?? annotation.id))}
      <Pipe/>
      {annotation.type}
      <Pipe/>
      <A href={annotation.id}>Source <External/></A>
      <Pipe/>
      <A href={annotation.target}>Target <External/></A>
    </p>
    <pre className="mt-2">{JSON.stringify(annotation.body, null, 2)}</pre>
  </Card>
}