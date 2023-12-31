import { ReactNode } from "react";
import { GoDotFill } from "react-icons/go";

interface ConstructionProps {
  children: ReactNode | ReactNode[];
}

interface StatusColors {
  [key: string]: string; // Thêm index signature vào đây
}

export function StatusBooking({ children }: ConstructionProps) {
  const statusColors: StatusColors = {
    Pending: "bg-yellow-300 text-yellow-900",
    Accepted: "bg-navy-blue-opacity-5 text-navy-blue",
    Reject: "bg-red-300 text-red-900",
    Refunded: "bg-blue-300 text-blue-900",
    "User request refund": "bg-purple-300 text-purple-900",
    "Provider refunded": "bg-indigo-300 text-indigo-900",
  };

  const normalizedStatus =
    typeof children === "string" ? normalizeStatus(children) : "";
  const statusColorClass =
    typeof children === "string"
      ? statusColors[normalizedStatus]
      : "bg-gray-300";

  return (
    <div
      className={`flex items-center gap-1 p-1 rounded-lg text-sm ${statusColorClass}`}
    >
      <GoDotFill />
      {normalizedStatus}
    </div>
  );
}

// Hàm xử lý trường hợp cụ thể cho USER_REQUEST_REFUND
function normalizeStatus(status: string): string {
  if (status === "USER_REQUEST_REFUND") {
    return "User request refund";
  }
  if (status === "REJECT") {
    return "Reject";
  }
  if (status === "PENDING") {
    return "Pending";
  }
  if (status === "ACCEPTED") {
    return "Accepted";
  }
  if (status === "PROVIDER_REFUNDED") {
    return "Provider refunded";
  }
  if (status === "REFUNDED") {
    return "Refunded";
  }

  // Trường hợp mặc định cho các giá trị khác
  return status;
}
