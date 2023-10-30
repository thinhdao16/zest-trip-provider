import { useContext, useEffect, useState } from "react";
import { useStepContext } from "../../context/ui/useStepContext";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { DataContext } from "../../../../store/dataContext/DataContext";
import {
  postCreateAvailabilityTour,
  postCreateTicketTour,
  postCreateTour,
} from "../../../../store/redux/silce/tourSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../../store/redux/store";
import { useDispatch } from "react-redux";
import { FaCircleCheck } from "react-icons/fa6";

function CreateTourNav() {
  const step = [
    { id: 1, name: "Welcome" },
    { id: 2, name: "Tour Type" },
    { id: 3, name: "Title" },
    { id: 4, name: "Transportations " },
    { id: 5, name: "Categories" },
    { id: 6, name: "Location" },
    { id: 7, name: "Schedule" },
    { id: 8, name: "Availability" },
    { id: 9, name: "P ricing" },
    { id: 10, name: "Media" },
    { id: 11, name: "Review" },
    { id: 12, name: "Succesfull" },
  ];

  const {
    currentStep,
    totalSteps,
    goToNextStep,
    goToPreviousStep,
    formValues,
    chooseStep,
  } = useStepContext();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { setRefeshTour } = useContext(DataContext);
  const [lengthValue, setLengthValue] = useState("");
  const isLastStep = currentStep === totalSteps;
  const handleFormSubmit = () => {
    goToNextStep();
    setRefeshTour((prev) => !prev);
    navigate("/listtour");
  };
  console.log(formValues);
  function formatDate(inputDate: string | undefined): string | undefined {
    if (!inputDate) {
      return undefined; // Xử lý trường hợp đầu vào rỗng gracefully
    }

    const match = inputDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);

    if (!match) {
      throw new Error('Invalid date format. Expected "yyyy-mm-dd".');
    }

    const year = match[1];
    const month = match[2];
    const day = match[3];

    return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
  }

  const handleCreateTourAndAvailability = () => {
    const formData = new FormData();
    const dataValueCreate = {
      name: formValues[8]?.Title[0],
      description: formValues[8]?.Title[1],
      footnote: "For any inquiries, feel free to contact us anytime!",
      // price la number
      price:
        parseInt(formValues[6]?.Adults) + parseInt(formValues[6]?.Children),
      //end
      duration: parseInt(formValues[4]?.DurationCheckIn[0][0]?.no),
      tag_id: formValues[1]?.TransportType?.map(
        (tag: { id: number }) => tag?.id
      ),
      vehicle_id: formValues[2]?.AccomType?.map(
        (acc: { id: number }) => acc?.id
      ),
      TourSchedule: formValues[4]?.DurationCheckIn[1]?.map(
        (data: {
          day: number;
          title: string;
          boxes: { data: string; fromTime: string; toTime: string }[];
        }) => ({
          title: `Day ${data?.day}`,
          description: data?.title,
          schedule_detail: data?.boxes?.map((box) => ({
            from: box?.fromTime,
            to: box?.toTime,
            description: box?.data,
          })),
        })
      ),
      address_ward: formValues[3]?.Location.address_ward?.full_name,
      address_name: formValues[3]?.Location?.address_name,
      tour_location_type: "INTERNATIONAL",
      address_province: formValues[3]?.Location?.address_province?.full_name,
      address_country: formValues[3]?.Location?.address_country,
      address_district: formValues[3]?.Location?.address_district?.full_name,
    };

    formData.append("data", JSON.stringify(dataValueCreate));
    const mediaArray = formValues[7]?.Media || [];

    for (let i = 0; i < mediaArray.length; i++) {
      const imageFile = mediaArray[i].file;
      formData.append("tour_images", imageFile[i]);
    }

    const requestData = {
      formData,
    };
    dispatch(postCreateTour(requestData.formData))
      .then((tourResponse) => {
        console.log(tourResponse);
        if (postCreateTour.fulfilled.match(tourResponse)) {
          const dataValueCreateAvailability = {
            name: formValues[5]?.Capacity?.Title,
            tour_id: tourResponse.payload.data.id,
            validity_date_range_from: formValues[5]?.Capacity?.DateFrom,
            validity_date_range_to: formValues[5]?.Capacity?.DateTo,
            weekdays: [
              ...(formValues[5]?.Capacity?.Sun?.length > 0
                ? [{ day: 1, timeSlot: formValues[5]?.Capacity?.Sun }]
                : []),
              ...(formValues[5]?.Capacity?.Mon?.length > 0
                ? [{ day: 2, timeSlot: formValues[5]?.Capacity?.Mon }]
                : []),
              ...(formValues[5]?.Capacity?.Tue?.length > 0
                ? [{ day: 3, timeSlot: formValues[5]?.Capacity?.Tue }]
                : []),
              ...(formValues[5]?.Capacity?.Wed?.length > 0
                ? [{ day: 4, timeSlot: formValues[5]?.Capacity?.Wed }]
                : []),
              ...(formValues[5]?.Capacity?.Thu?.length > 0
                ? [{ day: 5, timeSlot: formValues[5]?.Capacity?.Thu }]
                : []),
              ...(formValues[5]?.Capacity?.Fri?.length > 0
                ? [{ day: 6, timeSlot: formValues[5]?.Capacity?.Fri }]
                : []),
              ...(formValues[5]?.Capacity?.Sat?.length > 0
                ? [{ day: 7, timeSlot: formValues[5]?.Capacity?.Sat }]
                : []),
            ],

            specialDates: [
              ...(formValues[5]?.Capacity?.SingleTime?.length > 0
                ? // eslint-disable-next-line no-unsafe-optional-chaining
                  formValues[5]?.Capacity?.SingleTime.map((item: any) => ({
                    // date: formatDate(item.day),
                    date: item?.day,
                    timeSlot: item?.time,
                  }))
                : []),
            ],
          };
          dispatch(postCreateAvailabilityTour(dataValueCreateAvailability))
            .then((availabilityResponse) => {
              console.log(availabilityResponse);
              if (
                postCreateAvailabilityTour.fulfilled.match(availabilityResponse)
              ) {
                console.log("Both actions succeeded");
              } else {
                console.log("postCreateAvailabilityTour failed");
              }
            })
            .catch((availabilityError) => {
              console.error("Error:", availabilityError);
            });
          const dataTicket = formValues[6]?.ticket;
          const pricing_data = dataTicket?.map((item: any) => {
            const pricingData: any = {
              ticket_type: item?.role,
              pricing_type: item?.type,
              maximum_booking_quantity: parseInt(item?.max),
              minimum_booking_quantity: parseInt(item?.min),
              from_age: item?.ageStart?.toString(),
              to_age: item?.ageEnd?.toString(),
            };

            if (item.price_range) {
              pricingData.price_range = item.price_range.map(
                (formItem: any) => ({
                  from_amount: parseInt(formItem.numberOfPeople),
                  to_amount: parseInt(formItem.numberOfPeopleAfter),
                  price: parseInt(formItem.payoutPerPerson),
                })
              );
            }

            return pricingData;
          });

          const data = {
            tour_id: tourResponse.payload.data.id,
            pricing_data,
          };
          dispatch(postCreateTicketTour(data));
        } else {
          console.log("postCreateTour failed");
        }
      })
      .catch((tourError) => {
        console.error("Error:", tourError);
      });
    // goToNextStep();
  };
  const chooseCurrentStep = (data: number) => {
    if (data < currentStep) {
      chooseStep(data);
    }
  };
  const constraintLength = () => {
    let classSkip = "no"; // Mặc định là "no"

    if (currentStep === 3) {
      if (
        formValues[8].Title[0].length > 0 &&
        formValues[8].Title[1].length > 0
      ) {
        classSkip = "yes"; // Nếu điều kiện thỏa mãn, thì set thành "yes"
      }
    }
    if (currentStep === 4) {
      if (formValues[1].TransportType.length > 0) {
        classSkip = "yes"; // Nếu điều kiện thỏa mãn, thì set thành "yes"
      }
    }
    if (currentStep === 5) {
      if (formValues[2].AccomType.length > 0) {
        classSkip = "yes"; // Nếu điều kiện thỏa mãn, thì set thành "yes"
      }
    }
    if (currentStep === 6) {
      if (
        formValues[3].Location.address_name?.length > 0 &&
        formValues[3].Location.address_province?.full_name?.length > 0 &&
        formValues[3].Location.address_district?.full_name?.length > 0 &&
        formValues[3].Location.address_ward?.full_name?.length > 0
      ) {
        classSkip = "yes"; // Nếu điều kiện thỏa mãn, thì set thành "yes"
      }
    }
    if (currentStep === 7) {
      if (
        formValues[4].DurationCheckIn[1].length >=
          formValues[4].DurationCheckIn[0][0].no &&
        formValues[4].DurationCheckIn[0].length > 0
      ) {
        classSkip = "yes"; // Nếu điều kiện thỏa mãn, thì set thành "yes"
      }
    }
    if (currentStep === 8) {
      const capacities = formValues[5].Capacity;
      let hasNonEmptyArray = false; // Biến kiểm tra mặc định là false
      if (
        (capacities.DateFrom.length > 0 &&
          capacities.DateTo.length > 0 &&
          capacities.Title.length > 0 &&
          capacities.Mon.length > 0) ||
        capacities.Tue.length > 0 ||
        capacities.Wed.length > 0 ||
        capacities.Thu.length > 0 ||
        capacities.Fri.length > 0 ||
        capacities.Sat.length > 0 ||
        capacities.Sun.length > 0 ||
        capacities.SingleTime.length > 0
      ) {
        hasNonEmptyArray = true; // Nếu có ít nhất một mảng có độ dài > 0, đặt biến kiểm tra thành true
      }

      if (hasNonEmptyArray) {
        classSkip = "yes"; // Nếu biến kiểm tra là true, đặt classSkip thành "yes"
      }
    }
    if (currentStep === 10) {
      if (formValues[7].Media.length > 0) {
        classSkip = "yes"; // Nếu điều kiện thỏa mãn, thì set thành "yes"
      }
    } else if (currentStep === 2 || currentStep === 9) {
      classSkip = "yes"; // Nếu currentStep là 2, thì set thành "yes"
    }

    setLengthValue(classSkip);
  };
  useEffect(() => {
    constraintLength();
  }, [currentStep, formValues]);

  return (
    <div className="">
      <div className=" border-r-2 border-gray-200 border-solid h-full flex-col flex flex-shrink-0 ">
        <div className="flex flex-col justify-center pl-1 pr-6 py-4">
          <p className="font-medium pl-12 text-lg pb-3">Information</p>
          <div className="h-[68vh] overflow-auto scrollbar-none gap-2 flex flex-col">
            {step.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  chooseCurrentStep(item.id);
                }}
                className={`gap-6 flex items-center font-medium  font-base py-3.5 w-full rounded-xl border  relative ${
                  currentStep === item.id
                    ? "bg-white text-navy-blue"
                    : currentStep < item.id
                    ? "bg-white text-gray-400"
                    : " bg-white text-navy-blue "
                }`}
              >
                <div
                  className={` ${
                    currentStep === item.id
                      ? "bg-navy-blue   h-7 w-1.5 rounded-full"
                      : currentStep < item.id
                      ? "bg-white h-7 w-1.5 rounded-full"
                      : "bg-white h-7 w-1.5 rounded-full"
                  }`}
                ></div>
                <p className="mr-4 font-medium">{item?.id}.</p>
                {item.name}
                <FaCircleCheck
                  className={` ${
                    currentStep === item.id
                      ? "hidden"
                      : currentStep < item.id
                      ? "hidden"
                      : "text-navy-blue absolute top-4.5 right-4"
                  }`}
                />
              </div>
            ))}
          </div>
          <div className="pt-5">
            {!isLastStep && (
              <>
                {currentStep === totalSteps ? (
                  <Box
                    p={3}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      onClick={goToPreviousStep}
                      disabled={currentStep !== totalSteps}
                    >
                      Previous Step
                    </Button>
                    <Button
                      onClick={handleFormSubmit}
                      disabled={currentStep !== totalSteps}
                    >
                      Start
                    </Button>
                  </Box>
                ) : currentStep === 11 ? (
                  <div className="flex items-center justify-between">
                    <button
                      className="font-medium border-b-2 border-navy-blue text-navy-blue hover:border-baby-blue hover:border-b-2"
                      onClick={goToPreviousStep}
                      disabled={currentStep === totalSteps}
                    >
                      Previous
                    </button>
                    <button
                      className="bg-navy-blue font-medium border border-navy-blue px-6 py-2.5 rounded-lg text-white hover:border hover:border-navy-blue hover:bg-white hover:text-navy-blue"
                      onClick={handleCreateTourAndAvailability}
                      disabled={currentStep === totalSteps}
                    >
                      Start
                    </button>
                  </div>
                ) : currentStep === 1 ? (
                  <div className="flex items-center justify-between ">
                    <button></button>
                    <button
                      className="bg-navy-blue font-medium border border-navy-blue px-6 py-2.5 rounded-lg text-white hover:border hover:border-navy-blue hover:bg-white hover:text-navy-blue"
                      onClick={goToNextStep}
                      disabled={currentStep === totalSteps}
                    >
                      Next
                    </button>
                  </div>
                ) : (
                  <>
                    <div className=" flex items-center justify-between">
                      <button
                        className="font-medium border-b-2 border-navy-blue text-navy-blue hover:border-baby-blue hover:border-b-2"
                        onClick={goToPreviousStep}
                        disabled={currentStep === 1}
                      >
                        Previous
                      </button>
                      <button
                        id="yourButtonId"
                        className={`font-medium border  px-6 py-2.5 rounded-lg   ${
                          lengthValue === "yes"
                            ? "bg-navy-blue border-navy-blue text-white  hover:border-navy-blue hover:bg-white hover:text-navy-blue"
                            : "cursor-not-allowed bg-gray-300 border-gray-200 text-gray-800 "
                        }`}
                        onClick={goToNextStep}
                        disabled={lengthValue === "no"}
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTourNav;
