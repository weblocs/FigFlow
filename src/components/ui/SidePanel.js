export default function SidePanel({
  children,
  isActive,
  isFieldPanel,
  isScriptPanel,
  width,
}) {
  return (
    <div
      className={
        'overflow-y-scroll shrink-0 border-r bg-white h-full ' +
        (isActive ? 'block ' : 'none ') +
        (isFieldPanel ? 'absolute top-0 left-full z-50 h-full--24 ' : '') +
        (isScriptPanel ? 'h-full--32 ' : '') +
        (width !== undefined ? 'w-' + width : 'w-200')
      }
    >
      {children}
    </div>
  )
}
