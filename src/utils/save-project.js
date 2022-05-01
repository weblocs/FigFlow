import axios from "axios";
import Constants from "../const.js";

export default function saveProject(items) {
  axios
    .put(
      Constants.BASE_API + "update",
      { items: [...items] },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then((res) => {
      console.log("Saved");
    });
}
