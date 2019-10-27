import React, { Component } from "react";

import { Modal, Grid, Typography } from "@material-ui/core";
import { PhotoCamera, Add, Remove, Close } from "@material-ui/icons";
import ReviewTags from "./ReviewTags";
import AddvanceReviewFields from "./AdvanceReviewFields";

class AdvanceReview extends Component {

    render() {
        const { open,
            handleClose,
            dishImage,
            selected,
            getTags,
            showDisLikeInputField,
            showLikeInputField,
            handleDisLikeChange,
            handleLikeChange,
            closeDisLikeInput,
            closeLikeInput,
            handleDisLikeDelete,
            handleLikeDelete,
            addDisLikeItem,
            addLikeItem,
            hideAdvance,
            showAdvance,
            likeTags,
            dislikeTags,
            showLikeInput,
            likeItem,
            disLikeItem,
            showDisLikeInput,
            showAdvanceVar,
            handleIncreament,
            handleDecreament,
            reviewData
            ,
            handleReviewSubmit
        } = this.props;


        // const { likeTags,
        //     showDisLikeInput,
        //     showLikeInput,
        //     dislikeTags,
        //     likeItem,
        //     disLikeItem,
        //     showAdvance } = this.state;
        return (
            <Modal
                style={{

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                }}
                // aria-labelledby="simple-modal-title"
                // aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={{
                    width: 370,
                    minHeight: 258,
                    maxHeight: "85vh",
                    backgroundColor: "white",
                    overflow: "hidden",
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
                            <Grid container item xs={5}>
                                <Grid>
                                    <Typography
                                        style={{
                                            fontSize: "20px",
                                            fontFamily: "Bebas Neue",
                                            color: "#938E8E",
                                            // marginLeft: "20px",
                                        }}
                                    >
                                        {selected.name.toUpperCase()}
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
                                            {selected.avgRatings.toFixed(1)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Add />
                                    </Grid>
                                </Grid>
                                {!showAdvanceVar ? <Grid>
                                    <Typography
                                        onClick={showAdvance}
                                        style={{
                                            fontFamily: "Lato",
                                            fontSize: "14px",
                                            lineHeight: "17px",
                                            textDecoration: "underline",
                                            color: "#909090",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Advanced review
                                </Typography>
                                </Grid> : <Grid>
                                        <Typography style={{
                                            display: "inline",
                                            verticalAlign: "top",
                                            color: "red",
                                            fontSize: "13px",
                                            lineHeight: "16px",
                                        }}>
                                            {selected.price}$
                                        </Typography>
                                        <Typography style={{
                                            display: "inline",
                                            verticalAlign: "top",
                                        }}>
                                            {selected.tags.map(
                                                (rec, index) => <span key={index} >
                                                    {getTags(rec)}
                                                </span>
                                            )}
                                        </Typography>


                                    </Grid>
                                }

                            </Grid>
                            <Grid item xs={2} >

                                <Close style={{
                                    cursor: "pointer",
                                    float: "right"
                                }} />
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
                                showInputField={showLikeInputField}
                                handleDelete={handleLikeDelete}
                                tags={likeTags}
                                closeInput={closeLikeInput}
                                handleChange={handleLikeChange}
                                value={likeItem}
                                handleSubmit={addLikeItem}
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
                                showInputField={showDisLikeInputField}
                                tags={dislikeTags}
                                handleDelete={handleDisLikeDelete}
                                closeInput={closeDisLikeInput}
                                handleChange={handleDisLikeChange}
                                value={disLikeItem}
                                handleSubmit={addDisLikeItem}
                                

                            />
                        </Grid>
                        <Grid>
                            {showAdvanceVar && <AddvanceReviewFields
                                handleIncreament={handleIncreament}
                                handleDecreament={handleDecreament}
                                reviewData={reviewData}
                                hideAdvance={hideAdvance} 
                                handleReviewSubmit={handleReviewSubmit}
                                
                                />}
                        </Grid>
                    </Grid>

                </div>
            </Modal >

        )
    }
}
export default AdvanceReview; 