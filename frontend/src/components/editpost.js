import React from "react";
import { useState, useEffect } from "react";
import Header from "./header";

export default function EditPost() {
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    getPost().then((values) => {
      setValues({
        title: values.title,
        content: values.content,
      });
    });
  }, []);

  function handleChange(evt) {
    const value = evt.target.value;
    setValues({
      ...values,
      [evt.target.name]: value,
    });
  }

  async function onSubmit(evt) {
    evt.preventDefault();
    const data = {
      title: values.title,
      content: values.content,
    };
    const p = new URLSearchParams(window.location.search);
    const res = await fetch("./updatePost?id=" + p.get("id"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    setMessage(json.msg);
    if (res.status === 200) {
      setTimeout(
        () => (window.location.href = "/post?id=" + p.get("id")),
        2000
      );
    }
  }

  return (
    <div class="container-md">
      <Header></Header>
      {message !== "" && (
        <div
          class="alert alert-warning alert-dismissible fade show"
          role="alert"
          id="msg"
        >
          <span id="msgContent">{message}</span>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      <div class="h1">Edit Experience</div>
      <form method="post" onSubmit={onSubmit}>
        <div class="mb-3">
          <label class="form-label">Title</label>
          <input
            name="title"
            class="form-control"
            disabled="disabled"
            value={values.title}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Content</label>
          <textarea
            name="content"
            class="form-control"
            rows="20"
            value={values.content}
            onChange={handleChange}
          ></textarea>
        </div>
        <div class="d-grid gap-2 mt-5">
          <button type="submit" class="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

async function getPost() {
  const p = new URLSearchParams(window.location.search);
  const res = await fetch("./getPost?id=" + p.get("id"));
  const post = await res.json();
  return post;
}

EditPost.propTypes = {};
