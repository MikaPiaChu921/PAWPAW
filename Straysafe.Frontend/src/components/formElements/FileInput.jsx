import React, { useRef, useState } from "react";

function FileInput({ className, containerClassname, set, placeholder }) {
  const [file, setFile] = useState();
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  let defaultStyle = `${className} px-3 py-2 bg-white border shadow-sm border-[#1794A1] placeholder-[#1794A1] focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm`;

  const handleFileChange = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFile(file);
      setFileName(file.name);
      set(file);
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  /*
    function handleSubmit(event) {
        event.preventDefault()
        const url = 'http://localhost:3000/uploadFile';
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        const config = {
        headers: {
            'content-type': 'multipart/form-data',
        },
        };
        axios.post(url, formData, config).then((response) => {
        console.log(response.data);
        });
    }
  */

  return (
    <div className={`flex ${className}`}>
      <div className={`relative ${containerClassname}`}>
        <input
          className="hidden"
          type="file"
          onChange={handleFileChange}
          ref={inputRef}
        />
        <div className={`${defaultStyle} cursor-pointer`} onClick={handleClick}>
          <div className="flex">
            <div className="flex">
              <p className="text-[20px] justify-center items-center">
                <i className="fa-solid fa-paperclip"></i>
              </p>
            </div>
            <div className="text-[12px] h-[20px] text-center ml-4">
              <p className="primary-1">{fileName || placeholder}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileInput;
