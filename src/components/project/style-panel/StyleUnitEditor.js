export default function StyleUnitEditor ({unitEditorOpened}) {
    return (
        <div className={"style-edit-unit-list" + ((unitEditorOpened) ? " active" : "")}>
            <div className="style-edit-unit-item">
                px
            </div>
            <div className="style-edit-unit-item active">
                %
            </div>
            <div className="style-edit-unit-item">
                em
            </div>
        </div>
    )
}