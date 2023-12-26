let book_id;

function createStatusTable(data) {
    var html = "<table class=\"table table-striped\"><tr><th>Category</th><th>Value</th></tr>";
    var value = data[0];
    if (value === null)
        value = 0;
    html += "<tr><td>Jobs Finished</td><td id=\"jobs-value\">" + value + "</td></tr>";

    value = data[1];
    if (value === null)
        value = 0;
    html += "<tr><td>Days Worked</td><td id=\"days-value\">" + value + "</td></tr>";

    value = data[2];
    if (value === null)
        value = 0;
    html += "<tr><td>Rate</td><td id=\"rate-value\">" + value + "</td></tr>";

    html += "</table>";
    return html;
}

function createRevTable(data) {
    var html = "<table class=\"table table-striped\">";

    let count = 0;
    for (const x in data) {
        if (count >= 3) {
            var value = data[x];
            html += "<tr><td id=\"review-value\">" + value + "</td></tr>";
        }
        count++;
    }

    html += "</table>";
    return html;
}

function createJobTable(data){
    book_id = data[0];

    var html = "<table class=\"table table-striped-columns\"><tr><th>Owner ID</th><th>Pet ID</th><th>From</th><th>To</th><th></th></tr><tr>";

    var value = data[1];
    html += "<td id=\"owner_id-value\">" + value + "</td>";

    value = data[2];
    html += "<td id=\"pet_id-value\">" + value + "</td>";

    value = data[3];
    html += "<td id=\"from-value\">" + value + "</td>";

    value = data[4];
    html += "<td id=\"to-value\">" + value + "</td>";

    value = data[5];
    if(value === " requested")
        html += "<td id=\"request-value\">" + 
            "<button type=\"button\" class=\"btn btn-success\" onclick=\"sendStatus(\'accepted\')\">Accept</button>" + 
            "<button type=\"button\" class=\"btn btn-danger\" onclick=\"sendStatus(\'rejected\')\">Decline</button>" +
            "</td>";

//    "<button type=\"button\" class=\"btn btn-success\">Accept</button>"
//    "<button type=\"button\" class=\"btn btn-danger\">Decline</button>"

    if(value === " accepted")
        html += "<td id=\"accept-value\">" + 
            "<button type=\"button\" class=\"btn btn-secondary\">Ask ChatGPT</button>" + 
            "<button type=\"button\" class=\"btn btn-light\">Message Owner</button>" +
            "</td>";

//    "<button type=\"button\" class=\"btn btn-secondary\">Ask ChatGPT</button>"
//    "<button type=\"button\" class=\"btn btn-light\">Message Owner</button>"

    html += "</tr></table>";
    return html;
}

function emptyTable() {
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

function emptyJobTable(){
    var html = "<table class=\"table table-striped-columns\"><tr><th>Owner ID</th><th>Pet ID</th><th>From</th><th>To</th><th></th></tr>";
    html += "</table>";
    return html;
}

function getPKInfo(){
    setTimeout(function () {
    const xhr = new XMLHttpRequest();
xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
		var obj = xhr.responseText;
                obj = obj.replace(/\[|\]/g, ''); // Remove brackets
                obj = obj.split(',');
		document.getElementById("status_table").innerHTML+=createStatusTable(obj);
                document.getElementById("reviews_table").innerHTML+=createRevTable(obj);
                getBooking();
        } else if (xhr.status !== 200) {
            document.getElementById('msg')
                    .innerHTML = 'Request failed. Returned status of ' + xhr.status + "<br>";
        }
    };
console.log(user);
xhr.open("GET", "http://localhost:4568/keeperAPI/" + user);
xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send();
 }, 500);
}

function getBooking(){
    const xhr = new XMLHttpRequest();
xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
		var obj = xhr.responseText;
                obj = obj.replace(/\[|\]/g, ''); // Remove brackets
                obj = obj.split(',');
                if (obj.length !== 1)
                    document.getElementById("jobs_table").innerHTML=createJobTable(obj);
        } else if (xhr.status !== 200) {
            document.getElementById('msg')
                    .innerHTML = 'Request failed. Returned status of ' + xhr.status + "<br>";
       }
    };
xhr.open("GET", "http://localhost:4568/keeperAPI/booking/" + user);
xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send();
}

function sendStatus(but_name){
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                document.getElementById("jobs_table").innerHTML=emptyJobTable();
                getBooking();
            } else if (xhr.status !== 200) {
                document.getElementById('msg')
                        .innerHTML = 'Request failed. Returned status of ' + xhr.status + "<br>";
            }
        };
    xhr.open("PUT", "http://localhost:4568/keeperAPI/booking/" + book_id + "/" + but_name);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

function createChatsChat(text, user) {
    var html = "<p class=\"user-"+user+"\">";
    html += text;
    html += "</p>";
    return html;
}

function askChatGPT(){
    let text = document.getElementById("floatingInputGroup1").value;
    if (text === ""){
        return;
    }
    document.getElementById("display-chat").innerHTML=createChatsChat(text, "user");
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                text = xhr.responseText.slice(1, -1);
                document.getElementById("display-chat").innerHTML+=createChatsChat(text,"chat");
            } else if (xhr.status !== 200) {
                document.getElementById('msg')
                        .innerHTML = 'Request failed. Returned status of ' + xhr.status + "<br>";
            }
        };
    xhr.open("Get", "http://localhost:4568/keeperAPI/chatgtp/" + text);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

function fillInput(input) {
    document.getElementById('floatingInputGroup1').value = input;
}