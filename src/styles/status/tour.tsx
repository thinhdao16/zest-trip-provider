import React from "react";
import { Select } from "antd";
import { GoDotFill } from "react-icons/go";

const { Option } = Select;

interface ConstructionProps {
  children: React.ReactNode | React.ReactNode[];
}

interface StatusColors {
  [key: string]: string;
}

export function StatusTour({ children }: ConstructionProps) {
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

  return (
    <div
      className={`flex items-center gap-1 p-1 rounded-lg text-sm ${statusColorClass}`}
    >
      <GoDotFill />
      {normalizedStatus}
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
