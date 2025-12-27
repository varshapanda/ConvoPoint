import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:8080" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningup: false,
  isLoggingIn: false,
  socket: null,
  onlineUsers: [],

  // Add this function to manually set auth user
  setAuthUser: (user) => {
    set({ authUser: user });
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data.user });
      get().connectSocket();
    } catch (err) {
      console.error("Error in authenticating", err);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningup: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      toast.success(
        res.data.message || "Account created! Please check your email."
      );
      return { success: true };
    } catch (error) {
      toast.error(error.response.data.message);
      return { success: false };
    } finally {
      set({ isSigningup: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
      return { success: true };
    } catch (error) {
      const msg = error?.response?.data?.message || "Invalid Credentials";
      const isVerified = error?.response?.data?.isVerified;

      if (isVerified === false) {
        toast.error("Please verify your email before logging in");
        return { success: false, needsVerification: true };
      }

      toast.error(msg);
      return { success: false };
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error("Error logging out");
      console.log("Error logging out: ", error);
    } finally {
      set({ isLoggingOut: false });
    }
  },

  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data.updatedUser });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in update profile", error);
      const msg = error?.response?.data?.message || "Failed to update profile";
      toast.error(msg);
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    const existing = get().socket;
    if (!authUser || existing?.connected || existing?.active) return;

    // Only connect if user is verified
    if (!authUser.isVerified) return;

    const socket = io(BASE_URL, { withCredentials: true });
    socket.connect();
    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
    }
  },
}));
