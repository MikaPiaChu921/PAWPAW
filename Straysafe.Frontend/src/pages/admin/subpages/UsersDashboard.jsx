import React, { useEffect, useState } from "react";
import Input from "../../../components/formElements/Input";
import PageContainer from "../../../components/containers/PageContainer";
import Button from "../../../components/buttons/Button";
import VerifyAccountModal from "../../../components/modals/VerifyAccountModal";
import TableView from "../../../components/containers/TableView";
import { AccountRepository } from "../../../components/utilities/services/repositories/AccountRepository";
import { AuthConstants } from "../../../contants/ApplicationConstants";

function UsersDashboard() {
  const [showVerifyAccountModal, setShowVerifyAccountModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const [unverifiedOrganizations, setUnverifiedOrganizations] = useState([]);

  useEffect(() => {
    RefreshRows();
  }, []);

  const showModal = () => {
    setShowVerifyAccountModal(!showVerifyAccountModal);
  };

  const RefreshRows = async () => {
    const accountRepo = new AccountRepository();
    const accounts = await accountRepo.GetAccounts();
    const dataRow = [];

    for (const account of accounts) {
      dataRow.push([
        account.role,
        account.firstName + " " + account.lastName,
        account.email,
        account.contactNumber,
        account.address,
      ]);
    }

    setUnverifiedOrganizations(
      accounts.filter(
        (u) => u.role === AuthConstants.ROLE_ORGANIZATION && u.locked
      )
    );

    setUserData(dataRow);
  };

  return (
    <div>
      <VerifyAccountModal
        showModal={showVerifyAccountModal}
        closeModal={showModal}
        unverifiedOrganizations={unverifiedOrganizations}
        refreshRows={RefreshRows}
      />
      <PageContainer
        className={`${
          showVerifyAccountModal && "blur-sm"
        }  transition-all duration-200 z-20`}
      >
        <div className="grid grid-cols-4 items-center my-8">
          <h3 className="col-span-1 text-[25px] primary-1 font-bold">Users</h3>
          <div />
          {/* <div className="col-span-2">
            <Input
              containerClassname="w-max-[400px] w-min-[200px] w-[400px]"
              type="text"
              placeholder="Search for something..."
              icon={"fa-solid fa-magnifying-glass"}
              iconClicked={() => {
                alert("search");
              }}
            />
          </div> */}
        </div>
        <div className="w-100 text-right">
          <Button className="text-sm" onClick={showModal}>
            Verify Accounts
          </Button>
        </div>
        <TableView
          TableHeader={[
            "User Type",
            "Name",
            "Email",
            "Contact Number",
            "Address",
          ]}
          TableRows={[...userData]}
          OnClickActions={null}
        />
      </PageContainer>
    </div>
  );
}

export default UsersDashboard;
