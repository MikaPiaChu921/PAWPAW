import React from "react";
import { ApplicationConstants } from "../contants/ApplicationConstants";
import Header from "../components/headers/Header";
import Button from "../components/buttons/Button";
import { RedirectTo } from "../components/utilities/PageUtils";

function SignUpOptionPage() {
  return (
    <div>
      <Header />
      <div className="absolute left-[50%] translate-x-[-50%] w-[280px]">
        <div className="w-100 ">
          <div className="flex justify-center">
            <img
              className="h-[250px]"
              src={ApplicationConstants.StraySafeLogo1}
            />
          </div>

          <p className="brand-orange text-center mt-8">Sign up as:</p>
          <div className="text-center">
            <Button
              className={"w-[250px] my-2"}
              onClick={() => {
                RedirectTo(ApplicationConstants.ROUTE_SIGNUP_AS_STRAVER);
              }}
            >
              Straver
            </Button>
            <Button
              className={"w-[250px] my-2"}
              onClick={() => {
                RedirectTo(ApplicationConstants.ROUTE_SIGNUP_AS_ORGANIZATION);
              }}
            >
              Animal Shelter Organization
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpOptionPage;
