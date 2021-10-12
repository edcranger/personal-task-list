import React, { useContext } from "react";
import AuthContext from "../context/auth/authContext";
import { Route, Redirect, useHistory } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  const history = useHistory();

  if (loading) {
    return null;
  } else {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        }
      />
    );
  }
};

export default PrivateRoute;
