import React, { useEffect } from "react";
import Input from "../../../components/formElements/Input";
import DashboardReportCard from "../../../components/cards/DashboardReportCard";
import { Chart } from "chart.js/auto";

function MainDashboard() {
  useEffect(() => {
    (async function () {
      const data = [
        { year: 2010, count: 10 },
        { year: 2011, count: 20 },
        { year: 2012, count: 15 },
        { year: 2013, count: 25 },
        { year: 2014, count: 22 },
        { year: 2015, count: 30 },
        { year: 2016, count: 28 },
      ];

      new Chart("graph-a", {
        type: "bar",
        data: {
          labels: data.map((row) => row.year),
          datasets: [
            {
              label: "Acquisitions by year",
              data: data.map((row) => row.count),
            },
          ],
        },
      });
    })();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-4 items-center my-8">
        <h3 className="col-span-1 text-[25px] primary-1 font-bold">
          Dashboard
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
        <DashboardReportCard title="Found Pets" value={25} />
        <DashboardReportCard title="Lost Pets" value={34} />
        <DashboardReportCard title="Reported Strays" value={59} />
      </div>

      <div className="grid grid-cols-2 justify-items-center my-8">
        <div className="primary-1 text-left shadow-md w-[350px] p-4 md:col-span-1 col-span-2">
          <p className="text-[20px] font-bold">NOTIFICATIONS</p>
          <p className="text-[12px] mt-2 border-b-2 border-gray-300">
            Organization A has posted an announcement
          </p>
          <p className="text-[12px] mt-2 border-b-2 border-gray-300">
            User A has reported a stray animal
          </p>
          <p className="text-[12px] mt-2 border-b-2 border-gray-300">
            User B has posted a lost pet
          </p>
          <p className="text-[12px] mt-2 border-b-2 border-gray-300">
            User C has posted a found animal
          </p>
          <p className="text-[12px] mt-2 border-b-2 border-gray-300">
            Organization B has posted an animal for adoption
          </p>
        </div>
        <div className="primary-1 text-left shadow-md w-[350px] p-4 md:col-span-1 col-span-2">
          <canvas id="graph-a"></canvas>
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;
