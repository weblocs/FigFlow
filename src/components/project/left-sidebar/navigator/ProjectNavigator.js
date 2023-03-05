import { useSelector } from 'react-redux'
import NavigationNodeFolder from './NavigationNodeFolder'
import AddPanel from './AddPanel'

export default function ProjectNavigator() {
  const preRenderedHTMLNodes = useSelector(
    (state) => state.project.preRenderedHTMLNodes
  )
  const activeTab = useSelector((state) => state.project.activeTab)

  if (activeTab === 'Navigator') {
    return (
      <div className={'navigatorWrapper active'}>
        <AddPanel />

        <div className="side-panel-title">Navigator</div>
        <div
          id="nodes-navigator"
          style={{
            overflowX: 'hidden',
            overflowY: 'scroll',
          }}
        >
          {preRenderedHTMLNodes.map((node) => (
            <NavigationNodeFolder
              parents={[]}
              node={node}
              depth={0}
              key={node.id}
            />
          ))}
        </div>
      </div>
    )
  }
}
