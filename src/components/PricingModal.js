import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Dialog,
  Grid,
  Typography,
  colors
} from '@material-ui/core';

// Components
import GridCard from './GridCard';

const useStyles = makeStyles(theme => ({
  root: {
    width: 1080
  },
  header: {
    maxWidth: 600,
    margin: '0 auto',
    padding: theme.spacing(3)
  },
  content: {
    padding: theme.spacing(1),
    maxWidth: 960,
    margin: '0 auto'
  },
  product: {
    overflow: 'unset',
    position: 'relative',
    padding: theme.spacing(5, 3),
    cursor: 'pointer',
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    '&:hover': {
      transform: 'scale(1.1)'
    }
  },
  image: {
    borderRadius: theme.shape.borderRadius,
    position: 'absolute',
    top: -24,
    left: theme.spacing(3),
    height: 48,
    width: 48,
    fontSize: 24
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  options: {
    lineHeight: '26px'
  },
  recommended: {
    backgroundColor: theme.palette.primary.main,
    '& *': {
      color: `${theme.palette.white} !important`
    }
  },
  contact: {
    margin: theme.spacing(3, 0)
  },
  actions: {
    backgroundColor: colors.grey[100],
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  startButton: {
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  }
}));

const PricingModal = props => {
  const { open, onClose, topRestaurants, className, ...rest } = props;

  const classes = useStyles();

  return (
    <Dialog
      maxWidth="lg"
      onClose={onClose}
      open={open}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <div className={classes.header}>
          <Typography
            align="center"
            gutterBottom
            variant="h2"
          >
            Top Restaurants of Different Years
          </Typography>
        </div>
        <div className={classes.content}>
          <Grid
            container
            spacing={1}
          >
            {topRestaurants && topRestaurants.map((restaurant, i) => (
              <Grid
                item
                key={i}
                xl={4}
                lg={4}
                md={4}
                sm={6}
                xs={12}
              >
                <GridCard restaurant={restaurant} />
              </Grid>
            ))}
          </Grid>
        </div>
        <div className={classes.actions}>
          <Button
            className={classes.startButton}
            onClick={onClose}
            variant="contained"
          >
            Rate Restaurants
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

PricingModal.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool
};

export default PricingModal;
