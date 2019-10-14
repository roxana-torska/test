import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function Modal(props) {
    const { classes } = props
    console.log("class=====>", classes.styledHeader);
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleCancel}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle
                    id="draggable-dialog-title"
                    className={classes.styledHeader}>
                    <span style={{ color: 'red' }}>
                        Thank You
                    </span>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Reviewing and sharing dishes grant you presents!
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleCancel} color="black">
                        Review
          </Button>
                    <Button onClick={props.handleCancel} color="primary">
                        Share
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}