import AddNodeButton from "./AddNodeButton";
import { useAppSelector } from "../../../../app/hooks";

export default function ProjectAddPanel() {

    const activeProjectTab = useAppSelector((state) => state.designerProjectState.activeProjectTab)

    return (
      <div className={"navigatorWrapper "+ ((activeProjectTab === "Add") ? "active" : "" )}>
        <div className="projectTabTitleBox">Add</div>
            <div style={{display: "flex", flexWrap: "wrap"}}>
                <AddNodeButton type="div" text="Div" />
                <AddNodeButton type="h" text="Heading" />
                <AddNodeButton type="p" text="Paragraph" />
                <AddNodeButton type="img" text="Image" />
                <AddNodeButton type="l" text="Link Block" />
                <AddNodeButton type="col" text="Collection" />
                <AddNodeButton type="sec" text="Section" />
                <AddNodeButton type="sym" text="Symbol" />
                <AddNodeButton type="rich" text="Rich Box" />
            </div>
            
      </div>
    )
}