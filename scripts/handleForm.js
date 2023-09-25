const form = document.querySelector(".numbersForm");
const inputField = form.elements.numberOfPeople;
const spanText =pageParent.querySelector(".people");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const numberOfPeople = form.elements.numberOfPeople.value;
    const multiplier = numberOfPeople / 100;
    changeAmount(sheetTitle, multiplier);
    inputField.value = "";
    spanText.innerHTML = numberOfPeople;
});

async function changeAmount(sheetTitle, multiplier) {
    let response;

    try {
      response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: "1aSFaoYzNI1JZBFTXS6ENvD-isTszCSKMs9axjgsTnZA",
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

    const amountListItems = document.querySelectorAll(".amountListItem");
    amountRange.values.forEach((row, index) => {
    if (row[0] !== undefined && !isNaN(parseFloat(row[0]))) {
        const amount = parseFloat(row[0]) * multiplier;
        const roundedAmount = amount.toFixed(2);
        amountListItems[index].textContent = roundedAmount;
        if (row[1] !== undefined) {
          amountListItems[index].textContent += " " + row[1];
        }
      }
    });
  }
