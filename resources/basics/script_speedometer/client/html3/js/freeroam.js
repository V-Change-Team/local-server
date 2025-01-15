function createFreeRoamTable() {
    let titleArray = ["Pos.", "Diff.", "Name", "Car", "Split1", "Split2", "Best Lap", "Last Lap", "Laps"];
    let tableHTML = "";
    let sortBestLapArray = sortBestLapQuali();
    let sortPosArray = sortQualiPos(sortBestLapArray);
    document.getElementById("racemode").innerHTML = "Freie Fahrt";
    $("#dropdownmenu").hide();
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