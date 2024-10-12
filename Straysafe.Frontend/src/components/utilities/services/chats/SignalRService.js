import { ChatHubUrl } from "../../../../contants/ApplicationConstants"
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

/**
 * @returns {Promise<HubConnection>}
 */
export const GetChatHubConnection = async () => {
    var connection = new HubConnectionBuilder().withUrl(ChatHubUrl).build();
    await connection.start().catch(e => console.error(`Error staring ChatHubConnection: ${e}`));
    return connection;
}
