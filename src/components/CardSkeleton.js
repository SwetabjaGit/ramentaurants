import React from "react";
import PropTypes from "prop-types";
// MUI
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  CardHeader,
  Divider,
  Grid
} from "@material-ui/core";


const spacing = 2;
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    margin: 10
  },
  header: {
    marginLeft: theme.spacing(1),
    padding: theme.spacing(1)
  },
  avatarBack: {
    backgroundColor: "rgba(0,0,0, 0.15)",
  },
  content: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0
    }
  },
  actionArea: {
    maxWidth: '100%',
    maxHeight: 195,
    backgroundColor: "rgba(0,0,0, 0.2)",
  },
  media: {
    minWidth: '100%',
    height: 195,
  },
  description: {
    padding: theme.spacing(1, spacing, 0, spacing),
  },
  tags: {
    padding: theme.spacing(1, 1, 1, 1),
    marginLeft: theme.spacing(1)
  },
  handle: {
    width: 80,
    height: 30,
    border: '1px solid red',
  },
  details: {
    padding: theme.spacing(2)
  },
  fullLineDark: {
    height: 15,
    width: "90%",
    backgroundColor: "rgba(0,0,0, 0.5)",
    marginTop: 5,
    marginBottom: 5
  },
  fullLine: {
    height: 15,
    width: "90%",
    backgroundColor: "rgba(0,0,0, 0.15)",
    marginTop: 5,
    marginBottom: 5
  },
  halfLine: {
    height: 15,
    width: "50%",
    backgroundColor: "rgba(0,0,0, 0.15)",
    marginTop: 5,
    marginBottom: 2,
  },
  quarterLine: {
    height: 15,
    width: "20%",
    backgroundColor: "rgba(0,0,0, 0.15)",
    marginTop: 2,
    marginBottom: 5
  },
  iconLine: {
    height: 20,
    width: "50%",
    backgroundColor: "rgba(0,0,0, 0.2)",
    margin: 5,
    marginBottom: 5
  },
}));

const CardSkeleton = () => {
  const classes = useStyles();

  const content = Array.from({ length: 8 }).map((item, index) => (
    <Grid item key={index} xs={12} sm={12} md={6} lg={4} xl={3} >
      <Card>
        <CardHeader
          className={classes.header}
          disableTypography
          avatar={<Avatar className={classes.avatarBack} alt="Author"></Avatar>}
          title={<div className={classes.quarterLine} />}
          subheader={<div className={classes.halfLine} />}
        />
        <CardContent className={classes.content}>
          <CardActionArea className={classes.actionArea}>
            <CardMedia className={classes.media} title="RestaurantImage" src="#"/>
          </CardActionArea>
          <div className={classes.description}>
            <div className={classes.fullLine} />
          </div>
          <div className={classes.tags}>
            <div className={classes.handle} />
          </div>
          <Divider />
          <div className={classes.details}>
            <Grid
              alignItems="center"
              container
              justify="space-between"
              spacing={1}
            >
              <Grid md={3} item>
                <div className={classes.fullLineDark} />
                <div className={classes.fullLine} />
              </Grid>
              <Grid md={6} item>
                <div className={classes.fullLineDark} />
                <div className={classes.fullLine} />
              </Grid>
              <Grid md={3} item>
                <div className={classes.fullLineDark} />
                <div className={classes.fullLine} />
              </Grid>
              <Grid md={2} item>
                <div className={classes.iconLine} />
              </Grid>
              <Grid md={2} item>
                <div className={classes.iconLine} />
              </Grid>
              <Grid md={2} item>
                <div className={classes.iconLine} />
              </Grid>
              <Grid md={6} item></Grid>
            </Grid>
          </div>
        </CardContent>
      </Card>
    </Grid>
  ));

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {content}
      </Grid>
    </div>
  );
};

CardSkeleton.propTypes = {
  className: PropTypes.string,
};

export default CardSkeleton;
