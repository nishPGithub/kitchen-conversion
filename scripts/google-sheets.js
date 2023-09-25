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
        listIngredients(sheetTitle);
        listAmount(sheetTitle)
        editLinkHref();
    }
}

async function listRecipies() {
    let response;
    try {
        response = await gapi.client.sheets.spreadsheets.get({
            spreadsheetId: "1aSFaoYzNI1JZBFTXS6ENvD-isTszCSKMs9axjgsTnZA",
        });
        console.log(response);
    } catch (err) {
        console.error(err.message);
        return;
    }

    const range = response.result.sheets;

    const linkWrapper = document.querySelector(".linkWrapper");
    range.forEach((row) => {
        console.log(row.properties.title)
        const link = document.createElement("a");
        link.href = `src/recipe.html?recipe=${encodeURIComponent(row.properties.title)}`;
        link.innerText = row.properties.title;
        link.className = "recipeLink navLink"
        linkWrapper.appendChild(link);
    });
}
