import React, { useEffect, useState } from "react";
import Input from "../../../components/formElements/Input";
import PageContainer from "../../../components/containers/PageContainer";
import TableView from "../../../components/containers/TableView";
import { GetNotifications } from "../../../components/utilities/services/DataHandler";

function NotificationsDashboard() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    (async () => {
      let notifData = await GetNotifications();
      let tempData = [];
      for (let data of notifData) {
        tempData.push([data.description]);
      }
      console.log(tempData);
      setNotifications(tempData);
    })();
  }, []);
  return (
    <PageContainer>
      <div className="grid grid-cols-4 items-center my-8">
        <h3 className="col-span-1 text-[25px] primary-1 font-bold">
          Notification
        </h3>
        <div />
        {/* <div className="col-span-2">
          <Input
            containerClassname="w-max-[400px] w-min-[200px] w-[400px]"
            type="text"
            placeholder="Search for something..."
            icon={"fa-solid fa-magnifying-glass"}
            iconClicked={() => {
              alert("search");
            }}
          />
        </div> */}
      </div>
      <TableView
        TableHeader={[]}
        TableRows={notifications}
        OnClickActions={null}
        rowClassName="text-left border-b-[1px] border-black p-2 text-lg"
      />
    </PageContainer>
  );
}

export default NotificationsDashboard;
