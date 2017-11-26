// JavaScript source code
// for order.html
// create global variable   
var subTot = 0, taxTotal=0, total=0;        
var button = document.getElementsByClassName("plus");
var button1 = document.getElementsByClassName("minus");
var pPrice = document.getElementsByClassName("price");
var mName = document.getElementsByClassName("mealName");
var subTota = window.parent.document.getElementById("subTotal");
var quantity = document.getElementsByClassName("qty");
var array = [];
var currentZoom = 1.0;

// need to use parsefloat otherwise the value is string
// reset to "" when loading or by pressing reset buttton

function resetValue() {
    
    var resetQty = document.querySelectorAll(".qty");
    document.getElementById("orderList").innerHTML = "";
    document.getElementById("grandTotal").value = "";
    document.getElementById("tax").value = "";
    document.getElementById("subTotal").value = "";
    document.getElementById("customerName").value = "";

    for (var i = 0; i < resetQty.length; i++) {
        resetQty[i].value = "";
    }
    for (var i = 0; i < array.length; i++) {
        array[i] = 0;
    }
   
    //function for accordion menu
    $(function () {
        $("#accordion").accordion({ header: "h3", collapsible: true, heightStyle: "content", active: false });
    });
}

//add grand total
function addTotal() {
    total = subTot + taxTotal;
    document.getElementById("grandTotal").value = total.toFixed(2);
}
// calculate tax
function addTax() {
    taxTotal = subTot * 0.14975;
    taxTotal = parseFloat(taxTotal.toFixed(2));
    document.getElementById("tax").value = taxTotal;
    addTotal();
}
//add menu and calculate subtotal
function addItem(i) {
    var sub;
    var j = 0;
    var list = document.getElementById("orderList");
    var listItem;
    var qty = array[i] + 1;
    if (document.getElementById(i)) {
        var row = document.getElementById(i);
        row.cells[0].innerHTML = qty + " x";
        row.cells[2].innerHTML = "  $" + ((pPrice[i].textContent) * qty).toFixed(2);
        quantity[i].value = qty.toString();
    } else {
        listItem = list.insertRow(0);
        listItem.setAttribute("id", i);
        var cell1 = listItem.insertCell(0);
        var cell2 = listItem.insertCell(1);
        var cell3 = listItem.insertCell(2);
        cell1.innerHTML = qty + " x";
        cell2.innerHTML = mName[i].textContent;
        cell3.innerHTML = "  $" + pPrice[i].textContent;
        quantity[i].value = qty.toString();
    }


    sub = parseFloat(pPrice[i].textContent);
    if (array[i] == 0) {
        array.splice(i, 1, 1);
    } else {
            j = array[i];
            array.splice(i, 1, ++j);
    }
    subTot = subTot + sub;
    subTot = parseFloat(subTot.toFixed(2));
    document.getElementById("subTotal").value = subTot;
      
    addTax();
}
// function when user click minus button
function minusItem(x) {

    var qty = array[x];
    var list = document.getElementById(x);
    var orderList = document.getElementById("orderList");
    // check if user click minus before add that item
    if (array[x] == 0) {
        alert("you cannot order less than 0");
        // if qty bigger than one, reduce the quantity by 1
    } else {
        if (array[x] > 1) {
            var listItem = list.rowIndex;
            array[x]--;
            var qty = array[x];
            orderList.rows[listItem].cells[0].innerHTML = qty.toString();
            orderList.rows[listItem].cells[2].innerHTML = ((pPrice[x].textContent) * qty).toFixed(2);
            quantity[x].value = array[x].toString();
        }
        // if qty = 1 remove from the list
        else {
            var listItem = list.rowIndex;
            array[x]--;
            orderList.deleteRow(listItem);
            quantity[x].value = array[x].toString();
        }
        //updating the subtotal and then invoke addTax which will call grandtotal
        sub = parseFloat(pPrice[x].textContent);
        subTot = subTot - sub;
        subTot = parseFloat(subTot.toFixed(2));
        document.getElementById("subTotal").value = subTot;
        addTax();
    }   
}
//create new window
function displayOrder() {
	var winFeautures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes,navigation=yes";
    var doc = document.getElementById("orderList");
    var newwindow = window.open('','_blank',winFeautures);
    var newdocument = newwindow.document;
    var mealN = document.getElementsByClassName("mealName");
    var qtyN = document.getElementsByClassName("qty");
    var priceN = document.getElementsByClassName("price");

    newdocument.write("<h2>Name :</h>" + document.getElementById("customerName").value);
    newdocument.write("<h2>Pickup date :</h2>" + document.getElementById("usr_date").value);
    newdocument.write("<h2>Pickup time :</h2>" + document.getElementById("usr_time").value);
    newdocument.write("<h3>Your order:</h3>");
    newdocument.write("<br />");
    newdocument.write("<table>");
    //display the order by checking the array, skip item when is 0
    for (var i = 0; i < array.length; i++) {
        if (array[i] != "0") {
            newdocument.writeln("<tr><td>" + qtyN[i].value + "</td>");
            newdocument.writeln("<td>" + mealN[i].innerHTML + "</td>");
            newdocument.writeln("<td class='dispOrder'>" + priceN[i].innerHTML + "</td></tr>")
        }
    }
    newdocument.writeln("<tr><td>&nbsp;</td></tr>");
    newdocument.writeln("<tr><td>&nbsp;</td><td>Subtotal :</td><td class='dispOrder'>" + subTot + "</td>");
    newdocument.writeln("<tr><td>&nbsp;</td><td>Tax (GST5%),(QST 9.975%) :</td><td class='dispOrder'>" + taxTotal.toFixed(2) + "</td>");
    newdocument.writeln("<tr>&nbsp;<td></td><td>Total :</td><td class='dispOrder'>" + total.toFixed(2) + "</td></table>");
    newdocument.write("</table>");
    newdocument.close();
}

