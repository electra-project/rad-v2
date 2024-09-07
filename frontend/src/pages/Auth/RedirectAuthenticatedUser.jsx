import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const RedirectAuthenticatedUser = (WrappedComponent) => {
  const WithAuthRedirect = (props) => {
    const [auth] = useAuth();

    if (auth.user) {
      return <Navigate to="/" replace />;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuthRedirect;
};

export default RedirectAuthenticatedUser;
