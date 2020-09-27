import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { css } from "emotion";




export default function RestaurantsCard(props) {
    const { name, address, reviews, isOpened, data, onclick } = props
    console.log("data insisde restaurants ====>", data);
    return (

        <Grid xs={12} sm={12} md={5} lg={5} onClick={() => onclick(data.restaurant_id)}>
            <div className={
                css`
                    background: #FFFFFF;
                    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
                    border-radius: 2px;
                    margin-top:10px;
                    margin-left:15px;
                    padding-bottom:10px;
                    margin-bottom:20px;
                    
                    `
            }>
                <Grid container direction="row">
                    <Grid item
                        container
                        direction="column"
                        xs={8}
                        sm={8}
                        md={8}
                        lg={10}
                    >
                        <Grid item>
                            <Typography
                                className={
                                    css`
                                                            font-family: BebasNeue;
                                                            font-size: 20px;
                                                            line-height: 24px;
                                                            display: flex;
                                                            align-items: center;
                                                            margin: 10px 0px 0px 10px;
                                                            color: #4A4A4A;
                                                         `
                                }

                            >
                                {name}

                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={css`
                                                     font-family: Lato;
                                                     font-style: normal;
                                                     font-weight: normal;
                                                     font-size: 14px;
                                                     line-height: 16px;
                                                     /* or 114% */
                                                     margin: 10px 0px 0px 10px;
                                                     display: flex;
                                                     align-items: center;
                                                     
                                                     color: #838383;
                                                     `}>
                                {address}
                            </Typography>

                        </Grid>

                    </Grid>
                    <Grid item
                        container
                        direction="column"
                        xs={4}
                        sm={4}
                        md={4}
                        lg={2}
                    >
                        <Grid item>
                            <Typography className={css`
                                                     font-family: Lato;
                                                     font-style: normal;
                                                     font-weight: normal;
                                                     font-size: 12px;
                                                     line-height: 28px;
                                                     /* identical to box height, or 233% */
                                                     height: 28px;
                                                     display: flex;
                                                     align-items: center;
                                                     margin: 5px 0px 0px 0px;
                                                     float:right;
                                                     padding-right:10px;
                                                     color: #999999;
                                                     `}>
                                {!isOpened ? "closed :(" : ""}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={css`
                                                     font-family: Lato;
                                                     font-style: normal;
                                                     font-weight: normal;
                                                     font-size: 12px;
                                                     line-height: 20px;
                                                     margin: 30px 0px 0px 0px;
                                                     float:right;
                                                     padding-right:10px;
                                                    
                                                     /* or 167% */
                                                     
                                                     
                                                     color: #E53935;
                                                     `}>
                                {reviews}
                            </Typography>

                        </Grid>

                    </Grid>

                </Grid>

            </div>
        </Grid>

    )
}