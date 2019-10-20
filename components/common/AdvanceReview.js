import React, { Component } from "react";
import CaptureImage from "./CaptureImage";
import { Modal, Grid, Typography } from "@material-ui/core";
import { Camera, PhotoCameraSharp, PhotoCameraTwoTone, PhotoCamera, Add, Remove, Close, AddCircleOutlineOutlined, AddCircleRounded, CancelRounded, CheckCircleOutlineRounded } from "@material-ui/icons";

import ReactTags from 'react-tag-autocomplete'
import ReviewTags from "./ReviewTags";

class AdvanceReview extends Component {
    state = {
        tags: [
            { id: 1, name: "Apples" },
            { id: 2, name: "Pears" }
        ],
        showInput: false,
        top: "",
        left: "",
    }
    handleDelete = (i) => {
        const tags = this.state.tags.slice(0)
        tags.splice(i, 1)
        this.setState({ tags })
    }

    handleAddition = (tag) => {
        const tags = [].concat(this.state.tags, tag)
        this.setState({ tags })
    }
    showInputField = () => {
        this.setState({
            showInput: true,
        })
    }


    render() {
        const { open, handleClose, dishImage, top, left } = this.props;
        console.log(top);
        console.log(left);
        const { tags } = this.state;
        return (
            <Modal
                style={{

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                }}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={{
                    width: 370,
                    height: 258,
                    backgroundColor: "white",
                    border: '2px solid #000',
                    padding: "10px"
                }}>
                    <Grid container direction="column">

                        <Grid container direction="row">
                            <Grid item xs={5}>
                                <img
                                    src={dishImage}
                                    alt="not found"
                                    width="115px"
                                    height="105px" />

                                <div style={{
                                    position: "absolute",
                                    top: `${top}px`,
                                    left: `${left}px`,
                                    color: "white"
                                }}><PhotoCamera />

                                </div>
                            </Grid>
                            <Grid container justify="center" xs={5}>
                                <Grid>
                                    <Typography
                                        style={{
                                            fontSize: "20px",
                                            fontFamily: "Bebas Neue",
                                            color: "#938E8E",
                                            marginLeft: "20px",
                                        }}
                                    >
                                        HAMBURGER
                                </Typography>
                                </Grid>

                                <Grid container direction="row">
                                    <Grid xs={2}>
                                        <Remove />
                                    </Grid>

                                    <Grid xs={8}>
                                        <Typography
                                            style={{
                                                display: "inline",
                                                color: "#E53935",
                                                lineHeight: "20px",
                                                fontSize: "40px",
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            4.5
                                    </Typography>
                                    </Grid>
                                    <Grid xs={2}>
                                        <Add />
                                    </Grid>
                                </Grid>
                                <Grid>
                                    <Typography>
                                        Advanced review
                                </Typography>
                                </Grid>

                            </Grid>

                        </Grid>
                        <Grid>
                            <Typography style={{
                                color: "#938E8E",
                                fontSize: "13px",
                                fontFamily: "lato",
                                lineHeight: "16px"
                            }}>
                                Like
                                </Typography>
                            <ReviewTags
                                showInput={this.state.showInput}
                                showInputField={this.showInputField}
                                tags={this.state.tags} />
                        </Grid>
                        <Grid>
                            <Typography style={{
                                color: "#938E8E",
                                fontSize: "13px",
                                fontFamily: "lato",
                                lineHeight: "16px"
                            }}>
                                Dislike
                                </Typography>
                            <ReviewTags
                                showInput={this.state.showInput}
                                showInputField={this.showInputField}
                                tags={this.state.tags} />
                        </Grid>

                    </Grid>

                </div>
            </Modal >

        )
    }
}
export default AdvanceReview; 