import React from "react";
import { ApplicationConstants } from "../../contants/ApplicationConstants";
import Button from "../buttons/Button";
import { RedirectTo } from "../utilities/PageUtils";
import {
  GetProfileInformation,
  LogoutAccount,
} from "../utilities/services/AuthenticationHandler";

function Header() {
  return (
    <div className="p-4 h-[80px] items-center">
      <div className="grid grid-cols-4">
        <div
          className="col-span-2 items-center text-center"
          onClick={() => RedirectTo(ApplicationConstants.ROUTE_LANDING)}
        >
          <img src={ApplicationConstants.StraySafeLogo2} />
        </div>
        <div className="flex col-span-2 justify-center">
          <div className="text-center w-auto font-bold hidden sm:block">
            <Button
              onClick={() => RedirectTo(ApplicationConstants.ROUTE_ADOPT_PET)}
              default
            >
              Adopt a Pet
            </Button>
          </div>
          <div className="text-center w-auto font-bold hidden sm:block">
            <Button default>Lost Pets</Button>
          </div>
          <div className="text-center w-auto font-bold hidden sm:block">
            <Button default>Found Pets</Button>
          </div>
          <div className="text-center w-auto mx-4">
            <Button>Donate</Button>
          </div>
          <div className="text-center w-auto">
            <Button icon="fa-solid fa-magnifying-glass" default></Button>
          </div>
          <div className="relative text-center w-auto hidden sm:block group">
            <Button
              icon="fa-solid fa-user"
              onClick={() => {
                if (!GetProfileInformation())
                  RedirectTo(ApplicationConstants.ROUTE_LOGIN);
              }}
              default
            ></Button>
            {GetProfileInformation() && (
              <div className="transition-all duration-500 opacity-0 hidden group-hover:block group-hover:opacity-100 translate-x-[-30%] w-[100px] h-fit top-8 absolute bg-slate-300 rounded-sm py-1 z-[999]">
                <Button className="m-1 text-[15px]">Profile</Button>
                <Button className="m-1 text-[15px]" onClick={LogoutAccount}>
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
