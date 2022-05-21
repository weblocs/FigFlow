import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import CreateNewCollection from "./CreateNewCollection"
import {setActiveCollectionIdAndIndex} from "../features/pre-rendered-html-nodes"

const fileToDataUri = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result)
    };
    reader.readAsDataURL(file);
    })

export default function ProjectImagesPanel(){
    const dispatch = useDispatch()
    const projectCollections = useSelector((state) => state.designerProjectState.projectCollections)
    const activeProjectCollectionId = useSelector((state) => state.designerProjectState.activeProjectCollectionId)
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)

    const storage = getStorage();
    const storageRef = ref(storage, 'some-child.jpg');

    const pathReference = ref(storage, 'some-child.jpg');

    function handleDownloading() {
        getDownloadURL(ref(storage, 'some-child'))
        .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
            const blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();

            // Or inserted into an <img> element
            const img = document.getElementById('myimg');
            img.setAttribute('src', url);
        })
        .catch((error) => {
            // Handle any errors
        });
    }


    const [dataUri, setDataUri] = useState('')

  const onChange = (file) => {
    
    if(!file) {
      setDataUri('');
      return;
    }

    fileToDataUri(file)
      .then(dataUri => {
        setDataUri(dataUri)
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
      })
    
  }

    
    return(
        <div className={"projectCollectionsPanel "+ ((activeProjectTab === "Images") ? "active" : "" )}>
            
            <div className="projectTabTitleBox">Images</div>

            <div>
  <img width="200" height="200" src={dataUri} alt="avatar" id="myimg"/>
  <input type="file" onChange={(event) => onChange(event.target.files[0] || null)} />
  </div>

  <div onClick={handleDownloading}>Download</div>
            

           

            
        </div>
    )
}