import React, { useState } from "react";

function SelectInput({
  className,
  placeholder,
  icon,
  iconClicked,
  containerClassname,
  options = [],
  selectedOption,
}) {
  const [val, setVal] = useState(placeholder);
  let defaultStyle = `${className} px-6 py-2 bg-white border shadow-sm border-[#1794A1] placeholder-[#1794A1] focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm`;

  return (
    <div className={`flex ${className}`}>
      <div className={`relative ${containerClassname}`}>
        {icon && (
          <div
            className={`justify-center top-[50%] translate-y-[-50%] left-2 absolute text-[#1794A1] ${
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
        <select
          className={defaultStyle}
          onChange={(e) => {
            if (selectedOption) selectedOption(e.target.value);
            setVal(e.target.value);
          }}
          value={val}
        >
          {placeholder && (
            <option value={placeholder} disabled>
              {placeholder}
            </option>
          )}
          {options.length > 0 &&
            options.map((o) => (
              <option key={Math.random() + `${o}`} value={o}>
                {o}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}

export default SelectInput;
