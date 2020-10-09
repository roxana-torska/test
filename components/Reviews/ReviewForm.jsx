import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import styles from "../../styles/common";
import { Button, FormHelperText } from "@material-ui/core";
import { reviewAPI } from "../../services/reviewAPI";

const ReviewForm = (props) => {
  const { classes, show, token, dishId } = props;
  const [rating, setRating] = useState(null);
  const [formState, setFormState] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  let indexArr = Array.from(Array(5), (_, i) => i + 1);

  const selectRating = (rating) => {
    setRating(rating);
    setErrorMsg("");
  };

  const validate = () => {
    let validated = false;
    if (rating === null) {
      setErrorMsg("Please rate your dish by clicking one of the numbers");
    } else if (formState > 0 && reviewText.trim().length === 0) {
      setErrorMsg(`Please leave a review or press 'Skip'`);
    } else {
      validated = true;
    }
    return validated;
  };

  const submitForm = () => {
    if (validate()) {
      const newFormState = formState + 1;
      setFormState(newFormState);
      if (newFormState > 1) {
        reviewAPI
          .postReview({
            reviewText: reviewText,
            token: token,
            dishId: dishId,
            score: rating,
          })
          .then((response) => {
            console.log(response);
            props.close();
          });
      }
    }
  };

  const skipTextReview = () => {};

  const handleChange = (e) => {
    setReviewText(e.target.value);
    setErrorMsg("");
  };

  return show === true ? (
    <div className={classes.reviewFormContainer}>
      <Typography className={classes.reviewTitle}>How was the Food?</Typography>
      {formState === 0 ? (
        indexArr.map((index) => {
          return (
            <img
              className={`${classes.collapsedDishAvatarImg} ${
                index == rating ? "selected" : ""
              }`}
              src={
                "../../../static/imgs/Assets/SVG/icons/place" + index + ".svg"
              }
              onClick={() => selectRating(index)}
              key={index}
            ></img>
          );
        })
      ) : (
        <textarea
          className={classes.textArea}
          placeholder="Add a few words..."
          onChange={handleChange}
          value={reviewText}
        ></textarea>
      )}
      {formState > 0 && (
        <Button className={classes.reviewLink} onClick={skipTextReview}>
          Skip
        </Button>
      )}
      <Button className={classes.reviewLink} onClick={submitForm}>
        Submit
      </Button>
      <FormHelperText
        className={`${classes.center} ${classes.relativeSmall}`}
        error={errorMsg.length > 0}
      >
        {errorMsg}
      </FormHelperText>
    </div>
  ) : null;
};

export default withStyles(styles)(connect(null, null)(ReviewForm));
