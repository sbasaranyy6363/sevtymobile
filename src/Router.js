import React, { Component } from 'react';

import {
	createSwitchNavigator,
	createAppContainer,
}  from 'react-navigation';

import Welcome from './pages/Welcome';
import SignIn	 from './pages/SignIn';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Select from './pages/Select';
import Find from './pages/Find';
import Create from './pages/Create';
import Result from './pages/Result';
import CreateAfter from './pages/CreateAfter';
import FindAfter from './pages/FindAfter';
import Activities from './pages/Activities';
import FindGoProfile from './pages/FindGoProfile';
const AppSwitchNavigator = createSwitchNavigator(

            {
             Welcome:{
             	screen:Welcome
             },
             CreateAfter:{
                  screen:CreateAfter
             },
             FindGoProfile:{
                  screen:FindGoProfile
             },
            Activities:{
                  screen:Activities
            },
             FindAfter:{
                  screen:FindAfter
             },
             Find:{
                  screen:Find
             },
             Result:{
                  screen:Result
             },
             Create:{
                  screen:Create
             },
             Select:{
             	screen:Select
             },
             Profile:{
                  screen:Profile
             },
             SignIn:{
             	screen:SignIn
             },
             Login:{
             	screen:Login
             }
            },
            {
               initalRootName:'Welcome'
            }

	);

export default createAppContainer(AppSwitchNavigator);
