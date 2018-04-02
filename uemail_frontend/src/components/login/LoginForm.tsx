import React, { FormEvent } from 'react';
import { Button, ButtonGroup, HelpBlock, FormControl, FormGroup, Thumbnail } from "react-bootstrap";
import { LoginState } from "../../store/login/types";
import { formValidationState } from "../../types";

interface LoginFormProps {
  login: LoginState;

  handleChange(e: FormEvent<FormControl>): void;

  submit(): void;

  getValidationState(field: string): formValidationState;
}

const LoginForm: React.SFC<LoginFormProps> = ({login, handleChange, submit, getValidationState}: LoginFormProps) => {
  return <div className={"Container"}>
    <Thumbnail className={"col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2"}>
      <h1>Login</h1>
      <hr />
      <div>
        <form>
          <HelpBlock>
            <p className={
              'text-center ' +
              (login.message.status === 'success' ? 'text-success' : "text-danger")
            }>
              {login.message.value}
            </p>
          </HelpBlock>
          <FormGroup controlId="username" validationState={getValidationState('username')}>
            <FormControl
              name="username"
              type="text"
              placeholder="Username"
              value={login.user.username}
              onChange={handleChange}
            />
            <HelpBlock>
              <p className="text-danger">{login.errors.username}</p>
            </HelpBlock>
          </FormGroup>

          <FormGroup controlId="password" validationState={getValidationState('password')}>
            <FormControl
              name="password"
              type="password"
              placeholder="Password"
              value={login.user.password}
              onChange={handleChange}
            />
            <HelpBlock>
              <p className="text-danger">{login.errors.password}</p>
            </HelpBlock>
          </FormGroup>

          <ButtonGroup>
            <Button onClick={submit}>Submit</Button>
          </ButtonGroup>
        </form>
      </div>
    </Thumbnail>
  </div>;
};

export default LoginForm;
