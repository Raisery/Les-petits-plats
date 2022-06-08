/*
    Classe de gestion de recherche avancée
*/
class Selector {

    constructor(type,search) {
        this.active = false;
        this.type = type;
        this.search = search;
        this.list = [];
        this.valueSearchBar = null;

        switch (this.type) {
            case Selector.INGREDIENTS:
                this.list = Data.getIngredientList();
                this.displayList = Data.getIngredientList();
                this.html = document.getElementById("ingredients-selector");
                break;
            case Selector.APPAREILS:
                this.list = Data.getAppareilsList();
                this.displayList = Data.getAppareilsList();
                this.html = document.getElementById("appareils-selector");
                break;
            case Selector.USTENSILS:
                this.list = Data.getUstensilsList();
                this.displayList = Data.getUstensilsList();
                this.html = document.getElementById("ustensiles-selector");
                break;
            default:
                console.log("INVALID TYPE FOR Selector CONSTRUCTOR");
                return
        }


        const selector = this;
        this.html.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!selector.active) {
                Selector.hideLists();
                selector.showList();
            }
        });

        this.html.childNodes[3].addEventListener('keyup', (e) => {
            selector.valueSearchBar = selector.html.childNodes[3].value;
            selector.update();
        })

        Selector.SELECTORS.push(this);
        
    }

    /*
        Affichage de la liste des tags possible du selector
    */
    showList() {
        Selector.hideLists();
        

        this.html.style.width = "51%";
        this.html.childNodes[1].style.display = "none";
        this.html.childNodes[3].style.display = "block";
        this.html.childNodes[5].style.display = "flex";
        this.html.childNodes[7].classList.remove("selector__arrow--down");
        this.html.childNodes[7].classList.add("selector__arrow--up");

        this.active = true


    }

    /*
        Masque la liste des tags de tous les selector
    */
    static hideLists() {
        for (let selector of Selector.SELECTORS) {
            selector.html.style.width = "170px";
            selector.html.childNodes[1].style.display = "block";
            selector.html.childNodes[3].style.display = "none";
            selector.html.childNodes[5].style.display = "none";
            selector.html.childNodes[7].classList.remove("selector__arrow--up");
            selector.html.childNodes[7].classList.add("selector__arrow--down");
            selector.active = false;
        }

    }

    /* 
        Methode de mise à jour de la liste de tags possible en fonction de la recherche
    */
    update() {
        var resultat = [];
        if(this.valueSearchBar) {
            for(let item of this.list) {
                if(item.includes(this.valueSearchBar.toLowerCase())) {
                    resultat.push(item);
                }
            }
        }
        else {
            resultat = this.list.slice();
        }
        this.displayList = resultat
        console.log(this.displayList)

        const selector = this;
        var nbItems = 1;
        this.html.childNodes[5].innerHTML = "";
        for(let item of this.displayList) {
            if (nbItems <= 30) {
                const itemHTML = document.createElement("p");
                itemHTML.classList.add("selector__list__item");
                var content = "";
                for (let i = 0; i < item.length; i++) {
                    if (i == 0) {
                        content += item[i].toUpperCase();
                    }
                    else {
                        content += item[i];
                    }

                }
                itemHTML.textContent = content;

                itemHTML.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const filtersContainer = document.querySelector(".filter__list");

                    filtersContainer.childNodes.forEach(function(f) {
                        if(f.childNodes[0].textContent == itemHTML.textContent) {
                            return
                        }
                    });

                    const filter = document.createElement("div");
                    filter.classList.add(`filter__list__item`);
                    filter.classList.add(`filter__list__item--filter-type${selector.type}`);
                    const name = document.createElement("p");
                    name.classList.add("filter__list__item__name");
                    name.textContent = itemHTML.textContent;
                    const cross = document.createElement("i");
                    cross.classList.add("far");
                    cross.classList.add("fa-times-circle");

                    filtersContainer.appendChild(filter);

                    filter.appendChild(name);
                    filter.appendChild(cross);
                    selector.search.addTag(this.textContent);
                    selector.search.update();

                    cross.addEventListener('click', function(e) {
                        e.stopPropagation();
                        filtersContainer.removeChild(filter);
                        selector.search.removeTag(this.parentNode.childNodes[0].textContent)
                        selector.search.update();
                    });

                });
                this.html.childNodes[5].appendChild(itemHTML);
            }
            nbItems++;
        }
    }
}

Selector.INGREDIENTS = 0;
Selector.APPAREILS = 1;
Selector.USTENSILS = 2;
Selector.SELECTORS = [];

