import React from "react";
import Header from "../../components/headers/Header";
import PageContainer from "../../components/containers/PageContainer";
import Button from "../../components/buttons/Button";
import { RedirectTo } from "../../components/utilities/PageUtils";
import { ApplicationConstants } from "../../contants/ApplicationConstants";
import Input from "../../components/formElements/Input";

function AddPetProfile() {
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
        <div className="relative grid grid-cols-2 gap-4 w-[900px] left-[50%] translate-x-[-50%]">
          <div className="flex justify-center">
            <div className="relative w-[300px] h-[300px] border-2 border-dashed border-[#1794A1] rounded-2xl flex justify-center items-center">
              <div className="">
                <div className="relative m-auto text-center">
                  <i className="fa-solid fa-folder text-[90px] primary-1"></i>
                  <p className="primary-1">Upload or Capture</p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="grid grid-cols-2 items-center m-1">
              <p className="flex justify-end mx-2 primary-1">Name:</p>
              <Input placeholder="" className="justify-start mx-2 w-[150px]" />
            </div>
            <div className="grid grid-cols-2 items-center m-1">
              <p className="flex justify-end mx-2 primary-1">Animal Type:</p>
              <Input
                placeholder="Dog | Cat"
                className="justify-start mx-2 w-[150px]"
              />
            </div>
            <div className="grid grid-cols-2 items-center m-1">
              <p className="flex justify-end mx-2 primary-1">Gender:</p>
              <Input
                placeholder="Male | Female"
                className="justify-start mx-2 w-[150px]"
              />
            </div>
            <div className="grid grid-cols-2 items-center m-1">
              <p className="flex justify-end mx-2 primary-1">Weight:</p>
              <Input
                placeholder="Weight in kg"
                className="justify-start mx-2 w-[150px]"
              />
            </div>
            <div className="grid grid-cols-2 items-center m-1">
              <p className="flex justify-end mx-2 primary-1">Height:</p>
              <Input
                placeholder="Height in inches"
                className="justify-start mx-2 w-[150px]"
              />
            </div>
            <div className="grid grid-cols-2 items-center m-1">
              <p className="flex justify-end mx-2 primary-1">Breed:</p>
              <Input placeholder="" className="justify-start mx-2 w-[150px]" />
            </div>
            <div className="grid grid-cols-2 items-center m-1">
              <p className="flex justify-end mx-2 primary-1">Address:</p>
              <Input placeholder="" className="justify-start mx-2 w-[300px]" />
            </div>
            <div className="grid grid-cols-2 items-center m-1">
              <p className="flex justify-end mx-2 primary-1">Remarks:</p>
              <Input
                placeholder="Say something about the animal..."
                className="justify-start mx-2 w-[300px]"
              />
            </div>
            <div className="grid grid-cols-2 items-center m-1">
              <p className="flex justify-end mx-2 primary-1"></p>
              <div className="text-left mt-4 mx-4">
                <Button className="w-[150px]">Add</Button>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}

export default AddPetProfile;
