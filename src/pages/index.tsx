import { type NextPage } from "next";
import Head from "next/head";
import { Icon } from "@iconify/react";

import { Input, Switch, Rating } from "@mantine/core";
import {
  allergens,
  cuisines,
  dishTypes,
  restrictions,
  restrictionsIcons,
  times,
} from "~/utils/foodFilterData";

import CustomSlider from "~/components/Slider";
import CustomSelect from "~/components/CustomSelect";
import { useEffect, useState } from "react";

import type { IRecipe, IRecipesProps } from "~/utils/types";
import { Capitalize } from "~/utils/helpers";
import Link from "next/link";
import { api } from "~/utils/api";
const Recipes: React.FC<IRecipesProps> = ({ recipes }) => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <div className="mr-10 mt-10 grid h-fit grid-cols-2 gap-6 text-white ">
      {recipes &&
        recipes.map((recipe: IRecipe) => {
          console.log("Recipe", recipe);
          return (
            <Link
              href={`/recipe/${recipe.id}`}
              key={recipe.id}
              className="zoom rounded-lg border border-white/20 p-5 "
            >
              <div className="flex flex-col gap-y-2">
                <div className="text-2xl font-bold">{recipe.title}</div>
                <Rating
                  readOnly
                  name="half-rating"
                  value={recipe.rating}
                  fractions={2}
                />
                <div>
                  <span className="font-bold">Cook time: </span>
                  <span className="italic">{recipe.cookTime}</span>
                </div>
                <div>
                  <span className="font-bold">Cuisine </span>
                  <span className="italic">
                    {Capitalize(recipe.cuisine)} food
                  </span>
                </div>
                <div className="flex flex-row space-x-2 ">
                  {recipe.dishType.map((dish) => {
                    return (
                      <div
                        key={dish.name}
                        className="rounded-xl bg-green-700 px-2 py-1"
                      >
                        {Capitalize(dish.name)}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 flex gap-x-3 font-bold">
                  <span>For Vegans</span>
                  {recipe.vegan ? (
                    <div className="text-green-400">Yes</div>
                  ) : (
                    <div className="text-red-400">No</div>
                  )}
                </div>
                <div className="flex gap-x-2">
                  {recipe.allergens.length === 0 ? (
                    <div className="flex items-center gap-x-2 font-bold">
                      <span>No Restrictions</span>
                      <Icon icon="twemoji:face-savoring-food" />
                    </div>
                  ) : (
                    recipe.allergens.map((allergen) => {
                      const icon = restrictionsIcons[allergen.name];
                      return (
                        <div key={allergen.name}>
                          <Icon icon={icon as string} width={20} height={20} />
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const { data, isLoading } = api.createRecipe.findMany.useQuery();

  const [filter, setFilter] = useState({
    title: "",
    time: 0,
    dishType: [],
    cuisine: [],
    vegan: false,
    allergens: [],
  });

  // .query(async ({ ctx, input }) => {
  //   const recipes = await ctx.prisma.recipe.findMany({
  //     where: {
  //       title: {
  //         contains: input.name,
  //         mode: "insensitive",
  //       },
  //       cookTime: {
  //         lte: input.cookTime,
  //       },
  //       dishType: {
  //         equals: input.dishType,
  //       },
  //       cuisine: {
  //         equals: input.cuisine,
  //       },
  //       allergens: {
  //         hasEvery: input.allergens,
  //       },
  //       restrictions: {
  //         hasEvery: input.restrictions,
  //       },
  //       vegan: {
  //         equals: input.vegan,
  //       },
  //     },
  //     include: {
  //       ingredients: true,
  //       instructions: true,
  //     },
  //   });

  // const searchRecipe = api.createRecipe.

  // if any of the filter fields change search
  // useEffect(() => {
  //   searchRecipe();
  // }, [filter]);
  // const filterRecipes = api.createRecipe.findByRules.useQuery({
  //   title: filter.title,
  //   time: filter.time,
  //   dishType: filter.dishType,
  //   cuisine: filter.cuisine,
  //   vegan: filter.vegan,
  //   allergens: filter.allergens,
  // });

  useEffect(() => {
    if (!isLoading) {
      setRecipes(data);

      console.log("Recipes", recipes);
    }
  }, [data, isLoading]);

  if (isLoading) return <div>Loading...</div>;

  console.log("Recipes", data);
  return (
    <>
      <Head>
        <title>Recipe App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid min-h-screen grid-cols-2 flex-col">
        <section className="mt-10">
          <div className="flex justify-center">
            <div className="w-[70%] flex-col gap-3">
              <div className="flex flex-col gap-y-2 text-start text-4xl font-bold text-white">
                <div className="flex flex-row items-center gap-x-4">
                  <Icon icon="material-symbols:search" />
                  <div>
                    <div className="text-3xl">Search for a recipe</div>
                    <div className="text-xl font-normal">
                      Search recipes by name or ingredient
                    </div>
                  </div>
                </div>
                <Input placeholder="Search for a recipe" />
                <button
                  id="filter-button"
                  className="h-8 rounded-md bg-blue-700 text-sm hover:bg-blue-500"
                  onClick={() => setFilterOpen(!filterOpen)}
                >
                  Filter
                </button>
              </div>

              {filterOpen && (
                <>
                  <div className="flex flex-col gap-y-8 text-white">
                    <CustomSlider
                      data={times}
                      label="Cooking time under:"
                      steps={25}
                    />
                    <CustomSlider
                      data={dishTypes}
                      label="Dish type"
                      steps={25}
                    />
                  </div>
                  <div className="my-10 flex flex-col gap-y-2 text-white">
                    <CustomSelect
                      data={cuisines}
                      label="Cuisine"
                      type="single"
                    />
                    <CustomSelect
                      data={allergens}
                      label="Food Allergens"
                      type="multi"
                    />
                    <CustomSelect
                      data={restrictions}
                      label="Food Restrictions"
                      type="multi"
                    />
                    <div className="mt-2 flex gap-x-3">
                      <Switch label={null} />
                      <div>Vegan / Vegetarian </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
        <Recipes recipes={recipes} />
      </main>
    </>
  );
};

export default Home;
