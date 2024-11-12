import React, { useEffect, useRef, useState } from "react";
import Header from "../components/headers/Header";
import PageContainer from "../components/containers/PageContainer";
import {
  GetProfileInformation,
  LogoutAccount,
} from "../components/utilities/services/AuthenticationHandler";
import { RedirectTo } from "../components/utilities/PageUtils";
import {
  API_LINKS,
  ApplicationConstants,
} from "../contants/ApplicationConstants";
import Button from "../components/buttons/Button";
import { UploadFile } from "../components/utilities/media/UploadFileUtil";
import Input from "../components/formElements/Input";
import { RetrieveSingleAccount } from "../components/utilities/services/DataHandler";
import { AccountRepository } from "../components/utilities/services/repositories/AccountRepository";

function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const currentLoggedInUser = GetProfileInformation();
  const changeProfilePhotoRef = useRef(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (currentLoggedInUser && !loggedInUser) {
      (async () => {
        const user = await RetrieveSingleAccount(currentLoggedInUser.id);
        setLoggedInUser(user);

        setAddress(user.address);
        setContactNumber(user.contactNumber);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
      })();
    }
  }, [currentLoggedInUser, loggedInUser]);

  if (!currentLoggedInUser) RedirectTo(ApplicationConstants.ROUTE_LOGIN);

  const handleChangeProfilePhoto = async (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      await UploadFile(API_LINKS.MEDIA_UPLOAD, file, currentLoggedInUser.id);
      RedirectTo(ApplicationConstants.ROUTE_PROFILE);
    }
  };

  const handleUpdateProfile = (save) => {
    if (!save) return;

    if (
      loggedInUser.firstName !== firstName ||
      loggedInUser.lastName !== lastName ||
      loggedInUser.address !== address ||
      loggedInUser.contactNumber !== contactNumber ||
      loggedInUser.email !== email
    )
      setShowSaveModal(true);
  };

  const saveChanges = () => {
    loggedInUser.firstName = firstName;
    loggedInUser.lastName = lastName;
    loggedInUser.contactNumber = contactNumber;
    loggedInUser.address = address;
    loggedInUser.password = newPassword;
    loggedInUser.email = email;

    let accRepo = new AccountRepository();
    accRepo.UpdateAccount(loggedInUser);

    RedirectTo(ApplicationConstants.ROUTE_PROFILE);
  };

  const handleChangePassword = async () => {
    let accRepo = new AccountRepository();

    const loginResponse = await accRepo.Login(
      loggedInUser.email,
      currentPassword
    );

    if (!loginResponse.data) {
      alert(loginResponse.message);
      setCurrentPassword("");
      setNewPassword("");
      return;
    }

    if (newPassword.length < 5) {
      alert("New password must be at least 5 characters in length");
      return;
    }

    saveChanges();
  };

  return (
    <div>
      <Header />
      <div
        className={`absolute ${
          showSaveModal ? "top-0" : "top-[-200px]"
        }  w-[80%] left-[50%] translate-x-[-50%] bg-gray-100 z-[999] h-[100px] flex items-center justify-center rounded-bl-md border-br-md shadow-xl transition-all duration-300`}
      >
        <div>
          <p className="font-bold text-sm p-2">Do you want to save changes?</p>
          <div className="text-center">
            <Button className="bg-orange-500 mr-1" onClick={saveChanges}>
              Save Changes
            </Button>
            <Button
              className="bg-red-500"
              onClick={() => {
                setShowSaveModal(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
      <div
        className={`absolute ${
          showChangePasswordModal ? "top-0" : "top-[-600px]"
        }  w-[80%] left-[50%] translate-x-[-50%] bg-gray-100 z-[999] h-fit py-4 flex items-center justify-center rounded-bl-md border-br-md shadow-xl transition-all duration-300`}
      >
        <div>
          <p className="font-bold text-lg p-2 text-center">Change Password</p>
          <p className="text-xs p-2">Current Password</p>
          <form>
            <input
              className="hidden"
              type="text"
              autoComplete="username"
              hidden
            />
            <Input
              type="password"
              placeholder="Current Password"
              set={setCurrentPassword}
              value={currentPassword}
              autoComplete={"current-password"}
            />
            <p className="text-xs p-2">New Password</p>
            <Input
              type="password"
              placeholder="New Password"
              set={setNewPassword}
              value={newPassword}
              autoComplete={"new-password"}
            />
          </form>
          <div className="text-center mt-4">
            <Button
              className="bg-orange-500 mr-1"
              onClick={handleChangePassword}
            >
              Save Changes
            </Button>
            <Button
              className="bg-red-500"
              onClick={() => {
                setShowChangePasswordModal(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
      <PageContainer>
        <div className="relative w-[80%] left-[50%] translate-x-[-50%] text-center">
          <div className="text-right">
            <Button
              onClick={() => {
                setEditMode(!editMode);
                handleUpdateProfile(editMode);
              }}
              icon={"fa-solid fa-pencil"}
              default
            />
          </div>
          <div className="relative left-[50%] translate-x-[-50%] w-[200px] h-[200px]">
            <img
              className="w-[200px] h-[200px] object-cover rounded-full shadow-md"
              src={API_LINKS.MEDIA_DOWNLOAD(currentLoggedInUser.id, true)}
              onClick={() => {
                changeProfilePhotoRef.current.click();
              }}
            />
            <input
              ref={changeProfilePhotoRef}
              type="file"
              className="hidden"
              onChange={handleChangeProfilePhoto}
            />
          </div>
          <div className="relative left-[50%] translate-x-[-50%] w-[300px] border-2 bg-gray-200 rounded-lg grid grid-cols-9 p-1 mt-2">
            <div className="col-span-1">
              <i className="fa-solid fa-user text-gray-500"></i>
            </div>
            <div className="col-span-4">
              {editMode ? (
                <Input
                  containerClassname="text-sm h-full w-100"
                  className="h-[24px] w-full border-none text-center"
                  placeholder="Firstname"
                  set={setFirstName}
                  value={firstName}
                />
              ) : (
                <p>{loggedInUser?.firstName}</p>
              )}
            </div>
            <div className="col-span-4">
              {editMode ? (
                <Input
                  containerClassname="text-sm h-full w-100"
                  className="h-[24px] w-full border-none text-center"
                  placeholder="Lastname"
                  set={setLastName}
                  value={lastName}
                />
              ) : (
                <p>{loggedInUser?.lastName}</p>
              )}
            </div>
          </div>
          <div className="relative left-[50%] translate-x-[-50%] w-[300px] border-2 bg-gray-200 rounded-lg grid grid-cols-9 p-1 mt-2">
            <div className="col-span-1">
              <i className="fa-solid fa-map-pin text-gray-500"></i>
            </div>
            <div className="col-span-8">
              {editMode ? (
                <Input
                  containerClassname="relative left-[50%] translate-x-[-50%] text-sm h-full w-100"
                  className="h-[24px] w-full border-none text-center"
                  placeholder="Address"
                  set={setAddress}
                  value={address}
                />
              ) : (
                <p>{loggedInUser?.address}</p>
              )}
            </div>
          </div>
          <div className="relative left-[50%] translate-x-[-50%] w-[300px] border-2 bg-gray-200 rounded-lg grid grid-cols-9 p-1 mt-2">
            <div className="col-span-1">
              <i className="fa-solid fa-envelope text-gray-500"></i>
            </div>
            <div className="col-span-8">
              {editMode ? (
                <Input
                  containerClassname="relative left-[50%] translate-x-[-50%] text-sm h-full w-100"
                  className="h-[24px] w-full border-none text-center"
                  placeholder="Email Address"
                  set={setEmail}
                  value={email}
                />
              ) : (
                <p>{loggedInUser?.email}</p>
              )}
            </div>
          </div>

          <div className="relative left-[50%] translate-x-[-50%] w-[300px] border-2 bg-gray-200 rounded-lg grid grid-cols-9 p-1 mt-2">
            <div className="col-span-1">
              <i className="fa-solid fa-phone text-gray-500"></i>
            </div>
            <div className="col-span-8">
              {editMode ? (
                <Input
                  containerClassname="relative left-[50%] translate-x-[-50%] text-sm h-full w-100"
                  className="h-[24px] w-full border-none text-center"
                  placeholder="Contact Number"
                  set={setContactNumber}
                  value={contactNumber}
                />
              ) : (
                <p>{loggedInUser?.contactNumber}</p>
              )}
            </div>
          </div>

          <div className="relative left-[50%] translate-x-[-50%] w-[300px] border-2 bg-gray-200 rounded-lg grid grid-cols-9 p-1 mt-2">
            <div className="col-span-1 items-center">
              <i className="fa-solid fa-lock text-gray-500"></i>
            </div>
            <div className="col-span-8">
              <Button
                className="text-xs h-6 p-0 px-3 bg-orange-500"
                onClick={() => setShowChangePasswordModal(true)}
              >
                Change Password
              </Button>
            </div>
          </div>

          <Button className="my-4 text-sm px-4" onClick={LogoutAccount}>
            Logout
          </Button>
        </div>
      </PageContainer>
    </div>
  );
}

export default ProfilePage;
