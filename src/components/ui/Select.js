export default function Select({
  options,
  useRef,
  placeholder,
  onFocus,
  onBlur,
  onInput,
  mb0,
  width,
}) {
  return (
    <select
      ref={useRef}
      onFocus={onFocus}
      onBlur={onBlur}
      onInput={onInput}
      className={
        'block border border-gray-300 px-8 text-sm h-32' +
        (mb0 ? ' mb-0' : ' mb-8') +
        (width ? ' w-' + width : ' w-full')
      }
    >
      {options.map((option, i) => (
        <option key={option.value + i} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
