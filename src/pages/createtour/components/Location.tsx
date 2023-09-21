import {
  BannerContainer,
  BannerContent,
  BannerMapContainer,
  CreateDescription,
  CreateIconContent,
  CreateTitleNullDes,
} from "../../../styles/createtour/createtour";
import { useStepContext } from "../context/ui/useStepContext";
import { TextField, InputAdornment } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormControl } from "@mui/joy";
import { GoLocation, GoPlusCircle } from "react-icons/go";
// import "leaflet-routing-machine";
// import "leaflet/dist/leaflet.css";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// const defaultCenter: any = [38.9072, -77.0369];
// const defaultZoom: any = 13;
// const disneyWorldLatLng: any = [28.3852, -81.5639];
// const disneyLandLatLng: any = [33.8121, -117.919];
// function RoutingControl() {
//   const map = useMap();

//   useEffect(() => {
//     const waypoints = [L.latLng(disneyWorldLatLng), L.latLng(disneyLandLatLng)];

//     const routingControl = L.Routing.control({
//       waypoints,
//       routeWhileDragging: true, // Enable route recalculation while dragging waypoints
//       show: false, // Initially hide the routing control UI
//     }).addTo(map);

//     // Handle route events if needed
//     routingControl.on("routesfound", (e) => {
//       // Access the found routes using e.routes
//       console.log("Routes found:", e.routes);
//     });

//     return () => {
//       routingControl.remove(); // Remove the control when component unmounts
//     };
//   }, [map]);

//   return null; // Routing control will be added through the side effect
// }
const Location: React.FC = () => {
  const { currentStep, updateFormValues } = useStepContext();
  const [formList, setFormList] = useState([
    {
      id: 0,
      value: "",
    },
  ]);
  //test location
  // const [address, setAddress] = React.useState("");
  // const [coordinates, setCoordinates] = React.useState<{
  //   latitude: number;
  //   longitude: number;
  // } | null>(null);

  // React.useEffect(() => {
  //   // Lấy tọa độ hiện tại khi component được render
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       setCoordinates({ latitude, longitude });
  //     },
  //     (error) => {
  //       console.error("Error getting current coordinates:", error);
  //     }
  //   );
  // }, []);
  //end
  useEffect(() => {
    updateFormValues(3, { Location: formList });
  }, [formList]);
  const addNewForm = () => {
    const newFormList = [...formList, { id: formList.length, value: "" }];
    setFormList(newFormList);
  };

  const handleFormChange = (id: number, value: string) => {
    const updatedFormList = formList.map((form) =>
      form.id === id ? { ...form, value } : form
    );
    setFormList(updatedFormList);
  };
  if (currentStep !== 5) {
    return null;
  }
  //test location

  // const handleSearch = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
  //         address
  //       )}`
  //     );

  //     if (response.data.length > 0) {
  //       const latitude = parseFloat(response.data[0].lat);
  //       const longitude = parseFloat(response.data[0].lon);
  //       setCoordinates({ latitude, longitude });
  //     } else {
  //       console.error("Address not found.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching coordinates:", error);
  //   }
  // };
  //end
  return (
    <BannerContainer>
      <BannerContent>
        <CreateTitleNullDes variant="h6">
          where is the place you want for the tour?
        </CreateTitleNullDes>
        <CreateDescription>
          Your address is only shared with guests after they have successfully.
        </CreateDescription>
        {/* <div className="App">
          <div className="p-5">
            <h1>Location Search</h1>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter an address"
            />
            <button onClick={handleSearch}>Search</button>
            {coordinates && (
              <div>
                <p>Latitude: {coordinates.latitude}</p>
                <p>Longitude: {coordinates.longitude}</p>
              </div>
            )}
          </div>
          <MapContainer
            style={{ width: "100%", height: "100vh" }}
            center={
              coordinates
                ? [coordinates.latitude, coordinates.longitude]
                : undefined
            }
            zoom={defaultZoom}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <RoutingControl />
          </MapContainer>
        </div> */}
        <BannerMapContainer>
          {formList.map((form) => (
            <FormControl required key={form.id}>
              <TextField
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <GoLocation />
                    </InputAdornment>
                  ),
                }}
                value={form.value}
                onChange={(e) => handleFormChange(form.id, e.target.value)}
                className="input-form-text-location-ready"
              />
            </FormControl>
          ))}
          <CreateIconContent onClick={addNewForm}>
            <GoPlusCircle />
          </CreateIconContent>
        </BannerMapContainer>
      </BannerContent>
    </BannerContainer>
  );
};
export default Location;
