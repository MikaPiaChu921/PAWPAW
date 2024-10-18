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

function ReportsDashboard() {
  const [reportsChart, setReportChart] = useState(null);
  const [foundPetCount, setFoundPetCount] = useState(0);
  const [lostPetCount, setLostPetCount] = useState(0);
  const [strayPetCount, setStrayPetCount] = useState(0);
  const [chartDataset, setChartDataset] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    (async function () {
      const data = chartDataset;

      if (!reportsChart && chartDataset) {
        setReportChart(
          new Chart("graph-a", {
            type: "bar",
            data: {
              labels: data.map((row) => row.month),
              datasets: [
                {
                  label: "Reported Strays per Month",
                  data: data.map((row) => row.count),
                },
              ],
            },
          })
        );
      }
    })();
  }, [reportsChart, chartDataset]);

  useEffect(() => {
    (async () => {
      // load reports
      var reports = await RetrieveReports();

      setFoundPetCount(
        reports.filter((r) => r.reportType.toLowerCase().includes("found"))
          .length
      );
      setLostPetCount(
        reports.filter((r) => r.reportType.toLowerCase().includes("lost"))
          .length
      );
      setStrayPetCount(
        reports.filter((r) => r.reportType.toLowerCase().includes("stray"))
          .length
      );
      const reportedStray = reports.filter((r) =>
        r.reportType.toLowerCase().includes("stray")
      );

      const currentMonthIndex = new Date().getMonth();
      const kv = {
        [`${getMonth(currentMonthIndex)}`]: 0,
        [`${getMonth(currentMonthIndex - 1)}`]: 0,
        [`${getMonth(currentMonthIndex - 2)}`]: 0,
        [`${getMonth(currentMonthIndex - 3)}`]: 0,
        [`${getMonth(currentMonthIndex - 4)}`]: 0,
      };

      for (let report of reportedStray) {
        let existingMonth =
          kv[getMonth(new Date(report.reportDate).getMonth())];

        if (existingMonth >= 0) {
          kv[getMonth(new Date(report.reportDate).getMonth())] += 1;
        }
      }
      let arrDt = [];

      for (let x in kv) {
        arrDt.push({ month: x, count: kv[x] });
      }

      setChartDataset(arrDt.reverse());

      // load notifications
      const notifications = await GetNotifications();
      const sorted = notifications.sort(
        (a, b) => new Date(b.created) - new Date(a.created)
      );
      setNotifications(sorted.slice(0, 10));
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
        <div className="grid grid-cols-3 gap-1 justify-items-center my-8">
          <DashboardReportCard title="Found Pets" value={foundPetCount} />
          <DashboardReportCard title="Lost Pets" value={lostPetCount} />
          <DashboardReportCard title="Reported Strays" value={strayPetCount} />
        </div>

        <div className="grid grid-cols-2 justify-items-center my-8">
          <div className="primary-1 text-left shadow-md w-[350px] p-4 md:col-span-1 col-span-2">
            <p className="text-[20px] font-bold">NOTIFICATIONS</p>
            {notifications.map((notif, index) => (
              <p
                key={index}
                className="text-[12px] mt-2 border-b-2 border-gray-300"
              >
                {notif.description}
              </p>
            ))}
          </div>
          <div className="primary-1 text-left shadow-md w-[350px] p-4 md:col-span-1 col-span-2">
            <canvas id="graph-a"></canvas>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}

export default ReportsDashboard;
