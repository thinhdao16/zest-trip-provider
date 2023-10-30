import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

import {
  BannerContainer,
  BannerContent,
  BannerImage,
} from "../../../styles/createtour/createtour";
import { useStepContext } from "../context/ui/useStepContext";
import { useEffect, useState } from "react";

export default function Welcome() {
  const { currentStep } = useStepContext();

  const [defaultDate, setDefaultDate] = useState(dayjs());
  const [storedDate, setStoredDate] = useState("");
  const [restoredDate, setRestoredDate] = useState("");
  const handleDateChange = (newDate: any) => {
    setStoredDate(JSON.stringify(newDate));
    setDefaultDate(newDate);
  };

  useEffect(() => {
    if (storedDate) {
      setRestoredDate(JSON.parse(storedDate));
    }
  }, [storedDate]);
  const today = dayjs();
  const tomorrow = dayjs().add(0, "day");

  if (currentStep !== 1) {
    return null;
  }

  return (
    <BannerContainer>
      <div className="items-center flex justify-center h-full">
        <BannerContent>
          <div className="text-lg">Let's get started</div>
          <p className="font-semibold text-5xl leading-tight text-black">
            Share your tour information with us
          </p>
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DatePicker", "DateTimePicker", "DateRangePicker"]}
            >
              <DemoItem label="DatePicker">
                <DatePicker
                  label="Choose a Date"
                  value={defaultDate}
                  minDate={tomorrow}
                  onChange={handleDateChange}
                />
              </DemoItem>

              <DemoItem label="DateRangePicker" component="DateRangePicker">
                <DateRangePicker
                  defaultValue={[today, tomorrow]}
                  minDate={tomorrow}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider> */}
        </BannerContent>
        <BannerImage src="src\assets\tour\welcome\Tour-PNG-Download-Image.png" />
      </div>
    </BannerContainer>
  );
}
