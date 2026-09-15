import { createContext, useState } from 'react';

const UserContext = createContext();

const getUserFromToken = () => {
  const token =
    localStorage.getItem('token') ||
    sessionStorage.getItem('token');

  if (!token) {
    return null;
  }

  try {
    const payload = token.split('.')[1];
    const tokenJSON = atob(payload);

    return JSON.parse(tokenJSON);
  } catch (error) {
    console.log('Invalid token');

    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    return null;
  }
};

function UserProvider({ children }) {
  const [user, setUser] = useState(getUserFromToken());

  const value = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export {
  UserProvider,
  UserContext,
};
