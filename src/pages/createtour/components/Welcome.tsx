import {
  BannerContainer,
  BannerContent,
  BannerImage,
} from "../../../styles/createtour/createtour";
import { useStepContext } from "../context/ui/useStepContext";
import ImageWellcomeTour from "../../../assets/tour/welcome/Tour-PNG-Download-Image.png";
export default function Welcome() {
  const { currentStep } = useStepContext();

  if (currentStep !== 1) {
    return null;
  }

  return (
    <BannerContainer className="bg-main">
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
        <BannerImage src={ImageWellcomeTour} />
      </div>
    </BannerContainer>
  );
}
