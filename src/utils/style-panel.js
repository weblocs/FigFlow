export function findStyleUnit(styleValue) {
    if(styleValue?.includes("px")) {
        return "px";
    }
    if(styleValue?.includes("%")) {
        return "%";
    }
    if(styleValue?.includes("em")) {
        return "em";
    }
    return "";
}

export function deleteUnits(styleValue) {
    return styleValue?.replace("px","")?.replace("%","")?.replace("em","");
}