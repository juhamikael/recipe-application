import { Slider } from "@mantine/core";

type IProps = {
  label: string;
  steps: number;
  data: unknown;
};

const CustomSlider: React.FC<IProps> = (props) => {
  const { data, label, steps } = props;
  return (
    <div>
      <div className="my-2">{label}</div>
      <Slider defaultValue={50} step={steps} marks={data} label={null} />
    </div>
  );
};

export default CustomSlider;
