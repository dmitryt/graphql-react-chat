import React from 'react';
import NotificationSystem from 'react-notification-system';

export const NotificationContext = React.createContext();

class NotificationProvider extends React.Component {
  constructor(props) {
    super(props);
    this._ref = React.createRef();
  }
  render() {
    return (
      <NotificationContext.Provider value={this._ref}>
        {this.props.children}
        <NotificationSystem ref={this._ref} />
      </NotificationContext.Provider>
    );
  }
}

export default NotificationProvider;
