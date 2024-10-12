import React, { useState } from "react";

function TextArea({
  className,
  placeholder,
  name,
  children,
  containerClassname,
  value = "",
  set,
}) {
  const [val, setVal] = useState(value);
  let defaultStyle = `${className} px-3 py-2 bg-white border shadow-sm border-[#1794A1] placeholder-[#1794A1] focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full h-full rounded-md sm:text-sm`;

  return (
    <div className={`flex ${className}`}>
      {children && (
        <div className={`${className} mr-2`}>
          <p>{children}</p>
        </div>
      )}
      <div className={`relative ${containerClassname}`}>
        <textarea
          name={name ?? Math.random() + ""}
          className={defaultStyle}
          placeholder={placeholder}
          value={val}
          onInput={(e) => {
            if (set) set(e.target.value);
            setVal(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default TextArea;
