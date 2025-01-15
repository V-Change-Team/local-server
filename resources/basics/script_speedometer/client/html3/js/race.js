function sortRacePos(_array) {
    let returnArray = [];
    let tempArray = [];

    for (let i = 0; i < _array.length; i++) {
        if (returnArray.length == 0) {
            returnArray.push(_array[0]);
            continue;
        }
        let isPosSet = false;
        let pushToArray = true;
        let addToPosition = 0;
        for (let x = 0; x < returnArray.length; x++) {


            if (_array[i][7] > returnArray[x][7]) {
                addToPosition = x;
                pushToArray = false;
                break;
            }
            if (_array[i][7] == returnArray[x][7]) {
                if (_array[i][0] < returnArray[x][0]) {
                    addToPosition = x;
                    pushToArray = false;
                    break;
                }
            }
        }
        if (pushToArray) {
            returnArray.push(_array[i]);
        } else {
            returnArray.splice(addToPosition, 0, _array[i]);
        }
        if (returnArray.length == 0) {
            returnArray.push(_array[0]);
        }
    }
    return returnArray;

}
function countRaceRounds() {
    _tempArray = [];
    driverExist = true;
    for (let i = 0; i < allLapsArray.length; i++) {
        if (allLapsArray[i].active == 0) continue;
        for (let x = 0; x < _tempArray.length; x++) {
            if (_tempArray[x][1] == allLapsArray[i].name && _tempArray[x][2] == allLapsArray[i].vehname) {
                _tempArray[x][7]++;
                if (_tempArray[x][0] < allLapsArray[i].date) {
                    _tempArray[x][0] = allLapsArray[i].date;
                    _tempArray[x][3] = allLapsArray[i].split1;
                    _tempArray[x][4] = allLapsArray[i].split2;
                    _tempArray[x][5] = allLapsArray[i].laptime;
                }
                if (_tempArray[x][6] > allLapsArray[i].laptime) {
                    _tempArray[x][6] = allLapsArray[i].laptime;
                }
                driverExist = true;
                break;
            } else {
                driverExist = false;
            }
        }
        if (!driverExist || _tempArray.length == 0) {
            driverExist = true;
            _tempArray.push([allLapsArray[i].date, allLapsArray[i].name, allLapsArray[i].vehname, allLapsArray[i].split1, allLapsArray[i].split2, allLapsArray[i].laptime, allLapsArray[i].laptime, 1]);
        }
    }
    return _tempArray;
}

function createRaceTable() {
    let titleArray = ["Pos.", "Diff.", "Name", "Car", "Split1", "Split2", "Last Lap", "Best Lap", "Laps"];
    let tableHTML = "";
    let countRoundsArray = countRaceRounds();
    let sortPosArray = sortRacePos(countRoundsArray);
    document.getElementById("racemode").innerHTML = "Rennen";
    $("#dropdownmenu").hide();
    $("#pastBestLaps").hide();
    $("#freeRoam").hide();
    $("#raceinfo").text(laps + " Laps");
    tableHTML += "<table class='table'><tr>";
    titleArray.forEach((value, i) => {
        tableHTML += `<th class="table__heading">${value}</th>`;
    });
    tableHTML += "</tr>";
    hideSettings();
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
                    if (sortPosArray[0][7] == sortPosArray[i][7]) {
                        let time = sortPosArray[i][0] - sortPosArray[i - 1][0];
                        tableHTML += `<td class="table__content" data-heading="${titleArray[x]}">${msToTime(time)}</td>`;
                    } else {
                        let time = sortPosArray[0][7] - sortPosArray[i][7];
                        tableHTML += `<td class="table__content" data-heading="${titleArray[x]}">+ ${time}</td>`;
                    }
                }
            }
            if (x == 2 || x == 3) {
                tableHTML += `<td class="table__content" data-heading="${titleArray[x]}">${sortPosArray[i][x - 1]}</td>`;
            }
            if (x == 4 || x == 5 || x == 6 || x == 7) {
                tableHTML += `<td class="table__content" data-heading="${titleArray[x]}">${msToTime(sortPosArray[i][x - 1])}</td>`;
            }
            if (x == 8) {
                tableHTML += `<td class="table__content" data-heading="${titleArray[x]}">${sortPosArray[i][x - 1]}</td>`;
            }

        }
        tableHTML += "</tr>";
    }

    tableHTML += "</table>";
    document.getElementById("raceresult").innerHTML = tableHTML;
}