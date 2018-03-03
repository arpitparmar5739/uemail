import * as React from 'react';

export interface AboutPageProps {
  name: string;
  surname: string;
}

class AboutPage extends React.Component<AboutPageProps, object> {
  public render() {

    return (
      <div className={'HomePage'}>
        Welcome to about page.
      </div>
    );
  }
}

export default AboutPage;
