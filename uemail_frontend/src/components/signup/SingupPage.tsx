import React from 'react';
import {
  Button,
  ButtonGroup,
  HelpBlock,
  FormControl,
  FormGroup,
  Thumbnail
} from "react-bootstrap";

function SignupPage() {
  return <div className={"Container"}>
    <Thumbnail className={"col-md-6 col-md-offset-3"}>
      <h1>Sign Up</h1>
      <hr />
      <div>
        <form>
          <HelpBlock>
            <p className="text-danger text-center">{}</p>
            <p className="text-success text-center">{}</p>
          </HelpBlock>
          <FormGroup controlId="username_signup">
            <FormControl
              name="username"
              type="text"
              placeholder="Username"
            />
            <HelpBlock>
              <p className="text-danger">{}</p>
            </HelpBlock>
          </FormGroup>

          <FormGroup controlId="email">
            <FormControl
              name="email"
              type="text"
              placeholder="Email"
            />
            <HelpBlock>
              <p className="text-danger">{}</p>
            </HelpBlock>
          </FormGroup>

          <FormGroup controlId="password_signup">
            <FormControl
              name="password"
              type="password"
              placeholder="Password"
            />
            <HelpBlock>
              <p className="text-danger">{}</p>
            </HelpBlock>
          </FormGroup>

          <FormGroup controlId="confirm_password_signup">
            <FormControl
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
            />
            <HelpBlock>
              <p className="text-danger">{}</p>
            </HelpBlock>
          </FormGroup>

          <FormGroup controlId="firstname">
            <FormControl
              name="firstname"
              type="text"
              placeholder="First Name"
            />
            <HelpBlock>
              <p className="text-danger">{}</p>
            </HelpBlock>
          </FormGroup>

          <FormGroup controlId="lastname">
            <FormControl
              name="lastname"
              type="text"
              placeholder="Last Name"
            />
            <HelpBlock>
              <p className="text-danger">{}</p>
            </HelpBlock>
          </FormGroup>

          <FormGroup controlId="phone">
            <FormControl
              name="phone"
              type="text"
              placeholder="Contact Number"
            />
            <HelpBlock>
              <p className="text-danger">{}</p>
            </HelpBlock>
          </FormGroup>

          <ButtonGroup>
            <Button>Submit</Button>
          </ButtonGroup>
        </form>
      </div>
    </Thumbnail>
  </div>;
}

export default SignupPage;
