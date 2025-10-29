import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoading from "./UsersLoading";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";

function ChatsList() {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser } =
    useChatStore();
  const { onlineUsers } = useAuthStore();  

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) {
    return <UsersLoading />;
  }
  if (chats.length === 0) {
    return <NoChatsFound />;
  }
  return (
    <div>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="bg-slate-800/30 p-4 rounded-lg cursor-pointer hover:hover:bg-slate-800/60 transition-colors border border-white/10 mb-3"
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            {/* To make the online/offline work dynamically via socket */}
            <div
              className={`avatar ${
                onlineUsers.includes(chat._id) ? "online" : "offline"
              }`}
            >
              <div className="size-12 rounded-full">
                <img
                  src={chat.profilePic || "/profile.png"}
                  alt={chat.fullName}
                />
              </div>
            </div>
            <h4 className="text-gray-100 font-medium truncate">
              {chat.fullName}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatsList;
