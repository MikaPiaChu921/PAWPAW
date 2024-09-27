import React from "react";

function DashboardReportCard({ title, value = 0 }) {
  return (
    <div className="relative col-span-1 w-[180px] p-6 shadow-md text-center items-center primary-1 rounded-2xl">
      <span className="text-[90px]">{value}</span>
      <p>{title}</p>
    </div>
  );
}

export default DashboardReportCard;
