import React from "react";
import { AnnouncementData } from "../utilities/models/AnnouncementData";
import Button from "../buttons/Button";
import {
  API_LINKS,
  ApplicationConstants,
} from "../../contants/ApplicationConstants";
import { GetProfileInformation } from "../utilities/services/AuthenticationHandler";

/**
 *
 * @param {{AnnouncementData: AnnouncementData}} properties
 * @returns
 */
function AnnouncementCard({
  AnnouncementData = null,
  editable,
  actionCallback,
  onClick = () => {},
}) {
  return (
    <div className="relative w-100 bg-gray-100 rounded-xl p-4 shadow-sm my-2">
      <h1 className="font-bold text-lg block sm:hidden">
        {AnnouncementData && AnnouncementData.title}
      </h1>
      <div className="flex">
        <div
          className="w-[150px] h-[150px] rounded-xl overflow-hidden shadow-md"
          onClick={() => {
            onClick(AnnouncementData);
          }}
        >
          <img
            className="object-cover w-full h-full"
            src={
              (AnnouncementData &&
                API_LINKS.MEDIA_DOWNLOAD(AnnouncementData.attachment)) ||
              API_LINKS.MEDIA_DOWNLOAD(ApplicationConstants.DEFAULT_PROFILE)
            }
          />
        </div>
        <div
          className="w-[300px] md:w-[80%] p-2"
          onClick={() => {
            onClick(AnnouncementData);
          }}
        >
          <h1 className="font-bold text-lg hidden sm:block">
            {AnnouncementData && AnnouncementData.title}
          </h1>
          <div className="text-xs">
            <p>
              Date:{" "}
              {AnnouncementData &&
                new Date(AnnouncementData.date).toLocaleDateString()}
            </p>
            <p>
              Time:{" "}
              {AnnouncementData &&
                new Date(AnnouncementData.date).toLocaleTimeString()}
            </p>
          </div>
          <p className="h-[58px] text-sm overflow-y-hidden">
            {AnnouncementData && AnnouncementData.content}
          </p>
        </div>
        {editable && GetProfileInformation() && (
          <div className="col-span-1 text-center justify-center hidden sm:flex">
            <Button
              icon="fa-solid fa-gear"
              className="text-[30px]"
              onClick={() => {
                if (actionCallback) actionCallback(AnnouncementData);
              }}
              default
            ></Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnnouncementCard;
