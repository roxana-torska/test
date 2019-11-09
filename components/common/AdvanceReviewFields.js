import React, { Component } from 'react';
import { Divider, Grid, Typography, TextField } from '@material-ui/core';

import AdvanceReviewRow from './AdvancReviewRow';
import { css } from 'emotion';



class AddvanceReviewFields extends Component {
    render() {
        const { reviewData, handleDecreament, handleIncreament } = this.props;
     
        return (
            <React.Fragment>
                <Divider style={{
                    margin: "20px 0px 30px 0px",
                }} />
                <Grid container direction="column" >
                    {reviewData.map(rec => {
                        return <AdvanceReviewRow
                            data={rec.data}
                            rate={rec.rate}
                            name={rec.name}
                            handleDecreament={handleDecreament}
                            handleIncreament={handleIncreament}
                        />
                    })}
                    <Grid >
                       
                        <TextField
                            id="outlined-textarea"
                            placeholder="spill your guts"
                            multiline
                            rows={2}
                            rowsMax={4}
                            className={css`
                                width:100%;
                            `}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid container direction="row">
                        <Grid item xs={6}>
                            <Typography
                                onClick={this.props.hideAdvance}
                                style={{
                                    textDecoration: "underline",
                                    fontSize: "14px",
                                    lineHeight: "17px",
                                    color: "#D1D3D4",
                                    cursor: "pointer"
                                }}
                            >
                                simple review
                        </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                onClick={this.props.handleReviewSubmit}
                                style={{
                                    textDecoration: "underline",
                                    float: "right",
                                    fontSize: "14px",
                                    lineHeight: "17px",
                                    // color: "#D1D3D4",
                                    cursor: "pointer"
                                }}
                            >
                                Submit review
                        </Typography>
                        </Grid>
                    </Grid>

                </Grid>
            </React.Fragment>
        )



    }
}

export default AddvanceReviewFields;