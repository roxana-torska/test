
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
                        

                    </CardActions>

                </Card>
            </div>
        </Grid>

    );
}