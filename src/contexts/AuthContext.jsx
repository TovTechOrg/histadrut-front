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
        setUser(JSON.parse(userData));
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
        let userObj = {
          email: result.data.email,
          role: result.data.role || "user",
        };
        // Omit role if not admin
        if (userObj.role !== "admin") {
          userObj = { ...userObj, role: undefined };
        }
        setUser(userObj);
        localStorage.setItem("userData", JSON.stringify(userObj));
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
          let userObj = {
            email: loginResult.data.email,
            role: loginResult.data.role || "user",
          };
          // Omit role if not admin
          if (userObj.role !== "admin") {
            userObj = { ...userObj, role: undefined };
          }
          setUser(userObj);
          localStorage.setItem("userData", JSON.stringify(userObj));
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
    await backendLogout();
    localStorage.removeItem("userData");
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
