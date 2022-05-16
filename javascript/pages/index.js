async function init() {
    document.getElementById("body").onclick = function (e) {
        Selector.hideLists();
    }
    document.querySelector(".search").reset();

    const search = new Search();

}

init();




