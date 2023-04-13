import React from "react";
import { Select, MultiSelect } from "@mantine/core";
type IProps = {
  data: unknown;
  label: string;
  type: "single" | "multi";
  value?: string | string[];
  onChange?: (value: string) => void;
};
const CustomSelect: React.FC<IProps> = (props) => {
  const { data, label, type, value, onChange } = props;
  return (
    <>
      <div className="">
        <div className="my-2">{label}</div>
        {type === "single" ? (
          <Select
            label={null}
            placeholder="Pick one"
            data={data}
            onChange={onChange}
            value={value}
          />
        ) : (
          <MultiSelect
            data={data}
            label={null}
            placeholder={`Select ${label.toLowerCase()}`}
            value={value}
            onChange={onChange}
          />
        )}
      </div>
    </>
  );
};

export default CustomSelect;
