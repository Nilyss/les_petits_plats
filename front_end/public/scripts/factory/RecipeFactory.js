class RecipeFactory {
  constructor() {}

  createRecipe(recipe) {
    return new RecipeModel(recipe)
  }

  renderRecipe(recipeData, recipeWrapper) {
    const recipe = this.createRecipe(recipeData)

    const recipeElement = document.createElement('li');
    recipeElement.id = `recipe_${recipe.id}`;
    recipeElement.className = 'card';

    recipeElement.innerHTML += `
        <figure class='card__header'>
          <img class='card__header__img' src='./public/assets/images/mockupRecipesImgs/${recipe.image}' alt='recipe' />
          <figcaption class='card__header__duration'>${recipe.time}min</figcaption>
        </figure>
        <div class='card__body'>
          <h2 class='card__body__title'>${recipe.name}</h2>
          <h3 class='card__body__subtitle'>Recette</h3>
          <p class='card__body__description'>${recipe.description}</p>
          <h3 class='card__body__subtitle'>Ingrédients</h3>
          <ul class='card__body__ingredientsWrapper'></ul>
        </div>
    `

    const ingredientWrapper = recipeElement.querySelector('.card__body__ingredientsWrapper')
    recipe.ingredients.forEach((ingredients) => {
      const ingredientElement = document.createElement('li')

      if(!ingredients.unit) ingredients.unit = ''
      if(!ingredients.quantity) ingredients.quantity = ''

      ingredientElement.className = 'card__body__ingredientsWrapper__el'
      ingredientElement.innerHTML += `
        <p class="card__body__ingredientsWrapper__el__ingredients">${ingredients.ingredient}</p>
        <p class="card__body__ingredientsWrapper__el__quantity">${ingredients.quantity} ${ingredients.unit}</p>
    `
      ingredientWrapper.appendChild(ingredientElement)
    })

    recipeWrapper.appendChild(recipeElement)
  }
}
