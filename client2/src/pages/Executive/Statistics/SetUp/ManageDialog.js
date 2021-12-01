import React,{useState} from 'react';
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
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function ManageDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;
  const [unSubmitStd, setunSubmitStd] = useState(['홍길동', '김철수'])

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value, type) => {
    if (type == 'delete') {
      setunSubmitStd(unSubmitStd.filter(std => std !== value))
    }
    else if (type =='useCoupon'){

    }else if (type=='addUnSubmitStd'){

    }
    

  };

  return (
    <Dialog fullScreen onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">미제출 학생</DialogTitle>
      <List>
        {unSubmitStd.map((std) => (
          <ListItem key={std}>
             <IconButton onClick={() => handleListItemClick(std, 'delete')}>
              <Icon>
                remove_circle_outline
              </Icon>
            </IconButton>
            <IconButton onClick={() => handleListItemClick(std,'useCoupon')}>
              <Icon>
                card_giftcard
              </Icon>
            </IconButton>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <Icon>
                  person_outline
                </Icon>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={std} />
           
          </ListItem>
        ))}

        <ListItem autoFocus button onClick={() => handleListItemClick('addUnSubmitStd')}>
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
      <Button color="primary" onClick={() => handleClose()}>저장</Button>
        <Button color="primary" onClick={() => handleClose()}>취소</Button>
      </DialogActions>
    </Dialog>
  );
}

ManageDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.object.isRequired,
};

