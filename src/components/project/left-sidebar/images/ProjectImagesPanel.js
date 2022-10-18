import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {addImageToProjectImages} from "../../../../features/project-images"
import {v4 as uuidv4} from "uuid"
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, updateDoc } from "firebase/firestore";
import { firebaseConfig } from "../../../../utils/firebase-config.js";
import { editHtmlNode } from "../../../../features/project"

const fileToDataUri = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result)
    };
    reader.readAsDataURL(file);
})

export default function ProjectImagesPanel(){
    const dispatch = useDispatch()
    const activeTab = useSelector((state) => state.project.activeTab)
    const projectFirebaseId = useSelector((state) => state.project.projectFirebaseId)
    const activeNodeId = useSelector((state) => state.project.activeNodeId)
    const projectImages = useSelector((state) => state.projectImages.Images)

    const storage = getStorage();

    function setImageToActiveNode(imageName) {
        dispatch(editHtmlNode({id: activeNodeId, field: 'src', value: imageName}))
    }

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
                images: [...projectImages, {
                    name: projectFirebaseId+"-"+file.name,
                    id: uuidv4()
                }],
            });
        })
        .then(async() => {
            dispatch(addImageToProjectImages(projectFirebaseId+"-"+file.name));
        })
    }

    return(
        <div className={"collectionsPanel "+ ((activeTab === "Images") ? "active" : "" )}>
            <div className="projectTabTitleBox">Images</div>
            <div style={{overflow:"hidden"}}>
                <input type="file" onChange={(event) => imageUploading(event.target.files[0] || null)} />
            </div>
            <div className="libraryImageGrid">
                {projectImages.map((images) => (
                        <div onClick={() => setImageToActiveNode(images.name)} key={images.id}>
                            <img className="libraryImage" src={"https://firebasestorage.googleapis.com/v0/b/figflow-5a912.appspot.com/o/"+images.name+"?alt=media&token=fe82f3f8-fd09-40ae-9168-25ebc8835c9a"} />
                        </div>
                ))} 
            </div>  
        </div>
    )
}