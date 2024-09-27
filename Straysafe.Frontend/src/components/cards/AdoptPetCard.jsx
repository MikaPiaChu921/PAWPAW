import React from "react";
import Button from "../buttons/Button";
import { ApplicationConstants } from "../../contants/ApplicationConstants";

function AdoptPetCard({ onClick }) {
  return (
    <div>
      <div className="w-[330px] bg-[#EEF0F3] rounded-[20px] flex justify-center m-auto mt-2">
        <div className="text-center">
          <div className="overflow-hidden rounded-[35px] border-2 border-black w-fit mt-[30px]">
            <img src={ApplicationConstants.SampleCardImg} />
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
