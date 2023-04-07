import React from "react";
import type { IRecipesProps } from "~/utils/types";
import { Capitalize } from "~/utils/helpers";
import { Icon } from "@iconify/react";
import { restrictionsIcons } from "~/utils/foodFilterData";
import Options from "./Options";
import { Rating, Table } from "@mantine/core";

const RecipeCards: React.FC<IRecipesProps> = ({ recipe }) => {
  if (!recipe) return <div>Loading...</div>;

  const ths = (
    <tr>
      <th>Name</th>
      <th>Amount</th>
    </tr>
  );

  const rows = recipe?.ingredients.map((element) => (
    <tr key={element.name} className="hover:bg-white/10">
      <td>{Capitalize(element.name)}</td>
      <td>{element.amount}</td>
    </tr>
  ));

  console.log(recipe);
  return (
    <div className="mt-10 flex items-center justify-center space-y-8">
      <div className="grid w-2/3 grid-cols-2 gap-8">
        <div className="grid">
          <div>
            <section>
              <div className="rounded-lg  py-5">
                <div className="mb-4 text-4xl font-bold underline">
                  {recipe.title}
                </div>

                <div className="flex flex-col gap-y-2 ">
                  <Rating readOnly value={recipe.rating} fractions={2} />
                  <Options type="Cook time" value={recipe.cookTime} />
                  <Options type="Cuisine" value={Capitalize(recipe.cuisine)} />
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
                        <span>No Allergens</span>
                        <Icon icon="twemoji:face-savoring-food" />
                      </div>
                    ) : (
                      <>
                        <span className="font-bold">Allergens: </span>
                        {recipe.allergens.map((allergen) => {
                          const icon = restrictionsIcons[allergen.name];
                          return (
                            <div key={allergen.name}>
                              <Icon
                                icon={icon as string}
                                width={20}
                                height={20}
                              />
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <button
                className="zoom-minus h-12 w-full rounded-xl bg-blue-600 p-3 uppercase hover:bg-blue-400"
                onClick={() => window.history.back()}
              >
                <div className="ml-10 flex items-center justify-start gap-x-2">
                  <Icon icon="la:arrow-left" />
                  <span className="ml-2">Back</span>
                </div>
              </button>
            </section>

            <section>
              <Table
                captionSide="bottom"
                className="font-montserrat text-white"
                horizontalSpacing="xl"
              >
                <thead>{ths}</thead>
                <tbody>{rows}</tbody>
                <tfoot>{ths}</tfoot>
              </Table>
            </section>
          </div>
        </div>
        <section>
          {recipe.instructions.map((instruction) => {
            return (
              <div key={instruction.step} className="mt-5 flex flex-col">
                <div className="text-left text-xl font-bold underline">
                  Step {instruction.step}
                </div>
                <div className="">{instruction.text}</div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default RecipeCards;
