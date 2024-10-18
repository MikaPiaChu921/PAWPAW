import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/authentication/LoginPage";
import SignUpStraverPage from "./pages/authentication/SignUpStraverPage";
import { ApplicationConstants } from "./contants/ApplicationConstants";
import SignUpOrganizationPage from "./pages/authentication/SignUpOrganizationPage";
import SignUpOptionPage from "./pages/SignUpOptionPage";
import PetAdoptionPage from "./pages/adopt_pet/PetAdoptionPage";
import ViewPetProfilePage from "./pages/adopt_pet/ViewPetProfilePage";
import AddPetProfile from "./pages/adopt_pet/AddPetProfile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AnnouncementPage from "./pages/announcement/AnnouncementPage";
import ChatPage from "./pages/ChatPage";
import ReportsPage from "./pages/organization/ReportsPage";
import ReportStrayPage from "./pages/report/ReportStrayPage";
import ReportStrayHistory from "./pages/report/ReportStrayHistory";
import ReportStrayInformation from "./pages/report/ReportStrayInformation";
import StrayverChat from "./pages/StrayverChat";
import PetReportPage from "./pages/strayver_views/PetReportPage";
import DonationPage from "./pages/DonationPage";
import PetReportViewPetProfilePage from "./pages/strayver_views/PetReportViewPetProfilePage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={ApplicationConstants.ROUTE_LANDING}>
            <Route index element={<LandingPage />} />
            <Route
              path={ApplicationConstants.ROUTE_LOGIN}
              element={<LoginPage />}
            />
            <Route
              path={ApplicationConstants.ROUTE_SIGNUP_AS_STRAVER}
              element={<SignUpStraverPage />}
            />
            <Route
              path={ApplicationConstants.ROUTE_SIGNUP_AS_ORGANIZATION}
              element={<SignUpOrganizationPage />}
            />
            <Route
              path={ApplicationConstants.ROUTE_SIGNUP_AS}
              element={<SignUpOptionPage />}
            />
            <Route
              path={ApplicationConstants.ROUTE_ADOPT_PET}
              element={<PetAdoptionPage />}
            />
            <Route
              path={ApplicationConstants.ROUTE_VIEW_PET_PROFILE(":id")}
              element={<ViewPetProfilePage />}
            />
            <Route
              path={ApplicationConstants.ROUTE_ADD_PET_FOR_ADOPTION}
              element={<AddPetProfile />}
            />
            <Route
              path={ApplicationConstants.ROUTE_ADMIN_DASHBOARD}
              element={<AdminDashboard />}
            />
            <Route
              path={ApplicationConstants.ROUTE_ANNOUNCEMENT}
              element={<AnnouncementPage />}
            />
            <Route
              path={ApplicationConstants.ROUTE_CHAT}
              element={<ChatPage />}
            />
            <Route
              path={ApplicationConstants.ROUTE_CHAT_STRAYVER}
              element={<StrayverChat />}
            />
            <Route
              path={ApplicationConstants.ROUTE_ORG_REPORTS}
              element={<ReportsPage />}
            />
            <Route
              path={ApplicationConstants.ROUTE_REPORT_STRAY}
              element={<ReportStrayPage />}
            />
            <Route
              path={ApplicationConstants.ROUTE_REPORT_STRAY_HISTORY}
              element={<ReportStrayHistory />}
            />
            <Route
              path={ApplicationConstants.ROUTE_REPORT_STRAY + "/:id"}
              element={<ReportStrayInformation />}
            />
            <Route
              path={ApplicationConstants.ROUTE_PET_REPORT_PAGE(":type")}
              element={<PetReportPage />}
            />
            <Route
              path={ApplicationConstants.ROUTE_PET_REPORT_PAGE(
                ":type",
                ":value"
              )}
              element={<PetReportViewPetProfilePage />}
            />
            <Route
              path={ApplicationConstants.ROUTE_DONATION}
              element={<DonationPage />}
            />
            <Route
              path={ApplicationConstants.ROUTE_PROFILE}
              element={<ProfilePage />}
            />
            <Route
              path="*"
              element={
                <>
                  <p>Not found</p>
                </>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
