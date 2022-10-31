import AsyncStorage from '@react-native-async-storage/async-storage';

import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  token: '',
  user_id: '',
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [userId, setUserId] = useState();

  function authenticate(token, id) {
    setAuthToken(token);
    setUserId(id)

    //AsyncStorage.setItem('token', token);
  }

  function logout() {
    setAuthToken(null);
    setUserId(null);
    //AsyncStorage.removeItem('token');
  }

  const value = {
    token: authToken,
    user_id: userId,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;