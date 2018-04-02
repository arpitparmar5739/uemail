import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from "react-bootstrap";

function WelcomePage() {
  return (
    <div className={"jumbotron text-center"}>
      <h1>Welcome to Uemail</h1>
      <hr />
      <div>
        <NavLink to={"/signup"}>
          <Button bsStyle={"primary"}>Sign Up</Button>
        </NavLink>

        <NavLink to={"/login"} className={"col-sm-offset-1"}>
          <Button bsStyle={"primary"}>Login</Button>
        </NavLink>
      </div>
    </div>
  );
}

export default WelcomePage;
