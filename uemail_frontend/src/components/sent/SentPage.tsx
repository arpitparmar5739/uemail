import React from 'react';
import '../../styles/inbox.css';
import { SentEmail, SentState } from '../../store/sent/types';
import { setTime } from '../../utils/timeFormating';

interface SentPageProps extends SentState {
  changeCurrentPage(next: boolean): void;

  selectAll(): void;

  viewEmail(emailId: number): void;

  delete(): void;

  refreshCurrentPage(): void;
}

function listItem(email: SentEmail, viewEmail: Function): JSX.Element {
  return (
    <tr
      key={email.id}
      onClick={() => {
        viewEmail(email.id);
      }}
    >
      <td className={'col-xs-4 col-sm-3'}>
        <input
          type="checkbox"
          id={`${email.id}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
        <span className={'sender-name'}>{email.senderName}</span>
      </td>
      <td className={'col-xs-5 col-sm-7'}>{email.subject}</td>
      <td className="text-right col-xs-3 col-sm-2">{setTime(email.time)}</td>
    </tr>
  );
}

const SentPage: React.SFC<SentPageProps> = (props: SentPageProps) => {
  const totalEmails: number = props.totalEmails;
  const currentPage: number = props.currentPage;

  let emails: JSX.Element[] = [];

  for (const email of props.emails) {
    emails.push(listItem(email, props.viewEmail));
  }

  return (
    <div className="container">
      <div className="mail-box">
        <aside className="lg-side">
          <div className="inbox-body">
            <div className="mail-option">
              <div className="chk-all">
                <input
                  type="checkbox"
                  id={'selectAll'}
                  className="mail-checkbox mail-group-checkbox"
                  onClick={props.selectAll}
                /> All
              </div>
              <div className="btn-group">
                <a
                  data-original-title="Refresh"
                  data-placement="top"
                  data-toggle="dropdown"
                  className="btn tooltips"
                  onClick={props.refreshCurrentPage}
                >
                  Refresh <i className="fa fa-sync-alt"/>
                </a>
              </div>
              <div className="btn-group">
                <a
                  className="btn btn-default"
                  onClick={props.delete}
                >
                  Delete <i className="fa fa-trash"/>
                </a>
              </div>
              <ul className="unstyled inbox-pagination">
                <li>
                  <span>
                    <b>
                      {totalEmails && (currentPage * 50 - 49)} -
                      {currentPage * 50 < totalEmails ? currentPage * 50 : totalEmails}
                      </b> of <b>{props.totalEmails}</b>
                  </span>
                </li>
                <li>
                  <a
                    className="np-btn"
                    onClick={() => {
                      props.changeCurrentPage(false);
                    }}
                  >
                    <i className="fas fa-angle-left pagination-left"/>
                  </a>
                </li>
                <li>
                  <a
                    className="np-btn"
                    onClick={() => {
                      props.changeCurrentPage((true));
                    }}
                  >
                    <i className="fas fa-angle-right"/>
                  </a>
                </li>
              </ul>
            </div>
            <table className="table table-inbox table-hover">
              <tbody>
              {emails}
              </tbody>
            </table>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SentPage;
