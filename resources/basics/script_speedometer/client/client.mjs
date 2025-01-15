import * as alt from 'alt';
import * as native from 'natives';

let electric = [
    2445973230,// neon
    1560980623,// airtug
    1147287684,// caddy
    3164157193,// dilettante
    2400073108,// surge
    544021352,// khamelion 
    2672523198,// voltic
    1031562256,// tezeract
    1392481335,// cyclone
    2765724541// raiden
];
let count = 0;
let webView = null;
let seatbelt = false;
let fuel = 55;
let fuelUsage = 1.3;
let maxgas = 55;
let miles = 0.0;
let verbrauch;
let vehPos = null;
let playerVehPos = 3;
let targetVeh = null;
let playerIsDriver = false;
function distance(vector1, vector2) {
    return Math.sqrt(
        Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2) + Math.pow(vector1.z - vector2.z, 2)
    );
}

setInterval(function () { _intervalFunction(); }, 100);


function _intervalFunction() {
    let vehicle = alt.Player.local.vehicle;

    if (vehicle) {

        count++;
        if (count > 600) {
            if (native.getPedInVehicleSeat(vehicle, -1, 0) == alt.Player.local.scriptID) {
                if (native.getVehicleClass(targetVeh) == 13) {
                    fuel = 1;
                }
                alt.emitServer("Server:Vehicle:UpdateVehicleKM", miles.toFixed(4), fuel.toFixed(4), targetVeh);
            }
            count = 0;
        }
        if (vehicle) {
            targetVeh = vehicle;
            if (!webView) {
                webView = new alt.WebView('http://resource/client/html/index.html');
                //webView.focus();
                webView.emit('Tacho_VehicleSeat:data', {
                    vehicleSeat: true, //native.getPedInVehicleSeat(vehicle, -1, 0) == alt.Player.local.scriptID,
                    vehicleClass: native.getVehicleClass(targetVeh)
                });
            } else {
                let lightstate = native.getVehicleLightsState(vehicle)
                if (vehPos) {
                    miles = miles + (distance(vehPos, alt.Player.local.pos) / 1600)
                }
                vehPos = alt.Player.local.pos;

                if (native.getIsVehicleEngineRunning(vehicle) && native.getVehicleClass(vehicle) != 13) {
                    verbrauch = (((vehicle.rpm * 0.55) / 400) * fuelUsage) + ((vehicle.gear * 1.6) / 10000);
                } else {
                    verbrauch = 0;
                }
                fuel = fuel - verbrauch;
                let fuelsate = (fuel * 100) / maxgas;

                if (alt.Player.local.hasSyncedMeta("seatbelt")) {
                    seatbelt = alt.Player.local.getSyncedMeta("seatbelt");
                } else {
                    seatbelt = false;
                }
                const locationData = getLocationData();
                webView.emit('Tacho_Update:data', {
                    gear: parseInt(vehicle.gear),
                    rpm: parseInt((vehicle.rpm * 10000).toFixed(0)),
                    speed: parseInt((native.getEntitySpeed(vehicle.scriptID) * 2.237).toFixed(0)),
                    isElectric: electric.includes(vehicle.model),
                    lockState: vehicle.getSyncedMeta("vehicle_lockstate"),
                    lightson: lightstate[1],
                    beamon: lightstate[2],
                    seatbelt: seatbelt,
                    fuel: fuelsate,
                    miles: miles,
                    engine: native.getIsVehicleEngineRunning(vehicle),
                    direction: locationData.direction,
                    street: locationData.street,
                    area: locationData.secondLine
                });
            }
        } else {
            if (webView && playerVehPos == 3 || webView && playerVehPos == 1) {
                if (playerVehPos == 1) {
                    webView.emit('Tacho_VehicleSeat:data', {
                        vehicleSeat: native.getPedInVehicleSeat(vehicle, -1, 0) == alt.Player.local.scriptID,
                        vehicleClass: native.getVehicleClass(vehicle)
                    });
                }
                playerVehPos = 2;
            }
            if (!webView) {
                webView = new alt.WebView('http://resource/client/html/index.html');
                webView.focus();
                webView.emit('Tacho_VehicleSeat:data', {
                    vehicleSeat: native.getPedInVehicleSeat(vehicle, -1, 0) == alt.Player.local.scriptID,
                    vehicleClass: native.getVehicleClass(vehicle)
                });
            } else {
                if (alt.Player.local.hasSyncedMeta("seatbelt")) {
                    webView.emit('Tacho_Seatbelt:data', {
                        seatbelt: alt.Player.local.getSyncedMeta("seatbelt")
                    });
                } else {
                    webView.emit('Tacho_Seatbelt:data', {
                        seatbelt: false
                    });
                }
            }
        }
    } else {
        if (webView) {
            if (miles > 0 && fuel > 0 && playerIsDriver) {
                alt.emitServer("Server:Vehicle:UpdateVehicleKM", miles.toFixed(4), fuel.toFixed(4), targetVeh);
            }
            webView.destroy();
            webView = null;
            vehPos = null;
            playerVehPos = 3;
            fuel = 0;
            miles = 0.0;
            seatbelt = false;
            count = 0;
            targetVeh = null;
            playerIsDriver = false;
        }
    }
};

