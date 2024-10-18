import React from "react";
import { PetData } from "../../utilities/models/PetData";
import Button from "../../buttons/Button";
import { API_LINKS } from "../../../contants/ApplicationConstants";

/**
 * @param {any} param0
 * @param {PetData} param0.reportData
 */
function ViewReportDetailModal({ reportData, set }) {
  return (
    <div className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] w-full h-full z-[999]">
      <div className="absolute w-[500px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray-100 rounded-xl shadow-xl">
        <div className="text-right">
          <Button
            icon={"fa-solid fa-xmark"}
            onClick={() => {
              set(undefined);
            }}
            className="rounded-bl-xl rounded-br-none rounded-tl-none"
          />
        </div>
        <div className="p-4 pt-2">
          <h2 className="text-center text-2xl font-bold primary-1 mb-2">
            {reportData.name} | {reportData.animalType}
          </h2>
          <div className="w-100 h-[300px] text-center overflow-hidden rounded-xl">
            <img
              className="w-full h-[300px] object-cover"
              src={API_LINKS.MEDIA_DOWNLOAD(reportData.id)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 text-md px-9 mt-2">
            <p className="text-left">Posted by</p>
            <p className="font-bold">
              {reportData.reporter.firstName} {reportData.reporter.lastName}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-md px-9">
            <p className="text-left">Organization</p>
            <div className="font-bold">
              {reportData.organization ? (
                <p>
                  {reportData.organization?.firstName}{" "}
                  {reportData.organization?.lastName}
                </p>
              ) : (
                <p>-</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-md px-9 mt-2">
            <p className="text-left">Report Type</p>
            <p className="font-bold">{reportData.reportType}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-md px-9 mt-2">
            <p className="text-left">Status</p>
            <p className="font-bold">{reportData.status}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-md px-9 mt-2">
            <p className="text-left">Report Date</p>
            <p className="font-bold">
              {new Date(reportData.reportDate).toDateString()}
              <br />
              {new Date(reportData.reportDate).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewReportDetailModal;
