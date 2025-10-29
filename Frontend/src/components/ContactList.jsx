import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoading from "./UsersLoading";
import { useAuthStore } from "../store/useAuthStore";

function ContactList() {
  const {  allContacts, isUsersLoading, setSelectedUser, getAllContacts } =
    useChatStore();
  const {onlineUsers} = useAuthStore();  

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) {
    return <UsersLoading />;
  }
  return (
    <div>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-slate-800/30 p-4 rounded-lg cursor-pointer hover:hover:bg-slate-800/60 transition-colors border border-white/10 mb-3"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            {/* To make the online/offline work dynamically via socket */}
            <div
              className={`avatar ${
                onlineUsers.includes(contact._id) ? "online" : "offline"
              }`}
            >
              <div className="size-12 rounded-full">
                <img
                  src={contact.profilePic || "/profile.png"}
                  alt={contact.fullName}
                />
              </div>
            </div>
            <h4 className="text-gray-100 font-medium truncate">
              {contact.fullName}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContactList;
