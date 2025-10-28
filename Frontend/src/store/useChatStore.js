import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: localStorage.getItem("isSoundEnabled") === true,

  // If true the toggle it to false and vice-a-versa
  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled); //update the localStorage
    set({ isSoundEnabled: !get().isSoundEnabled }); // then update the state, so that UI can be updated accordingly.
  },

  //  Tabs can be either chats or contacts
  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },

  getAllContacts: async () => {
    set({isUsersLoading: true});
    try{
        const res = await axiosInstance.get("/messages/contacts");
        set({allContacts: res.data});
    }
    catch(error){
        toast.error(error.response.data.message);
    }
    finally{
        set({isUsersLoading: false});
    }

  },
  getMyChatPartners: async () => {
    set({isUsersLoading: true});
    try{
        const res = await axiosInstance.get("/messages/chats");
        set({chats: res.data});
    }
    catch(error){
        toast.error(error.response.data.message);
    }
    finally{
        set({isUsersLoading: false});
    }
  },

}));
