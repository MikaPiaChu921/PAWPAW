import React from "react";

function MobileView({ children, className, message = "Mobile View Only" }) {
  return (
    <>
      <div
        className={`${className} block sm:hidden relative left-[50%] translate-x-[-50%]`}
      >
        {children}
      </div>
      <div className="hidden sm:block text-center my-2 px-8 primary-1 text-xl p-4 font-bold">
        <h1>{message}</h1>
      </div>
    </>
  );
}

export default MobileView;
