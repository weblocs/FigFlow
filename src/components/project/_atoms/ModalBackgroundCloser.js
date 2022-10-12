export default function ModalBackgroundCloser({handleClick, isActiveIf}) {
    
    if (isActiveIf) {
    return (
        <div 
        className={"unit-chooser_closer active"}
            onClick={handleClick}>
        </div>
    )
    }
}