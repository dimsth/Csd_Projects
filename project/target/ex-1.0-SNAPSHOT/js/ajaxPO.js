function createTableFromPetKeeperData(data, index) {
    var html = "<div class='col-5 extra-tt'><h4>Pet Keeper " + index + "</h4><table class='table table-striped'><tr><th>Category</th><th>Value</th></tr>";
    for (const x in data) {
        var category = x;
        var value = data[x];
        html += "<tr><td>" + category + "</td><td>" + value + "</td></tr>";
    }
    html += "</table>";

    // Προσθήκη κουμπιού Request με τις πληροφορίες του PetKeeper
    html += "<button onclick='sendRequest(" + JSON.stringify(data) + ")' class='button'>Request</button>";

    html += "</div>";
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

function sendRequest(keeperData) {
    console.log("Pet Keeper Details:");
    console.log("ID: " + keeperData.keeper_id);
    console.log("Name: " + keeperData.username); // ή οποιαδήποτε άλλη πληροφορία υπάρχει στο αντικείμενο
    console.log("Email: " + keeperData.email);

    hasAvailablePet(function (isAvailable, petId) {
        if (isAvailable) {
//            hasNotRequested(function (canRequest) {
//                if (canRequest) {
            console.log("petId: " + petId);
            var userId = localStorage.getItem('userId');
            console.log("userId: " + userId);

                    var bookingData = {
                        owner_id: userId,
                        pet_id: petId, // Use the petId from hasAvailablePet
                        keeper_id: keeperData.keeper_id,
                        fromdate: 0, // Set appropriate date
                        todate: 0, // Set appropriate date
                        status: "requested",
                        price: 0 // Set appropriate price
                    };
                    // Make the booking request here
//                } else {
//                    console.error("You have already made a booking request.");
//                }
//            });
        } else {
            console.error("No available pets for booking.");
        }
    });
}

//function hasNotRequested(callback) {
//    var userId = localStorage.getItem('userId');
//    var xhr = new XMLHttpRequest();
//    xhr.onload = function () {
//        if (xhr.status === 200) {
//            var response = JSON.parse(xhr.responseText);
//            if (response.hasRequested) {
//                callback(false);
//            } else {
//                callback(true);
//            }
//        } else {
//            console.error("Error checking booking requests");
//            callback(false);
//        }
//    };
//    xhr.open('GET', 'api/checkRequest?ownerId=' + userId);
//    xhr.send();
//}

function hasAvailablePet(callback) {
    var ownerId = localStorage.getItem('userId');
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response && response.data && response.data.pet_id) {
                    callback(true, response.data.pet_id); // Access pet_id from response.data
                } else {
                    callback(false, null);
                }
            } else if (xhr.status === 204) {
                callback(false, null);
            } else {
                console.error("Error fetching available pet: " + xhr.status);
                callback(false, null);
            }
        }
    };
    xhr.open('GET', 'http://localhost:4562/api/petOwners/' + ownerId + '/availablePet');
    xhr.send();
}
