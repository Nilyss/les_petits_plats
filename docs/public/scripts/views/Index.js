class Index extends Utils {
  constructor() {
    super()
    this.recipeService = new RecipeService()
    this.filterFactory = new FilterFactory()
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

  async displayFiltersList() {
    /**
     * @param {Array} items
     * @returns {Promise}
     * @see FilterFactory.js#renderFilters
     */
    await this.filterFactory.renderFilters(this.ingredients, 'ingredientsWrapper')
    await this.filterFactory.renderFilters(this.appliances, 'appliancesWrapper')
    await this.filterFactory.renderFilters(this.ustensils, 'ustensilsWrapper')
  }

  async displaySelectedFilters() {
    /**
     * @see FilterFactory.js#renderSelectedFilters
     */
    await this.filterFactory.renderSelectedFilters()
  }

  async displayRecipes() {
    if (this.recipes) {
      this.recipesWrapper = document.querySelector('.recipesWrapper')
      this.recipes.forEach((recipeData) => {
        /**
         * @see RecipeFactory.js#renderRecipe
         */
        return this.recipeFactory.renderRecipe(recipeData, this.recipesWrapper)
      })
    }
  }

  async initEventListeners() {
      // TODO :
      // CHECK ON PAPER : ALGO
      /** @see Utils.js#getFilterName
       **/
  }

  async render() {
    await this.getDatas()
    await this.displayFiltersList()
    await this.displayNumberOfRecipes()
    await this.displayRecipes()
    await this.displaySelectedFilters()
    await this.initEventListeners()
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
