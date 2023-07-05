class RecipeModel {
  constructor(recipe) {
    this.id = recipe.id;
    this.name = recipe.name;
    this.appliance = recipe.appliance;
    this.ustensils = recipe.ustensils;
    this.description = recipe.description;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
  }
}