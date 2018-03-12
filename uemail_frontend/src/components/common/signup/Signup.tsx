import * as React from 'react';

interface SignupProps {}
interface SignupState {}

class Signup extends React.Component<SignupProps, SignupState> {
  constructor(props: SignupProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        Signup
      </div>
    );
  }
}

export default Signup;
