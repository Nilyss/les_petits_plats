class Index extends Utils {
  constructor() {
    super()
    this.recipeService = new RecipeService()
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

  async renderRecipes() {
    if (this.recipes) {
      // const test = document.querySelector('main');
      // this.recipes.forEach((recipe) => {
      //   console.log(recipe);
      // TODO: NEW RECIPE CARD DIRECT FROM FACTORY
      // const recipeCard = new RecipeCard(recipe);
      // test.innerHTML += `
      //   <p>${recipe.name}</p>
      // `
      // });
    }
  }

  async displayNumberOfRecipes() {
    if (this.recipes) {
      const numberOfRecipes = this.recipes.length
      const numberOfRecipesElement = document.querySelector('.numberOfRecipes')
      const unsafeText = numberOfRecipes + ' recettes'
      // remove the escapement for avoiding the html injection
      numberOfRecipesElement.innerHTML = await this.safeText(unsafeText)
    }
  }

  async displayIngredients() {
    if (this.ingredients) {
      const ingredientsElement = document.querySelector('.ingredientsWrapper')
      this.ingredients.forEach((ingredient) => {
        const listItem = document.createElement('li')
        const paragraph = document.createElement('p')
        const ingredientText = document.createTextNode(ingredient)
        paragraph.appendChild(ingredientText)
        listItem.appendChild(paragraph)
        ingredientsElement.appendChild(listItem)
      })
    }
  }
  async displayAppliances() {
    if (this.appliances) {
      const appliancesElement = document.querySelector('.appliancesWrapper')
      this.appliances.forEach((appliance) => {
        const listItem = document.createElement('li')
        const paragraph = document.createElement('p')
        const applianceText = document.createTextNode(appliance)
        paragraph.appendChild(applianceText)
        listItem.appendChild(paragraph)
        appliancesElement.appendChild(listItem)
      })
    }
  }

  async displayUstensils() {
    if (this.ustensils) {
      const ustensilsElement = document.querySelector('.ustensilsWrapper')
      this.ustensils.forEach((ustensil) => {
        const listItem = document.createElement('li')
        const paragraph = document.createElement('p')
        const ustensilText = document.createTextNode(ustensil)
        paragraph.appendChild(ustensilText)
        listItem.appendChild(paragraph)
        ustensilsElement.appendChild(listItem)
      })
    }
  }

  async render() {
    await this.getDatas()
    await this.renderRecipes()
    await this.displayNumberOfRecipes()
    await this.displayIngredients()
    await this.displayAppliances()
    await this.displayUstensils()
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
