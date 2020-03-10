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
import { loginUser, getUserData } from '../redux/actions/userActions'; */


const styles = theme.AuthTheme;


const Login = (props) => {

  const { classes, history, UI: { loading } } = props;
  const INITIAL_STATE = { 
    email: '', 
    password: '', 
  };
  const [state, setState] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});


  useEffect(() => {
    if(props.UI.errors){
      setErrors(props.UI.errors);
    }
  }, [props.UI.errors]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: state.email,
      password: state.password
    };
    //props.loginUser(userData, history);
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
          Login
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
            Login
          </Button>
          <br />
          <small>
            Dont have and account ? Signup 
            <Link to="/signup"> here</Link>
          </small>
          <br />
          { loading ? <CircularProgress className={classes.progress} color="secondary" /> : <span></span> }
        </form>
      </Grid>
      <Grid item sm></Grid>
    </Grid>
  );

};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  /* loginUser: PropTypes.func.isRequired,
  getUserData: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired */
};

/* const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser,
  getUserData
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Login)); */

export default withStyles(styles)(Login);