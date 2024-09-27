import React, { useState } from "react";
import Header from "../../components/headers/Header";
import { ApplicationConstants } from "../../contants/ApplicationConstants";
import Input from "../../components/formElements/Input";
import Button from "../../components/buttons/Button";
import { RedirectTo } from "../../components/utilities/PageUtils";
import { LoginAccount } from "../../components/utilities/services/AuthenticationHandler";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const showPasswordCallback = () => {
    setShowPassword(!showPassword);
  };

  const rememberMeCallback = () => {
    setRememberMe(!rememberMe);
  };

  const handleLogin = () => {
    LoginAccount({ username: email, password });
  };

  return (
    <div>
      <Header />
      <div className="absolute left-[50%] translate-x-[-50%] w-[280px]">
        <div className="w-100 ">
          <div className="flex justify-center">
            <img
              className="h-[250px]"
              src={ApplicationConstants.StraySafeLogo1}
            />
          </div>
          <div className="m-auto justify-center ">
            <div className="my-2">
              <Input
                containerClassname={"w-[280px]"}
                placeholder={"Email"}
                type="email"
                icon={"fa-solid fa-user"}
                value={email}
                set={setEmail}
              />
            </div>
            <div className="my-2">
              <Input
                containerClassname={"w-[280px]"}
                type={showPassword ? "text" : "password"}
                placeholder={"Password"}
                icon={"fa-solid fa-eye"}
                value={password}
                set={setPassword}
                iconClicked={showPasswordCallback}
              />
            </div>
          </div>
          <div className="relative my-2 grid grid-cols-2 w-[300px]">
            <div className="col-span-1">
              <Input
                type="checkbox"
                className={"brand-orange text-[13px] h-5"}
                placeholder={"forgot password"}
                checked={rememberMe}
                onClick={rememberMeCallback}
              >
                Remember me
              </Input>
            </div>
            <div className="col-span-1 brand-orange text-[13px] h-5 text-center">
              <a>Forgot Password?</a>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button className={"w-[150px] my-2"} onClick={handleLogin}>
              Sign In
            </Button>
            <p className="primary-1">
              Don&apos;t have an account?{" "}
              <a
                className="brand-orange cursor-pointer"
                onClick={() => RedirectTo(ApplicationConstants.ROUTE_SIGNUP_AS)}
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
