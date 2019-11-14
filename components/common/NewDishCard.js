import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { css } from 'emotion'
import { StarRate } from '@material-ui/icons'



export default function NewDishCard(props) {
    const { classes, name, des, review } = props
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
            <img src={props.url}

                className={
                    css`
                        width:200px;
                       
                        height:200px;
                        @media screen and (min-width: 600px) {
                            width:300px;
                          } 
                    `
                } />
            <pre
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
                    word-wrap:normal;
                    align-items: flex-end;
                    color: #4A4A4A;
                    margin-right:50px;
                    @media screen and (min-width: 600px) {
                        margin-right:150px;
                      }                        
                  `
                }

            >
                {name.toUpperCase()}

            </pre>
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
                {des}

            </Typography>
            {review && <div className={css`
                margin-right:5px;
                float:right;
            `}><StarRate color='primary' className={classes.reviewFooterItemIcon} />
                <Typography className={
                    css`
                    display:inline-block;
                    color:red;
                    margin-top:50px
                `
                }>
                    {review}
                </Typography>

            </div>}

        </div>

    )
}