import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

import LoginForm from '../containers/LoginForm';
import SignupForm from '../containers/SignupForm';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  content: theme.mixins.gutters({
    padding: '0 !important',
    position: 'relative',
    width: 500,
    margin: `${theme.spacing.unit * 3}px auto 0`,
  }),
});

export class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
    this._notificationSystem = React.createRef();
  }

  state = {
    value: 0,
  };

  onUserCreate = (notificationRef) => {
    notificationRef.addNotification({
      message: 'User has been created successfully. Please login',
      level: 'success',
    });
    this.handleChange(null, 0);
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <Fragment>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              DogeCodes React Chat
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper className={classes.content} elevation={4}>
          <AppBar position="sticky" color="default">
            <Tabs
              value={value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              fullWidth
            >
              <Tab label="Login" />
              <Tab label="Sign Up" />
            </Tabs>
          </AppBar>
          {value === 0 && (
            <TabContainer>
              <LoginForm />
            </TabContainer>
          )}
          {value === 1 && (
            <TabContainer>
              <SignupForm onMutationSuccess={this.onUserCreate} />
            </TabContainer>
          )}
        </Paper>
      </Fragment>
    );
  }
}

WelcomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(WelcomePage);
