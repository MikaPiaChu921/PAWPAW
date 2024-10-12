import React from "react";
import { ChatPosition } from "../../utilities/models/chatUtility/ChatPosition";

/**
 *
 * @param {Object} param0
 * @param {ChatPosition} param0.position
 * @param {String} param0.message
 * @param {Date} param0.dateTimeStamp
 * @param {URL} param0.profilePhoto
 * @returns
 */
function ChatBox({
  position = "left",
  message,
  dateTimeStamp = new Date(),
  profilePhoto,
  id = "",
}) {
  return (
    <div
      id={id}
      className="relative grid grid-cols-2 h-fit my-2"
      title={`Sent on ${dateTimeStamp.toLocaleString()}`}
    >
      {position === ChatPosition.Right && <div></div>}
      <div
        className={`flex items-center ${
          position === ChatPosition.Right && "justify-end"
        }`}
      >
        <div className={`relative flex w-fit`}>
          {position === ChatPosition.Left && (
            <img
              className="object-cover w-10 h-10 rounded-full mr-2"
              src={profilePhoto}
            />
          )}
          <div className="h-fit p-2 rounded-xl bg-gray-300 w-fit max-w-[100px] text-wrap break-words">
            <div className="max-w-[100px] text-wrap break-words">{message}</div>
          </div>
          {position === ChatPosition.Right && (
            <img className="w-10 h-10 rounded-full ml-2" src={profilePhoto} />
          )}
        </div>
      </div>
      {position === ChatPosition.Left && <div></div>}
    </div>
  );
}

export default ChatBox;
