import React, { createContext, useContext, useState, useEffect } from "react";
import { IFormInput } from "../../api/types";
import { accountSrevice } from "../../helper/accountSrevice";
import {
  disconnected,
  getAccessToken,
  getCredentials,
} from "../../api/CredentialsProvider";

const initialCredentials: IFormInput = {
  email: "",
  password: "",
};


interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (credential: IFormInput) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<IFormInput>(initialCredentials);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
          const response = await getCredentials();

          setIsAuthenticated(true);
          setUser(response);
 
      } catch (error) {
        setIsAuthenticated(false);
        setUser(initialCredentials);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credential: IFormInput) => {
    if ((credential.email && credential.password)) {
        setUser(credential as IFormInput);
        const response = await getAccessToken(credential);
        accountSrevice.saveToken(response);
        setIsAuthenticated(true);
    }
 
  };

  const logout = async () => {
    try {
      await disconnected();

      accountSrevice.logout();
      setIsAuthenticated(false);
      setUser(initialCredentials);
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
