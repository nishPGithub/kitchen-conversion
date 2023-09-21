const CLIENT_ID = "668414651388-bq1um6i3r3o59vfg8hcg370ft41um44u.apps.googleusercontent.com";
const API_KEY = "AIzaSyDVoW52CA_gXX4uRJfUFRnArPd9KAIAXok";
const DISCOVERY_DOC = "https://sheets.googleapis.com/$discovery/rest?version=v4";
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

let gapiInited = false;

function gapiLoaded() {
    gapi.load("client", initializeGapiClient);
}

async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
    maybeEnableButtons();
}

function maybeEnableButtons() {
    if (gapiInited) {
        listMajors();
    }
}

async function listMajors() {
    let response;
    try {
        response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: "1aSFaoYzNI1JZBFTXS6ENvD-isTszCSKMs9axjgsTnZA",
            range: "Recipie List!C7:E17",
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
