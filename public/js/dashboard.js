$("#addPassBtn").on("click", function() {
    $("#addPassModal").addClass('is-active');
  });
  
$("#addPassCancelBtn").on("click", function() {
  $("#addPassModal").removeClass('is-active');
});

$("#retrivePassOTPBtn").on("click", function() {
  $("#useOTPModal").addClass('is-active');
});

$("#useOTPCloseBtn").on("click", function() {
  $("#useOTPModal").removeClass('is-active');
});

$("#setPolicyBtn").on("click", function() {
  $("#setPolicyModal").addClass('is-active');
});

$("#pwdPolicyCancelBtn").on("click", function() {
  $("#setPolicyModal").removeClass('is-active');
});

$("#testPWDBtn").on("click", function() {
  $("#testPWDModal").addClass('is-active');
});

$("#testPWDModalCloseBtn").on("click", function() {
  $("#testPWDModal").removeClass('is-active');
});

$("#siteInfoBtn").on("click", function() {
  $("#siteInfoModal").addClass('is-active');
});

$("#siteInfoModalCloseBtn").on("click", function() {
  $("#siteInfoModal").removeClass('is-active');
});