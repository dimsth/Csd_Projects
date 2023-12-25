
window.onload = function () {
    getOwnerBookings();
};
function createTableFromPetKeeperData(data, index) {
    var html = "<div class='col-5 extra-tt'><h4>Pet Keeper " + index + "</h4><table class='table table-striped'><tr><th>Category</th><th>Value</th></tr>";
    for (const x in data) {
        var category = x;
        var value = data[x];
        html += "<tr><td>" + category + "</td><td>" + value + "</td></tr>";
    }
    html += "</table>";

    // Προσθήκη κουμπιού Request με τις πληροφορίες του PetKeeper
    html += "<button onclick='sendRequest("+JSON.stringify(data)+")' class='button'>Request</button>";

    html += "</div>";
    return html;
}

function createBookingsTable(bookings) {
    if (!bookings||bookings.length===0) {
        return '<p>No bookings available.</p>';
    }

    var tableHtml = '<table class="bookings-table"><thead><tr><th>Booking ID</th><th>Pet ID</th><th>Keeper ID</th><th>From Date</th><th>To Date</th><th>Status</th><th>Price</th></tr></thead><tbody>';

    bookings.forEach(function (booking) {
        tableHtml += '<tr>'+
                '<td>'+booking.booking_id+'</td>'+
                '<td>'+booking.pet_id+'</td>'+
                '<td>'+booking.keeper_id+'</td>'+
                '<td>'+booking.fromdate+'</td>'+// Changed to match the property names
                '<td>'+booking.todate+'</td>'+// Changed to match the property names
                '<td>'+booking.status+'</td>'+
                '<td>'+booking.price+'</td>'+
                '</tr>';
    });

    tableHtml += '</tbody></table>';

    return tableHtml;
}

function handleFormSubmission(event) {
    event.preventDefault();

    var ownerId = localStorage.getItem('userId'); // Assuming this is how you get the ownerId
    var petType = document.getElementById("userPetType").value.toLowerCase();

    if (petType==="dog"||petType==="cat") {
        checkPetTypeAndFetchKeepers(ownerId, petType, function (isMatchingType) {
            if (isMatchingType) {
                getAvailablePetKeepersByType(petType);
            } else {
                document.getElementById("availablePetKeepersResults").innerHTML = 'Your pet type does not match the entered type.';
            }
        });
    } else {
        document.getElementById("availablePetKeepersResults").innerHTML = 'Please enter a valid pet type (dog or cat).';
    }
}

function getAvailablePetKeepersByType(petType) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState===4&&xhr.status===200) {
            const response = JSON.parse(xhr.responseText);
            var content = '';
            var i = 1;
            for (let id in response.data) {
                content += createTableFromPetKeeperData(response.data[id], i);
                i++;
            }
            document.getElementById("availablePetKeepersResults").innerHTML = content;
        } else {
            document.getElementById('availablePetKeepersResults').innerHTML = 'Request failed. Returned status of '+xhr.status;
        }
    };
    xhr.open("GET", "http://localhost:4562/api/availablePetKeepers/"+encodeURIComponent(petType));
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}
// function createTableFromPetKeeperData... (your existing function)


function sendRequest(keeperData) {

    console.log("Pet Keeper Details:");
    console.log("ID: " + keeperData.keeper_id);
    console.log("Name: " + keeperData.username); // ή οποιαδήποτε άλλη πληροφορία υπάρχει στο αντικείμενο
    console.log("Email: " + keeperData.email);
    var fromDate = document.getElementById('fromDate').value;
    var toDate = document.getElementById('toDate').value;
    var resultsElement = document.getElementById("availablePetKeepersResults");

    hasAvailablePet(function (isAvailable, petId) {
        if (isAvailable) {
            hasNotRequested(function (canRequest) {
                if (canRequest) {
                    console.log("petId: " + petId);
                    var userId = localStorage.getItem('userId');
                    console.log("keeperData.keeper_id: "+keeperData.keeper_id);
                    console.log("fromDate: "+fromDate);
                    console.log("toDate: "+toDate);

                    if (fromDate&&toDate) {
                    var bookingData = {
                        owner_id: userId,
                        pet_id: petId, // Use the petId from hasAvailablePet
                            keeper_id: keeperData.keeper_id,
                            fromdate: fromDate,
                        todate: toDate,
                        status: "requested",
                        price: 10 // Set appropriate price
                    };

                    bookingData.owner_id = Number(bookingData.owner_id);
                    addBookingRequest(bookingData);
                        resultsElement.innerHTML = "Booking request sent.";

                    } else {
                        resultsElement.innerHTML = "Please enter all required fields todate and fromdate.";
                    }
                } else {
                    resultsElement.innerHTML = "You have already made a booking request.";
                }
            });
        } else {
            resultsElement.innerHTML = "No available pets for booking.";
        }
    });
}

function hasNotRequested(callback) {
    var userId = localStorage.getItem('userId');
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            console.log("Response from server: ", xhr.responseText); // Log the entire response for debugging
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                console.log("Parsed response: ", response); // Log the parsed response
                if (response.hasRequested) {
                    console.log("User has an active or pending booking.");
                    callback(false);
                } else {
                    console.log("User can make a booking.");
                    callback(true);
                }
            } else {
                console.error("Error checking booking requests: " + xhr.status);
                callback(false);
            }
        }
    };
    xhr.open('GET', 'http://localhost:4562/api/petOwners/' + userId + '/hasActiveOrPendingBooking');
    xhr.send();
}



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
function addBookingRequest(bookingData) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log("Booking request successfully added.");
                // You might want to redirect the user or update the UI here
            } else {
                console.error("Failed to add booking request: " + xhr.responseText);
            }
        }
    };
    console.log("bookingdata:");
    console.log(bookingData);
    xhr.open('POST', 'http://localhost:4562/api/addBooking');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(bookingData));
}
function checkPetTypeAndFetchKeepers(ownerId, enteredPetType, callback) {
    fetch(`http://localhost:4562/api/petOwners/${ownerId}/petType`)
            .then(response=>{
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Could not fetch pet type');
                }
            })
            .then(data=>{
                if (data.petType===enteredPetType) {
                    callback(true);
                } else {
                    callback(false);
                }
            })
            .catch(error=>{
                console.error('Error:', error);
                callback(false);
            });
}

function getOwnerBookings() {
    var ownerId = localStorage.getItem('userId');

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState===4) {
            if (xhr.status===200) {
                var response = JSON.parse(xhr.responseText);
                var bookings = response.data; // Extract the array from the 'data' property
                document.getElementById("owner_bookings_table").innerHTML = createBookingsTable(bookings);
            } else {
                document.getElementById('msg').innerHTML = 'Request failed. Status: '+xhr.status;
            }
        }
    };



    xhr.open("GET", "http://localhost:4562/ownerAPI/booking/"+ownerId);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.send();
}
