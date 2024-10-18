import React, { useEffect, useState } from "react";
import Header from "../components/headers/Header";
import PageContainer from "../components/containers/PageContainer";
import {
  API_LINKS,
  ApplicationConstants,
  AuthConstants,
} from "../contants/ApplicationConstants";
import Input from "../components/formElements/Input";
import TextArea from "../components/formElements/TextArea";
import SelectInput from "../components/formElements/SelectInput";
import Button from "../components/buttons/Button";
import Donation from "../components/utilities/models/Donation";
import { GetProfileInformation } from "../components/utilities/services/AuthenticationHandler";
import { SubmitDonation } from "../components/utilities/services/DataHandler";
import { AccountRepository } from "../components/utilities/services/repositories/AccountRepository";

function DonationPage() {
  const [amount, setAmount] = useState(0);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [remarks, setRemarks] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    (async () => {
      const accRepo = new AccountRepository();
      const data = await accRepo.GetAccounts();
      setOrganizations(
        data.filter((d) => d.role === AuthConstants.ROLE_ORGANIZATION)
      );
    })();
  }, []);

  const handleSumbit = async () => {
    if (amount <= 9) {
      alert("Minimum donation amount is ₱10");
      return;
    }
    if (referenceNumber === "") {
      alert("Reference # is required");
      return;
    }
    if (paymentMethod === "") {
      alert("Payment method is required");
      return;
    }

    const donation = new Donation();

    donation.amount = amount;
    donation.donorId = GetProfileInformation()?.id || "";
    donation.remarks = `Sent money via ${paymentMethod}|${referenceNumber}|${remarks}`;

    const res = await SubmitDonation(donation);
    if (res.success) {
      alert("Thank you for donating :)");
      setAmount(0);
      setReferenceNumber("");
      setRemarks("");
      setPaymentMethod("");
    }
  };
  return (
    <div>
      <Header />
      <PageContainer>
        <div className="relative w-[90%] sm:w-[50%] left-[50%] translate-x-[-50%] text-sm mb-8">
          <div className="w-full flex justify-center">
            <img
              className="h-64 w-64 object-cover"
              src={API_LINKS.MEDIA_DOWNLOAD(
                ApplicationConstants.DEFAULT_PROFILE
              )}
            />
          </div>
          <p className="text-center text-xs pb-2">
            By enhancing animal welfare and public health in Cebu City,{" "}
            <a className="font-bold">Straysafe</a> aims to create a
            community-driven platform for reporting, rescuing, and adopting
            stray animals. Through collaboration and innovative financial
            strategies, we strive for a sustainable solution to the stray animal
            crisis.
          </p>
          <p className="text-center text-xs py-2">
            In addition to monetary contributions, we are also accepting
            donations of pet food, toys, and accessories to help care for our
            beloved furry friends. Your generous gifts will directly support the
            well-being and happiness of the animals we serve.
          </p>
          <p className="text-center text-xs py-2">
            Every little bit helps! From food and treats to collars, leashes,
            and toys, your donation makes a world of difference.
          </p>

          <h2 className="text-md font-bold mt-8">
            Drop off or ship off donations at the following partnered
            organizations.
          </h2>
          <div className="mb-10">
            {organizations.map((d) => (
              <div key={d.id} className="border-b-[1px] border-black my-2">
                <p className="font-bold text-md primary-1">
                  {d.firstName} {d.lastName}
                </p>
                <p className="italic">{d.address}</p>
                <p className="">
                  <a className="text-blue-800" href={`mailto:${d.email}`}>
                    {d.email}
                  </a>{" "}
                  ({d.contactNumber})
                </p>
              </div>
            ))}
          </div>

          <h1 className="text-center font-bold primary-1 text-xl mt-8 mb-2">
            SCAN THE CODE TO DONATE
          </h1>
          <div className="w-full flex justify-center">
            <img
              className="h-64 w-64 object-cover"
              src={ApplicationConstants.DonationQr}
            />
          </div>
          <div className="text-center">
            <label>Enter amount</label>
            <div className="relative w-[30%] left-[50%] translate-x-[-50%] pb-4">
              <Input
                type="number"
                placeholder="Amount"
                containerClassname="w-full border-b-2 border-gray-300"
                className="border-none text-center font-bold"
                value={amount}
                set={setAmount}
              />
            </div>
          </div>

          <div className="text-left">
            <div className="relative w-[80%] left-[50%] translate-x-[-50%] pb-4">
              <label>Reference #</label>
              <Input
                type="text"
                placeholder="Reference Number (required)"
                containerClassname="w-full"
                value={referenceNumber}
                set={setReferenceNumber}
              />
            </div>
          </div>
          <div className="text-left">
            <div className="relative w-[80%] left-[50%] translate-x-[-50%] pb-4">
              <label>Remarks (optional)</label>
              <TextArea
                containerClassname="w-full"
                className={"w-full resize-none"}
                value={remarks}
                set={setRemarks}
              ></TextArea>
            </div>
          </div>
          <div className="text-left">
            <div className="relative w-[80%] left-[50%] translate-x-[-50%] pb-4">
              <label>Payment Method</label>
              <SelectInput
                placeholder={"Select Payment Method"}
                options={["GCash", "Maya", "Bank Transfer"]}
                containerClassname="w-full"
                className={"w-full"}
                selectedOption={setPaymentMethod}
              />
            </div>
          </div>

          <div className="text-center">
            <div className="relative w-[70%] left-[50%] translate-x-[-50%] pb-4">
              <Button onClick={handleSumbit}>Confirm Donation</Button>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}

export default DonationPage;
