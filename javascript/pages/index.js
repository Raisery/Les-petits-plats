const recipesList = [];
const infosTab = {ingredients: [], appareils: [], ustensils: []};

async function init() {
    const main = document.getElementById("main");

    for (var recipeData of recipes) {
        const recipe = new Recipe(recipeData);
        recipesList.push(recipe);
        main.appendChild(recipe.getCard());
    }

    Recipe.setInfosTab(infosTab, recipesList);
}




init();




