import React from "react";
import Button from "../buttons/Button";
import { API_LINKS } from "../../contants/ApplicationConstants";

function VerifyAccountCard({
  fileName = "fileName.ext",
  orgName = "",
  address = "",
  email = "",
  contactNumber = "",
  attachmentId,
  acceptCallback = () => {},
  declineCallback = () => {},
}) {
  return (
    <div className="relative w-full h-auto bg-gray-200 my-2">
      <div className="grid grid-cols-10 gap-5">
        <div
          className="block w-fit p-2 col-span-2 cursor-pointer"
          onClick={() => {
            location.href = API_LINKS.MEDIA_DOWNLOAD("org-" + attachmentId);
          }}
        >
          <div className="flex items-center w-fit">
            <i className="fa-solid fa-paperclip"></i>
            <p className="underline">{fileName}</p>
          </div>
          <div className="flex justify-center">
            <i className="fa-solid fa-image text-[40px]"></i>
          </div>
        </div>
        <div className="text-sm p-2 col-span-6">
          <p className="font-bold">{orgName}</p>
          <p>{address}</p>
          <p className="text-blue-600">{email}</p>
          <p className="text-blue-600">{contactNumber}</p>
        </div>
        <div className="flex w-fit p-2 col-span-2 justify-items-center">
          <div className="flex items-center w-fit gap-2 ">
            <Button
              icon="fa-solid fa-check"
              className="bg-green-500 w-10 h-10"
              onClick={acceptCallback}
            />
            <Button
              icon="fa-solid fa-xmark"
              className="bg-red-500 w-10 h-10"
              onClick={declineCallback}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyAccountCard;
