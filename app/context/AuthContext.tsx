import axios from "axios";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "my-jwt-token";
export const API_URL = "https://api.developbetterapps.com/api#/";
const AuthContext = createContext<AuthProps>({});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({ token: null, authenticated: null });

  useEffect(() => {
    const onLoadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({ token, authenticated: true });
      }
    };
    onLoadToken()
  },[])

  const onRegister = async (email: string, password: string) => {
    try {
      return await axios.post(`${API_URL}/users`, { email, password });
    } catch (e) {
      return {error: true, message: (e as any).response.data.msg }
    }
  }

  const onLogin = async (email: string, password: string) => {
    try {
      const results = await axios.post(`${API_URL}/auth`, { email, password });
      setAuthState({
        token: results.data.token,
        authenticated: true
      });

      axios.defaults.headers.common["Authorization"] = `Bearer ${results.data.token}`;
      await SecureStore.setItemAsync(TOKEN_KEY, results.data.token);
      return results;
    } catch (e) {
      return {error: true, message: (e as any).response.data.msg }
    }
  }

  const onLogout = async () => {
    setAuthState({
      token: null,
      authenticated: false
    });
    axios.defaults.headers.common["Authorization"] = "";
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  }

  const value = {
    onRegister,
    onLogin,
    onLogout,
    authState
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useDrawerContext must be used within a DrawerProvider");
  }
  return context;
};

export default AuthContext;
