import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../api/api";

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
    const token = localStorage.getItem("loginToken");
    const userData = localStorage.getItem("userData");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("loginToken");
        localStorage.removeItem("userData");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const result = await loginUser(email, password);
      // result: { status, data }
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
      // result: { status, data }
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

  const logout = () => {
    localStorage.removeItem("loginToken");
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
