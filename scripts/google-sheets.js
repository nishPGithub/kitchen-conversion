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
        listAmount(sheetTitle);
        editLinkHref();
    }
}

async function listRecipies() {
    let response;
    try {
        response = await gapi.client.sheets.spreadsheets.get({
            spreadsheetId: "1SRMRrV8817I1jQlDqpR0M0qYQMqwo16VxyJ6Z18XmNQ",
        });
        console.log(response);
    } catch (err) {
        console.error(err.message);
        return;
    }

    const range = response.result.sheets;

    const linkWrapper = document.querySelector(".linkWrapper");
    range.forEach((row) => {
        console.log(row.properties.title);
        const link = document.createElement("a");
        if (location.href.includes("recipe")) {
            link.href = `recipe.html?recipe=${encodeURIComponent(row.properties.title)}`;
        } else {
            link.href = `src/recipe.html?recipe=${encodeURIComponent(row.properties.title)}`;
        }
        link.innerText = row.properties.title;
        link.className = "recipeLink navLink";
        linkWrapper.appendChild(link);
    });
}
