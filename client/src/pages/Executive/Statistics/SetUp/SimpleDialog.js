import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import { Button, Icon, IconButton } from '@material-ui/core';

const unSubmitStd = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog fullScreen onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">미제출 학생</DialogTitle>

      <List>
        {unSubmitStd.map((email) => (
          <ListItem >
            <IconButton onClick={() => handleListItemClick(email)} key={email}>
              <Icon>
              remove_circle_outline
              </Icon>
            </IconButton>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <Icon>
                  person_outline
                </Icon>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))}

        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <Icon>
                person_add_alt
              </Icon>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="미제출 학생 추가" />
        </ListItem>
      </List>
      <DialogActions>
        <Button color="primary" onClick={handleListItemClick}>취소</Button>
      </DialogActions>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

