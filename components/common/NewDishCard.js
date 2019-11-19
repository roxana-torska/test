import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { css } from 'emotion'
import { StarRate } from '@material-ui/icons'


const handleClick = (props) => {
    const { name, des, review, data, type, onclick } = props

    if (type == "dishes" && onclick) {
        onclick(name);
    }
    if (type == "restaurant" && onclick) {
        onclick(data.product._id, data.product.restaurant.name);
    }
    if (type == "topten" && onclick) {
        onclick(data._id, data.restaurant_id[0].name)
    }
}
export default function NewDishCard(props) {
    const { classes, name, des, review, data, type } = props
    console.log("data inside new Card", data);
    return (

        <div

            onClick={() => handleClick(props)}

            className={
                css`
                    background: #FFFFFF;
                    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
                    border-radius: 2px;
                    width:157px;
                    margin-top:10px;
                    margin-right:15px;
                    @media screen and (min-width: 600px) {
                        width:300px;
                    } 
            `
            }>
            <img src={props.url}

                className={
                    css`
                        width:157px;
                       
                        height:150px;
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
                    overflow-x: scroll;
                    overflow-y: hidden; // hide vertical
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
            {props.type == "dishes" ? <Typography
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

            </Typography> : <Typography
                className={
                    css`
                    font-family: Lato;
                    font-style: normal;
                    font-weight: normal;
                    margin: 10px 0px 0px 10px;
                    font-size: 14px;
                    line-height: 16px;
                    /* or 114% */
                    
                    display: flex;
                    align-items: flex-end;
                    
                    color: #838383

                `
                }

            >
                    {des}

                </Typography>



            }
            {review && <div className={css`
                margin-right:5px;
                float:right;
            `}><StarRate color='primary' className={classes.reviewFooterItemIcon} />
                <Typography className={
                    css`
                    display:inline-block;
                    color:red;
                    margin-top:30px
                `
                }>
                    {review}
                </Typography>

            </div>}

        </div>

    )
}