alt.onServer("Client:HUD:SetPlayerHUDVehicleInfos", (_fuel, _miles, _maxgas) => {
    if (_fuel > _maxgas) {
        _fuel = _maxgas;
    }
    fuel = _fuel;
    miles = _miles;
    maxgas = _maxgas;
    setTimeout(() => {
        let vehicle = alt.Player.local.vehicle;
        if (vehicle) {
            if (native.getPedInVehicleSeat(vehicle, -1, 0) == alt.Player.local.scriptID) {
                playerIsDriver = true;
            } else {
                playerIsDriver = false;
            }
        }
    }, 3000);
});
alt.onServer("Client:HUD:SetPlayerHUDVehicleFuel", (_fuel) => {
    if (_fuel > maxgas) {
        _fuel = maxgas;
    }
    fuel = _fuel;
});
alt.on("Client:HUD:SeatbeltOffSound", () => {
    if (webView != null) {
        webView.emit("CEF:HUD:SeatbeltOffSound");
    }
});
alt.on("Client:HUD:SeatbeltOnSound", () => {
    if (webView != null) {
        webView.emit("CEF:HUD:SeatbeltOnSound");
    }
});

function getCompassDirection(angle) {
    const directions = ['N', 'NW', 'W', 'SW', 'S', 'SE', 'E', 'NE'];
    const index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
    return directions[index];
}

function getLocationData() {
    const localPlayer = alt.Player.local;

    const streetHashes = native.getStreetNameAtCoord(localPlayer.pos.x, localPlayer.pos.y, localPlayer.pos.z);
    const zone = native.getFilenameForAudioConversation(native.getNameOfZone(localPlayer.pos.x, localPlayer.pos.y, localPlayer.pos.z));
    const street = native.getStreetNameFromHashKey(streetHashes[1]);
    const area = native.getStreetNameFromHashKey(streetHashes[2]);

    const secondLine = !area ? zone : `${area}, ${zone}`;

    return {
        direction: getCompassDirection(native.getEntityHeading(localPlayer)),
        street,
        secondLine,
    };
}

