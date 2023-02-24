export default function Input({
  useRef,
  placeholder,
  onFocus,
  onBlur,
  onInput,
  mb0,
  width,
  height,
}) {
  function getHeight() {
    switch (height) {
      case 'lg':
        return ' h-40'
      case 'default':
        return ' h-32'
    }
  }

  return (
    <input
      ref={useRef}
      placeholder={placeholder}
      onFocus={onFocus}
      onBlur={onBlur}
      onInput={onInput}
      className={
        'block border border-gray-300 px-12 text-sm' +
        (mb0 ? ' mb-0' : ' mb-8') +
        (width ? ' w-' + width : ' w-full') +
        (height ? getHeight() : ' h-32')
      }
    />
  )
}
