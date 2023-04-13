import { Textarea } from "@mantine/core";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

type IProps = {
  addInput: () => void;
  showButton: boolean;
  value: string;
  onChange: (key: number, value: string) => void;
  step: number;
  removeInput: (key: number) => void;
  inputKey: number;
  instructionsLength: number;
};

const InstructionInput: React.FC<IProps> = ({
  addInput,
  inputKey,
  onChange,
  removeInput,
  showButton,
  step,
  value,
  instructionsLength,
}) => {
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
        <div className="flex flex-row items-center">
          <p className="text-lg font-bold">Step {step}</p>
          {instructionsLength > 1 && (
            <button
              className="flex items-center rounded-full  p-1 text-red-500 focus:outline-none"
              onClick={() => removeInput(inputKey)}
            >
              <Icon icon="mdi:trash-can-empty" height={30} />
            </button>
          )}
        </div>
        <section>
          <div className="relative">
            <Textarea
              placeholder="Instructions"
              label={null}
              withAsterisk
              autosize
              minRows={4}
              onChange={(event) =>
                onChange(inputKey, event.currentTarget.value)
              }
              value={value}
              styles={{
                input: {
                  borderRadius: "0.25rem",
                },
              }}
            />
          </div>
        </section>
        <section>
          {showButton && (
            <button
              className="ml-2 mt-2 flex items-center gap-x-2 text-blue-500 focus:outline-none"
              onClick={addInput}
            >
              <span>New Step</span>
              <PlusCircledIcon />
            </button>
          )}
        </section>
      </div>
    </motion.div>
  );
};

export default InstructionInput;
