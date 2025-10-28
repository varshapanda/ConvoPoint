import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningup: false,
  isLoggingIn: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data.user });
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
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
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
    } catch (error) {
      const msg = error?.response?.data?.message || "Invalid Credentials";
      toast.error(msg);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async()=>{
    try{
      await axiosInstance.post("/auth/logout");
      set({authUser: null});
      toast.success("Logged out successfully");
    }
    catch(error){
      toast.error("Error logging out");
      console.log("Error logging out: ",error);
    }
    finally{
      set({isLoggingOut: false});
    }
  },
  updateProfile: async(data)=>{
    try{
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({authUser: res.data.updatedUser})
      toast.success("Profile updated successfully")
    }
    catch(error){
      console.log("Error in update profile", error);
      const msg = error?.response?.data?.message || "Failed to update profile";
      toast.error(msg);
    }
  }
}));
