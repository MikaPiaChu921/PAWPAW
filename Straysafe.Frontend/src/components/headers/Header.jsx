import React, { useState } from "react";
import {
  ApplicationConstants,
  AuthConstants,
} from "../../contants/ApplicationConstants";
import Button from "../buttons/Button";
import { RedirectTo } from "../utilities/PageUtils";
import {
  GetProfileInformation,
  LogoutAccount,
} from "../utilities/services/AuthenticationHandler";

function Header() {
  const loggedInAccount = GetProfileInformation();
  const [showCollapsibleNav, setShowNav] = useState(false);
  return (
    <>
      <div className="relative p-4 h-[80px] items-center">
        <div className="grid grid-cols-4 z-[109]">
          <div className="col-span-2 flex items-center text-center">
            <div className="relative w-[50px] items-center text-center mx-2 sm:hidden">
              <Button
                className="primary-1"
                icon={`fa-solid ${showCollapsibleNav ? "fa-xmark" : "fa-bars"}`}
                onClick={() => setShowNav(!showCollapsibleNav)}
                default
              />
            </div>
            <div
              className="items-center text-center h-auto w-auto"
              onClick={() => RedirectTo(ApplicationConstants.ROUTE_LANDING)}
            >
              <img src={ApplicationConstants.StraySafeLogo2} />
            </div>
          </div>
          <div className="flex col-span-2 justify-center">
            <div className="text-center w-auto font-bold hidden sm:block">
              <Button
                onClick={() => RedirectTo(ApplicationConstants.ROUTE_ADOPT_PET)}
                default
              >
                Adopt a Pet
              </Button>
            </div>
            {loggedInAccount &&
              loggedInAccount.role === AuthConstants.ROLE_ORGANIZATION && (
                <>
                  <div className="text-center w-auto font-bold hidden sm:block">
                    <Button
                      onClick={() =>
                        RedirectTo(ApplicationConstants.ROUTE_ANNOUNCEMENT)
                      }
                      default
                    >
                      Announcement
                    </Button>
                  </div>
                  <div className="text-center w-auto font-bold hidden sm:block">
                    <Button
                      onClick={() =>
                        RedirectTo(ApplicationConstants.ROUTE_CHAT)
                      }
                      default
                    >
                      Chats
                    </Button>
                  </div>
                  <div className="text-center w-auto font-bold hidden sm:block">
                    <Button
                      onClick={() =>
                        RedirectTo(ApplicationConstants.ROUTE_ORG_REPORTS)
                      }
                      default
                    >
                      Reports
                    </Button>
                  </div>
                </>
              )}
            {loggedInAccount?.role !== AuthConstants.ROLE_ORGANIZATION && (
              <>
                <div className="text-center w-auto font-bold hidden sm:block">
                  <Button default>Lost Pets</Button>
                </div>
                <div className="text-center w-auto font-bold hidden sm:block">
                  <Button default>Found Pets</Button>
                </div>
                <div className="text-center w-auto mx-4">
                  <Button>Donate</Button>
                </div>
              </>
            )}

            {/* 
            <div className="text-center w-auto">
              <Button icon="fa-solid fa-magnifying-glass" default></Button>
            </div> */}
            <div className="relative text-center w-auto hidden sm:block group">
              <Button
                icon="fa-solid fa-user"
                onClick={() => {
                  if (!GetProfileInformation())
                    RedirectTo(ApplicationConstants.ROUTE_LOGIN);
                }}
                default
              ></Button>
              {GetProfileInformation() && (
                <div className="transition-all duration-500 opacity-0 hidden group-hover:block group-hover:opacity-100 translate-x-[-30%] w-[100px] h-fit top-8 absolute bg-slate-300 rounded-sm py-1 z-[999]">
                  <Button
                    className="m-1 text-[15px]"
                    onClick={() =>
                      RedirectTo(ApplicationConstants.ROUTE_PROFILE)
                    }
                  >
                    Profile
                  </Button>
                  <Button className="m-1 text-[15px]" onClick={LogoutAccount}>
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`absolute w-[100%] p-4 ${
          showCollapsibleNav ? "top-[80px]" : "top-[-550px]"
        } z-[101] bg-white transition-all duration-500 sm:hidden`}
      >
        <div>
          <Button
            className="primary-1 font-bold text-lg border-b-2 w-[100%] text-left"
            onClick={() => {
              if (!GetProfileInformation())
                RedirectTo(ApplicationConstants.ROUTE_LOGIN);
              else RedirectTo(ApplicationConstants.ROUTE_PROFILE);
            }}
            default
          >
            {loggedInAccount
              ? `Hi, ${loggedInAccount.firstName} ${loggedInAccount.lastName}!`
              : "Login/Signup"}
          </Button>
        </div>
        {loggedInAccount?.role === AuthConstants.ROLE_STRAYVER && (
          <>
            <div>
              <Button
                className="text-lg border-b-2 w-[100%] text-left"
                onClick={() =>
                  RedirectTo(ApplicationConstants.ROUTE_REPORT_STRAY_HISTORY)
                }
                default
              >
                Report a stray
              </Button>
            </div>
            <div>
              <Button
                className="text-lg border-b-2 w-[100%] text-left"
                onClick={() => RedirectTo(ApplicationConstants.ROUTE_ADOPT_PET)}
                default
              >
                Adopt a Pet
              </Button>
            </div>
          </>
        )}

        <div>
          <Button className="text-lg border-b-2 w-[100%] text-left" default>
            Lost Pets
          </Button>
        </div>
        <div>
          <Button className="text-lg border-b-2 w-[100%] text-left" default>
            Found Pets
          </Button>
        </div>

        {loggedInAccount?.role === AuthConstants.ROLE_STRAYVER && (
          <>
            <div>
              <Button
                className="text-lg border-b-2 w-[100%] text-left"
                onClick={() =>
                  RedirectTo(ApplicationConstants.ROUTE_ANNOUNCEMENT)
                }
                default
              >
                Announcement
              </Button>
            </div>
            <div>
              <Button
                className="text-lg border-b-2 w-[100%] text-left"
                onClick={() =>
                  RedirectTo(
                    ApplicationConstants.ROUTE_CHAT_STRAYVER + "?sw=false"
                  )
                }
                default
              >
                Chat
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Header;
