export function InputWithLabel(props: {
  value: string,

  label: string,
  errorLabel?: string

  disabled?: boolean,
  className?: string,

  onChange: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
}) {

  let className = 'relative'
  if (props.className) {
    className += ` ${props.className}`
  }

  let labelClassname = "absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
  labelClassname += props.errorLabel ? ' text-red-500' : ' text-gray-500';

  let inputClassname = "block rounded-md px-2 pb-2 pt-5 w-full text-sm bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 peer"
  inputClassname += props.disabled ? `  text-gray-600` : ` text-gray-900`

  const label = props.errorLabel
    ? `${props.label}: ${props.errorLabel}`
    : props.label

  return <div className={className}>
    <input
      disabled={!!props.disabled}
      type="text"
      id="floating_filled"
      className={inputClassname}
      value={props.value}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      onChange={e => props.onChange(e.target.value)}
    />
    <label
      htmlFor="floating_filled"
      className={labelClassname}
    >
      {label}
    </label>
  </div>
}