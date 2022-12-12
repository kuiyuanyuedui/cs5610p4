import React from "react";
import { useState } from "react";

/* This is the Signup component that enables user to sign up. */
export default function Signup() {
  const [values, setValues] = useState({
    user: "",
    password: "",
    email: "",
  });
  const [signupError, setSignupError] = useState("");

  async function onSubmit(evt) {
    console.log("submitting");
    evt.preventDefault();
    const data = {
      user: values.user,
      password: values.password,
      email: values.email,
    };

    if (data.email.endsWith("northeastern.edu")) {
    } else {
      alert("invalid email address");
      return;
    }

    const res = await fetch("./api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    // console.log(res);
    const resUser = await res.json();
    if (resUser.isLoggedIn) {
      let loggedInEmail = resUser.user_details.email;
      localStorage.setItem("loggedInEmail", loggedInEmail);
      window.location.href = "/";
    } else {
      // TODO: handle signup failure.
      //showMessage(resUser.err);
      alert("Sign up failed: please change your username/password");
      return;
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
                      Nice to meet you,{" "}
                      <span style={{ color: "#c4041d" }}>N</span>Uer!
                    </p>
                    <form class="mx-1 mx-md-4" onSubmit={onSubmit}>
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            type="user"
                            id="form2Example1"
                            name="user"
                            class="form-control"
                            required="true"
                            value={values.user}
                            onChange={(e) => {
                              setValues((values) => ({
                                user: e.target.value,
                                password: values.password,
                                email: values.email,
                              }));
                            }}
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
                            id="form2Example2"
                            name="password"
                            class="form-control"
                            required={true}
                            value={values.password}
                            onChange={(e) => {
                              setValues((values) => ({
                                user: values.user,
                                password: e.target.value,
                                email: values.email,
                              }));
                            }}
                          />
                          <label class="form-label" for="form3Example4c">
                            Password
                          </label>
                        </div>
                      </div>
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            class="form-control"
                            required={true}
                            value={values.email}
                            onChange={(e) => {
                              setValues((values) => ({
                                user: values.user,
                                password: values.password,
                                email: e.target.value,
                              }));
                            }}
                          />
                          <label class="form-label">
                            NEU Email Address (This site is currently open to
                            NEU students only)
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
                          Sign Up
                        </button>
                      </div>
                      <div class="text-center">
                        <p>
                          Already has an account?{" "}
                          <a href="./signin" style={{ color: "#c4041d" }}>
                            Sign in
                          </a>
                        </p>
                      </div>
                    </form>
                  </div>
                  <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      class="img-fluid"
                      alt="Sample image"
                    ></img>
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
