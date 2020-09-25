
import React, { Component } from 'react';
import { Grid, Avatar, Typography, withStyles } from '@material-ui/core';
import { RemoveCircleOutlineOutlined, CheckCircleOutlineRounded, CloseRounded } from '@material-ui/icons';
import styles from '../../styles/common';
class SaveRating extends Component {
    state = {
        dish: 0,
    }
    render() {
        const { classes, type, openModal, handleClose } = this.props;
        return (
            <Grid container direction='row' style={{ width: "100%", margin: "5%", paddingTop: "10%" }}>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={2} >
                    <CloseRounded
                        style={{
                            float: "right",
                            border: "1px solid grey ",
                            borderRadius: "50%"
                        }}
                        onClick={handleClose}

                    />
                </Grid>
                <Grid item xs={6}>

                </Grid>
                <Grid item xs={2}  >
                    <CheckCircleOutlineRounded style={{ float: "right" }} onClick={openModal} />
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
        )
    }
}
export default withStyles(styles)(SaveRating);