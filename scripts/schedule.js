// JavaScript source code for schedule.html
// created on june 7 2017
// by win

//populate the array split with ,
function setTable(array) {
    var curLine;
    var myTable = document.getElementById("tSchedule");
    var row, cell;
    for (var i = 0; i < array.length - 1; i++) {
        var curLine = array[i].split(",");
        row = myTable.insertRow(i + 1);
        for (var j = 0; j < curLine.length; j++) {
            cell = row.insertCell(j);
            cell.innerHTML = curLine[j];
        }
    }

}
// extract files into array of lines split by carriage return
function LoadFile() {
       
    var oFrame = document.getElementById("frmFile");
    var strRawContents = oFrame.contentWindow.document.body.childNodes[0].innerHTML;
    while (strRawContents.indexOf("\r") >= 0)
        strRawContents = strRawContents.replace("\r", "");
    var arrLines = strRawContents.split("\n");

    //remove the last line which is empty
    arrLines.shift();

    setTable(arrLines);
}   
//function dispData(schedule) {
//    alert("test");
//    var allRows = data.split(/\r?\n|\r/);
//    var table = "<table>";
//    for (var singleRow = 0; singleRow < allRowsRows.length; singleRow++) {
//        if (singlerow === 0) {
//            table += "<thead>";
//            table += "<tr>";
//        } else {
//            table += "<tr>";
//        }
//        var rowCells = allRows[singleRow].split(",");
//        for (var rowSingleCell = 0; rowSingleCell < rowCells.length; rowSingleCell++) {
//            if (singlerow === 0) {
//                table += "<th>";
//                table += rowCells[rowSingleCell];
//                table += "</th>";
//            } else {
//                table += "<td>";
//                table += rowCells[rowSingleCell];
//                table += "</td>";
//            }
//        }
//        if (singlerow === 0) {
//            table += "</tr>";
//            table += "</thead>";
//            table += "<tbody>";
//        } else {
//            table += "</tr>";
//        }
//    }
//    table += "</tbody>";
//    table += "</table>";
//    $("body").append(table);
//}

//$(function () {
    
//    $.ajax({ url: "etc/schedule.csv", dataType: "text" }).done(dispData);
    
//});