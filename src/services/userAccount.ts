import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

interface ResetPassword {
  email: string;
  token: string;
  password: string;
}

interface RegisterSchema {
  email: string;
  displayName: string;
  password: string;
}

interface LoginSchema {
  email: string;
  password: string;
}

interface ChangePasswordSchema {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

type User = {
  id: string;
  email: string;
  displayName: string;
  imageUrl?: string;
};

export const useAccount = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loadingUserInfo, setLoadingUserInfo] = useState<boolean>(true);
  const navigate = useNavigate();

  // Fetch user info
  const fetchUser = async () => {
    setLoadingUserInfo(true);
    try {
      const response = await axios.get<User>("/account/user-info");
      setCurrentUser(response.data);
    } catch (error) {
      setCurrentUser(null);
    } finally {
      setLoadingUserInfo(false);
    }
  };

  // Login
  const loginUser = async (creds: LoginSchema) => {
    try {
      await axios.post("/login?useCookies=true", creds);
      await fetchUser();
    } catch (error: any) {
      throw error;
    }
  };

  // Register
  const registerUser = async (creds: RegisterSchema) => {
    try {
      await axios.post("/account/register", creds);
    } catch (error: any) {
      throw error;
    }
  };

  // Logout
  const logoutUser = async () => {
    try {
      await axios.post("/account/logout");
      setCurrentUser(null);
      navigate("/");
    } catch (error: any) {}
  };

  // Verify email
  const verifyEmail = async ({
    userId,
    code,
  }: {
    userId: string;
    code: string;
  }) => {
    try {
      await axios.get(`/confirmEmail?userId=${userId}&code=${code}`);
    } catch (error: any) {
      throw error;
    }
  };

  // Resend confirmation email
  const resendConfirmationEmail = async ({
    email,
    userId,
  }: {
    email?: string;
    userId?: string | null;
  }) => {
    try {
      await axios.get(`/account/resendConfirmEmail`, {
        params: { email, userId },
      });
    } catch (error: any) {
      throw error;
    }
  };

  // Change password
  const changePassword = async (data: ChangePasswordSchema) => {
    try {
      await axios.post("/account/change-password", data);
    } catch (error: any) {
      throw error;
    }
  };

  // Forgot password
  const forgotPassword = async (email: string) => {
    try {
      await axios.post("/forgotPassword", { email });
    } catch (error: any) {
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (data: ResetPassword) => {
    try {
      await axios.post("/resetPassword", data);
    } catch (error: any) {
      throw error;
    }
  };

  // Fetch GitHub token
  const fetchGithubToken = async (code: string) => {
    try {
      const response = await axios.post(`/account/github-login?code=${code}`);
      await fetchUser();
      return response.data;
    } catch (error: any) {
      throw error;
    }
  };

  return {
    currentUser,
    loadingUserInfo,
    fetchUser,
    loginUser,
    registerUser,
    logoutUser,
    verifyEmail,
    resendConfirmationEmail,
    changePassword,
    forgotPassword,
    resetPassword,
    fetchGithubToken,
  };
};
