import React from "react";

export default function StylePanelTitle (props) {
    return (
        <div className="style-panel-box title-box">
      <div className="text panel-title">{props.title}</div>
    </div>
    )
}