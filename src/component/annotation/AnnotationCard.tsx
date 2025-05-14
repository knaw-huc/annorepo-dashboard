import {ArAnnotation} from "../../client/ArModel.ts";
import {Card} from "../common/Card.tsx";
import {toName} from "../../util/toName.ts";
import {Pipe} from "../common/Pipe.tsx";
import {A} from "../common/A.tsx";
import {External} from "../common/icon/External.tsx";
import {H5} from "../common/H5.tsx";
import {isUrl} from "../../util/isUrl.ts";
import {Info} from "../common/icon/Info.tsx";

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
        <A href={annotation.id}>Source <External className="ml-1"/></A>
        <Pipe/>
        {isUrl(annotation.target) ?
          <A href={annotation.target}>
            <span title={annotation.target}>
              Target <External className="ml-1"/>
            </span>
          </A>
          : <span className="cursor-pointer font-medium" title={JSON.stringify(annotation.target, null, 2)}>
            Target <Info className="ml-1"/>
          </span>}
      </>}
  >
    <pre
      className="mt-2 whitespace-pre-wrap">{JSON.stringify(annotation.body, null, 2)}</pre>
  </Card>
}