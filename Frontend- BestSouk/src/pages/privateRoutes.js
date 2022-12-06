import { Navigate, Outlet } from "react-router-dom";
function PrivateRoute({ }) {
    var login;
    console.log('token in private',localStorage.getItem('token'));
    if (localStorage.getItem('token') == null) {
      console.log('false');
      login = false;
    }
    else{
      console.log('true');
      login = true;
    }
    console.log('login in protected route',login);
  return login ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;