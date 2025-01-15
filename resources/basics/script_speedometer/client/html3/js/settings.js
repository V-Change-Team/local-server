function settings() {
    document.getElementById("racemode").innerHTML = "Settings";
    document.getElementById("raceresult").innerHTML = "";
    $("#hidesettings").show();
}



function reset() {
    allLapsArray = [];
    alt.emit('client:resetLaps');
    closeWindow();
}
function setFreeRoam() {
    mode = 0;
    clearInterval(timer);
    createFreeRoamTable();
    alt.emit('client:updateMode', mode, 0);
}
function setQualiMin() {
    _min = document.getElementById('inputQualiMin').value

    if (_min < 1) _min = 1;
    if (_min > 120) _min = 120;
    mode = 1;
    min = _min;
    currentTime = Date.now();
    clearInterval(timer);
    createQualiTable();
    alt.emit('client:updateMode', mode, _min); 
}
function setRaceLaps() {
    laps = document.getElementById('inputRaceLaps').value
    if (laps < 1) laps = 1;
    if (laps > 300) laps = 300;
    mode = 2;
    clearInterval(timer);
    createRaceTable();
    alt.emit('client:updateMode', mode, laps);
}


