import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { css } from 'emotion'


export default function SectionHeaders(props) {
    return (
        <Grid item container direction="row">
            <Grid item xs={10} sm={10} md={10} lg={10} >
                <Typography
                    className={
                        css`
                        font-family: BebasNeue;
                        font-size: 24px;
                        line-height: 29px;
                        font-weight: bold;
                        display: flex;
                        margin-left:15px;
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

            <Grid item xs={2} sm={2} md={2} lg={2} >
                {props.value && <div onClick={props.onclick} className={css`
                        width:82%;
                        background: #F44336;
                        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
                        border-radius: 2px;
                        margin-left:20%;
                        cursor:pointer;
            
            `}>
                    <Typography
                        className={
                            css`
                            font-family: Lato;
                            font-style: normal;
                            font-weight: normal;
                            font-size: 12px;
                            line-height: 28px;
                            margin-left: 25%;
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
