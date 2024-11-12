import React, { useState } from "react";
import Header from "../../components/headers/Header";
import Input from "../../components/formElements/Input";
import Button from "../../components/buttons/Button";
import {
  minOfLength,
  RedirectTo,
  validateEmail,
} from "../../components/utilities/PageUtils";
import FileInput from "../../components/formElements/FileInput";
import { UserData } from "../../components/utilities/models/UserData";
import { RegisterOrganization } from "../../components/utilities/services/AuthenticationHandler";
import {
  API_LINKS,
  ApplicationConstants,
} from "../../contants/ApplicationConstants";
import { AccountRepository } from "../../components/utilities/services/repositories/AccountRepository";
import { UploadFile } from "../../components/utilities/media/UploadFileUtil";

function SignUpOrganizationPage() {
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [file, setFile] = useState(null);

  function showPasswordCallback() {
    setShowPassword(!showPassword);
  }

  async function SignUpSubmit() {
    if (file === null) {
      alert("Please add your attachment");
      return;
    }
    if (email === "") {
      alert("Email is required");
      return;
    }
    if (password === "") {
      alert("Password is required");
      return;
    }

    if (!validateEmail(email)) {
      alert("Invalid Email Format");
      return;
    }

    if (!minOfLength(password, 5)) {
      alert("Password Must be minimum of 5 characters");
      return;
    }

    if (!minOfLength(lastname, 2)) {
      alert("Lastname Must be minimum of 2 characters");
      return;
    }

    if (!minOfLength(firstname, 2)) {
      alert("Password Must be minimum of 2 characters");
      return;
    }

    if (!minOfLength(contactNumber, 8)) {
      alert("Contact Number Must be minimum of 8 characters");
      return;
    }

    if (!minOfLength(address, 10)) {
      alert("Address Must be minimum of 10 characters");
      return;
    }

    var userData = new UserData({
      lastName: lastname,
      firstName: firstname,
      email,
      password,
      contactNumber: contactNumber,
      address,
    });

    var result = await RegisterOrganization(userData);
    if (result) {
      // retrieve account
      const accRepo = new AccountRepository();
      const data = (await accRepo.GetAccounts()).filter(
        (a) => a.email === userData.email
      )[0];
      if (data) {
        // upload file
        await UploadFile(API_LINKS.MEDIA_UPLOAD, file, "org-" + data.id);
      }
      alert(result);
      RedirectTo(ApplicationConstants.ROUTE_LOGIN);
    }
  }

  return (
    <div>
      <Header />
      <div className="absolute left-[50%] translate-x-[-50%]">
        <div className="w-100">
          <div className="m-auto">
            <div className="my-2 justify-center text-center">
              <h1 className="text-[40px] font-bold">
                <span className="primary-1">Sign </span>
                <span className="brand-orange">Up</span>
              </h1>
            </div>

            <p className="text-[10px] mt-8">
              Please input your information correctly
            </p>

            <form>
              <div className="my-3">
                <Input
                  containerClassname={"w-[330px]"}
                  type="text"
                  placeholder={"Last Name"}
                  name="lastname"
                  value={lastname}
                  set={setLastname}
                />
              </div>
              <div className="my-3">
                <Input
                  containerClassname={"w-[330px]"}
                  type="text"
                  placeholder={"First Name"}
                  name="firstname"
                  value={firstname}
                  set={setFirstname}
                />
              </div>
              <div className="my-3">
                <Input
                  containerClassname={"w-[330px]"}
                  type="email"
                  placeholder={"Email"}
                  name="email"
                  value={email}
                  set={setEmail}
                  autoComplete={"username"}
                />
              </div>
              <div className="my-3">
                <Input
                  containerClassname={"w-[330px]"}
                  type={showPassword ? "text" : "password"}
                  placeholder={"Password"}
                  name="password"
                  iconClicked={showPasswordCallback}
                  set={setPassword}
                  value={password}
                  icon={"fa-solid fa-eye"}
                  autoComplete={"current-password"}
                />
              </div>
              <div className="my-3">
                <Input
                  containerClassname={"w-[330px]"}
                  type="number"
                  placeholder={"Contact Number"}
                  name="contactnum"
                  value={contactNumber}
                  set={setContactNumber}
                />
              </div>
              <div className="my-3">
                <Input
                  containerClassname={"w-[330px]"}
                  type="text"
                  placeholder={"Address"}
                  name="address"
                  value={address}
                  set={setAddress}
                />
              </div>
              <div className="my-3">
                <FileInput
                  containerClassname={"w-[330px]"}
                  placeholder={"Attach your Certificate of Accreditation"}
                  set={setFile}
                />
              </div>
            </form>

            <div className="text-center mt-8">
              <Button className={"w-[150px] my-2"} onClick={SignUpSubmit}>
                Sign Up
              </Button>
              <p className="primary-1">
                Already have an account?{" "}
                <a
                  className="brand-orange cursor-pointer"
                  onClick={() => RedirectTo("login")}
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpOrganizationPage;
