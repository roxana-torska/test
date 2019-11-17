import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import DishIcon from '../customIcon/dishIcon'
import { css } from 'emotion'



export default function ReviewLastRow(props) {
    console.log("props===>", props);
    return (
        <Grid xs={4}>

            <div className={
                css`
                margin-top:20px
                                    `
            }>
                <Grid container
                    direction="column"
                    justify="center"
                    alignItems="center">
                    <Grid item>
                        <DishIcon />
                    </Grid>
                    <Grid item>
                        <Typography
                            className={

                                css`                              
                                font-family: Montserrat;
                                font-style: normal;
                                font-weight: normal;
                                font-size: 14px;
                                line-height: 20px;
                                width: 26px;
                                color: #F44336;
                                padding-bottom: 6px;
                                display: flex;
                                border-bottom: 4px solid #7D8287;
                                justify-content: center;
                                align-items: center;
                                `
                            }

                        >
                            {props.value}
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography
                            className={
                                css`
                                font-family: Lato;
                                font-style: normal;
                                font-weight: normal;
                                font-size: 13px;
                                line-height: 16px;
                                margin-top:10px;
                                color: #4B4B4B;
                    `
                            }

                        >
                            {props.name}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        </Grid>
    )
}