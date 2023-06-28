class RecipeModel {
  constructor(recipe) {
    this.id = recipe.id;
    this.name = recipe.name;
    this.appliance = recipe.appliance;
    this.description = recipe.description;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
  }
}