function validateDate() {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 0-11
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var inputDate = document.getElementById("usr_date");
   // format month and date to be always 2 digits
    var newDate = dateObj.getFullYear() + "-" + ("0" + (dateObj.getMonth() + 1)).slice(-2) + "-" + ('0' + dateObj.getDate()).slice(-2);
   // check if entering past date
    if (inputDate.value < newDate) {
        inputDate.style.backgroundColor = "#ce8989";
        return false;
    }
    else {
        return true;
    }       
}
// simple validation for name no special character
function validateName() {
    var validName = /^[a-z ,.'-]+$/;
    var inName = document.getElementById("customerName");
    if ((inName.value).match(validName) && inName.value.length <= 30) {
        return true;
    }
    else {
        inName.style.backgroundColor = "#ce8989";
        return false;
    }
}
//check if pickup order outside the opening hours
function validateTime() {
    var inputTime = document.getElementById("usr_time");
    
    if (inputTime.value >= "11:30" && inputTime.value <= "21:45") {
        return true;
    }
    else {
		alert("Please enter the time between 11:30AM to 10:00pm");
        inputTime.style.backgroundColor = "#ce8989";        
        return false;
    }
}

function validateTotal() {
    var gTotal = document.getElementById("grandTotal");
    if (gTotal.value > "0" || gTotal.value != "") {
        return true;
    } else {
        alert("Please choose your dish before you submit");
        return false;
    }
}
//call validate form for each fields
function verify() {
   
    var w = true;
    var n = true;
    var z = true;
    var x = true;

    w = validateDate();   
    n = validateName();  
    x = validateTotal();
    z = validateTime();
    
    if (w && n && x && z) {     
        displayOrder();
        return true;
    }
    else{
        return false;
    }
}
//adding zoom button
//change the original margin to 0 when user hover so it will not move other text up and down
$(function () {
    $(".plus, .minus").hover(
        function () {
            $(this).animate({ 'zoom': 1.2 }, 400);
            $(this).css({ "margin": "0" });
        },
        function () {
            $(this).animate({ 'zoom': 1 }, 400);
        });
    $(".plus, .minus").click(
        function () {
            $(this).animate({ 'zoom': currentZoom}, "slow");
        });

});
//end of zoom button
//make sure when page is load, assign each plus and minus button event listener and set o to each array property so we will not get empty value
window.onload = function() {
    var sPrice;
    var sName;
    //reset
    resetValue();
    for (var i = 0; i < button.length; i++) {
        (function (index) {
            array[i] = 0;
            button[i].onclick = function () {
                addItem(index);

            }
            button1[i].onclick = function () {
                minusItem(index);
            }
        })(i);
    }
  
}
