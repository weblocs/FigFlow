import axios from "axios";
import Constants from "../const.js";

// return new Promise
// async/await

export default function loadProjectStructure() {
  let response;
  axios.get(Constants.BASE_API + "items").then((res) => {
    response = res.data[0].items;
    return response;
  });
}
