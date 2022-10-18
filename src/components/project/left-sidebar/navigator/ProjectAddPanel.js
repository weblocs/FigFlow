import AddNodeButton from "./AddNodeButton";
import { useSelector } from "react-redux";

export default function ProjectAddPanel() {

    const activeTab = useSelector((state) => state.project.activeTab)

    return (
      <div className={"navigatorWrapper "+ ((activeTab === "Add") ? "active" : "" )}>
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