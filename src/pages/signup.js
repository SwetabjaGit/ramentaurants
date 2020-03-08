import React, { useState, useEffect } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import { Link } from 'react-router-dom';

//MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import theme from '../util/AuthTheme';

// Redux Stuff
/* import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions'; */


const styles = theme.AuthTheme;


const Signup = (props) => {

  const { classes, history, UI: { loading } } = props;
  const INITIAL_STATE = {
    email: '',
    password: '',
    confirmPassword: '',
    handle: ''
  };
  const [state, setState] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({})


  useEffect(() => {
    if(props.UI.errors){
      setErrors(props.UI.errors);
    }
  }, [props.UI.errors]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUserData = {
      email: state.email,
      password: state.password,
      confirmPassword: state.confirmPassword,
      handle: state.handle
    };
    props.signupUser(newUserData, history);
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Grid container className={ classes.form }>
      <Grid item sm />
      <Grid item sm >
        <img src={AppIcon} alt="monkey" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Signup
        </Typography>
        <form noValidate onSubmit={ handleSubmit }>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            autoComplete="email"
            margin="normal"
            className={classes.textField}
            helperText={errors.email}
            error={errors.email ? true : false}
            value={state.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            autoComplete="current-password"
            margin="normal"
            className={classes.textField}
            helperText={errors.password}
            error={errors.password ? true : false}
            value={state.password}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            autoComplete="current-password"
            margin="normal"
            className={classes.textField}
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
            value={state.confirmPassword}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="handle"
            name="handle"
            type="text"
            label="Handle"
            autoComplete="current-password"
            margin="normal"
            className={classes.textField}
            helperText={errors.handle}
            error={errors.handle ? true : false}
            value={state.handle}
            onChange={handleChange}
            fullWidth
          />
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            id="sbchjds"
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Signup
          </Button>
          <br />
          <small >
            Already have an account ? Login
            <Link to="/login"> here</Link>
          </small>
          <br />
          { loading ? <CircularProgress className={classes.progress} color="secondary" /> : <span></span> }
        </form>
      </Grid>
      <Grid item sm></Grid>
    </Grid>
  );

};

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  /* user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired, */
};

/* const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  signupUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Signup)); */

export default withStyles(styles)(Signup);
