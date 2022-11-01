$("#addPassBtn").on("click", function() {
  $("#addPassModalName").val("");
  $("#addPassModalUname").val("");
  $("#addPassModalPWD").val("");
  $("#addPassModalPWD2").val("");
  $("#addPassModalURL").val("");
  $("#addPassModalLabel").val("");
  $("#addPassModalMsg").val("");

  $("#addPassModal").addClass('is-active');
});

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
    label: label
  };

  if (pwd1 === pwd2){
        
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
  
$("#addPassCloseBtn").on("click", function() {
  const loc = document.location;
  $("#addPassModal").removeClass('is-active');
  loc.reload();
});

$("#siteInfoBtn").on("click", function() {
  $("#siteInfoModal").addClass('is-active');
});

$("#siteInfoModalCloseBtn").on("click", function() {
  $("#siteInfoModal").removeClass('is-active');
});

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

$("#viewPWDCloseBtn").on("click", function() {
  $("#viewPWDModal").removeClass('is-active');
});

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

$("#viewDeleteStatusBtn").on("click", function() {
  const loc = document.location;
  $("#viewDeleteStatus").removeClass('is-active');
  loc.reload();
});

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
        // console.log("Delete was successful");
        $("#viewOTPOutput").append(res.passcode);
      } else {
        // console.log("Delete was unsuccessful");
        $("#viewOTPOutput").append("Could not retrieve OTP");
      }

      $("#viewOTPModal").addClass('is-active');

    });

});

$("#viewOTPCloseBtn").on("click", function() {
  const loc = document.location;
  $("#viewOTPModal").removeClass('is-active');
});

$("#viewOTPSendToClipboardBtn").on("click", function() {
  const passcode = $("#viewOTPOutput").text();
  navigator.clipboard.writeText(passcode);
  $("#viewOTPModal").removeClass('is-active');
});


$("#retrivePassOTPBtn").on("click", function() {
  $("#useOTPInput").val("");
  $("#useOTPOutput").empty();
  $("#useOTPModal").addClass('is-active');
});

$("#useOTPCloseBtn").on("click", function() {
  $("#useOTPModal").removeClass('is-active');
});

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

      console.log(res);
      if (res.password) {
        // console.log("Delete was successful");
        $("#useOTPOutput").append(res.password);
      } else {
        // console.log("Delete was unsuccessful");
        $("#useOTPOutput").append("Could not retrieve password, try again");
      }
    });
});


$("#useOTPSendToClipBoard").on("click", function() {
  const password = $("#useOTPOutput").text();
  navigator.clipboard.writeText(password);
  $("#useOTPModal").removeClass('is-active');
});

$(".EditPassword").on("click", async function() {
  const loc = document.location;
  $("#editPassModalName").val("");
  $("#editPassModalUname").val("");
  $("#editPassModalPWD").val("");
  $("#editPassModalPWD2").val("");
  $("#editPassModalURL").val("");
  $("#editPassModalLabel").val("");
  $("#editPassModalMsg").val("");

  

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
      } else {
         $("#editPassModalMsg").append("Unable to retrieve password data.  Cancel and try again.");
         $("#editPassModal").addClass('is-active');
      }

    });

});

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

$("#editPassCancelBtn").on("click", function() {
  $("#editPassModal").removeClass('is-active');
});

$("#testPWDBtn").on("click", function() {
  $("#testPWDModal").addClass('is-active');
});

$("#testPWDModalCloseBtn").on("click", function() {
  $("#testPWDModal").removeClass('is-active');
});

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

var slider = document.getElementById("setPolicyModalLength");
var output = document.getElementById("pwdLengthValue");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
}

$("#setPolicyBtn").on("click", function() {
  $("#setPolicyModal").addClass('is-active');
});

$("#pwdPolicyCancelBtn").on("click", function() {
  $("#setPolicyModal").removeClass('is-active');
});

$("#savePWDPolicyBtn").on("click", async function() {
  
  $("#setPolicyOutput").empty();
  const loc = document.location;
  const error = "Error saving policy"
  const success = "Policy saved"

    const data = {
      length: $("#setPolicyModalLength").val(),
      special_char: $("#setPolicyModalSpecial").is(':checked'),
      numbers: $("#setPolicyModalNumber").is(':checked'),
      uppercase: $("#setPolicyModalUppercase").is(':checked'),
      lowercase: $("#setPolicyModalLowercase").is(':checked')
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

          // console.log(res);
          if (res.message === "Success") $("#setPolicyOutput").append(success);
          else $("#setPolicyOutput").append(error);
    
        })

});

// $("#changeAvatarBtn").on("click", function() {
//   $("#changeAvatarModal").addClass('is-active');
// });

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
