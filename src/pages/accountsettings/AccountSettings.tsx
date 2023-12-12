import React, { useState } from "react";
import Navbar from "../../components/Navbar/Index";
import { useSelector } from "react-redux";

function AccountSettings() {
  const personalInfo = useSelector((state: any) => state.auth.personalInfo);
  const [address_district, setAddress_district] = useState();
  console.log(personalInfo);
  return (
    <React.Fragment>
      {/* <BannerContainer> */}
      <Navbar />

      <main className="h-full bg-main overflow-auto global-scrollbar rounded-lg ">
        <div className="container mx-auto px-28 py-8 flex flex-col justify-center w-2/3">
          <div className="mb-6 flex items-center justify-center ">
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold ">Update Profile</h1>
              <span className="text-gray-500">
                When provider have booking new, they open here
              </span>
            </div>
          </div>
          <div className="text-center">
            <div className="grid-cols-12 grid gap-2">
              <div className="col-span-3 text-end">
                <span className="font-medium">Company name</span>
              </div>
              <div className="col-span-9">
                <input className="w-full p-2 rounded-md shadow-custom-card-mui border border-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}

AccountSettings.propTypes = {};

export default AccountSettings;
