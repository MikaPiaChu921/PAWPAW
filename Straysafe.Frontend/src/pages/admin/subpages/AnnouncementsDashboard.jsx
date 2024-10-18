import React, { useEffect, useState } from "react";
import PageContainer from "../../../components/containers/PageContainer";
import Input from "../../../components/formElements/Input";
import Button from "../../../components/buttons/Button";
import AnnouncementCard from "../../../components/cards/AnnouncementCard";
import { AnnouncementData } from "../../../components/utilities/models/AnnouncementData";
import { GetAllAnnouncements } from "../../../components/utilities/services/DataHandler";
import AddOrEditAnnouncementModal from "../../../components/modals/AddOrEditAnnouncementModal";
import ViewAnnouncementModal from "../../../components/modals/ViewAnnouncementModal";

function AnnouncementsDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [announcementData, setAnnouncementData] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    (async () => {
      const announcements = await GetAllAnnouncements();
      setAnnouncements(announcements);
    })();
  };

  const handleShowModal = () => {
    setAnnouncementData(null);
    setShowModal(!showModal);
  };

  const handleShowAnnouncementModal = (data) => {
    setAnnouncementData(data);
    setShowAnnouncementModal(!showAnnouncementModal);
  };

  const handleEditAnnouncement = (a_data) => {
    setAnnouncementData(a_data);
    setShowModal(true);
  };
  return (
    <>
      <div className="absolute top-0 left-0 w-[100%] h-[100%]">
        {showModal && (
          <AddOrEditAnnouncementModal
            showOrClose={handleShowModal}
            announcementData={announcementData}
            refresh={refresh}
            removeBlurBg
          />
        )}

        {showAnnouncementModal && (
          <ViewAnnouncementModal
            showOrClose={handleShowAnnouncementModal}
            announcementData={announcementData}
            refresh={refresh}
            disableChat
            removeBlurBg
          />
        )}
      </div>
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
            <Button className="text-sm rounded-full" onClick={handleShowModal}>
              Add an Announcement
            </Button>
          </div>
          <PageContainer className="py-4">
            {announcements.map((announcement) => {
              return (
                <AnnouncementCard
                  AnnouncementData={announcement}
                  key={announcement.id}
                  actionCallback={handleEditAnnouncement}
                  onClick={handleShowAnnouncementModal}
                  editable
                />
              );
            })}
          </PageContainer>
        </PageContainer>
      </div>
    </>
  );
}

export default AnnouncementsDashboard;
