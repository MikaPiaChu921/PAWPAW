import React, { useState } from "react";
import PageContainer from "../../components/containers/PageContainer";
import Header from "../../components/headers/Header";
import Button from "../../components/buttons/Button";
import StrayView from "./views/StrayView";
import InformationReportView from "./views/InformationReportView";
import FoundView from "./views/FoundView";
import LostView from "./views/LostView";
import PostedView from "./views/PostedView";

function View({ view, data, setView, setData }) {
  if (view === "stray")
    return <StrayView setView={setView} setData={setData} />;
  if (view === "info") return <InformationReportView data={data} />;
  if (view === "found")
    return <FoundView setView={setView} setData={setData} />;
  if (view === "lost") return <LostView setView={setView} setData={setData} />;
  if (view === "posted")
    return <PostedView setView={setView} setData={setData} />;
  return <></>;
}

function btnActive(name, view) {
  if (view === name)
    return "w-full text-white bg-primary-1 border-[1px] rounded-lg font-bold";
  return "w-full bg-white border-[#1794A1] border-[1px] rounded-lg font-bold";
}
function ReportsPage() {
  const [view, setView] = useState("stray");
  const [data, setData] = useState(null);

  return (
    <div>
      <PageContainer>
        <Header />
        <div className="grid grid-cols-3 h-[80vh]">
          <div className="border-r-2 border-gray-400 h-full col-span-1">
            <h1 className="text-left primary-1 text-[30px]">Reports</h1>
            <div className="w-[80%] text-center my-2">
              <Button
                className={btnActive("stray", view)}
                onClick={() => {
                  setView("stray");
                }}
                default
              >
                Stray Pets
              </Button>
            </div>
            <div className="w-[80%] text-center my-2 text-black">
              <Button
                className={btnActive("lost", view)}
                onClick={() => {
                  setView("lost");
                }}
                default
              >
                Lost Pets
              </Button>
            </div>
            <div className="w-[80%] text-center my-2 text-black">
              <Button
                className={btnActive("found", view)}
                onClick={() => {
                  setView("found");
                }}
                default
              >
                Found Pets
              </Button>
            </div>
            <div className="w-[80%] text-center my-2 text-black">
              <Button
                className={btnActive("posted", view)}
                onClick={() => {
                  setView("posted");
                }}
                default
              >
                Posted and Adopted Pets
              </Button>
            </div>
          </div>
          {/* Display view */}
          {View({ view, setView: setView, data, setData })}
        </div>
      </PageContainer>
    </div>
  );
}

export default ReportsPage;
