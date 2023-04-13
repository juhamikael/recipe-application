import { useEffect, useState } from "react";
import {
  rem,
  Switch,
  Tabs,
  Textarea,
  TextInput,
  type TabsProps,
} from "@mantine/core";
import { AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import CustomSlider from "~/components/Slider";
import {
  allergens,
  cuisines,
  dishTypes,
  restrictions,
} from "~/utils/foodFilterData";
import CustomSelect from "~/components/CustomSelect";
import IngredientInput from "~/components/Recipe/create/IngredientInput";
import InstructionInput from "~/components/Recipe/create/InstructionInput";
import { useRef } from "react";

interface Ingredient {
  key: number;
  showButton: boolean;
  showDelete: boolean;
}

interface Instruction {
  key: number;
  value: string;
  showButton: boolean;
  showDelete: boolean;
}

interface RecipeValues {
  createdBy: string;
  title: string;
  description: string;
  cookTime: number;
  dishType: string | number;
  cuisine: string;
  allergens: string[];
  restrictions: string[];
  vegan: boolean;
  ingredients: Ingredient[];
  instructions: Instruction[];
}

const Create = () => {
  const { user } = useUser();

  const [recipeValues, setRecipeValues] = useState<RecipeValues>({
    createdBy: "",
    title: "",
    description: "",
    cookTime: 0,
    dishType: "",
    cuisine: "",
    allergens: [],
    restrictions: [],
    vegan: false,
    ingredients: [],
    instructions: [],
  });

  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { key: 0, showButton: true, showDelete: false },
  ]);
  const [instructions, setInstructions] = useState<Instruction[]>([
    { key: 0, value: "", showButton: true, showDelete: false },
  ]);

  const nextIngredientKey = useRef(1);

  console.log(user?.username);
  console.log("Recipe", recipeValues);
  const addInstructionInput = () => {
    const newKey = instructions.length;
    setInstructions((prevState) => [
      ...prevState.map((inst) => ({
        ...inst,
        showButton: false,
        showDelete: true,
      })),
      { key: newKey, value: "", showButton: true, showDelete: true },
    ]);
  };

  useEffect(() => {
    if (user) {
      const clerkUserName = user.username ? user.username : "";
      const clerkName = user.fullName ? user.fullName : "";
      const clerkUserId = user.id ? user.id : "";
      const nameToUse = clerkName || clerkUserName || clerkUserId;
      setRecipeValues((prevState) => ({ ...prevState, createdBy: nameToUse }));
    }
  }, [user]);

  const updateInstruction = (key: number, value: string) => {
    setInstructions((prevState) => {
      const updatedInstructions = prevState.map((inst) => {
        if (inst.key === key) {
          return { ...inst, value };
        }
        return inst;
      });
      return updatedInstructions;
    });
  };

  const addIngredientInput = () => {
    const newKey = nextIngredientKey.current++;
    setIngredients((prevState) => [
      ...prevState.map((ing) => ({
        ...ing,
        showButton: false,
        showDelete: true,
      })),
      { key: newKey, showButton: true, showDelete: true },
    ]);
  };

  const removeInstructionInput = (key: number) => {
    if (instructions.length > 1) {
      setInstructions((prevState) => {
        const updatedInstructions = prevState.filter(
          (inst) => inst.key !== key
        );

        // Update the keys of the remaining instructions
        const rekeyedInstructions = updatedInstructions.map((inst, index) => ({
          ...inst,
          key: index,
        }));

        if (rekeyedInstructions.length > 0) {
          rekeyedInstructions[rekeyedInstructions.length - 1].showButton = true;
          if (rekeyedInstructions.length === 1) {
            rekeyedInstructions[0].showDelete = false;
          }
        }

        return rekeyedInstructions;
      });
    } else {
      // If there's only one instruction input left, reset its value and disable the delete button
      setInstructions([
        { key: 0, value: "", showButton: true, showDelete: false },
      ]);
    }
  };

  const removeIngredientInput = (key: number) => {
    if (ingredients.length > 1) {
      setIngredients((prevState) => {
        const updatedIngredients = prevState.filter(
          (ingredient) => ingredient.key !== key
        )!;

        if (updatedIngredients.length > 0) {
          updatedIngredients[updatedIngredients.length - 1].showButton = true;
          if (updatedIngredients.length === 1) {
            updatedIngredients[0].showDelete = false;
          }
        }

        return updatedIngredients;
      });
    } else {
      // If there's only one ingredient input left, reset its state and disable the delete button
      setIngredients([{ key: 0, showButton: true, showDelete: false }]);
      nextIngredientKey.current = 1;
    }
  };

  const handleCookTime = (value: number) => {
    console.log("Cook time", value);
    setRecipeValues((prevState) => ({ ...prevState, cookTime: value }));
  };

  const handleDishType = (value: string | number) => {
    console.log("Dish type value:", value);
    setRecipeValues((prevState) => ({ ...prevState, dishType: value }));
  };

  return (
    <div>
      <StyledTabs defaultValue="recipe-basics" className="my-5">
        <Tabs.List className="flex justify-center">
          <Tabs.Tab value="recipe-basics">Recipe Basics</Tabs.Tab>
          <Tabs.Tab value="ingredients">Ingredients</Tabs.Tab>
          <Tabs.Tab value="instructions">Instructions</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="recipe-basics" pt="xs">
          <section className="flex justify-center">
            <div className="flex w-1/3 flex-col gap-y-4">
              <p className="text-2xl font-bold">Recipe basics</p>
              <TextInput
                placeholder="Title"
                label={null}
                withAsterisk
                value={recipeValues.title}
                onChange={(e) =>
                  setRecipeValues({
                    ...recipeValues,
                    title: e.currentTarget.value,
                  })
                }
              />
              <Textarea
                placeholder="Description"
                label={null}
                withAsterisk
                autosize
                minRows={4}
                value={recipeValues.description}
                onChange={(e) =>
                  setRecipeValues({
                    ...recipeValues,
                    description: e.currentTarget.value,
                  })
                }
              />
              <CustomSlider
                label="Cook Time"
                defaultValue={0}
                steps={1}
                value={recipeValues.cookTime}
                onChange={(value) => handleCookTime(value)}
                max={120}
                type="time"
              />
              <CustomSlider
                label="Dish Type"
                defaultValue={0}
                steps={1}
                max={4}
                marks={["Breakfast", "Lunch", "Dinner", "Dessert", "Snack"]}
                value={recipeValues.dishType}
                onChange={(value) => handleDishType(value)}
              />

              <CustomSelect
                label="Cuisine"
                data={cuisines}
                type="single"
                value={recipeValues.cuisine}
                onChange={(value) => {
                  setRecipeValues({ ...recipeValues, cuisine: value });
                }}
              />
              <CustomSelect
                label="Allergens"
                data={allergens}
                type="multi"
                value={recipeValues.allergens}
                onChange={(value) => {
                  setRecipeValues({ ...recipeValues, allergens: value });
                }}
              />
              <CustomSelect
                label="Restrictions"
                data={restrictions}
                type="multi"
                value={recipeValues.restrictions}
                onChange={(value) => {
                  setRecipeValues({ ...recipeValues, restrictions: value });
                }}
              />
              <div className="mt-4 flex flex-row gap-x-3">
                <p>Vegan</p>
                <Switch
                  checked={recipeValues.vegan}
                  onChange={(e) => {
                    setRecipeValues({
                      ...recipeValues,
                      vegan: e.currentTarget.checked,
                    });
                  }}
                />
              </div>
            </div>
          </section>
        </Tabs.Panel>

        <Tabs.Panel value="ingredients" pt="xs">
          <section className="flex justify-center">
            <div className="flex w-1/3 flex-col gap-y-4">
              <p className="text-2xl font-bold">Ingredients</p>
              <AnimatePresence>
                {ingredients.map((ingredient) => (
                  <IngredientInput
                    key={ingredient.key}
                    inputKey={ingredient.key}
                    addInput={addIngredientInput}
                    showButton={ingredient.showButton}
                    removeInput={() => removeIngredientInput(ingredient.key)}
                    ingredientsLength={ingredients.length}
                  />
                ))}
              </AnimatePresence>
            </div>
          </section>
        </Tabs.Panel>

        <Tabs.Panel value="instructions" pt="xs">
          <section className="flex justify-center">
            <div className="flex w-1/3 flex-col gap-y-4">
              <p className="text-2xl font-bold">Instructions</p>
              <AnimatePresence>
                {instructions.map((instruction, index) => (
                  <InstructionInput
                    key={instruction.key}
                    inputKey={instruction.key}
                    addInput={addInstructionInput}
                    showButton={instruction.showButton}
                    value={instruction.value}
                    step={index + 1}
                    onChange={(key, value) => updateInstruction(key, value)}
                    removeInput={() => removeInstructionInput(instruction.key)}
                    instructionsLength={instructions.length}
                  />
                ))}
              </AnimatePresence>
            </div>
          </section>
        </Tabs.Panel>
      </StyledTabs>
    </div>
  );
};
export default Create;

