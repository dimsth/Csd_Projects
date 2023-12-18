function check_pass() {
  var id_p = document.getElementsByName('password');
  var id_vp = document.getElementsByName('verify-password');
  var s_b = document.getElementById("submit-button");
  var p_label = document.getElementById("errorVPText");

  var string_p = id_p[0].value;
  var string_vp = id_vp[0].value;

  id_p[0].style.backgroundColor = "";
  id_p[0].style.border = "";
  id_vp[0].style.backgroundColor = "";
  id_vp[0].style.border = "";

  p_label.textContent = "";
  p_label.style.display = "none";

  s_b.disabled = false;

  if (string_vp !== "" && string_p !== string_vp) {
    id_p[0].style.backgroundColor = "red";
    id_p[0].style.border = "1.5px solid black";
    id_vp[0].style.backgroundColor = "red";
    id_vp[0].style.border = "1.5px solid black";

    p_label.textContent = "Wrong Pass";
    p_label.style.display = "block";

    s_b.disabled = true;
  }
}

function check_string_pass(text) {
  var num_count = 0;
  var cap_count = 0;
  var lower_count = 0;
  var sym_count = 0;

  if (text.includes("cat") || text.includes("dog") || text.includes("skulos") || text.includes("gata"))
    return 1;

  for (var i = 0; i < text.length; i++) {
    if (text[i] >= '0' && text[i] <= '9')
      num_count++;
    else if (text[i] >= 'A' && text[i] <= 'Z')
      cap_count++;
    else if (text[i] >= 'a' && text[i] <= 'z')
      lower_count++;
    else
      sym_count++;
  }

  if (num_count >= (text.length / 2))
    return 2;

  if (num_count >= 3 && cap_count > 0 && lower_count > 0 && sym_count > 0)
    return 3;

  return 0;
}

function check_safety_pass() {
  var id_p = document.getElementsByName('password');
  var string_p = id_p[0].value;

  var p_label = document.getElementById("errorPText");
  var s_b = document.getElementById("submit-button");

  var ret = check_string_pass(string_p);


  id_p[0].style.backgroundColor = "";
  id_p[0].style.border = "";
  p_label.textContent = "";

  p_label.textContent = "Medium Pass";
  p_label.style.color = "yellow";
  p_label.style.display = "Block";

  s_b.disabled = false;

  if (ret === 1) {
    id_p[0].style.backgroundColor = "red";
    id_p[0].style.border = "1.5px solid black";

    p_label.textContent = "Forbiden Pass!!";
    p_label.style.color = "red";
    p_label.style.display = "block";

    s_b.disabled = true;
    return;
  } else if (ret === 2) {
    id_p[0].style.backgroundColor = "red";
    id_p[0].style.border = "1.5px solid black";

    p_label.textContent = "Weak Pass";
    p_label.style.color = "red";
    p_label.style.display = "block";

    s_b.disabled = true;
    return;
  } else if (ret === 3) {
    id_p[0].style.backgroundColor = "";
    id_p[0].style.border = "";

    p_label.textContent = "Strong Pass";
    p_label.style.color = "green";
    p_label.style.display = "block";

    s_b.disabled = false;
  }
  check_pass();
}

function handlePetTypeChange() {
  var petTypeSelect = document.getElementById("pet-type");
  var additionalFields = document.getElementById("additional-fields");
  var additionalFieldsDesc = document.getElementById("additional-fields-desc");

  // Hide the additional fields
  additionalFields.style.display = "none";
  additionalFieldsDesc.style.display = "none";

  if (petTypeSelect.value === "Pet keeper") {
    // Show the additional fields
    additionalFields.style.display = "flex";
    additionalFieldsDesc.style.display = "block";

  }
}

function handleDogCheckbox(checkbox) {
  var dogField = document.getElementById("dog-cont");

  dogField.style.display = "none";
  if (checkbox.checked)
    dogField.style.display = "flex";
}

function handleCatCheckbox(checkbox) {
  var catField = document.getElementById("cat-cont");

  if (checkbox.disabled) {
    checkbox.checked = false;
  }

  catField.style.display = "none";
  if (checkbox.checked)
    catField.style.display = "flex";
}

function handleAccommodationChange(radio) {
  var catCheckbox = document.getElementById("catkeeper");
  var petCheckboxContainer = document.getElementById("pet-choice");

  petCheckboxContainer.style.display = "block";

  catCheckbox.disabled = false;
  catCheckbox.style.opacity = 1;
  if (radio.value === "outdoor") {
    catCheckbox.disabled = true;
    catCheckbox.style.opacity = .5;
    handleCatCheckbox(catCheckbox);
  }
}

function togglePasswordVisibility() {
  var passwordField = document.getElementById("password");
  var toggleBtn = document.getElementById("toggleBtn");

  if (passwordField.type === "password") {
      passwordField.type = "text";
      toggleBtn.textContent = "👁️";
  } else {
      passwordField.type = "password";
      toggleBtn.textContent = "👁️";
  }
}