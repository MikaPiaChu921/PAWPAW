import React, { useState } from "react";

function Input({
  type = "text",
  className,
  placeholder,
  name,
  icon,
  set,
  value,
  iconClicked,
  children,
  onClick,
  checked,
  containerClassname,
  autoComplete,
}) {
  const [val, setVal] = useState(value);
  let defaultStyle = `${className} px-3 py-2 bg-white border shadow-sm border-[#1794A1] placeholder-[#1794A1] focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm`;

  return (
    <div className={`flex ${className}`}>
      {children && (
        <div className={`${className} mr-2`}>
          <p>{children}</p>
        </div>
      )}
      <div className={`relative ${containerClassname}`}>
        {type !== "checkbox" ? (
          <input
            type={type}
            name={name ?? Math.random() + ""}
            placeholder={placeholder}
            className={defaultStyle}
            value={value ?? val}
            onInput={(e) => {
              if (set) set(e.target.value);
              setVal(e.target.value);
            }}
            autoComplete={autoComplete}
          />
        ) : (
          <input
            type="checkbox"
            name={name ?? Math.random() + ""}
            className={defaultStyle}
            checked={checked}
            onClick={() => {
              if (onClick) onClick();
            }}
            onChange={() => {
              if (onClick) onClick();
            }}
          />
        )}
        {icon && (
          <div
            className={`justify-center top-[50%] translate-y-[-50%] right-2 absolute text-[#1794A1] ${
              iconClicked && "cursor-pointer"
            }`}
          >
            <i
              className={icon}
              onClick={(e) => {
                if (iconClicked) iconClicked();
              }}
            ></i>
          </div>
        )}
      </div>
    </div>
  );
}

export default Input;
