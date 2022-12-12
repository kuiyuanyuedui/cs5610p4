import React from "react";
import { useState } from "react";

/* This is the Signin component that enables user to sign in. */
export default function Signin() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [signinError, setSigninError] = useState("");

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
      user: values.username,
      password: values.password,
    };
    // console.log(data);
    const res = await fetch("./authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const resUser = await res.json();
    console.log("resUser", resUser);
    //when writer will write the post then we will attach email to save in backend
    localStorage.setItem("loggedInEmail", resUser.user_details?.email);
    if (resUser.isLoggedIn) {
      window.location.href = "/";
    } else {
      setSigninError(resUser.err);
    }
  }

  return (
    <section class="vh-100" style={{ backgroundColor: "#eee" }}>
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-lg-12 col-xl-11">
            <div class="card text-black" style={{ borderRadius: 25 + "px" }}>
              <div class="card-body p-md-5">
                <div class="row justify-content-center">
                  <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Hi, <span style={{ color: "#c4041d" }}>N</span>Uer!
                    </p>
                    <p class="text-center h2 mb-5 mx-1 mx-md-4 mt-4">
                      Welcome to your community
                    </p>
                    <form
                      class="mx-1 mx-md-4"
                      id="login"
                      method="post"
                      onSubmit={onSubmit}
                    >
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            type="user"
                            name="username"
                            class="form-control"
                            required={true}
                            value={values.username}
                            onChange={handleChange}
                          />
                          <label class="form-label" for="form3Example1c">
                            Your Name
                          </label>
                        </div>
                      </div>
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            name="password"
                            class="form-control"
                            required={true}
                            value={values.password}
                            onChange={handleChange}
                          />
                          <label class="form-label" for="form3Example4c">
                            Password
                          </label>
                        </div>
                      </div>
                      <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          class="btn btn-primary btn-lg"
                          style={{
                            backgroundColor: "#c4041d",
                            borderColor: "#c4041d",
                          }}
                        >
                          Sign In
                        </button>
                      </div>
                      <div class="text-center">
                        <p>
                          Not a member?{" "}
                          <a href="./signup" style={{ color: "#c4041d" }}>
                            Register
                          </a>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Signin.propTypes = {};
