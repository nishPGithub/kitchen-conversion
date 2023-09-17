const sheetID = '1aSFaoYzNI1JZBFTXS6ENvD-isTszCSKMs9axjgsTnZA';
const range = 'C7:C9';

// The corrected Google Sheets API URL
const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;


// Function to fetch data from Google Sheet and display as links
async function fetchData() {
    try {
        const response = await fetch(url);
        const data = await response.text();
        const json = JSON.parse(data.substr(47).slice(0, -2));
        const values = json.table.rows.map(row => row.c[0].v);
        const measurementData = document.getElementById('measurementData');

        values.forEach(value => {
            const link = document.createElement('a');
            link.href = value;
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
