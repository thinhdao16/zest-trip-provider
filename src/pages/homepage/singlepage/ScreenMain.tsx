import { useSelector } from "react-redux";
import { StateTour } from "../../createtour/types/index.t";
import Construction, {
  ConstructionDes,
  ConstructionTitle,
  ConstructionTitletext,
} from "./singlePageConst/Construction";
import { FaHardDrive } from "react-icons/fa6";
import { useEffect, useState } from "react";
import AutoResizableTextarea from "./singlePageConst/AutoResizableTextarea";
import { TourTag, VehicleTag } from "../../../components/icon/tour/tag";

function ScreenMain() {
  const tourDetail: any = useSelector(
    (state: StateTour) => state.tour.tourGetDetail
  );

  // Sử dụng useEffect để cập nhật state khi dữ liệu thay đổi
  useEffect(() => {
    if (tourDetail) {
      setName(tourDetail?.name);
      setDescription(tourDetail.description);
      setFootnote(tourDetail.footnote);
      setAddressName(tourDetail?.address_name);
      setAddressDis(tourDetail?.address_district);
      setAddressPro(tourDetail?.address_province);
      setAddressWard(tourDetail?.address_ward);
    }
  }, [tourDetail]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [footnote, setFootnote] = useState("");
  const [addressName, setAddressName] = useState("");
  const [addressCountry, setAddressCountry] = useState("");
  const [addressDis, setAddressDis] = useState("");
  const [addressPro, setAddressPro] = useState("");
  const [addressWard, setAddressWard] = useState("");

  return (
    <div className="bg-main rounded-xl p-4 h-full overflow-y-auto global-scrollbar">
      <div className="mb-4">
        <span className="font-medium text-xl">Infomation basic</span>
      </div>
      <div className="flex flex-col gap-3 px-4">
        <div className="grid grid-cols-2">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4 flex justify-end">
              <ConstructionTitletext>Tour type</ConstructionTitletext>
            </div>
            <div className="col-span-8  ">
              <div className="border-navy-blue  border-l-4 p-2 rounded-lg bg-white cursor-not-allowed border-solid ">
                {tourDetail?.tour_location_type}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4 flex justify-end">
              <ConstructionTitletext>Status</ConstructionTitletext>
            </div>
            <div className="col-span-8 ">
              <div className="border-navy-blue border-l-4 p-2 rounded-lg bg-white cursor-not-allowed border-solid ">
                {tourDetail?.status}
              </div>
            </div>
          </div>
        </div>
        <Construction>
          <ConstructionTitle>
            <ConstructionTitletext>Image product</ConstructionTitletext>
          </ConstructionTitle>
          <ConstructionDes>
            <span className="font-medium">*Image ratio 1:1</span>
            <div className="grid grid-cols-5 gap-4 border">
              {tourDetail?.tour_images?.map((img: string, index: number) => (
                <div
                  key={index}
                  className="border border-solid bg-white border-gray-300 rounded-lg p-1"
                  style={{ display: "flex" }}
                >
                  <img
                    className="object-cover rounded-lg"
                    src={img}
                    alt="error"
                    style={{ width: "auto", height: "auto", flexGrow: 1 }}
                  />
                </div>
              ))}
            </div>
          </ConstructionDes>
        </Construction>
        <Construction>
          <ConstructionTitle>
            <ConstructionTitletext>Name Product</ConstructionTitletext>
          </ConstructionTitle>
          <ConstructionDes>
            <div className="relative">
              <FaHardDrive className="absolute top-3 left-3 " />
              <input
                className="border border-gray-300 rounded-lg py-2 px-8 w-full"
                defaultValue={name || tourDetail?.name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
            </div>
          </ConstructionDes>
        </Construction>
        <Construction>
          <ConstructionTitle>
            <ConstructionTitletext>Description Product</ConstructionTitletext>
          </ConstructionTitle>
          <ConstructionDes>
            <div className="relative">
              <FaHardDrive className="absolute top-3 left-3 " />
              <AutoResizableTextarea
                defaultValue={description}
                onChange={(e) => setDescription(e)}
              />
            </div>
          </ConstructionDes>
        </Construction>
        <Construction>
          <ConstructionTitle>
            <ConstructionTitletext>Footnote</ConstructionTitletext>
          </ConstructionTitle>
          <ConstructionDes>
            <div className="relative">
              <FaHardDrive className="absolute top-3 left-3 " />
              <input
                className="border border-gray-300 rounded-lg py-2 px-8 w-full"
                defaultValue={footnote || tourDetail?.footnote}
                onChange={(e) => setFootnote(e.target.value)}
                type="text"
              />
            </div>
          </ConstructionDes>
        </Construction>
        <Construction>
          <ConstructionTitle>
            <ConstructionTitletext>Tag for tour</ConstructionTitletext>
          </ConstructionTitle>
          <ConstructionDes>
            <div className="bg-white p-2 rounded-lg">
              <div className="grid grid-cols-5 gap-4">
                {tourDetail?.tag_id?.map(
                  (tag: { name: string; id: number }) => (
                    <div
                      key={tag?.id}
                      className="flex bg-white items-center gap-2 border border-gray-400 border-solid rounded-lg p-3 shadow-custom-card-mui"
                    >
                      <TourTag field={tag?.name} style="w-k8 h-8" />
                      <p>{tag?.name}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </ConstructionDes>
        </Construction>
        <Construction>
          <ConstructionTitle>
            <ConstructionTitletext>Vehicle for tour</ConstructionTitletext>
          </ConstructionTitle>
          <ConstructionDes>
            <div className="bg-white   p-2 rounded-lg">
              <div className="grid grid-cols-5 gap-4">
                {tourDetail?.vehicle_id?.map(
                  (tag: { name: string; id: number }) => (
                    <div
                      key={tag?.id}
                      className="flex bg-white items-center gap-2 border border-gray-400 border-solid rounded-lg p-3 shadow-custom-card-mui"
                    >
                      <VehicleTag field={tag?.name} style="w-k8 h-8" />
                      <p>{tag?.name}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </ConstructionDes>
        </Construction>
        <Construction>
          <ConstructionTitle>
            <ConstructionTitletext>Address name</ConstructionTitletext>
          </ConstructionTitle>
          <ConstructionDes>
            <div className="relative">
              <FaHardDrive className="absolute top-3 left-3 " />
              <input
                className="border border-gray-300 rounded-lg py-2 px-8 w-full"
                defaultValue={addressName || tourDetail?.address_name}
                onChange={(e) => setAddressName(e.target.value)}
                type="text"
              />
            </div>
          </ConstructionDes>
        </Construction>
        <div className="grid grid-cols-2 gap-3">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4 flex justify-end">
              <ConstructionTitletext>Address country</ConstructionTitletext>
            </div>
            <div className="col-span-8 relative">
              <FaHardDrive className="absolute top-3 left-3 " />
              <input
                className="border border-gray-300 rounded-lg py-2 px-8 w-full"
                defaultValue={addressCountry || tourDetail?.address_country}
                onChange={(e) => setAddressCountry(e.target.value)}
                type="text"
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4 flex justify-end">
              <ConstructionTitletext>Address district</ConstructionTitletext>
            </div>
            <div className="col-span-8 relative">
              <FaHardDrive className="absolute top-3 left-3 " />
              <input
                className="border border-gray-300 rounded-lg py-2 px-8 w-full"
                defaultValue={addressDis || tourDetail?.address_district}
                onChange={(e) => setAddressDis(e.target.value)}
                type="text"
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4 flex justify-end">
              <ConstructionTitletext>Address province</ConstructionTitletext>
            </div>
            <div className="col-span-8 relative">
              <FaHardDrive className="absolute top-3 left-3 " />
              <input
                className="border border-gray-300 rounded-lg py-2 px-8 w-full"
                defaultValue={addressPro || tourDetail?.address_province}
                onChange={(e) => setAddressPro(e.target.value)}
                type="text"
              />
            </div>
          </div>{" "}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4 flex justify-end">
              <ConstructionTitletext>Address ward</ConstructionTitletext>
            </div>
            <div className="col-span-8 relative">
              <FaHardDrive className="absolute top-3 left-3 " />
              <input
                className="border border-gray-300 rounded-lg py-2 px-8 w-full"
                defaultValue={addressWard || tourDetail?.address_ward}
                onChange={(e) => setAddressWard(e.target.value)}
                type="text"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ScreenMain.propTypes = {};

export default ScreenMain;
