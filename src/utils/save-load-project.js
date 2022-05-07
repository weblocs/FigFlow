import axios from "axios";
import Constants from "./const.js";

import { useEffect } from "react";
import { useDispatch } from 'react-redux'

import { setPreRenderedHTMLNodes, setPreRenderedStyles } from '../features/pre-rendered-html-nodes'

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
    });
}

// return new Promise
// async/await

export function loadProjectPreRenderedNodesAndStyles() {
  const dispatch = useDispatch()
  useEffect(() => {
  axios
      .get(
        Constants.BASE_API + "items"
      )
      .then((res) => {
        dispatch(setPreRenderedHTMLNodes([...res.data[0].items]));
        dispatch(setPreRenderedStyles([...res.data[0].preRenderedStyles]));        
      });
  }, []);
}