import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import LoadingPage from './LoadingPage';

export default function PrivateRoute(props) {
   const { user, isLoading } = useContext(UserContext);
   const { component: Component, admin, ...rest } = props;
   // admin: Boolean, need admin privilege
   if(isLoading) {
      return <LoadingPage/>
   }
   if(user){
      if (admin && user.role != "admin") {
         return <Redirect to='/coaching-log/home'/>
      }
      return ( <Route {...rest} render={(props) =>
         (<Component {...props}/>)
            }
         />
      )
   } 

   //redirect if there is no user
   return <Redirect to='/signin' />
}
