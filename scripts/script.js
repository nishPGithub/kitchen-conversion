const navParent = document.querySelector(".headerLinks")

/*const { google } = require('googleapis');
const sheets = google.sheets('v4');

// Load client secrets from your credentials.json file
const credentials = require('./credentials.json');

const { client_secret, client_id, redirect_uris } = credentials.web;

const oAuth2Client = new google.auth.OAuth2(
  client_id, client_secret, redirect_uris[0]
);

async function readKhichidiIngredients() {
    try {
      const spreadsheetId = '1aSFaoYzNI1JZBFTXS6ENvD-isTszCSKMs9axjgsTnZA';
      const range = 'Khichidi Ingredients!A1:Z';
  
      const response = await sheets.spreadsheets.values.get({
        auth: oAuth2Client,
        spreadsheetId,
        range,
      });
  
      const values = response.data.values;
  
      if (values.length) {
        // Process and use the data as needed
        console.log(values);
      } else {
        console.log('No data found.');
      }
    } catch (error) {
      console.error('Error reading data:', error);
    }
  }

  readKhichidiIngredients();*/

class RecipeLinks {
    constructor(parent){
        this.parent = parent;
        this.sheetID = '1aSFaoYzNI1JZBFTXS6ENvD-isTszCSKMs9axjgsTnZA';
        this.url = `https://docs.google.com/spreadsheets/d/${this.sheetID}/gviz/tq?tqx=out:csv&range=B7:C`;
        this.pageTitle = document.querySelector(".pageTitle")
        this.fetchData();
    }

    fetchData() {
        try {
            fetch(this.url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(data => {
                    const rows = data.split('\n').filter(Boolean);
                    this.splitData(rows);
                })
                .catch(error => {
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    }
    
    splitData(rows){
        const titleMap = {};
        
        rows.forEach(row => {
            const columns = row.split(',');
            const id = columns[0].trim()
            const title = columns[1].trim()
            titleMap[id] = title;
        })
        this.createLinks(titleMap)
    }

    createLinks(titleMap) {
        Object.keys(titleMap).forEach(id => {
            const link = document.createElement('a');
            const cleanedTitle = titleMap[id].replace(/"/g, '');
            link.dataID = titleMap[id];
            link.href = `recipe.html?recipe=${encodeURIComponent(cleanedTitle)}`;
            link.textContent = cleanedTitle;
            link.target = "_self";
            measurementData.appendChild(link)
        });
    }
}

new RecipeLinks(navParent);