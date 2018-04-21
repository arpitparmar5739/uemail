import React, { FormEvent } from 'react';
import {
  Button,
  ButtonGroup,
  HelpBlock,
  FormControl,
  FormGroup,
  Thumbnail
} from 'react-bootstrap';
import { formValidationState } from '../../types';
import { SignupState } from '../../store/signup/types';

interface SignupFormProps {
  signup: SignupState;

  handleChange(e: FormEvent<FormControl>): void;

  submit(): void;

  getValidationState(field: string): formValidationState;
}

const SignupForm: React.SFC<SignupFormProps> =
  ({signup, handleChange, submit, getValidationState}: SignupFormProps) => {
    return (
      <div className={'Container'}>
        <Thumbnail className={'col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2'}>
          <h1>Sign Up</h1>
          <hr/>
          <div>
            <form>
              <HelpBlock>
                <p
                  className={
                    'text-center ' +
                    (signup.message.status === 'success' ? 'text-success' : 'text-danger')
                  }
                >
                  {signup.message.value}
                </p>
              </HelpBlock>
              <FormGroup controlId="username" validationState={getValidationState('username')}>
                <FormControl
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={signup.user.username}
                  onChange={handleChange}
                />
                <HelpBlock>
                  <p className="text-danger">{signup.errors.username}</p>
                </HelpBlock>
              </FormGroup>

              <FormGroup controlId="email" validationState={getValidationState('email')}>
                <FormControl
                  name="email"
                  type="text"
                  placeholder="Email"
                  value={signup.user.email}
                  onChange={handleChange}
                />
                <HelpBlock>
                  <p className="text-danger">{signup.errors.email}</p>
                </HelpBlock>
              </FormGroup>

              <FormGroup controlId="password" validationState={getValidationState('password')}>
                <FormControl
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={signup.user.password}
                  onChange={handleChange}
                />
                <HelpBlock>
                  <p className="text-danger">{signup.errors.password}</p>
                </HelpBlock>
              </FormGroup>

              <FormGroup controlId="confirmPassword" validationState={getValidationState('confirmPassword')}>
                <FormControl
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={signup.user.confirmPassword}
                  onChange={handleChange}
                />
                <HelpBlock>
                  <p className="text-danger">{signup.errors.confirmPassword}</p>
                </HelpBlock>
              </FormGroup>

              <FormGroup controlId="firstname" validationState={getValidationState('firstname')}>
                <FormControl
                  name="firstname"
                  type="text"
                  placeholder="First Name"
                  value={signup.user.firstname}
                  onChange={handleChange}
                />
                <HelpBlock>
                  <p className="text-danger">{signup.errors.firstname}</p>
                </HelpBlock>
              </FormGroup>

              <FormGroup controlId="lastname" validationState={getValidationState('lastname')}>
                <FormControl
                  name="lastname"
                  type="text"
                  placeholder="Last Name"
                  value={signup.user.lastname}
                  onChange={handleChange}
                />
                <HelpBlock>
                  <p className="text-danger">{signup.errors.lastname}</p>
                </HelpBlock>
              </FormGroup>

              <FormGroup controlId="phone" validationState={getValidationState('phone')}>
                <FormControl
                  name="phone"
                  type="text"
                  placeholder="Contact Number"
                  value={signup.user.phone}
                  onChange={handleChange}
                />
                <HelpBlock>
                  <p className="text-danger">{signup.errors.phone}</p>
                </HelpBlock>
              </FormGroup>

              <ButtonGroup>
                <Button onClick={submit}>Submit</Button>
              </ButtonGroup>
            </form>
          </div>
        </Thumbnail>
      </div>
    );
  };

export default SignupForm;
