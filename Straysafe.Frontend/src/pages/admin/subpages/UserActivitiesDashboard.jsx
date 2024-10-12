import React, { useEffect, useState } from "react";
import PageContainer from "../../../components/containers/PageContainer";
import DateRange from "../../../components/formElements/DateRange";
import SelectInput from "../../../components/formElements/SelectInput";
import Input from "../../../components/formElements/Input";
import CardContainer from "../../../components/containers/CardContainer";
import UserActivityCard from "../../../components/cards/UserActivityCard";

function UserActivitiesDashboard() {
  const [dateFrom, setDateFrom] = useState(undefined);
  const [dateTo, setDateTo] = useState(undefined);
  const [animalType, setAnimalType] = useState(undefined);

  useEffect(() => {
    console.log({ dateFrom, dateTo });
    console.log("Selected: " + animalType);
  }, [dateFrom, dateTo, animalType]);
  return (
    <div className="mb-4">
      <PageContainer>
        <div className="grid grid-cols-4 items-center my-8">
          <h3 className="col-span-1 text-[25px] primary-1 font-bold">
            User Activities
          </h3>
          <div />
          <div className="col-span-2">
            <Input
              containerClassname="w-max-[400px] w-min-[200px] w-[400px]"
              type="text"
              placeholder="Search for something..."
              icon={"fa-solid fa-magnifying-glass"}
              iconClicked={() => {
                alert("search");
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 mb-5">
          <DateRange
            className="col-span-1"
            inputClassname="w-[160px]"
            setFrom={setDateFrom}
            setTo={setDateTo}
          />
          <div className="grid grid-cols-3 col-span-1 gap-2">
            <SelectInput
              className="col-span-1"
              icon="fa-solid fa-paw"
              options={["Dog", "Cat"]}
              placeholder={"Animal Type"}
              selectedOption={setAnimalType}
            />
            <SelectInput
              className="col-span-1"
              icon="fa-solid fa-bullhorn"
              placeholder="Report Type"
            />
            <SelectInput
              className="col-span-1"
              icon="fa-solid fa-user"
              placeholder="User Type"
            />
          </div>
        </div>
        <CardContainer>
          <UserActivityCard
            cardImage="https://imgix.bustle.com/uploads/getty/2018/7/10/f1969dc5-bc9b-4b28-8268-7dc44e3815dd-getty-511712140.jpg?w=1200&h=630&fit=crop&crop=faces&fm=jpg"
            cardType="Stray"
            typeColor="bg-red-500"
            informationValue={[
              ["Posted by", "User 1"],
              ["Animal Type", "Dog"],
              ["Date Posted", "May 1, 2025 8:13am"],
            ]}
          />
          <UserActivityCard
            cardImage="https://th.bing.com/th/id/OIP.guY_RHVXOBIU2v_IMA3ABAHaEK?rs=1&pid=ImgDetMain"
            cardType="Adoption"
            typeColor="bg-green-500"
            informationValue={[
              ["Posted by", "MARO Organization"],
              ["Animal Type", "Dog"],
              ["Date Posted", "May 1, 2025 8:13am"],
            ]}
          />
          <UserActivityCard
            cardImage="https://th.bing.com/th/id/R.d50688743fab4e9d86d2bf01bc24fe86?rik=e52CfOJ8jQfwTQ&pid=ImgRaw&r=0"
            cardType="Lost"
            typeColor="bg-blue-500"
            informationValue={[
              ["Posted by", "User 2"],
              ["Animal Type", "Dog"],
              ["Date Posted", "May 1, 2025 8:13am"],
            ]}
          />
          <UserActivityCard
            cardImage="https://th.bing.com/th/id/R.cd10bd6edf5c1fa7e23d7f217430be3a?rik=Fw9iUgsGgVTT9Q&pid=ImgRaw&r=0"
            cardType="Stray"
            typeColor="bg-red-500"
            informationValue={[
              ["Posted by", "User 3"],
              ["Animal Type", "Dog"],
              ["Date Posted", "May 1, 2025 8:13am"],
            ]}
          />
        </CardContainer>
      </PageContainer>
    </div>
  );
}

export default UserActivitiesDashboard;
