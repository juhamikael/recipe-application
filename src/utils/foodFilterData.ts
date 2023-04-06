export type RestrictionsIcons = {
  [key: string]: string;
};

const times = [
  { value: 0, label: "10m" },
  { value: 25, label: "20m" },
  { value: 50, label: "30m" },
  { value: 75, label: "1h" },
  { value: 100, label: "2h" },
];
const dishTypes = [
  { value: 0, label: "Breakfast" },
  { value: 25, label: "Lunch" },
  { value: 50, label: "Dinner" },
  { value: 75, label: "Dessert" },
  { value: 100, label: "Snack" },
];

const restrictions = [
  { value: "gluten", label: "Gluten" },
  { value: "lactose", label: "Lactose" },
  { value: "egg", label: "Egg" },
];
const allergens = [
  { value: "peanut", label: "Peanut" },
  { value: "tree-nut", label: "Tree Nut" },
  { value: "egg", label: "Egg" },
  { value: "fish", label: "Fish" },
  { value: "shellfish", label: "Shellfish" },
  { value: "soy", label: "Soy" },
  { value: "wheat", label: "Wheat" },
];
const cuisines = [
  { value: "global", label: "Global" },
  { value: "african", label: "African" },
  { value: "chinese", label: "Chinese" },
  { value: "japanese", label: "Japanese" },
  { value: "korean", label: "Korean" },
  { value: "vietnamese", label: "Vietnamese" },
  { value: "thai", label: "Thai" },
  { value: "indian", label: "Indian" },
  { value: "british", label: "British" },
  { value: "irish", label: "Irish" },
  { value: "french", label: "French" },
  { value: "italian", label: "Italian" },
  { value: "mexican", label: "Mexican" },
  { value: "spanish", label: "Spanish" },
  { value: "middle eastern", label: "Middle Eastern" },
  { value: "jewish", label: "Jewish" },
  { value: "american", label: "American" },
  { value: "cajun", label: "Cajun" },
  { value: "southern", label: "Southern" },
  { value: "greek", label: "Greek" },
  { value: "german", label: "German" },
  { value: "nordic", label: "Nordic" },
  { value: "eastern european", label: "Eastern European" },
  { value: "caribbean", label: "Caribbean" },
  { value: "latin american", label: "Latin American" },
];

const restrictionsIcons: RestrictionsIcons = {
  gluten: "mdi:gluten",
  lactose: "healthicons:animal-cow",
  egg: "ph:egg-crack-fill",
  vegetarian: "ion:leaf",
  vegan: "iconoir:vegan-circle",
};

export {
  allergens,
  cuisines,
  dishTypes,
  restrictions,
  restrictionsIcons,
  times,
};
