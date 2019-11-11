import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { css } from 'emotion'


export default function NewDishCard() {
    return (

        <div className={
            css`
            background: #FFFFFF;
            box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
            border-radius: 2px;
            width:300px;
            margin-top:10px;
            margin-left:10px;
            `
        }>
            <img src="/static/imgs/burger.jpg"

                width="100%" />
            <Typography
                className={
                    css`
                    font-family: Lato;
                    font-style: normal;
                    font-weight: bold;
                    margin: 10px 0px 0px 10px;
                    font-size: 18px;
                    line-height: 16px;
                    /* identical to box height, or 89% */
                    display: flex;
                    align-items: flex-end;
                    color: #4A4A4A;
                    margin-right:50px;
                    @media screen and (min-width: 600px) {
                        margin-right:150px;
                      }                        
                  `
                }

            >
                Burgers

                </Typography>
            <Typography
                className={
                    css`
                        font-family: Lato;
                        font-style: normal;
                        margin: 3px 0px 0px 10px;
                        font-family: Lato;
                        font-style: normal;
                        font-weight: normal;
                        font-size: 12px;
                        line-height: 20px;
                        /* or 167% */
                        color: #E53935;
                `
                }

            >
                57 dishes

            </Typography>

        </div>

    )
}