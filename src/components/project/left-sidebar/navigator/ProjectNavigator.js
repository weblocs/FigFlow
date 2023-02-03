import { useSelector } from 'react-redux'
import NavigationNodeFolder from './NavigationNodeFolder'
import AddNodeButton from './AddNodeButton'

export default function ProjectNavigator() {
  const preRenderedHTMLNodes = useSelector(
    (state) => state.project.preRenderedHTMLNodes
  )
  const activeTab = useSelector((state) => state.project.activeTab)

  if (activeTab === 'Navigator') {
    return (
      <div className={'navigatorWrapper active'}>
        <div style={{ position: 'sticky', top: '0', zIndex: '1' }}>
          <div className="projectTabTitleBox">Add</div>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <AddNodeButton type="div" text="Div" />
            <AddNodeButton type="h" text="Heading" />
            <AddNodeButton type="p" text="Paragraph" />
            <AddNodeButton type="img" text="Image" />
            <AddNodeButton type="a" text="Text Link" />
            <AddNodeButton type="l" text="Link" />
            <AddNodeButton type="col" text="Collection" />
            <AddNodeButton type="sec" text="Section" />
            <AddNodeButton type="body" text="Body" />
          </div>
          <div className="projectTabTitleBox">Navigator</div>
        </div>

        <div
          id="nodes-navigator"
          style={{
            overflowX: 'hidden',
            overflowY: 'scroll',
            height: 'calc(100vh - 193px)',
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
