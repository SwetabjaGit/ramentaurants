import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AuthRoute = (props) => {

  const { component: Component, authenticated, ...rest } = props;
  const renderComponent = (props) => authenticated === true ? <Redirect to="/" /> : <Component {...props} />;

  return (
    <Route
      {...rest}
      component={renderComponent}
    />
  );

};

AuthRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
});

export default connect(
  mapStateToProps
)(AuthRoute);

/* const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) => 
      authenticated === true ? <Redirect to="/" /> : <Component {...props} />
    }
  />
); */
