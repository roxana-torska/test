
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
import ReviewLastRow from './ReviewLastRow';
export default function Review(props) {
    console.log("data====>", props.data)
    const { data, index, total } = props
    return (
        <Grid item lg={4} md={6} xs={12} sm={12}>
            <div className={props.classes.reviewCard}>
                <Card >
                    <div className={css`
                    border:1px solid grey;
                `}>
                        <CardHeader
                            avatar={
                                <Avatar alt={data.user.first_name} src={data.image[0].path} />
                            }
                            action={
                                <IconButton >
                                    {1 + index}/ {total}
                                </IconButton>
                            }
                            title={data.user.first_name}
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
                            {data.likes && <Grid item>
                                <SentimentSatisfiedSharpIcon color="primary" /> {data.likes.map(rec => {
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
                            </Grid>}
                            {data.dislikes && <Grid>
                                <SentimentDissatisfiedSharpIcon color="primary" />

                                {data.dislikes.map(rec => <Typography
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
                                    {rec}

                                </Typography>)}
                            </Grid>}
                            <Grid container direction="row">
                                {data.valueForMoneyRatings && <ReviewLastRow value={data.valueForMoneyRatings} name="Value for money"/>}
                                {data.tasteRatings && <ReviewLastRow value={data.tasteRatings} name="Taste"/>}
                                {data.lookAndFeelRatings && <ReviewLastRow value={data.lookAndFeelRatings} name="Look and feel" />}
                            </Grid>
                        </Grid>



                    </CardActions>

                </Card>
            </div>
        </Grid>

    );
}