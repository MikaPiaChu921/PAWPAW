import React, { useRef, useState } from "react";
import Header from "../../components/headers/Header";
import PageContainer from "../../components/containers/PageContainer";
import Button from "../../components/buttons/Button";
import { RedirectTo } from "../../components/utilities/PageUtils";
import {
  API_LINKS,
  ApplicationConstants,
} from "../../contants/ApplicationConstants";
import Input from "../../components/formElements/Input";
import { PetData } from "../../components/utilities/models/PetData";
import { GetProfileInformation } from "../../components/utilities/services/AuthenticationHandler";
import { SubmitReportStray } from "../../components/utilities/services/DataHandler";
import { UploadFile } from "../../components/utilities/media/UploadFileUtil";
import FileInput from "../../components/formElements/FileInput";

function AddPetProfile() {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [petName, setPetName] = useState("");
  const [animalType, setAnimalType] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [reportType, setReportType] = useState("");
  const [breed, setBreed] = useState("");
  const [address, setAddress] = useState("");
  const [remarks, setRemark] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload an image");
      return;
    }

    // get the reporter Id which is the user who reports
    let reporter = GetProfileInformation().id;

    // build object
    var petData = new PetData({
      name: petName,
      animalType,
      gender,
      weight,
      height,
      reportType: "Stray",
      breed,
      address,
      remarks,
      reporter,
      status: "Posted",
    });

    petData.organization = reporter;

    if (petName === "") {
      alert("Please provide a name for the animal for reference");
      return;
    }

    if (animalType === "") {
      alert("Please provide an animal type for reference");
      return;
    }
    if (address === "") {
      alert("Please provide an address for reference");
      return;
    }

    if (weight === "" || weight < 0) petData.weight = 0;
    if (height === "" || weight < 0) petData.height = 0;

    console.log(petData);

    const responseData = await SubmitReportStray(petData);
    if (responseData.success) {
      let fileName = responseData.id;
      await UploadFile(API_LINKS.MEDIA_UPLOAD, file, fileName);
      alert("Submitted");
      RedirectTo(ApplicationConstants.ROUTE_ADOPT_PET);
    }
  };

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
              <input
                className="hidden"
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef}
                accept="image/*"
              />
              <div
                className=""
                onClick={() => {
                  fileInputRef.current.click();
                }}
              >
                <div className="relative m-auto text-center">
                  <i className="fa-solid fa-folder text-[90px] primary-1"></i>
                  <p className="primary-1">
                    {(file && file.name) || "Upload or Capture"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="grid grid-cols-2 items-center m-1">
              <p className="flex justify-end mx-2 primary-1">Name:</p>
              <Input
                placeholder=""
                className="justify-start mx-2 w-[150px]"
                set={setPetName}
                value={petName}
              />
            </div>
            <div className="grid grid-cols-2 items-center m-1">
              <p className="flex justify-end mx-2 primary-1">Animal Type:</p>
              <Input
                placeholder="Dog | Cat"
                className="justify-start mx-2 w-[150px]"
                set={setAnimalType}
                value={animalType}
              />
            </div>
            <div className="grid grid-cols-2 items-center m-1">
              <p className="flex justify-end mx-2 primary-1">Gender:</p>
              <Input
                placeholder="Male | Female"
                className="justify-start mx-2 w-[150px]"
                set={setGender}
                value={gender}
              />
            </div>
            <div className="grid grid-cols-2 items-center m-1">
              <p className="flex justify-end mx-2 primary-1">Weight:</p>
              <Input
                placeholder="Weight in kg"
                className="justify-start mx-2 w-[150px]"
                type="number"
                set={setWeight}
                value={weight}
              />
            </div>
            <div className="grid grid-cols-2 items-center m-1">
              <p className="flex justify-end mx-2 primary-1">Height:</p>
              <Input
                placeholder="Height in inches"
                className="justify-start mx-2 w-[150px]"
                type="number"
                set={setHeight}
                value={height}
              />
            </div>
            <div className="grid grid-cols-2 items-center m-1">
              <p className="flex justify-end mx-2 primary-1">Breed:</p>
              <Input
                placeholder=""
                className="justify-start mx-2 w-[150px]"
                set={setBreed}
                value={breed}
              />
            </div>
            <div className="grid grid-cols-2 items-center m-1">
              <p className="flex justify-end mx-2 primary-1">Address:</p>
              <Input
                placeholder=""
                className="justify-start mx-2 w-[300px]"
                set={setAddress}
                value={address}
              />
            </div>
            <div className="grid grid-cols-2 items-center m-1">
              <p className="flex justify-end mx-2 primary-1">Remarks:</p>
              <Input
                placeholder="Say something about the animal..."
                className="justify-start mx-2 w-[300px]"
                set={setRemark}
                value={remarks}
              />
            </div>
            <div className="grid grid-cols-2 items-center m-1">
              <p className="flex justify-end mx-2 primary-1"></p>
              <div className="text-left mt-4 mx-4">
                <Button className="w-[150px]" onClick={handleSubmit}>
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}

export default AddPetProfile;
