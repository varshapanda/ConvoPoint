import React from "react";
// import { useAuthStore } from "../store/useAuthStore";
import AnimatedBorder from "../components/AnimatedBorder";
import { useChatStore } from "../store/useChatStore";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabOptions from "../components/ActiveTabOptions";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversation from "../components/NoConversation";

function ChatPage() {
  // const { logout } = useAuthStore();
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="relative w-full max-w-6xl h-[800px] md:h-[800px]">
      <AnimatedBorder>

        {/* Left Side */}
        <div className="w-80 bg-white/5 border-r border-white/10 flex flex-col">
          <ProfileHeader/>
          <ActiveTabOptions/>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex flex-col bg-black">
        {selectedUser ? <ChatContainer/>: <NoConversation/>}
        </div>
      </AnimatedBorder>
    </div>
  );
}

export default ChatPage;
