// Replace 'YourSheetID' with the actual Google Sheet ID
const sheetID = '1aSFaoYzNI1JZBFTXS6ENvD-isTszCSKMs9axjgsTnZA';
const range = 'C7:C9';

// The Google Sheets API URL
const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json&tq=SELECT%20${range}`;

// Function to fetch data from Google Sheet and display as links
async function fetchData() {
    try {
        const response = await fetch(url);
        const data = await response.text();
        const json = JSON.parse(data.replace('gdata.io.handleScriptLoaded(', '').slice(0, -2));
        const entries = json.feed.entry;
        const measurementData = document.getElementById('measurementData');

        entries.forEach(entry => {
            const value = entry.content.$t;
            const link = document.createElement('a');
            link.href = value;
            link.textContent = value;
            link.target = "_blank";
            measurementData.appendChild(link);
            measurementData.appendChild(document.createElement('br'));
        });
        } catch (error){
        console.error(error);
    }
}

// Call the fetchData function when the page loads
window.addEventListener('load', fetchData);
