import React, {useState, useContext} from 'react';

interface Props {
  children: React.ReactNode;
}

interface User {
  isAuthenticated: boolean;
  user: any;
}

const UserContext = React.createContext({});
const UserUpdateContext = React.createContext({});

export const useUser = () => {
  return useContext(UserContext);
};

export const useUserUpdate = () => {
  return useContext(UserUpdateContext);
};

export const UserProvider: React.FC<Props> = ({children}) => {
  const [user, setUser] = useState<User>({
    isAuthenticated: false,
    user: null,
  });

  const updateUser = () => {
    setUser((prevState) => ({
      ...prevState,
      isAuthenticated: true,
    }));
  };

  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={updateUser}>{children}</UserUpdateContext.Provider>
    </UserContext.Provider>
  );
};
