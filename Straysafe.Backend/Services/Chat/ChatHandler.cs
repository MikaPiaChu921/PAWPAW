using Straysafe.Backend.Common.DAL.Models;
using Straysafe.Backend.Services.Repositories;

namespace Straysafe.Backend.Services.Chat
{
    public class ChatHandler(IServiceProvider serviceProvider)
    {
        private readonly IServiceProvider _serviceProvider = serviceProvider;
        
        /*
         * RetrieveChatInfo - given by metaData, if not create new
         * GetAllChats - given by chatInfo
         * GetAllChatInfo - given by org or sender
         * AddChat - create a new chat
         */

        public ChatInformation GetChatInformation(string metadata)
        {
            /*
             * Metadata will be an array of string separated by '%|%'
             * First will be the sessionId (used for searching, if not found then create new by topic)
             * Second will be a topicName
             * Third will be the sender (straverId)
             * Fourth will be the recepient (orgId)
             */
            string[] metadtSplt = metadata.Split("%|%");

            using var scope = _serviceProvider.CreateScope();
            var chatInformationRepository = scope.ServiceProvider.GetRequiredService<IRepository<ChatInformation>>();

            _ = Guid.TryParse(metadtSplt[0], out Guid sessionId);
            string topicName = metadtSplt[1] ?? sessionId.ToString();


            var chatInformation = chatInformationRepository.GetAll().FirstOrDefault(cI => cI.Id == sessionId || cI.Metadata == metadata);

            // create a new chatInfo if null
            if (chatInformation == null)
            {
                chatInformation = new()
                {
                    Topic = topicName,
                    Metadata = metadata
                };
                chatInformationRepository.AddAsync(chatInformation);
            }

            return chatInformation;
        }

        public IEnumerable<ChatData> GetAllChats(Guid chatInfo) 
        {
            using var scope = _serviceProvider.CreateScope();
            var chatDataRepository = scope.ServiceProvider.GetRequiredService<IRepository<ChatData>>();
            return chatDataRepository.GetAll().Where(c => c.ChatInfo == chatInfo);
        }

        public IEnumerable<ChatInformation> GetAllChatInformation(string userId = "")
        {
            using var scope = _serviceProvider.CreateScope();
            var chatInformationRepository = scope.ServiceProvider.GetRequiredService<IRepository<ChatInformation>>();
            
            return chatInformationRepository.GetAll().Where(c => c.Metadata.Contains(userId));
        }

        public void AddChat(ChatData chatData)
        {
            using var scope = _serviceProvider.CreateScope();
            var chatDataRepository = scope.ServiceProvider.GetRequiredService<IRepository<ChatData>>();
            chatDataRepository.AddAsync(chatData);
        }
    }
}
