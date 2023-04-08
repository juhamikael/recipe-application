import { Textarea } from "@mantine/core";
import { PlusCircledIcon } from "@radix-ui/react-icons";

type IProps = {
  addInput: () => void;
  showButton: boolean;
};

const InstructionInput: React.FC<IProps> = ({ addInput, showButton }) => {
  return (
    <div className="flex flex-col gap-x-2">
      <section>
        <Textarea
          placeholder="Instructions"
          label={null}
          withAsterisk
          autosize
          minRows={4}
          styles={{
            input: {
              borderRadius: "0.25rem",
            },
          }}
        />
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
  );
};

export default InstructionInput;
