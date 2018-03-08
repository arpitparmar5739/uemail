import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface HomePageProps {
  url: string;
}

interface HomePageState {
}

class HomePage extends React.Component<HomePageProps & RouteComponentProps<{}>, HomePageState> {
  public render() {
    return (
      <div className={'HomePage'}>
        Pathname = {this.props.location.pathname}
      </div>
    );
  }
}

export default HomePage;
