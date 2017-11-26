// JavaScript source code for reservation

var compDate = true;
var compTime = true;
var timeNow;


//check the seat, if no seat is selected any seat is OK
function setRes() {
    var ld = document.getElementsByClassName("ld");
    var seating = false;
    var i = 0;
    while (!seating && i < ld.length) {

        if (ld[i].checked) {
            seating = true;
        }
        i++;
    }
}

function validateEmail() {
    var x = document.forms["table_reservation_form"]["email"].value;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
        //alert("Not a valid e-mail address");
        document.getElementById("emailError").innerHTML = "Enter valid email Address";
        return false;
    }
        else{
            return true;
        }
    
}
function validateName() {
    var validName = /^[a-z ,.'-]+$/;
    var inName = document.getElementById("name");
    if ((inName.value).match(validName) && inName.value.length <= 30) {
        return true;
    }
    else {
        document.getElementById("nameError").innerHTML = "Enter valid Name";
        return false;
    }
}
function validatePhone() {
    var inPhone = document.getElementById("phoneNumber");
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (inPhone.value.match(phoneno)) {
        return true;
    }
    else {
        document.getElementById("phoneError").innerHTML = "Enter valid phone number";
        return false;
    }
}
function validateDate() {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var hour = dateObj.getHours();
    var minute = dateObj.getMinutes();
    var inputDate = document.getElementById("resDate");
    //format the date and month into 2 digits
    var newDate = dateObj.getFullYear() + "-" + ("0" + (dateObj.getMonth() + 1)).slice(-2) + "-" + ('0' + dateObj.getDate()).slice(-2);
    //concatenate time so can be use later
    timeNow = hour + ":" + minute;
    if (inputDate.value < newDate) {
        document.getElementById("dateError").innerHTML = "Enter valid date";
        return false;
    }
    //check if present date will check time
    else if (inputDate.value > newDate) {
        compDate = false;
        return true;
    } else if (inputDate.value == newDate) {
        compDate = true;
        return true;
    }
}
function validateTime() {
    var inputTime = document.getElementById("resTime");
// check if the same day but time is smaller than present   
    if (inputTime.value >= "11:30" && inputTime.value <= "21:45") {
        if ((timeNow > inputTime.value) && compDate) {
            document.getElementById("timeError").innerHTML = "Please Enter future time";
            return false
        } else {
            return true;
        }
    }   
    else
        document.getElementById("timeError").innerHTML = "Please Enter between 11:30 AM to 09:45 PM";
    return false;
}

function verify() {
    var w = true;
    var x = true;
    var n = true;
    var y = true;
    var z = true;
      w = validateDate();
      z = validateTime();
      x = validateEmail();  
      n = validateName();  
      y = validatePhone();
      
      
      if (w && x && n && y && z) {
          return true;
      }
      else
          return false;
      
}

    $(function () {
        $('#submit').click(function () {
            verify();
        });
        $('.ld').change(function () {
            setRes();
        });
        $("#resDate").focus(function () {
            document.getElementById("dateError").innerHTML = "";
        });
        $("#email").focus(function () {
            document.getElementById("emailError").innerHTML = "";
        });
        $("#name").focus(function () {
            document.getElementById("nameError").innerHTML = "";
        });
        $("#phoneNumber").focus(function () {
            document.getElementById("phoneError").innerHTML = "";
        });
        $("#resTime").focus(function () {
            document.getElementById("timeError").innerHTML = "";
        });
    });
    $(function () {
        $('#reset').click(function () {
            
            $("#dateError").text("");
            $("#emailError").text("");
            $("#nameError").text("");
            $("#phoneError").text("");
            $("#timeError").text("");

        });
        
    });