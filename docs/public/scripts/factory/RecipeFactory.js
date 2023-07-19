class RecipeFactory {
  constructor() {}

  createRecipe(recipe) {
    return new RecipeModel(recipe)
  }

  renderRecipe(recipeData, recipeWrapper) {
    const recipe = this.createRecipe(recipeData);

    const recipeElement = document.createElement('li');
    recipeElement.id = `recipe_${recipe.id}`;
    recipeElement.className = 'card';

    const cardHeader = document.createElement('figure');
    cardHeader.className = 'card__header';

    const headerImg = document.createElement('img');
    headerImg.className = 'card__header__img';
    headerImg.src = `./public/assets/images/mockupRecipesImgs/${recipe.image}`;
    headerImg.alt = 'recipe';
    cardHeader.appendChild(headerImg);

    const headerDuration = document.createElement('figcaption');
    headerDuration.className = 'card__header__duration';
    headerDuration.textContent = `${recipe.time}min`;
    cardHeader.appendChild(headerDuration);

    recipeElement.appendChild(cardHeader);

    const cardBody = document.createElement('div');
    cardBody.className = 'card__body';

    const title = document.createElement('h2');
    title.className = 'card__body__title';
    title.textContent = recipe.name;
    cardBody.appendChild(title);

    const subtitle1 = document.createElement('h3');
    subtitle1.className = 'card__body__subtitle';
    subtitle1.textContent = 'Recette';
    cardBody.appendChild(subtitle1);

    const description = document.createElement('p');
    description.className = 'card__body__description';
    description.textContent = recipe.description;
    cardBody.appendChild(description);

    const subtitle2 = document.createElement('h3');
    subtitle2.className = 'card__body__subtitle';
    subtitle2.textContent = 'Ingrédients';
    cardBody.appendChild(subtitle2);

    const ingredientsWrapper = document.createElement('ul');
    ingredientsWrapper.className = 'card__body__ingredientsWrapper';
    cardBody.appendChild(ingredientsWrapper);


    recipe.ingredients.forEach((ingredient) => {
    if(!ingredient.unit) ingredient.unit = ''
    if(!ingredient.quantity) ingredient.quantity = ''
      const ingredientElement = document.createElement('li');
      ingredientElement.className = 'card__body__ingredientsWrapper__el';

      const ingredientName = document.createElement('p');
      ingredientName.className = 'card__body__ingredientsWrapper__el__ingredients';
      ingredientName.textContent = ingredient.ingredient;
      ingredientElement.appendChild(ingredientName);

      const ingredientQuantity = document.createElement('p');
      ingredientQuantity.className = 'card__body__ingredientsWrapper__el__quantity';
      ingredientQuantity.textContent = `${ingredient.quantity} ${ingredient.unit}`;
      ingredientElement.appendChild(ingredientQuantity);

      ingredientsWrapper.appendChild(ingredientElement);
    });

    recipeElement.appendChild(cardBody);

    recipeWrapper.appendChild(recipeElement);
  }
}
