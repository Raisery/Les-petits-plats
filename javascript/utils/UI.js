class UI {

    static generateMain() {
        const main = document.getElementById("main");
    }

    static generateSelectors() {
        for (let selector of Selector.SELECTORS) {
            let nbItems = 1;
            selector.html.childNodes[5].innerHTML ="";
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

                    elt.onclick = function(e) {
                        const filtersContainer = document.querySelector(".filter__list");
                        var alreadyIn = false;

                        filtersContainer.childNodes.forEach(function(f) {
                            if(f.childNodes[0].textContent == elt.textContent) {
                                alreadyIn = true;
                            }
                        });

                        if(alreadyIn) {
                            return
                        }

                        const filter = document.createElement("div");
                        filter.classList.add(`filter__list__item`);
                        filter.classList.add(`filter__list__item--filter-type${selector.type}`);
                        const name = document.createElement("p");
                        name.classList.add("filter__list__item__name");
                        name.textContent = elt.textContent;
                        const cross = document.createElement("i");
                        cross.classList.add("far");
                        cross.classList.add("fa-times-circle");

                        filtersContainer.appendChild(filter);

                        filter.appendChild(name);
                        filter.appendChild(cross);

                        cross.onclick = function(e) {
                            filtersContainer.removeChild(filter);
                        }
                    }
                    selector.html.childNodes[5].appendChild(elt);
                }
                nbItems++;
            }

        }
    }
}
