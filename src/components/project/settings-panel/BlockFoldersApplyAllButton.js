import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asignBlockFolderToNodes, asignBlockFolderToNodesWithOptions } from '../../../features/project'

export default function BlockFoldersApplyAllButton() {
    const activeStyleObject = useSelector((state) => state.project.activeStyleObject)

    const activeStyleName = useSelector((state) => state.project.stylesInActiveNode?.[0]?.name)
    const activeOptionName = useSelector((state) => state.project.stylesInActiveNode?.find(({id}) => id === state.project.activeStyleId)?.name)
    const activeOptionIndex = useSelector((state) => state.project.stylesInActiveNode?.findIndex(({id}) => id === state.project.activeStyleId))
    const activeOptionDefaultName = useSelector((state) => state.project.preRenderedStyles.find(({id}) => id === state.project.stylesInActiveNode?.[0]?.id)?.childrens?.[activeOptionIndex-1]?.defaultName)

    const dispatch = useDispatch()

    const [buttonText, setButtonText] = useState("Apply");
    const [buttonTextOption, setButtonTextOption] = useState("Apply");

    function handleClick() {
        dispatch(asignBlockFolderToNodes())
        setButtonText("Applied");
        setTimeout(() => {
            setButtonText("Apply");
        }, 2000)
    }

    function handleClickOption() {
        dispatch(asignBlockFolderToNodesWithOptions())
        setButtonTextOption("Applied");
        setTimeout(() => {
            setButtonTextOption("Apply");
        }, 2000)
    }

    return (
        <>
        {(activeOptionName !== undefined) ? 
        <div 
        onClick={handleClick}
        className='block-folders_apply-all-button'>
            <div>{buttonText} to all <span>{activeStyleName}s</span></div>
        </div>
        : <div></div>}
        {(activeOptionName !== activeStyleName) ?
        <div 
        onClick={handleClickOption}
        className='block-folders_apply-all-button'>
            <div>{buttonTextOption} to all <span>{activeStyleName}s.{activeOptionDefaultName}{activeOptionDefaultName && "-"}{activeOptionName}</span></div>
        </div>
        : <div></div>}
        </>
    )
}