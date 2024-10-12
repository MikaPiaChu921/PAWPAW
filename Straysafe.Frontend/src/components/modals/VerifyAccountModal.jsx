import React, { useState } from "react";
import Button from "../buttons/Button";
import VerifyAccountCard from "../cards/VerifyAccountCard";
import { AccountRepository } from "../utilities/services/repositories/AccountRepository";

function VerifyAccountModal({
  showModal,
  closeModal,
  unverifiedOrganizations = [],
  refreshRows,
}) {
  const [showAction, setShowAction] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [actionData, setActionData] = useState(undefined);

  const triggerAction = (accept, data) => {
    if (accept) {
      setActionMessage("verify and create this organization account");
    } else {
      setActionMessage("decline this organization account");
    }

    setActionData({ data, accept });
    setShowAction(true);
  };
  const handleAction = async (accept) => {
    const organization = actionData.data;
    const createOrganization = actionData.accept;

    var repo = new AccountRepository();

    if (!createOrganization && accept) {
      await repo.DeleteAccount(organization.id);
    } else if (createOrganization && accept) {
      organization.locked = false;
      await repo.UpdateAccount(organization);
    }

    await refreshRows();

    setShowAction(false);
  };
  return (
    <>
      <div
        className={`${
          showAction
            ? "absolute top-0 left-0 w-full h-full transition-all duration-100 opacity-1 z-[101]"
            : "hidden"
        }`}
      >
        <div className="relative w-[40%] h-auto bg-white left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg shadow-md p-9">
          Are you sure you want to {actionMessage}?
          <div className="grid grid-cols-2 gap-2 w-[50%] m-auto mt-5">
            <Button
              onClick={() => {
                handleAction(true);
              }}
              className="bg-green-500"
            >
              Yes
            </Button>
            <Button
              onClick={() => {
                handleAction(false);
              }}
              className="bg-red-500"
            >
              No
            </Button>
          </div>
        </div>
      </div>
      <div
        className={`${
          showModal
            ? "absolute top-0 left-0 w-full h-full transition-all duration-100 opacity-1 z-[100]"
            : "opacity-0 top-10 z-[-1] hidden"
        }`}
      >
        <div className="relative w-[80%] h-auto bg-white left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg shadow-md">
          <div className="text-right">
            <Button
              icon="fa-solid fa-x text-sm"
              className="w-10 h-10"
              onClick={closeModal}
            />
          </div>
          <div className="relative p-4">
            <h2 className="text-lg font-bold primary-1">Verify Accounts</h2>
            <div className="my-2 px-2 h-[200px] overflow-y-scroll">
              {unverifiedOrganizations.map((ug, index) => (
                <VerifyAccountCard
                  key={ug.id}
                  orgName={ug.firstName + " " + ug.lastName}
                  address={ug.address}
                  email={ug.email}
                  contactNumber={ug.contactNumber}
                  acceptCallback={() => {
                    triggerAction(true, ug);
                  }}
                  declineCallback={() => {
                    triggerAction(false, ug);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VerifyAccountModal;
