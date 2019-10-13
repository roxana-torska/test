import React, { Component } from 'react';


import { withStyles, Popover, Typography, Grid } from '@material-ui/core';
import styles from '../../styles/common';
import { AddCircleOutlineRounded, RemoveCircleOutlineRounded } from '@material-ui/icons';

class Modal extends Component {


    render() {
        const { classes, type, handleClose, anchorEl,bindPopover } = this.props;
        console.log("AnchorEl =====>", anchorEl)
        const elWidth = anchorEl ? anchorEl.offsetWidth : 0;
        console.log("element width:===>", elWidth);
        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;
        return (
            
            <Popover
              
                {...bindPopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}

            >
                <div style={{ width: `${elWidth}px`, height: "200px",  }}>
                    <Grid container direction='row' >
                        <Grid item xs="4">
                            <RemoveCircleOutlineRounded />
                        </Grid>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <AddCircleOutlineRounded />
                        </Grid>
                    </Grid>

                </div>

            </Popover>
          
        )
    }
}


export default withStyles(styles)(Modal)