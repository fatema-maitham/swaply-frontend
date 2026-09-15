import { createContext, useEffect, useState } from 'react';

const UserContext = createContext();

const getUserFromToken = () => {
  const token =
    localStorage.getItem('token') ||
    sessionStorage.getItem('token');

  if (!token) {
    return null;
  }

  try {
    const parts = token.split('.');

    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }

    const payload = parts[1];

    const base64 = payload
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const tokenJSON = atob(base64);

    const user = JSON.parse(tokenJSON);

    if (!user._id) {
      throw new Error('User ID missing from token');
    }

    return user;
  } catch (error) {
    console.log('Invalid token');

    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    return null;
  }
};

function UserProvider({ children }) {
  const [user, setUser] = useState(getUserFromToken());

  useEffect(() => {
    const checkUser = () => {
      const currentUser = getUserFromToken();

      setUser(currentUser);
    };

    checkUser();
  }, []);

  const handleSetUser = (newUser) => {
    setUser(newUser);
  };

  const value = {
    user,
    setUser: handleSetUser,
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
