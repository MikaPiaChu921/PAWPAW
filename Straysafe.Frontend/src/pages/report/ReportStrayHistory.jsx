import React, { useEffect, useState } from "react";
import PageContainer from "../../components/containers/PageContainer";
import Header from "../../components/headers/Header";
import MobileView from "../../components/containers/MobileView";
import Button from "../../components/buttons/Button";
import { RedirectTo } from "../../components/utilities/PageUtils";
import { ApplicationConstants } from "../../contants/ApplicationConstants";
import ReportStrayCard from "../../components/containers/reports/ReportStrayCard";
import { RetrieveReports } from "../../components/utilities/services/DataHandler";
import { GetProfileInformation } from "../../components/utilities/services/AuthenticationHandler";

function ReportStrayHistory() {
  const [reportedPets, setReportedPets] = useState([]);

  useEffect(() => {
    async function API_CALL() {
      const data = await RetrieveReports(GetProfileInformation().id, "");
      setReportedPets(data);
    }

    API_CALL();
  }, []);

  return (
    <PageContainer>
      <Header />
      <MobileView className="px-8 mb-10">
        <div className="w-full text-right">
          <Button
            onClick={() => RedirectTo(ApplicationConstants.ROUTE_REPORT_STRAY)}
            className="bg-orange-500 text-white"
          >
            Report a Stray
          </Button>
        </div>
        <div className="text-left">
          <h1 className="text-xl font-bold primary-1">
            Reports History{" "}
            <i className="fa-solid fa-bullhorn text-red-500"></i>
          </h1>
        </div>
        <PageContainer className="py-5">
          {reportedPets.map((petData) => (
            <ReportStrayCard key={petData.id} petData={petData} />
          ))}
        </PageContainer>
      </MobileView>
    </PageContainer>
  );
}

export default ReportStrayHistory;
