
class Recipe {
    constructor(data) {
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.servings = data.servings;
            this.ingredients = data.ingredients;
            this.time = data.time;
            this.description = data.description;
            this.appliance = data.appliance;
            this.ustensils = data.ustensil;
        }


    }

    getCard() {
        const article = document.createElement("article");
        article.classList.add("recipe-card")
        const preview = document.createElement("div");
        preview.classList.add("recipe-card__preview");
        const recipeInfos = document.createElement("div");
        recipeInfos.classList.add("recipe-card__infos");
        //
        const header = document.createElement("div");
        header.classList.add("recipe-card__infos__header");
        const name = document.createElement("h2");
        name.textContent = this.name;
        name.classList.add("recipe-card__infos__header__name");
        const timeContainer = document.createElement("div");
        timeContainer.classList.add("recipe-card__infos__header__time-container");
        //
        const timeIcon = document.createElement("i");
        timeIcon.classList.add("far");
        timeIcon.classList.add("fa-clock");
        timeIcon.classList.add("recipe-card__infos__header__time-container__time-icon");
        const timeText = document.createElement("h3");
        timeText.textContent = `${this.time} min`;
        timeText.classList.add("recipe-card__infos__header__time-container__time-text");
        //
        const recipe = document.createElement("div");
        recipe.classList.add("recipe-card__infos__recipe");

        //ingredients
        const ingredientsList = document.createElement("div");
        ingredientsList.classList.add("recipe-card__infos__recipe__ingredients-list");
        for (var ingredient of this.ingredients) {
            const element = document.createElement("div");
            element.classList.add("recipe-card__infos__recipe__ingredients-list__ingredient");
            element.innerHTML = `<strong>${ingredient.ingredient}</strong>`;
            var unit = "";
            if (ingredient.quantity) {
                if (ingredient.unit) {
                    if (ingredient.unit.length > 2) {
                        unit += " ";
                    }
                    unit += `${ingredient.unit.split(" ")[0]}`;
                    if (unit == " grammes") {
                        unit = "g";
                    }
                }
                element.innerHTML += `<strong>:</strong> ${ingredient.quantity}${unit}`
            }

            ingredientsList.appendChild(element);
        }

        const notice = document.createElement("p");
        notice.textContent = this.description;
        notice.classList.add("recipe-card__infos__recipe__notice");

        //arborescence HTML
        article.appendChild(preview);
        article.appendChild(recipeInfos);

        recipeInfos.appendChild(header);
        recipeInfos.appendChild(recipe);

        header.appendChild(name);
        header.appendChild(timeContainer);

        timeContainer.appendChild(timeIcon);
        timeContainer.appendChild(timeText);

        recipe.appendChild(ingredientsList);
        recipe.appendChild(notice);
        return article
    }


}

//pour  contourner l'erreur esLint
const blbal = new Recipe({});