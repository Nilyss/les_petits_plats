class RecipeService extends ApiCalls {
  constructor() {
    super();
    this.recipes = null;
    this.recipeFactory = new RecipeFactory();
  }

  // ********** GET METHOD **********
  async getRecipes() {
    if (this.recipes) return this.recipes

    const req = await this.fetch('/recipes.json')
    this.recipes = req.recipes.map((recipe) => this.recipeFactory.createRecipe(recipe))
    return this.recipes
  }
}