import React from "react";
import Dashboard from "./dashboard";
import Signup from "./signup";

export default function Homepage(props) {
  return <div>{props.user === undefined ? <Signup /> : <Dashboard />}</div>;
}

Homepage.propTypes = {};
