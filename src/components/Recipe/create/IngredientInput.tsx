import { useState } from "react";
import { TextInput, Autocomplete, NumberInput } from "@mantine/core";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

type IProps = {
  addInput: () => void;
  showButton: boolean;
  removeInput: (key: number) => void;
  inputKey: number;
  ingredientsLength: number;
  onChange: (
    key: number,
    value: { ingredient: string; amount: number; unit: string }
  ) => void;
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
  onChange,
  removeInput,
  showButton,
  ingredientsLength,
}) => {
  const [selectedUnit, setSelectedUnit] = useState<string>(
    unitOptions[0]?.value || "g"
  );

  const [ingredient, setIngredient] = useState("");
  const [amount, setAmount] = useState(0);

  const handleUnitChange = (value: string) => {
    setSelectedUnit(value);
    onChange(inputKey, { ingredient: ingredient, amount: amount, unit: value });
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
            placeholder="Ingredient"
            label={null}
            withAsterisk
            className="w-full"
            onChange={(event) => {
              setIngredient(event.target.value);
              onChange(inputKey, {
                ingredient: event.target.value,
                amount: amount,
                unit: selectedUnit,
              });
            }}
            styles={{
              input: {
                borderRadius: "0.25rem 0 0 0.25rem",
              },
            }}
          />
          <NumberInput
            label={null}
            placeholder="Amount"
            className="w-30"
            value={amount}
            onChange={(value) => {
              setAmount(value || 0);
              onChange(inputKey, {
                ingredient: ingredient,
                amount: value || 0,
                unit: selectedUnit,
              });
            }}
            styles={{
              input: {
                borderRadius: "0 0 0 0",
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
