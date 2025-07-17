import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Mock users data
const MOCK_USERS = [
  {
    id: 1,
    email: "user@example.com",
    password: "password123",
    name: "John Doe",
    role: "user",
    hasCV: true,
    cvUploadedAt: "2025-01-15T10:30:00Z",
  },
  {
    id: 2,
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    role: "admin",
  },
];

// Mock CV data for existing users
const MOCK_CV_DATA = [
  {
    email: "existing@example.com",
    name: "Jane Smith",
    cvUploaded: true,
    uploadedAt: "2025-01-10T14:20:00Z",
  },
];

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
    // Mock login logic
    const mockUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (mockUser) {
      const token = `mock-token-${Date.now()}`;
      const userData = {
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        role: mockUser.role,
        hasCV: mockUser.hasCV || false,
        cvUploadedAt: mockUser.cvUploadedAt || null,
      };

      localStorage.setItem("loginToken", token);
      localStorage.setItem("userData", JSON.stringify(userData));
      setUser(userData);
      return { success: true, user: userData };
    }

    return { success: false, error: "Invalid email or password" };
  };

  const signUp = async (email, password, name) => {
    // Check if user already exists
    const existingUser = MOCK_USERS.find((u) => u.email === email);
    if (existingUser) {
      return { success: false, error: "User already exists" };
    }

    // Mock signup logic
    const newUser = {
      id: Date.now(),
      email,
      name,
      role: "user",
      hasCV: false,
      cvUploadedAt: null,
    };

    const token = `mock-token-${Date.now()}`;
    const userData = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      hasCV: newUser.hasCV,
      cvUploadedAt: newUser.cvUploadedAt,
    };

    localStorage.setItem("loginToken", token);
    localStorage.setItem("userData", JSON.stringify(userData));
    setUser(userData);
    return { success: true, user: userData };
  };

  const claimProfile = async (email) => {
    // Check if CV exists for this email
    const existingCV = MOCK_CV_DATA.find((cv) => cv.email === email);

    if (existingCV) {
      // In real app, this would send a verification email
      return { success: true, message: "Verification email sent" };
    }

    return { success: false, error: "No CV found for this email address" };
  };

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
