export function Textarea(props: {
  value: string,
  label: string
  onChange: (value: string) => void
  disabled?: boolean
  className?: string
}) {
  let textareaClassname =  "h-full block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
  if(props.disabled) {
    textareaClassname += `  cursor-not-allowed`
  }
  return <div className={`relative h-full ${props.className}`}>
    <textarea
      placeholder={props.label}
      onChange={e => props.onChange(e.target.value)}
      disabled={props.disabled}
      id="textarea-with-label"
      rows={4}
      className={textareaClassname}
      value={props.value}
    >
    </textarea>
  </div>
}