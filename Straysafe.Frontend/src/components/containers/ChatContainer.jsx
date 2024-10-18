import React, { useEffect, useState } from "react";
import ChatUser from "./chat/ChatUser";
import Input from "../formElements/Input";
import {
  API_LINKS,
  ApplicationConstants,
} from "../../contants/ApplicationConstants";
import MessageContainer from "./MessageContainer";
import { ChatData } from "../utilities/models/chatUtility/ChatData";
import { useSearchParams } from "react-router-dom";
import { GetChatHubConnection } from "../utilities/services/chats/SignalRService";
import {
  GetFirstChat,
  GetLatestChat,
  RetrieveSingleAccount,
  SubmitChat,
} from "../utilities/services/DataHandler";
import { GetProfileInformation } from "../utilities/services/AuthenticationHandler";
import { RedirectTo } from "../utilities/PageUtils";
import Button from "../buttons/Button";

function ChatContainer({ minified = false }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [chatHubConnection, setChatHubConnection] = useState(null);
  const [chatInformation, setChatInformation] = useState(null);
  const [allChatInformations, setAllChatInformations] = useState(null);
  const [chatDatas, setChatDatas] = useState([]);
  const [focusChat, setFocusChat] = useState({ user1: null, user2: null });
  const [inputMessage, setInputMessage] = useState("");
  const [latestChat, setLatestChat] = useState("");
  const [showChathead, setShowChathead] = useState(false);
  const [keyValues, setKeyValues] = useState([]);
  let called = false;

  const AddToKeyV = (key, value) => {
    let kv = keyValues;

    kv.push({ key, value });
    setKeyValues(kv);
  };

  const GetValue = (key) => {
    let kv = keyValues;

    for (let kValuePairs of kv) {
      if (kValuePairs.key === key) return kValuePairs.value;
    }
    return null;
  };

  useEffect(() => {
    if (called) return;
    called = true;
    // setup chathub connection
    (async () => {
      if (chatHubConnection || chatInformation) return;
      let connection = await GetChatHubConnection();
      setChatHubConnection(connection);
      console.log("Websocket connection has created");

      const topic = searchParams.get("tp");
      const org = searchParams.get("og");
      const str = searchParams.get("st");

      if (topic && org && str)
        connection.invoke("GetChatInfo", str, org, topic, "");
      connection.invoke("GetAllChatInfo", GetProfileInformation().id);

      connection.on("ChatInformation", (data) => {
        // user enter the chat
        console.log("Entered Chat Session: " + data.chatInfo);
        // get latest chat
        setChatInformation(data);
      });

      connection.on("AllChatInformations", (data) => {
        (async () => {
          const newChatInfoArray = [];
          // user enter the chat
          for (let chatInfo of data) {
            // filter chat info only with the current user
            let loggedInUserId = GetProfileInformation().id;
            if (!chatInfo.metadata.includes(loggedInUserId)) continue;

            let latestChat = await GetLatestChat(chatInfo.chatInfo);
            if (latestChat.latest === null) continue;

            chatInfo.latest = latestChat.latest;

            let firstChat = GetValue(chatInfo.chatInfo + "first");
            if (firstChat === null) {
              firstChat = await GetFirstChat(chatInfo.chatInfo);
              AddToKeyV(chatInfo.chatInfo + "first", firstChat);
            }
            chatInfo.first = firstChat.first;

            let sender = GetValue("sender" + firstChat.first?.sender);

            if (
              firstChat.first !== null &&
              sender === null &&
              firstChat.first?.sender != null
            ) {
              if (firstChat.first?.sender !== undefined) {
                if (firstChat.first?.sender !== GetProfileInformation().id)
                  sender = await RetrieveSingleAccount(firstChat.first?.sender);
                else
                  sender = await RetrieveSingleAccount(
                    firstChat.first?.recepient
                  );
              }
              AddToKeyV("sender" + firstChat.first?.sender, sender);
            }

            chatInfo.sender = sender;
            newChatInfoArray.push(chatInfo);
          }

          // get latest chat
          setAllChatInformations(newChatInfoArray);
        })();
      });

      (async () => {
        // set the focus chat

        const switchChat = searchParams.get("sw");

        // let's retrieve user information
        const user1Id = GetProfileInformation().id === org ? str : org;
        const user2Id = GetProfileInformation().id !== org ? org : str;

        let user1 = GetValue(user1Id);
        if (user1 === null && user1Id != null) {
          user1 = await RetrieveSingleAccount(user1Id);
          AddToKeyV(user1Id, user1);
        }

        let user2 = GetValue(user2Id);
        if (user2 === null && user1Id != null) {
          user2 = await RetrieveSingleAccount(user2Id);

          AddToKeyV(user1Id, user1);
        }

        setFocusChat({ user1, user2 });
      })();
    })();
  }, [searchParams]);

  useEffect(() => {
    if (!chatHubConnection || !chatInformation) return;

    chatHubConnection.on("LatestChat-" + chatInformation.chatInfo, (chats) => {
      if (chats && chats.length > 0) {
        setChatDatas([...chatDatas, ...chats]);
      }
    });

    chatHubConnection.invoke("GetChatNotification");
  }, [chatHubConnection, chatInformation, chatDatas]);

  useEffect(() => {
    if (!chatHubConnection || !chatInformation) return;

    if (chatDatas.length > 0) {
      setTimeout(() => {
        let txb = document.getElementById(
          `message-${chatDatas[chatDatas.length - 1].id}`
        );
        txb.scrollIntoView();
      }, 100);
    }
    /**
     * Reserved
     */
  }, [chatHubConnection, chatInformation, chatDatas]);

  const handleSubmitChat = () => {
    if (inputMessage === "") return;
    const org = searchParams.get("og");
    const str = searchParams.get("st");
    let payload = new ChatData({
      chatInfo: chatInformation.chatInfo,
      sender: GetProfileInformation().id === str ? str : org,
      recepient: GetProfileInformation().id !== org ? org : str,
      message: inputMessage,
      type: "msg",
    });

    SubmitChat(payload);
    setTimeout(() => {
      setInputMessage("");
    }, 100);
  };

  return (
    <div>
      <div className={`${!minified && "grid-or-block-3 h-auto sm:h-[80vh"}`}>
        <div
          className={`${
            showChathead ? "top-0" : "top-[-100vh]"
          } absolute h-[100vh] w-full items-center border-b-2 z-[99] p-3 bg-white overflow-y-auto shadow-lg transition-all duration-200`}
        >
          <h1 className="text-left primary-1 text-[30px]">Chats</h1>
          {allChatInformations &&
            allChatInformations.map((chatInfo) => {
              var userProfile = GetProfileInformation();
              const metaData = chatInfo.metadata.split("%|%");
              if (
                !chatInfo.sender ||
                !chatInfo.metadata.includes(userProfile.id)
              )
                return <div key={chatInfo.id}></div>;
              return (
                <ChatUser
                  key={chatInfo.id}
                  displayName={`${chatInfo.sender?.firstName || ""} ${
                    chatInfo.sender?.lastName || ""
                  }`}
                  topic={chatInfo.topic}
                  lastMessage={`${chatInfo.latest?.message || ""}`}
                  profilePhoto={
                    chatInfo.first?.sender &&
                    API_LINKS.MEDIA_DOWNLOAD(chatInfo.sender?.id, true)
                  }
                  onClick={() => {
                    RedirectTo(
                      ApplicationConstants.ROUTE_CHAT_STRAYVER +
                        `?tp=${metaData[1]}&og=${metaData[3]}&st=${metaData[2]}`
                    );
                  }}
                />
              );
            })}
        </div>
        {searchParams.get("sw") && (
          <div className="show-on-mobile col-span-3 text-center text-sm pb-2">
            <Button
              onClick={() => {
                setShowChathead(!showChathead);
              }}
            >
              Show Chats
            </Button>
          </div>
        )}
        <div className="border-r-2 border-gray-400 h-full col-span-1 hide-on-mobile">
          {!minified && (
            <>
              <h1 className="text-left primary-1 text-[30px]">Chats</h1>
              <div className="overflow-y-auto h-[500px]">
                {allChatInformations &&
                  allChatInformations.map((chatInfo) => {
                    var userProfile = GetProfileInformation();
                    const metaData = chatInfo.metadata.split("%|%");
                    if (
                      !chatInfo.sender ||
                      !chatInfo.metadata.includes(userProfile.id)
                    )
                      return <div key={chatInfo.id}></div>;
                    console.log(chatInfo.sender);
                    return (
                      <ChatUser
                        key={chatInfo.id}
                        displayName={`${chatInfo.sender?.firstName || ""} ${
                          chatInfo.sender?.lastName || ""
                        }`}
                        topic={chatInfo.topic}
                        lastMessage={`${chatInfo.latest?.message || ""}`}
                        profilePhoto={
                          chatInfo.sender.id &&
                          API_LINKS.MEDIA_DOWNLOAD(chatInfo.sender.id, true)
                        }
                        onClick={() => {
                          RedirectTo(
                            ApplicationConstants.ROUTE_CHAT +
                              `?tp=${metaData[1]}&og=${metaData[3]}&st=${metaData[2]}&sw=false`
                          );
                        }}
                      />
                    );
                  })}
              </div>
            </>
          )}
        </div>

        <div className="relative h-full col-span-2">
          {searchParams.get("tp") && (
            <div className="relative left-[50%] translate-x-[-50%] w-[80%] h-[70%]">
              <ChatUser
                displayName={`${focusChat?.user2?.firstName} ${focusChat?.user2?.lastName}`}
                profilePhoto={API_LINKS.MEDIA_DOWNLOAD(
                  focusChat?.user2?.id,
                  true
                )}
              />
              <MessageContainer Chats={[...chatDatas]} focusChat={focusChat} />
              <div className="">
                <Input
                  type="text"
                  containerClassname="w-full"
                  placeholder="Message"
                  icon="fa-solid fa-paper-plane"
                  iconClicked={handleSubmitChat}
                  set={setInputMessage}
                  value={inputMessage}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
