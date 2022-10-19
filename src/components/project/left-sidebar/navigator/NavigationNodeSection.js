import React from "react";
import NavigationNodeFolder from "./NavigationNodeFolder";

 function NavigationNodeSection ({node}) {

    return <NavigationNodeFolder parents={[]} node={node} depth={0} />
}

export default NavigationNodeSection;
// export default React.memo(NavigationNodeSection);
 