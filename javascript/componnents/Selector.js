class Selector {

    constructor(type) {

        switch (type) {
            case Selector.INGREDIENTS:
                this.list = Data.getIngredientList();
                this.html = document.getElementById("ingredients-selector");
                break;
            case Selector.APPAREILS:
                this.list = Data.getAppareilsList();
                this.html = document.getElementById("appareils-selector");
                break;
            case Selector.USTENSILS:
                this.list = Data.getUstensilsList();
                this.html = document.getElementById("ustensiles-selector");
                break;
            default:
                console.log("INVALID TYPE FOR Selector CONSTRUCTOR");
                return
        }
        this.active = false;
        this.type = type;
    }

    static generateSelectors() {
        const selectors = [];
        for (let i = 0; i < 3; i++) {
            selectors.push(new Selector(i));

            //event show list on click
            selectors[i].html.onclick = function (e) {
                //stoppropagation pour que l'evenement ne sois pas capté par le body
                e.stopPropagation();
                if (!selectors[i].active) {
                    Selector.hideLists();
                    Selector.showList(i);
                }
            }
        }

        //event hiddlists on click 
        document.getElementById("body").onclick = function (e) {
                Selector.hideLists();
            
        }

        return selectors;
    }

    static showList(index) {
        Selector.SELECTORS[index].html.style.width = "51%";
        Selector.SELECTORS[index].html.childNodes[1].style.display = "none";
        Selector.SELECTORS[index].html.childNodes[3].style.display = "block";
        Selector.SELECTORS[index].html.childNodes[5].style.display = "flex";
        Selector.SELECTORS[index].html.childNodes[7].classList.remove("selector__arrow--down");
        Selector.SELECTORS[index].html.childNodes[7].classList.add("selector__arrow--up");

        Selector.SELECTORS[index].active = true
    }

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
}

Selector.INGREDIENTS = 0;
Selector.APPAREILS = 1;
Selector.USTENSILS = 2;
Selector.SELECTORS = Selector.generateSelectors();

