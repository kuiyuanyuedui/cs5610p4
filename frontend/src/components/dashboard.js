import React from "react";
import { useState, useEffect } from "react";
import Postentry from "./postentry";
import Header from "./header";

export default function Dashboard(props) {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(
    parseInt(new URLSearchParams(window.location.search).get("p") || "1")
  );
  const [disablePrevious, setDisablePrevious] = useState(true);
  const [disableNext, setDisableNext] = useState(true);

  useEffect(() => {
    if (page !== 1) {
      setDisablePrevious(false);
    }
    if (list.length === 10) {
      console.log("set next to false");
      setDisableNext(false);
    }
  }, [page, list]);

  useEffect(() => {
    fetch("/listPosts?p=" + page, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setList(res);
      });
  }, [page]);

  function handleClickShare(e) {
    e.preventDefault();
    console.log("handle click share");
    window.location.href = "/newpost";
  }

  return (
    <div>
      <Header></Header>
      <div class="container">
        <div class="mt-4 mb-4 d-flex justify-content-between">
          <div class="h1 fw-bold">
            Welcome to <span style={{ color: "#c4041d" }}>N</span>U Community!
          </div>
          <div>
            <button
              class="btn btn-primary me-md-2 justify-content-md-end"
              id="newpost"
              type="button"
              style={{ backgroundColor: "#c4041d", borderColor: "#c4041d" }}
              onClick={handleClickShare}
            >
              Share my experience
            </button>
          </div>
        </div>
        <div id="content"></div>
        <div id="list" class="list-group">
          {list.map((i, index) => (
            <Postentry
              id={i._id}
              author={i.author}
              title={i.title}
              content={i.content}
            />
          ))}
        </div>
        <div class="d-flex justify-content-between mt-5">
          <button
            type="button"
            class="btn btn-outline-secondary"
            disabled={disablePrevious}
            onClick={() => {
              window.location.href = "?p=" + (page - 1);
            }}
          >
            Previous
          </button>
          <button
            type="button"
            class="btn btn-outline-secondary"
            disabled={disableNext}
            onClick={() => {
              window.location.href = "?p=" + (page + 1);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {};
