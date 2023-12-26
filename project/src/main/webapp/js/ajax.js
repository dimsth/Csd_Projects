let user;

function createTableFromJSON(data) {
    var html = "<table><tr><th>Category</th><th>Value</th><th></th></tr>";
    for (const x in data) {
        var category = x;
        var value = data[x];
        if(category !== "keeper_id" && category !== "username" && category !== "email" && category !== "lat" && category !== "lon")
            html += "<tr><td>" + category + "</td><td id=\""+category+"-value\">" + value + "</td><td><button id=\""+category+"-btn\" onclick=\"clickedButton(\'"+category+"\')\">Change</button></td></tr>";
        else
            html += "<tr><td>" + category + "</td><td id=\""+category+"-value\">" + value + "</td><td></td></tr>";
    }
    html += "</table>";
    return html;

}

function getPetKeeperUser(string, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(0);
            } else {
                callback(1);
            }
        }
    };

    // Construct the query string manually
    var data = encodeURIComponent(string) + '=' + encodeURIComponent(document.getElementById(string).value);
    var url = 'GetPetKeeper?' + data;

    xhr.open('GET', url);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
}

function getPetOwnerUser(string, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(0);
            } else {
                callback(1);
            }
        }
    };

    // Construct the query string manually
    var data = encodeURIComponent(string) + '=' + encodeURIComponent(document.getElementById(string).value);
    var url = 'GetPetOwner?' + data;

    xhr.open('GET', url);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
}

function checkUser() {
    console.log("Keeper");
    getPetKeeperUser("username", function(ret) {
        var user = document.getElementById("username");
        user.style.backgroundColor = "";
        user.style.border = "";
        if (ret === 0){ //found
            user.style.backgroundColor = "red";
            user.style.border = "1.5px solid yellow";
            return 0;
        }
        
        console.log("Owner");
        getPetOwnerUser("username", function(ret) {
            var user = document.getElementById("username");
            user.style.backgroundColor = "";
            user.style.border = "";
            if (ret === 0){ //foundgetPetOwnerUser
                user.style.backgroundColor = "red";
                user.style.border = "1.5px solid yellow";
            }
        });
    });
}


function checkEmail() {
    console.log("Keeper");
    getPetKeeperUser("email", function(ret) {
        var email = document.getElementById("email");
        email.style.backgroundColor = "";
        email.style.border = "";
        if (ret === 0){ //found
            email.style.backgroundColor = "red";
            email.style.border = "1.5px solid yellow";
            return 0;
      }
      getPetOwnerUser("email", function(ret) {
            console.log("Owner");
            var email = document.getElementById("email");
            email.style.backgroundColor = "";
            email.style.border = "";
            if (ret === 0){ //found
                email.style.backgroundColor = "red";
                email.style.border = "1.5px solid yellow";
            }
        });
    });        
}


function addPetOwner(callback){
    var country = document.getElementById("country").value;
    var city = document.getElementById("city").value;
    var addr = document.getElementById("address").value;
    var addr_lon;
    var addr_lat;
    
    if (city !== "" && addr !== "") {
        var address = addr + " " + city + " " + country;
        request_ajax(address, function(ret) {
            if (ret && ret.length > 0) {
                console.log(ret);
                console.log("Lon:", ret[0].lon);
                console.log("Lat:", ret[0].lat);

                var formData = {
                    username: document.getElementById("username").value,
                    email: document.getElementById("email").value,
                    password: document.getElementById("password").value,
                    telephone: document.getElementById("telephone").value,
                    firstname: document.getElementById("firstname").value,
                    lastname: document.getElementById("lastname").value,
                    birthdate: document.getElementById("birthdate").value,
                    gender: document.querySelector('input[name="gender"]:checked').value,
                    country: document.getElementById("country").value,
                    city: document.getElementById("city").value,
                    address: document.getElementById("address").value,
                    personalpage: document.getElementById("personalpage").value,
                    job: document.getElementById("job").value,
                    lat: ret[0].lat,
                    lon: ret[0].lon
                };
                
    
                var xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            callback(0);
                        } else {
                            callback(1);
                        }
                    }
                };

                // Construct the query string manually
                var data = new URLSearchParams(formData).toString();
                console.log(data);
                var url = 'GetPetOwner?' + data;

                xhr.open('POST', url);
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhr.send();
            }
        });
    }
    
}

