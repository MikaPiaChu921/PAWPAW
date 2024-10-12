import React from "react";
import Header from "../components/headers/Header";
import { ApplicationConstants } from "../contants/ApplicationConstants";
import PageContainer from "../components/containers/PageContainer";
import {
  DisplayName,
  GetProfileInformation,
} from "../components/utilities/services/AuthenticationHandler";
import MobileView from "../components/containers/MobileView";
import Button from "../components/buttons/Button";
import { RedirectTo } from "../components/utilities/PageUtils";

function LandingPage() {
  return (
    <div>
      <Header />
      <PageContainer>
        {GetProfileInformation() && (
          <h1 className="text-[30px] primary-1 font-bold my-4 hidden sm:block">
            {DisplayName({ msg_before: "Welcome" })}
          </h1>
        )}
        <div className="m-auto justify-center flex">
          <img src={ApplicationConstants.LandingPageImage} />
        </div>
        <div>
          <h1 className="text-center primary-1 font-semibold text-[20px] sm:text-[30px]">
            From Stray to Stray: Open Your Heart, Open Your Home!
          </h1>
        </div>
        <MobileView className="px-8 mt-4 min-w-[380px] items-center" message="">
          <p className="italic justify-center">
            {ApplicationConstants.LANDING_PAGE_ABOUT_1}
          </p>
          <div className="w-100 relative mt-10">
            <img
              className="object-fill w-full h-full relative"
              src={ApplicationConstants.LandingPageImage_Adopt}
            />
            <div className="absolute top-0 text-white font-semibold">
              <p className="p-6 h-[130px] font-normal text-[14px]">
                {ApplicationConstants.LANDING_PAGE_ABOUT_2}
              </p>
              <div className="text-center">
                <Button
                  onClick={() => {
                    RedirectTo(ApplicationConstants.ROUTE_ADOPT_PET);
                  }}
                >
                  Adopt
                </Button>
              </div>
            </div>
          </div>
        </MobileView>
      </PageContainer>
    </div>
  );
}

export default LandingPage;