function StyledTabs(props: TabsProps) {
  return (
    <Tabs
      unstyled
      styles={(theme) => ({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tab: {
          ...theme.fn.focusStyles(),
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[0]
              : theme.colors.orange[4],
          border: `${rem(1)} solid ${
            theme.colorScheme === "dark"
              ? theme.colors.orange[4]
              : theme.colors.orange[4]
          }`,
          padding: `${theme.spacing.xs} ${theme.spacing.md}`,
          cursor: "pointer",
          fontSize: theme.fontSizes.sm,
          display: "flex",
          alignItems: "center",

          "&:disabled": {
            opacity: 0.5,
            cursor: "not-allowed",
          },

          "&:not(:first-of-type)": {
            borderLeft: 0,
          },

          "&:first-of-type": {
            borderTopLeftRadius: theme.radius.md,
            borderBottomLeftRadius: theme.radius.md,
          },

          "&:last-of-type": {
            borderTopRightRadius: theme.radius.md,
            borderBottomRightRadius: theme.radius.md,
          },

          "&[data-active]": {
            backgroundColor: theme.colors.orange[7],
            borderColor: theme.colors.orange[7],
            color: theme.white,
          },
        },

        tabIcon: {
          marginRight: theme.spacing.xs,
          display: "flex",
          alignItems: "center",
        },

        tabsList: {
          display: "flex",
        },
      })}
      {...props}
    />
  );
}
