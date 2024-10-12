import React, { useEffect, useState } from "react";
import Header from "../../components/headers/Header";
import PageContainer from "../../components/containers/PageContainer";
import CardContainer from "../../components/containers/CardContainer";
import AdoptPetCard from "../../components/cards/AdoptPetCard";
import { RedirectTo } from "../../components/utilities/PageUtils";
import {
  ApplicationConstants,
  AuthConstants,
} from "../../contants/ApplicationConstants";
import Button from "../../components/buttons/Button";
import { GetProfileInformation } from "../../components/utilities/services/AuthenticationHandler";
import { RetrieveReports } from "../../components/utilities/services/DataHandler";

function PetAdoptionPage() {
  const [petsForAdoption, setPetsForAdoption] = useState([]);

  useEffect(() => {
    async function API_CALL() {
      const data = await RetrieveReports();
      const filtered = data.filter((d) => d.status.toLowerCase() === "posted");
      setPetsForAdoption(filtered);
    }

    API_CALL();
  }, []);
  return (
    <div>
      <Header />
      <PageContainer>
        <h1 className="text-[30px] primary-1 font-bold my-4 px-4">
          Adopt a Pet
        </h1>
        <div className={`relative w-100 flex justify-end m-4`}>
          {GetProfileInformation()?.role ===
            AuthConstants.ROLE_ORGANIZATION && (
            <div>
              <Button
                className="fa-solid fa-plus w-[60px]"
                onClick={() => {
                  RedirectTo(ApplicationConstants.ROUTE_ADD_PET_FOR_ADOPTION);
                }}
              />
            </div>
          )}
        </div>
        <CardContainer>
          {petsForAdoption.map((petData) => (
            <AdoptPetCard
              key={petData.id}
              source={petData.id}
              onClick={() => {
                RedirectTo(
                  ApplicationConstants.ROUTE_VIEW_PET_PROFILE(petData.id)
                );
              }}
            />
          ))}
        </CardContainer>
      </PageContainer>
    </div>
  );
}

export default PetAdoptionPage;
