import React, { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import {setSaveButtonStateText} from "../features/pre-rendered-html-nodes"
import { saveAs } from 'file-saver';
import JSZip from 'jszip';


export default function ExportButton() {
    const preRenderedHTMLNodes = useSelector((state) => state.designerProjectState.preRenderedHTMLNodes)
    const postRenderedStyles = useSelector((state) => state.designerProjectState.postRenderedStyles)
    const projectPages = useSelector((state) => state.designerProjectState.projectPages)
    const dispatch = useDispatch()
    
    function handleOnClick() {

        function generatePage(nodes) {
        let postRenderedHTML = `
        <html>
        <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
        <link href="./style.css" rel="stylesheet">
        </head>
        <body>`;

        function findNode(nodes, id) {
            for (let i = 0; i < nodes.length; i++) {
                const type = nodes[i].type;
                if(type === "sec") {
                    type = "div";
                }
                if(type === "sym") {
                    type = "div";
                }
                if(type === "rich") {
                    type = "div";
                }
                if(type === "h") {
                    type = "h2";
                }
                postRenderedHTML += `<${type} class='${nodes[i].class.map((cl) => cl.name).toString().replaceAll(","," ")}' ${((type === "img") ? " src='https://firebasestorage.googleapis.com/v0/b/figflow-5a912.appspot.com/o/"+nodes[i].src+"?alt=media&token=fe82f3f8-fd09-40ae-9168-25ebc8835c9a'" : "" )}>`;
                if (nodes[i].children.length > 0) {
                    findNode(nodes[i].children, id);
                } else if(type !== "img") {
                    postRenderedHTML += nodes[i].title
                } 
                postRenderedHTML += `</${type}>`;
            }
        }
        findNode(nodes);

        postRenderedHTML += `<style>body{margin:0;}img{display: block;}${postRenderedStyles}</style>`;
        postRenderedHTML += `</body></html>`;
        return postRenderedHTML;
        }

        var zip = new JSZip();
        zip.file("project/index.html", generatePage(projectPages[0].preRenderedHTMLNodes));
        projectPages.forEach((page,index) => {
            let pageNodes = projectPages[0].preRenderedHTMLNodes;
            let pageName = projectPages[0].name;
            zip.file("project/index.html", generatePage(pageNodes));
        });
        // var img = zip.folder("images");
        // img.file("smile.gif", imgData, {base64: true});
        zip.generateAsync({type:"blob"})
        .then(function(content) {
            saveAs(content, "project.zip");
        });
    }

    return (
    <button className="saveButton light" onClick={handleOnClick}>
        Export
    </button>
    )
}