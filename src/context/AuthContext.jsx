import { createContext, useContext, useState, useEffect } from "react";
import { getToken, saveToken, removeToken } from "../utils/token";
import { getCurrentUser } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // initial loading
  const [role, setRole] = useState(null); 
  // Load user on app start (persistence)
  useEffect(() => {
    const initializeUser = async () => {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getCurrentUser(); // fetch user from backend
        setUser(data.user);
      } catch (err) {
        removeToken(); // if token invalid/expired
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  const loginUser = (userData, token) => {
    saveToken(token);
    setUser(userData);
    setRole(userData.role);
  };

  const logoutUser = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);