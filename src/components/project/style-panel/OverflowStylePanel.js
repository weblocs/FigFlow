import React, {useState, useEffect} from "react";


export default function OverflowStylePanel () {
    return (
        <div className="style-panel-box">
            <div className="display-horizontal-grid">
                <div className="display-buttons-box">
                <div className="display-button">
                    <div className="text">V</div>
                </div>
                <div className="display-button">
                    <div className="text">H</div>
                </div>
                <div className="display-button">
                    <div className="text">S</div>
                </div>
                <div className="display-button">
                    <div className="text">Auto</div>
                </div>
                </div>
            </div>
        </div>
    )
}