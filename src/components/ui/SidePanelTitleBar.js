export default function SidePanelTitleBar({ title, children }) {
  return (
    <div className="px-16 py-6 border-b sticky top-0 bg-white flex justify-between items-center z-10">
      <span className="text-md font-bold">{title}</span>
      {children}
    </div>
  )
}
