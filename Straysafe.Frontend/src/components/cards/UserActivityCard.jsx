import React from "react";
import { ApplicationConstants } from "../../contants/ApplicationConstants";
import Button from "../buttons/Button";

function UserActivityCard({
  cardType = "",
  typeColor = "bg-orange-300",
  informationValue = [],
  cardImage = ApplicationConstants.UserActivityCardImg,
  onClick,
}) {
  return (
    <div className="relative w-auto h-auto bg-gray-200 px-4 pt-10 py-2 rounded-xl shadow-lg">
      <div
        className={`absolute ${typeColor}  h-[20px] w-[100px] top-3 rounded-l-xl right-0`}
      >
        <p className="text-center text-white">{cardType}</p>
      </div>
      <div className="rounded-xl w-100 h-[150px] shadow-lg overflow-hidden">
        <img className="object-cover md:h-[200px]" src={cardImage} />
      </div>
      {informationValue.map((info, index) => (
        <div
          key={`${index}${Math.random() * 9999}`}
          className="grid grid-cols-10 gap-2 text-center text-sm my-1"
        >
          <p className="text-left text-gray-500 col-span-4">{info[0]}:</p>
          <p className="text-left font-bold col-span-6">{info[1]}</p>
        </div>
      ))}
      <div className="text-center my-4">
        <Button className="text-xs" onClick={onClick}>
          View Report Details
        </Button>
      </div>
    </div>
  );
}

export default UserActivityCard;
