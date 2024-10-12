import React from "react";
import PageContainer from "../components/containers/PageContainer";
import Header from "../components/headers/Header";
import ChatContainer from "../components/containers/ChatContainer";

function ChatPage() {
  return (
    <div>
      <PageContainer>
        <Header />
        <ChatContainer />
      </PageContainer>
    </div>
  );
}

export default ChatPage;
