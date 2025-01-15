function sortBestLap() {
    let returnArray = [];
    let driverExist = true;
    for (let i = 0; i < allLapsArray.length; i++) {
        if (allLapsArray[i].active == 1) continue;
        for (let x = 0; x < returnArray.length; x++) {
            if (returnArray[x][0] == allLapsArray[i].name && returnArray[x][1] == allLapsArray[i].vehname) {
                if (returnArray[x][4] > allLapsArray[i].laptime) {
                    returnArray[x][2] = allLapsArray[i].split1;
                    returnArray[x][3] = allLapsArray[i].split2;
                    returnArray[x][4] = allLapsArray[i].laptime;
                }
                driverExist = true;
                break;
            } else {
                driverExist = false;
            }
        }
        if (!driverExist || returnArray.length == 0) {
            returnArray.push([allLapsArray[i].name, allLapsArray[i].vehname, allLapsArray[i].split1, allLapsArray[i].split2, allLapsArray[i].laptime])
        }
    }
    return returnArray;
}


function sortBestLapVehicle(value) {
    let returnArray = [];
    let driverExist = true;
    for (let i = 0; i < allLapsArray.length; i++) {
        if (allLapsArray[i].active == 1 || allLapsArray[i].vehname != value) continue;
        for (let x = 0; x < returnArray.length; x++) {
            if (returnArray[x][0] == allLapsArray[i].name && returnArray[x][1] == allLapsArray[i].vehname) {
                if (returnArray[x][4] > allLapsArray[i].laptime) {
                    returnArray[x][2] = allLapsArray[i].split1;
                    returnArray[x][3] = allLapsArray[i].split2;
                    returnArray[x][4] = allLapsArray[i].laptime;
                }
                driverExist = true;
                break;
            } else {
                driverExist = false;
            }
        }
        if (!driverExist || returnArray.length == 0) {
            returnArray.push([allLapsArray[i].name, allLapsArray[i].vehname, allLapsArray[i].split1, allLapsArray[i].split2, allLapsArray[i].laptime])
        }
    }
    return returnArray;
}
function changeVehicle(value) {
    let titleArray = ["Pos.", "Diff. 1st","Diff.", "Name", "Car", "Split1", "Split2", "Best Lap"];
    let tableHTML = "";
    let sortBestLapArray = sortBestLapVehicle(value);
    let sortPosArray = sortQualiPos(sortBestLapArray);
    $("#dropdownmenu").show();
    document.getElementById("racemode").innerHTML = "Bestenliste";
    tableHTML += "<table class='table'><tr>";
    titleArray.forEach((value, i) => {
        tableHTML += `<th class="table__heading">${value}</th>`;
    });
    tableHTML += "</tr>";

    let dropDownCarList = [];
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
                    tableHTML += `<td class="table__content" data-heading="${titleArray[x]}">${msToTime(0)}</td>`;
                } else {
                    let time =  sortPosArray[i][4] - sortPosArray[0][4];
                    tableHTML += `<td class="table__content" data-heading="${titleArray[x]}">${msToTime(time)}</td>`;
                    time = sortPosArray[i][4] - sortPosArray[i - 1][4];
                    tableHTML += `<td class="table__content" data-heading="${titleArray[x]}">${msToTime(time)}</td>`;
                }
            }
            if (x == 2) {
                tableHTML += `<td class="table__content" data-heading="${titleArray[x]}">${sortPosArray[i][0]}</td>`;
            }
            if (x == 3) {
                tableHTML += `<td class="table__content" data-heading="${titleArray[x]}">${sortPosArray[i][1]}</td>`;
            }
            if (x == 4) {
                tableHTML += `<td class="table__content" data-heading="${titleArray[x]}">${msToTime(sortPosArray[i][x - 2])}</td>`;
            }
            if (x == 5) {
                tableHTML += `<td class="table__content" data-heading="${titleArray[x]}">${msToTime(sortPosArray[i][x - 2])}</td>`;
                tableHTML += `<td class="table__content" data-heading="${titleArray[x]}">${msToTime(sortPosArray[i][x - 1])}</td>`;
            }

        }
        tableHTML += "</tr>";
    }

    tableHTML += "</table>";
    document.getElementById("raceresult").innerHTML = tableHTML;
}

function createBestLapsTable() {
    let titleArray = ["Pos.", "Diff. 1st","Diff.", "Name", "Car", "Split1", "Split2", "Best Lap"];
    let tableHTML = "";
    let sortBestLapArray = sortBestLap();
    let sortPosArray = sortQualiPos(sortBestLapArray);
    $("#dropdownmenu").show();
    document.getElementById("racemode").innerHTML = "Bestenliste";
    tableHTML += "<table class='table'><tr>";
    titleArray.forEach((value, i) => {
        tableHTML += `<th class="table__heading">${value}</th>`;
    });
    tableHTML += "</tr>";
    hideSettings();
    let dropDownCarList = [];
    let carExist = true;
    if (sortPosArray.length > 0) {
        for (let i = 0; i < sortPosArray.length; i++) {
            if (i == 0) {
                dropDownCarList.push(sortPosArray[i][1]);
                continue;
            }
            for (let x = 0; x < dropDownCarList.length; x++) {
                if (dropDownCarList[x] == sortPosArray[i][1]) {
                    carExist = false;
                    break;
                } else {
                    carExist = true;
                }
            }
            if (carExist) {
                dropDownCarList.push(sortPosArray[i][1]);
            }
        }
        var select = document.getElementById("dropdownmenu");
        var i, L = select.options.length - 1;
        for (i = L; i >= 0; i--) {
            select.remove(i);
        }

        for (var i = 0; i < dropDownCarList.length; i++) {
            var opt = dropDownCarList[i];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            select.appendChild(el);
        }


    }
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
                    tableHTML += `<td class="table__content" data-heading="${titleArray[x]}">${msToTime(0)}</td>`;
                } else {
                    let time =  sortPosArray[i][4] - sortPosArray[0][4];
                    tableHTML += `<td class="table__content" data-heading="${titleArray[x]}">${msToTime(time)}</td>`;
                    time = sortPosArray[i][4] - sortPosArray[i - 1][4];
                    tableHTML += `<td class="table__content" data-heading="${titleArray[x]}">${msToTime(time)}</td>`;
                }
            }
            if (x == 2) {
                tableHTML += `<td class="table__content" data-heading="${titleArray[x]}">${sortPosArray[i][0]}</td>`;
            }
            if (x == 3) {
                tableHTML += `<td class="table__content" data-heading="${titleArray[x]}">${sortPosArray[i][1]}</td>`;
            }
            if (x == 4) {
                tableHTML += `<td class="table__content" data-heading="${titleArray[x]}">${msToTime(sortPosArray[i][x - 2])}</td>`;
            }
            if (x == 5) {
                tableHTML += `<td class="table__content" data-heading="${titleArray[x]}">${msToTime(sortPosArray[i][x - 2])}</td>`;
                tableHTML += `<td class="table__content" data-heading="${titleArray[x]}">${msToTime(sortPosArray[i][x - 1])}</td>`;
            }

        }
        tableHTML += "</tr>";
    }

    tableHTML += "</table>";
    document.getElementById("raceresult").innerHTML = tableHTML;
}