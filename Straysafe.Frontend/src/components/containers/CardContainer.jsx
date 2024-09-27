import React from "react";
import AdoptPetCard from "../cards/AdoptPetCard";
import Button from "../buttons/Button";
import { RedirectTo } from "../utilities/PageUtils";
import { ApplicationConstants } from "../../contants/ApplicationConstants";

function CardContainer() {
  return (
    <div>
      <div className="relative w-100 flex justify-end m-4">
        <div>
          <Button
            className="fa-solid fa-plus w-[60px]"
            onClick={() => {
              RedirectTo(ApplicationConstants.ROUTE_ADD_PET_FOR_ADOPTION);
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        <AdoptPetCard
          onClick={() => {
            RedirectTo(ApplicationConstants.ROUTE_VIEW_PET_PROFILE("1"));
          }}
        />
        <AdoptPetCard
          onClick={() => {
            RedirectTo(ApplicationConstants.ROUTE_VIEW_PET_PROFILE("1"));
          }}
        />
        <AdoptPetCard
          onClick={() => {
            RedirectTo(ApplicationConstants.ROUTE_VIEW_PET_PROFILE("1"));
          }}
        />
        <AdoptPetCard
          onClick={() => {
            RedirectTo(ApplicationConstants.ROUTE_VIEW_PET_PROFILE("1"));
          }}
        />
      </div>
    </div>
  );
}

export default CardContainer;
