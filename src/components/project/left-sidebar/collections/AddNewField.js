import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addCollectionField, setKeyboardNavigationOn } from '../../../../features/project';

export default function AddNewField() {
    const activeSettingsCollectionId = useSelector((state) => state.project.activeSettingsCollectionId)
    const dispatch = useDispatch()


    const nameRef = useRef();
    const helpTextRef = useRef();


    const [isOpen, setIsOpen] = useState(false);
    const [fieldType, setFieldType] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if(nameRef.current.value !== "") {
            dispatch(addCollectionField({
                name: nameRef.current.value, 
                helpText: helpTextRef.current.value, 
                type: fieldType
            }));
            setFieldType("");
            setIsOpen(false);
            nameRef.current.value = "";
            helpTextRef.current.value = "";
        }
    }

    function handleFocus() {
        dispatch(setKeyboardNavigationOn(false));
    }

    function handleBlur() {
        dispatch(setKeyboardNavigationOn(true));
    }

    useEffect(() => {
        setFieldType("");
        setIsOpen(false);
    }, [activeSettingsCollectionId])
    


    return (
        <>
        <div className="projectTabTitleBox">
                CMS Fields
                <div className="projectTabTitleButtonsBox">
                    <div 
                    onClick={() => setIsOpen(true)}
                    className='settings-button blue-button'>Add New Field</div>
                </div>
            </div>

        <div className={'page-settings-wrapper fields-settings' + (isOpen ? " active" : "") }>

            <div className={'fields-settings-types' + ((fieldType !== "") ? " isSet" : "") }>
                <div className='text'>Select Field Type</div>
                <div className='fields-settings_types-grid'>
                    <div
                    onClick={() => setFieldType("text")} 
                    className='fields-settings_types-item'>
                        Text
                    </div>
                    <div
                    onClick={() => setFieldType("img")} 
                    className='fields-settings_types-item'>
                        Image
                    </div>
                    <div 
                    onClick={() => setFieldType("number")}
                    className='fields-settings_types-item'>
                        Number
                    </div>
                </div>
            </div>

            <form 
            onSubmit={handleSubmit}
            className={'new-field-form' + ((fieldType !== "") ? " active" : "") }>
            <label className='settings-label'>NAME</label>
            <input className='settings-input' 
            onFocus={handleFocus} 
            onBlur={handleBlur}
            ref={nameRef} />
            <label className='settings-label'>HELP TEXT</label>
            <input className='settings-input'
            onFocus={handleFocus} 
            onBlur={handleBlur} 
            ref={helpTextRef} />
            <button className='settings-button blue-button'>Add</button>
        </form>

        </div>

        </>
    )
}