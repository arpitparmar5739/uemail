import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { SentEmail, SentState } from '../../store/sent/types';
import SentPageForm from '../../components/sent/SentPage';
import { ApplicationState, ConnectedReduxProps } from '../../store';
import {
  updateCurrentPage,
  updateCurrentPageEmails,
  updateTotalSentEmails
} from '../../store/sent/actions';
import { checkAuthorizationState } from '../../utils/checkAuthorizationState';
import { BASE_URL } from '../../index';

interface SentPageProps extends ConnectedReduxProps<SentState>, RouteComponentProps<{}> {
}

type allProps = SentPageProps & SentState;

class SentPage extends React.Component<allProps> {
  constructor(props: allProps) {
    super(props);

    if (!checkAuthorizationState()) {
      this.props.history.push('/');
    }

    this.delete = this.delete.bind(this);
    this.viewEmail = this.viewEmail.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
    this.getCurrentPageEmails = this.getCurrentPageEmails.bind(this);
  }

  checkIfEmailIsSelected(id: number): boolean {
    const select = document.getElementById(id.toString());
    return !!select && (select as HTMLInputElement).checked;
  }

  viewEmail(emailId: number): void {
    this.props.history.push(`${this.props.location.pathname}/${emailId}`);
  }

  delete(): void {
    let selectAll = document.getElementById('selectAll');
    (selectAll as HTMLInputElement).checked = false;

    const allDeleteEmailIds: number[] = [];
    this.props.emails.forEach(email => {
      if (this.checkIfEmailIsSelected(email.id)) {
        allDeleteEmailIds.push(email.id);
      }
    });
    axios.post(`${BASE_URL}email/delete`, {email_ids: allDeleteEmailIds, page_type: 'sent'})
      .then(res => {
        if (!!res.data) {
          this.componentDidMount();
        }
      });
  }

  selectAll(): void {
    let selectAll = document.getElementById('selectAll');
    let check: boolean = !!selectAll && (selectAll as HTMLInputElement).checked;
    this.props.emails.forEach(email => {
      let select = document.getElementById(`${email.id}`);
      (select as HTMLInputElement).checked = check;
    });
  }

  getCurrentPageEmails(): void {
    this.getEmails(this.props.currentPage).then(emails => {
      this.props.dispatch(updateCurrentPageEmails(emails));
    });

    this.setTotalEmails();
  }

  getEmails(currentPage: number): Promise<SentEmail[]> {
    return axios.get(`${BASE_URL}email/get_emails?page=${currentPage}&type=sent`).then((res) => {
      let inboxEmails: SentEmail[] = [];
      res.data.forEach((email: any) => {
        inboxEmails.push({
          id: email.id,
          time: email.created_at,
          senderName: email.to,
          subject: email.subject
        });
      });
      return inboxEmails;
    });
  }

  setTotalEmails(): void {
    axios.get(`${BASE_URL}email/totalEmails?type=sent`).then(res => {
      return res.data.totalEmails;
    }).then(totalEmails => {
      this.props.dispatch(updateTotalSentEmails(totalEmails));
    });
  }

  // Also used to refresh the page.
  componentDidMount() {
    this.getCurrentPageEmails();
  }

  changeCurrentPage(next: boolean): void {
    if (
      (this.props.currentPage === 1 && !next) ||
      (this.props.currentPage * 50 >= this.props.totalEmails && next)
    ) {
      return;
    }

    if (next) {
      this.props.dispatch(updateCurrentPage(this.props.currentPage + 1));
      this.getEmails(this.props.currentPage + 1).then(emails => {
        this.props.dispatch(updateCurrentPageEmails(emails));
      });
    } else {
      this.props.dispatch(updateCurrentPage(this.props.currentPage - 1));
      this.getEmails(this.props.currentPage - 1).then(emails => {
        this.props.dispatch(updateCurrentPageEmails(emails));
      });
    }
  }

  render() {
    return (
      <div>
        <SentPageForm
          changeCurrentPage={this.changeCurrentPage}
          refreshCurrentPage={this.componentDidMount}
          currentPage={this.props.currentPage}
          totalEmails={this.props.totalEmails}
          emails={this.props.emails}
          selectAll={this.selectAll}
          delete={this.delete}
          viewEmail={this.viewEmail}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => state.sent;

export default connect(mapStateToProps)(SentPage);
