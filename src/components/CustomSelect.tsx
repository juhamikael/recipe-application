import React from "react";
import { Select, MultiSelect } from "@mantine/core";
type IProps = {
  data: unknown;
  label: string;
  type: "single" | "multi";
};
const CustomSelect: React.FC<IProps> = (props) => {
  const { data, label, type } = props;
  return (
    <>
      <div className="">
        <div className="my-2">{label}</div>
        {type === "single" ? (
          <Select label={null} placeholder="Pick one" data={data} />
        ) : (
          <MultiSelect
            data={data}
            label={null}
            placeholder={`Select ${label.toLowerCase()}`}
          />
        )}
      </div>
    </>
  );
};

export default CustomSelect;
