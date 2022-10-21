import { useEffect, useRef, useState } from 'react'
import { collection, doc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import { useDispatch, useSelector } from 'react-redux'
import { firebaseConfig } from "../../utils/firebase-config";
import { initializeApp } from 'firebase/app';
import { setIsSettingsModalOpen, setKeyboardNavigationOn, setProjectSettingsData } from '../../features/project'
import ProjectSettingsDelete from './ProjectSettingsDelete'

export default function ProjectSettings() {
    const projectSettingsData = useSelector((state) => state.project.projectSettingsData)
    const isSettingsModalOpen = useSelector((state) => state.project.isSettingsModalOpen)
    const projectFirebaseId = useSelector((state) => state.project.projectFirebaseId)
    const dispatch = useDispatch()
    
    const inputNameRef = useRef();
    const inputSubdomainRef = useRef();

    const [isSubdomainValid, setIsSubdomainValidate] = useState(true);
    const [validationMessage, setValidationMessage] = useState(true);

    async function handleSubmit() {
        event.preventDefault();
        if(isSubdomainValid) {
            const app = initializeApp(firebaseConfig);
            const db = getFirestore(app);
            const projectRef = doc(db, "projects", projectFirebaseId);
            await updateDoc(projectRef, {
                projectName: inputNameRef.current.value,
                projectId: inputSubdomainRef.current.value,
            });
            window.location.href = `/design/${inputSubdomainRef.current.value}`;
        } 
    }

    async function subdomainValidation() {
        let regex = new RegExp('^[a-z0-9]+(?:-[a-z0-9]+)*$');
        const regexTest = regex.test(inputSubdomainRef.current.value); 
        if(!regexTest) {
            setIsSubdomainValidate(false);  
            setValidationMessage("Subdomains need to be alphanumeric (A-Z, 0-9) with dashes between words.");
        } else {
            const app = initializeApp(firebaseConfig);
            const db = getFirestore(app);
            let sameNameProjects = await getDocs( query( collection(db, "projects"), where("projectId", "==", inputSubdomainRef.current.value)));
            const availabilityTest = (sameNameProjects.size === 0 || inputSubdomainRef.current.value === projectSettingsData.slug);
            if(!availabilityTest) {
                setIsSubdomainValidate(false);  
                setValidationMessage("This sub-domain is currently taken.");
            } else {
                setIsSubdomainValidate(true)
                setValidationMessage("")
            }
        } 
    }

    useEffect(() => {
        inputNameRef.current.value = projectSettingsData.name;
        inputSubdomainRef.current.value = projectSettingsData.slug;
    },[projectSettingsData]);

    function handleFocus() {
        dispatch(setKeyboardNavigationOn(false));
    }

    function handleBlur() {
        dispatch(setKeyboardNavigationOn(true));
    }

    return (
        <div className={'settings-modal' + (isSettingsModalOpen ? " active" : "") }>
            <div 
            onClick={() => dispatch(setIsSettingsModalOpen(false))}
            className='settings-modal_close-area'></div>
            <form onSubmit={handleSubmit} className='settings-modal_modal-content-area'>
                
                <div className='project-settings_nav'>
                    <div className='project-settings_nav-list'>
                        <h3>Settings</h3>
                    </div>
                    <div className='project-settings_nav-list'>
                        <ProjectSettingsDelete />
                        <div className='project-settings_close-button' onClick={() => dispatch(setIsSettingsModalOpen(false))}>Close</div>
                    </div>
                </div>
                <div className='project-settings_form'>
                    <label className='project-settings_label'>Name</label>
                    <input  className='project-settings_input' ref={inputNameRef} onFocus={handleFocus} onBlur={handleBlur} />

                    <label className='project-settings_label'>Subdomain</label>
                    <input className='project-settings_input' ref={inputSubdomainRef} onInput={subdomainValidation} onFocus={handleFocus} onBlur={handleBlur} />

                    <div>{validationMessage}</div>

                    <button>Save</button>

                </div>
            </form>
        </div>
    )
}