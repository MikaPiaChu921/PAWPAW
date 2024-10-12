import React from "react";
import PageContainer from "../components/containers/PageContainer";
import Header from "../components/headers/Header";
import ChatContainer from "../components/containers/ChatContainer";

function StrayverChat() {
  return (
    <div>
      <PageContainer>
        <Header />
        <ChatContainer minified />
      </PageContainer>
    </div>
  );
}

export default StrayverChat;
