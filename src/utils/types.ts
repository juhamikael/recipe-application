// Types for Recipe Page and it's components
export interface IRecipe {
  id: number;
  title: string;
  cookTime: string;
  ingredients: Array<{ amount: string; name: string }>;
  instructions: Array<{ step: number; text: string }>;
  restrictions: Array<string>;
  cuisine: string;
  dishType: Array<{ name: string }>;
  allergens: Array<{ name: string }>;
  vegan: boolean;
  rating: number;
}
export interface IRecipesProps {
  recipes?: IRecipe[];
  recipe?: IRecipe;
}
