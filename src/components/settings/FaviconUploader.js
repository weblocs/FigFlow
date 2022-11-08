import { useDispatch, useSelector } from 'react-redux'
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, updateDoc } from "firebase/firestore";
import { firebaseConfig } from '../../utils/firebase-config';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { setFavicon } from '../../features/project';

const fileToDataUri = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result)
    };
    reader.readAsDataURL(file);
})

export default function FaviconUploader() {
    const projectFirebaseId = useSelector((state) => state.project.projectFirebaseId)
    const faviconImage = useSelector((state) => state.project.faviconImage)
    
    const dispatch = useDispatch()

    const storage = getStorage();

    const imageUploading = (file) => {
        if(!file) {
            return;
        }
        fileToDataUri(file)
        .then(dataUri => {
            const tempStorageRef = ref(storage, projectFirebaseId+"-"+file.name);
            uploadBytes(tempStorageRef, file).then((snapshot) => {
            });
        })
        .then(async() => {
            const app = initializeApp(firebaseConfig);
            const db = getFirestore(app);
            await updateDoc(doc(db, "projects", projectFirebaseId), {
                    favicon: projectFirebaseId+"-"+file.name
                },
            );
        })
        .then(async() => {
            dispatch(setFavicon(projectFirebaseId+"-"+file.name));
        })
    }

    return (
        <div className='favicons-settings-grid'>
            <div>
                <label className='project-settings_label'>Favicon</label>
                <img className='favicon-settings-image' src={"https://firebasestorage.googleapis.com/v0/b/figflow-5a912.appspot.com/o/"+faviconImage+"?alt=media&token=fe82f3f8-fd09-40ae-9168-25ebc8835c9a"} />
                <label className="custom-file-upload">
                    <input type="file" onChange={(event) => imageUploading(event.target.files[0] || null)} />
                    Choose Image
                </label> 
            </div>

            <div>
                <label className='project-settings_label'>Favicon Mobile</label>
                <img className='favicon-settings-image' src={"https://firebasestorage.googleapis.com/v0/b/figflow-5a912.appspot.com/o/"+faviconImage+"?alt=media&token=fe82f3f8-fd09-40ae-9168-25ebc8835c9a"} />
                <label className="custom-file-upload">
                    <input type="file" onChange={(event) => imageUploading(event.target.files[0] || null)} />
                    Choose Image
                </label> 
            </div>
        </div>
    )
}