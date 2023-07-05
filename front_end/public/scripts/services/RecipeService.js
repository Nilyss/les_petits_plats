class RecipeService extends ApiCalls {
  constructor() {
    super()
    this.recipes = null
    this.recipeFactory = new RecipeFactory()
  }

  // ********** GET METHOD **********
  async getRecipes() {
    if (this.recipes) return this.recipes

    const req = await this.fetch('/recipes.json')
    console.log(req)

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
}