function addPetKeeper(callback){
    var country = document.getElementById("country").value;
    var city = document.getElementById("city").value;
    var addr = document.getElementById("address").value;
    var addr_lon;
    var addr_lat;
    
    if (city !== "" && addr !== "") {
        var address = addr + " " + city + " " + country;
        request_ajax(address, function(ret) {
            if (ret && ret.length > 0) {
                console.log(ret);
                console.log("Lon:", ret[0].lon);
                console.log("Lat:", ret[0].lat);
                
                

                var formData = {
                    username: document.getElementById("username").value,
                    email: document.getElementById("email").value,
                    password: document.getElementById("password").value,
                    telephone: document.getElementById("telephone").value,
                    firstname: document.getElementById("firstname").value,
                    lastname: document.getElementById("lastname").value,
                    birthdate: document.getElementById("birthdate").value,
                    gender: document.querySelector('input[name="gender"]:checked').value,
                    property: document.querySelector('input[name="property"]:checked').value,
                    catkeeper: document.getElementById("catkeeper").checked,
                    dogkeeper: document.getElementById("dog").checked,
                    propertydescription: document.getElementById("property-description").value,
                    catprice: document.getElementById("cat-price").value,
                    dogprice: document.getElementById("dog-price").value,
                    country: document.getElementById("country").value,
                    city: document.getElementById("city").value,
                    address: document.getElementById("address").value,
                    personalpage: document.getElementById("personalpage").value,
                    job: document.getElementById("job").value,
                    lat: ret[0].lat,
                    lon: ret[0].lon
                };
                
    
                var xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            callback(0);
                        } else {
                            callback(1);
                        }
                    }
                };

                // Construct the query string manually
                var data = new URLSearchParams(formData).toString();
                console.log(data);
                var url = 'GetPetKeeper?' + data;

                xhr.open('POST', url);
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhr.send();
            }
        });
    }
    
}


function addUser(event) {
    event.preventDefault();

    var check = document.getElementById("pet-type").value;  // Use .value to get the selected value
    if (check === "Pet keeper") {
        console.log("Keeper");
        addPetKeeper(function(ret) {
            var email = document.getElementById("email");
            email.style.backgroundColor = "";
            email.style.border = "";
            if (ret === 0) { //found
                email.style.backgroundColor = "red";
                email.style.border = "1.5px solid yellow";
                return 0;
            }
        });
    } else if (check === "Pet owner") {
        addPetOwner(function(ret) {
            console.log("Owner");
            var email = document.getElementById("email");
            email.style.backgroundColor = "";
            email.style.border = "";
            if (ret === 0) { //found
                email.style.backgroundColor = "red";
                email.style.border = "1.5px solid yellow";
            }
        });
    }
}

function getUser(callback) {
    var formData = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var responseData = JSON.parse(xhr.responseText);
                localStorage.setItem('userId', responseData.keeper_id);

                callback(0, xhr.responseText, "PetKeeper");
            } else {
                // If not found as Pet Keeper, try as Pet Owner
                var xhrOwner = new XMLHttpRequest();
                xhrOwner.onload = function () {
                    if (xhrOwner.readyState === 4) {
                        if (xhrOwner.status === 200) {
                            var responseData = JSON.parse(xhrOwner.responseText);
                            localStorage.setItem('userId', responseData.owner_id); // Assuming the response contains owner_id

                            callback(0, xhrOwner.responseText, "PetOwner");
                        } else {
                            callback(1, "");
                        }
                    }
                };
                xhrOwner.open('GET', 'GetPetOwner?' + new URLSearchParams(formData).toString());
                xhrOwner.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhrOwner.send();
            }
        }
    };

    xhr.open('GET', 'GetPetKeeper?' + new URLSearchParams(formData).toString());
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
}

function loginUser() {
    event.preventDefault();

    getUser(function (ret, response, userType, userId) {
        var main = document.getElementById("main-cont");
        var error = document.getElementById("error");
        var table = document.getElementById("table");

        if (ret === 0 && response !== "") {
            if (userType === "PetOwner") {

                localStorage.setItem('userType', 'PetOwner');
                console.log("PetOwner Logged In");

//                var userId = localStorage.getItem('userId');
//                console.log(userId);

                main.style.display = "none";
                error.style.display = "";
                table.style.display = "block";
                document.getElementById("table").innerHTML = createTableFromJSON(JSON.parse(response));

                window.location.href = "html/POloggedin.html";

            } else {
                // Handle Pet Keeper login
                localStorage.setItem('userType', 'PetKeeper');

                console.log("Pet Keeper Logged In");
                var userId = localStorage.getItem('userId');
                console.log(userId);

                main.style.display = "none";
                error.style.display = "";
                table.style.display = "block";
                document.getElementById("table").innerHTML = createTableFromJSON(JSON.parse(response));

                window.location.href = "html/PKloggedin.html";
            }
        } else {
            // Login failed
            console.log("Login Failed");
            main.style.display = "block";
            error.style.display = "flex";
            table.style.display = "none";
        }

        var logout = document.getElementById("logout");
        logout.classList.remove('hidden');
    });
}

