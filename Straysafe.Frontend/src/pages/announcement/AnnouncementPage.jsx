import React, { useEffect, useState } from "react";
import PageContainer from "../../components/containers/PageContainer";
import Header from "../../components/headers/Header";
import Button from "../../components/buttons/Button";
import AnnouncementCard from "../../components/cards/AnnouncementCard";
import AddOrEditAnnouncementModal from "../../components/modals/AddOrEditAnnouncementModal";
import { GetAllAnnouncements } from "../../components/utilities/services/DataHandler";
import ViewAnnouncementModal from "../../components/modals/ViewAnnouncementModal";
import { GetProfileInformation } from "../../components/utilities/services/AuthenticationHandler";
import { SaveLocalData } from "../../components/utilities/services/LocalDataHandler";

function AnnouncementPage() {
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

      if (announcements.length > 0) {
        SaveLocalData("latestAnnouncement", announcements[0].id);
      }
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
      {showModal && (
        <AddOrEditAnnouncementModal
          showOrClose={handleShowModal}
          announcementData={announcementData}
          refresh={refresh}
        />
      )}

      {showAnnouncementModal && (
        <ViewAnnouncementModal
          showOrClose={handleShowAnnouncementModal}
          announcementData={announcementData}
          refresh={refresh}
        />
      )}
      <PageContainer
        className={`${(showModal || showAnnouncementModal) && "blur-sm"}`}
      >
        <Header />
        <h1 className="text-[30px] primary-1 font-bold my-4">Announcements</h1>
        {GetProfileInformation() && (
          <div className="text-right w-100 hidden sm:block">
            <Button onClick={handleShowModal}>Add an Announcement</Button>
          </div>
        )}
        <div className="relative w-[95%] md:w-[80%] left-[50%] translate-x-[-50%] h-[70vh] my-8 overflow-y-auto">
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
        </div>
      </PageContainer>
    </>
  );
}

export default AnnouncementPage;
