import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Form, Field } from 'react-final-form';

import Button from 'material-ui/Button';

import TextField from './TextField';

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit,
  },
});

const validate = ({ username, password }) => {
  const errors = {};
  if (!username) {
    errors.username = 'Required';
  }
  if (!password) {
    errors.password = 'Required';
  }
  return errors;
};

export const LoginForm = ({ classes, loginMutation, loading }) => (
  <Form
    onSubmit={loginMutation}
    validate={validate}
    render={({ handleSubmit }) => (
      <form className={classes.container} onSubmit={handleSubmit} noValidate autoComplete="off">
        <Field
          label="Username"
          placeholder="Type your username"
          name="username"
          type="text"
          className={classes.textField}
          margin="normal"
          component={TextField}
          autoComplete="username"
          fullWidth
        />
        <Field
          label="Password"
          placeholder="Type your password"
          name="password"
          type="password"
          className={classes.textField}
          margin="normal"
          component={TextField}
          autoComplete="password"
          fullWidth
        />
        <Button
          className={classes.button}
          variant="raised"
          color="primary"
          type="submit"
          disabled={loading}
          fullWidth
        >
          Login
        </Button>
      </form>
    )}
  />
);

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm);
