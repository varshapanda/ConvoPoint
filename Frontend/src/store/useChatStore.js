import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

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
        set({ chats: res.data.chatPartners});
    }
    catch(error){
        toast.error(error.response.data.message);
    }
    finally{
        set({isUsersLoading: false});
    }
  },

  getMessagesByUserId: async(userId)=>{
    set({isMessagesLoading: true});
    try{
        const res = await axiosInstance.get(`/messages/${userId}`);
        set({ messages: res.data})
    }
    catch(error){
      console.log("Error while getting messages by userId", error);
      toast.error(error?.response?.data?.message || "Error getting messages");
    }
    finally{
      set({isMessagesLoading: false});
    }
  },

  sendMessage: async(messageData)=>{
    // Get the states
    // Get the selected user field 
    // Get access to the previous messages and add the latest message
    const { selectedUser, messages } = get();
    const {authUser} = useAuthStore.getState();
    const dumId = `dum-${Date.now()}`
    const optimisedMessage = {
      _id: dumId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimised: true

    }
    // before we send request, update the UI immediately
    // Instead of waiting for the message to load and show, optimised message object is created to immediately update the UI after a message is added.
    set({messages: [...messages, optimisedMessage]});

    try{
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({messages: messages.concat(res.data.newMessage)});
    }
    catch(err){
      // if it fails, remove the optimised messages and set messages to the previous state
      set({messages: messages});
      console.log("Error while sending messsage", err);
      toast.error(err?.response?.data?.message || "Error sending message");
    }
  }

}));
