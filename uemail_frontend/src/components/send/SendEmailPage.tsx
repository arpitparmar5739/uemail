import React, { FormEvent } from 'react';
import { Thumbnail, FormGroup, FormControl, HelpBlock, Button, ButtonGroup } from 'react-bootstrap';
import { SendState } from '../../store/send/types';
import { formValidationState } from '../../types';

interface SendEmailPageProps {
  send: SendState;

  handleChange(e: FormEvent<FormControl>): void;

  submit(): void;

  getValidationState(field: string): formValidationState;
}

const SendEmailPage: React.SFC<SendEmailPageProps> = (props: SendEmailPageProps) => {
  return (
    <div className={'container'}>
      <Thumbnail className={'col-md-10 col-md-offset-1'}>
        <div className={'text-center'}>
          <h4>Compose and Send Email</h4>
          <hr/>
        </div>
        <div>
          <form className={'col-md-8 col-md-offset-2'}>
            <HelpBlock>
              <p
                className={
                  'text-center ' +
                  (props.send.message.status === 'success' ? 'text-success' : 'text-danger')
                }
              >
                {props.send.message.value}
              </p>
            </HelpBlock>
            <FormGroup controlId="to" validationState={props.getValidationState('to')}>
              <FormControl
                name="to"
                type="text"
                placeholder="To"
                value={props.send.email.to}
                onChange={props.handleChange}
              />
              <HelpBlock>
                <p className="text-danger">{props.send.errors.to}</p>
              </HelpBlock>
            </FormGroup>

            <FormGroup controlId="cc" validationState={props.getValidationState('cc')}>
              <FormControl
                name="cc"
                type="text"
                placeholder="Cc"
                value={props.send.email.cc}
                onChange={props.handleChange}
              />
              <HelpBlock>
                <p className="text-danger">{props.send.errors.cc}</p>
              </HelpBlock>
            </FormGroup>

            <FormGroup controlId="bcc" validationState={props.getValidationState('bcc')}>
              <FormControl
                name="bcc"
                type="text"
                placeholder="Bcc"
                value={props.send.email.bcc}
                onChange={props.handleChange}
              />
              <HelpBlock>
                <p className="text-danger">{props.send.errors.bcc}</p>
              </HelpBlock>
            </FormGroup>

            <FormGroup controlId="subject" validationState={props.getValidationState('subject')}>
              <FormControl
                name="subject"
                type="text"
                placeholder="Subject"
                value={props.send.email.subject}
                onChange={props.handleChange}
              />
              <HelpBlock>
                <p className="text-danger">{props.send.errors.subject}</p>
              </HelpBlock>
            </FormGroup>

            <FormGroup controlId="body" validationState={props.getValidationState('body')}>
              <FormControl
                name="body"
                componentClass={'textarea'}
                rows={10}
                style={{resize: 'none'}}
                placeholder="Body"
                value={props.send.email.body}
                onChange={props.handleChange}
              />
              <HelpBlock>
                <p className="text-danger">{props.send.errors.body}</p>
              </HelpBlock>
            </FormGroup>

            <ButtonGroup>
              <Button onClick={props.submit}>Send</Button>
            </ButtonGroup>
          </form>
        </div>
      </Thumbnail>
    </div>
  );
};

export default SendEmailPage;
