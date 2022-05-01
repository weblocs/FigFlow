import React from "react";

export default function Button(props) {
  console.log(props);
  return (
    <button className="ButtonStroke" onClick={props.onClick}>
      {props.text}
    </button>
  );
}
