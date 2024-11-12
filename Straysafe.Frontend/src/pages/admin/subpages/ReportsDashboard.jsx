import React, { useEffect, useState } from "react";
import Input from "../../../components/formElements/Input";
import DashboardReportCard from "../../../components/cards/DashboardReportCard";
import { Chart } from "chart.js/auto";
import PageContainer from "../../../components/containers/PageContainer";
import {
  GetNotifications,
  RetrieveReports,
} from "../../../components/utilities/services/DataHandler";
import { getMonth } from "../../../components/utilities/PageUtils";
import {
  GetMostReportOwnedByOrganization,
  GetNumberOfReportTypes,
  GetNumberOfUsersByRoles,
  GetTotalRevenue,
} from "../../../components/utilities/services/ReportsUtil";

function ReportsDashboard() {
  const [usersPerRole, setUsersPerRole] = useState({
    Strayver: 0,
    Organization: 0,
  });
  const [userRoleChart, setUserRoleChart] = useState(null);

  const [reportedType, setReportedType] = useState({
    stray: 0,
    lost: 0,
    found: 0,
  });
  const [reportedTypeChart, setReportedTypeChart] = useState(null);

  const [revenueData, setRevenueData] = useState([[], 0]);
  const [revenueChart, setRevenueChart] = useState(null);

  const [orgData, setOrgData] = useState([null, 0]);
  const [orgChart, setOrgChart] = useState(null);

  useEffect(() => {
    (async function () {
      if (
        !userRoleChart &&
        (usersPerRole.Organization > 0 || usersPerRole.Strayver > 0)
      ) {
        setUserRoleChart(
          new Chart("graph-user-roles", {
            type: "pie",
            data: {
              labels: ["Strayver", "Organization"],
              datasets: [
                {
                  label: "Number of users",
                  data: [usersPerRole.Strayver, usersPerRole.Organization],
                },
              ],
            },
          })
        );
      }

      if (
        !reportedTypeChart &&
        (reportedType.stray > 0 ||
          reportedType.found > 0 ||
          reportedType.lost > 0)
      ) {
        setReportedTypeChart(
          new Chart("graph-reported-type", {
            type: "doughnut",
            data: {
              labels: ["Stray", "Lost", "Found"],
              datasets: [
                {
                  label: "Type of reports",
                  data: [
                    reportedType.stray,
                    reportedType.lost,
                    reportedType.found,
                  ],
                  backgroundColor: ["Orange", "Green", "Yellow"],
                },
              ],
            },
          })
        );
      }

      if (!revenueChart && revenueData[1] > 0) {
        var data = revenueData[0].reverse();
        setRevenueChart(
          new Chart("graph-revenue", {
            type: "line",
            data: {
              labels: data.map((row) => row.month),
              datasets: [
                {
                  label: "Revenue for the past 5 months",
                  data: data.map((row) => row.count),
                },
              ],
            },
          })
        );
      }
      if (!orgChart && orgData[0]) {
        setOrgChart(
          new Chart("graph-org", {
            type: "pie",
            data: {
              labels: orgData[0],
              datasets: [
                {
                  label: "This organization associated # of reports",
                  data: orgData[1],
                },
              ],
            },
          })
        );
      }
    })();
  }, [
    usersPerRole,
    userRoleChart,
    reportedType,
    reportedTypeChart,
    revenueChart,
    revenueData,
    orgChart,
    orgData,
  ]);

  useEffect(() => {
    (async () => {
      // load user roles
      var userRoles = await GetNumberOfUsersByRoles();
      setUsersPerRole(userRoles);
      // load reported type
      var reportedType = await GetNumberOfReportTypes();
      setReportedType(reportedType);

      // load donations
      var donations = await GetTotalRevenue();
      setRevenueData(donations);

      // load reports owned by org
      var orgOwnRep = await GetMostReportOwnedByOrganization();
      setOrgData(orgOwnRep);
    })();
  }, []);

  return (
    <div>
      <PageContainer>
        <div className="grid grid-cols-4 items-center my-8">
          <h3 className="col-span-1 text-[25px] primary-1 font-bold">
            Reports
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
        <div className="grid grid-cols-3 gap-1 justify-items-center my-8">
          {/* <DashboardReportCard title="Found Pets" value={foundPetCount} />
          <DashboardReportCard title="Lost Pets" value={lostPetCount} />
          <DashboardReportCard title="Reported Strays" value={strayPetCount} /> */}
        </div>

        <div className="grid grid-cols-2 justify-items-center my-8">
          <div className="primary-1 text-left shadow-md w-100 p-4 md:col-span-1 col-span-2">
            <h1 className="text-center font-bold">
              Total Donation{" "}
              <a className="text-green-500">(PHP {revenueData[1]})</a>
            </h1>
            <canvas className=" w-100 h-[300px]" id="graph-revenue"></canvas>
          </div>
          <div className="primary-1 text-left shadow-md w-100 p-4 md:col-span-1 col-span-2">
            <h1 className="text-center font-bold">
              Top reports associated by organizations
            </h1>
            <canvas className=" w-100 h-[400px]" id="graph-org"></canvas>
          </div>
          <div className="primary-1 text-left shadow-md w-100 p-4 md:col-span-1 col-span-2">
            <h1 className="text-center font-bold">
              Number of registered users (
              {usersPerRole.Organization + usersPerRole.Strayver})
            </h1>
            <canvas className=" w-100" id="graph-user-roles"></canvas>
          </div>
          <div className="primary-1 text-left shadow-md w-100 p-4 md:col-span-1 col-span-2">
            <h1 className="text-center font-bold">
              Number of reports per type (
              {reportedType.lost + reportedType.found + reportedType.stray})
            </h1>
            <canvas
              className=" w-100 h-[300px]"
              id="graph-reported-type"
            ></canvas>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}

export default ReportsDashboard;
