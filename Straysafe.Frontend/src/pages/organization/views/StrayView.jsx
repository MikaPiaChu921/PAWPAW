import React, { useEffect, useState } from "react";
import TableView from "../../../components/containers/TableView";
import {
  RetrieveReports,
  RetrieveSingleAccount,
} from "../../../components/utilities/services/DataHandler";
import { useSearchParams } from "react-router-dom";

function StrayView({ setView, setData }) {
  const [reports, setReport] = useState([]);
  const [actions, setActions] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  function getColor(val) {
    if (val.toLowerCase() === "reported") return "bg-green-200";
    if (val.toLowerCase() === "rescued") return "bg-yellow-200";
    return "bg-orange-200";
  }

  useEffect(() => {
    async function LoadReports() {
      var data = await RetrieveReports();
      var reportData = [];
      var actionData = [];

      for (let report of data) {
        /*
            Only filter stray pets and or with a status of posted
        */
        if (
          report.reportType.toLowerCase() !== "stray" ||
          report.status.toLowerCase() === "adopted" ||
          report.status.toLowerCase() === "posted"
        )
          continue;
        var reporterId = report.reporter;
        var reporterDetails = await RetrieveSingleAccount(reporterId);
        var organizationDetails =
          report.organization &&
          (await RetrieveSingleAccount(report.organization));

        report.reporterDetails = reporterDetails;
        report.organizationDetails = organizationDetails;
        reportData.push([
          `${reporterDetails.firstName} ${reporterDetails.lastName}`,
          report.name,
          report.animalType,
          report.reportType,
          new Date(report.reportDate).toLocaleString(),
          <p
            key={report.id}
            className={`${getColor(report.status)} rounded-full p-1`}
          >
            {report.status}
          </p>,
        ]);

        actionData.push(() => {
          setView("info");
          setData(report);
          searchParams.set("v", "stray");
          setSearchParams(searchParams);
        });
      }
      setReport(reportData);
      setActions(actionData);
    }

    LoadReports();
  }, [setData, setView, searchParams, setSearchParams]);
  return (
    <div className="h-full col-span-2">
      <div className="relative left-[50%] translate-x-[-50%] w-[80%] h-[70%]">
        <h1 className="text-xl font-bold primary-1">View: Stray Pets</h1>
        <TableView
          TableHeader={[
            "Reported by",
            "Name",
            "Animal Type",
            "Report Type",
            "Report Date",
            "Status",
          ]}
          TableRows={reports}
          OnClickActions={actions}
          actionChildren="Details"
          actionClassName="border-[#1794A1] border-2 p-1 rounded-full"
        />
      </div>
    </div>
  );
}

export default StrayView;
