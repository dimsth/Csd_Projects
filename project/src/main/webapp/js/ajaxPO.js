
window.onload = function () {
    getOwnerBookings();
    getOwnerReviews();
    checkLoggedIn();
};

function createTableFromPetKeeperData(data, index) {
    var html = "<div class='col-5 extra-tt'><h4>Pet Keeper "+index+"</h4><table class='table table-striped'><tr><th>Category</th><th>Value</th></tr>";
    for (const x in data) {
        var category = x;
        var value = data[x];

        if (category==='lat'||category==='lon'||category==='email'||category==='keeper_id') {
            continue;
        }

        if (category==='distance') {
            value = value.toFixed(2)+' km';
        }

        html += "<tr><td>"+category+"</td><td>"+value+"</td></tr>";
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
                '<td>'+getActionButtons(booking)+'</td>'+
                '</tr>';
    });

    tableHtml += '</tbody></table>';

    return tableHtml;
}
function getActionButtons(booking) {
    var buttons = '';

    if (booking.status==='accepted') {
        buttons += '<button onclick="finishBooking('+booking.booking_id+')">Finish</button> ';
    }

    if (booking.status==='finished') {
        buttons += '<button onclick="checkAndOpenReviewForm('+booking.booking_id+','+booking.keeper_id+')">Submit Review</button>';
    }

    return buttons;
}
function createReviewsTable(reviews) {
    if (!Array.isArray(reviews)) {
        console.error('Expected an array of reviews, but received:', reviews);
        return '<p>Error loading reviews.</p>';
    }
    if (!reviews||reviews.length===0) {
        return '<p>No reviews available.</p>';
    }

    var tableHtml = '<table class="reviews-table"><thead><tr><th>Review ID</th><th>Keeper ID</th><th>Review Text</th><th>Score</th></tr></thead><tbody>';

    reviews.forEach(function (review) {
        tableHtml += '<tr>'+
                '<td>'+review.review_id+'</td>'+
                '<td>'+review.keeper_id+'</td>'+
                '<td>'+review.reviewText+'</td>'+
                '<td>'+review.reviewScore+'</td>'+
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

async function getAvailablePetKeepersByType(petType) {
    try {
        // Fetch pet owner's location (this should return an object with lat and lon)
        const ownerLocation = await getPetOwnerLocation();

        // Fetch available pet keepers
        const response = await fetch("http://localhost:4562/api/availablePetKeepers/"+encodeURIComponent(petType), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Request failed with status: '+response.status);
        }

        const keepersData = await response.json();
        let keepers = keepersData.data;

        // Calculate distances and sort
        keepers.forEach(keeper=>{
            keeper.distance = calculateDistance(ownerLocation.lat, ownerLocation.lon, keeper.lat, keeper.lon);
        });
        keepers.sort((a, b)=>a.distance-b.distance);

        // Display the sorted list
        var content = '';
        keepers.forEach((keeper, index)=>{
            content += createTableFromPetKeeperData(keeper, index+1);
        });
        document.getElementById("availablePetKeepersResults").innerHTML = content;

    } catch (error) {
        console.error(error);
        document.getElementById('availablePetKeepersResults').innerHTML = error.message;
    }
}
async function getPetOwnerLocation() {
    var ownerId = localStorage.getItem('userId');
    console.log("Owner ID: ", ownerId);

    const response = await fetch(`http://localhost:4562/api/petOwnerLocation/${encodeURIComponent(ownerId)}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch pet owner location');
    }

    const data = await response.json();
    console.log(data);
    return {lat: data.lat, lon: data.lon};
}
function calculateDistance(lat1, lon1, lat2, lon2) {
    function toRad(x) {
        return x*Math.PI/180;
    }

    var R = 6371;
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var a =
            Math.sin(dLat/2)*Math.sin(dLat/2)+
            Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*
            Math.sin(dLon/2)*Math.sin(dLon/2);
    var c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R*c;
}


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
function getOwnerReviews() {
    var ownerId = localStorage.getItem('userId');
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState===4&&xhr.status===200) {
            var response = JSON.parse(xhr.responseText);
            var reviews = response.data; // Extract the array from the 'data' property
            document.getElementById("reviews_table").innerHTML = createReviewsTable(reviews);
        } else {
            document.getElementById('msg').innerHTML = 'Failed to load reviews. Status: '+xhr.status;
        }
    };
    xhr.open("GET", "http://localhost:4562/ownerAPI/reviews/"+ownerId);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.send();
}


function getPetKeepers() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState===4&&xhr.status===200) {
            const response = JSON.parse(xhr.responseText);
            var content = '';
            var i = 1; // Starting index for pet keepers
            for (let id in response.data) {
                content += createTableFromPetKeeperData(response.data[id], i);
                i++;
            }
            document.getElementById("availablePetKeepersResults").innerHTML = content;
        } else if (xhr.status!==200) {
            document.getElementById('availablePetKeepersResults').innerHTML = 'Request failed. Returned status of '+xhr.status;
        }
    };

    xhr.open("GET", "http://localhost:4568/api/petKeepers");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}
function checkAndOpenReviewForm(bookingId, keeper_id) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState===4&&xhr.status===200) {
            var response = JSON.parse(xhr.responseText);
            if (response.exists) {
                alert("Review already submitted for this booking.");
            } else {
                openReviewForm(bookingId, keeper_id);
            }
        }
    };
    xhr.open("GET", "http://localhost:4562/api/checkReview/"+bookingId);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.send();
}
function openReviewForm(bookingId, keeper_id) {
    var formHtml = '<div id="reviewForm" class="review-form">'+
            '<h3 class="review-form-title">Submit Review</h3>'+
            '<textarea id="reviewText" class="review-textarea"></textarea><br>'+
            '<h3 class="review-form-title">Review Score(1-5)</h3>'+
            '<input type="number" id="reviewScore" class="review-score" min="1" max="5"><br>'+
            '<button onclick="submitReview('+bookingId+','+keeper_id+')" class="review-submit-btn">Submit</button>'+
            '</div>';

    document.getElementById('review-form-container').innerHTML = formHtml;
}

function submitReview(bookingId, keeperId) {
    console.log("keeper_id: "+keeperId);

    var reviewText = document.getElementById('reviewText').value;
    var reviewScore = document.getElementById('reviewScore').value;
    var ownerId = localStorage.getItem('userId');

    // Perform validation if needed

    var reviewData = {
        owner_id: ownerId,
        keeper_id: keeperId,
        reviewText: reviewText,
        reviewScore: reviewScore
    };
    console.log(reviewData);
    // AJAX POST request to submit the review
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState===4) {
            if (xhr.status===200) {
                // Show a success message to the user
                alert("Review successfully submitted.");
                // Optionally clear the form or hide it
                document.getElementById('reviewForm').style.display = 'none';
            } else {
                // Show an error message to the user
                alert("Failed to submit review. Please try again.");
            }
        }
    };
    xhr.open("POST", "http://localhost:4562/api/submitReview");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(reviewData));
}
function finishBooking(bookingId) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState===4) {
            if (xhr.status===200) {
                alert("Booking successfully marked as finished.");
                // Refresh the bookings table or update the UI as needed
            } else {
                alert("Failed to update booking. Please try again.");
            }
        }
    };
    xhr.open("PUT", "http://localhost:4562/api/finishBooking/"+bookingId);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}
