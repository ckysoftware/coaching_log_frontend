import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';

import qs from 'qs';



export default function useAuth() {
   let history = useHistory();
   const { setUser } = useContext(UserContext);
   const api_url = process.env.REACT_APP_API_URL;

  //login user
  const loginUser = async (data) => {
     const { username, password } = data;
     const payload = qs.stringify({username, password})
     const headers = {'Content-Type': 'application/x-www-form-urlencoded'}
     return axios.post(`${api_url}auth/token`, payload, {headers: headers}
     ).then(async (response) => {
         setUser(response.data)
         history.push('/coaching-log/home');
       }
     )
   };

  return {
     loginUser,
     }
  }
