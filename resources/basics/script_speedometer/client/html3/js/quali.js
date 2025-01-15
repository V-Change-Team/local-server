function sortQualiPos(Array) {

    let returnArray = [];
    for (let i = 0; i < Array.length; i++) {
        let pushToArray = true;
        let addToPosition = 0;
        for (let x = 0; x < returnArray.length; x++) {
            if (Array[i][4] < returnArray[x][4]) {
                addToPosition = x;
                pushToArray = false;
                break;
            }
        }
        if (pushToArray) {
            returnArray.push(Array[i]);
        } else {
            returnArray.splice(addToPosition, 0, Array[i]);
        }
    }
    return returnArray;
}

function sortBestLapQuali() {
    let returnArray = [];
    let driverExist = true;
    for (let i = 0; i < allLapsArray.length; i++) {
        if (allLapsArray[i].active == 0) continue;
        for (let x = 0; x < returnArray.length; x++) {
            if (returnArray[x][0] == allLapsArray[i].name && returnArray[x][1] == allLapsArray[i].vehname) {
                returnArray[x][6]++;
                if (returnArray[x][4] > allLapsArray[i].laptime) {
                    returnArray[x][2] = allLapsArray[i].split1;
                    returnArray[x][3] = allLapsArray[i].split2;
                    returnArray[x][4] = allLapsArray[i].laptime;
                }
                returnArray[x][5] = allLapsArray[i].laptime;
                driverExist = true;
                break;
            } else {
                driverExist = false;
            }
        }
        if (!driverExist || returnArray.length == 0) {
            returnArray.push([allLapsArray[i].name, allLapsArray[i].vehname, allLapsArray[i].split1, allLapsArray[i].split2, allLapsArray[i].laptime, allLapsArray[i].laptime, 1])
        }
    }
    return returnArray;
}

let timer = null;
let currentlapbeginn = null;
function QualiRemainingTime() {
    currentlapbeginn = currentTime + (min * 60000);
    timer = setInterval(function () { _lapTimer(); }, 333);
}
function _lapTimer() {
    if ((currentlapbeginn - Date.now()) > 0) {
        $("#raceinfo").text(msToTimeShort(currentlapbeginn - Date.now()));
    } else {
        $("#raceinfo").text(msToTimeShort(0));
    }
}

function createQualiTable() {
    let titleArray = ["Pos.", "Diff.", "Name", "Car", "Split1", "Split2", "Best Lap", "Last Lap", "Laps"];
    let tableHTML = "";
    let sortBestLapArray = sortBestLapQuali();
    let sortPosArray = sortQualiPos(sortBestLapArray);
    $("#pastBestLaps").hide();
    $("#freeRoam").hide();
    $("#dropdownmenu").hide();
    QualiRemainingTime();
    hideSettings();
    document.getElementById("racemode").innerHTML = "Qualifying";
    tableHTML += "<table class='table'><tr>";
    titleArray.forEach((value, i) => {
        tableHTML += `<th class="table__heading">${value}</th>`;
    });
    tableHTML += "</tr>";

    for (let i = 0; i < sortPosArray.length; i++) {
        if (i % 2) {
            tableHTML += '<tr class="table__row_grey" style="background: #bfbfbf">';
        } else {
            tableHTML += '<tr class="table__row">';
        }
        for (let x = 0; x < sortPosArray[i].length + 1; x++) {
            if (x == 0) {
                tableHTML += `<td class="table__content" data-heading="${titleArray[x]}">${i + 1}</td>`;
            }
            if (x == 1) {
                if (i == 0) {
                    tableHTML += `<td class="table__content" data-heading="${titleArray[x]}">${msToTime(0)}</td>`;
                } else {
                    let time = sortPosArray[i][4] - sortPosArray[i - 1][4];
                    tableHTML += `<td class="table__content" data-heading="${titleArray[x]}">${msToTime(time)}</td>`;
                }
            }
            if (x == 2) {
                tableHTML += `<td class="table__content" data-heading="${titleArray[x]}">${sortPosArray[i][0]}</td>`;
            }
            if (x == 3) {
                tableHTML += `<td class="table__content" data-heading="${titleArray[x]}">${sortPosArray[i][1]}</td>`;
            }
            if (x == 4 || x == 5 || x == 6) {
                tableHTML += `<td class="table__content" data-heading="${titleArray[x]}">${msToTime(sortPosArray[i][x - 2])}</td>`;
            }

            if (x == 7) {
                tableHTML += `<td class="table__content" data-heading="${titleArray[x]}">${msToTime(sortPosArray[i][5])}</td>`;
                tableHTML += `<td class="table__content" data-heading="${titleArray[x]}">${sortPosArray[i][6]}</td>`;
            }

        }
        tableHTML += "</tr>";
    }

    tableHTML += "</table>";
    document.getElementById("raceresult").innerHTML = tableHTML;
}