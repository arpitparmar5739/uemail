import * as React from 'react';

interface ContactPageProps {}

interface ContactPageState {}

class ContactPage extends React.Component<ContactPageProps, ContactPageState> {
  constructor(props: ContactPageProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        Contacts Page.
      </div>
    );
  }
}

export default ContactPage;
