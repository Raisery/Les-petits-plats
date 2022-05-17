const searchValue = "coc";
const tagList = [];

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
if (tagList.length) {
    for (let recipe of currentSearchResult) {
        var isValid = true;
        for (let tag of tagList) {
            const ingredients = [];

            for (let ingredient of recipe.ingredients) {
                ingredients.push(ingredient.ingredient);
            }
            if (
                !ingredients.includes(tag.toLowerCase()) &&
                !(recipe.appliance == tag.toLowerCase()) &&
                !recipe.ustensils.includes(tag.toLowerCase())
            ) {
                isValid = false;
            }
        }
        if (isValid) {
            resultat.push(recipe);
        }
    }
    currentSearchResult = resultat;
}

