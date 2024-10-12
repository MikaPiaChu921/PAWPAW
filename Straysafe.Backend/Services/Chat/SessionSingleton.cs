namespace Straysafe.Backend.Services.Chat
{
    public class SessionSingleton
    {
        public Dictionary<Guid, Dictionary<string, int>> ChatSessionUpdatedKV = [];
        public Dictionary<Guid, List<string>> LockedConnectionIdViaSession = [];
        public Dictionary<Guid, bool> HasNewChat { get; set; } = [];

        public void SetHasNewChat(Guid guid, bool hasNewChat)
        {
            if (HasNewChat.ContainsKey(guid))
                HasNewChat[guid] = hasNewChat;
            else HasNewChat.TryAdd(guid, hasNewChat);
        }

        public bool GetHasNewChat(Guid guid)
        {
            HasNewChat.TryGetValue(guid, out bool hasNewChat);
            return hasNewChat;
        }
    }
}
