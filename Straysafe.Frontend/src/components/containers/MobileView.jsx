import React from "react";

function MobileView({ children, className }) {
  return (
    <div
      className={`${className} block sm:hidden relative left-[50%] translate-x-[-50%]`}
    >
      {children}
    </div>
  );
}

export default MobileView;
