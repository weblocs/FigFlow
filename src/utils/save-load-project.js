import axios from "axios";
import Constants from "./const.js";

export default function saveProject(items,preRenderedStyles) {

  
  axios
    .put(
      Constants.BASE_API + "update",
      { items: [...items], preRenderedStyles: [...preRenderedStyles] },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then((res) => {
      console.log("Saved");
      console.log(preRenderedStyles);
    });
}

// return new Promise
// async/await

export function loadProjectStructure() {
  let response;
  axios.get(Constants.BASE_API + "items").then((res) => {
    response = res.data[0].items;
    return response;
  });
}