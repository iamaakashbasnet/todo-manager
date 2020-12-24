import React, {useContext, useReducer} from 'react';
import axios from 'axios';

interface Props {
  children: React.ReactNode;
}

interface User {
  authCheck: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  user: any;
}

export const UserContext = React.createContext<User>({
  authCheck: () => {},
  isAuthenticated: false,
  loading: true,
  login: () => {},
  logout: () => {},
  user: null,
});

const ACTIONS = {
  AUTH_ERROR: 'AUTH_ERROR',
  USER_ERROR: 'USER_ERROR',
  USER_LOADED: 'USER_LOADED',
  USER_LOADING: 'USER_LOADING',
  USER_LOGOUT: 'USER_LOGOUT',
};

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider: React.FC<Props> = ({children}) => {
  const initialState = {isAuthenticated: false, loading: true, user: null};

  function reducer(state: any, action: any) {
    switch (action.type) {
      case ACTIONS.USER_LOADING:
        return {
          loading: true,
        };
      case ACTIONS.USER_LOADED:
        return {
          isAuthenticated: true,
          loading: false,
          user: action.payload,
        };
      case ACTIONS.USER_ERROR:
      case ACTIONS.AUTH_ERROR:
      case ACTIONS.USER_LOGOUT:
        return {
          isAuthenticated: false,
          loading: false,
          user: null,
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const login = (email: string, password: string) => {
    dispatch({type: ACTIONS.USER_LOADING});
    const body = JSON.stringify({email, password});
    axios
      .post('/accounts/login/', body)
      .then((res) => {
        dispatch({payload: res.data, type: ACTIONS.USER_LOADED});
      })
      .catch(() => {
        dispatch({type: ACTIONS.USER_ERROR});
      });
  };

  const logout = () => {
    dispatch({type: ACTIONS.USER_LOADING});
    axios.post('/accounts/logout/').then(() => {
      dispatch({type: ACTIONS.USER_LOGOUT});
    });
  };

  const authCheck = () => {
    dispatch({type: ACTIONS.USER_LOADING});
    axios
      .get('/accounts/auth-check/')
      .then((res) => {
        dispatch({payload: res.data, type: ACTIONS.USER_LOADED});
      })
      .catch(() => {
        dispatch({type: ACTIONS.AUTH_ERROR});
      });
  };

  return <UserContext.Provider value={{authCheck, login, logout, ...state}}>{children} </UserContext.Provider>;
};
