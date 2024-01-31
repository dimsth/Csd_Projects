function createTableFromJSON(data,i) {
    var html = "<div class=\'col-5 extra-tt \'><h4>Pet "+i+"</h4><table class=\"table table-striped\"><tr><th>Category</th><th>Value</th></tr>";
    for (const x in data) {
        var category=x;
        var value=data[x];
        html += "<tr><td>" + category + "</td><td>" + value + "</td></tr>";
    }
    html += "</table></div>";
    return html;

}

function getPets(){
const xhr = new XMLHttpRequest();
xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
           
            const obj = JSON.parse(xhr.responseText);
            var i=1;
            var count= Object.keys(obj.data).length;
            document.getElementById("msg").innerHTML = "";
            for(id in obj.data){
                    document.getElementById("msg").innerHTML+=createTableFromJSON(obj.data[id],i);
                    i++;

            }

        } else if (xhr.status !== 200) {
            document.getElementById('msg')
                    .innerHTML = 'Request failed. Returned status of ' + xhr.status + "<br>";
 
        }
    };

xhr.open("GET", "http://localhost:4567/petsAPI/pets");
xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send();
}

function addPet() {
    let myForm = document.getElementById('myForm');
    let formData = new FormData(myForm);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    var jsonData=JSON.stringify(data);
    
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
           document.getElementById('msg').innerHTML=JSON.stringify(xhr.responseText);
            
        } else if (xhr.status !== 200) {
            document.getElementById('msg')
                    .innerHTML = 'Request failed. Returned status of ' + xhr.status + "<br>"+
					JSON.stringify(xhr.responseText);
 
        }
    };
    xhr.open('POST', 'http://localhost:4567/petsAPI/pet');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(jsonData);
}


function getPetsTBW(){
const xhr = new XMLHttpRequest();
xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
           
        const obj = JSON.parse(xhr.responseText);
        var i=1;
        var count= Object.keys(obj.data).length;

        for(id in obj.data){
			document.getElementById("msg").innerHTML+=createTableFromJSON(obj.data[id],i);
			i++;
			
		}
            
        } else if (xhr.status !== 200) {
            document.getElementById('msg')
                    .innerHTML = 'Request failed. Returned status of ' + xhr.status + "<br>"
					+JSON.stringify(xhr.responseText);
        }
    };

var type=document.getElementById("type2").value;
var breed=document.getElementById("breed2").value;
var fromWeight=document.getElementById("fromWeight").value;
var toWeight=document.getElementById("toWeight").value;
xhr.open("GET", "http://localhost:4567/petsAPI/pets/"+type+"/"+breed+"?fromWeight="+fromWeight+"&toWeight="+toWeight);
xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send();
}


function updatePetWeight() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
           document.getElementById('msg').innerHTML=JSON.stringify(xhr.responseText);
            
        } else if (xhr.status !== 200) {
            document.getElementById('msg')
                    .innerHTML = 'Request failed. Returned status of ' + xhr.status + "<br>"+
					JSON.stringify(xhr.responseText);
 
        }
    };
	var name=document.getElementById("pet_id1").value;
	var weight=document.getElementById("weight2").value;
    xhr.open('PUT', 'http://localhost:4567/petsAPI/petWeight/'+name+"/"+weight);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
}

function deletePet() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
           document.getElementById('msg').innerHTML=JSON.stringify(xhr.responseText);
            
        } else if (xhr.status !== 200) {
            document.getElementById('msg')
                    .innerHTML = 'Request failed. Returned status of ' + xhr.status + "<br>"+
					JSON.stringify(xhr.responseText);
 
        }
    };
	var name=document.getElementById("pet_id2").value;
    xhr.open('DELETE', 'http://localhost:4567/petsAPI/petDeletion/'+name);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
}




function checkID(indexID, indexSubmit){
    var submit = document.getElementsByName("submit")[indexSubmit];
    var id = document.getElementsByName("pet_id")[indexID];
    var error = document.getElementById("error" + indexSubmit);
    var id_v = id.value;
    
    
    submit.disabled = false;
    error.classList.add("hidden");
    id.style.border = "";
    if(id_v.length !== 10){
        submit.disabled = true;
        error.classList.remove("hidden");
        id.style.border = "1.5px solid red";
    }
}

function checkWeight(indexWeight, indexSubmit){
    var submit = document.getElementsByName("submit")[indexSubmit];
    var weight = document.getElementsByName("weight")[indexWeight];
    var error = document.getElementById("error" + indexSubmit);
    var w_v = parseInt(weight.value);

    submit.disabled = false;
    error.classList.add("hidden");
    weight.style.border = "";
    if(w_v < 0){
        submit.disabled = true;
        error.classList.remove("hidden");
        weight.style.border = "1.5px solid red";
    }
}
function checkBirthyear(indexYear, indexSubmit){
    var submit = document.getElementsByName("submit")[indexSubmit];
    var year = document.getElementsByName("birthyear")[indexYear];
    var error = document.getElementById("error" + indexSubmit);
    var year_v = parseInt(year.value);
    
    submit.disabled = false;
    error.classList.add("hidden");
    year.style.border = "";
    if(year_v <= 2000){
        submit.disabled = true;
        error.classList.remove("hidden");
        year.style.border = "1.5px solid red";
    }
}

function checkOwner(indexOwner, indexSubmit){
    var submit = document.getElementsByName("submit")[indexSubmit];
    var owner = document.getElementsByName("owner_id")[indexOwner];
    var error = document.getElementById("error" + indexSubmit);
    var o_v = owner.value;
    console.log(o_v);
    
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("Owner Does Not Exists Pets Table");
            submit.disabled = false;
            error.classList.add("hidden");
            owner.style.border = "";
        } else if (xhr.status !== 200) {
            console.log("Owner Exists");
            submit.disabled = true;
            error.classList.remove("hidden");
            owner.style.border = "1.5px solid red";
        }
    };

    xhr.open("GET", "http://localhost:4567/petsAPI/owner/" + o_v);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

function checkPhoto(indexPhoto, indexSubmit){
    var submit = document.getElementsByName("submit")[indexSubmit];
    var photo = document.getElementsByName("photo")[indexPhoto];
    var error = document.getElementById("error"+indexSubmit);
    var p_v = photo.value;
    
    
    submit.disabled = false;
    error.classList.add("hidden");
    photo.style.border = "";
    if(!p_v.startsWith("http")){
        submit.disabled = true;
        error.classList.remove("hidden");
        photo.style.border = "1.5px solid red";
    }
}