class Index extends Utils {
  constructor() {
    super()
    this.recipeService = new RecipeService()
    this.recipeFactory = new RecipeFactory()
    this.recipes = null
    this.ingredients = null
    this.ustensils = null
    this.appliances = null
  }

  async getDatas() {
    if (!this.recipes) {
      const getDatas = await this.recipeService.getRecipes()
      this.recipes = getDatas.recipes
      this.ingredients = getDatas.ingredients
      this.ustensils = getDatas.ustensils
      this.appliances = getDatas.appliances
    }
  }

  async displayRecipes() {
    if (this.recipes) {
      this.recipesWrapper = document.querySelector('.recipesWrapper')
      this.recipes.forEach((recipeData) => {
        return this.recipeFactory.renderRecipe(recipeData, this.recipesWrapper)
      })
    }
  }

  async displayNumberOfRecipes() {
    if (this.recipes) {
      const numberOfRecipes = this.recipes.length
      const numberOfRecipesElement = document.querySelector('.numberOfRecipes')
      const unsafeText = numberOfRecipes + ' recettes'
      /**
       * Remove the escapement for avoiding the html injection
       * @see Utils.js#safeText
       */
      numberOfRecipesElement.innerHTML = await this.safeText(unsafeText)
    }
  }

  async displayFilters() {
    /**
     * @param {Array} items
     * @returns {Promise<void>}
     * @see Utils.js#displayFiltersItems
     */
    await this.displayFiltersItems(this.ingredients, 'ingredientsWrapper')
    await this.displayFiltersItems(this.appliances, 'appliancesWrapper')
    await this.displayFiltersItems(this.ustensils, 'ustensilsWrapper')
  }

  async render() {
    await this.getDatas()
    await this.displayRecipes()
    await this.displayNumberOfRecipes()
    await this.displayFilters()
  }
}

const index = new Index()
index
  .render()
  .then(() => {
    console.log('Index rendered')
  })
  .catch((err) => {
    console.log("Index can't be rendered : ", err)
  })
