import { useDispatch, useSelector } from "react-redux"
import PageListItem from "./PageListItem"

function PageListFolder({node,parents}) {
    const projectPageFolderStructure = useSelector((state) => state.project.projectPageFolderStructure)
    const dispatch = useDispatch()

    return (
        <div>
            <PageListItem node={node} parents={parents} />
            {(node.children && node?.expanded) && (
                node.children.map((child,index) => (
                    <PageListFolder key={child.id} node={child} parents={[...parents, {id: child.id}]} />
                ))
            )}
        </div>
    )
}

export default PageListFolder