import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { css } from 'emotion'


export default function SectionHeaders(props) {
    return (
        <Grid item container direction="row">
            <Grid item xs={8} sm={8} md={8} lg={10}>
                <Typography
                    className={
                        css`
                    font-family: Bebas Neue;
                    font-size: 17px;
                    line-height: 29px;
                    display: flex;
                    align-items: center;
                  
                    color: #4A4A4A;
                    @media screen and (min-width: 600px) {
                        font-siz:24px;
                } ;
                `
                    }
                >
                    {props.text && props.text.toUpperCase()}
                </Typography>
            </Grid>

            <Grid item xs={4} sm={4} md={4} lg={2} >
                {props.value && <div className={css`
            width:50%;
            background: #F44336;
            box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
            border-radius: 2px;
            margin-left:50%;
            
            `}>
                    <Typography className={
                        css`
                        font-family: Lato;
                        font-style: normal;
                        font-weight: normal;
                        font-size: 12px;
                        line-height: 28px;
                        margin-left:22%;
                        color:#FFFFFF;
                       
                    `

                    }>
                        All({props.value})
                </Typography>

                </div>}
            </Grid>
        </Grid>
    )
}
