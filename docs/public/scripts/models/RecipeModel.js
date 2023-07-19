class RecipeModel {
  constructor(recipe) {
    this.id = recipe.id
    this.name = recipe.name
    this.appliance = recipe.appliance
    this.ustensils = recipe.ustensils
    this.description = recipe.description
    this.image = recipe.image
    this.time = recipe.time
    this.servings = recipe.servings
    this.ingredients = recipe.ingredients.map(
      (ingredient) => new IngredientModel(ingredient)
    )
  }
}

class IngredientModel {
  constructor(ingredient) {
    this.ingredient = ingredient.ingredient
    this.quantity = ingredient.quantity
    this.unit = ingredient.unit
  }
}
