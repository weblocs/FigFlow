import { useSelector } from 'react-redux'
import NodeStyleItem from './NodeStyleItem'

export default function NodeStylesList() {
    const preRenderedStyles = useSelector((state) => state.project.preRenderedStyles)
    const stylesInActiveNode = useSelector((state) => state.project.stylesInActiveNode)

    return (
        <>
            {preRenderedStyles.find(({id}) => id === stylesInActiveNode?.[0]?.id)?.childrens.map((child,index) => {
                    return (
                        <NodeStyleItem child={child} index={index} key={child.id} />
                    )
            })}
        </>
    )
}