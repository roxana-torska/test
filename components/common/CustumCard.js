import React from 'react'
import { css, cx } from 'emotion'
import LoveIcon from '../customIcon/LoveIcon'
import { Grid, Typography } from '@material-ui/core'

export default function CustumCard() {
    return (

        <div
            className={css`
            width:280px;
            height:160px;
            background: #FFFFFF;
            box-shadow: 0px 24px 24px rgba(0, 0, 0, 0.3), 0px 0px 24px rgba(0, 0, 0, 0.22);
            border-radius: 2px;
            `}
        >
            <Grid container direction="column">
                <Grid container direction="row">
                    <div
                        className={
                            css`
                            transform: translate(40%,50%);
                        `
                        }

                    >
                        <LoveIcon /> <span

                            className={
                                css`
                                    letter-spacing: 1.5px;
                                    font-family: Lato;
                                    font-style: normal;
                                    margin-top: -6px;
                                    margin-left: 7px;
                                    font-weight: bold;
                                    font-size: 18px;
                                    line-height: 28px;
                                    /* identical to box height, or 156% */
                                    color: #FF5959;
                            
                            
                            `
                            }

                        >Thank you!</span>
                    </div>
                    <div>
                        <Typography
                            className={
                                css`
                                margin:20px 29px 0px 30px;
                                font-family: Roboto;
                                font-style: normal;
                                font-weight: normal;
                                font-size: 16px;
                                line-height: 24px;
                                /* or 150% */
                                color: rgba(0, 0, 0, 0.541327);
                                `
                            }

                        >
                            Reviewing and Sharing dishes grant you presents!
                        </Typography>
                    </div>

                </Grid>
            </Grid>
        </div>
    )
}