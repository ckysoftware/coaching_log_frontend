import React from 'react'

import SplitPane from "react-split-pane";
import CoachingLogPage from "./CoachingLogPage";
import Sidebar from "./Sidebar";
import CoachingLogHomePage from './CoachingLogHomePage';
import Settings from './Settings';
import CreateUserPage from './CreateUserPage';
import CreateClientPage from './CreateClientPage';
import AssignCoachPage from './AssignCoachPage';
import ClientsListPage from './ClientsListPage';
import PrivateRoute from './PrivateRoute';
import LandingPage from './LandingPage';

import "../common_styles/split-pane-style.css";

import {
  BrowserRouter,
  Switch,
} from "react-router-dom";
import UsersListPage from './UsersListPage';

const absoluteStyle={
  overflow: 'auto',
  position: 'absolute',
};


const MainPage = () => (
    <BrowserRouter>
        <SplitPane split="vertical" minSize={250} defaultSize={250} allowResize={false} style={absoluteStyle}>
            <Sidebar/>
            <Switch>
                <PrivateRoute exact path='/coaching-log/home' component={CoachingLogHomePage} />
                <PrivateRoute exact path='/coaching-log/client/:id' component={CoachingLogPage} />
                <PrivateRoute exact path='/settings' component={Settings} />
                <PrivateRoute exact admin path='/admin/create-user' component={CreateUserPage} />
                <PrivateRoute exact admin path='/admin/create-client' component={CreateClientPage} />
                <PrivateRoute exact admin path='/admin/assign-coach' component={AssignCoachPage} />
                <PrivateRoute exact admin path='/admin/list-clients' component={ClientsListPage} />
                <PrivateRoute exact admin path='/admin/list-users' component={UsersListPage}/>
                <PrivateRoute component={LandingPage} />
            </Switch>
        </SplitPane>
    </BrowserRouter>
);

export default MainPage;
