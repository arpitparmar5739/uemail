import * as React from 'react';
import {Button, ButtonGroup, FormControl, FormGroup, HelpBlock} from 'react-bootstrap';
import {FormEvent} from 'react';

export interface SignupFormProps {
  user: {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    firstname: string,
    lastname: string,
    phone: string
    [key: string]: string
  };
  errors: {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    firstname: string,
    lastname: string,
    phone: string
    [key: string]: string
  };

  message: {
    error: string,
    success: string
  };

  onChange (e: FormEvent<FormControl>): void;

  onSubmit(): void;

  getValidationState(field: string): 'success' | 'warning' | 'error' | null;
}

export default function SignupForm(props: SignupFormProps) {
  return (
    <form>
      <FormGroup controlId="username_signup" validationState={props.getValidationState('username')}>
        <HelpBlock>
          <p className="text-danger text-center">{props.message.error}</p>
          <p className="text-success text-center">{props.message.success}</p>
        </HelpBlock>
        <FormControl
          name="username"
          type="text"
          value={props.user.username}
          placeholder="Username"
          onChange={props.onChange}
        />
        <HelpBlock>
          <p className="text-danger">{props.errors.username}</p>
        </HelpBlock>
      </FormGroup>

      <FormGroup controlId="email" validationState={props.getValidationState('email')}>
        <FormControl
          name="email"
          type="text"
          value={props.user.email}
          placeholder="Email"
          onChange={props.onChange}
        />
        <HelpBlock>
          <p className="text-danger">{props.errors.email}</p>
        </HelpBlock>
      </FormGroup>

      <FormGroup controlId="password_signup" validationState={props.getValidationState('password')}>
        <FormControl
          name="password"
          type="password"
          value={props.user.password}
          placeholder="Password"
          onChange={props.onChange}
        />
        <HelpBlock>
          <p className="text-danger">{props.errors.password}</p>
        </HelpBlock>
      </FormGroup>

      <FormGroup controlId="confirm_password_signup" validationState={props.getValidationState('confirmPassword')}>
        <FormControl
          name="confirmPassword"
          type="password"
          value={props.user.confirmPassword}
          placeholder="Confirm Password"
          onChange={props.onChange}
        />
        <HelpBlock>
          <p className="text-danger">{props.errors.confirmPassword}</p>
        </HelpBlock>
      </FormGroup>

      <FormGroup controlId="firstname" validationState={props.getValidationState('firstname')}>
        <FormControl
          name="firstname"
          type="text"
          value={props.user.firstname}
          placeholder="First Name"
          onChange={props.onChange}
        />
        <HelpBlock>
          <p className="text-danger">{props.errors.firstname}</p>
        </HelpBlock>
      </FormGroup>

      <FormGroup controlId="lastname" validationState={props.getValidationState('lastname')}>
        <FormControl
          name="lastname"
          type="text"
          value={props.user.lastname}
          placeholder="Last Name"
          onChange={props.onChange}
        />
        <HelpBlock>
          <p className="text-danger">{props.errors.lastname}</p>
        </HelpBlock>
      </FormGroup>

      <FormGroup controlId="phone" validationState={props.getValidationState('phone')}>
        <FormControl
          name="phone"
          type="text"
          value={props.user.phone}
          placeholder="Contact Number"
          onChange={props.onChange}
        />
        <HelpBlock>
          <p className="text-danger">{props.errors.phone}</p>
        </HelpBlock>
      </FormGroup>

      <ButtonGroup>
        <Button onClick={props.onSubmit}>Submit</Button>
      </ButtonGroup>
    </form>
  );
}
