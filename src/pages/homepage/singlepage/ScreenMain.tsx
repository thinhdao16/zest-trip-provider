import { useSelector } from "react-redux";
import { StateTour } from "../../createtour/types/index.t";
import Construction, {
  ConstructionDes,
  ConstructionTitle,
  ConstructionTitletext,
} from "./singlePageConst/Construction";
import { FaHardDrive } from "react-icons/fa6";
import { useState } from "react";
import AutoResizableTextarea from "./singlePageConst/AutoResizableTextarea";
import { TourTag } from "../../../components/icon/tour/tag";

function ScreenMain() {
  const tourDetail: any = useSelector(
    (state: StateTour) => state.tour.tourGetDetail
  );
  const [name, setName] = useState(tourDetail?.name);

  const [description, setDescription] = useState(tourDetail?.description);
  const [footnote, setFootnote] = useState(tourDetail?.footnote);
  console.log(tourDetail);
  return (
    <div className="bg-slate-50 rounded-xl p-4">
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
              <div className="border-gray-300 border p-2 rounded-lg bg-white cursor-not-allowed border-solid ">
                {tourDetail?.tour_location_type}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4 flex justify-end">
              <ConstructionTitletext>Status</ConstructionTitletext>
            </div>
            <div className="col-span-8 ">
              <div className="border-gray-300 border p-2 rounded-lg bg-white cursor-not-allowed border-solid ">
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
            <ConstructionTitletext>*Image ratio 1:1</ConstructionTitletext>
            <div className="grid grid-cols-8 gap-4 border">
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
                defaultValue={description || tourDetail?.description}
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
            <div className="border border-solid border-gray-300 p-2 rounded-lg">
              <div className="grid grid-cols-8 gap-4">
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
      </div>
    </div>
  );
}

ScreenMain.propTypes = {};

export default ScreenMain;
