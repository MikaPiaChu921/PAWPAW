using Microsoft.AspNetCore.SignalR;
using Straysafe.Backend.Common.DAL.Models;
using Straysafe.Backend.Services.Chat;
using System.Security.Cryptography;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Straysafe.Backend.Hubs
{
    public class ChatHub(ChatHandler handler, SessionSingleton session): Hub
    {
        private readonly ChatHandler _chatHandler = handler;
        private readonly SessionSingleton _session = session;

        public async Task GetAllChatInfo(string id)
        {
            var allChatInformations = _chatHandler.GetAllChatInformation(id);
            await Clients.Caller.SendAsync("AllChatInformations", allChatInformations);
        }

        public async Task GetChatInfo(string straverId, string orgId, string topic, string sessionId)
        {
            var metaData = $"{sessionId}%|%{topic}%|%{straverId}%|%{orgId}";

            var chatInformation = _chatHandler.GetChatInformation(metaData);

            // someone is retrieving chat information
            // we might as well save the session in the dictionary for update purpose
            if (chatInformation != null)
            {
                var connectionId = Context.ConnectionId;

                if (_session.ChatSessionUpdatedKV.TryGetValue(chatInformation.ChatInfo, out Dictionary<string, int>? value))
                {
                    var connectedUsers = value ?? [];

                    if (!connectedUsers.ContainsKey(connectionId))
                    {
                        connectedUsers[connectionId] = 0;
                    }

                    _session.ChatSessionUpdatedKV[chatInformation.ChatInfo] = connectedUsers;
                }
                else
                {
                    _session.ChatSessionUpdatedKV[chatInformation.ChatInfo] = [];
                }

                _session.SetHasNewChat(chatInformation.ChatInfo, true);
            }
            await Clients.Caller.SendAsync("ChatInformation", chatInformation);

            var allChatInformations = _chatHandler.GetAllChatInformation(orgId);
            await Clients.Caller.SendAsync("AllChatInformations", allChatInformations);
        }
        
        public async Task EnterChat(string chatInfoId)
        {
            bool parseSuccess = Guid.TryParse(chatInfoId, out Guid id);

            if (parseSuccess)
            {
                // check for session id if exists in dictionary, it should exists first
                if (_session.ChatSessionUpdatedKV.ContainsKey(id))
                {
                    await Groups.AddToGroupAsync(Context.ConnectionId, chatInfoId);
                    _session.SetHasNewChat(id, true);
                }
            }
        }

        public async Task GetChatNotification()
        {
            
            try
            {
                do
                {
                    var tempKVSession = _session.ChatSessionUpdatedKV;
                    // retrieve all chats
                    foreach (var (chatInfoId, connectedUsers) in tempKVSession)
                    {
                        if (!_session.GetHasNewChat(chatInfoId)) continue;
                        // check if there a new chat
                        var chatDatas = _chatHandler.GetAllChats(chatInfoId);
                        int lastSentChatId = 0;
                        /*
                         * To avoid redunancy, we will set a lock using the ConnectionString
                         */
                        string connectionId = Context.ConnectionId;
                        // check if connection id is in connected users
                        if (connectedUsers.ContainsKey(connectionId))
                        {
                            lastSentChatId = connectedUsers[connectionId];
                        }
                        //string connectionId = Context.ConnectionId;

                        //if (_session.LockedConnectionIdViaSession.TryGetValue(chatInfoId, out List<string>? value))
                        //{
                        //    List<string> connIds = value ?? [];

                        //    if (connIds.Contains(connectionId))
                        //        return;

                        //    connIds.Add(connectionId);
                        //    _session.LockedConnectionIdViaSession[chatInfoId] = connIds;
                        //}
                        //else
                        //{
                        //    _session.LockedConnectionIdViaSession[chatInfoId] = [connectionId];
                        //}


                        if (lastSentChatId > 0)
                        {
                            var toSendChats = new List<ChatData>();
                            var lastChatData = chatDatas.FirstOrDefault(c => c.Id == lastSentChatId);
                            toSendChats.AddRange(chatDatas.Where(c => c.Id > lastSentChatId).Order());
                            var lastElement = toSendChats.LastOrDefault();

                            if(lastElement != null)
                            {
                                lastSentChatId = lastElement.Id;
                            }
                            await Clients.Caller.SendAsync("LatestChat-" + chatInfoId, toSendChats);
                        }
                        else
                        {
                            var lastChatData = chatDatas.LastOrDefault();
                            if (lastChatData != null) lastSentChatId = lastChatData.Id;
                            await Clients.Caller.SendAsync("LatestChat-" + chatInfoId, chatDatas);
                        }

                        var firstChat = chatDatas.FirstOrDefault();
                        if (firstChat != null)
                        {
                            var allChatInformations = _chatHandler.GetAllChatInformation(firstChat.Recepient.ToString());
                            await Clients.All.SendAsync("AllChatInformations", allChatInformations);
                        }

                        connectedUsers[connectionId] = lastSentChatId;
                        Thread.Sleep(500);

                        _session.SetHasNewChat(chatInfoId, false);
                    }

                    Thread.Sleep(500);
                    _session.ChatSessionUpdatedKV = tempKVSession;

                } while (true);
            }
            catch(Exception e) {
                Console.WriteLine(e.ToString());
            }
        }
    }
}
