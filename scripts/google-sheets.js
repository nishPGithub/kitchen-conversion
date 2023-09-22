const CLIENT_ID = "668414651388-bq1um6i3r3o59vfg8hcg370ft41um44u.apps.googleusercontent.com";
const API_KEY = "AIzaSyDVoW52CA_gXX4uRJfUFRnArPd9KAIAXok";
const DISCOVERY_DOC = "https://sheets.googleapis.com/$discovery/rest?version=v4";
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";
const pageParent = document.querySelector("body");

let homeGapiInited = false;

function gapiLoaded() {
    gapi.load("client", initializeGapiClient);
}

async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });
    homeGapiInited = true;
    maybeEnableButtons();
}

function maybeEnableButtons() {
    if (homeGapiInited) {
        listRecipies();
    }
}

async function listRecipies() {
    let response;
    try {
        response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: "1aSFaoYzNI1JZBFTXS6ENvD-isTszCSKMs9axjgsTnZA",
            range: "Recipie List!C7:C",
        });
    } catch (err) {
        console.error(err.message);
        return;
    }

    const range = response.result;
    if (!range || !range.values || range.values.length == 0) {
        console.log("No values found.");
        return;
    }

    const linkWrapper = document.querySelector(".linkWrapper");
    range.values.forEach((row) => {
        const link = document.createElement("a");
        link.href = `src/recipe.html?recipe=${encodeURIComponent(row[0])}`;
        link.innerText = row[0];
        link.className = "recipeLink navLink"
        linkWrapper.appendChild(link);
    });
}

/*class HeaderLinks {
    constructor(parent) {
        this.parent = parent;
        this.clientID =
            "668414651388-bq1um6i3r3o59vfg8hcg370ft41um44u.apps.googleusercontent.com";
        this.apiKey = "AIzaSyDVoW52CA_gXX4uRJfUFRnArPd9KAIAXok";
        this.discoveryDocs =
            "https://sheets.googleapis.com/$discovery/rest?version=v4";
        this.scopes = "https://www.googleapis.com/auth/spreadsheets.readonly";
        this.gapiInited = false;
    }

    loadGapi() {
        gapi.load("client", this.initializeGapiClient.bind(this));
    }

    async initializeGapiClient() {
        await gapi.client.init({
            apiKey: this.apiKey,
            discoveryDocs: [this.discoveryDocs],
            clientId: this.clientID,
            scope: this.scopes,
        });
        this.gapiInited = true;
        this.maybeEnableButtons();
    }

    maybeEnableButtons() {
        if (this.gapiInited) {
            this.listRecipes();
        }
    }

    async listRecipes() {
        let response;
        try {
            response = await gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: "1aSFaoYzNI1JZBFTXS6ENvD-isTszCSKMs9axjgsTnZA",
                range: "Recipie List!C7:C17",
            });
        } catch (err) {
            console.error(err.message);
            return;
        }

        const range = response.result;
        if (!range || !range.values || range.values.length == 0) {
            console.log("No values found.");
            return;
        }

        const linkWrapper = document.querySelector(".linkWrapper");
        range.values.forEach((row) => {
            const link = document.createElement("a");
            link.href = "recipe.html";
            link.innerText = row[0];
            linkWrapper.appendChild(link);
        });
    }
}*/