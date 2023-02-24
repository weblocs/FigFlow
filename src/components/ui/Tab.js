export default function Tab({ text, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      className={
        'px-8 py-4 text-sm capitalize pointer rounded ' +
        (isActive ? 'bg-gray-300' : 'bg-gray-200')
      }
    >
      {text}
    </div>
  )
}
