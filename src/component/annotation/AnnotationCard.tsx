import {ArAnnotation} from "../../client/ArModel.ts";
import {Card} from "../common/Card.tsx";
import {toName} from "../../util/toName.ts";
import {Pipe} from "../common/Pipe.tsx";
import {A} from "../common/A.tsx";
import {External} from "../common/icon/External.tsx";
import {H5} from "../common/H5.tsx";
import {isUrl} from "../../util/isUrl.ts";
import {Hr} from "../common/Hr.tsx";
import ReactJsonView from '@microlink/react-json-view'
import {H6} from "../common/H6.tsx";
import {useState} from "react";
import {Down} from "../common/icon/Down.tsx";
import {Next} from "../common/icon/Next.tsx";

export function AnnotationCard(props: {
  annotation: ArAnnotation
}) {
  const {annotation} = props;
  const name = toName(annotation.via || annotation.id);
  const [isBodyOpen, setBodyOpen] = useState(false);
  const [isTargetOpen, setTargetOpen] = useState(false);
  return <Card
    header={<H5>
      {name}
      <Pipe/>
      {annotation.type}
    </H5>}
    footer={
      <>
        <A href={annotation.id}>Raw <External className="ml-1"/></A>
        {isUrl(annotation.target) &&
          <>
            <Pipe/>
            <A href={annotation.target as string}>
            <span title={annotation.target as string}>
              Target <External className="ml-1"/>
            </span>
            </A>
          </>}
      </>}
  >
    <H6
      className="cursor-pointer select-none"
      onClick={() => setBodyOpen(prev => !prev)}
    >
      Body {isBodyOpen ? <Down/> : <Next/>}
    </H6>
    {isBodyOpen && <ReactJsonView
      src={annotation.body}
      name={null}
    />}
    <Hr size="sm"/>
    <H6
      className="cursor-pointer select-none"
      onClick={() => setTargetOpen(prev => !prev)}
    >
      Target {isTargetOpen ? <Down/> : <Next/>}
    </H6>
    {isTargetOpen && annotation.target && !isUrl(annotation.target) &&
      <ReactJsonView
        src={annotation.target as object}
        name={null}
      />}
  </Card>
}