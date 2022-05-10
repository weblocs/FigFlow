import React from "react";

import SpacingStyleButton from "./SpacingStyleButton"


export default function SizeStylePanel () {

    return (
        <div className="style-panel-box">
            <div className="_2-col-style-grid">
            <div className="size-style-box">
                <div className="style-title-box">
                <div className="text">Width</div>
                </div>
                <div className="input">
                    <SpacingStyleButton style="width" />
                </div>
            </div>
            <div className="size-style-box">
                <div className="style-title-box">
                <div className="text">Height</div>
                </div>
                <div className="input">
                <SpacingStyleButton style="height" />
                </div>
            </div>
            <div className="size-style-box">
                <div className="style-title-box">
                <div className="text">Min W</div>
                </div>
                <div className="input">
                <SpacingStyleButton style="min_width" />
                </div>
            </div>
            <div className="size-style-box">
                <div className="style-title-box">
                <div className="text">Min H</div>
                </div>
                <div className="input">
                <SpacingStyleButton style="min_height" />
                </div>
            </div>
            <div className="size-style-box">
                <div className="style-title-box">
                <div className="text">Max W</div>
                </div>
                <div className="input">
                <SpacingStyleButton style="max_width" />
                </div>
            </div>
            <div className="size-style-box">
                <div className="style-title-box">
                <div className="text">Max H</div>
                </div>
                <div className="input">
                <SpacingStyleButton style="max_height" />
                </div>
            </div>
            </div>
        </div>
    )
}