import { ChatPosition } from "./ChatPosition";

export class ChatData{
    constructor({chatInfo, sender, recepient, message, type}) {
        this.id = 0;
        this.chatInfo = chatInfo;
        this.sender = sender;
        this.recepient = recepient;
        this.message = message;
        this.type = type;
        this.messageDate = new Date();

        this.Position = ChatPosition.Left;

    }
}