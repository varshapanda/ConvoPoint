import { MessageCircleIcon } from "lucide-react";

const NoChatHistory = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      {/* Icon container */}
      <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mb-5 border border-gray-700">
        <MessageCircleIcon className="size-8 text-gray-300" />
      </div>

      {/* Heading */}
      <h3 className="text-lg font-semibold text-gray-100 mb-3">
        Start your conversation with {name}
      </h3>

      {/* Description */}
      <div className="flex flex-col space-y-3 max-w-md mb-5">
        <p className="text-gray-400 text-sm">
          This is the beginning of your conversation. Send a message to start chatting!
        </p>
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-gray-700 to-transparent mx-auto"></div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button className="px-4 py-2 text-xs font-medium text-gray-300 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
          Say Hello
        </button>
        <button className="px-4 py-2 text-xs font-medium text-gray-300 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
          How are you?
        </button>
        <button className="px-4 py-2 text-xs font-medium text-gray-300 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
          Meet up soon?
        </button>
      </div>
    </div>
  );
};

export default NoChatHistory;
