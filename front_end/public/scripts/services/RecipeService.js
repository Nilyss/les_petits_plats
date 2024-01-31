class RecipeService extends ApiCalls {
  constructor() {
    super()
    this.recipes = null
    this.recipeFactory = new RecipeFactory()
    this.filterFactory = new FilterFactory()
  }

  // ********** GET METHOD **********
  async getRecipes() {
    if (this.recipes) return this.recipes

    const req = await this.fetch('/recipes.json')

    // small logger to check the number of recipes fetched
    if (req) {
      let recipesLength = req.recipes.length
      if (recipesLength === 0) return console.error('No recipes fetched')
      console.log(`${recipesLength} recipes fetched`)
    }

    this.recipes = req.recipes.map((recipe) =>
      this.recipeFactory.createRecipe(recipe)
    )

    /* create a new array with all the ingredients, appliances and ustensils, without duplicates
     toLowerCase() is used to avoid duplicates with different case
     then capitalize the first letter of each first word
    */
    function extractUniqueValues(recipes, targetArray, property) {
      const values = []

      recipes.forEach((recipe) => {
        switch (true) {
          case Array.isArray(recipe):
            recipe.forEach((item) => {
              const itemProperty = item[property]

              // Check if property exists in item
              if (!itemProperty) {
                const itemName = item.toLowerCase()
                if (
                  !values.some(
                    (existingItem) =>
                      existingItem && existingItem.toLowerCase() === itemName
                  )
                ) {
                  values.push(item)
                }
              } else {
                const itemName = itemProperty.toLowerCase()
                if (
                  !values.some(
                    (existingItem) => existingItem.toLowerCase() === itemName
                  )
                ) {
                  values.push(itemProperty)
                }
              }
            })
            break

          default:
            const itemProperty = recipe[property]
            if (itemProperty) {
              // Check if property exists in item
              const itemName = itemProperty.toLowerCase()
              if (
                !values.some(
                  (existingItem) => existingItem.toLowerCase() === itemName
                )
              ) {
                values.push(itemProperty)
              }
            }
        }
      })

      // Change the case of first letters to uppercase
      const capitalizedValues = values.map((item) => {
        return item.charAt(0).toUpperCase() + item.slice(1)
      })

      targetArray.push(...capitalizedValues)
    }

    const ingredients = []
    const appliances = []
    const ustensils = []

    const getIngredients = this.recipes.map((recipe) => recipe.ingredients)
    const getAppliances = this.recipes.map((recipe) => recipe)
    const getUstensils = this.recipes.map((recipe) => recipe.ustensils)

    extractUniqueValues(getIngredients, ingredients, 'ingredient')
    extractUniqueValues(getAppliances, appliances, 'appliance')
    extractUniqueValues(getUstensils, ustensils, 'ustensils')

    return {
      recipes: this.recipes,
      ingredients,
      appliances,
      ustensils,
    }
  }

  async findRecipesByFilters(selectedFilters, currentRecipeList) {

    console.log(currentRecipeList)

    let recipes
    const matchedRecipes = []

    // if recipes already filtered, compare filter from filtered recipes
    // else, fetch all recipes and compare then to filter

    if (selectedFilters.length >= 2 || currentRecipeList) {
      recipes = currentRecipeList
      // keep only the last filter from Array, the currentRecipeList is already filtered
      selectedFilters.splice(0, selectedFilters.length - 1)
    } else {
      const req = await this.getRecipes()
      recipes = req.recipes
    }

    if (recipes) {
      recipes.forEach((recipe) => {
        const { appliance, ingredients, ustensils } = recipe
        const lowerCaseFilters = selectedFilters.map((filter) =>
              filter.toLowerCase()
        )

        const isMatched =
          appliance.toLowerCase().includes(lowerCaseFilters) ||
          ingredients.some((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(lowerCaseFilters)
          ) ||
          ustensils.some((utensil) =>
            utensil.toLowerCase().includes(lowerCaseFilters)
          )

        if (isMatched) {
          matchedRecipes.push(recipe)
          return matchedRecipes.map((recipe) =>
            this.recipeFactory.createRecipe(recipe)
          )
        }
      })

      const index = new Index()
      await index.displayRecipes(matchedRecipes)
      await index.displayNumberOfRecipes(matchedRecipes)
      return matchedRecipes
    }
  }

  async findRecipesBySearch(search) {
    if (search) {
      this.recipes = await this.getRecipes()
      const matchedRecipes = []
      if (this.recipes) {
        this.recipes.forEach((recipe) => {
          const { name, appliance, ingredients, ustensils } = recipe
          const lowerCaseSearch = search.toLowerCase()

          const isMatched =
            name.toLowerCase().includes(lowerCaseSearch) ||
            appliance.toLowerCase().includes(lowerCaseSearch) ||
            ingredients.some((ingredient) =>
              ingredient.ingredient.toLowerCase().includes(lowerCaseSearch)
            ) ||
            ustensils.some((utensil) =>
              utensil.toLowerCase().includes(lowerCaseSearch)
            )

          if (isMatched) {
            matchedRecipes.push(recipe)
            return matchedRecipes.map((recipe) =>
              this.recipeFactory.createRecipe(recipe)
            )
          }
        })

        sessionStorage.setItem('matchedRecipes', JSON.stringify(matchedRecipes))
        return matchedRecipes
      }
    }
  }
}
