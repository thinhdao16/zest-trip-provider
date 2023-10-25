import { useEffect, useState } from "react";
import { FcEditImage } from "react-icons/fc";
import { Backdrop, Fade, Grid, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { DataSelectCard, StateTour } from "../../../createtour/types/index.t";
import { VehicleTag } from "../../../../components/icon/tour/tag";
import { TitleIconCardOptions } from "../../../../styles/createtour/createtour";

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

function ModalVehicle({
  dataVehicle: { tourVehicle, setTourVehicle },
}: {
  dataVehicle: {
    tourVehicle: { id: number; name: string }[];
    setTourVehicle: any;
  };
}) {
  const vehicleTour = useSelector((state: StateTour) => state.tour.vehicleTour);
  const [open, setOpen] = useState(false);
  const [dataVehicle, setDataVehicle] = useState<any>([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function addItem(itemToAdd: any) {
    const updatedTourVehicle = [...tourVehicle, itemToAdd];
    setTourVehicle(updatedTourVehicle);
    const updatedDataVehicle = dataVehicle.filter(
      (item: { id: number }) => item.id !== itemToAdd.id
    );
    setDataVehicle(updatedDataVehicle);
  }

  function removeItem(idToRemove: any) {
    console.log(idToRemove);
    const updatedTourVehicle = tourVehicle.filter(
      (item: { id: number }) => item.id !== idToRemove.id
    );
    setTourVehicle(updatedTourVehicle);
    const updatedDataVehicle = [...dataVehicle, idToRemove];
    setDataVehicle(updatedDataVehicle);
  }
  useEffect(() => {
    const updatedDataVehicle = vehicleTour.filter(
      (dataItem: any) =>
        !tourVehicle?.some(
          (tourVehicle: { name: string }) => tourVehicle.name === dataItem.name
        )
    );
    setDataVehicle(updatedDataVehicle);
  }, [vehicleTour]);

  return (
    <div className="">
      <div className="rounded-full p-1.5 shadow-custom-card-mui border border-solid border-navy-blue">
        <FcEditImage onClick={handleOpen} />
      </div>
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
            <span className="font-medium">Vehicle tour of you</span>
            <Grid container spacing={2}>
              {tourVehicle?.map((data: DataSelectCard) => (
                <Grid key={data.id} item xs={12} sm={6} md={2}>
                  <div className="p-4 border border-solid border-gray-300 rounded-lg shadow-custom-card-mui">
                    <VehicleTag field={data?.name} style="w-8 h-8" />
                    <TitleIconCardOptions>{data?.name}</TitleIconCardOptions>
                    <span onClick={() => removeItem(data)}>xóa</span>
                  </div>
                </Grid>
              ))}
            </Grid>
            <span className="font-medium">Choose tag you want </span>
            <Grid container spacing={2}>
              {dataVehicle.map((data: DataSelectCard) => (
                <Grid key={data.id} item xs={12} sm={6} md={2}>
                  <div className="p-4 border border-solid border-gray-300 rounded-lg shadow-custom-card-mui">
                    <VehicleTag field={data?.name} style="w-8 h-8" />
                    <TitleIconCardOptions>{data?.name}</TitleIconCardOptions>
                    <span onClick={() => addItem(data)}>add</span>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

ModalVehicle.propTypes = {};

export default ModalVehicle;
