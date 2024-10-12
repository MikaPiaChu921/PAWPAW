import React from "react";
import ChatBox from "./chat/ChatBox";
import { ChatPosition } from "../utilities/models/chatUtility/ChatPosition";
import {
  API_LINKS,
  ApplicationConstants,
} from "../../contants/ApplicationConstants";
import { ChatData } from "../utilities/models/chatUtility/ChatData";
import { GetProfileInformation } from "../utilities/services/AuthenticationHandler";

function GetMetaData({ user1, user2 }, sender) {
  const currentLoggedInUser = GetProfileInformation();
  if (!user1 || !user2 || !sender) return [ChatPosition.Right, ""];
  if (currentLoggedInUser.id.toLowerCase() === sender.toLowerCase())
    return [ChatPosition.Right, currentLoggedInUser.id];
  return [ChatPosition.Left, user2.id];
}

/**
 *
 * @param {Object} param0
 * @param {Array<ChatData>} param0.Chats
 * @returns
 */
function MessageContainer({ Chats = [], focusChat }) {
  return (
    <div className="relative w-full h-[450px] overflow-y-auto overflow-x-hidden">
      <div className="relative w-full h-fit bottom-0 top-auto">
        {Chats.map((chatData, index) => {
          const md = GetMetaData(focusChat, chatData.sender);
          return (
            <ChatBox
              key={`${index}-${chatData.id}`}
              id={`message-${chatData.id}`}
              message={chatData.message}
              position={md[0]}
              profilePhoto={API_LINKS.MEDIA_DOWNLOAD(md[1], true)}
              dateTimeStamp={new Date(chatData.messageDate).toLocaleString()}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MessageContainer;
