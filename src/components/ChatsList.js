import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import get from 'lodash/get';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';

import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import { titleInitials } from '../utils/helpers';
import { distanceInWords } from '../utils/date';

const styles = theme => ({
  root: {
    height: `calc(100% - ${theme.spacing.unit * 15}px)`,
    overflow: 'auto',
  },
  selected: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  link: {
    textDecoration: 'none',
  },
});

export class ChatsList extends React.Component {
  onClick = (e) => {
    const chatId = e.currentTarget.getAttribute('data-id');
    this.props.onSelect(chatId);
  };

  render() {
    const { classes, chats, disabled } = this.props;
    const activeChat = get(this.props, 'activeChat.data');
    if (chats.loading) {
      return null;
    }
    return (
      <List className={classes.root}>
        {chats.data.map(d => (
          <Link className={classes.link} key={d._id} to={`/chats/${d._id}`}>
            <ListItem
              data-id={d._id}
              className={classnames({ [classes.selected]: activeChat && activeChat._id === d._id })}
              button
              disabled={disabled}
              onClick={this.onClick}
            >
              <Avatar style={{ backgroundColor: d.color }}>{titleInitials(d.title)}</Avatar>
              <ListItemText primary={d.title} secondary={distanceInWords(d.createdAt)} />
            </ListItem>
          </Link>
        ))}
      </List>
    );
  }
}

ChatsList.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  onSelect: PropTypes.func,
};

ChatsList.defaultProps = {
  onSelect: () => {},
};

export default withStyles(styles)(ChatsList);
