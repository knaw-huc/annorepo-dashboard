export function CheckboxWithLabel(props: {
  label: string
  value: boolean
  onChange: (update: boolean) => void
}) {
  const {label, value, onChange} = props;
  return <div className="flex items-center mb-4">
    <input
      id="checkbox"
      type="checkbox"
      checked={value}
      onChange={() => onChange(!value)}
      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    />
    <label
      htmlFor="checkbox"
      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
    >
      {label}
    </label>
  </div>
}