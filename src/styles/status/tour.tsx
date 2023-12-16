import { useContext } from "react";
import { Popover, Select, message } from "antd";
import { GoDotFill } from "react-icons/go";
import { AppDispatch } from "../../store/redux/store";
import { useDispatch } from "react-redux";
import { editStatusTour } from "../../store/redux/silce/tourSlice";
import { MdKeyboardArrowDown } from "react-icons/md";
import { DataContext } from "../../store/dataContext/DataContext";

const { Option } = Select;

interface StatusColors {
  [key: string]: string;
}

export function StatusTour({ children, idtour }: any) {
  const { setReloadStatus } = useContext(DataContext);
  const dispatch: AppDispatch = useDispatch();
  const statusColors: StatusColors = {
    Draft: "bg-yellow-300 text-yellow-900",
    Published: "bg-navy-blue-opacity-5 text-navy-blue",
    Hidden: "bg-red-300 text-red-900",
  };

  const normalizedStatus =
    typeof children === "string" ? normalizeStatus(children) : "";
  const statusColorClass =
    typeof children === "string"
      ? statusColors[normalizedStatus]
      : "bg-gray-300";
  const handleChangeStatus = async (field: string) => {
    try {
      dispatch(
        editStatusTour({
          tour_id: idtour,
          status: field,
        })
      ).unwrap();
      message.success(`${field} status tour successfully`);
      setReloadStatus((prev: any) => prev + 1);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="">
      <Popover
        content={
          <div className=" text-center gap-2 ">
            {children === "PUBLISHED" && (
              <button
                className="bg-red-300 text-red-900 py-1 px-3 rounded-md"
                onClick={() => handleChangeStatus("HIDDEN")}
              >
                Hidden
              </button>
            )}
            {children === "HIDDEN" && (
              <button
                className="bg-navy-blue-opacity-5 p-1 text-navy-blue rounded-md"
                onClick={() => handleChangeStatus("PUBLISHED")}
              >
                Published
              </button>
            )}
          </div>
        }
        title="Change satus"
        trigger="click"
      >
        <button
          className={`flex items-center gap-1 p-1 rounded-lg text-sm ${statusColorClass} button-transition-effect-hover`}
        >
          <GoDotFill />
          {normalizedStatus}
          <MdKeyboardArrowDown />
        </button>
      </Popover>
    </div>
  );
}

interface StatusSelectProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export function StatusSelect({ defaultValue, onChange }: StatusSelectProps) {
  const options = ["PUBLISHED", "DRAFT", "HIDDEN"];

  return (
    <Select
      defaultValue={defaultValue}
      onChange={onChange}
      style={{ width: 150 }}
    >
      {options.map((option) => (
        <Option key={option} value={option}>
          <StatusTour>{option}</StatusTour>
        </Option>
      ))}
    </Select>
  );
}

function normalizeStatus(status: string): string {
  if (status === "PUBLISHED") {
    return "Published";
  }
  if (status === "DRAFT") {
    return "Draft";
  }
  if (status === "HIDDEN") {
    return "Hidden";
  }

  return status;
}
