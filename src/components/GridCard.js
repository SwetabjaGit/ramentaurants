import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Button,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Link,
  Tooltip,
  Typography,
  colors
} from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarRateIcon from '@material-ui/icons/StarRate'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Label from './Label';
//import RestaurantImage from '../images/singapore-restaurant.jpg';


const spacing = 2;

const useStyles = makeStyles(theme => ({
  root: {
  },
  header: {
    marginLeft: theme.spacing(1),
    padding: theme.spacing(1)
  },
  actionArea: {
    maxWidth: '100%',
    maxHeight: 200
  },
  media: {
    minWidth: '100%',
    height: 200
  },
  content: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0
    }
  },
  description: {
    padding: theme.spacing(1, spacing, 0, spacing),
  },
  tags: {
    padding: theme.spacing(1, 1, 1, 1),
    marginLeft: theme.spacing(1)
  },
  details: {
    padding: theme.spacing(2)
  },
  learnMoreButton: {
    marginLeft: theme.spacing(spacing),
  },
  likeButton: {
    zoom: 1.5
  },
  likedButton: {
    color: colors.red[600],
    zoom: 1.5
  },
  shareButton: {
    marginLeft: theme.spacing(1),
    zoom: 1.5
  },
  boldText: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  centerText: {
    textAlign: 'center'
  },
}));

const GridCard = props => {
  const { restaurant, className, ...rest } = props;

  const classes = useStyles();
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(true);
  };

  const handleUnlike = () => {
    setLiked(false);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        className={classes.header}
        disableTypography
        avatar={
          <Avatar
            alt="Author"
            src={restaurant.multimedia[1] && restaurant.multimedia[1]}
          >
            {restaurant.headline && restaurant.headline.main}
          </Avatar>
        }
        title={
          <Link
            className={classes.boldText}
            color="textPrimary"
            href="#"
            variant="h5"
          >
            {restaurant.byline.original && restaurant.byline.original.substring(0, 50)}
          </Link>
        }
        subheader={
          <Typography variant="body2">
            by{' '}
            <Link
              className={classes.boldText}
              color="textPrimary"
              href="#"
              variant="h6"
            >
              {restaurant.byline.original && restaurant.byline.original.substring(0, 15)}
            </Link>{' '}
            | {restaurant.pub_date && moment(restaurant.pub_date).fromNow()}
          </Typography>
        }
      />
      <CardContent className={classes.content}>

        <RouterLink to="#">
          <CardActionArea
            className={classes.actionArea}
          >
            <CardMedia
              className={classes.media}
              image={restaurant.multimedia[0] && restaurant.multimedia[0]}
              title="RestaurantImage"
            />
          </CardActionArea>
        </RouterLink>

        <div className={classes.description}>
          <Typography
            color="textSecondary"
            variant="subtitle2"
          >
            {restaurant.snippet && restaurant.snippet.substring(0, 100)}
          </Typography>
        </div>

        <div className={classes.tags}>
          <Label
            color={colors.red[600]}
            key="ReactJS"
            variant="outlined"
          >
            {restaurant.news_desk && restaurant.news_desk}
          </Label>
        </div>

        <Divider />

        <div className={classes.details}>
          <Grid
            alignItems="center"
            container
            justify="space-between"
            spacing={1}
          >
            <Grid md={2} item>
              <Typography className={classes.boldText} variant="h5">{restaurant.document_type}</Typography>
              <Typography className={classes.centerText} variant="body2">DocType</Typography>
            </Grid>
            <Grid md={7} item>
              <Typography className={classes.boldText} variant="h5">{restaurant.news_desk}</Typography>
              <Typography className={classes.centerText} variant="body2">NewsDesk</Typography>
            </Grid>
            <Grid md={3} item>
              <Typography className={classes.boldText} variant="h4">{restaurant.word_count}</Typography>
              <Typography className={classes.centerText} variant="body2">WordCount</Typography>
            </Grid>
            <Grid item>
              {liked ? (
                <Tooltip title="Unlike">
                  <IconButton
                    className={classes.likedButton}
                    onClick={handleUnlike}
                    size="small"
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Like">
                  <IconButton
                    className={classes.likeButton}
                    onClick={handleLike}
                    size="small"
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                </Tooltip>
              )}
              {/* <Typography variant="body2">{track.favoritings_count}</Typography> */}
              <Tooltip title="Share">
                <IconButton
                  className={classes.shareButton}
                  size="small"
                >
                  <ShareIcon />
                </IconButton>
              </Tooltip>
              <Button
                className={classes.learnMoreButton}
              >
                MORE
              </Button>
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
};

GridCard.propTypes = {
  className: PropTypes.string,
  restaurant: PropTypes.object.isRequired
};

export default GridCard;