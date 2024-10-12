import React, { useEffect, useState } from "react";
import Header from "../../components/headers/Header";
import PageContainer from "../../components/containers/PageContainer";
import Button from "../../components/buttons/Button";
import { RedirectTo } from "../../components/utilities/PageUtils";
import {
  API_LINKS,
  ApplicationConstants,
  AuthConstants,
} from "../../contants/ApplicationConstants";
import { PetData } from "../../components/utilities/models/PetData";
import { useParams } from "react-router-dom";
import { RetrieveSingleReport } from "../../components/utilities/services/DataHandler";
import { GetProfileInformation } from "../../components/utilities/services/AuthenticationHandler";

const ViewPetProfilePage = () => {
  const parameters = useParams();
  const [petData, setPetData] = useState(
    new PetData({
      name: "Ashley",
      animalType: "Cat",
      gender: "Female",
      weight: 3.2,
      height: 9.8,
      breed: "Sliced Bread",
      address: "Sapangdaku, Cebu City",
      remarks: "Dead",
    })
  );

  useEffect(() => {
    async function API_CALL() {
      const profileId = parameters.id;

      const petProfile = await RetrieveSingleReport(profileId);
      setPetData(petProfile);
    }

    API_CALL();
  }, [parameters]);
  return (
    <div>
      <Header />
      <PageContainer>
        <h1 className="text-[30px] primary-1 font-bold my-4">Adopt a Pet</h1>
        <div className="relative w-100 flex justify-start m-4">
          <div>
            <Button
              className="fa-solid fa-arrow-left w-[60px]"
              onClick={() => {
                RedirectTo(ApplicationConstants.ROUTE_ADOPT_PET);
              }}
              default
            />
          </div>
        </div>
        <div className="relative sm:w-[700px] left-[50%] translate-x-[-50%] bg-[#7adee9] rounded-[20px] p-10">
          {GetProfileInformation()?.role ===
            AuthConstants.ROLE_ORGANIZATION && (
            <div className="relative w-100 flex justify-end">
              <div>
                <Button
                  className="fa-solid fa-pen-to-square text-[25px] "
                  onClick={() => {
                    RedirectTo(ApplicationConstants.ROUTE_ADOPT_PET);
                  }}
                  default
                />
              </div>
            </div>
          )}
          <div className="overflow-hidden rounded-[35px]">
            <img
              className="w-full h-[300px] object-cover"
              src={API_LINKS.MEDIA_DOWNLOAD(petData.id)}
            />
          </div>
          <div className="text-center flex justify-center">
            <div className="grid grid-cols-2 w-[400px] gap-4">
              <p className="col-span-1 text-right">Name:</p>
              <p className="col-span-1 text-left">{petData.name}</p>
            </div>
          </div>
          <div className="text-center flex justify-center">
            <div className="grid grid-cols-2 w-[400px] gap-4">
              <p className="col-span-1 text-right">AnimalType:</p>
              <p className="col-span-1 text-left">{petData.animalType}</p>
            </div>
          </div>
          <div className="text-center flex justify-center">
            <div className="grid grid-cols-2 w-[400px] gap-4">
              <p className="col-span-1 text-right">Gender:</p>
              <p className="col-span-1 text-left">{petData.gender}</p>
            </div>
          </div>
          <div className="text-center flex justify-center">
            <div className="grid grid-cols-2 w-[400px] gap-4">
              <p className="col-span-1 text-right">Weight:</p>
              <p className="col-span-1 text-left">{petData.weight} kg</p>
            </div>
          </div>
          <div className="text-center flex justify-center">
            <div className="grid grid-cols-2 w-[400px] gap-4">
              <p className="col-span-1 text-right">Height:</p>
              <p className="col-span-1 text-left">{petData.height} in</p>
            </div>
          </div>
          <div className="text-center flex justify-center">
            <div className="grid grid-cols-2 w-[400px] gap-4">
              <p className="col-span-1 text-right">Breed:</p>
              <p className="col-span-1 text-left">{petData.breed}</p>
            </div>
          </div>
          <div className="text-center flex justify-center">
            <div className="grid grid-cols-2 w-[400px] gap-4">
              <p className="col-span-1 text-right">Remarks:</p>
              <p className="col-span-1 text-left">{petData.remarks}</p>
            </div>
          </div>

          {/* Chat with user for adoption */}
          {GetProfileInformation()?.role === AuthConstants.ROLE_STRAYVER && (
            <div className="w-full text-center my-8">
              <Button
                onClick={() => {
                  RedirectTo(
                    `${ApplicationConstants.ROUTE_CHAT_STRAYVER}?tp=Adoption: ${
                      petData.name
                    }&og=${petData.organization}&st=${
                      GetProfileInformation()?.id ?? "null"
                    }`
                  );
                }}
              >
                Message Organization
              </Button>
            </div>
          )}
        </div>
      </PageContainer>
    </div>
  );
};

export default ViewPetProfilePage;
