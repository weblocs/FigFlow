export default function Checkbox({ label, useRef, onInput }) {
  return (
    <label className="flex gap-6 text-sm mb-8">
      <input type="checkbox" ref={useRef} onChange={onInput} />
      {label}
    </label>
  )
}
