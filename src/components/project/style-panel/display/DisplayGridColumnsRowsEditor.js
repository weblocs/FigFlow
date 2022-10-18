import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from "uuid";
import { editStyleProperty } from "../../../../features/project";
import DisplayGridColumnSizeButton from "./DisplayGridColumnSizeButton";


export default function DisplayGridColumnsRowsEditor (props) {

    const displayStyle = useSelector((state) => state.project.activeStyleObject?.["grid-template-columns"])

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
    },[displayStyle]);

    function handleEditColumnSize(columnId,value) {
        let tempStyle = [...columns];
        let tempColumns = [...columns];
        tempStyle = tempStyle.find(({id}) => id === columnId).size;
        
        let sizeUnit = "";
        if(tempStyle.includes("fr")) {
            sizeUnit = "fr";
        }
        if(tempStyle.includes("px")) {
            sizeUnit = "px";
        }
        
        tempStyle = tempStyle.replace(sizeUnit,"");
        tempStyle = value;
        tempColumns.find(({id}) => id === columnId).size = tempStyle+sizeUnit;
        setColumns(tempColumns);
    }

    function handleEditColumnUnitChange(columnId,value) {
        let tempStyle = [...columns];
        let tempColumns = [...columns];
        tempStyle = tempStyle.find(({id}) => id === columnId).size;

        let sizeUnit = "";
        if(tempStyle.includes("fr")) {
            sizeUnit = "fr";
        }
        if(tempStyle.includes("px")) {
            sizeUnit = "px";
        }
        tempStyle = tempStyle.replace(sizeUnit,value);
        tempColumns.find(({id}) => id === columnId).size = tempStyle;
        setColumns(tempColumns);
    }

    useEffect(() => {
        if(columns.length > 0) {
            dispatch(editStyleProperty(["grid-template-columns", columns.map((column) => column.size ).join(' ') ]))
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
                        <DisplayGridColumnSizeButton id={column.id} size={column.size} handleEditColumnSize={handleEditColumnSize} handleEditColumnUnitChange={handleEditColumnUnitChange} />
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