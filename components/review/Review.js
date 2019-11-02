
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { css } from 'emotion'
import { Grid } from '@material-ui/core';
import SentimentDissatisfiedSharpIcon from '@material-ui/icons/SentimentDissatisfiedSharp';
import SentimentSatisfiedSharpIcon from '@material-ui/icons/SentimentSatisfiedSharp';
import dishIcon from '../customIcon/dishIcon';
import DishIcon from '../customIcon/dishIcon';
export default function Review(props) {
    return (
        <Grid item lg={4} md={6} xs={12} sm={12}>
            <div className={props.classes.reviewCard}>
                <Card >
                    <div className={css`
                    border:1px solid grey;
                `}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={css`backgroundColor: red`}>
                                    R
          </Avatar>
                            }
                            action={
                                <IconButton >
                                    5/10
                                </IconButton>
                            }
                            title="Shrimp and Chorizo Paella"
                            subheader="September 14, 2016"
                        />
                    </div>
                    <img

                        src="https://mcdonalds.com.pk/wp-content/uploads/Spicy-McCrispy-600x600.png"
                        width="375px"
                    />
                    <CardContent>

                    </CardContent>
                    <CardActions disableSpacing>
                        <Grid
                            container
                            direction="column"
                            justify="space-around"

                        >
                            <Grid item>
                                <SentimentSatisfiedSharpIcon color="primary" /> {["juicy,", "fragrant,", "crispy"].map(rec => {
                                    return <Typography

                                        className={css`
                                           display:inline-block;
                                            font-family: Lato;
                                            font-style: normal;
                                            font-weight: normal;
                                            font-size: 13px;
                                            line-height: 16px;
                                            vertical-align:top;
                                            margin-left:20px;
                                            color: #7D8287;
                                        `}
                                    >
                                        {rec}
                                    </Typography>
                                })}
                            </Grid>
                            <Grid>
                                <SentimentDissatisfiedSharpIcon color="primary" />

                                <Typography
                                    className={css`
                                                font-family: Lato;
                                                display:inline-block;
                                                font-style: normal;
                                                font-weight: normal;
                                                font-size: 13px;
                                                line-height: 16px;
                                                margin-left:20px;
                                                vertical-align:top;
                                                color: #7D8287;
                                                border-radius: 15px;
                                `}


                                >
                                    smells like my socks

                                </Typography>
                            </Grid>
                            <Grid container direction="row">
                                <Grid xs={2}>

                                </Grid>
                                <Grid xs={3}>

                                    <div className={
                                        css`
                                            margin-top:20px
                                        
                                        `
                                    }>
                                        <Grid container
                                            direction="column"
                                            justify="center"
                                            alignItems="center">
                                            <Grid item>
                                                <DishIcon />
                                            </Grid>
                                            <Grid item>
                                                <Typography
                                                    className={

                                                        css`
                                                font-family: Montserrat;
                                                font-style: normal;
                                                font-weight: normal;
                                                font-size: 14px;
                                                line-height: 20px;
                                                width: 26px;
                                                color: #F44336;
                                                padding-bottom: 6px;
                                                display: flex;
                                                border-bottom: 4px solid #7D8287;
                                                justify-content: center;
                                                align-items: center;
                                                `
                                                    }

                                                >
                                                    8
                                        </Typography>
                                            </Grid>
                                            <Grid>
                                                <Typography
                                                    className={
                                                        css`
                                                        font-family: Lato;
                                                        font-style: normal;
                                                        font-weight: normal;
                                                        font-size: 13px;
                                                        line-height: 16px;
                                                        margin-top:10px;
                                                        color: #4B4B4B;
                                                        `
                                                    }

                                                >
                                                    Value for money
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>



                    </CardActions>

                </Card>
            </div>
        </Grid>

    );
}