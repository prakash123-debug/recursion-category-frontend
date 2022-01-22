import React, { useState, useEffect } from "react";
import Login from "./components/Login/Login";
import ForgetPassword from "./components/Login/ForgetPassword";
import ResetPassword from "./components/Login/ResetPassword.js";

import { Switch, Route, useHistory } from "react-router-dom";
// Components
import Dashboard from "./components/MainView/Dashboard";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoutes";

const App = () => {
  let { push } = useHistory();

  const [isAuth, setisAuth] = useState(false);

  useEffect(() => {
    if (localStorage.token) {
      setisAuth(true);
      push("/dashboard");
    } else {
      console.log("something went wrong");
    }
  }, [isAuth, push]);

  return (
    <>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/forgot-password" component={ForgetPassword}></Route>
        <Route
          exact
          path="/resetpassword/:token"
          component={ResetPassword}
        ></Route>
        <Route
          path="/dashboard"
          component={Dashboard}
        />
      </Switch>
    </>
  );
};

export default App;
