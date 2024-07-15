import { Navigate } from "react-router-dom";

const withAuth = (Component) => {
  const AuthComponent = (props) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      return <Navigate to="/login" />;
    }
    return <Component {...props} />;
  };

  AuthComponent.displayName = `WithAuth(${
    Component.displayName || Component.name || "Component"
  })`;

  return AuthComponent;
};

export default withAuth;
