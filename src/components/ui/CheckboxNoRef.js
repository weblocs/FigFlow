export default function CheckboxNoRef({ label, checked, onChange }) {
  return (
    <label className="flex gap-6 text-sm mb-8">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e)} />
      {label}
    </label>
  )
}
