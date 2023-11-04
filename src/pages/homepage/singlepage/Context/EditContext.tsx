import React, { createContext, useState } from "react";

export type EditContextType = {
  loading: any;
  setLoading: any;
  name: any;
  setName: any;
  description: any;
  setDescription: any;
  footnote: any;
  setFootnote: any;
  addressName: any;
  setAddressName: any;
  addressCountry: any;
  setAddressCountry: any;
  addressDis: any;
  setAddressDis: any;
  addressPro: any;
  setAddressPro: any;
  addressWard: any;
  setAddressWard: any;
  schedule: any;
  setSchedule: any;
  tourTag: any;
  setTourTag: any;
  tourVehicle: any;
  setTourVehicle: any;
  tourImages: any;
  setTourImages: any;
  ticketPricing: any;
  setTicketPricing: any;
  availability: any;
  setAvailability: any;
  imageSrc: any;
  setImageSrc: any;
};

export const EditContext = createContext<EditContextType | undefined>(
  undefined
);

interface EditContextProps {
  children: React.ReactNode;
}

export const EditContextProvider: React.FC<EditContextProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState(1);
  const [name, setName] = useState(""); //up
  const [description, setDescription] = useState(""); //up
  const [footnote, setFootnote] = useState(""); //up
  const [addressName, setAddressName] = useState(""); //up
  const [addressCountry, setAddressCountry] = useState("");
  const [addressDis, setAddressDis] = useState(""); //up
  const [addressPro, setAddressPro] = useState(""); //up
  const [addressWard, setAddressWard] = useState(""); //up
  const [schedule, setSchedule] = useState([]); //up
  const [tourTag, setTourTag] = useState([]); //up
  const [tourVehicle, setTourVehicle] = useState([]); //up
  const [tourImages, setTourImages] = useState([]); //up
  const [ticketPricing, setTicketPricing] = useState([]); //up
  const [availability, setAvailability] = useState([]); //up
  const [imageSrc, setImageSrc] = useState<any>([]); //up

  return (
    <EditContext.Provider
      value={{
        loading,
        setLoading,
        name,
        setName,
        description,
        setDescription,
        footnote,
        setFootnote,
        addressName,
        setAddressName,
        addressCountry,
        setAddressCountry,
        addressDis,
        setAddressDis,
        addressPro,
        setAddressPro,
        addressWard,
        setAddressWard,
        schedule,
        setSchedule,
        tourTag,
        setTourTag,
        tourVehicle,
        setTourVehicle,
        tourImages,
        setTourImages,
        ticketPricing,
        setTicketPricing,
        availability,
        setAvailability,
        imageSrc,
        setImageSrc,
      }}
    >
      {children}
    </EditContext.Provider>
  );
};
