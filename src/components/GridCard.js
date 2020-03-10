import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
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
import RestaurantImage from '../images/singapore-restaurant.jpg';


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
    marginLeft: theme.spacing(spacing)
  },
  likedButton: {
    color: colors.red[600]
  },
  shareButton: {
    marginLeft: theme.spacing(1)
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
            src="https://i1.sndcdn.com/avatars-000028641198-836cos-large.jpg"
          >
            {restaurant.Brand}
          </Avatar>
        }
        title={
          <Link
            className={classes.boldText}
            color="textPrimary"
            href="#"
            variant="h5"
          >
            {restaurant.Brand}
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
              {restaurant.Brand.substring(0, 15)}
            </Link>{' '}
            | 10 days ago
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
              image={RestaurantImage}
              title="RestaurantImage"
            />
          </CardActionArea>
        </RouterLink>

        <div className={classes.description}>
          <Typography
            color="textSecondary"
            variant="subtitle2"
          >
            { restaurant.Variety.substring(0, 40) }
          </Typography>
        </div>

        <div className={classes.tags}>
          <Label
            color={colors.red[600]}
            key="ReactJS"
            variant="outlined"
          >
            {restaurant['Top Ten']}
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
              <Typography className={classes.boldText} variant="h5">{restaurant.Style}</Typography>
              <Typography className={classes.centerText} variant="body2">Style</Typography>
            </Grid>
            <Grid md={7} item>
              <Typography className={classes.boldText} variant="h5">{restaurant.Country}</Typography>
              <Typography className={classes.centerText} variant="body2">Country</Typography>
            </Grid>
            <Grid md={3} item>
              <Typography className={classes.boldText} variant="h4">
                { restaurant.Stars !== 'NaN' ? restaurant.Stars : 0 }
                <StarRateIcon className={classes.starIcon} />
              </Typography>
              <Typography className={classes.centerText} variant="body2">Stars</Typography>
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
                size="small"
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
