import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFindUser() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const api_url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    async function findUser() {
      await axios.post(`${api_url}auth/login`
      ).then(res => {
          setUser(res.data);
          setLoading(false);
        }).catch(err => {
          setLoading(false);
      });
    }

     findUser();
  }, []);

  return {
     user,
     setUser,
     isLoading
     }
}
