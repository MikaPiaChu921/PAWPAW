import React, { useCallback, useEffect, useState } from "react";
import PageContainer from "../../../components/containers/PageContainer";
import DateRange from "../../../components/formElements/DateRange";
import SelectInput from "../../../components/formElements/SelectInput";
import Input from "../../../components/formElements/Input";
import CardContainer from "../../../components/containers/CardContainer";
import UserActivityCard from "../../../components/cards/UserActivityCard";
import { RetrieveReports } from "../../../components/utilities/services/DataHandler";
import { API_LINKS } from "../../../contants/ApplicationConstants";
import { AccountRepository } from "../../../components/utilities/services/repositories/AccountRepository";
import ViewReportDetailModal from "../../../components/modals/admin/ViewReportDetailModal";

function CheckDateBetween(
  from = new Date(),
  to = new Date(),
  current = new Date()
) {
  return current >= from && current <= to;
}

function CreateDateTo() {
  let currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 24);
  return new Date(currentDate);
}

function GetTypeColor(type) {
  if (type.toLowerCase().includes("stray")) return "bg-red-500";
  if (type.toLowerCase().includes("posted")) return "bg-green-500";
  if (type.toLowerCase().includes("lost")) return "bg-blue-500";
  if (type.toLowerCase().includes("found")) return "bg-yellow-500";
}
function UserActivitiesDashboard() {
  const [dateFrom, setDateFrom] = useState(undefined);
  const [dateTo, setDateTo] = useState(undefined);
  const [animalType, setAnimalType] = useState(undefined);
  const [reportType, setReportType] = useState(undefined);
  const [reports, setReports] = useState([]);
  const [modalData, setModalData] = useState(undefined);

  const refreshFn = useCallback(async () => {
    let data = await RetrieveReports();

    if (animalType && animalType !== "All") {
      data = data.filter(
        (d) => d.animalType.toLowerCase() === animalType.toLowerCase()
      );
    }

    if (reportType && reportType !== "All") {
      data = data.filter(
        (d) => d.reportType.toLowerCase() === reportType.toLowerCase()
      );
    }

    if (dateFrom || dateTo) {
      let df = new Date(dateFrom ?? new Date());
      let dt = new Date(dateTo ?? CreateDateTo());

      data = data.filter((d) =>
        CheckDateBetween(df.toISOString(), dt.toISOString(), d.reportDate)
      );
    }

    // add userdata to report
    let accRepo = new AccountRepository();
    const users = await accRepo.GetAccounts();

    for (let rep of data) {
      rep.reporter = users.filter((a) => a.id === rep.reporter)[0];

      if (rep.organization) {
        rep.organization = users.filter((a) => a.id === rep.organization)[0];
      }
    }

    setReports(data);
  }, [dateFrom, dateTo, animalType, reportType]);

  useEffect(() => {
    refreshFn();
  }, [refreshFn]);

  return (
    <>
      {modalData && (
        <ViewReportDetailModal
          reportData={modalData}
          set={setModalData}
          refresh={refreshFn}
        />
      )}
      <div className="mb-4">
        <PageContainer>
          <div className="grid grid-cols-4 items-center my-8">
            <h3 className="col-span-1 text-[25px] primary-1 font-bold">
              User Activities
            </h3>
            <div />
          </div>
          <div className="grid grid-cols-2 mb-5">
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
                options={["Dog", "Cat", "All"]}
                placeholder={"Animal Type"}
                selectedOption={setAnimalType}
              />
              <SelectInput
                className="col-span-1"
                icon="fa-solid fa-bullhorn"
                placeholder="Report Type"
                options={["Stray", "Lost", "Found", "All"]}
                selectedOption={setReportType}
              />
            </div>
          </div>
          <div className="h-[80vh] overflow-y-auto">
            <CardContainer>
              {reports.map((report) => (
                <UserActivityCard
                  key={report.id}
                  cardImage={API_LINKS.MEDIA_DOWNLOAD(report.id)}
                  cardType={report.reportType}
                  typeColor={GetTypeColor(report.reportType)}
                  informationValue={[
                    [
                      "Reported By",
                      `${report.reporter.firstName} ${report.reporter.lastName}`,
                    ],
                    ["Animal Type", report.animalType],
                    ["Date Posted", new Date(report.reportDate).toDateString()],
                    ["Status", report.status],
                  ]}
                  onClick={() => {
                    setModalData(report);
                  }}
                />
              ))}
            </CardContainer>
          </div>
        </PageContainer>
      </div>
    </>
  );
}

export default UserActivitiesDashboard;
