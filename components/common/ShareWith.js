import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import FacebookIcon from '../customIcon/FacebookIcon';

import { Add } from '@material-ui/icons';
import { css, cx } from 'emotion'
import WhatsAppIcon from '../customIcon/WhatsAppIcon';

const renderIcon = (props) => {
    if (props == "Facebook") {
        return <FacebookIcon />
    }
    if (props == "Whatsapp") {
        return <WhatsAppIcon />
    }
}

export default function ShareWith(props) {

    return (

        <Grid container direction="row">

            <div style={{
                width: "100%",
                margin: "5%",
            }}>
                <Grid container direction="row">
                    <Grid item xs={2} container justify="center" style={{
                        paddingTop: "15px"
                    }} >
                        {renderIcon(props.name)}

                    </Grid>
                    <Grid item xs={8} container direction="column">
                        <Grid item>
                            <Typography
                                style={{
                                    fontFamily: "Lato",
                                    fontStyle: "normal",
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                    lineHeight: "24px",
                                    color: "#757575",

                                }}
                            >
                                {props.name}
                            </Typography>
                            <Typography
                                style={{
                                    color: "#9E9E9E",
                                    fontSize: "14px",
                                    marginTop: "5px",
                                }}
                            ><a rel="nofollow" href={props.href} onclick="return fbs_click()" target="_blank">
                                    {props.url}
                                </a>
                            </Typography>
                        </Grid>

                    </Grid>
                    <Grid item xs={2} container justify="center" style={{
                        paddingTop: "15px"
                    }}>
                        <Add />
                    </Grid>
                </Grid>
            </div>

        </Grid >

    )
}