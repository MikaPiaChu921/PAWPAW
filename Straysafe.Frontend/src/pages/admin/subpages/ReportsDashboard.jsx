import React, { useEffect, useState } from "react";
import PageContainer from "../../../components/containers/PageContainer";
import Input from "../../../components/formElements/Input";
import DateRange from "../../../components/formElements/DateRange";
import SelectInput from "../../../components/formElements/SelectInput";
import DashboardReportCard from "../../../components/cards/DashboardReportCard";
import { Chart } from "chart.js/auto";

function ReportsDashboard() {
  const [dateFrom, setDateFrom] = useState(undefined);
  const [dateTo, setDateTo] = useState(undefined);
  const [animalType, setAnimalType] = useState(undefined);
  const [reportsChart, setReportChart] = useState(null);

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

      if (!reportsChart) {
        setReportChart(
          new Chart("graph-b", {
            type: "bar",
            data: {
              labels: data.map((row) => row.year),
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
  }, [reportsChart]);
  return (
    <div className="mb-4">
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
        <div className="grid grid-cols-2">
          <DateRange
            className="col-span-1"
            inputClassname="w-[160px]"
            setFrom={setDateFrom}
            setTo={setDateTo}
          />
          <div className="grid grid-cols-3 col-span-1 gap-2">
            <SelectInput
              className="col-span-1"
              icon="fa-solid fa-paw"
              options={["Dog", "Cat"]}
              placeholder={"Animal Type"}
              selectedOption={setAnimalType}
            />
            <SelectInput
              className="col-span-1"
              icon="fa-solid fa-bullhorn"
              placeholder="Report Type"
            />
            <SelectInput
              className="col-span-1"
              icon="fa-solid fa-user"
              placeholder="User Type"
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
            <p className="text-[20px] font-bold">HISTORY</p>
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
            <canvas id="graph-b"></canvas>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}

export default ReportsDashboard;