class Position {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
class PositionList {
    poslist = [];
    addPosToList(x, y, z) {
        let _pos = new Position(x, y, z);
        this.poslist.push(_pos);
    }
    countPos() {
        return this.poslist.length;
    }
    poslistValue(i) {
        return this.poslist[i];
    }
}

let StartZielArray = createArraywithPosition(-1213.2440, -2961.6740, 13.9515, -1206.1237, -2949.34082, 13.9468);
let pitLaneArray = createArraywithPosition(-1194.9617, -2944.3310546875, 13.9515380859375, -1189.9849, -2936.0361, 13.9446);
let firstSplitArray = createArraywithPosition(-1479.9730, -2617.7822, 13.9446, -1463.6379, -2627.0866, 13.9468);
let secondSplitArray = createArraywithPosition(-1353.3863, -2370.9218, 13.9521, -1364.2003, -2365.4033, 13.9521);

function createArraywithPosition(start_x, start_y, start_z, end_x, end_y, end_z) {
    let distance_x, distance_y;
    let Array = [];

    distance_x = Math.abs(start_x - end_x);
    distance_y = Math.abs(start_y - end_y);

    let math_x = false, math_y = false;

    if (start_x < 0 && end_x < 0) {
        if (start_x * -1 < end_x * -1) {
            math_x = true; // start_x ist kleiner das heißt addieren
        } else {
            math_x = false; // start_x ist größer das heißt subtrahieren
        }
    } else if (start_x < 0) {
        if (start_x * -1 < end_x) {
            math_x = true; // start_x ist kleiner das heißt addieren
        } else {
            math_x = false; // start_x ist größer das heißt subtrahieren
        }
    } else if (end_x < 0) {
        if (start_x < end_x * -1) {
            math_x = true; // start_x ist kleiner das heißt addieren
        } else {
            math_x = false; // start_x ist größer das heißt subtrahieren
        }
    } else if (start_x > 0 && end_x > 0) {
        if (start_x < end_x) {
            math_x = true; // start_x ist kleiner das heißt addieren
        } else {
            math_x = false; // start_x ist größer das heißt subtrahieren
        }
    }
    if (start_y < 0 && end_y < 0) {
        if (start_y * -1 < end_y * -1) {
            math_y = true; // start_y ist kleiner das heißt addieren
        } else {
            math_y = false; // start_y ist größer das heißt subtrahieren
        }
    } else if (start_y < 0) {
        if (start_y * -1 < end_y) {
            math_y = true; // start_y ist kleiner das heißt addieren
        } else {
            math_y = false; // start_y ist größer das heißt subtrahieren
        }
    } else if (end_y < 0) {
        if (start_y < end_y * -1) {
            math_y = true; // start_y ist kleiner das heißt addieren
        } else {
            math_y = false; // start_y ist größer das heißt subtrahieren
        }
    } else if (start_y > 0 && end_y > 0) {
        if (start_y < end_y) {
            math_y = true; // start_x ist kleiner das heißt addieren
        } else {
            math_y = false; // start_x ist größer das heißt subtrahieren
        }
    }
    let length = 0;
    let devider_x = 0;
    let devider_y = 0;
    if (distance_x > distance_y) {
        length = Math.ceil(distance_x * 2);
        devider_x = distance_x / length;
        devider_y = distance_y / length;
    } else {
        length = Math.ceil(distance_y * 2);
        devider_x = distance_x / length;
        devider_y = distance_y / length;
    }
    for (let i = 0; i < length + 1; i++) {
        let x, y, z;

        if (start_x < 0) {
            if (math_x) {
                x = ((start_x) - (devider_x * i));
            } else {
                x = ((start_x) + (devider_x * i));
            }
        } else if ((math_x)) {
            x = start_x + (devider_x * i);
        } else {
            x = start_x - (devider_x * i);
        }
        if (start_y < 0) {
            if (math_y) {
                y = ((start_y) - (devider_y * i));
            } else {
                y = ((start_y) + (devider_y * i));
            }
        } else if ((math_y)) {
            y = start_y + (devider_y * i);
        } else {
            y = start_y - (devider_y * i);
        }
        let testarray = [x, y, end_z];
        Array.push(testarray)
    }
    return Array;
}


let StartZielList = new PositionList();

for (let i = 0; i < StartZielArray.length; i++) {
    StartZielList.addPosToList(StartZielArray[i][0], StartZielArray[i][1], StartZielArray[i][2]);
}
let firstSplitList = new PositionList();
for (let i = 0; i < firstSplitArray.length; i++) {
    firstSplitList.addPosToList(firstSplitArray[i][0], firstSplitArray[i][1], firstSplitArray[i][2]);
}
let secondSplitList = new PositionList();
for (let i = 0; i < secondSplitArray.length; i++) {
    secondSplitList.addPosToList(secondSplitArray[i][0], secondSplitArray[i][1], secondSplitArray[i][2]);
}
let PitList = new PositionList();
for (let i = 0; i < pitLaneArray.length; i++) {
    PitList.addPosToList(pitLaneArray[i][0], pitLaneArray[i][1], pitLaneArray[i][2]);
}
let PitEntryCheck = new PositionList();
PitEntryCheck.addPosToList(-1016.2630, -3042.1057, 14.0019);



let CheckPointSplit1 = new PositionList();
CheckPointSplit1.addPosToList(firstSplitList.poslistValue(Math.ceil(firstSplitList.countPos() / 2)).x, firstSplitList.poslistValue(Math.ceil(firstSplitList.countPos() / 2)).y, firstSplitList.poslistValue(Math.ceil(firstSplitList.countPos() / 2)).z);

let CheckPointSplit2 = new PositionList();
CheckPointSplit2.addPosToList(secondSplitList.poslistValue(Math.ceil(secondSplitList.countPos() / 2)).x, secondSplitList.poslistValue(Math.ceil(secondSplitList.countPos() / 2)).y, secondSplitList.poslistValue(Math.ceil(secondSplitList.countPos() / 2)).z);

let CheckPointStartZiel = new PositionList();
CheckPointStartZiel.addPosToList(StartZielList.poslistValue(Math.ceil(StartZielList.countPos() / 2)).x, StartZielList.poslistValue(Math.ceil(StartZielList.countPos() / 2)).y, StartZielList.poslistValue(Math.ceil(StartZielList.countPos() / 2)).z);

let CheckPointPit = new PositionList();
CheckPointPit.addPosToList(PitList.poslistValue(Math.ceil(PitList.countPos() / 2)).x, PitList.poslistValue(Math.ceil(PitList.countPos() / 2)).y, PitList.poslistValue(Math.ceil(PitList.countPos() / 2)).z);

let split0 = false, split1 = false, split2 = false, preventsecondtime = false, TransponderStatus = false, splitBox = false;
let CheckPointSplit1bool = false, CheckPointSplit2bool = false, CheckPointSplit0bool = true, CheckPointSplitPitbool = false;
let webView1 = null, _setinterval = null;
let lapcounter = 0, closeHud = 0, FuelCount = 0;
var lapTime = Date.now();
var split1Time, split2Time;
var HudStatus = false;

alt.onServer("Client:RaceTrack:activateTransponder", () => {
    if (!TransponderStatus) {
        _setinterval = setInterval(function () { _lapTimer(); }, 12);
        TransponderStatus = true;
        if (!webView1) {
            webView1 = new alt.WebView('http://resource/client/html2/index.html');
            webView1.focus();
            HudStatus = false;
        }
        alt.emit("Client:HUD:sendNotification", 1, 5000, "Transponder ist aktiviert");
    } else {
        if (webView1) {
            webView1.destroy();
            webView1 = null;
        }
        alt.emit("Client:HUD:sendNotification", 1, 5000, "Transponder ist deaktiviert");
        clearTimeout(_setinterval);
        TransponderStatus = false;

        split0 = false, split1 = false, split2 = false, preventsecondtime = false, TransponderStatus = false; splitBox = false;
        CheckPointSplit1bool = false, CheckPointSplit2bool = false, CheckPointSplit0bool = true, CheckPointSplitPitbool = false;
        lapcounter = 0, closeHud = 0, FuelCount = 0;
        lapTime = null;
        split1Time = null, split2Time = null;
    }
});

function _lapTimer() {
    let vehicle = alt.Player.local.vehicle;
    if (vehicle) {

        if (!HudStatus) {
            if (webView1) {
                webView1.emit('RacetrackShowHud', {});
                HudStatus = true;
            }
        }
        FuelCount++;
        if (FuelCount > 75) {
            FuelCount = 0;
            if (webView1) {
                webView1.emit('updateFuel:data', {
                    fuel: fuel
                });
            }
        }

        if (lapcounter == 0) {
            //15
            if (CheckPointSplit0bool && distance(CheckPointStartZiel.poslistValue(0), alt.Player.local.pos) < 16) {
                CheckPointSplit0bool = false;
                setTimeout(() => {
                    if (!split1) {
                        lapTime = Date.now();
                        lapTime -= 3000;
                        split1 = true;
                        CheckPointSplit1bool = true;
                        lapcounter++;
                        webView1.emit('TrackFirstLap:data', {
                            lapTime: 0,
                            lapcounter: 0,
                            fuel: fuel
                        });
                    }
                }, 3000);
            }
            for (let i = 0; i < StartZielList.countPos(); i++) {
                if (distance(StartZielList.poslistValue(i), alt.Player.local.pos) < 1 && !preventsecondtime) {
                    preventsecondtime = true;
                    lapTime = Date.now();
                    split1 = true;
                    CheckPointSplit1bool = true;
                    lapcounter++;
                    webView1.emit('TrackFirstLap:data', {
                        lapTime: 0,
                        lapcounter: 0,
                        fuel: fuel
                    });
                    setTimeout(() => { ; preventsecondtime = false; }, 3000);
                    break;
                }
            }
        }
        if (split1) {
            //18
            if (CheckPointSplit1bool && distance(CheckPointSplit1.poslistValue(0), alt.Player.local.pos) < 19) {
                CheckPointSplit1bool = false;
                setTimeout(() => {
                    if (split1) {
                        split1 = false;
                        split2 = true;
                        CheckPointSplit2bool = true;
                        split1Time = Date.now() - lapTime;
                        if (webView1) {
                            webView1.emit('TrackTimesplit1:data', {
                                split: split1Time
                            });
                        }
                    }
                }, 3000);
            }

            for (let i = 0; i < firstSplitList.countPos(); i++) {
                if (distance(firstSplitList.poslistValue(i), alt.Player.local.pos) < 1 && !preventsecondtime) {
                    preventsecondtime = true;
                    split1 = false;
                    split2 = true;
                    CheckPointSplit2bool = true;
                    split1Time = Date.now() - lapTime;
                    if (webView1) {
                        webView1.emit('TrackTimesplit1:data', {
                            split: split1Time
                        });
                    }
                    setTimeout(() => { preventsecondtime = false; }, 3000);
                    break;
                }
            }
        }
        if (split2) {
            //16
            if (CheckPointSplit2bool && distance(CheckPointSplit2.poslistValue(0), alt.Player.local.pos) < 17) {
                CheckPointSplit2bool = false;
                setTimeout(() => {
                    if (split2) {
                        split2 = false;
                        split0 = true;
                        CheckPointSplit0bool = true;
                        split2Time = Date.now() - lapTime;
                        if (webView1) {
                            webView1.emit('TrackTimesplit2:data', {
                                split: split2Time
                            });
                        }
                    }
                }, 3000);
            }
            for (let i = 0; i < secondSplitList.countPos(); i++) {
                if (distance(secondSplitList.poslistValue(i), alt.Player.local.pos) < 1 && !preventsecondtime) {
                    preventsecondtime = true;
                    split2 = false;
                    split0 = true;
                    CheckPointSplit0bool = true;
                    split2Time = Date.now() - lapTime;
                    if (webView1) {
                        webView1.emit('TrackTimesplit2:data', {
                            split: split2Time
                        });
                    }
                    setTimeout(() => { ; preventsecondtime = false; }, 3000);
                    break;
                }
            }
        }
        if (split0) {
            //15
            if (CheckPointSplit0bool && distance(CheckPointStartZiel.poslistValue(0), alt.Player.local.pos) < 16) {
                CheckPointSplit0bool = false;
                setTimeout(() => {
                    if (split0) {
                        split0 = false;
                        split1 = true;
                        CheckPointSplit1bool = true;
                        let _tempTime = Date.now() - lapTime;
                        lapTime = Date.now();
                        lapTime -= 3000;
                        if (webView1) {
                            webView1.emit('TrackTime:data', {
                                lapTime: _tempTime,
                                lapcounter: lapcounter,
                                fuel: fuel
                            });
                            alt.emitServer("Server:Racetrack:UpdateLapTime", split1Time, split2Time, _tempTime, vehicle, Date.now());
                        }
                        lapcounter++;
                    }
                }, 3000);
            }
            for (let i = 0; i < StartZielList.countPos(); i++) {
                if (distance(StartZielList.poslistValue(i), alt.Player.local.pos) < 1 && !preventsecondtime) {
                    preventsecondtime = true;
                    split0 = false;
                    split1 = true;
                    let _tempTime = Date.now() - lapTime;
                    lapTime = Date.now();
                    if (webView1) {
                        webView1.emit('TrackTime:data', {
                            lapTime: _tempTime,
                            lapcounter: lapcounter,
                            fuel: fuel
                        });
                        alt.emitServer("Server:Racetrack:UpdateLapTime", split1Time, split2Time, _tempTime, vehicle, Date.now());
                    }
                    lapcounter++;
                    setTimeout(() => { ; preventsecondtime = false; }, 3000);
                    break;
                }
            }
            for (let i = 0; i < PitEntryCheck.countPos(); i++) {
                if (distance(PitEntryCheck.poslistValue(0), alt.Player.local.pos) < 13) {
                    splitBox = true;
                    split0 = false;
                    CheckPointSplitPitbool = true;
                }
            }
        }
        if (splitBox) {
            if (CheckPointSplitPitbool && distance(CheckPointPit.poslistValue(0), alt.Player.local.pos) < 16) {
                CheckPointSplitPitbool = false;
                setTimeout(() => {
                    if (split0) {
                        splitBox = false;
                        split1 = true;
                        CheckPointSplit1bool = true;
                        let _tempTime = Date.now() - lapTime;
                        lapTime = Date.now();
                        lapTime -= 3000;
                        if (webView1) {
                            webView1.emit('TrackTime:data', {
                                lapTime: _tempTime,
                                lapcounter: lapcounter,
                                fuel: fuel
                            });
                            alt.emitServer("Server:Racetrack:UpdateLapTime", split1Time, split2Time, _tempTime, vehicle, Date.now());
                        }
                        lapcounter++;
                    }
                }, 3000);
            }
            for (let i = 0; i < PitList.countPos(); i++) {
                if (distance(PitList.poslistValue(i), alt.Player.local.pos) < 1 && !preventsecondtime) {
                    preventsecondtime = true;
                    splitBox = false;
                    split1 = true;
                    let _tempTime = Date.now() - lapTime;
                    lapTime = Date.now();
                    if (webView1) {
                        webView1.emit('TrackTime:data', {
                            lapTime: _tempTime,
                            lapcounter: lapcounter,
                            fuel: fuel
                        });
                        alt.emitServer("Server:Racetrack:UpdateLapTime", split1Time, split2Time, _tempTime, vehicle, Date.now());
                    }
                    lapcounter++;
                    setTimeout(() => { ; preventsecondtime = false; }, 3000);
                    break;
                }
            }
        }

        closeHud = 0;
    } else {

        if (HudStatus) {
            if (webView1) {
                webView1.emit('RacetrackHideHud', {});
                HudStatus = false;
            }
        }

        closeHud++;
        if (closeHud > 5000) {
            if (webView1) {
                webView1.destroy();
                webView1 = null;
            }
            alt.emit("Client:HUD:sendNotification", 1, 5000, "Transponder ist deaktiviert");
            clearTimeout(_setinterval);
            TransponderStatus = false;

            split0 = false, split1 = false, split2 = false, preventsecondtime = false, TransponderStatus = false, splitBox = false;
            CheckPointSplit1bool = false, CheckPointSplit2bool = false, CheckPointSplit0bool = true, CheckPointSplitPitbool = false;
            lapcounter = 0, closeHud = 0, FuelCount = 0;
            lapTime = null;
            split1Time = null, split2Time = null;
        }
    }
}


let webViewRaceScreen = null;
alt.onServer("Client:Racetrack:GetRaceLaps", (_result, _mode, _rank, _customAdd1, _customAdd2) => {
    if (!webViewRaceScreen) {
        webViewRaceScreen = new alt.WebView('http://resource/client/html3/index.html');
        webViewRaceScreen.focus();
        if (_mode == 0) {
            webViewRaceScreen.emit('FreeRoamScreen:data', {
                array: _result,
                mode: _mode,
                rank: _rank
            });
        }
        if (_mode == 1) {
            webViewRaceScreen.emit('QualiScreen:data', {
                array: _result,
                mode: _mode,
                rank: _rank,
                date: _customAdd1,
                minutes: _customAdd2
            });
        }
        if (_mode == 2) {
            webViewRaceScreen.emit('RaceScreen:data', {
                array: _result,
                mode: _mode,
                rank: _rank,
                laps: _customAdd1
            });
        }
        alt.showCursor(true);
        native.freezeEntityPosition(alt.Player.local.scriptID, true);
        alt.toggleGameControls(false);

        webViewRaceScreen.on('client:webViewRaceScreenClose', () => {
            webViewRaceScreen.destroy();
            webViewRaceScreen = null;
            alt.showCursor(false);
            native.freezeEntityPosition(alt.Player.local.scriptID, false);
            alt.toggleGameControls(true);
        });
        webViewRaceScreen.on('client:updateMode', (mode, Add) => {
            alt.emitServer("Server:Racetrack:updateMode", mode, Add);
        });
        webViewRaceScreen.on('client:resetLaps', () => {
            alt.emitServer("Server:Racetrack:resetLaps");
        });

    }
});

