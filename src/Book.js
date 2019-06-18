import React from "react";

function Book(props) {
  const Styles = {
    display: "inline-block",
    border: "1px solid black",
    padding: 15,
    width: "55%"
  };

  return (
    <div style={Styles}>
      <span className="bold">Title:</span>{" "}
      <a href={props.url} target="_blank" rel="noopener noreferrer">
        {props.title}
      </a>
      <br />
      <span className="bold">Category:</span> {props.category} <br />
      <span className="bold">Description:</span> {props.description} <br />
      {props.children}
    </div>
  );
}

export default Book;
