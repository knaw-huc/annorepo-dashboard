import {Search as SearchIcon} from "react-feather";

export function Search(props: { className?: string }) {
  let className = "inline align-text-top";

  if (props.className) className += ` ${props.className}`;

  return <SearchIcon className={className} size="16"/>
}