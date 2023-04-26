import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const cuisineEnum = z.enum([
  "global",
  "african",
  "chinese",
  "japanese",
  "korean",
  "vietnamese",
  "thai",
  "indian",
  "british",
  "irish",
  "french",
  "italian",
  "mexican",
  "spanish",
  "middle_eastern",
  "jewish",
  "american",
  "cajun",
  "southern",
  "greek",
  "german",
  "nordic",
  "eastern_european",
  "caribbean",
  "latin_american",
]);

const dishTypeEnum = z.enum([
  "breakfast",
  "lunch",
  "dinner",
  "dessert",
  "snack",
]);

const allergensEnum = z.array(
  z.enum([
    "gluten",
    "dairy",
    "peanuts",
    "tree_nuts",
    "soy",
    "shellfish",
    "fish",
    "eggs",
    "peanut",
    "tree_nut",
    "egg",
    "wheat",
  ])
);

const restrictionsEnum = z.array(z.enum(["gluten", "lactose", "egg"]));

const RecipeInput = z.object({
  createdBy: z.string(),
  title: z.string(),
  description: z.string(),
  cookTime: z.number(),
  dishType: dishTypeEnum,
  cuisine: cuisineEnum,
  allergens: allergensEnum,
  restrictions: restrictionsEnum,
  vegan: z.boolean(),
  ingredients: z.array(
    z.object({
      ingredient: z.string(),
      amount: z.number(),
      unit: z.string(),
    })
  ),
  instructions: z.array(
    z.object({
      value: z.string(),
    })
  ),
});

export const recipeRouter = createTRPCRouter({
  findMany: publicProcedure.query(async ({ ctx }) => {
    const recipes = await ctx.prisma.recipe.findMany({
      include: {
        ingredients: true,
        instructions: true,
      },
    });

    return recipes;
  }),

  findById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const recipe = await ctx.prisma.recipe.findUnique({
        where: {
          id: input.id,
        },
        include: {
          ingredients: true,
          instructions: true,
        },
      });

      return recipe;
    }),

  findByRules: publicProcedure
    .input(
      z.object({
        name: z.string(),
        cookingTime: z.number(),
        dishType: dishTypeEnum,
        cuisine: cuisineEnum,
        allergens: allergensEnum,
        restrictions: restrictionsEnum,
        vegan: z.boolean(),
      })
    )
    .query(async ({ ctx, input }) => {
      const recipes = await ctx.prisma.recipe.findMany({
        where: {
          title: {
            contains: input.name,
            mode: "insensitive",
          },
          cookTime: {
            lte: input.cookTime,
          },
          dishType: {
            equals: input.dishType,
          },
          cuisine: {
            equals: input.cuisine,
          },
          allergens: {
            hasEvery: input.allergens,
          },
          restrictions: {
            hasEvery: input.restrictions,
          },
          vegan: {
            equals: input.vegan,
          },
        },
        include: {
          ingredients: true,
          instructions: true,
        },
      });

      return recipes;
    }),

  create: publicProcedure
    .input(RecipeInput)
    .mutation(async ({ ctx, input }) => {
      const recipe = await ctx.prisma.recipe.create({
        data: {
          title: input.title,
          description: input.description,
          allergens: input.allergens,
          cookTime: input.cookTime,
          cuisine: input.cuisine,
          createdBy: input.createdBy,
          vegan: input.vegan,
          ingredients: {
            create: input.ingredients.map((ingredient) => ({
              ingredient: ingredient.ingredient,
              amount: ingredient.amount,
              unit: ingredient.unit,
            })),
          },
          instructions: {
            create: input.instructions.map((instruction, index) => ({
              step: index + 1,
              text: instruction.value,
            })),
          },
        },
      });

      return recipe;
    }),
});
