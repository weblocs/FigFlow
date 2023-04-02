export default function Button({
  text,
  onClick,
  submit,
  isFullWidth,
  type,
  size,
}) {
  function handleClick() {
    if (submit !== true) {
      event.preventDefault()
      onClick()
    }
  }

  function getTypeStyles() {
    switch (type) {
      case 'danger':
        return 'border border-red-200 bg-red-200 hover-bg-red-300 text-white'
      case 'action':
        return 'border border-blue-200 bg-blue-200 hover-bg-blue-300 text-white'
      case 'white':
        return ' border bg-white hover-bg-gray-100'
      default:
        return ' border bg-white hover-bg-gray-100'
    }
  }

  function getSizeStyles() {
    switch (size) {
      case 'sm':
        return ' px-10 py-6 '
      default:
        return ' px-16 py-8 rounded'
    }
  }

  if (submit === true) {
    return (
      <button
        onClick={handleClick}
        className={
          'text-sm capitalize pointer flex items-center ' +
          (isFullWidth ? ' w-full' : '') +
          getTypeStyles() +
          getSizeStyles()
        }
      >
        {text}
      </button>
    )
  } else {
    return (
      <div
        onClick={handleClick}
        className={
          'text-sm capitalize pointer flex items-center ' +
          (isFullWidth ? ' w-full' : '') +
          getTypeStyles() +
          getSizeStyles()
        }
      >
        {text}
      </div>
    )
  }
}
