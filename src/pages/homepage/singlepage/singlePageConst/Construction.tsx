import React, { ReactNode } from "react";

interface ConstructionProps {
  children: ReactNode;
}

function Construction({ children }: ConstructionProps) {
  return <div className="grid grid-cols-12 gap-4">{children}</div>;
}

export default Construction;

export function ConstructionTitle({ children }: ConstructionProps) {
  return <div className="col-span-2 flex justify-end">{children}</div>;
}
export function ConstructionDes({ children }: ConstructionProps) {
  return <div className="col-span-10 flex flex-col gap-2">{children}</div>;
}
export function ConstructionTitletext({ children }: ConstructionProps) {
  return <p className="font-medium text-end pt-2">{children}</p>;
}
