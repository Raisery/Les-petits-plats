const searchValue = "coc";
const recipeDataMap = new Map();
for(let recipe of recipeData) {
	recipeDataMap.set(recipe.id, recipe);
}

var currentSearchResult = recipeDataMap;
var resultat = new Map();

if (searchValue != null && searchValue.length >= 3) {
    currentSearchResult.forEach(recipe => {
        if (recipe.name.toLowerCase().includes(searchValue.toLowerCase())) {
            resultat.set(recipe.id, recipe);
        }
        else if (recipe.ingredients.includes(searchValue.toLowerCase())) {
            resultat.set(recipe.id, recipe);
        }
        else if (recipe.description.toLowerCase().includes(searchValue.toLowerCase())) {
            resultat.set(recipe.id, recipe);
        }
    });
    currentSearchResult = resultat;
    resultat = new Map();
}