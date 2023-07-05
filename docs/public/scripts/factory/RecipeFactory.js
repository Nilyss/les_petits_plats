class RecipeFactory {
  constructor() {}

  createRecipe(recipe) {
    return new RecipeModel(recipe);
  }
}