import React from "react";
import Button from "../buttons/Button";

function TableView({
  TableHeader = [],
  TableRows = [],
  OnClickActions = [],
  actionClassName = "",
  actionIcon = "fa-solid fa-gear",
  actionChildren = "",
  className = "w-100 my-8",
  rowClassName = "odd:bg-gray-100 even:bg-white",
  headerClassName = "",
}) {
  return (
    <div className={`${className}`}>
      <table className="w-full table-auto text-center">
        <thead>
          <tr className={headerClassName}>
            {TableHeader.map((headerColumn, index) => {
              return <th key={`${index}${Math.random()}`}>{headerColumn}</th>;
            })}
            {OnClickActions && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {TableRows.map((rowColumn, index) => {
            return (
              <tr key={index} className={rowClassName}>
                {rowColumn.map((rowData, index) => {
                  return <td key={`${index}${Math.random()}`}>{rowData}</td>;
                })}
                {OnClickActions && (
                  <td>
                    <Button
                      icon={actionIcon}
                      className={actionClassName}
                      default
                      onClick={() => {
                        if (OnClickActions[index]) OnClickActions[index]();
                      }}
                    >
                      {actionChildren}
                    </Button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TableView;
