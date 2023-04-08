import { useState } from "react";
import { TextInput, Autocomplete } from "@mantine/core";
import { PlusCircledIcon } from "@radix-ui/react-icons";

type IProps = {
  addInput: () => void;
  showButton: boolean;
};
const unitOptions = [
  { label: "g", value: "g" },
  { label: "kg", value: "kg" },
  { label: "tsp", value: "tsp" },
  { label: "tbsp", value: "tbsp" },
  { label: "cup", value: "cup" },
  { label: "oz", value: "oz" },
  { label: "lb", value: "lb" },
];

const IngredientInput: React.FC<IProps> = ({ addInput, showButton }) => {
  const [selectedUnit, setSelectedUnit] = useState(unitOptions[0].value);

  const handleUnitChange = (value: string) => {
    setSelectedUnit(value);
  };

  return (
    <div className="flex flex-col gap-x-2">
      <section className="flex flex-row">
        <TextInput
          placeholder="Ingredients"
          label={null}
          withAsterisk
          className="w-full"
          styles={{
            input: {
              // Border only on the left side
              borderRadius: "0.25rem 0 0 0.25rem",
            },
          }}
        />
        <Autocomplete
          data={unitOptions}
          onChange={handleUnitChange}
          label={null}
          placeholder="Unit"
          defaultValue=""
          className="w-24 bg-slate-500"
          styles={{
            input: {
              borderRadius: "0 0.25rem 0.25rem 0",
              backgroundColor: "#1f1f1f",
              color: "#fff",
            },
          }}
        />
      </section>
      <section className="">
        {showButton && (
          <button
            className="ml-2 mt-2 flex items-center gap-x-2 text-blue-500 focus:outline-none"
            onClick={addInput}
          >
            <span>New Ingredient</span>
            <PlusCircledIcon />
          </button>
        )}
      </section>
    </div>
  );
};

export default IngredientInput;
