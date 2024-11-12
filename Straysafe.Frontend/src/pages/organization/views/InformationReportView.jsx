import React, { useEffect } from "react";
import { RedirectTo } from "../../../components/utilities/PageUtils";
import {
  API_LINKS,
  ApplicationConstants,
} from "../../../contants/ApplicationConstants";
import PageContainer from "../../../components/containers/PageContainer";
import Button from "../../../components/buttons/Button";
import {
  DeleteReport,
  UpdateReportStray,
} from "../../../components/utilities/services/DataHandler";
import { GetProfileInformation } from "../../../components/utilities/services/AuthenticationHandler";
import { useSearchParams } from "react-router-dom";

function InformationReportView({ data }) {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (data === null || data === undefined)
      RedirectTo(ApplicationConstants.ROUTE_ORG_REPORTS);
  }, [data]);

  const getView = () => {
    var v = searchParams.get("v");

    if (v) return "?v=" + v;
    return "";
  };

  const handleUpdate = async (status) => {
    let confirmation =
      status.toLowerCase() !== "adopted"
        ? confirm(`Confirm change status to ${status}?`)
        : confirm(
            `Once adopted, status will no longer be changed, are you sure you want to confirm?`
          );
    if (!confirmation) return;
    var petData = data;
    petData.status = status;
    petData.organization = GetProfileInformation().id;

    await UpdateReportStray(petData);
    RedirectTo(ApplicationConstants.ROUTE_ORG_REPORTS + getView());
  };

  const handleRemoveReport = async () => {
    const confirmation = confirm(
      "Are you sure you want to delete this report?"
    );

    if (!confirmation) return;

    const success = await DeleteReport(data.id);

    if (success) {
      alert("Report has been deleted");
      RedirectTo(ApplicationConstants.ROUTE_ORG_REPORTS + getView());
    }
  };
  return (
    <PageContainer className="p-4 col-span-2">
      <h1 className="text-xl font-bold primary-1">
        <Button
          icon="fa-solid fa-arrow-left text-black"
          onClick={() =>
            RedirectTo(ApplicationConstants.ROUTE_ORG_REPORTS + getView())
          }
          default
        />
        View: Report Details
      </h1>

      <div className="my-8 flex w-full ">
        <div className="w-[50%] h-[400px]">
          <img
            className="w-full h-full object-cover"
            src={API_LINKS.MEDIA_DOWNLOAD(data.id)}
          />
        </div>
        <div className="w-[50%]">
          <div className="w-[100%] mt-5">
            <div className="grid grid-cols-3 my-2">
              <div className="col-span-1 items-center flex w-full text-xs">
                <label className="text-right w-full pr-4 primary-1">
                  Name:
                </label>
              </div>
              <div className="col-span-2 text-center items-center flex w-full texsmt-">
                {data.name}
              </div>
            </div>

            <div className="grid grid-cols-3 my-2">
              <div className="col-span-1 items-center flex w-full text-xs">
                <label className="text-right w-full pr-4 primary-1">
                  Animal Type:
                </label>
              </div>
              <div className="col-span-2 text-center items-center flex w-full text-sm">
                {data.animalType}
              </div>
            </div>

            <div className="grid grid-cols-3 my-2">
              <div className="col-span-1 items-center flex w-full text-xs">
                <label className="text-right w-full pr-4 primary-1">
                  Gender:
                </label>
              </div>
              <div className="col-span-2 text-center items-center flex w-full text-sm">
                {data.gender || "N/A"}
              </div>
            </div>

            <div className="grid grid-cols-3 my-2">
              <div className="col-span-1 items-center flex w-full text-xs">
                <label className="text-right w-full pr-4 primary-1">
                  Weight:
                </label>
              </div>
              <div className="col-span-2 text-center items-center flex w-full text-sm">
                {data.weight > 0 ? data.weight + " kg" : "N/A"}
              </div>
            </div>

            <div className="grid grid-cols-3 my-2">
              <div className="col-span-1 items-center flex w-full text-xs">
                <label className="text-right w-full pr-4 primary-1">
                  height:
                </label>
              </div>
              <div className="col-span-2 text-center items-center flex w-full text-sm">
                {data.height > 0 ? data.height + " in" : "N/A"}
              </div>
            </div>

            <div className="grid grid-cols-3 my-2">
              <div className="col-span-1 items-center flex w-full text-xs">
                <label className="text-right w-full pr-4 primary-1">
                  Report Type:
                </label>
              </div>
              <div className="col-span-2 text-center items-center flex w-full text-sm">
                {data.reportType}
              </div>
            </div>

            <div className="grid grid-cols-3 my-2">
              <div className="col-span-1 items-center flex w-full text-xs">
                <label className="text-right w-full pr-4 primary-1">
                  Breed:
                </label>
              </div>
              <div className="col-span-2 text-center items-center flex w-full text-sm">
                {data.breed || "N/A"}
              </div>
            </div>

            <div className="grid grid-cols-3 my-2">
              <div className="col-span-1 items-center flex w-full text-xs">
                <label className="text-right w-full pr-4 primary-1">
                  Address:
                </label>
              </div>
              <div className="col-span-2 text-center items-center flex w-full text-sm">
                {data.address}
              </div>
            </div>

            <div className="grid grid-cols-3 my-2">
              <div className="col-span-1 items-center flex w-full text-xs">
                <label className="text-right w-full pr-4 primary-1">
                  Remarks:
                </label>
              </div>
              <div className="col-span-2 justify-center items-center flex w-full text-sm">
                {data.remarks || "N/A"}
              </div>
            </div>

            <div className="grid grid-cols-3 my-2">
              <div className="col-span-1 items-center flex w-full text-xs">
                <label className="text-right w-full pr-4 primary-1">
                  Report Status:
                </label>
              </div>
              <div className="col-span-2 text-left flex w-full text-sm text-green-500">
                {data.status}
              </div>
            </div>

            <div className="grid grid-cols-3 my-2">
              <div className="col-span-1 items-center flex w-full text-xs">
                <label className="text-right w-full pr-4 primary-1">
                  Organization:
                </label>
              </div>
              <div className="col-span-2 text-left flex w-full text-sm text-yellow-500">
                {data.organizationDetails
                  ? `${data.organizationDetails.firstName} ${data.organizationDetails.lastName}`
                  : "N/A"}
              </div>
            </div>

            {data.status !== "Adopted" && (
              <>
                <div className="w-full px-8 mt-5">
                  <h1 className="primary-1 font-bold text-lg">Change Status</h1>
                </div>
                <div className="w-full px-8">
                  {data.status !== "Rescued" &&
                    data.status !== "Unlocated" &&
                    data.status !== "Posted" && (
                      <>
                        <Button
                          className="w-full my-2"
                          onClick={() => handleUpdate("Rescued")}
                        >
                          Rescued
                        </Button>
                        <Button
                          className="w-full my-2"
                          onClick={() => handleUpdate("Unlocated")}
                        >
                          Failed to Locate
                        </Button>
                      </>
                    )}
                  {data.status !== "Posted" &&
                    (data.status === "Rescued" ||
                      data.status === "Unlocated") && (
                      <>
                        <Button
                          className="w-full my-2"
                          onClick={() => handleUpdate("Posted")}
                        >
                          Post to Adoption
                        </Button>
                      </>
                    )}

                  {data.status === "Posted" && (
                    <Button
                      className="w-full my-2 bg-green-500"
                      onClick={() => handleUpdate("Adopted")}
                    >
                      Adopted
                    </Button>
                  )}
                </div>
              </>
            )}

            <div className="w-full px-8 mt-5">
              <h1 className="primary-1 font-bold text-lg">
                Other Action{" "}
                <i className="fa-solid fa-warning text-orange-500"></i>
              </h1>
              <div className="w-full px-8">
                <Button
                  className="w-full my-2 bg-red-500"
                  onClick={handleRemoveReport}
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default InformationReportView;
