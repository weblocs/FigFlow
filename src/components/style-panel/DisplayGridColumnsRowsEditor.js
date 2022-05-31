import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux'
import {editStyleInPreRenderedStyles} from "../../features/pre-rendered-html-nodes"

import { v4 as uuidv4 } from "uuid";


export default function DisplayGridColumnsRowsEditor (props) {

    const editStyle = "grid-template-columns";
    const activeStyleIndex = useSelector((state) => state.designerProjectState.activeStyleIndex)
    const displayStyle = useSelector((state) => state.designerProjectState.preRenderedStyles[activeStyleIndex]?.styles [editStyle])
    
    const dispatch = useDispatch()

    const [columns, setColumns] = useState([]);

    function handleAddColumn() {
        setColumns([...columns, {id: uuidv4(), size: "1fr"}]);
    }

    function handleDeleteColumn(columnId) {

        let deletedColumnIndex = columns.map(x => {
            return x.id;
          }).indexOf(columnId);
        
        setColumns(columns => columns.filter((column, i) => i !== deletedColumnIndex));
    }

    useEffect(() => {
        if(displayStyle !== undefined) {
            let initColumns = displayStyle.toString().split(/\s+/);
            initColumns = initColumns.map((column) => ({
                id: uuidv4(),
                size: column
            }));
            (setColumns(initColumns));
        }
    },[]);

    useEffect(() => {
        if(columns.length > 0) {
            dispatch(editStyleInPreRenderedStyles(["grid-template-columns", columns.map((column) => column.size ).join(' ') ]))
        }
    },[columns])

    return (
        <div className="display-horizontal-grid with-margin">
            <div className="style-title-box top">
                <div className="text">Columns</div>
            </div>
            <div  style={{width: "100%"}}>
                <div style={{textAlign: "right", width: "100%", marginBottom: "4px"}}>
                    <div className="plusButton" onClick={handleAddColumn}>+</div>
                </div>

                {columns.map((column) => (
                    <div className="display-grid-column" key={column.id}> 
                        <div>
                            {column.size}
                        </div>
                        <div 
                        onClick={() => handleDeleteColumn(column.id)}
                        className="display-grid-column-delete">
                            x
                        </div>
                    </div>
                ))}
                
            </div>
        </div>
    )
}