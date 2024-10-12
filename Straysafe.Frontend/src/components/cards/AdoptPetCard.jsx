import React from "react";
import Button from "../buttons/Button";
import { API_LINKS } from "../../contants/ApplicationConstants";

function AdoptPetCard({ onClick, source }) {
  return (
    <div>
      <div className="w-[330px] bg-[#EEF0F3] rounded-[20px] flex justify-center m-auto mt-2">
        <div className="text-center">
          <div className="overflow-hidden rounded-[35px] border-2 border-black w-fit mt-[30px]">
            <img
              className="w-[200px] h-[200px] object-cover"
              src={API_LINKS.MEDIA_DOWNLOAD(source)}
            />
          </div>
          <Button className="mt-4 mb-8" onClick={onClick}>
            View Pet Profile
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AdoptPetCard;
