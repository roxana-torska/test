import React, { Component } from 'react';
import { Divider, Grid, Typography } from '@material-ui/core';

import AdvanceReviewRow from './AdvancReviewRow';



class AddvanceReviewFields extends Component {
    render() {
        const reviewData = [
            { data: "Value For money", rate: "4.5" },
            { data: "Look and feel", rate: "4.5" },
            { data: "Taste", rate: "4.5" },
        ]
        return (
            <React.Fragment>
                <Divider style={{
                    margin: "20px 0px 30px 0px",
                }} />
                <Grid container direction="column" >
                    {reviewData.map(rec => {
                        return <AdvanceReviewRow data={rec.data} rate={rec.rate} />
                    })}
                    <Grid item>
                        <textarea rows="3" cols="45" placeholder="spill your guts"
                        />

                    </Grid>
                    <Grid>
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

                </Grid>
            </React.Fragment>
        )



    }
}

export default AddvanceReviewFields;