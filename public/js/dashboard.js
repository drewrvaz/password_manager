// Open Add Password Card Modal
$("#addPassBtn").on("click", function() {
  $("#addPassModalName").val("");
  $("#addPassModalUname").val("");
  $("#addPassModalPWD").val("");
  $("#addPassModalPWD2").val("");
  $("#addPassModalURL").val("");
  $("#addPassModalLabel").val("");
  $("#addPassModalMsg").val("");
  $("#addPassModalPWDConstraints").empty();

  let pwdPolicy = JSON.parse(window.localStorage.getItem("pwdPolicy"));

  //console.log(pwdPolicy);

  if (pwdPolicy) {

    if (pwdPolicy.special_char) $("#addPassModalPWDConstraints").append(", special");
    if (pwdPolicy.numbers) $("#addPassModalPWDConstraints").append(", numbers");
  
    $("#addPassModalPWDConstraints").append(", and a length of " + pwdPolicy.length);

  } else $("#addPassModalPWDConstraints").append("special, numbers, and length of 15");

  $("#addPassModal").addClass('is-active');
});

// Save Password Card 
$("#addPassSaveBtn").on("click", async function() {
  
  $("#addPassModalMsg").empty();

  const loc = document.location;
  const error = "Add was unsuccessful.  Check form for errors and try again."
  const success = "Add successful. If done click close, else fill out to add another."

  const name = $("#addPassModalName").val();
  const username = $("#addPassModalUname").val();
  const pwd1 = $("#addPassModalPWD").val();
  const pwd2 = $("#addPassModalPWD2").val();
  const url = $("#addPassModalURL").val();
  const label = $("#addPassModalLabel").val();
  const placeholder = "Placeholder";


  const data = {
    passphrase: placeholder,
    url: url,
    name: name,
    username: username,
    password: pwd1,
    confirmPassword: pwd2,
    label: label
  };

  if ((pwd1 === pwd2) && pwd1 && pwd2 && name){
        
  await fetch(`${loc.origin}/dashboard`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      })
      .then((response) => {

        console.log(response.status);

        if (response.status === 200) {
          $("#addPassModalMsg").append(success);
          $("#addPassModalName").val("");
          $("#addPassModalUname").val("");
          $("#addPassModalPWD").val("");
          $("#addPassModalPWD2").val("");
          $("#addPassModalURL").val("");
          $("#addPassModalLabel").val("");
          $("#addPassModalMsg").val("");

        } else $("#addPassModalMsg").append(error);
        // console.log(response.status)
      });
  
  } else $("#addPassModalMsg").append(error);
      
});

// Close Add Password Modal
$("#addPassCloseBtn").on("click", function() {
  const loc = document.location;
  $("#addPassModal").removeClass('is-active');
  loc.reload();
});


//  Open Site Information Modal
$("#siteInfoBtn").on("click", function() {
  $("#siteInfoModal").addClass('is-active');
});

//  Close Site Information Modal
$("#siteInfoModalCloseBtn").on("click", function() {
  $("#siteInfoModal").removeClass('is-active');
});

