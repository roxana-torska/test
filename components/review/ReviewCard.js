import React, { Component } from 'react';
import { withStyles, Typography, Avatar, Grid } from '@material-ui/core';
import styles from '../../styles/common';
import { css, cx } from 'emotion'
import Review from './Review';
import { reviewAPI } from "../../services/reviewAPI";

class ReviewCard extends Component {

    render() {
        const { classes, data } = this.props;

        return (
            <Grid container direction="column">
                <Grid>
                    <div>
                        <Typography
                            className={
                                css`
                                    font-family: BebasNeue;
                                    font-size: 27px;
                                    line-height: 32px;
                                    color: #FF5959;
                                    margin: 59px 0px 0px 15px
                                `
                            }

                        >
                            Latest Reviews
                        </Typography>
                    </div>
                    <div>
                        <Typography className={
                            css`
                            display:inline-block;
                            margin: 53px 0px 0px 15px;
                            font-family: Lato;
                            font-style: normal;
                            font-weight: normal;
                            font-size: 13px;
                            line-height: 16px;
                            color: #7D8287;
                            `
                        }>
                            Value for money
                        </Typography>
                        <Typography className={classes.valueMoneyDiv
                        }>

                        </Typography>
                    </div>

                    <div>
                        <Typography className={
                            css`
                            display:inline-block;
                            margin: 4px 0px 0px 15px;
                            font-family: Lato;
                            font-style: normal;
                            font-weight: normal;
                            font-size: 13px;
                            line-height: 16px;
                            color: #7D8287;
                            `
                        }>
                            Taste
                        </Typography>
                        <Typography className={

                            css`
                                width: 132px;
                                height: 12px;
                                margin: 7px 0px 0px 108px;
                                display:inline-block;
                                vertical-align:top;
                                background: #E57373;
                            ` 
                        }>

                        </Typography>
                    </div>
                    <div>
                        <Typography className={
                            css`
                            display:inline-block;
                            margin: 4px 0px 0px 15px;
                            font-family: Lato;
                            font-style: normal;
                            font-weight: normal;
                            font-size: 13px;
                            line-height: 16px;
                            color: #7D8287;
                            `
                        }>
                            Look and feel
                        </Typography>
                        <Typography className={

                            css`
                                margin: 4px 0px 0px 63px;
                                display:inline-block;
                                vertical-align:top; 
                                width: 101px;
                                height: 12px;
                                background: #D32F2F;
                            `
                        }>

                        </Typography>
                    </div>
                </Grid>
                <Grid container direction="row" spacing={2}>
                    {data.length > 0 && data.map((rec, index) => <Review classes={classes} total={data.length} data={rec} index={index} />)}
                </Grid>

            </Grid>


        )
    }
}


export default withStyles(styles)(ReviewCard);