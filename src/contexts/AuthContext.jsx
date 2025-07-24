import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../api/api";

// Helper to fetch user info from backend session (cookie)
const fetchUserFromSession = async () => {
  try {
    const res = await fetch("https://cv.pythia-match.com/me", {
      credentials: "include",
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data && data.email && data.role) {
      return { email: data.email, role: data.role };
    }
    return null;
  } catch {
    return null;
  }
};

// Helper to call backend logout
const backendLogout = async () => {
  try {
    await fetch("https://cv.pythia-match.com/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch {}
};

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
        setUser(userFromSession);
        localStorage.setItem("userData", JSON.stringify(userFromSession));
      }
      setLoading(false);
    });
  }, []);

  const login = async (email, password) => {
    try {
      const result = await loginUser(email, password);
      // result: { status, data }
      if (result.status === 200 && result.data?.user_authenticated) {
        const userObj = {
          email: result.data.email,
          role: result.data.role || "user",
        };
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
