const searchValue = "coc";
const tagList = [];
var currentSearchResult = new Map();
var resultat = new Map();
recipesData.forEach(recipe => {
    currentSearchResult.set(recipe.id, recipe);
});
if (searchValue != null) {
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
if (tagList.length) {
    currentSearchResult.forEach(recipe => {
        var isValid = true;
        tagList.forEach(tag => {
            const ingredients = [];

            recipe.ingredients.forEach(ingredient => {
                ingredients.push(ingredient.ingredient);
            });
            if (
                !ingredients.includes(tag.toLowerCase()) &&
                !(recipe.appliance == tag.toLowerCase()) &&
                !recipe.ustensils.includes(tag.toLowerCase())
            ) {
                isValid = false;
            }
        });
        if (isValid) {
            resultat.set(recipe.id, recipe);
        }
    });
    currentSearchResult = resultat;
}
