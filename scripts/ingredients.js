const urlParams = new URLSearchParams(window.location.search);
const sheetTitle = urlParams.get("recipe");
console.log(sheetTitle);

let ingredientsGapiInited = false;

function ingredientsGapiLoaded() {
    console.log("ingredients Gapi loaded");
    gapi.load("client", initializeIngredientsGapiClient);
}

async function initializeIngredientsGapiClient() {
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });
    ingredientsGapiInited = true;
    checkGapiInit();
}

function checkGapiInit() {
    if (ingredientsGapiInited) {
        listIngredients(sheetTitle);
        editLinkHref();
    }
};


async function listIngredients(sheetTitle) {
    let response;
    try {
      response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: "1aSFaoYzNI1JZBFTXS6ENvD-isTszCSKMs9axjgsTnZA",
        range: `${sheetTitle}!B3:B`,
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

    const ingredientsListWrapper = document.querySelector(".ingredientsList");
    range.values.forEach((row) => {
        const li = document.createElement("li");
        li.textContent = row[0];
        ingredientsListWrapper.appendChild(li);
      });
  }

  async function editLinkHref() {
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

    const links = document.querySelectorAll(".recipeLink");
    links.forEach((link, i) => {
      const recipe = range.values[i];
      if (recipe && recipe.length > 0) {
        link.href = `recipe.html?recipe=${encodeURIComponent(recipe[0])}`;
      }
    });
}