import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import type { IRecipe } from "~/utils/types";
import RecipeCard from "~/components/Recipe/SingleRecipe";

const Recipe = () => {
  const [recipe, setRecipe] = useState<IRecipe | null>(null);
  const router = useRouter();
  const { recipeSlug } = router.query;

  const fetchRecipe = useCallback(async () => {
    // Await recipeslug
    if (!recipeSlug) return;
    if (typeof recipeSlug !== "string") return;

    try {
      const res = await axios.get(
        `http://localhost:3001/recipes/${recipeSlug}`
      );
      setRecipe(res.data as IRecipe);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  }, [recipeSlug]);

  useEffect(() => {
    void fetchRecipe();
  }, [fetchRecipe]);
  if (!recipe) return <div>Loading...</div>;
  return (
    <>
      <RecipeCard recipe={recipe} />
    </>
  );
};

export default Recipe;
