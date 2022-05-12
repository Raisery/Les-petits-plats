class UI {
    static generateMain() {
        const main = document.getElementById("main");
        for (var recipeData of recipes) {
            const recipe = new Recipe(recipeData);
            Data.recipesList.push(recipe);
            main.appendChild(recipe.getCard());
        }
        trim();
    }

    static generateSelectors() {
        for (let selector of Selector.SELECTORS) {
            let nbItems = 1;
            for (let element of selector.list) {
                if (nbItems <= 30) {
                    const elt = document.createElement("p");
                    elt.classList.add("selector__list__item");
                    let content = "";
                    for (let i = 0; i < element.length; i++) {
                        if (i == 0) {
                            content += element[i].toUpperCase();
                        }
                        else {
                            content += element[i];
                        }

                    }
                    elt.textContent = content;
                    selector.html.childNodes[5].appendChild(elt);
                }
                nbItems++;
            }

        }
    }
}
