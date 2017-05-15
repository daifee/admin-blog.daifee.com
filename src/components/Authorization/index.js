import React from 'react';


export default class Authorization extends React.Component {
  render() {
    let {children} = this.props;

    return children;
  }

  componentWillMount() {
    let {session, history} = this.props;

    if (!session) {
      history.replace('/');
    }
  }
}

