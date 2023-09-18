// Replace 'YourSheetID' with the actual Google Sheet ID
const sheetID = '1aSFaoYzNI1JZBFTXS6ENvD-isTszCSKMs9axjgsTnZA';
const range = 'C7:C9';

// The Google Sheets API URL
const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:csv&range=${range}`;


// Function to fetch data from Google Sheet and display as links
async function fetchData() {
    try {
        const response = await fetch(url);
        const data = await response.text();
        const values = data.split('\n').filter(Boolean);
        const measurementData = document.getElementById('measurementData');

        values.forEach(value => {
            const link = document.createElement('a');
            link.href = "recipe.html";
            link.textContent = value;
            link.target = "_blank";
            measurementData.appendChild(link);
            measurementData.appendChild(document.createElement('br'));
        });
    } catch (error) {
        console.error(error);
    }
}

// Call the fetchData function when the page loads
window.addEventListener('load', fetchData);
