
import React from 'react';
import Modal from '@material-ui/core/Modal';
import { Grid, Typography } from '@material-ui/core';
import { Remove, Add, Cancel, Check, CloseSharp } from '@material-ui/icons';


export default function RateCard(props) {
    return (
        <div>

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={props.open}
                onClose={props.handleClose}
            >
                <div style={{
                    position: 'absolute',
                    float: "right",
                    top: "390px",
                    right: "-10px",
                    width: 150,
                    backgroundColor: "white",
                    border: '2px solid #000',
                }}>
                    <Grid container direction="column">
                        <Grid container direction="row">
                            <Grid container >
                                <div style={{
                                    border: "1px solid #DADADA",
                                    color: "#DADADA",
                                }}>
                                    <Remove />
                                </div>
                            </Grid>
                            <Grid container justify="center" >
                                <Typography
                                    style={{
                                        fontFamily: "Bebas Neue",
                                        fontSize: "21px",
                                        lineHeight: "25px",
                                        color: "#E53935"
                                    }}
                                >
                                    8
                                </Typography>

                            </Grid>
                            <Grid container justify="center">
                                <div style={{
                                    border: "1px solid #DADADA",

                                }}>
                                    <Add />
                                </div>
                            </Grid>

                        </Grid>
                        <Grid container justify="center" direction="row">
                            <span style={{
                                paddingTop: "10px",
                                marginBottom: "10px",
                                borderBottom: "1px solid #757575",
                                color: "#757575",
                            }}>
                                make a review
                            </span>
                        </Grid>
                        <Grid container direction="row">
                            <Grid container xs={4}>
                                <div style={{
                                    border: " 1px solid #DADADA",
                                    color: "#DADADA",
                                }}>
                                    <CloseSharp />
                                </div>
                            </Grid>
                            <Grid xs={4} >

                            </Grid>
                            <Grid container justify="center">
                                <div style={{
                                    border: "1px solid #DADADA",


                                }}>
                                    <Check />
                                </div>
                            </Grid>
                        </Grid>


                    </Grid>

                </div>
            </Modal>
        </div >
    );
}