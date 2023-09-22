async function listAmount(sheetTitle) {
    let response;
    try {
        response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: "1aSFaoYzNI1JZBFTXS6ENvD-isTszCSKMs9axjgsTnZA",
            range: `${sheetTitle}!C3:D`,
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

    const amountList = document.querySelector(".amountList");
    range.values.forEach((row) => {
        const li = document.createElement("li");
        li.textContent = row[0];
        if (row[1] !== undefined) {
            li.textContent += " " + row[1];
        }
        li.className = "amountListItem";
        amountList.appendChild(li);
    });
}
