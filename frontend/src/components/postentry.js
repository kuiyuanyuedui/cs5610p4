import React from "react";

export default function Postentry(props) {
  function handleClick(evt) {
    window.location.replace("post?id=" + props.id);
  }
  function handleKeyPress(evt) {
    console.log(evt.key);
    if (evt.key === "Enter") {
      handleClick(evt);
    }
  }
  return (
    <a
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      class="list-group-item list-group-item-action flex-column align-items-start"
      tabIndex="0"
    >
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{props.title}</h5>
      </div>
      <p class="mb-1 text-truncate">{props.content}</p>
      <small>Posted by: {props.author}</small>
    </a>
  );
}

Postentry.propTypes = {};
