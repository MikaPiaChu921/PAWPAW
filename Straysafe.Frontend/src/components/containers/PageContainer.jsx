import React from "react";

function PageContainer({ children, className }) {
  return (
    <div
      className={`w-100 sm:w-[90%] ${className} relative left-[50%] translate-x-[-50%]`}
    >
      {children}
    </div>
  );
}

export default PageContainer;
