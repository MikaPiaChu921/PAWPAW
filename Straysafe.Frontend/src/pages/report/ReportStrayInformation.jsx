import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RedirectTo } from "../../components/utilities/PageUtils";
import { PetData } from "../../components/utilities/models/PetData";
import MobileView from "../../components/containers/MobileView";
import PageContainer from "../../components/containers/PageContainer";
import Header from "../../components/headers/Header";
import {
  DeleteReport,
  RetrieveSingleReport,
} from "../../components/utilities/services/DataHandler";
import {
  API_LINKS,
  ApplicationConstants,
} from "../../contants/ApplicationConstants";
import Button from "../../components/buttons/Button";

function ChangeColor(value) {
  if (!value) return;
  if (value.toLowerCase() === "unlocated") return "text-red-600";
  if (value.toLowerCase() === "rescued") return "text-blue-600";
  if (value.toLowerCase() === "posted") return "text-orange-600";
  return "text-green-600";
}

function ReportStrayInformation() {
  const parameter = useParams();
  const [petData, setPetData] = useState({});

  if (!parameter.id) RedirectTo(ApplicationConstants.ROUTE_LANDING);

  useEffect(() => {
    async function RetrieveData() {
      const data = await RetrieveSingleReport(parameter.id);
      if (!data) RedirectTo(ApplicationConstants.ROUTE_LANDING);
      setPetData(data);
    }
    RetrieveData();
  }, [parameter]);

  const handleRemoveReport = async () => {
    const confirmation = confirm(
      "Are you sure you want to delete this report?"
    );

    if (!confirmation) return;

    const success = await DeleteReport(parameter.id);

    if (success) {
      alert("Report has been deleted");
      RedirectTo(ApplicationConstants.ROUTE_REPORT_STRAY_HISTORY);
    }
  };

  return (
    <div>
      <PageContainer className={"px-8"}>
        <Header />
        <div className="text-left">
          <h1 className="text-xl font-bold primary-1">
            <Button
              className="fa-solid fa-arrow-left w-[60px] text-black"
              onClick={() => {
                RedirectTo(ApplicationConstants.ROUTE_REPORT_STRAY_HISTORY);
              }}
              default
            />
            Report Stray <i className="fa-solid fa-bullhorn text-red-500"></i>
          </h1>
        </div>
        <MobileView className={"mb-8"}>
          <div className="relative mt-8">
            <div className="relative w-[90%] h-[300px] left-[50%] translate-x-[-50%] p-8 border-dashed border-primary-1 border-2 rounded-xl">
              <img
                className="w-full h-full object-cover rounded-xl"
                src={API_LINKS.MEDIA_DOWNLOAD(petData.id)}
              />
            </div>
          </div>

          <div className="w-[100%] mt-5">
            <div className="grid grid-cols-3 my-2">
              <div className="col-span-1 items-center flex w-full text-xs">
                <label className="text-right w-full pr-4 primary-1">
                  Name:
                </label>
              </div>
              <div className="col-span-2 text-center items-center flex w-full texsmt-">
                {petData.name}
              </div>
            </div>

            <div className="grid grid-cols-3 my-2">
              <div className="col-span-1 items-center flex w-full text-xs">
                <label className="text-right w-full pr-4 primary-1">
                  Animal Type:
                </label>
              </div>
              <div className="col-span-2 text-center items-center flex w-full text-sm">
                {petData.animalType}
              </div>
            </div>

            <div className="grid grid-cols-3 my-2">
              <div className="col-span-1 items-center flex w-full text-xs">
                <label className="text-right w-full pr-4 primary-1">
                  Gender:
                </label>
              </div>
              <div className="col-span-2 text-center items-center flex w-full text-sm">
                {petData.gender || "N/A"}
              </div>
            </div>

            <div className="grid grid-cols-3 my-2">
              <div className="col-span-1 items-center flex w-full text-xs">
                <label className="text-right w-full pr-4 primary-1">
                  Weight:
                </label>
              </div>
              <div className="col-span-2 text-center items-center flex w-full text-sm">
                {petData.weight > 0 ? petData.weight + " kg" : "N/A"}
              </div>
            </div>

            <div className="grid grid-cols-3 my-2">
              <div className="col-span-1 items-center flex w-full text-xs">
                <label className="text-right w-full pr-4 primary-1">
                  height:
                </label>
              </div>
              <div className="col-span-2 text-center items-center flex w-full text-sm">
                {petData.height > 0 ? petData.height + " in" : "N/A"}
              </div>
            </div>

            <div className="grid grid-cols-3 my-2">
              <div className="col-span-1 items-center flex w-full text-xs">
                <label className="text-right w-full pr-4 primary-1">
                  Report Type:
                </label>
              </div>
              <div className="col-span-2 text-center items-center flex w-full text-sm">
                {petData.reportType}
              </div>
            </div>

            <div className="grid grid-cols-3 my-2">
              <div className="col-span-1 items-center flex w-full text-xs">
                <label className="text-right w-full pr-4 primary-1">
                  Breed:
                </label>
              </div>
              <div className="col-span-2 text-center items-center flex w-full text-sm">
                {petData.breed || "N/A"}
              </div>
            </div>

            <div className="grid grid-cols-3 my-2">
              <div className="col-span-1 items-center flex w-full text-xs">
                <label className="text-right w-full pr-4 primary-1">
                  Address:
                </label>
              </div>
              <div className="col-span-2 text-center items-center flex w-full text-sm">
                {petData.address}
              </div>
            </div>

            <div className="grid grid-cols-3 my-2">
              <div className="col-span-1 items-center flex w-full text-xs">
                <label className="text-right w-full pr-4 primary-1">
                  Remarks:
                </label>
              </div>
              <div className="col-span-2 justify-center items-center flex w-full text-sm">
                {petData.remarks || "N/A"}
              </div>
            </div>

            <div className="grid grid-cols-3 my-2">
              <div className="col-span-1 items-center flex w-full text-xs">
                <label className="text-right w-full pr-4 primary-1">
                  Report Status:
                </label>
              </div>
              <div
                className={`col-span-2 text-left flex w-full text-sm ${ChangeColor(
                  petData.status
                )}`}
              >
                {petData.status}
              </div>
            </div>
            <div className="text-center py-2">
              <Button onClick={handleRemoveReport}>Remove Report</Button>
            </div>
          </div>
        </MobileView>
      </PageContainer>
    </div>
  );
}

export default ReportStrayInformation;
