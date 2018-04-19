import React from 'react';
import "../../styles/inbox.css";
import { OverlayTrigger, Popover, FormGroup, FormControl } from 'react-bootstrap';
import { ViewEmailState } from "../../store/view_email/types";
import { setTime } from "../../utils/timeFormating";

interface ViewEmailProps extends ViewEmailState {
  goBack(): void;

  delete(): void;
}

const ViewEmail: React.SFC<ViewEmailProps> = (props: ViewEmailProps) => {
  if (props.email) {
    const popoverBottom = (
      <Popover id="popover-positioned-bottom" className={"popover"} title="Details">
        <table>
          <tbody>
          <tr>
            <td>To:</td>
            <td>{props.email.to.replace(/,/g, ", ")}</td>
          </tr>
          <tr>
            <td>CC:</td>
            <td>{props.email.cc && props.email.cc.replace(/,/g, ", ")}</td>
          </tr>
          <tr>
            <td>BCC:</td>
            <td>{props.email.bcc && props.email.bcc.replace(/,/g, ", ")}</td>
          </tr>
          </tbody>
        </table>
      </Popover>
    );

    return <div className="container">
      <div className="view-email col-md-8 col-md-offset-2">
        <aside className="lg-side">
          <div className="inbox-body">
            <div className="mail-option">
              <div className="btn-group back" onClick={() => {
                props.goBack()
              }}>
                <a className="btn btn-default">
                  <i className="fa fa-arrow-left" /> <span>{props.page_type}</span>
                </a>
              </div>
              <div className="btn-group pull-right" onClick={() => {
                props.delete()
              }}>
                <a className="btn btn-default">
                  Delete <i className="fa fa-trash" />
                </a>
              </div>
            </div>
          </div>
          <div className={"subject"}><b>{props.email.subject}</b></div>
          <hr className={"mail-option"} />
          <div>
            <div className={"to-cc-bcc"}>
              <OverlayTrigger trigger="click" placement="bottom" overlay={popoverBottom}>
                <span>{props.email.sent_by} <i className={"fa fa-angle-down"} /></span>
              </OverlayTrigger>
              <div className={"pull-right"}>{setTime(props.email.created_at)}</div>
            </div>
            <hr className={"mail-option"} />
            <div className={"preformatted"}>
              {props.email.body}
            </div>
          </div>
        </aside>
      </div>
    </div>;
  }
  return null;
};

export default ViewEmail;
