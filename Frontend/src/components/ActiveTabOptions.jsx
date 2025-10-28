import React from "react";
import { useChatStore } from "../store/useChatStore";

function ActiveTabOptions() {
  const { activeTab, setActiveTab } = useChatStore();
  return (
    <div className="tabs tabs-boxed bg-transparent p-2 m-2">
      <button
        onClick={() => setActiveTab("chats")}
        className={`tab ${
          activeTab === "chats"
            ? "bg-white text-black"
            : "text-slate-400"
        }`}
      >
        Chats
      </button>
      <button
        onClick={() => setActiveTab("contacts")}
        className={`tab ${
          activeTab === "contacts"
            ? "bg-white text-black"
            : "text-slate-400"
        }`}
      >
        Contacts
      </button>
    </div>
  );
}

export default ActiveTabOptions;
