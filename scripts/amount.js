async function listAmount(sheetTitle) {
    let response;
    try {
        response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: "1SRMRrV8817I1jQlDqpR0M0qYQMqwo16VxyJ6Z18XmNQ",
            range: `${sheetTitle}!B2:C`,
        });
    } catch (err) {
        console.error(err.message);
        return;
    }

    const amountRange = response.result;
    if (!amountRange || !amountRange.values || amountRange.values.length == 0) {
        console.log("No values found.");
        return;
    }

    const amountList = document.querySelector(".amountList");
    amountRange.values.forEach((row) => {
        const li = document.createElement("li");
        li.textContent = row[0];
        if (row[1] !== undefined) {
            li.textContent += " " + row[1];
        }
        li.className = "amountListItem";
        amountList.appendChild(li);
    });
}
