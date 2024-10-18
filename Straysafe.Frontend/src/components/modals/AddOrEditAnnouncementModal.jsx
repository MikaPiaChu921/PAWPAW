import React, { useState } from "react";
import { AnnouncementData } from "../utilities/models/AnnouncementData";
import Button from "../buttons/Button";
import Input from "../formElements/Input";
import FileInput from "../formElements/FileInput";
import TextArea from "../formElements/TextArea";
import { GetProfileInformation } from "../utilities/services/AuthenticationHandler";
import { UploadFile } from "../utilities/media/UploadFileUtil";
import { API_LINKS } from "../../contants/ApplicationConstants";
import {
  DeleteAnnouncement,
  PostAnnouncement,
  UpdateAnnouncement,
} from "../utilities/services/DataHandler";

/**
 * @param {Object} param0
 * @param {Function} param0.showOrClose
 * @param {AnnouncementData} param0.announcementData
 */
function AddOrEditAnnouncementModal({
  showOrClose,
  announcementData,
  refresh,
  removeBlurBg,
}) {
  const [title, setTitle] = useState(
    (announcementData && announcementData.title) || ""
  );
  const [content, setContent] = useState(
    (announcementData && announcementData.content) || ""
  );
  const [file, setFile] = useState(null);

  const handleSubmit = async (status) => {
    let reporterId = GetProfileInformation().id;
    const announcement = new AnnouncementData({
      title: title,
      content: content,
      postedBy: reporterId,
    });

    if (announcementData !== null) {
      announcement.id = announcementData.id;
      announcement.attachment = announcementData.attachment;
    }

    if (status === "Update") {
      if (file !== null) {
        await UploadFile(API_LINKS.MEDIA_UPLOAD, file, announcement.attachment);
      }
      await UpdateAnnouncement(announcement);
    } else {
      const attachmentId = await PostAnnouncement(announcement);
      if (file !== null && attachmentId) {
        await UploadFile(API_LINKS.MEDIA_UPLOAD, file, attachmentId);
      }
    }

    setTimeout(() => {
      refresh();
      showOrClose();
    }, 200);
  };

  const handleDelete = async () => {
    let approved = confirm("Are you sure you want to delete this post?");
    if (!approved) return;

    await DeleteAnnouncement(announcementData.id);

    setTimeout(() => {
      refresh();
      showOrClose();
    }, 200);
  };

  return (
    <div
      className={`absolute top-0 left-0 w-full h-screen ${
        !removeBlurBg && "bg-[rgba(0,0,0,0.1)]"
      } z-[99999]`}
    >
      <div className="relative w-[400px] h-auto left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-xl overflow-hidden">
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
        <div className="w-[350px] relative left-[50%] translate-x-[-50%]">
          <label className="text-sm font-bold mt-2">Title</label>
          <Input
            placeholder="Title"
            containerClassname={"w-[350px]"}
            set={setTitle}
            value={title}
          />
          <label className="text-sm font-bold mt-2">Content</label>
          <TextArea
            placeholder="Content"
            containerClassname={"resize-none w-[350px] h-[100px]"}
            className={"resize-none"}
            set={setContent}
            value={content}
          />
          <label className="text-sm font-bold mt-2">
            {announcementData ? "Update" : "Upload"} Image
          </label>
          <FileInput
            set={setFile}
            placeholder={"Image"}
            containerClassname={"mb-4"}
          />
          <div className="text-center mb-4 flex items-center justify-center gap-2">
            <Button
              onClick={() => handleSubmit(announcementData ? "Update" : "Post")}
              className="w-[100px]"
            >
              {announcementData ? "Update" : "Post"}
            </Button>
            {announcementData && (
              <Button onClick={handleDelete} className="bg-red-500 w-[100px]">
                Delete
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddOrEditAnnouncementModal;
