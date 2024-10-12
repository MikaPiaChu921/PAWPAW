import React from "react";

function Button({ className, icon, children, onClick, ...props }) {
  let btnStyle = "bg-[#1794A1] text-white font-bold p-2 rounded-[10px]";

  if (props.default) btnStyle = "p-2";
  return (
    <button
      className={`${btnStyle} ${className}`}
      onClick={() => onClick && onClick()}
    >
      {icon && (
        <>
          <i className={`${icon}`}></i>{" "}
        </>
      )}
      {children}
    </button>
  );
}

export default Button;
