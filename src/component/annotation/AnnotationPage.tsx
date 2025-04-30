import {PropsWithChildren} from "react";
import {H2} from "../common/H2.tsx";
import {ArAnnotationPage} from "../../client/ArModel.ts";
import {AnnotationCard} from "./AnnotationCard.tsx";

export function AnnotationPage(props: PropsWithChildren<{
  page: ArAnnotationPage
}>) {
  console.log('AnnotationPage', props.page)
  return <div>
    <H2>Annotations</H2>
    <div
      className="grid grid-cols-3 gap-5"
    >
      {props.page.items.map(item => <AnnotationCard key={item.id} annotation={item}/>)}
    </div>
  </div>
}

