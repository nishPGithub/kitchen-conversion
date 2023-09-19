const navParent = document.querySelector(".headerLinks")

class RecipeLinks {
    constructor(parent){
        this.parent = parent;
        this.sheetID = '1aSFaoYzNI1JZBFTXS6ENvD-isTszCSKMs9axjgsTnZA';
        this.url = `https://docs.google.com/spreadsheets/d/${this.sheetID}/gviz/tq?tqx=out:csv&range=B7:C`;
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
            link.href = "recipe.html";
            link.textContent = cleanedTitle;
            link.target = "_self";
            measurementData.appendChild(link);
            measurementData.appendChild(document.createElement('br'));
            console.log(link.dataID);
        });
      }
}

new RecipeLinks(navParent);