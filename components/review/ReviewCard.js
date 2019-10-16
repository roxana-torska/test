import React, { Component } from 'react';
import { Card, CardMedia, withStyles, CardContent, Typography, Avatar, Grid } from '@material-ui/core';
import styles from '../../styles/common';
import { Add } from '@material-ui/icons';

class ReviewCard extends Component {

    render() {
        const { classes, url } = this.props;
        console.log("review card ===>", url)
        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cover}
                    image={url}
                    title="Review to the dish"
                />
                <CardContent className={classes.content}>
                    <Grid container direction="row">
                        <Add />
                        <Avatar >
                            <Typography>
                                8
                            </Typography>
                        </Avatar>
                    </Grid>

                    <Typography variant="subtitle1" color="textSecondary">
                        Mac Miller
                    </Typography>
                </CardContent>


            </Card>
        )
    }
}


export default withStyles(styles)(ReviewCard);