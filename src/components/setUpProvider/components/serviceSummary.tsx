import { UserServiceConfiguration } from "AppTypes";
import { Link } from "react-router-dom";
interface ServiceSummaryProps {
  userServiceConfiguration: UserServiceConfiguration;
}

export const ServiceSummary = ({
  userServiceConfiguration,
}: ServiceSummaryProps) => {
  const { selectedPlan, userInfo } = userServiceConfiguration;
  console.log(userInfo);

  return (
    <div className="mb-36">
      <h2 className="mb-3 font-medium text-xl">This is information of you</h2>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <span className="font-medium">Name company</span>
          <span>{userInfo?.nameCompany}</span>
        </div>

        <div className="flex flex-col">
          <span className="font-medium">Description company</span>
          <span>{userInfo?.mediaSocial}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium">Location</span>
          <span>
            {userInfo?.address_name}, {userInfo?.address_ward?.full_name},{" "}
            {userInfo?.address_district?.full_name},{" "}
            {userInfo?.address_province?.full_name}, {userInfo?.address_country}
            , {userInfo?.taxCode}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium">Registration number</span>
          {userInfo?.file?.map((file: { name: string }, index: number) => (
            <div key={index}>
              <span>{file?.name}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          <span className="font-medium">Service type</span>
          <span>{selectedPlan?.serviceType}</span>
        </div>
        <div className="p-1 flex relative w-96">
          <img
            src={
              userInfo?.banner?.url ||
              "https://i.pinimg.com/736x/fa/60/51/fa6051d72b821cb48a8cc71d3481dfef.jpg"
            }
            className="top-0 absolute w-96 h-28 object-cover rounded-2xl"
            alt="wait"
          />
          <div className="top-16 left-3 absolute bg-white p-1 rounded-full ">
            <img
              src={
                userInfo?.avt?.url ||
                "https://i.pinimg.com/736x/fa/60/51/fa6051d72b821cb48a8cc71d3481dfef.jpg"
              }
              className=" rounded-full object-cover w-20 h-20"
              alt="wait"
            />
          </div>
          <div className="absolute top-32 right-10 flex gap-3">
            <Link
              to={userInfo?.avt?.url}
              className="text-blue-500"
              target="_blank"
            >
              View avatar
            </Link>
            <Link
              to={userInfo?.banner?.url}
              className="text-blue-900"
              target="_blank"
            >
              View banner
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
