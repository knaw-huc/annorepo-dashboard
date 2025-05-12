export function Textarea(props: {
  value: string,
  label: string
  onChange: (value: string) => void
  disabled?: boolean
}) {
  return <div className="relative mt-5 h-full">
    <textarea
      placeholder={props.label}
      onChange={e => props.onChange(e.target.value)}
      disabled={props.disabled}
      id="textarea-with-label"
      rows={4}
      className="h-full block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
    >
      {props.value}
    </textarea>
  </div>
}