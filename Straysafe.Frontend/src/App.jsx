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
              path={ApplicationConstants.ROUTE_VIEW_PET_PROFILE("*")}
              element={<ViewPetProfilePage />}
            />
            <Route
              path={ApplicationConstants.ROUTE_ADD_PET_FOR_ADOPTION}
              element={<AddPetProfile />}
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
