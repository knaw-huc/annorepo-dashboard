import {Info as FeatherInfo} from "react-feather";

export function Info(props: { className?: string }) {
  let className = "inline";

  if (props.className) className += ` ${props.className}`;

  return <FeatherInfo className={className} size="16"/>
}