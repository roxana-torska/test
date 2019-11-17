import React, { Component } from 'react';
import { Divider, Grid, Typography, TextField, Button } from '@material-ui/core';

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

                        <Grid item xs={12}>
                            <div

                                onClick={this.props.handleReviewSubmit}

                                className={
                                    css`
                            background: #F44336;
                            height:35px;
                            box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
                            border-radius: 2px;
                            diplay:flex;
                            justify-content:center;

                            
                            `
                                }>
                                <Typography className={
                                    css`
                                    font-family: Lato;
                                    font-style: normal;
                                    font-weight: 900;
                                    font-size: 12px;
                                    line-height: 14px;
                                    /* identical to box height */

                                    text-align: center;
                                    letter-spacing: 0.5px;
                                    padding-top:10px;
                                    color: #FFFFFF;
                                    `
                                }>
                                    Save
                                </Typography>

                            </div>

                        </Grid>
                    </Grid>

                </Grid>
            </React.Fragment>
        )



    }
}

export default AddvanceReviewFields;