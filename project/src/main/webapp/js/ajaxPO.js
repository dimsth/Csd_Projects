function createTableFromPetKeeperData(data, index) {
    var html = "<div class='col-5 extra-tt'><h4>Pet Keeper " + index + "</h4><table class='table table-striped'><tr><th>Category</th><th>Value</th></tr>";
    for (const x in data) {
        var category = x;
        var value = data[x];
        html += "<tr><td>" + category + "</td><td>" + value + "</td></tr>";
    }
    html += "</table></div>";
    return html;
}
function getPetKeepers() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            var content = '';
            var i = 1; // Starting index for pet keepers
            for (let id in response.data) {
                content += createTableFromPetKeeperData(response.data[id], i);
                i++;
            }
            document.getElementById("availablePetKeepersResults").innerHTML = content;
        } else if (xhr.status !== 200) {
            document.getElementById('availablePetKeepersResults').innerHTML = 'Request failed. Returned status of ' + xhr.status;
        }
    };

    xhr.open("GET", "http://localhost:4568/api/petKeepers");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}
