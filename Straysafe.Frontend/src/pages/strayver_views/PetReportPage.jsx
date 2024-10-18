import React, { useEffect, useState } from "react";
import Header from "../../components/headers/Header";
import PageContainer from "../../components/containers/PageContainer";
import { useParams } from "react-router-dom";
import CardContainer from "../../components/containers/CardContainer";
import { RetrieveReports } from "../../components/utilities/services/DataHandler";
import AdoptPetCard from "../../components/cards/AdoptPetCard";
import { RedirectTo } from "../../components/utilities/PageUtils";
import { ApplicationConstants } from "../../contants/ApplicationConstants";

function PetReportPage() {
  const param = useParams()["type"];
  const [petsForAdoption, setPetsForAdoption] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const filterType = param.split("-")[0];
    setTitle(filterType.includes("found") ? "Found Pets" : "Lost Pets");
    async function API_CALL() {
      const data = await RetrieveReports();
      console.log(data);
      const filtered = data.filter(
        (d) =>
          d.reportType.toLowerCase() === filterType &&
          d.status.toLowerCase() !== "adopted"
      );
      setPetsForAdoption(filtered);
    }

    API_CALL();
  }, [param]);

  return (
    <div>
      <Header />
      <PageContainer>
        <h1 className="text-[30px] primary-1 font-bold my-4 px-4">{title}</h1>
        <CardContainer>
          {petsForAdoption.map((petData) => (
            <AdoptPetCard
              key={petData.id}
              source={petData.id}
              onClick={() => {
                RedirectTo(
                  ApplicationConstants.ROUTE_PET_REPORT_PAGE(param, petData.id)
                );
              }}
            />
          ))}
        </CardContainer>
      </PageContainer>
    </div>
  );
}

export default PetReportPage;
