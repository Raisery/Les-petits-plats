class Search {

    constructor() {
        this.searchBar = document.getElementById("search__form__search-bar");
        this.filters = document.querySelector(".filter__list");
        this.ingredientSearch = new Selector(Selector.INGREDIENTS, this);
        this.appareilsSearch = new Selector(Selector.APPAREILS, this);
        this.ustensilsSearch = new Selector(Selector.USTENSILS, this);
        this.recipesList = [];
        this.searchValue = null;
        this.tagList = [];

        for (let recipe of recipesData) {
            this.recipesList.push(new Recipe(recipe));
        }
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
        var resultat = [];
        if (this.searchValue != null) {
            for (let recipe of currentSearchResult) {
                if (recipe.name.toLowerCase().includes(this.searchValue.toLowerCase())) {
                    resultat.push(recipe);
                }
                else if (recipe.ingredients.includes(this.searchValue.toLowerCase())) {
                    resultat.push(recipe);
                }
                else if (recipe.description.toLowerCase().includes(this.searchValue.toLowerCase())) {
                    resultat.push(recipe);
                }
            }
            if (!resultat.length) {
                const error = document.createElement("h2");
                error.classList.add('empty-search');
                error.textContent = 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.';
                main.appendChild(error);
                return
            }
            currentSearchResult = resultat;
            resultat = [];
        }
        if(this.tagList.length) {
            for(let recipe of currentSearchResult) {
                var isValid = true;
                for(let tag of this.tagList) {
                    const ingredients = [];

                    for(let ingredient of recipe.ingredients) {
                        ingredients.push(ingredient.ingredient);
                    }
                    if(
                        !ingredients.includes(tag.toLowerCase()) &&
                        !(recipe.appliance == tag.toLowerCase()) &&
                        !recipe.ustensils.includes(tag.toLowerCase())
                    ) 
                    {
                        isValid = false;
                    }
                }
                if(isValid) {
                    resultat.push(recipe);
                }
            }
            currentSearchResult = resultat;
        }
        
        this.ingredientSearch.list = [];
        this.appareilsSearch.list = [];
        this.ustensilsSearch.list = [];
        for (let recipe of currentSearchResult) {
            const r = recipe.getCard();
            main.appendChild(r);
            for(let ingredient of recipe.ingredients) {
                if(!this.ingredientSearch.list.includes(ingredient.ingredient)) {
                this.ingredientSearch.list.push(ingredient.ingredient);
                }
            }
            if(!this.appareilsSearch.list.includes(recipe.appliance)) {
                this.appareilsSearch.list.push(recipe.appliance);
            }
            
            for(let ustensil of recipe.ustensils) {
                if(!this.ustensilsSearch.list.includes(ustensil)) {
                    this.ustensilsSearch.list.push(ustensil);
                }
            }
            
        }
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