import React, { useEffect, useState } from "react";
import Button from "../buttons/Button";
import { UserData } from "../utilities/models/UserData";
import {
  RetrieveSingleAccount,
  RetrieveSingleReport,
} from "../utilities/services/DataHandler";
import { AnnouncementData } from "../utilities/models/AnnouncementData";
import {
  API_LINKS,
  ApplicationConstants,
} from "../../contants/ApplicationConstants";
import { GetProfileInformation } from "../utilities/services/AuthenticationHandler";
import { RedirectTo } from "../utilities/PageUtils";

/**
 * @param {Object} param0
 * @param {Function} param0.showOrClose
 * @param {AnnouncementData} param0.announcementData
 */
function ViewAnnouncementModal({
  showOrClose,
  announcementData,
  refresh,
  disableChat,
  removeBlurBg,
}) {
  const [reporter, setReporter] = useState(
    new UserData({ uid: "", firstName: "---", lastName: "" })
  );
  const [allowChat, setAllowChat] = useState(true);
  const [hasVideo, setHasVideo] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await RetrieveSingleAccount(announcementData.postedBy);
      setReporter(data);
      try {
        const report = await RetrieveSingleReport(announcementData.attachment);
        if (report) {
          if (report.status.toLowerCase().includes("adopted"))
            setAllowChat(false);
        }
      } catch (e) {
        /**/
      }

      var hasFile = await (
        await fetch(API_LINKS.MEDIA_HAS(announcementData.attachment))
      ).json();
      if (hasFile.success) {
        if (hasFile.extensions.includes(".mp4")) {
          setHasVideo(true);
        }
      }
    })();
  }, [announcementData]);
  return (
    <div
      className={`absolute top-0 left-0 w-[100%] h-[100%] ${
        !removeBlurBg && "bg-[rgba(0,0,0,0.1)]"
      } z-[99999]`}
    >
      <div className="relative w-[350px] sm:w-[400px] h-auto left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-xl overflow-hidden">
        <div className="text-right">
          <Button
            icon={"fa-solid fa-xmark"}
            onClick={showOrClose}
            className="rounded-bl-xl rounded-br-none rounded-tl-none"
          />
        </div>
        <h1 className="text-lg primary-1 font-bold text-center">
          Announcement
        </h1>
        <div className="w-[320px] relative left-[50%] translate-x-[-50%] h-[350px] sm:h-[500px] overflow-y-auto mb-3">
          <p className="text-xl font-bold mt-2 text-center">
            {announcementData.title}
          </p>
          <p className="text-xs mt-2 text-center">
            Reported by:{" "}
            <a className="primary-1 font-bold">
              {reporter?.firstName} {reporter?.lastName}
            </a>
          </p>
          <p className="text-xs mt-2 text-center">
            {new Date(announcementData.date).toDateString()}
          </p>

          <p className="justify-center flex my-2">{announcementData.content}</p>
          <div className="w-full h-full overflow-hidden rounded-lg">
            {!hasVideo ? (
              <img
                className="h-full w-full object-cover"
                src={API_LINKS.MEDIA_DOWNLOAD(announcementData.attachment)}
              />
            ) : (
              <>
                <video width="320" height="240" controls>
                  <source
                    src={API_LINKS.MEDIA_DOWNLOAD(announcementData.attachment)}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </>
            )}
          </div>
        </div>
        {GetProfileInformation() &&
          GetProfileInformation().id !== announcementData.postedBy &&
          allowChat &&
          !disableChat && (
            <div className="text-center text-sm mb-3">
              <Button
                icon={"fa-solid fa-paper-plane"}
                onClick={() => {
                  RedirectTo(
                    `${
                      ApplicationConstants.ROUTE_CHAT_STRAYVER
                    }?tp=Announcement: ${announcementData.title}&og=${
                      announcementData.postedBy
                    }&st=${GetProfileInformation()?.id ?? "null"}`
                  );
                }}
              >
                Chat {reporter.firstName} {reporter.lastName}
              </Button>
            </div>
          )}
      </div>
    </div>
  );
}

export default ViewAnnouncementModal;
