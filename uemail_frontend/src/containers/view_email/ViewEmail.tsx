import React from 'react';
import axios from 'axios';
import { RouteComponentProps } from "react-router";

import { Email } from './types';
import ViewEmailPage from '../../components/view_email/ViewEmail';
import { ApplicationState, ConnectedReduxProps } from "../../store";
import { ViewEmailState } from "../../store/view_email/types";
import { updateCurrentPageEmail, updateViewEmailPageTypeAndEmailId } from "../../store/view_email/actions";
import { connect } from 'react-redux';
import { checkAuthorizationState } from "../../utils/checkAuthorizationState";


interface ViewEmailProps extends ConnectedReduxProps<ViewEmailState>, RouteComponentProps<{}> {
}

type allProps = ViewEmailProps & ViewEmailState;

class ViewEmail extends React.Component<allProps> {
  constructor(props: allProps) {
    super(props);

    if (!checkAuthorizationState()) {
      this.props.history.push('/');
    }

    this.delete = this.delete.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  getEmail(email_id: number, page_type: string): Promise<Email> {
    return axios.get(
      `http://localhost:3000/email/get_email?email_id=${email_id}&type=${page_type}`
    ).then((res) => {
      return res.data;
    });
  }

  componentDidMount() {
    const pathname = this.props.location.pathname.split("/");
    const email_id = parseInt(pathname[pathname.length - 1]);
    const page_type = (this.props.location.pathname.split("/")[pathname.length - 2]);
    this.props.dispatch(updateViewEmailPageTypeAndEmailId(page_type, email_id));

    if (email_id && page_type) {
      this.getEmail(email_id, page_type).then((email) => {
        this.props.dispatch(updateCurrentPageEmail(email));
      });
    } else {
      this.props.history.go(-1);
    }
  }

  goBack() {
    if (!!this.props.page_type) {
      this.props.history.go(-1);
    } else {
      this.props.history.push('http://localhost:8080/inbox');
    }
  }

  delete() {
    axios.post(`http://localhost:3000/email/delete`, {
        email_ids: [this.props.email_id],
        page_type: this.props.page_type
      })
      .then(res => {
        if (!!res.data) {
          this.goBack();
        }
      });
  }

  render() {
    return <div>
      <ViewEmailPage
        page_type={this.props.page_type}
        email_id={this.props.email_id}
        email={this.props.email}
        goBack={this.goBack}
        delete={this.delete}
      />
    </div>;
  }
}

const mapStateToProps = (state: ApplicationState) => state.view_email;

export default connect(mapStateToProps)(ViewEmail);
