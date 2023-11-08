import { useEffect, useState } from "react";
import { FcEmptyTrash, FcPlus } from "react-icons/fc";
import { Backdrop, Fade, Grid, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { DataSelectCard, StateTour } from "../../../createtour/types/index.t";
import { TourTag } from "../../../../components/icon/tour/tag";
import { TitleIconCardOptions } from "../../../../styles/createtour/createtour";
import { FaRegPenToSquare } from "react-icons/fa6";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "12px",
  background: "white",
  boxShadow: 24,
  p: 8,
};

function ModalTag({
  dataTag: { tourTag, setTourTag },
}: {
  dataTag: { tourTag: { id: number; name: string }[]; setTourTag: any };
}) {
  const tagTour = useSelector((state: StateTour) => state.tour.tagTour);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(0);
  const [dataTag, setDataTag] = useState<any>([]);
  const handleOpen = () => {
    setReload(reload + 1);
    setOpen(true);
  };
  const handleClose = () => {
    setReload(reload + 1);
    setOpen(false);
  };

  function addItem(itemToAdd: any) {
    const updatedTourTag = [...tourTag, itemToAdd];
    setTourTag(updatedTourTag);
    const updatedDataTag = dataTag.filter(
      (item: { id: number }) => item.id !== itemToAdd.id
    );
    setDataTag(updatedDataTag);
  }

  function removeItem(idToRemove: any) {
    console.log(idToRemove);
    const updatedTourTag = tourTag.filter(
      (item: { id: number }) => item.id !== idToRemove.id
    );
    setTourTag(updatedTourTag);
    const updatedDataTag = [...dataTag, idToRemove];
    setDataTag(updatedDataTag);
  }
  useEffect(() => {
    const updatedDataTag = tagTour.filter(
      (dataItem: any) =>
        !tourTag?.some(
          (tourTag: { name: string }) => tourTag.name === dataItem.name
        )
    );
    setDataTag(updatedDataTag);
  }, [tagTour, reload]);

  return (
    <>
      <button type="button" className="z-50" onClick={handleOpen}>
        <FaRegPenToSquare />
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={style}
            className="overflow-auto h-2/3 global-scrollbar outline-none sm:w-screen md:w-2/3"
          >
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <span className="font-medium text-lg">Tag tour of you</span>
                <Grid container spacing={2}>
                  {tourTag?.map((data: DataSelectCard) => (
                    <Grid key={data.id} item xs={12} sm={6} md={2}>
                      <div className="p-4 border border-solid border-gray-300 rounded-lg shadow-custom-card-mui relative">
                        <TourTag field={data?.name} style="w-8 h-8" />
                        <TitleIconCardOptions>
                          {data?.name}
                        </TitleIconCardOptions>
                        <FcEmptyTrash
                          className="absolute top-2 right-2"
                          onClick={() => removeItem(data)}
                        />
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-medium text-lg">
                  Choose tag you want{" "}
                </span>
                <Grid container spacing={2}>
                  {dataTag.map((data: DataSelectCard) => (
                    <Grid key={data.id} item xs={12} sm={6} md={2}>
                      <div className="p-4 border border-solid border-gray-300 rounded-lg shadow-custom-card-mui relative">
                        <TourTag field={data?.name} style="w-8 h-8" />
                        <TitleIconCardOptions>
                          {data?.name}
                        </TitleIconCardOptions>
                        <FcPlus
                          onClick={() => addItem(data)}
                          className="absolute top-2 right-2"
                        />
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

ModalTag.propTypes = {};

export default ModalTag;
