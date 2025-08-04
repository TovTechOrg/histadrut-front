import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, fetchUserFromSession, backendLogout } from "../api/api";


const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing login token on mount
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setLoading(false);
        return;
      } catch (error) {
        localStorage.removeItem("userData");
      }
    }
    
    // If no user in localStorage, try to fetch from backend session (cookie)
    fetchUserFromSession().then((userFromSession) => {
      if (userFromSession) {
        // Omit role if not admin
        const userToStore =
          userFromSession.role === "admin"
            ? userFromSession
            : { ...userFromSession, role: undefined };
        setUser(userToStore);
        localStorage.setItem("userData", JSON.stringify(userToStore));
      }
      setLoading(false);
    });
  }, []);

  const login = async (email, password) => {
    try {
      const result = await loginUser(email, password);
      
      // result: { status, data }
      if (result.status === 200 && result.data?.user_authenticated) {
        // After successful login, fetch complete user data from session
        const userFromSession = await fetchUserFromSession();
        
        if (userFromSession) {
          // Omit role if not admin
          const userToStore =
            userFromSession.role === "admin"
              ? userFromSession
              : { ...userFromSession, role: undefined };
          setUser(userToStore);
          localStorage.setItem("userData", JSON.stringify(userToStore));
        }
      }
      return result;
    } catch (err) {
      return {
        status: undefined,
        data: { message: err.message || "Login failed" },
      };
    }
  };

  const signUp = async (email, password, name) => {
    try {
      const result = await registerUser(email, password, name || "");
      // If registration is successful, try to log in immediately
      if (result.status === 200 || result.status === 201) {
        // Attempt login with the same credentials
        const loginResult = await loginUser(email, password);
        if (loginResult.status === 200 && loginResult.data?.user_authenticated) {
          // After successful login, fetch complete user data from session
          const userFromSession = await fetchUserFromSession();
          if (userFromSession) {
            // Omit role if not admin
            const userToStore =
              userFromSession.role === "admin"
                ? userFromSession
                : { ...userFromSession, role: undefined };
            setUser(userToStore);
            localStorage.setItem("userData", JSON.stringify(userToStore));
          }
        }
      }
      return result;
    } catch (err) {
      return {
        status: undefined,
        data: { message: err.message || "Registration failed" },
      };
    }
  };

  // Remove claimProfile for now (not used in real API)
  const claimProfile = async () => ({
    success: false,
    error: "Not implemented",
  });

  const uploadCV = async (cvFile) => {
    // Mock CV upload
    if (!user) {
      return { success: false, error: "User not authenticated" };
    }

    const updatedUser = {
      ...user,
      hasCV: true,
      cvUploadedAt: new Date().toISOString(),
    };

    localStorage.setItem("userData", JSON.stringify(updatedUser));
    setUser(updatedUser);
    return { success: true, message: "CV uploaded successfully" };
  };

  const logout = async () => {
    try {
      // Try to logout from backend (clear server-side session/cookie)
      await backendLogout();
    } catch (error) {
      console.warn("Backend logout failed:", error);
      // Continue with local cleanup even if backend fails
    }
    
    // Clear all user-related localStorage data
    localStorage.removeItem("userData");
    localStorage.removeItem("rememberMe");
    localStorage.removeItem("rememberedEmail");
    localStorage.removeItem("rememberedPassword");
    
    // Try to clear any non-HTTP-only cookies (limited effectiveness)
    // Note: HTTP-only cookies can only be cleared by the backend
    try {
      // Clear common cookie names that might be used for sessions
      const cookiesToClear = ['session', 'sessionid', 'token', 'auth', 'jwt'];
      cookiesToClear.forEach(cookieName => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
      });
    } catch (error) {
      console.warn("Cookie clearing failed:", error);
    }
    
    // Clear user state
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const isAdmin = () => {
    return user?.role === "admin";
  };

  const value = {
    user,
    setUser,
    login,
    signUp,
    claimProfile,
    uploadCV,
    logout,
    isAuthenticated,
    isAdmin,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