function updateUser(string, callback){
    var tdElement = document.getElementById("username-value");
    var formData = {
                    username: tdElement.textContent || tdElement.innerText,
                    field: string,
                    value: document.getElementById(string+ "-input").value
                };
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(0, xhr.responseText);
            } else if (xhr.status !== 200) {
                callback(1, "");
            }
        }
    };

    // Construct the query string manually
    var data = new URLSearchParams(formData).toString();
    var url = 'GetPetKeeper?' + data;

    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
}

function clickedButton(string){
      hideAllInputs();
      console.log(string);
      // Show the input corresponding to the clicked button
      var inputId = string + '-input';
      var buttonId = string + '-button';
      var inputElement = document.getElementById(inputId);
      var buttonElement = document.getElementById(buttonId);
      if (inputElement) {
        console.log(string + "is revelead");
        inputElement.classList.remove('hidden');
        buttonElement.classList.remove('hidden');
      }
}

function hideAllInputs() {
      var allInputs = document.querySelectorAll('[id$="-input"]');
      var allButtons = document.querySelectorAll('[id$="-button"]');;
      allInputs.forEach(function (input) {
        input.classList.add('hidden');
      });
      allButtons.forEach(function (btn) {
        btn.classList.add('hidden');
      });
 }
 
 function clickSubmit(string) {
    updateUser(string, function(ret, response) {
            if (ret === 0) { //found
                console.log("Success");
                document.getElementById("table").innerHTML = createTableFromJSON(JSON.parse(response));
                return 0;
            }
            console.log("Failed");
    });
    hideAllInputs();
 }
 
 function logoutUser(){
    var formData = {
                    logout: "true"
    };

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("Success");
                var userId = localStorage.getItem('userId');

                console.log(userId);

                localStorage.removeItem('userType');
                localStorage.removeItem('userId');
                console.log("User type cleared from localStorage");

                var logout = document.getElementById("logout");          
                var main = document.getElementById("main-cont");
                var table = document.getElementById("table");

                if(main !== null && table !== null){
                    document.getElementById("table").innerHTML = emptyTableFromJSON();
                    main.style.display = "block";
                    table.style.display = "none";
                    logout.classList.add('hidden');
                }
                
                var lr = document.getElementById("lr");
                var pl = document.getElementById("pl");
                if(lr !== null && pl !== null){
                    lr.style.display = "flex";
                    pl.style.display = "none";
                }
                window.location.href = 'index.html';
            } else if (xhr.status !== 200) {
                console.log("Failed");
            }
        }
    };

    // Construct the query string manually
    var data = new URLSearchParams(formData).toString();
    var url = 'GetPetKeeper?' + data;

    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
 }
 
 function emptyTableFromJSON(data) {
    var html = "<table><tr><th>Category</th><th>Value</th><th></th></tr>";
    html += "</table>";
    return html;
}

function checkLoggedIn() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log("Success");
                var logout = document.getElementById("logout");
                var main = document.getElementById("main-cont");
                var table = document.getElementById("table");

                if (main !== null && table !== null) {
                    document.getElementById("table").innerHTML = createTableFromJSON(JSON.parse(xhr.responseText));
                    main.style.display = "none";
                    table.style.display = "block";
                    logout.classList.remove('hidden');
                }

                var lr = document.getElementById("lr");
                var pl = document.getElementById("pl");
                if (lr !== null && pl !== null) {
                    lr.style.display = "none";
                    pl.style.display = "flex";
                }
                user = JSON.parse(xhr.responseText);
                user = user["keeper_id"];
            } else {
                console.log("Failed");
            }
        }
    };

    // Determine which endpoint to call based on user type
    var userType = localStorage.getItem('userType'); // Replace with your method of retrieving user type
    var url = userType==='PetOwner'?'GetPetOwner':'GetPetKeeper?';
    console.log(url);
    xhr.open('GET', url);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
}

function adjustBackLink() {
    var userType = localStorage.getItem('userType');
    var backLink = document.getElementById('backLink');

    if (userType) {
        if (userType === 'PetOwner') {
            backLink.href = 'html/POloggedin.html';
        } else if (userType === 'PetKeeper') {
            backLink.href = 'html/PKloggedin.html'; // Adjust as needed
        }
    } else {
        backLink.href = 'index.html';
    }
}
