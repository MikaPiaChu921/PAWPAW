import React from "react";
import Header from "../../components/headers/Header";
import PageContainer from "../../components/containers/PageContainer";
import CardContainer from "../../components/containers/CardContainer";

function PetAdoptionPage() {
  return (
    <div>
      <Header />
      <PageContainer>
        <h1 className="text-[30px] primary-1 font-bold my-4">Adopt a Pet</h1>
        <CardContainer />
      </PageContainer>
    </div>
  );
}

export default PetAdoptionPage;
