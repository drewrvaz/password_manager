
//Generate Password
async function generatePassword() {
  var password = "";
  var mandatoryChars = [];
  var types = [];
  const loc = document.location;

  //get the current policy, whether the default or one set by the user
  await fetch(`${loc.origin}/getPolicy`)
    .then(res => res.json())
    .then(res => {

        window.localStorage.setItem("pwdPolicy", JSON.stringify(res));
        //Check if user selected a password length that meets the criteria
        if ( (7 < res.length) && (res.length < 65) ) {   
          
          //lowercase characters are mandatory
          types.push("l");
          mandatoryChars.push(generateRandom(generateCharaterset("l"),1)[0]);
          
          //uppercase characters are mandatory
          types.push("u");
          mandatoryChars.push(generateRandom(generateCharaterset("u"),1)[0]);

          //check if numbers were selected and add if they were
          if (res.numbers){
            types.push("n");//check if numbers were selected and add if they were
            mandatoryChars.push(generateRandom(generateCharaterset("n"),1)[0]);
          }

          //check if special characters were selected and add if they were
          if (res.special_char){
            types.push("s");
            mandatoryChars.push(generateRandom(generateCharaterset("s"),1)[0]);
          }

          //Check if user selected one or more of the different allowed character sets 
          if (types.length > 0){ 
            var baseArray = [];
            var randomArray = [];
            
            //build base character set based on 
            for (i=0;i<types.length;i++){
              baseArray = baseArray.concat(generateCharaterset(types[i]));
            }

            //Generate array with random characters 
            randomArray = generateRandom(baseArray, (res.length - mandatoryChars.length));
            
            //Create string that will be presented to user
            password = insertMandatoryChars(randomArray,mandatoryChars);
            
          }
        } 
  });
  // console.log(password);
  return password;
}

//Generate character sets from ascii table based on the options selected by user
function generateCharaterset(strType){
  var arrayBase = [];

  //Add uppercase characters to the base array
  if (strType === 'u') {
    
    for (let i =0; i < 26; i++ ){
      arrayBase.push(String.fromCharCode(65 + i));
    }

  }    
  //Add lowercase characters to the base array                             
  else if (strType === "l") {

     for (let i =0; i < 26; i++ ){
        arrayBase.push(String.fromCharCode(97 + i));
      }
  }
  //Add numeric characters to the base array 
  else if (strType === "n"){

    for (let i =0; i < 10; i++ ){
      arrayBase.push(String.fromCharCode(48 + i));
    }
  }
  //Add special characters to the base array 
  else if (strType === "s"){

      for (let i =0; i < 16; i++ ){
        arrayBase.push(String.fromCharCode(32 + i));
      }

      for (let i=0; i < 7; i++ ){
        arrayBase.push(String.fromCharCode(58 + i));
      }

      for (let i=0; i < 6; i++ ){
          arrayBase.push(String.fromCharCode(91 + i));
      }

      for (let i=0; i < 4; i++ ){
        arrayBase.push(String.fromCharCode(123 + i));
      }

    }
  //If none of those were provided then there is some type of issue in the code
  else { 
    console.log("Invalid Character provided.")

  }

  return arrayBase; 
}

//Generated a random array using a starter array and it's size
function generateRandom(starterArray, strSize) {
  var randomIndex = 0;
  var randomArray = [];

  // console.log(strSize);

  //Take an array of characters then randomly concantenate them into another array
  for (let i = 0; i < strSize; i++) {
    randomIndex = Math.floor(Math.random() * starterArray.length);
    randomArray = randomArray.concat(starterArray[randomIndex]);
    // console.log(randomIndex);
  }
  
  return randomArray;
}

// Take two arrays and merge them in a random way, return a string 
function insertMandatoryChars(randomArray, manChars){
  var index = 0;
  var pwd = ""

  //Put the require characters in a random place in the array that is provided
  //Using a random index number, breaking the array into two parts then re-joining it
  for(i=0;i<manChars.length;i++){
    index = Math.floor(Math.random() * randomArray.length);
    randomArray.splice(index, 0, manChars[i]);
    randomArray.join();
  }

  //Take array and convert it into a string
  for(i=0;i <randomArray.length;i++) {
    pwd = pwd + randomArray[i];
  }

  return pwd;
}

// add modal event listener to generate password
$("#addGeneratePWDBtn").on("click", async function() {
  const password = await generatePassword();

  $("#addPassModalPWD").val(password);
  $("#addPassModalPWD2").val(password);
  $("#editPassModalPWDMatch").empty();
  $("#addPassModalPWDPolicy").empty();
  $("#addPassModalPWDMatch").html(`Passwords match <span class="has-text-success"><i class="fa-solid fa-square-check"></i></span>`);
  $("#addPassModalPWDPolicy").html(`Password meets policy standards <span class="has-text-success"><i class="fa-solid fa-square-check"></i></span>`);
});

// edit modal event listener to generate password
$("#editGeneratePWDBtn").on("click", async function() {
  const password = await generatePassword();

  $("#editPassModalPWD").val(password);
  $("#editPassModalPWD2").val(password);
  $("#editPassModalPWDMatch").empty();
  $("#editPassModalPWDPolicy").empty();
  $("#editPassModalPWDMatch").html(`Passwords match <span class="has-text-success"><i class="fa-solid fa-square-check"></i></span>`);
  $("#editPassModalPWDPolicy").html(`Password meets policy standards <span class="has-text-success"><i class="fa-solid fa-square-check"></i></span>`);
});