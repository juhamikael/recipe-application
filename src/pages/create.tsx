import { useState } from "react";
import axios from "axios";
import {
  rem,
  Switch,
  Tabs,
  Textarea,
  TextInput,
  type TabsProps,
  type MantineTheme,
} from "@mantine/core";

import CustomSlider from "~/components/Slider";
import {
  allergens,
  cuisines,
  dishTypes,
  restrictions,
  restrictionsIcons,
} from "~/utils/foodFilterData";
import CustomSelect from "~/components/CustomSelect";
import IngredientInput from "~/components/Recipe/create/IngredientInput";
import InstructionInput from "~/components/Recipe/create/InstructionInput";

const Create = () => {
  const [recipeValues, setRecipeValues] = useState({});
  const [ingredients, setIngredients] = useState([
    { key: 0, showButton: true },
  ]);
  const [instructions, setInstructions] = useState([
    { key: 0, showButton: true },
  ]);

  const addInstructionInput = () => {
    const newKey = instructions.length;
    setInstructions((prevState) => [
      ...prevState.map((inst) => ({ ...inst, showButton: false })),
      { key: newKey, showButton: true },
    ]);
  };

  const addIngredientInput = () => {
    const newKey = ingredients.length;
    setIngredients((prevState) => [
      ...prevState.map((ing) => ({ ...ing, showButton: false })),
      { key: newKey, showButton: true },
    ]);
  };

  const handleCookTime = (value: number) => {
    console.log(value);
    setRecipeValues({ ...recipeValues, cookTime: value });
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
              <TextInput placeholder="Title" label={null} withAsterisk />
              <Textarea
                placeholder="Description"
                label={null}
                withAsterisk
                autosize
                minRows={4}
              />
              <CustomSlider
                label="Cook Time"
                defaultValue={0}
                steps={1}
                onChange={handleCookTime}
                value={recipeValues.cookTime}
                max={120}
                type="time"
              />
              <CustomSlider data={dishTypes} label="Dish type" steps={25} />

              <CustomSelect label="Cuisine" data={cuisines} type="single" />
              <CustomSelect label="Allergens" data={allergens} type="multi" />
              <CustomSelect
                label="Restrictions"
                data={restrictions}
                type="multi"
              />
              <div className="mt-4 flex flex-row gap-x-3">
                <p>Vegan</p>
                <Switch />
              </div>
            </div>
          </section>
        </Tabs.Panel>

        <Tabs.Panel value="ingredients" pt="xs">
          <section className="flex justify-center">
            <div className="flex w-1/3 flex-col gap-y-4">
              <p className="text-2xl font-bold">Ingredients</p>

              {ingredients.map((ingredient) => (
                <IngredientInput
                  key={ingredient.key}
                  addInput={addIngredientInput}
                  showButton={ingredient.showButton}
                />
              ))}
            </div>
          </section>
        </Tabs.Panel>

        <Tabs.Panel value="instructions" pt="xs">
          <section className="flex justify-center">
            <div className="flex w-1/3 flex-col gap-y-4">
              <p className="text-2xl font-bold">Instructions</p>

              {instructions.map((instruction) => (
                <InstructionInput
                  key={instruction.key}
                  addInput={addInstructionInput}
                  showButton={instruction.showButton}
                />
              ))}
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
