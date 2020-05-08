import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, check, ...rest }) => {
  return (
    <Route {...rest} render={
      props => {
        if (check) {
          return <Component {...rest} {...props} />
        } else {
          return <Redirect to={
            {
              pathname: '/auth/login',
              state: {
                from: props.location
              }
            }
          } />
        }
      }
    } />
  )
}

export default ProtectedRoute;