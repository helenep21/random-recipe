const recipeURL = 'recipes.json';

document.getElementById('generateButton').addEventListener('click', generateRecipes);

async function generateRecipes() {
  const recipeCount = document.getElementById('recipeCount').value;
  
  try {
    const response = await fetch(recipeURL);
    const recipes = await response.json();
    
    const randomIndexes = generateRandomIndexes(recipes.length, recipeCount);
    const selectedRecipes = randomIndexes.map(index => recipes[index]);
    
    displayRecipes(selectedRecipes);
    
    const groceryList = generateGroceryList(selectedRecipes);
    displayGroceryList(groceryList);
  } catch (error) {
    console.error('Error:', error);
  }
}

function generateRandomIndexes(maxIndex, count) {
  const indexes = Array.from({ length: maxIndex }, (_, i) => i);
  
  for (let i = indexes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }
  
  return indexes.slice(0, count);
}

function displayRecipes(recipes) {
  const recipesContainer = document.getElementById('recipesContainer');
  recipesContainer.innerHTML = '';
  
  recipes.forEach(recipe => {
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');
    
    const title = document.createElement('h2');
    title.textContent = recipe.name;
    recipeDiv.appendChild(title);
    
    const ingredientsList = document.createElement('ul');
    recipe.ingredients.forEach(ingredient => {
      const listItem = document.createElement('li');
      listItem.textContent = ingredient;
      ingredientsList.appendChild(listItem);
    });
    
    recipeDiv.appendChild(ingredientsList);
    recipesContainer.appendChild(recipeDiv);
  });
}

function generateGroceryList(recipes) {
  const groceryList = {};
  
  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      if (groceryList[ingredient]) {
        groceryList[ingredient]++;
      } else {
        groceryList[ingredient] = 1;
      }
    });
  });
  
  return groceryList;
}

function displayGroceryList(groceryList) {
  const groceryListContainer = document.getElementById('groceryList');
  groceryListContainer.innerHTML = '';
  
  const groceryListTitle = document.createElement('h2');
  groceryListTitle.textContent = 'Grocery List';
  groceryListContainer.appendChild(groceryListTitle);
  
  const groceryListItems = document.createElement('ul');
  
  for (const ingredient in groceryList) {
    const listItem = document.createElement('li');
    listItem.textContent = `${ingredient}: ${groceryList[ingredient]}`;
    groceryListItems.appendChild(listItem);
  }
  
  groceryListContainer.appendChild(groceryListItems);
}
