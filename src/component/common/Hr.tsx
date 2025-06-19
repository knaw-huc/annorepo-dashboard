export type Size = 'sm' | 'md';

export function Hr(props: {
  size?: Size
}) {
  const size = props.size || 'md'

  let className = "h-px bg-gray-200 border-0"
  switch (size) {
    case 'sm': className += '  mt-5 mb-5'; break;
    case 'md': className += '  mt-20 mb-12'; break;
  }
  return <hr className= {className}/>
}