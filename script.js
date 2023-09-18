const sheetID = '1aSFaoYzNI1JZBFTXS6ENvD-isTszCSKMs9axjgsTnZA';
const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:csv&range=B7:C`

async function fetchData() {
    try {
        const response = await fetch(url);
        const data = await response.text();
        const rows = data.split('\n').filter(Boolean);
        const titleMap = {};

        rows.forEach(row => {
            const columns = row.split(',');
            const id = columns[0].trim()
            const title = columns[1].trim()

            titleMap[id] = title;
        });
        console.log(titleMap);
        const measurementData = document.getElementById('measurementData');

        Object.keys(titleMap).forEach(id => {
            const link = document.createElement('a');
            link.href = "recipe.html"
            link.textContent = titleMap[id];
            link.target = "_self";
            measurementData.appendChild(link);
            measurementData.appendChild(document.createElement('br'));
        });
    } catch (error) {
        console.error(error);
    }
}
window.addEventListener('load', fetchData);

const navParent = document.querySelector(".headerLinks")
class RecipeLinks {
    constructor(parent){
        this.parent = parent;
        this.sheetID = '1aSFaoYzNI1JZBFTXS6ENvD-isTszCSKMs9axjgsTnZA';
        this.url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:csv&range=B7:C`;
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

        console.log(titleMap);
    }
}

new RecipeLinks(navParent);