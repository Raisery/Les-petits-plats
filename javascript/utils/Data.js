class Data {

    static getIngredientList() {
        return Data.infosTab.ingredients
    }

    static getAppareilsList() {
        return Data.infosTab.appareils
    }

    static getUstensilsList() {
        return Data.infosTab.ustensils
    }

    static generateRecipesList() {
        for (var recipeData of recipes) {
            const recipe = new Recipe(recipeData);
            Data.recipesList.push(recipe);
        }
    }

    static setInfosTab(infosTab, recipes) {
        recipes.forEach(recipe => {

            recipe.ingredients.forEach(element => {
                if (!infosTab.ingredients.includes(element.ingredient.toLowerCase())) {
                    infosTab.ingredients.push(element.ingredient.toLowerCase());
                }
            });

            if (!infosTab.appareils.includes(recipe.appliance.toLowerCase())) {
                infosTab.appareils.push(recipe.appliance.toLowerCase());
            }

            recipe.ustensils.forEach(ustensil => {
                if (!infosTab.ustensils.includes(ustensil.toLowerCase())) {
                    infosTab.ustensils.push(ustensil.toLowerCase());
                }
            });
        });
    }
}
Data.recipesList = [];
Data.infosTab = {ingredients: [], appareils: [], ustensils: []};
Data.setInfosTab(Data.infosTab, recipes);
