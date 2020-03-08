import React from 'react';
import { Link } from 'react-router-dom';

const AuthLink = (props) => {
  const { authenticated } = props;
  return (
    (authenticated === true) ? <Link to="/login" /> : <div></div>
  );
}

export default AuthLink;