import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {addImageToProjectImages} from "../features/project-images"
import {v4 as uuidv4} from "uuid"
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, updateDoc } from "firebase/firestore";
import { firebaseConfig } from "../utils/firebase-config.js";

const fileToDataUri = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result)
    };
    reader.readAsDataURL(file);
})

export default function FileUploaderToCollectionField({handleInputChange}){
    const dispatch = useDispatch()
    const projectFirebaseId = useSelector((state) => state.designerProjectState.projectFirebaseId)
    const projectImages = useSelector((state) => state.projectImages.Images)

    const storage = getStorage();

    const imageUploading = (file) => {

        if(!file) {
        return;
        }

        fileToDataUri(file)
        .then(dataUri => {
            const tempStorageRef = ref(storage, projectFirebaseId+"-"+file.name);
            uploadBytes(tempStorageRef, file).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });
        })
        .then(async() => {
            console.log("Setting Doc");
            const app = initializeApp(firebaseConfig);
            const db = getFirestore(app);
            await updateDoc(doc(db, "projects", projectFirebaseId), {
                images: [...projectImages, {
                    name: projectFirebaseId+"-"+file.name,
                    id: uuidv4()
                }],
            });
            dispatch(addImageToProjectImages(projectFirebaseId+"-"+file.name));
            handleInputChange(projectFirebaseId+"-"+file.name);
        })

        

    }

    return(

        <div style={{overflow:"hidden"}}>
                <input type="file" onChange={(event) => imageUploading(event.target.files[0] || null)} />
        </div>
    )
}