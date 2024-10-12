import React from "react";
import Input from "../../../components/formElements/Input";
import PageContainer from "../../../components/containers/PageContainer";
import TableView from "../../../components/containers/TableView";

function NotificationsDashboard() {
  return (
    <PageContainer>
      <div className="grid grid-cols-4 items-center my-8">
        <h3 className="col-span-1 text-[25px] primary-1 font-bold">
          Notification
        </h3>
        <div />
        <div className="col-span-2">
          <Input
            containerClassname="w-max-[400px] w-min-[200px] w-[400px]"
            type="text"
            placeholder="Search for something..."
            icon={"fa-solid fa-magnifying-glass"}
            iconClicked={() => {
              alert("search");
            }}
          />
        </div>
      </div>
      <TableView
        TableHeader={[]}
        TableRows={[
          ["Organization A has posted an announcement"],
          ["User A has reported a stray animal."],
        ]}
        OnClickActions={null}
        rowClassName="text-left border-b-[1px] border-black p-2 text-lg"
      />
    </PageContainer>
  );
}

export default NotificationsDashboard;
