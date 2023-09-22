class TitleCreator {
    constructor() {
        this.parent = document.querySelector("body");
        this.target = this.parent.querySelector(".pageTitle");
        this.initialize();
    }

    initialize() {
        document.addEventListener("DOMContentLoaded", () => {
            this.setPageTitle();
        });
    }

    setPageTitle() {
        const recipeParam = this.getUrlParameter("recipe");

        if (recipeParam) {
            this.target.textContent = recipeParam;
        }
    }

    getUrlParameter(name) {
        name = name.replace(/[\[\]]/g, "\\$&");
        const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        const results = regex.exec(window.location.href);
        if (!results) return null;
        if (!results[2]) return "";
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
}

new TitleCreator();
