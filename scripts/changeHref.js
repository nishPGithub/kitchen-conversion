async function editLinkHref() {
    let response;
    try {
        response = await gapi.client.sheets.spreadsheets.get({
            spreadsheetId: "1aSFaoYzNI1JZBFTXS6ENvD-isTszCSKMs9axjgsTnZA"
        });
    } catch (err) {
        console.error(err.message);
        return;
    }

    const range = response.result.sheets;
    const links = document.querySelectorAll(".recipeLink");

    range.forEach((row, index) => {
        const link = links[index];
        if (link) {
            link.href = `recipe.html?recipe=${encodeURIComponent(row.properties.title)}`;
        }
    });
}
