import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {updateSwatch, addSwatch, setKeyboardNavigationOn, editStyleInPreRenderedStyles, arrowActiveNodeNavigation} from "../../features/pre-rendered-html-nodes"
import ProprtyInputLabel from "./ProprtyInputLabel";

export default function ColorPicker (props) {
    const projectSwatches = useSelector((state) => state.designerProjectState.projectSwatches);
    const activeStyleIndex = useSelector((state) => state.designerProjectState.activeStyleIndex);
    const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId);
    const activeStyleId = useSelector((state) => state.designerProjectState.activeStyleId)
    const stylesInActiveNode = useSelector((state) => state.designerProjectState.stylesInActiveNode)
    const preRenderedStyles = useSelector((state) => state.designerProjectState.preRenderedStyles)
    const activeProjectResolutionStylesListName = useSelector((state) => state.designerProjectState.activeProjectResolutionStylesListName);
    
    const activeStyleOptionIndex = useSelector((state) => state.designerProjectState.activeStyleOptionIndex);
    const nodeStyles = useSelector((state) => {
        if(activeStyleId === stylesInActiveNode?.[0]?.id) {
            return preRenderedStyles[activeStyleIndex];
        } else {
            return preRenderedStyles?.find(({id}) => id === stylesInActiveNode?.[0]?.id)?.childrens[activeStyleOptionIndex]?.options.find(({id}) => id === activeStyleId);
        }   
    });

    const editedStyleValue = useSelector((state) => {
        // if (nodeStyles?.[activeProjectResolutionStylesListName]?.[props.style] !== undefined) {
        //     return nodeStyles?.[activeProjectResolutionStylesListName]?.[props.style];
        // }
        if(activeNodeId !== "") {
            try {
                const activeNode = document.querySelector(`[el_id="${activeNodeId}"]`);
                return rgbToHex(getComputedStyle(activeNode)?.[props.style.replace("_","-")]);
            } catch {
            }
        }
    });
    
    const dispatch = useDispatch();

    const [activeSwatch, setActiveSwatch] = useState({});
    const [swatchEditorMode, setSwatchEditorMode] = useState("");
    const [swatchesEditorOpened, setSwatchesEditorOpened] = useState(false);
    const [formButtonText, setFormButtonText] = useState("Save");
    const [activeSwatchNameOrColorValue, setActiveSwatchNameOrColorValue] = useState("");
    const [styleColorInputOpen, setStyleColorInputOpen] = useState(false);
    
    const styleColorRef = useRef();
    const swatchNameRef = useRef();
    const swatchColorRef = useRef();

    useEffect(() => {
        swatchNameRef.current.value = activeSwatch.name;
        swatchColorRef.current.value = activeSwatch.color;
        dispatch(setKeyboardNavigationOn(!swatchesEditorOpened));
    },[activeSwatch]);
        
    useEffect(() => {
        setActiveSwatchNameOrColorValue(editedStyleValue);
        projectSwatches.forEach((swatch) => {
            if(swatch.color === editedStyleValue) {
                setActiveSwatchNameOrColorValue(swatch.name);
                setActiveSwatch(swatch);
            }
        });
    },[editedStyleValue, projectSwatches]);

    useEffect(() => {
        if(swatchEditorMode === "edit") {
            setFormButtonText("Save");
        } else if(swatchEditorMode === "add") {
            setFormButtonText("Add");
        }
    },[swatchEditorMode]);

    useEffect(() => {
        dispatch(setKeyboardNavigationOn(!styleColorInputOpen));
    },[styleColorInputOpen]);

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
        
    function rgbToHex(color) {
        return color;
        color = color.replace("rgb(","").replace(")","");
        const rgbValues = color.split(",");
        const hexColor = "#" + componentToHex(rgbValues[0]) + componentToHex(rgbValues[1]) + componentToHex(rgbValues[2]);
        return hexColor.replaceAll(" ","");
    }

    function handleOpeningSwatchesEditor() {
        let tempActiveSwatch = projectSwatches?.find(({color}) => color === editedStyleValue)
        if ( tempActiveSwatch !== undefined) {
            setActiveSwatch(tempActiveSwatch);
            setSwatchEditorMode("edit");
        } else {
            setActiveSwatch({id:"",name:"",color:""});
        }
        setSwatchesEditorOpened(!swatchesEditorOpened);
    }

    function handleSwatchClick(swatch) {
        setSwatchEditorMode("edit");
        setActiveSwatch(swatch);
        dispatch(editStyleInPreRenderedStyles([props.style,swatch.color]));
    }

    function inputOnChange() {
        setActiveSwatch({id: activeSwatch.id, name: swatchNameRef.current.value, color: swatchColorRef.current.value });
    }

    function handleFormSubmit (e) {
        e.preventDefault();
        if(swatchEditorMode === "edit") {
            dispatch(updateSwatch({id: activeSwatch.id, name: swatchNameRef.current.value, color: swatchColorRef.current.value }));
            setFormButtonText("Saved");
            setTimeout(() => {
                setFormButtonText("Save");
            }, 1000);
        } else if(swatchEditorMode === "add") {
            dispatch(addSwatch({name: swatchNameRef.current.value, color: swatchColorRef.current.value}));
            dispatch(editStyleInPreRenderedStyles([props.style, swatchColorRef.current.value]));
            setSwatchEditorMode("edit");
        }
    }

    function handleClickNewSwatchButton () {
        setSwatchEditorMode("add");
        swatchNameRef.current.focus();
        setActiveSwatch({id:"", name: "", color: editedStyleValue});
    }

    function handleColorTextClick () {
        styleColorRef.current.value = editedStyleValue;
        setStyleColorInputOpen(true);
    }

    function handleStyleColorInputBlur () {
        setStyleColorInputOpen(false);
    }

    function handleStyleColorKeyDown (e) {
        if(e.key === 'Enter') {
            dispatch(editStyleInPreRenderedStyles([props.style,e.target.value]));
            setStyleColorInputOpen(false);
        }
    }

    return (
        <div className="size-style-box">

            <ProprtyInputLabel text="Color" property={props.style} />

            <div className="input color-picker">
                    <div className="color-picker_color-box" style={{backgroundColor: editedStyleValue}} onClick={handleOpeningSwatchesEditor}></div>
                    <div className={"style-edit-text" + ((styleColorInputOpen) ? " active" : "")} onClick={handleColorTextClick}>{activeSwatchNameOrColorValue}</div>
                    <input 
                    onBlur={handleStyleColorInputBlur}
                    onKeyDown={handleStyleColorKeyDown}
                    className={"style-edit-input-text color-input" + ((!styleColorInputOpen) ? " active" : "")} 
                    ref={styleColorRef} 
                    type="text" />

                    <form className={"swatches-box" + ((swatchesEditorOpened) ? " active" : "")} onSubmit={handleFormSubmit}>  
                        <div className="swatches-list">  
                            {projectSwatches.map((swatch) => (
                                <div 
                                className={"swatches-item" + ((swatch.id === activeSwatch.id) ? " active" : "")} 
                                style={{backgroundColor: swatch.color}}
                                onClick={() => handleSwatchClick(swatch)}
                                key={swatch.id}>
                                </div>
                            ))}
                            <div className="new-swatch" onClick={handleClickNewSwatchButton}>+</div>
                        </div>
                        <input placeholder="swatch name" ref={swatchNameRef} onKeyDown={inputOnChange} className="input change-swatch-input" defaultValue={activeSwatch.name} />
                        <input placeholder="swatch value" ref={swatchColorRef} onKeyDown={inputOnChange} className="input change-swatch-input" defaultValue={activeSwatch.color} />
                        <button 
                        className="swatch-save-button"
                        >{formButtonText}</button>
                    </form>
            </div>
        </div>
    )
}