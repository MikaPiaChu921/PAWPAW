import React, { useEffect, useState } from "react";
import PageContainer from "../../../components/containers/PageContainer";
import Input from "../../../components/formElements/Input";
import TableView from "../../../components/containers/TableView";
import { GetDonations } from "../../../components/utilities/services/DataHandler";

function DonationsDashboard() {
  const [donationData, setDonationData] = useState([]);

  useEffect(() => {
    (async () => {
      let data = await GetDonations();
      let tempData = [];

      for (let d of data) {
        tempData.push([
          "₱" + d.amount,
          new Date(d.issueDate).toDateString(),
          new String(d.remarks).split("|")[0],
        ]);
      }

      setDonationData(tempData);
    })();
  }, []);
  return (
    <PageContainer>
      <div className="grid grid-cols-4 items-center my-8">
        <h3 className="col-span-1 text-[25px] primary-1 font-bold">
          Honation History
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
        TableHeader={["Amount", "Donation Date", "Remarks"]}
        TableRows={donationData}
        OnClickActions={null}
      />
    </PageContainer>
  );
}

export default DonationsDashboard;
