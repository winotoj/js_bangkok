// JavaScript source code for main page

function login(showhide) {
    if (showhide == "show") {
        document.getElementById('popupbox').style.visibility = "visible";
        if (document.getElementById("employeeName").focus())
        document.getElementById("warning").innerHTML = "";
        
    } else if (showhide == "hide") {
        document.getElementById('popupbox').style.visibility = "hidden";
    }
}
function validate() {
    var userName = document.getElementById("employeeName");
    var pass = document.getElementById("employeePass");
    if (userName.value == "john" && pass.value == "password") {
        window.open("schedule.html", "_blank");
        return true;
    }
    else {
        userName.value = "";
        pass.value = "";
        document.getElementById("warning").innerHTML = "Enter your username and password!";
        return false;
    }
    

}



