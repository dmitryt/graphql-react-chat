import React from 'react';
import { branch } from 'recompose';
import { withStyles } from 'material-ui';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/Progress/CircularProgress';

const styles = () => ({
  container: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Loader = ({ classes }) => (
  <Paper className={classes.container}>
    <CircularProgress />
  </Paper>
);

const withLoader = active => branch(active, () => withStyles(styles)(Loader));

export default withLoader;
