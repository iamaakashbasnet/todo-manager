import React, {useState, useContext} from 'react';
import axios from 'axios';

interface Props {
  children: React.ReactNode;
}

interface User {
  authCheck: () => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  user: any;
}

const UserContext = React.createContext<User>({
  authCheck: () => {},
  isAuthenticated: false,
  login: () => {},
  user: null,
});

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider: React.FC<Props> = ({children}) => {
  const [user, setUser] = useState({
    isAuthenticated: false,
    user: null,
  });

  const login = (email: string, password: string) => {
    const body = JSON.stringify({email, password});
    axios
      .post('/accounts/login/', body)
      .then((res) => {
        setUser({
          isAuthenticated: true,
          user: res.data,
        });
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const authCheck = () => {
    console.log('Hi');
    axios
      .get('/accounts/auth-check/')
      .then((res) => {
        setUser({
          isAuthenticated: true,
          user: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return <UserContext.Provider value={{authCheck, login, ...user}}>{children} </UserContext.Provider>;
};
