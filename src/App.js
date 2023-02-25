// import logo from './logo.svg';
import './App.css';


import React from 'react';
import axios from 'axios';

import SignInPage from './components/SignInPage';
import MainPage from './components/MainPage';
import PrivateRoute from './components/PrivateRoute';

import { UserContext } from './contexts/UserContext';
import useFindUser from './hooks/useFindUser';

import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";


const App = () => {
  const { user, setUser, isLoading } = useFindUser();

  if (process.env.REACT_APP_WITH_CREDENTIALS === "true") {
    axios.defaults.withCredentials = true;
  }
  else if (process.env.REACT_APP_WITH_CREDENTIALS === "false") {
    axios.defaults.withCredentials = false;
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser, isLoading }}>
        <Switch>
            <Route exact path='/signin' component={SignInPage} />
            <PrivateRoute path="/" component={MainPage} />
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  )
};


export default App;
