import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const LoginRoute = ({ component: Component, check, ...rest }) => {
  return (
    <Route {...rest} render={
      props => {
        if (!check) {
          return <Component {...rest} {...props} />
        } else {
          return <Redirect to={
            {
              pathname: "/admin/index",
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

export default LoginRoute;