import React from "react";

function DateRange({ setFrom, setTo, className, inputClassname }) {
  return (
    <div className={`${className} w-fit`}>
      <div id="date-range-picker" className="flex items-center">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 primary-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <input
            id="datepicker-range-start"
            name="start"
            type="date"
            className={`${inputClassname} bg-gray-100 border primary-1 font-bold border-gray-300 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            placeholder="Select date start"
            onChange={(e) => {
              if (setFrom) setFrom(e.target.value);
            }}
          />
        </div>
        <span className="mx-4 primary-1 font-bold ">-</span>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 primary-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <input
            id="datepicker-range-end"
            name="end"
            type="date"
            className={`${inputClassname} bg-gray-100 border primary-1 font-bold border-gray-300 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            placeholder="Select date end"
            onChange={(e) => {
              if (setTo) setTo(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default DateRange;
