import React, { useEffect, useState } from "react";
import PageContainer from "../../../components/containers/PageContainer";
import Input from "../../../components/formElements/Input";
import Button from "../../../components/buttons/Button";
import AnnouncementCard from "../../../components/cards/AnnouncementCard";
import { AnnouncementData } from "../../../components/utilities/models/AnnouncementData";
import { GetAllAnnouncements } from "../../../components/utilities/services/DataHandler";

function AnnouncementsDashboard() {
  const [announcementData, setAnnouncementData] = useState([]);

  useEffect(() => {
    (async () => {
      const announcements = await GetAllAnnouncements();
      console.log(announcements);
      console.log("test");
    })();
  }, []);
  return (
    <div>
      <PageContainer>
        <div className="grid grid-cols-4 items-center my-8">
          <h3 className="col-span-1 text-[25px] primary-1 font-bold">
            Announcements
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
        <div className="text-right">
          <Button className="text-sm rounded-full">Add an Announcement</Button>
        </div>
        <PageContainer className="py-4">
          <AnnouncementCard
            AnnouncementData={
              new AnnouncementData({
                title: "🐾 Join Us for our annual adoption day! 🐾",
                imageSrc:
                  "https://i2.wp.com/www.smokeybarn.com/wp-content/uploads/2014/05/Pet-adoption-Day-slider.png",
                location: "Tabunok, Talisay City, Cebu, 6045",
                content:
                  "Come meet our furry friends looking for forever homes! Enjoy family-friendly activities, pet adtoption specials, and refreshments. Let's find perfect families!",
              })
            }
            editable
          />
          <AnnouncementCard
            AnnouncementData={
              new AnnouncementData({
                title: "🏠 Foster Home Recruitment Drive! 🏠",
                imageSrc:
                  "https://th.bing.com/th/id/OIP.Pf99TFitiJmF2_1C61W1bwHaEG?rs=1&pid=ImgDetMain",
                location: "Tabunok, Talisay City, Cebu, 6045",
                content:
                  "Help us save lives by becoming a foster parent for pets in need! Join us to learn about the fostering process and how you can make a difference.",
              })
            }
            editable
          />
        </PageContainer>
      </PageContainer>
    </div>
  );
}

export default AnnouncementsDashboard;
