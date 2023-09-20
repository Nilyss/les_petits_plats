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

  async displayNumberOfRecipes(recipesBySearch) {
    const numberOfRecipesElement = document.querySelector('.numberOfRecipes')
    let numberOfRecipes
    if (recipesBySearch) {
      numberOfRecipes = recipesBySearch.length
    } else if (this.recipes) {
      numberOfRecipes = this.recipes.length
    } else {
      return // No recipes or recipesBySearch provided, nothing to display.
    }

    /**
     * Remove the escapement for avoiding the html injection
     * @see Utils.js#safeText
     */
    const unsafeText = numberOfRecipes + ' recettes'
    numberOfRecipesElement.innerHTML = await this.safeText(unsafeText)
  }

  async displayFiltersList() {
    /**
     * @param {Array} items
     * @returns {Promise}
     * @see FilterFactory.js#renderFilters
     */
    await this.filterFactory.renderFilters(
      this.ingredients,
      'ingredientsWrapper'
    )
    await this.filterFactory.renderFilters(this.appliances, 'appliancesWrapper')
    await this.filterFactory.renderFilters(this.ustensils, 'ustensilsWrapper')
  }

  async displaySelectedFilters() {
    /**
     * @see FilterFactory.js#renderSelectedFilters
     */
    await this.filterFactory.renderSelectedFilters()
  }

  async displayRecipes(recipesBySearch) {
    this.recipesWrapper = document.querySelector('.recipesWrapper')
    const recipesToDisplay = recipesBySearch || this.recipes
    /**
     * @see RecipeFactory.js#renderRecipe
     */
    if (recipesToDisplay) {
      this.recipesWrapper.innerHTML = ''
      recipesToDisplay.forEach((recipeData) => {
        this.recipeFactory.renderRecipe(recipeData, this.recipesWrapper)
      })
    }
  }

  async initEventListeners() {
    const searchInput = document.querySelector('.searchBar')
    const search = async (e) => {
      if (e.target.value.length > 2) {
        const matchedRecipe = await this.recipeService.findRecipesBySearch(
          e.target.value
        )
        await this.displayRecipes(matchedRecipe)
        await this.displayNumberOfRecipes(matchedRecipe)
      }
      if (e.target.value.length === 0) {
        await this.displayRecipes()
        await this.displayNumberOfRecipes()
      }
    }
    searchInput.addEventListener('input', search)
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
