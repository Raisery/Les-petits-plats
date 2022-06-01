const searchValue = "coc";

var currentSearchResult = recipesData;
var resultat = [];
if (searchValue != null) {
    for (let recipe of currentSearchResult) {
        if (recipe.name.toLowerCase().includes(searchValue.toLowerCase())) {
            resultat.push(recipe);
        }
        else if (recipe.ingredients.includes(searchValue.toLowerCase())) {
            resultat.push(recipe);
        }
        else if (recipe.description.toLowerCase().includes(searchValue.toLowerCase())) {
            console.log(recipe)
            resultat.push(recipe);
        }
    }
    if (!resultat.length) {
        console.log("FINI")
    }
    currentSearchResult = resultat;
    resultat = [];
}

