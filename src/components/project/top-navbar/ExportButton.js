import { useSelector, useDispatch } from 'react-redux'
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { getResolutionCssMedia, getResolutionPathName, isStyleContained } from '../../../utils/nodes-editing';

export default function ExportButton() {
    const preRenderedStyles = useSelector((state) => state.project.preRenderedStyles)
    const faviconImage = useSelector((state) => state.project.faviconImage)
    const postRenderedStyles = useSelector((state) => state.project.postRenderedStyles)
    const projectPages = useSelector((state) => state.project.projectPages)
    const collections = useSelector((state) => state.project.collections)
    const projectPageFolderStructure = useSelector((state) => state.project.projectPageFolderStructure)

    const dispatch = useDispatch()
    
    function handleOnClick() {

        function generateCollectionPage (collection, item) {
            let nodes = collection.preRenderedHTMLNodes;
            let metaTitle = replaceCmsFields(collection?.metaTitle || "");
            let metaDescription = replaceCmsFields(collection.metaDescription || "");

            function replaceCmsFields(str) {
                const regex = /{{(.*?)}}/gm;
                let m;
                let texts = [];
    
                while ((m = regex.exec(str)) !== null) {
                    if (m.index === regex.lastIndex) {
                        regex.lastIndex++;
                    }
                    m.forEach((match, groupIndex) => {
                        if(groupIndex === 0) {
                            texts.push(match);
                        }
                    });
                }
    
                texts.forEach((text) => {
                    const textFieldId = collection?.fields?.find(({name}) => name === text.replace("{{","").replace("}}",""))?.id;
                    const textData = item.data?.find(({fieldId}) => fieldId === textFieldId)?.fieldValue || "";
                    str = str.replaceAll(text, textData);
                })
                return str
            }
            
            let genratedHTML = `
            <html>
            <head>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
            <link href="../style.css" rel="stylesheet">
            <meta charset="utf-8">
            <title>${metaTitle}</title>
            <meta name="description" content="${metaDescription}">
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
                    
                    const listOfSubStyles = preRenderedStyles.find(({id}) => id === nodes[i]?.class?.[0]?.id)?.childrens;
                    const listOfNodeStyles = nodes[i].class.map((cl,index) => 
                        {
                            if(index !== 0 && cl.id !== '') {
                                const styleDefaultName = listOfSubStyles?.[index-1]?.defaultName;
                                if(styleDefaultName !== undefined) {
                                    return styleDefaultName.replaceAll(" ","-").toLowerCase() + "-" + cl.name;
                                }
                            }
                            return cl.name
                        }).toString().replaceAll(","," ");

                    function generateHTMLNode() {
                        genratedHTML += `<${type} class='${listOfNodeStyles}' el='${nodes[i].id}' ${((type === "img") ? " alt='"+nodes[i].alt+"' src='https://firebasestorage.googleapis.com/v0/b/figflow-5a912.appspot.com/o/"+nodes[i].src+"?alt=media&token=fe82f3f8-fd09-40ae-9168-25ebc8835c9a'" : "" )}>`;
                        if (nodes[i].children.length > 0) {
                            findNode(nodes[i].children);
                        }  
                        if(type === "h2" || type === "p" || type === "a") {
                            if(nodes[i]?.cmsFieldId === undefined) {
                                genratedHTML += nodes[i].title
                            } else {
                                genratedHTML += "Hello123"
                            }
                        } 
                        genratedHTML += `</${type}>`;
                    }

                    generateHTMLNode();


                    let customStyle = {};

                    function addResponsiveInlineStyle(resolution) {
                        customStyle = nodes[i].styles?.[getResolutionPathName(resolution, "default")];
                        if(customStyle !== undefined && 
                            Object.keys(customStyle).length !== 0) {
                            let tempStyle = "<style> " + getResolutionCssMedia(resolution) + " { [el='" + nodes[i].id + "'] {"
                            for (const [key, value] of Object.entries(customStyle)) {
                            tempStyle += key + ": " + value + ";";
                            }
                            tempStyle += "}}</style>"
                            genratedHTML += tempStyle;
                        }
                    }

                    for(let j = 1; j <= 7; j++) {
                        addResponsiveInlineStyle(j.toString());
                    }
                    
                    if (nodes[i].type === "col") {
                        console.log("col");
                    }
                }
            }
            findNode(nodes);
            genratedHTML += `</body></html>`;
            return genratedHTML;
        }

        function generatePage(nodes, depth, metaTitle, metaDescription) {
        let styleURLDots = "";
        for(let i = 1; i < depth; i++) {
            styleURLDots +=  "../";
        }
        (depth === 1) && (styleURLDots = "./");
        let postRenderedHTML = `
        <html>
        <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
        <link rel="icon" href="">
        <link href="${styleURLDots}style.css" rel="stylesheet">
        <meta charset="utf-8">
        <title>${metaTitle}</title>
        <meta name="description" content="${metaDescription}">
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
                if(type === "col") {
                    type = "div";
                }
                if(type === "h") {
                    type = "h2";
                }

                const className = nodes[i].class.map((cl) => cl.name).toString().replaceAll(","," ");

                const listOfSubStyles = preRenderedStyles.find(({id}) => id === nodes[i]?.class?.[0]?.id)?.childrens;
                const listOfNodeStyles = nodes[i].class.map((cl,index) => 
                    {
                        if(index !== 0 && cl.id !== '') {
                            const styleDefaultName = listOfSubStyles?.[index-1]?.defaultName;
                            if(styleDefaultName !== undefined) {
                                return styleDefaultName.replaceAll(" ","-").toLowerCase() + "-" + cl.name;
                            }
                        }
                        return cl.name
                    }).toString().replaceAll(","," ");

                postRenderedHTML += `<${type} class='${listOfNodeStyles}' el='${nodes[i].id}' ${((type === "img") ? " src='https://firebasestorage.googleapis.com/v0/b/figflow-5a912.appspot.com/o/"+nodes[i].src+"?alt=media&token=fe82f3f8-fd09-40ae-9168-25ebc8835c9a'" : "" )}>`;
                if (nodes[i].children.length > 0) {
                    findNode(nodes[i].children, id);
                } else if(type === "h2" || type === "p" || type === "a") {
                    if(nodes[i]?.cmsFieldId === undefined) {
                        postRenderedHTML += nodes[i].title
                    } else {
                        postRenderedHTML += "Hello123"
                    }
                } 
                postRenderedHTML += `</${type}>`;

                let customStyle = {};

                function addResponsiveInlineStyle(resolution) {
                    customStyle = nodes[i].styles?.[getResolutionPathName(resolution, "default")];
                    if(customStyle !== undefined && 
                        Object.keys(customStyle).length !== 0) {
                        let tempStyle = "<style> " + getResolutionCssMedia(resolution) + " { [el='" + nodes[i].id + "'] {"
                        for (const [key, value] of Object.entries(customStyle)) {
                          tempStyle += key + ": " + value + ";";
                        }
                        tempStyle += "}}</style>"
                        postRenderedHTML += tempStyle;
                    }
                }

                for(let j = 1; j <= 7; j++) {
                    addResponsiveInlineStyle(j.toString());
                }

                


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
                    const metaTitle = projectPages.find(({slug}) => slug === page.slug).metaTitle;
                    const metaDescription = projectPages.find(({slug}) => slug === page.slug).metaDescription;
                    let parentToFolderLink = "";
                    parents.forEach(parent => {
                        parentToFolderLink += parent + "/";
                    });
                    if (firstPage) {
                        pageSlug = "index";
                        firstPage = false;
                    }
                    zip.file(`${parentToFolderLink}${pageSlug}.html`, generatePage(nodes, parents.length, metaTitle, metaDescription));
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

        collections.forEach(collection => {
            collection.items.forEach(item => {
                zip.file(`project/${collection.slug}/${item.slug}.html`, generateCollectionPage(collection, item));
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