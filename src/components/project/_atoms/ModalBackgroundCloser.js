export default function ModalBackgroundCloser({handleClick, isActiveIf}) {
    return (
        <div 
        className={"unit-chooser_closer" + ((isActiveIf) ? " active" : "")}
            onClick={handleClick}>
        </div>
    )
}