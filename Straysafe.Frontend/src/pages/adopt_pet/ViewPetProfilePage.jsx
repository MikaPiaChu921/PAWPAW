import React, { useState } from "react";
import Header from "../../components/headers/Header";
import PageContainer from "../../components/containers/PageContainer";
import Button from "../../components/buttons/Button";
import { RedirectTo } from "../../components/utilities/PageUtils";
import { ApplicationConstants } from "../../contants/ApplicationConstants";
import { PetData } from "../../components/utilities/models/PetData";

const ViewPetProfilePage = () => {
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
        <div className="relative w-[700px] left-[50%] translate-x-[-50%] bg-[#7adee9] rounded-[20px] p-10">
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
          <div className="overflow-hidden rounded-[35px]">
            <img src={ApplicationConstants.LandingPageImage} />
          </div>
          <div className="text-center flex justify-center">
            <div className="grid grid-cols-2 w-[400px] gap-4">
              <p className="col-span-1 text-right">Name:</p>
              <p className="col-span-1 text-left">{petData.Name}</p>
            </div>
          </div>
          <div className="text-center flex justify-center">
            <div className="grid grid-cols-2 w-[400px] gap-4">
              <p className="col-span-1 text-right">AnimalType:</p>
              <p className="col-span-1 text-left">{petData.AnimalType}</p>
            </div>
          </div>
          <div className="text-center flex justify-center">
            <div className="grid grid-cols-2 w-[400px] gap-4">
              <p className="col-span-1 text-right">Gender:</p>
              <p className="col-span-1 text-left">{petData.Gender}</p>
            </div>
          </div>
          <div className="text-center flex justify-center">
            <div className="grid grid-cols-2 w-[400px] gap-4">
              <p className="col-span-1 text-right">Weight:</p>
              <p className="col-span-1 text-left">{petData.Weight} kg</p>
            </div>
          </div>
          <div className="text-center flex justify-center">
            <div className="grid grid-cols-2 w-[400px] gap-4">
              <p className="col-span-1 text-right">Height:</p>
              <p className="col-span-1 text-left">{petData.Height} in</p>
            </div>
          </div>
          <div className="text-center flex justify-center">
            <div className="grid grid-cols-2 w-[400px] gap-4">
              <p className="col-span-1 text-right">Breed:</p>
              <p className="col-span-1 text-left">{petData.Breed}</p>
            </div>
          </div>
          <div className="text-center flex justify-center">
            <div className="grid grid-cols-2 w-[400px] gap-4">
              <p className="col-span-1 text-right">Remarks:</p>
              <p className="col-span-1 text-left">{petData.Remarks}</p>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default ViewPetProfilePage;
