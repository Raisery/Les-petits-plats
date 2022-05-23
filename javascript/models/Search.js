class Search {

    constructor() {
        this.searchBar = document.getElementById("search__form__search-bar");
        this.filters = document.querySelector(".filter__list");
        this.ingredientSearch = new Selector(Selector.INGREDIENTS, this);
        this.appareilsSearch = new Selector(Selector.APPAREILS, this);
        this.ustensilsSearch = new Selector(Selector.USTENSILS, this);
        this.recipesList = new Map();
        this.searchValue = null;
        this.tagList = [];

        recipesData.forEach(recipe => {
            this.recipesList.set(recipe.id, new Recipe(recipe));
        });
        this.update();

        let search = this;
        this.searchBar.addEventListener("keyup", function (e) {
            e.stopPropagation();
            if (search.searchBar.value.length >= 3) {
                search.searchValue = search.searchBar.value;
            }
            else {
                search.searchValue = null;
            }
            search.update();
        });
    }

    update() {
        const main = document.getElementById("main");
        var currentSearchResult = this.recipesList;
        main.innerHTML = "";
        var resultat = new Map();
        if (this.searchValue != null) {
            currentSearchResult.forEach(recipe => {
                if (recipe.name.toLowerCase().includes(this.searchValue.toLowerCase())) {
                    resultat.set(recipe.id,recipe);
                }
                else if (recipe.ingredients.includes(this.searchValue.toLowerCase())) {
                    resultat.set(recipe.id, recipe);
                }
                else if (recipe.description.toLowerCase().includes(this.searchValue.toLowerCase())) {
                    resultat.set(recipe.id, recipe);
                }
            });
            if (!resultat.size) {
                const error = document.createElement("h2");
                error.classList.add('empty-search');
                error.textContent = 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.';
                main.appendChild(error);
                return
            }
            currentSearchResult = resultat;
            resultat = new Map();
        }
        if(this.tagList.length) {
            currentSearchResult.forEach(recipe => {
                var isValid = true;
                this.tagList.forEach(tag => {
                    const ingredients = [];

                    recipe.ingredients.forEach(ingredient => {
                        ingredients.push(ingredient.ingredient);
                    });
                    if(
                        !ingredients.includes(tag.toLowerCase()) &&
                        !(recipe.appliance == tag.toLowerCase()) &&
                        !recipe.ustensils.includes(tag.toLowerCase())
                    ) 
                    {
                        isValid = false;
                    }
                });
                if(isValid) {
                    resultat.set(recipe.id, recipe);
                }
            });
            currentSearchResult = resultat;
        }
        
        this.ingredientSearch.list = [];
        this.appareilsSearch.list = [];
        this.ustensilsSearch.list = [];
        currentSearchResult.forEach(recipe => {
            const r = recipe.getCard();
            main.appendChild(r);
            recipe.ingredients.forEach(ingredient => {
                if(!this.ingredientSearch.list.includes(ingredient.ingredient)) {
                this.ingredientSearch.list.push(ingredient.ingredient);
                }
            });
            if(!this.appareilsSearch.list.includes(recipe.appliance)) {
                this.appareilsSearch.list.push(recipe.appliance);
            }
            
            recipe.ustensils.forEach(ustensil => {
                if(!this.ustensilsSearch.list.includes(ustensil)) {
                    this.ustensilsSearch.list.push(ustensil);
                }
            });
            
        });
        trim();
        this.ingredientSearch.update();
        this.appareilsSearch.update();
        this.ustensilsSearch.update();
       
    }

    addTag(tag) {
        if (!this.tagList.includes(tag)) {
            this.tagList.push(tag);
        }
    }

    removeTag(tag) {
        if (this.tagList.includes(tag)) {
            let index = this.tagList.indexOf(tag);
            this.tagList.splice(index, 1);
        }
    }
}