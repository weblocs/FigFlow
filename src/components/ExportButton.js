import React, { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import {setSaveButtonStateText} from "../features/pre-rendered-html-nodes"
import { saveAs } from 'file-saver';
import JSZip from 'jszip';


export default function ExportButton() {
    const preRenderedHTMLNodes = useSelector((state) => state.designerProjectState.preRenderedHTMLNodes)
    const postRenderedStyles = useSelector((state) => state.designerProjectState.postRenderedStyles)
    const projectPages = useSelector((state) => state.designerProjectState.projectPages)
    const projectCollections = useSelector((state) => state.designerProjectState.projectCollections)
    const projectPageFolderStructure = useSelector((state) => state.designerProjectState.projectPageFolderStructure)
    const dispatch = useDispatch()
    
    function handleOnClick() {


        function generateCollectionPage (nodes) {
            let genratedHTML = `
            <html>
            <head>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
            <link href="../style.css" rel="stylesheet">
            </head>
            <body>`;
            function findNode(nodes) {
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
                    genratedHTML += `<${type} class='${nodes[i].class.map((cl) => cl.name).toString().replaceAll(","," ")}' ${((type === "img") ? " src='https://firebasestorage.googleapis.com/v0/b/figflow-5a912.appspot.com/o/"+nodes[i].src+"?alt=media&token=fe82f3f8-fd09-40ae-9168-25ebc8835c9a'" : "" )}>`;
                    if (nodes[i].children.length > 0) {
                        findNode(nodes[i].children);
                    } else if(type !== "img") {
                        genratedHTML += nodes[i].title
                    } 
                    genratedHTML += `</${type}>`;
                }
            }
            findNode(nodes);
            genratedHTML += `</body></html>`;
            return genratedHTML;
        }

        function generatePage(nodes, depth) {
        let styleURLDots = "";
        for(let i = 1; i < depth; i++) {
            styleURLDots +=  "../";
        }
        (depth === 1) && (styleURLDots = "./");
        let postRenderedHTML = `
        <html>
        <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
        <link href="${styleURLDots}style.css" rel="stylesheet">
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

        postRenderedHTML += `</body></html>`;
        return postRenderedHTML;
        }

        var zip = new JSZip();
        // zip.file("project/index.html", generatePage(projectPages[0].preRenderedHTMLNodes));
        

        let firstPage = true;
        function renderPages(pages,parents) {
            pages.forEach((page,i) => {
                let pageSlug = page?.slug;
                if(!page.children) {
                    const nodes = projectPages.find(({slug}) => slug === page.slug).preRenderedHTMLNodes;
                    let parentToFolderLink = "";
                    parents.forEach(parent => {
                        parentToFolderLink += parent + "/";
                    });
                    if (firstPage) {
                        pageSlug = "index";
                        firstPage = false;
                    }
                    zip.file(`${parentToFolderLink}${pageSlug}.html`, generatePage(nodes, parents.length));
                } else {
                    let updatedParents = [...parents, pageSlug];
                    let parentToFolderLink = "";
                    updatedParents.forEach(parent => {
                        parentToFolderLink += parent + "/";
                    });
                    zip.folder(`${parentToFolderLink}`);
                    renderPages(page.children,updatedParents);
                }
            });
        }
        renderPages(projectPageFolderStructure, ["project"]);
        zip.file('project/style.css', `body{margin:0;}img{display: block;}${postRenderedStyles}`);

        projectCollections.forEach(collection => {
            collection.items.forEach(item => {
                zip.file(`project/${collection.slug}/${item.slug}.html`, generateCollectionPage(collection.preRenderedHTMLNodes));
            })
        })

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