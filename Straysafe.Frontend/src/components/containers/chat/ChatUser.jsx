import React from "react";

function ChatUser({
  profilePhoto,
  displayName = "",
  lastMessage,
  onClick,
  className = "flex my-2 w-[90%]",
  topic,
}) {
  return (
    <div
      className={className}
      onClick={() => onClick && onClick()}
      title={`Click to message ${displayName}`}
    >
      <div className="w-[60px] h-[60px] overflow-hidden">
        <img
          className="w-[60px] h-[60px] rounded-full object-cover"
          src={profilePhoto}
        />
      </div>
      <div className="flex items-center cursor-pointer w-auto">
        <div className="overflow-clip w-auto">
          <h1 className="px-2 font-bold text-xl">
            {displayName} <p className="text-xs text-orange-500">{topic}</p>
          </h1>
          <p className="px-2 text-gray-500 truncate w-[200px]">{lastMessage}</p>
        </div>
      </div>
    </div>
  );
}

export default ChatUser;
