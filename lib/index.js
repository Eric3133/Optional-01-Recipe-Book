// Todo: Use the Meal DB API to search for recipes by ingredient

// Todo: select the HTML elements you need here
// (such as search input, recipe-template, recipes-container, favourites-container)
const input = document.querySelector("#search-input");
const recipesContainer = document.querySelector("#recipes-container");
const favoritesContainer = document.querySelector("#favourites-container");
// console.log(recipesContainer);
const favorites = [];
// console.log(input);
const insertRecipes = (recipes, container) => {
  container.innerHTML = "";
  recipes.forEach((recipe) => {
    const newHTML = `
    <div class="col-5">
    <div class="card my-2 position-relative">
      <i class="fa-solid fa-bookmark text-danger ms-2 position-absolute top-0 end-0 p-2 fs-4"></i>
      <img src="${recipe.strMealThumb}" class="card-img-top" alt="">
      <div class="card-body d-flex">
        <h6 class="card-title">${recipe.strMeal}</h6>
      </div>
    </div>
  </div>
    `;
    container.insertAdjacentHTML("beforeend", newHTML);
  });
};

const addRecipeTOFavorites = (event) => {
  const idmeal = event.currentTarget.id;
  const strMeal = event.currentTarget.parentElement.querySelector("h6").textContent;
  const strMealThumb = event.currentTarget.parentElement.querySelector("img").src;

  const newRecipeToAdd = { idMeal: idmeal, strMeal: strMeal, strMealThumb: strMealThumb};
  favorites.push(newRecipeToAdd);
  insertRecipes(favorites, favoritesContainer);
};
const addFavoriteLIsteners = () => {
  const icons = document.querySelectorAll(".fa-bookmark");
  // console.log(icons);
  icons.forEach((icon) => {
    // console.log(icon);
    icon.addEventListener("click", (event) => {
      addRecipeTOFavorites(event);
    });
  });
};

input.addEventListener("change", (event) => {
  // const inputValue = input.value;
  // console.log(event.currentTarget.value);
  // console.log(inputValue);
  // const mealApiUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${event.currentTarget.value}`;
  // console.log(url);
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      // console.log(data.meals);
      if (data.meals && data.meals.size > 0) {
        insertRecipes(data.meals, recipesContainer);
        addFavoriteLIsteners();
      } else {
        recipesContainer.innerHTML = "No results found, please try another ingredient";
      }
    });
});

// Todo: Initialize the favourites array

// Todo: create a function to fetch the recipes from the API when the search input changes
