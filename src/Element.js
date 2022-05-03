import React from "react";
import Element from "./Element";
import ContentEditable from "react-contenteditable";

export default function App(props) {
  let elementHTML = (
    <div className="Element" className={props.class[0].name} el_id={props.id}>
      {props.children.map((el) => (
        <Element
          type={el.type}
          id={el.id}
          key={el.id}
          title={el.title}
          children={el.children}
          onChange={(text, id) => props.onChange(text, id)}
          class={el.class}
        />
      ))}
    </div>
  );

  if (props.type === "h") {
    elementHTML = (
      <ContentEditable
        className={props.class[0].name}
        el_id={props.id}
        tagName="h2"
        html={props.title} // innerHTML of the editable div
        disabled={false} // use true to disable edition
        onChange={(e) => props.onChange(e.target.value, props.id)} // handle innerHTML change
      />
    );
  }

  if (props.type === "p") {
    elementHTML = (
      <ContentEditable
        className={props.class[0].name}
        el_id={props.id}
        tagName="p"
        html={props.title} // innerHTML of the editable div
        disabled={false} // use true to disable edition
        onChange={(e) => props.onChange(e.target.value, props.id)} // handle innerHTML change
      />
    );
  }

  if (props.type === "a") {
    elementHTML = (
      <a href="#" el_id={props.id}>
        {props.title}
      </a>
    );
  }

  return elementHTML;
}
