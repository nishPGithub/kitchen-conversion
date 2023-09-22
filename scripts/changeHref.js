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
