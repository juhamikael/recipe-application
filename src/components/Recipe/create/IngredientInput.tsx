import { useState } from "react";
import { TextInput, Autocomplete } from "@mantine/core";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

type IProps = {
  addInput: () => void;
  showButton: boolean;
  removeInput: (key: number) => void;
  inputKey: number;
  ingredientsLength: number;
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

const IngredientInput: React.FC<IProps> = ({
  addInput,
  inputKey,
  removeInput,
  showButton,
  ingredientsLength,
}) => {
  const [selectedUnit, setSelectedUnit] = useState(unitOptions[0].value);

  const handleUnitChange = (value: string) => {
    setSelectedUnit(value);
  };
  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
      transition={{ ease: "easeOut", duration: 0.3 }}
    >
      <div className="flex flex-col gap-x-2">
        <section className="flex flex-row">
          <TextInput
            placeholder="Ingredients"
            label={null}
            withAsterisk
            className="w-full"
            styles={{
              input: {
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
          {ingredientsLength > 1 && (
            <button
              className="ml-2 flex items-center text-red-500 focus:outline-none"
              onClick={() => removeInput(inputKey)}
            >
              <Icon icon="mdi:trash-can-empty" height={25} />
            </button>
          )}
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
    </motion.div>
  );
};

export default IngredientInput;
