import { useEffect, useState } from "react";
import { Slider } from "@mantine/core";

type IProps = {
  defaultValue?: number;
  label: string;
  steps: number;
  onChange?: (value: number | string) => void;
  data?: unknown;
  value?: number | string;
  max?: number;
  type?: "time" | "other";
  marks?: string[];
};

const CustomSlider: React.FC<IProps> = (props) => {
  const {
    data,
    defaultValue = 50,
    label,
    steps,
    onChange,
    value,
    max = 100,
    marks,
  } = props;

  const [sliderValue, setSliderValue] = useState<number>(defaultValue);

  useEffect(() => {
    if (value !== undefined) {
      setSliderValue(value);
    }
  }, [value]);

  const handleChange = (newValue: number) => {
    setSliderValue(newValue);
    if (onChange) {
      if (marks && marks.length > 0) {
        onChange(marks[newValue]);
      } else {
        onChange(newValue);
      }
    }
  };

  const displayValue = marks ? marks[sliderValue] : sliderValue;

  const sliderMarks = marks
    ? marks.map((mark, index) => ({ value: index, label: mark }))
    : undefined;

  return (
    <div>
      <div className="my-2">
        {label} {displayValue} {props.type === "time" ? "mins" : ""}
      </div>
      {data ? (
        <Slider
          value={sliderValue}
          step={steps}
          marks={data}
          label={null}
          onChange={handleChange}
          max={max}
        />
      ) : (
        <Slider
          value={sliderValue}
          step={steps}
          label={null}
          onChange={handleChange}
          max={max}
          marks={sliderMarks}
        />
      )}
    </div>
  );
};

export default CustomSlider;
