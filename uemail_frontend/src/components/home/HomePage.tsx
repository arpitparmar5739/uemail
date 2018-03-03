import * as React from 'react';

export interface HomePageProps {
    name: string;
    surname: string;
}

class HomePage extends React.Component<HomePageProps, object> {
    public render() {
        const {name, surname} = this.props;

        return (
            <div className={'HomePage'}>
                Hello {name + ' ' + surname}!
            </div>
        );
    }
}

export default HomePage;
