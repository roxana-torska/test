import React from 'react'
import { Remove, Add } from '@material-ui/icons';
import { Typography, Grid } from '@material-ui/core';
export default function AdvanceReviewRow(props) {
    const { data, rate, handleDecreament, handleIncreament, name } = props;

    return <Grid container direction="row" style={{
        marginBottom: "10px"
    }}>
        <Grid item xs={6}>
            <Typography
                style={{
                    fontSize: "13px",
                    fontFamily: "lato",
                    lineHeight: "16px",
                    color: "#938E8E",
                }}
            >
                {data}
            </Typography>
        </Grid>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={3}>
            <div style={{
                float: "right"
            }}>
                <Remove onClick={() => handleDecreament(name, rate)} />
                <Typography

                    style={{
                        display: "inline",
                        fontSize: "18px",
                        color: "red",
                        verticalAlign: "top",


                    }}
                >
                    {rate}
                </Typography>
                <Add onClick={() => handleIncreament(name, rate)} />
            </div>
        </Grid>
    </Grid>

}