import React, { Component } from "react";

import { Modal, Grid, Typography } from "@material-ui/core";
import { PhotoCamera, Add, Remove } from "@material-ui/icons";
import ReviewTags from "./ReviewTags";

class AdvanceReview extends Component {
    state = {
        likeTags: ["apples", "banana"],
        dislikeTags: ["hello", "hello2"],
        showLikeInput: false,
        likeItem: "",
        disLikeItem: "",
        showDisLikeInput: false,
        top: "",
        left: "",
    }
    addLikeItem = () => {
        let { likeTags, likeItem } = this.state;
        this.setState({
            likeTags: [...likeTags, likeItem],
            likeItem: "",
        })
    }
    addDisLikeItem = () => {
        let { dislikeTags, disLikeItem } = this.state;
        this.setState({
            dislikeTags: [...dislikeTags, disLikeItem],
            disLikeItem: ""
        })
    }

    handleLikeDelete = (i) => {
        console.log("index", i);
        const { likeTags } = this.state;
        const tags = likeTags.splice(i, 1);
        console.log("tags", tags);
        this.setState({
            likeTags,
        })
    }
    handleDisLikeDelete = (i) => {
        const { dislikeTags } = this.state;
        const tags = dislikeTags.splice(i, 1);
        console.log("tags", dislikeTags);
        this.setState({
            dislikeTags,
        })
    }

    closeLikeInput = () => {
        this.setState({
            showLikeInput: false
        })
    }

    closeDisLikeInput = () => {
        this.setState({
            showDisLikeInput: false
        })
    }

    handleLikeChange = (evt) => {
        this.setState({
            likeItem: evt.target.value,
        })

    }
    handleDisLikeChange = (evt) => {
        this.setState({
            disLikeItem: evt.target.value,
        })

    }

    // handleLikeAdd = ()=>{
    //     this.setState({
    //         likeTags:[...this.state,
    //         ]
    //     })
    // }
    showLikeInputField = () => {
        this.setState({
            showLikeInput: true,
        })
    }
    showDisLikeInputField = () => {
        this.setState({
            showDisLikeInput: true,
        })
    }



    render() {
        const { open, handleClose, dishImage, top, left } = this.props;
        console.log(top);
        console.log(left);
        const { likeTags, showDisLikeInput, showLikeInput, dislikeTags, likeItem, disLikeItem } = this.state;
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
                                    padding: "2em",
                                    marginLeft: "60px",
                                    marginTop: "-60px",
                                    transform: "translate(-50%, -50%)",
                                    color: "white"
                                }}><PhotoCamera />

                                </div>
                            </Grid>
                            <Grid container item justify="center" xs={5}>
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
                                    <Grid item xs={2}>
                                        <Remove />
                                    </Grid>

                                    <Grid item xs={8}>
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
                                    <Grid item xs={2}>
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
                                showInput={showLikeInput}
                                showInputField={this.showLikeInputField}
                                handleDelete={this.handleLikeDelete}
                                tags={likeTags}
                                closeInput={this.closeLikeInput}
                                handleChange={this.handleLikeChange}
                                value={likeItem}
                                handleSubmit={this.addLikeItem}
                            />
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
                                showInput={showDisLikeInput}
                                showInputField={this.showDisLikeInputField}
                                tags={dislikeTags}
                                handleDelete={this.handleDisLikeDelete}
                                closeInput={this.closeDisLikeInput}
                                handleChange={this.handleDisLikeChange}
                                value={disLikeItem}
                                handleSubmit={this.addDisLikeItem}

                            />
                        </Grid>

                    </Grid>

                </div>
            </Modal >

        )
    }
}
export default AdvanceReview; 