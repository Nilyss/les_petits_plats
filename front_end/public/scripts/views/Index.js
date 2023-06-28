class Index {
  constructor() {
    this.recipeService = new RecipeService();
    this.recipes = null
  }

  async getRecipes() {
    if(!this.recipes) {
      this.recipes = await this.recipeService.getRecipes();
    }
  }

  async renderRecipes() {
    if(this.recipes) {
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

  async render() {
    await this.getRecipes();
    await this.renderRecipes();
  }
}

const index = new Index();
index.render()
  .then(() => {
  console.log('Index rendered');
}).catch((err) => {
  console.log("Index can't be rendered : ",err);
});