// Send Password to Clipboard, creates one for each password card
$(".passphraseClipboard").on("click", async function() {
  const loc = document.location;
  let password = "";

  const data = {
    id: this.dataset.id
  };

  await fetch(`${loc.origin}/retrievePWD`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(res => {

      password = res;

    });
  
  navigator.clipboard.writeText(password);

});

// Opens Password Modal, creates one for each password card
$(".passphraseView").on("click", async function() {
  const loc = document.location;
  $("#viewPWDModal").addClass('is-active');
  $("#viewPWDOutput").empty();
  
  const data = {
    id: this.dataset.id
  };
  
  await fetch(`${loc.origin}/retrievePWD`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(res => {

      $("#viewPWDOutput").append(res);

    });
  
});

// Closes Password Modal
$("#viewPWDCloseBtn").on("click", function() {
  $("#viewPWDModal").removeClass('is-active');
});

// Delete Card Dropdown option, creates one for each card
$(".DeletePassword").on("click", async function() {
  const loc = document.location;
  $("#viewDeleteStatusMsg").empty();
  
  const data = {
    id: this.dataset.id
  };
  
  await fetch(`${loc.origin}/api/passphrase/${this.dataset.id}`, {
    method: 'DELETE'
  })
    .then(res => {

      if (res.status === 200) {
        console.log("Delete was successful");
        $("#viewDeleteStatus").addClass('is-active');
        $("#viewDeleteStatusMsg").append("Delete was successful");
      } else {
        console.log("Delete was unsuccessful");
        $("#viewDeleteStatus").addClass('is-active');
        $("#viewDeleteStatusMsg").append("Delete was unsuccessful");
      }

    });

});

// Delete Status Modal
$("#viewDeleteStatusBtn").on("click", function() {
  const loc = document.location;
  $("#viewDeleteStatus").removeClass('is-active');
  loc.reload();
});

// Share Password drop down option
$(".SharePassword").on("click", async function() {
  const loc = document.location;
  $("#viewOTPOutput").empty();

  const data = {
    id: this.dataset.id
  };
  
  await fetch(`${loc.origin}/retrieveOTP`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(res => res.json())
  .then(res => { 

      console.log(res);

      if (res.passcode) {
        $("#viewOTPOutput").append(res.passcode);
      } else {
        $("#viewOTPOutput").append("Could not retrieve OTP");
      }
      $("#viewOTPModal").addClass('is-active');

    });

});

// Close OTP Modal
$("#viewOTPCloseBtn").on("click", function() {
  const loc = document.location;
  $("#viewOTPModal").removeClass('is-active');
});

// Send OTP to clipboard then close
$("#viewOTPSendToClipboardBtn").on("click", function() {
  const passcode = $("#viewOTPOutput").text();
  navigator.clipboard.writeText(passcode);
  $("#viewOTPModal").removeClass('is-active');
});

// Open Retrieve Password using OTP Modal
$("#retrivePassOTPBtn").on("click", function() {
  $("#useOTPInput").val("");
  $("#useOTPOutput").empty();
  $("#useOTPModal").addClass('is-active');
});

// Close Retrieve Password using OTP Modal
$("#useOTPCloseBtn").on("click", function() {
  $("#useOTPModal").removeClass('is-active');
});

// Get Password using OTP
$("#useOTPRetrieveBtn").on("click", async function() {
  const loc = document.location;
  $("#useOTPOutput").empty();
  const passcode = $("#useOTPInput").val();
  const data = {
    passcode: passcode
  };
  
  await fetch(`${loc.origin}/useOTPretrievePWD`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(res => res.json())
  .then(res => { 

      // console.log(res);
      if (res.password) {
        // console.log("Delete was successful");
        $("#useOTPOutput").append(res.password);
      } else {
        // console.log("Delete was unsuccessful");
        $("#useOTPOutput").append("Could not retrieve password, try again");
      }
    });
});

// Send Password to Clip for Retrieve OTP Modal
$("#useOTPSendToClipBoard").on("click", function() {
  const password = $("#useOTPOutput").text();
  navigator.clipboard.writeText(password);
  $("#useOTPModal").removeClass('is-active');
});

// Open Edit Password Modal
$(".EditPassword").on("click", async function() {
  const loc = document.location;
  $("#editPassModalName").val("");
  $("#editPassModalUname").val("");
  $("#editPassModalPWD").val("");
  $("#editPassModalPWD2").val("");
  $("#editPassModalURL").val("");
  $("#editPassModalLabel").val("");
  $("#editPassModalMsg").val("");
  $("#editPassModalPWDConstraints").empty();

  var pwdPolicy = JSON.parse(window.localStorage.getItem("pwdPolicy"));

  //console.log(pwdPolicy);

  if (!pwdPolicy){

    await fetch(`${loc.origin}/getPolicy`)
              .then(res => res.json())
              .then(res => {
                pwdPolicy = res;
                window.localStorage.setItem('pwdPolicy',JSON.stringify(res));
            });
    // $("#editPassModalPWDConstraints").append(", special, numbers, and length of 15");
  }

  if (pwdPolicy.special_char) $("#editPassModalPWDConstraints").append(", special");
  if (pwdPolicy.numbers) $("#editPassModalPWDConstraints").append(", numbers");
  $("#editPassModalPWDConstraints").append(", and a length of " + pwdPolicy.length);

  await fetch(`${loc.origin}/editPWD/${this.dataset.id}`)
  .then(res => res.json())
  .then(res => { 

      if (res) {
        // console.log("Delete was successful");
        $("#editPassModalName").val(res.name);
        $("#editPassModalUname").val(res.username);
        $("#editPassModalPWD").val(res.password);
        $("#editPassModalPWD2").val(res.password);
        $("#editPassModalURL").val(res.url);
        $("#editPassModalLabel").val(res.label);
        $("#editPassModal").addClass('is-active');
        $("#editPassSaveBtn").attr("data-id",this.dataset.id);
        $("#editPassModalPWDMatch").html(`Passwords match <span class="has-text-success"><i class="fa-solid fa-square-check"></i></span>`);
        $("#editPassModalPWDPolicy").html(`Password meets policy standards <span class="has-text-success"><i class="fa-solid fa-square-check"></i>`);
      } else {
         $("#editPassModalMsg").append("Unable to retrieve password data.  Cancel and try again.");
         $("#editPassModal").addClass('is-active');
      }

    });

});

// Edit Password Card 
$("#editPassSaveBtn").on("click", async function() {
  $("#editPassModalMsg").empty();
  const loc = document.location;
  const error = "Edit was unsuccessful.  Check form for errors and try again."
  const success = "Edit successful. Click close when done."

  if ($("#editPassModalPWD").val() === $("#editPassModalPWD2").val()){

    const data = {
      id: this.dataset.id,
      url: $("#editPassModalURL").val(),
      name: $("#editPassModalName").val(),
      username: $("#editPassModalUname").val(),
      password: $("#editPassModalPWD").val(),
      label: $("#editPassModalLabel").val()
    };
        
    await fetch(`${loc.origin}/editPWD`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response) => {

          console.log(response.status);
          if (response.status === 200) $("#editPassModalMsg").append(success);
          else $("#editPassModalMsg").append(error);
    
        })

  } else $("#editPassModalMsg").append(error);
      
});

// Close Edit Password Modal
$("#editPassCancelBtn").on("click", function() {
  const loc = document.location;
  $("#editPassModal").removeClass('is-active');
  loc.reload();
});

// Open Password Test Modal
$("#testPWDBtn").on("click", function() {
  $("#testPWDModal").addClass('is-active');
});

// Close Password Test Modal
$("#testPWDModalCloseBtn").on("click", function() {
  $("#testPWDModal").removeClass('is-active');
});

// Run Password Test
$("#runTestPWDModalBtn").on("click", async function() {
  $("#testPWDModalResult").empty();
  const loc = document.location;
  const error = "Search error"
  const success1 = "Password found"
  const success2 = "Password not found"

  if ($("#testPWDModalPassword").val() !== ""){

    const data = {
      password: $("#testPWDModalPassword").val(),
    };
        
    await fetch(`${loc.origin}/testPWD`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(res => { 

          // console.log(res);
          if (res.result) $("#testPWDModalResult").append(success1);
          else $("#testPWDModalResult").append(success2);
    
        })

  } else $("#testPWDModalResult").append(error);
      
});


// Set Password Policy Length Slider 
var slider = document.getElementById("setPolicyModalLength");
var output = document.getElementById("pwdLengthValue");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle
slider.oninput = function() {
  output.innerHTML = this.value;
}

//Open Set Policy
$("#setPolicyBtn").on("click", function() {
  $("#setPolicyModal").addClass('is-active');
});

//Close Set Policy
$("#pwdPolicyCancelBtn").on("click", function() {
  $("#setPolicyModal").removeClass('is-active');
});

//Save Password Policy
$("#savePWDPolicyBtn").on("click", async function() {
  
  $("#setPolicyOutput").empty();
  const loc = document.location;
  const error = "Error saving policy"
  const success = "Policy saved"

    const data = {
      length: $("#setPolicyModalLength").val(),
      special_char: $("#setPolicyModalSpecial").is(':checked'),
      numbers: $("#setPolicyModalNumber").is(':checked')
    };
        
    await fetch(`${loc.origin}/setPolicy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(res => { 
          if (res.message === "Success") {
            $("#setPolicyOutput").append(success);
            window.localStorage.setItem("pwdPolicy", JSON.stringify(data));

          }
          else $("#setPolicyOutput").append(error);
    
        })

});

//Filter based on dropdown of labels
$("#labelFilterBtn").on("click", async function() {
  const loc = document.location;
  const data = {
    name: $("#labelSelect").val()
  };
  if ($("#labelSelect").val() === "All") {
    for (let i = 0; i < $(".card").length; i++){
      let element = $(".card")[i];
      element.style.display = "block";
      // console.log($(".card")[i]);
    }

  } else {
    await fetch(`${loc.origin}/labelNameToId`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
  .then(res => res.json())
  .then(res => { 
  
    console.log(res);
    if (res.id) {
      let className = "label-" + res.id.toString();

      for (let i = 0; i < $(".card").length; i++){
       let element = $(".card")[i];

        if (element.classList.contains(className)) element.style.display = "block";
        else element.style.display = "none";
      }
    }
    else console.log("Error getting id")
  
  })

  }
 
});


function checkPasswordMatchAdd() {
  var password = $("#addPassModalPWD").val();
  var confirmPassword = $("#addPassModalPWD2").val();
  var pwdPolicy = JSON.parse(window.localStorage.getItem("pwdPolicy"));

  if (!pwdPolicy) {
    pwdPolicy = {
      "length" : "15",
      "special_char": true,
      "numbers" : true
    } 
  }

  // console.log("check edit pwd")

  // console.log((password != confirmPassword));
  if (password === confirmPassword){
    $("#addPassModalPWDMatch").html(`Passwords match <span class="has-text-success"><i class="fa-solid fa-square-check"></i></span>`);
    var found_special = false;
    var found_number = false;

    if ( (47 < confirmPassword.charCodeAt(i)) && ( confirmPassword.charCodeAt(i)< 58) ) {
      found_number = true;
      console.log(confirmPassword.charCodeAt(i));
    }

    if ( ((31 < confirmPassword.charCodeAt(i)) && (confirmPassword.charCodeAt(i)< 48)) || 
        ((57 < confirmPassword.charCodeAt(i)) && (confirmPassword.charCodeAt(i)< 65)) || 
        ((91 < confirmPassword.charCodeAt(i)) && (confirmPassword.charCodeAt(i) < 97)) ||
        ((122 < confirmPassword.charCodeAt(i)) && (confirmPassword.charCodeAt(i) < 127)) ) found_special = true;

    if ((pwdPolicy.special_char === found_special) 
    && (pwdPolicy.numbers === found_number) 
    && (parseInt(pwdPolicy.length)  <= password.length) 
    && (parseInt(pwdPolicy.length ) <= confirmPassword.length)) $("#addPassModalPWDPolicy").html(`Password meets policy standards <span class="has-text-success"><i class="fa-solid fa-square-check"></i>`);
    else $("#addPassModalPWDPolicy").html(`Password meets policy standards <span class="has-text-danger"><i class="fa-solid fa-square-xmark"></i></span>`);

  } else {
    $("#addPassModalPWDMatch").html(`Passwords match <span class="has-text-danger"><i class="fa-solid fa-square-xmark"></i></span>`);
    $("#addPassModalPWDPolicy").html(`Password meets policy standards <span class="has-text-danger"><i class="fa-solid fa-square-xmark"></i></span>`);
  }
}



function checkPasswordMatchEdit() {
  var password = $("#editPassModalPWD").val();
  var confirmPassword = $("#editPassModalPWD2").val();
  var pwdPolicy = JSON.parse(window.localStorage.getItem("pwdPolicy"));
  if (!pwdPolicy) {
    pwdPolicy = {
      "length" : 15,
      "special_char": true,
      "numbers" : true
    } 
  }

  // console.log("check edit pwd")

  // console.log((password != confirmPassword));
  if (password === confirmPassword){
    $("#editPassModalPWDMatch").html(`Passwords match <span class="has-text-success"><i class="fa-solid fa-square-check"></i></span>`);
    var found_special = false;
    var found_number = false;

    for(let i = 0; i < confirmPassword.length; i++){

      if ( (47 < confirmPassword.charCodeAt(i)) && ( confirmPassword.charCodeAt(i)< 58) ) {
        found_number = true;
        console.log(confirmPassword.charCodeAt(i));
      }

      if ( ((31 < confirmPassword.charCodeAt(i)) && (confirmPassword.charCodeAt(i)< 48)) || 
          ((57 < confirmPassword.charCodeAt(i)) && (confirmPassword.charCodeAt(i)< 65)) || 
          ((91 < confirmPassword.charCodeAt(i)) && (confirmPassword.charCodeAt(i) < 97)) ||
          ((122 < confirmPassword.charCodeAt(i)) && (confirmPassword.charCodeAt(i) < 127)) ) found_special = true;
    }

    if ((pwdPolicy.special_char === found_special) 
    && (pwdPolicy.numbers === found_number) 
    && (parseInt(pwdPolicy.length)  <= password.length) 
    && (parseInt(pwdPolicy.length ) <= confirmPassword.length)) $("#editPassModalPWDPolicy").html(`Password meets policy standards <span class="has-text-success"><i class="fa-solid fa-square-check"></i>`);
    else $("#editPassModalPWDPolicy").html(`Password meets policy standards <span class="has-text-danger"><i class="fa-solid fa-square-xmark"></i></span>`);

  } else {
    $("#editPassModalPWDMatch").html(`Passwords match <span class="has-text-danger"><i class="fa-solid fa-square-xmark"></i></span>`);
    $("#editPassModalPWDPolicy").html(`Password meets policy standards <span class="has-text-danger"><i class="fa-solid fa-square-xmark"></i></span>`);
  }
}

$("#addPassModalPWD, #addPassModalPWD2").keyup(checkPasswordMatchAdd);
$("#editPassModalPWD, #editPassModalPWD2").keyup(checkPasswordMatchEdit);

