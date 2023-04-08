import { Slider } from "@mantine/core";

type IProps = {
  defaultValue?: number;
  label: string;
  steps: number;
  onChange?: (value: number) => void;
  data?: unknown;
  value?: number;
  max?: number;
  type?: "time" | "other";
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
  } = props;

  return (
    <div>
      <div className="my-2">
        {label} {value} {props.type === "time" ? "mins" : ""}
      </div>
      {data ? (
        <Slider
          defaultValue={defaultValue}
          step={steps}
          marks={data}
          label={null}
          onChange={onChange}
          max={max}
        />
      ) : (
        <Slider
          defaultValue={defaultValue}
          step={steps}
          label={null}
          onChange={onChange}
          max={max}
        />
      )}
    </div>
  );
};

export default CustomSlider;
