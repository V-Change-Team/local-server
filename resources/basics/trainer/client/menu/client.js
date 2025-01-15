import * as alt from "alt-client";
import * as MenuFramework from "./src/menu.js";
import * as data from "./data.js";
import * as game from "natives";
//__________________________________________________________________________________________________________________________________//
alt.on("keydown", (key) => {
    switch (key) {
        case 122:
            menu.open();
            break;
    }
});

//__________________________________________________________________________________________________________________________________//
const menu = new MenuFramework.Menu("V-Change Trainer V0.1");

//Vehicle Categories
let player = new MenuFramework.MenuItem("Player Menu", "Opens the Player Menu", "", false, undefined, "➔");
let vehicle = new MenuFramework.MenuItem("Vehicle Menu", "Opens the Vehicle Menu ", "", false, undefined, "➔");
let weapon = new MenuFramework.MenuItem("Weapon Menu", "Opens the Weapon Menu ", "", false, undefined, "➔");
let world = new MenuFramework.MenuItem("World Menu", "Opens the World Menu ", "", false, undefined, "➔");
let misc = new MenuFramework.MenuItem("Misc Menu", "Opens the Misc Menu ", "", false, undefined, "➔");

//Start Player Options//
let playerMenu = new MenuFramework.Menu("Player Menu");
menu.addSubmenu(playerMenu, player);

let modelInput = new MenuFramework.InputItem("Player Model", 30);
let playerHeal = new MenuFramework.MenuItem("Player Heal");
let playerInvisible = new MenuFramework.CheckboxItem("Player Invisible", 0, "Makes you Invisible");
let playerGodmode = new MenuFramework.CheckboxItem("Player Godmode", 0, "Makes you Invincible");
let playerRagdoll = new MenuFramework.CheckboxItem("Disable Ragdoll", 0, "Disable the Ragdoll");
let playerCollision = new MenuFramework.CheckboxItem("Disable Collsion", 0, "Disable your Collsion");
let playerRun = new MenuFramework.CheckboxItem("Fast Run", 0, "Makes you Run Faster");
let playerSwim = new MenuFramework.CheckboxItem("Fast Swim", 0, "Makes you Swim Faster");
let playerThermal = new MenuFramework.CheckboxItem("Thermal Vision", 0, "Activate the Thermal Vision");
let playerNight = new MenuFramework.CheckboxItem("Night Vision", 0, "Activate the Night Vision");
let playerSuicide = new MenuFramework.MenuItem("Player Suicide", "Kill Yourself");

let forceSkateboard = new MenuFramework.MenuItem("Force Animation");
let stopAnimation = new MenuFramework.MenuItem("Stop Animation");
playerMenu.addItem(modelInput);
playerMenu.addItem(playerHeal);
playerMenu.addItem(playerInvisible);
playerMenu.addItem(playerGodmode);
playerMenu.addItem(playerRagdoll);
playerMenu.addItem(playerCollision);
playerMenu.addItem(playerRun);
playerMenu.addItem(playerSwim);
playerMenu.addItem(playerThermal);
playerMenu.addItem(playerNight);
playerMenu.addItem(playerSuicide);
playerMenu.addItem(forceSkateboard);
playerMenu.addItem(stopAnimation);

playerMenu.inputSubmit.on((item, id) => {
    if (item === modelInput) {
        alt.emitServer("Server:Player:Model", id);
    }
});

playerMenu.checkboxChange.on((item, id) => {
    if (item === playerInvisible) {
        game.setEntityVisible(alt.Player.local.scriptID, !id, false);
    }
    if (item === playerGodmode) {
        game.setEntityCanBeDamaged(alt.Player.local.scriptID, !id);
        game.setEntityInvincible(alt.Player.local.scriptID, id);
    }
    if (item === playerRagdoll) {
        game.setPedCanRagdoll(alt.Player.local.scriptID, !id);
    }
    if (item === playerCollision) {
        game.setEntityCollision(alt.Player.local.scriptID, !id, true);
    }
    if (item === playerRun) {
        if (playerRun.checked) {
            game.setRunSprintMultiplierForPlayer(alt.Player.local.scriptID, 1.49);
        } else {
            game.setRunSprintMultiplierForPlayer(alt.Player.local.scriptID, 1);
        }
    }
    if (item === playerSwim) {
        if (playerSwim.checked) {
            game.setSwimMultiplierForPlayer(alt.Player.local.scriptID, 1.49);
        } else {
            game.setSwimMultiplierForPlayer(alt.Player.local.scriptID, 1);
        }
    }
    if (item === playerThermal) {
        game.setSeethrough(id);
    }
    if (item === playerNight) {
        game.setNightvision(id);
    }
});

playerMenu.itemSelect.on((item, id) => {
    if (item === playerHeal) {
        alt.emitServer("Server:Player:Heal", 0, id);
    }
    if (item === playerSuicide) {
        menu.close();
        game.setEntityHealth(alt.Player.local.scriptID, 0, 0);
    }
    if (item === forceSkateboard) {
        game.taskPlayAnim(alt.Player.local.scriptID, "move_strafe@stealth", "idle", 8.0, 1.0, -1, 42, 0, false, false, false);
    }
    if (item === stopAnimation) {
        game.clearPedTasks(alt.Player.local.scriptID);
        if (!prop || prop == null) return;
        alt.setTimeout(() => {
            game.detachEntity(prop, true, false);
            game.deleteObject(prop);
            prop = null;
        }, 800);
    }
});

//End Player Options//
//Start Vehicle Options//
let vehicleMenu = new MenuFramework.Menu("Vehicle Menu");
menu.addSubmenu(vehicleMenu, vehicle);

let vehicleInput = new MenuFramework.InputItem("Vehicle Spawner", 30);
let vehicleTuning = new MenuFramework.MenuItem("Vehicle Options", "Change your Vehicle Tunings", "", false, undefined, "➔");
let repair = new MenuFramework.MenuItem("Vehicle Repair", "Repair your Vehicle", "", false, undefined, "➔");

//Start Vehicle Tuning Menu//
let tuningMenu = new MenuFramework.Menu("Vehicle Tuning");
vehicleMenu.addItem(vehicleInput);
vehicleMenu.addSubmenu(tuningMenu, vehicleTuning);
vehicleMenu.addItem(repair);

vehicleMenu.inputSubmit.on((item, id) => {
    if (item === vehicleInput) {
        alt.emitServer("Server:Vehicle:Spawn", id);
    }
});

vehicleMenu.itemSelect.on((item, id) => {
    if (item == vehicleTuning) {
        alt.emitServer("Server:Vehicle:getMods", id);
    }
    if (item == repair) {
        alt.emitServer("Server:Vehicle:Repair", 0, id);
    }
});

let bodyKit = new MenuFramework.MenuItem("Chassis", "Change your Vehicle Chassis Parts", "", false, undefined, "➔");
let performanceKit = new MenuFramework.MenuItem("Performance", "Change your Vehicle Performance", "", false, undefined, "➔");
let vehicleOptions = new MenuFramework.MenuItem("Colors", "Change your Vehicle Colors", "", false, undefined, "➔");
let vehicleExtra = new MenuFramework.MenuItem("Extras", "Change your Vehicle Extras", "", false, undefined, "➔");

//Bodyparts
let bodyparts = new MenuFramework.Menu("Chassis Parts");
tuningMenu.addSubmenu(bodyparts, bodyKit);

let bennysMods = new MenuFramework.MenuItem("Bennys Original Motorworks", "Opens the Bennys Original Motorworks Menu", "", false, undefined, "➔");
let bennysMenu = new MenuFramework.Menu("Bennys Mods");
bodyparts.addSubmenu(bennysMenu, bennysMods);

let bodyMods = new MenuFramework.MenuItem("Bodyparts Menu", "Opens the Vehicle Bodyparts Menu", "", false, undefined, "➔");
let bodyMenu = new MenuFramework.Menu("Body Mods");
bodyparts.addSubmenu(bodyMenu, bodyMods);

let wheels = new MenuFramework.MenuItem("Wheels Menu", "Opens the Vehicle Wheels Menu", "", false, undefined, "➔");
let wheelsMenu = new MenuFramework.Menu("Wheels Menu");
bodyparts.addSubmenu(wheelsMenu, wheels);

let performance = new MenuFramework.Menu("Performance Parts");
tuningMenu.addSubmenu(performance, performanceKit);

alt.onServer("Server:Vehicle:sendMods", (getModsCount, getCurrentMods) => {
    bodyMenu.clear();
    bennysMenu.clear();
    wheelsMenu.clear();
    performance.clear();

    let bodySpoiler = new MenuFramework.AutoListItem("Spoiler", 0, getModsCount.spoiler, getCurrentMods.spoiler, "");
    let bodyFrontBumper = new MenuFramework.AutoListItem("Front Bumper", 0, getModsCount.fbumper, getCurrentMods.fbumper, "");
    let bodyRearBumper = new MenuFramework.AutoListItem("Rear Bumper", 0, getModsCount.rbumper, getCurrentMods.rbumper, "");
    let bodySideSkirt = new MenuFramework.AutoListItem("Side Skirt", 0, getModsCount.sskirt, getCurrentMods.sskirt, "");
    let bodyExhaust = new MenuFramework.AutoListItem("Exhaust", 0, getModsCount.exhaust, getCurrentMods.exhaust, "");
    let bodyFrame = new MenuFramework.AutoListItem("Frame", 0, getModsCount.frame, getCurrentMods.frame, "");
    let bodyGrille = new MenuFramework.AutoListItem("Grille", 0, getModsCount.grille, getCurrentMods.grille, "");
    let bodyHood = new MenuFramework.AutoListItem("Hood", 0, getModsCount.hood, getCurrentMods.hood, "");
    let bodyFenderL = new MenuFramework.AutoListItem("Fender Left", 0, getModsCount.lwing, getCurrentMods.lwing, "");
    let bodyFenderR = new MenuFramework.AutoListItem("Fender Right", 0, getModsCount.rwing, getCurrentMods.rwing, "");
    let bodyRoof = new MenuFramework.AutoListItem("Roof", 0, getModsCount.roof, getCurrentMods.roof, "");
    let bodyHorn = new MenuFramework.AutoListItem("Horn", 0, getModsCount.horns, getCurrentMods.horn, "");
    bodyMenu.addItem(bodySpoiler);
    bodyMenu.addItem(bodyFrontBumper);
    bodyMenu.addItem(bodyRearBumper);
    bodyMenu.addItem(bodySideSkirt);
    bodyMenu.addItem(bodyExhaust);
    bodyMenu.addItem(bodyFrame);
    bodyMenu.addItem(bodyGrille);
    bodyMenu.addItem(bodyHood);
    bodyMenu.addItem(bodyFenderL);
    bodyMenu.addItem(bodyFenderR);
    bodyMenu.addItem(bodyRoof);
    bodyMenu.addItem(bodyHorn);

    bodyMenu.autoListChange.on((item, id) => {
        switch (item) {
            case bodySpoiler:
                alt.emitServer("Server:Vehicle:Mods", 0, id);
                break;
            case bodyFrontBumper:
                alt.emitServer("Server:Vehicle:Mods", 1, id);
                break;
            case bodyRearBumper:
                alt.emitServer("Server:Vehicle:Mods", 2, id);
                break;
            case bodySideSkirt:
                alt.emitServer("Server:Vehicle:Mods", 3, id);
                break;
            case bodyExhaust:
                alt.emitServer("Server:Vehicle:Mods", 4, id);
                break;
            case bodyFrame:
                alt.emitServer("Server:Vehicle:Mods", 5, id);
                break;
            case bodyGrille:
                alt.emitServer("Server:Vehicle:Mods", 6, id);
                break;
            case bodyHood:
                alt.emitServer("Server:Vehicle:Mods", 7, id);
                break;
            case bodyFenderL:
                alt.emitServer("Server:Vehicle:Mods", 8, id);
                break;
            case bodyFenderR:
                alt.emitServer("Server:Vehicle:Mods", 9, id);
                break;
            case bodyRoof:
                alt.emitServer("Server:Vehicle:Mods", 10, id);
        }
        return menu;
    });

    let bennysPlateH = new MenuFramework.AutoListItem("Plateholder", 0, getModsCount.plateh, getCurrentMods.plateh, "");
    let bennysVanity = new MenuFramework.AutoListItem("Vanity Plates", 0, getModsCount.platev, getCurrentMods.platev, "");
    let bennysTrim = new MenuFramework.AutoListItem("Trim Design", 0, getModsCount.trimdesign, getCurrentMods.trimdesign, "");
    let bennysOrna = new MenuFramework.AutoListItem("Ornaments", 0, getModsCount.ornaments, getCurrentMods.ornaments, "");
    let bennysDash = new MenuFramework.AutoListItem("Dashboard", 0, getModsCount.dash, getCurrentMods.dash, "");
    let bennysDial = new MenuFramework.AutoListItem("Dial", 0, getModsCount.dial, getCurrentMods.dial, "");
    let bennysDoorint = new MenuFramework.AutoListItem("Door Speaker", 0, getModsCount.doorint, getCurrentMods.doorint, "");
    let bennysSeat = new MenuFramework.AutoListItem("Seat", 0, getModsCount.seats, getCurrentMods.seats, "");
    let bennysSteering = new MenuFramework.AutoListItem("Steering Wheels", 0, getModsCount.steeringw, getCurrentMods.steeringw, "");
    let bennysShifter = new MenuFramework.AutoListItem("Shifter Leavers", 0, getModsCount.shiftlever, getCurrentMods.shiftlever, "");
    let bennysPlaques = new MenuFramework.AutoListItem("Plaques", 0, getModsCount.plaques, getCurrentMods.plaques, "");
    let bennysSpeakers = new MenuFramework.AutoListItem("Speakers", 0, getModsCount.speakers, getCurrentMods.speakers, "");
    let bennysTrunk = new MenuFramework.AutoListItem("Trunk", 0, getModsCount.trunk, getCurrentMods.trunk, "");
    let bennysHydraulics = new MenuFramework.AutoListItem("Hydraulics", 0, getModsCount.hydraulics, getCurrentMods.hydraulics, "");
    let bennysEngine = new MenuFramework.AutoListItem("Engine Block", 0, getModsCount.engineb, getCurrentMods.engineb, "");
    let bennysAirfilter = new MenuFramework.AutoListItem("Airfilter", 0, getModsCount.airfilter, getCurrentMods.airfilter, "");
    let bennysStrutbar = new MenuFramework.AutoListItem("Strutbar", 0, getModsCount.strutbar, getCurrentMods.strutbar, "");
    let bennysArchcover = new MenuFramework.AutoListItem("Arch Cover", 0, getModsCount.archcover, getCurrentMods.archcover, "");
    let bennysAerials = new MenuFramework.AutoListItem("Aerials", 0, getModsCount.aerials, getCurrentMods.aerials, "");
    let bennysExterior = new MenuFramework.AutoListItem("Exterior Parts", 0, getModsCount.exteriorp, getCurrentMods.exteriorp, "");
    let bennysTank = new MenuFramework.AutoListItem("Tank", 0, getModsCount.tank, getCurrentMods.tank, "");
    let bennysWroh = new MenuFramework.AutoListItem("Wheels Rear Or Hydraulics", 0, getModsCount.wroh, getCurrentMods.wroh, "");
    let bennysLivery = new MenuFramework.AutoListItem("Liverys", 0, getModsCount.stickers, getCurrentMods.stickers, "");
    let bennysPlate = new MenuFramework.MenuItem("Plate", "Change your Vehicle Plate", "", false, undefined, "");
    bennysMenu.addItem(bennysPlateH);
    bennysMenu.addItem(bennysVanity);
    bennysMenu.addItem(bennysTrim);
    bennysMenu.addItem(bennysOrna);
    bennysMenu.addItem(bennysDash);
    bennysMenu.addItem(bennysDial);
    bennysMenu.addItem(bennysDoorint);
    bennysMenu.addItem(bennysSeat);
    bennysMenu.addItem(bennysSteering);
    bennysMenu.addItem(bennysShifter);
    bennysMenu.addItem(bennysPlaques);
    bennysMenu.addItem(bennysTrunk);
    bennysMenu.addItem(bennysSpeakers);
    bennysMenu.addItem(bennysHydraulics);
    bennysMenu.addItem(bennysEngine);
    bennysMenu.addItem(bennysAirfilter);
    bennysMenu.addItem(bennysStrutbar);
    bennysMenu.addItem(bennysArchcover);
    bennysMenu.addItem(bennysAerials);
    bennysMenu.addItem(bennysExterior);
    bennysMenu.addItem(bennysTank);
    bennysMenu.addItem(bennysWroh);
    bennysMenu.addItem(bennysLivery);

    bennysMenu.autoListChange.on((item, id) => {
        switch (item) {
            case bennysPlateH:
                alt.emitServer("Server:Vehicle:Mods", 25, id);
                break;
            case bennysVanity:
                alt.emitServer("Server:Vehicle:Mods", 26, id);
                break;
            case bennysTrim:
                alt.emitServer("Server:Vehicle:Mods", 27, id);
                break;
            case bennysOrna:
                alt.emitServer("Server:Vehicle:Mods", 28, id);
                break;
            case bennysDash:
                alt.emitServer("Server:Vehicle:Mods", 29, id);
                break;
            case bennysDial:
                alt.emitServer("Server:Vehicle:Mods", 30, id);
                break;
            case bennysDoorint:
                alt.emitServer("Server:Vehicle:Mods", 31, id);
                break;
            case bennysSeat:
                alt.emitServer("Server:Vehicle:Mods", 32, id);
                break;
            case bennysSteering:
                alt.emitServer("Server:Vehicle:Mods", 33, id);
                break;
            case bennysShifter:
                alt.emitServer("Server:Vehicle:Mods", 34, id);
                break;
            case bennysPlaques:
                alt.emitServer("Server:Vehicle:Mods", 35, id);
                break;
            case bennysSpeakers:
                alt.emitServer("Server:Vehicle:Mods", 36, id);
                break;
            case bennysTrunk:
                alt.emitServer("Server:Vehicle:Mods", 37, id);
                break;
            case bennysHydraulics:
                alt.emitServer("Server:Vehicle:Mods", 38, id);
                break;
            case bennysHydraulics:
                alt.emitServer("Server:Vehicle:Mods", 39, id);
                break;
            case bennysAirfilter:
                alt.emitServer("Server:Vehicle:Mods", 40, id);
                break;
            case bennysStrutbar:
                alt.emitServer("Server:Vehicle:Mods", 41, id);
                break;
            case bennysArchcover:
                alt.emitServer("Server:Vehicle:Mods", 42, id);
                break;
            case bennysAerials:
                alt.emitServer("Server:Vehicle:Mods", 43, id);
                break;
            case bennysExterior:
                alt.emitServer("Server:Vehicle:Mods", 44, id);
                break;
            case bennysTank:
                alt.emitServer("Server:Vehicle:Mods", 45, id);
                break;
            case bennysWroh:
                alt.emitServer("Server:Vehicle:Mods", 47, id);
                break;
            case bennysLivery:
                alt.emitServer("Server:Vehicle:Mods", 48, id);
                break;
        }
        return menu;
    });

    let plateMenu = new MenuFramework.Menu("Plate Menu");
    bennysMenu.addSubmenu(plateMenu, bennysPlate);

    let pBlue = new MenuFramework.MenuItem(data.plate[0].name, "Switch Vehicle Plate to " + data.plate[0].name);
    let pYBlack = new MenuFramework.MenuItem(data.plate[1].name, "Switch Vehicle Plate to " + data.plate[1].name);
    let pYBlue = new MenuFramework.MenuItem(data.plate[2].name, "Switch Vehicle Plate to " + data.plate[2].name);
    let pSA = new MenuFramework.MenuItem(data.plate[3].name, "Switch Vehicle Plate to " + data.plate[3].name);
    let pSAE = new MenuFramework.MenuItem(data.plate[4].name, "Switch Vehicle Plate to " + data.plate[4].name);
    let pYA = new MenuFramework.MenuItem(data.plate[5].name, "Switch Vehicle Plate to " + data.plate[5].name);
    plateMenu.addItem(pBlue);
    plateMenu.addItem(pYBlack);
    plateMenu.addItem(pYBlue);
    plateMenu.addItem(pSA);
    plateMenu.addItem(pSAE);
    plateMenu.addItem(pYA);

    plateMenu.itemSelect.on((item) => {
        if (item == pBlack) {
            var id = data.plate[0].id;
            alt.emitServer("Server:Vehicle:Plate", id);
        }
        if (item == pYBlack) {
            var id = data.plate[1].id;
            alt.emitServer("Server:Vehicle:Plate", id);
        }
        if (item == pYBlue) {
            var id = data.plate[2].id;
            alt.emitServer("Server:Vehicle:Plate", id);
        }
        if (item == pSA) {
            var id = data.plate[3].id;
            alt.emitServer("Server:Vehicle:Plate", id);
        }
        if (item == pSAE) {
            var id = data.plate[4].id;
            alt.emitServer("Server:Vehicle:Plate", id);
        }
        if (item == pYA) {
            var id = data.plate[5].id;
            alt.emitServer("Server:Vehicle:Plate", id);
        }
    });

    let wheelsCatagory = new MenuFramework.AutoListItem("Wheels Catageory", 0, 12, getCurrentMods.fwheels, "");
    let wheelsType = new MenuFramework.AutoListItem("Wheels Type", 0, 217, getCurrentMods.fwheels, "");
    wheelsMenu.addItem(wheelsCatagory);
    wheelsMenu.addItem(wheelsType);

    wheelsMenu.autoListChange.on((item, id, value) => {
        switch (item) {
            case wheelsCatagory:
                alt.emitServer("Server:Vehicle:Wheels", id);
                break;
            case wheelsType:
                alt.emitServer("Server:Vehicle:Wheels", value);
                break;
        }
        return menu;
    });

    let engine = new MenuFramework.AutoListItem("Engine", 0, getModsCount.engine, getCurrentMods.engine, "");
    let brake = new MenuFramework.AutoListItem("Brakes", 0, getModsCount.brakes, getCurrentMods.brakes, "");
    let trans = new MenuFramework.AutoListItem("Transmission", 0, getModsCount.trans, getCurrentMods.trans, "");
    let suspe = new MenuFramework.AutoListItem("Suspension", 0, getModsCount.suspension, getCurrentMods.suspension, "");
    let turbo = new MenuFramework.AutoListItem("Turbo", 0, 1, getCurrentMods.turbo, "");
    performance.addItem(engine);
    performance.addItem(brake);
    performance.addItem(trans);
    performance.addItem(suspe);
    performance.addItem(turbo);

    performance.autoListChange.on((item, id) => {
        switch (item) {
            case engine:
                alt.emitServer("Server:Vehicle:Mods", 11, id);
                break;
            case brake:
                alt.emitServer("Server:Vehicle:Mods", 12, id);
                break;
            case trans:
                alt.emitServer("Server:Vehicle:Mods", 13, id);
                break;
            case suspe:
                alt.emitServer("Server:Vehicle:Mods", 15, id);
                break;
            case turbo:
                alt.emitServer("Server:Vehicle:Mods", 18, id);
                break;
        }
        return menu;
    });
});
//End Vehicle Tuning Menu//
//Start Vehicle Color Menu//
const vehicleColorMenu = new MenuFramework.Menu("Vehicle Colors");
tuningMenu.addSubmenu(vehicleColorMenu, vehicleOptions);

let primaryColor = new MenuFramework.MenuItem("Primary Color", "Change your Primary Color", "", false, undefined, "➔");
let secondaryColor = new MenuFramework.MenuItem("Secondary Color", "Change your Secondary Color", "", false, undefined, "➔");
let pearlColor = new MenuFramework.MenuItem("Pearl Color", "Change your Pearl Color", "", false, undefined, "➔");
let interiorColor = new MenuFramework.MenuItem("Interior Color", "Change your Interior Color", "", false, undefined, "➔");
let wheelColor = new MenuFramework.MenuItem("Wheel Color", "Change your Wheel Color", "", false, undefined, "➔");
let headlightColor = new MenuFramework.MenuItem("Headlight Color", "Change your Headlight Color", "", false, undefined, "➔");
let neonLightColor = new MenuFramework.MenuItem("Neon Color", "Change your Neon Color", "", false, undefined, "➔");
let windowColor = new MenuFramework.MenuItem("Window Color", "Change your Window Tint", "", false, undefined, "➔");

let primaryColorMenu = new MenuFramework.Menu("Primary Colors");
vehicleColorMenu.addSubmenu(primaryColorMenu, primaryColor);

primaryColorMenu.itemSelect.on((item, itemIndex) => {
    let colorIndex = data.vehicleColors[itemIndex].id;
    alt.emitServer("Server:Vehicle:PrimaryColor", colorIndex);
});

let secondaryColorMenu = new MenuFramework.Menu("Secondary Colors");
vehicleColorMenu.addSubmenu(secondaryColorMenu, secondaryColor);

secondaryColorMenu.itemSelect.on((item, itemIndex) => {
    let colorIndex = data.vehicleColors[itemIndex].id;
    alt.emitServer("Server:Vehicle:SecondaryColor", colorIndex);
});

let pearlColorMenu = new MenuFramework.Menu("Pearl Colors");
vehicleColorMenu.addSubmenu(pearlColorMenu, pearlColor);

pearlColorMenu.itemSelect.on((item, itemIndex) => {
    let colorIndex = data.vehicleColors[itemIndex].id;
    alt.emitServer("Server:Vehicle:PearlColor", colorIndex);
});

let interiorColorMenu = new MenuFramework.Menu("Interior Colors");
vehicleColorMenu.addSubmenu(interiorColorMenu, interiorColor);

interiorColorMenu.itemSelect.on((item, itemIndex) => {
    let colorIndex = data.vehicleColors[itemIndex].id;
    alt.emitServer("Server:Vehicle:interiorColor", colorIndex);
});

let wheelColorMenu = new MenuFramework.Menu("Wheel Colors");
vehicleColorMenu.addSubmenu(wheelColorMenu, wheelColor);

wheelColorMenu.itemSelect.on((item, itemIndex) => {
    let colorIndex = data.vehicleColors[itemIndex].id;
    alt.emitServer("Server:Vehicle:WheelColor", colorIndex);
});

let headlightMenu = new MenuFramework.Menu("Headlight Color");
vehicleColorMenu.addSubmenu(headlightMenu, headlightColor);

let white = new MenuFramework.MenuItem(data.lightColors[1].name, "Switch Headlight Color to " + data.lightColors[1].name);
let xenon = new MenuFramework.MenuItem(data.lightColors[0].name, "Switch Headlight Color to " + data.lightColors[0].name);
let blue = new MenuFramework.MenuItem(data.lightColors[2].name, "Switch Headlight Color to " + data.lightColors[2].name);
let electric = new MenuFramework.MenuItem(data.lightColors[3].name, "Switch Headlight Color to " + data.lightColors[3].name);
let green = new MenuFramework.MenuItem(data.lightColors[4].name, "Switch Headlight Color to " + data.lightColors[4].name);
let lightGreen = new MenuFramework.MenuItem(data.lightColors[5].name, "Switch Headlight Color to " + data.lightColors[5].name);
let yellow = new MenuFramework.MenuItem(data.lightColors[6].name, "Switch Headlight Color to " + data.lightColors[6].name);
let goldenShower = new MenuFramework.MenuItem(data.lightColors[7].name, "Switch Headlight Color to " + data.lightColors[7].name);
let orange = new MenuFramework.MenuItem(data.lightColors[8].name, "Switch Headlight Color to " + data.lightColors[8].name);
let red = new MenuFramework.MenuItem(data.lightColors[9].name, "Switch Headlight Color to " + data.lightColors[9].name);
let ponyPink = new MenuFramework.MenuItem(data.lightColors[10].name, "Switch Headlight Color to " + data.lightColors[10].name);
let hotPink = new MenuFramework.MenuItem(data.lightColors[11].name, "Switch Headlight Color to " + data.lightColors[11].name);
let purple = new MenuFramework.MenuItem(data.lightColors[12].name, "Switch Headlight Color to " + data.lightColors[12].name);
let blackLight = new MenuFramework.MenuItem(data.lightColors[13].name, "Switch Headlight Color to " + data.lightColors[13].name);
headlightMenu.addItem(white);
headlightMenu.addItem(xenon);
headlightMenu.addItem(blue);
headlightMenu.addItem(electric);
headlightMenu.addItem(green);
headlightMenu.addItem(lightGreen);
headlightMenu.addItem(yellow);
headlightMenu.addItem(goldenShower);
headlightMenu.addItem(orange);
headlightMenu.addItem(red);
headlightMenu.addItem(ponyPink);
headlightMenu.addItem(hotPink);
headlightMenu.addItem(purple);
headlightMenu.addItem(blackLight);

headlightMenu.itemSelect.on((item) => {
    if (item == white) {
        let id = 0;
        alt.emitServer("Server:Vehicle:HeadlightColor", id);
    }
    if (item == xenon) {
        let id = -1;
        alt.emitServer("Server:Vehicle:HeadlightColor", id);
    }
    if (item == blue) {
        let id = 1;
        alt.emitServer("Server:Vehicle:HeadlightColor", id);
    }
    if (item == electric) {
        let id = 2;
        alt.emitServer("Server:Vehicle:HeadlightColor", id);
    }
    if (item == green) {
        let id = 3;
        alt.emitServer("Server:Vehicle:HeadlightColor", id);
    }
    if (item == lightGreen) {
        let id = 4;
        alt.emitServer("Server:Vehicle:HeadlightColor", id);
    }
    if (item == yellow) {
        let id = 5;
        alt.emitServer("Server:Vehicle:HeadlightColor", id);
    }
    if (item == goldenShower) {
        let id = 6;
        alt.emitServer("Server:Vehicle:HeadlightColor", id);
    }
    if (item == orange) {
        let id = 7;
        alt.emitServer("Server:Vehicle:HeadlightColor", id);
    }
    if (item == red) {
        let id = 8;
        alt.emitServer("Server:Vehicle:HeadlightColor", id);
    }
    if (item == ponyPink) {
        let id = 9;
        alt.emitServer("Server:Vehicle:HeadlightColor", id);
    }
    if (item == hotPink) {
        let id = 10;
        alt.emitServer("Server:Vehicle:HeadlightColor", id);
    }
    if (item == purple) {
        let id = 11;
        alt.emitServer("Server:Vehicle:HeadlightColor", id);
    }
    if (item == blackLight) {
        let id = 12;
        alt.emitServer("Server:Vehicle:HeadlightColor", id);
    }
});
let neonMenu = new MenuFramework.Menu("Neon Color");
vehicleColorMenu.addSubmenu(neonMenu, neonLightColor);

let whiteNeon = new MenuFramework.MenuItem(data.lightColors[1].name, "Switch Neon Color to " + data.lightColors[1].name);
let blueNeon = new MenuFramework.MenuItem(data.lightColors[2].name, "Switch Neon Color to " + data.lightColors[2].name);
let electricNeon = new MenuFramework.MenuItem(data.lightColors[3].name, "Switch Neon Color to " + data.lightColors[3].name);
let greenNeon = new MenuFramework.MenuItem(data.lightColors[4].name, "Switch Neon Color to " + data.lightColors[4].name);
let lightGreenNeon = new MenuFramework.MenuItem(data.lightColors[5].name, "Switch Neon Color to " + data.lightColors[5].name);
let yellowNeon = new MenuFramework.MenuItem(data.lightColors[6].name, "Switch Neon Color to " + data.lightColors[6].name);
let goldenShowerNeon = new MenuFramework.MenuItem(data.lightColors[7].name, "Switch Neon Color to " + data.lightColors[7].name);
let orangeNeon = new MenuFramework.MenuItem(data.lightColors[8].name, "Switch Neon Color to " + data.lightColors[8].name);
let redNeon = new MenuFramework.MenuItem(data.lightColors[9].name, "Switch Neon Color to " + data.lightColors[9].name);
let ponyPinkNeon = new MenuFramework.MenuItem(data.lightColors[10].name, "Switch Neon Color to " + data.lightColors[10].name);
let hotPinkNeon = new MenuFramework.MenuItem(data.lightColors[11].name, "Switch Neon Color to " + data.lightColors[11].name);
let purpleNeon = new MenuFramework.MenuItem(data.lightColors[12].name, "Switch Neon Color to " + data.lightColors[12].name);
let blackLightNeon = new MenuFramework.MenuItem(data.lightColors[13].name, "Switch Neon Color to " + data.lightColors[13].name);
let off = new MenuFramework.MenuItem("Turn off your Vehicle Neons");
neonMenu.addItem(whiteNeon);
neonMenu.addItem(blueNeon);
neonMenu.addItem(electricNeon);
neonMenu.addItem(greenNeon);
neonMenu.addItem(lightGreenNeon);
neonMenu.addItem(yellowNeon);
neonMenu.addItem(goldenShowerNeon);
neonMenu.addItem(orangeNeon);
neonMenu.addItem(redNeon);
neonMenu.addItem(ponyPinkNeon);
neonMenu.addItem(hotPinkNeon);
neonMenu.addItem(purpleNeon);
neonMenu.addItem(blackLightNeon);
neonMenu.addItem(off);

neonMenu.itemSelect.on((item, id) => {
    if (item == whiteNeon) {
        var rgb = data.lightColors[1].rgb;
        alt.emitServer("Server:Vehicle:Neon", 1, id);
        alt.emitServer("Server:Vehicle:NeonColor", rgb);
    }
    if (item == blueNeon) {
        var rgb = data.lightColors[2].rgb;
        alt.emitServer("Server:Vehicle:Neon", 1, id);
        alt.emitServer("Server:Vehicle:NeonColor", rgb);
    }
    if (item == electricNeon) {
        var rgb = data.lightColors[3].rgb;
        alt.emitServer("Server:Vehicle:Neon", 1, id);
        alt.emitServer("Server:Vehicle:NeonColor", rgb);
    }
    if (item == greenNeon) {
        var rgb = data.lightColors[4].rgb;
        alt.emitServer("Server:Vehicle:Neon", 1, id);
        alt.emitServer("Server:Vehicle:NeonColor", rgb);
    }
    if (item == lightGreenNeon) {
        var rgb = data.lightColors[5].rgb;
        alt.emitServer("Server:Vehicle:Neon", 1, id);
        alt.emitServer("Server:Vehicle:NeonColor", rgb);
    }
    if (item == yellowNeon) {
        var rgb = data.lightColors[6].rgb;
        alt.emitServer("Server:Vehicle:Neon", 1, id);
        alt.emitServer("Server:Vehicle:NeonColor", rgb);
    }
    if (item == goldenShowerNeon) {
        var rgb = data.lightColors[7].rgb;
        alt.emitServer("Server:Vehicle:Neon", 1, id);
        alt.emitServer("Server:Vehicle:NeonColor", rgb);
    }
    if (item == orangeNeon) {
        var rgb = data.lightColors[8].rgb;
        alt.emitServer("Server:Vehicle:Neon", 1, id);
        alt.emitServer("Server:Vehicle:NeonColor", rgb);
    }
    if (item == redNeon) {
        var rgb = data.lightColors[9].rgb;
        alt.emitServer("Server:Vehicle:Neon", 1, id);
        alt.emitServer("Server:Vehicle:NeonColor", rgb);
    }
    if (item == ponyPinkNeon) {
        var rgb = data.lightColors[10].rgb;
        alt.emitServer("Server:Vehicle:Neon", 1, id);
        alt.emitServer("Server:Vehicle:NeonColor", rgb);
    }
    if (item == hotPinkNeon) {
        var rgb = data.lightColors[11].rgb;
        alt.emitServer("Server:Vehicle:Neon", 1, id);
        alt.emitServer("Server:Vehicle:NeonColor", rgb);
    }
    if (item == purpleNeon) {
        var rgb = data.lightColors[12].rgb;
        alt.emitServer("Server:Vehicle:Neon", 1, id);
        alt.emitServer("Server:Vehicle:NeonColor", rgb);
    }
    if (item == blackLightNeon) {
        var rgb = data.lightColors[13].rgb;
        alt.emitServer("Server:Vehicle:Neon", 1, id);
        alt.emitServer("Server:Vehicle:NeonColor", rgb);
    }
    if (item == off) {
        alt.emitServer("Server:Vehicle:Neon", 0, id);
    }
});

let windowMenu = new MenuFramework.Menu("Window Menu");
vehicleColorMenu.addSubmenu(windowMenu, windowColor);

let none = new MenuFramework.MenuItem(data.windowColors[0].name, "Switch Window Tint to " + data.windowColors[0].name);
let pBlack = new MenuFramework.MenuItem(data.windowColors[1].name, "Switch Window Tint to " + data.windowColors[1].name);
let dBlack = new MenuFramework.MenuItem(data.windowColors[2].name, "Switch Window Tint to " + data.windowColors[2].name);
let lBlack = new MenuFramework.MenuItem(data.windowColors[3].name, "Switch Window Tint to " + data.windowColors[3].name);

windowMenu.addItem(pBlack);
windowMenu.addItem(dBlack);
windowMenu.addItem(lBlack);
windowMenu.addItem(none);

windowMenu.itemSelect.on((item) => {
    if (item == none) {
        var id = data.windowColors[0].id;
        alt.emitServer("Server:Vehicle:Window", id);
    }
    if (item == pBlack) {
        var id = data.windowColors[1].id;
        alt.emitServer("Server:Vehicle:Window", id);
    }
    if (item == dBlack) {
        var id = data.windowColors[2].id;
        alt.emitServer("Server:Vehicle:Window", id);
    }
    if (item == lBlack) {
        var id = data.windowColors[3].id;
        alt.emitServer("Server:Vehicle:Window", id);
    }
});

//End Vehicle Color Menu//
//Start Vehicle EXTRA//
const vehicleExtraMenu = new MenuFramework.Menu("Vehicle Extras");
tuningMenu.addSubmenu(vehicleExtraMenu, vehicleExtra);

let extraOne = new MenuFramework.CheckboxItem("Extra 1", 0, "Change your Vehicle Extra On / Off");
let extraTwo = new MenuFramework.CheckboxItem("Extra 2", 0, "Change your Vehicle Extra On / Off");
let extraThree = new MenuFramework.CheckboxItem("Extra 3", 0, "Change your Vehicle Extra On / Off");
let extraFour = new MenuFramework.CheckboxItem("Extra 4", 0, "Change your Vehicle Extra On / Off");
let extraFive = new MenuFramework.CheckboxItem("Extra 5", 0, "Change your Vehicle Extra On / Off");
let extraSix = new MenuFramework.CheckboxItem("Extra 6", 0, "Change your Vehicle Extra On / Off");
let extraSeven = new MenuFramework.CheckboxItem("Extra 7", 0, "Change your Vehicle Extra On / Off");
let extraEight = new MenuFramework.CheckboxItem("Extra 8", 0, "Change your Vehicle Extra On / Off");
let extraNine = new MenuFramework.CheckboxItem("Extra 9", 0, "Change your Vehicle Extra On / Off");
let extraTen = new MenuFramework.CheckboxItem("Extra 10", 0, "Change your Vehicle Extra On / Off");
let extraEleven = new MenuFramework.CheckboxItem("Extra 11", 0, "Change your Vehicle Extra On / Off");
let extraTwelve = new MenuFramework.CheckboxItem("Extra 12", 0, "Change your Vehicle Extra On / Off");
let extraThirteen = new MenuFramework.CheckboxItem("Extra 13", 0, "Change your Vehicle Extra On / Off");
let extraFourteen = new MenuFramework.CheckboxItem("Extra 14", 0, "Change your Vehicle Extra On / Off");
vehicleExtraMenu.addItem(extraOne);
vehicleExtraMenu.addItem(extraTwo);
vehicleExtraMenu.addItem(extraThree);
vehicleExtraMenu.addItem(extraFour);
vehicleExtraMenu.addItem(extraFive);
vehicleExtraMenu.addItem(extraSix);
vehicleExtraMenu.addItem(extraSeven);
vehicleExtraMenu.addItem(extraEight);
vehicleExtraMenu.addItem(extraNine);
vehicleExtraMenu.addItem(extraTen);
vehicleExtraMenu.addItem(extraEleven);
vehicleExtraMenu.addItem(extraTwelve);
vehicleExtraMenu.addItem(extraThirteen);
vehicleExtraMenu.addItem(extraFourteen);

vehicleExtraMenu.checkboxChange.on((item, id) => {
    if (item === extraOne) {
        if (extraOne.checked) {
            game.setVehicleExtra(alt.Player.local.vehicle.scriptID, 1, false);
        } else {
            game.setVehicleExtra(alt.Player.local.vehicle.scriptID, 1, true);
        }
    }
    if (item === extraTwo) {
        if (extraTwo.checked) {
            game.setVehicleExtra(alt.Player.local.vehicle.scriptID, 2, false);
        } else {
            game.setVehicleExtra(alt.Player.local.vehicle.scriptID, 2, true);
        }
    }
    if (item === extraThree) {
        if (extraThree.checked) {
            game.setVehicleExtra(alt.Player.local.vehicle.scriptID, 3, false);
        } else {
            game.setVehicleExtra(alt.Player.local.vehicle.scriptID, 3, true);
        }
    }
    if (item === extraFour) {
        if (extraFour.checked) {
            game.setVehicleExtra(alt.Player.local.vehicle.scriptID, 4, false);
        } else {
            game.setVehicleExtra(alt.Player.local.vehicle.scriptID, 4, true);
        }
    }
    if (item === extraFive) {
        if (extraFive.checked) {
            game.setVehicleExtra(alt.Player.local.vehicle.scriptID, 5, false);
        } else {
            game.setVehicleExtra(alt.Player.local.vehicle.scriptID, 5, true);
        }
    }
    if (item === extraSix) {
        if (extraSix.checked) {
            game.setVehicleExtra(alt.Player.local.vehicle.scriptID, 6, false);
        } else {
            game.setVehicleExtra(alt.Player.local.vehicle.scriptID, 6, true);
        }
    }
    if (item === extraSeven) {
        if (extraSeven.checked) {
            game.setVehicleExtra(alt.Player.local.vehicle.scriptID, 7, false);
        } else {
            game.setVehicleExtra(alt.Player.local.vehicle.scriptID, 7, true);
        }
    }
    if (item === extraEight) {
        if (extraEight.checked) {
            game.setVehicleExtra(alt.Player.local.vehicle.scriptID, 8, false);
        } else {
            game.setVehicleExtra(alt.Player.local.vehicle.scriptID, 8, true);
        }
    }
    if (item === extraNine) {
        if (extraNine.checked) {
            game.setVehicleExtra(alt.Player.local.vehicle.scriptID, 9, false);
        } else {
            game.setVehicleExtra(alt.Player.local.vehicle.scriptID, 9, true);
        }
    }
    if (item === extraTen) {
        if (extraTen.checked) {
            game.setVehicleExtra(alt.Player.local.vehicle.scriptID, 10, false);
        } else {
            game.setVehicleExtra(alt.Player.local.vehicle.scriptID, 10, true);
        }
    }
    if (item === extraEleven) {
        if (extraEleven.checked) {
            game.setVehicleExtra(alt.Player.local.vehicle.scriptID, 11, false);
        } else {
            game.setVehicleExtra(alt.Player.local.vehicle.scriptID, 11, true);
        }
    }
    if (item === extraTwelve) {
        if (extraTwelve.checked) {
            game.setVehicleExtra(alt.Player.local.vehicle.scriptID, 12, false);
        } else {
            game.setVehicleExtra(alt.Player.local.vehicle.scriptID, 12, true);
        }
    }
    if (item === extraThirteen) {
        if (extraThirteen.checked) {
            game.setVehicleExtra(alt.Player.local.vehicle.scriptID, 13, false);
        } else {
            game.setVehicleExtra(alt.Player.local.vehicle.scriptID, 13, true);
        }
    }
    if (item === extraFourteen) {
        if (extraFourteen.checked) {
            game.setVehicleExtra(alt.Player.local.vehicle.scriptID, 14, false);
        } else {
            game.setVehicleExtra(alt.Player.local.vehicle.scriptID, 14, true);
        }
    }
});

//END Vehicle EXTRA//
//Start Weapon Options//
let weaponMenu = new MenuFramework.Menu("Weapon Menu");
menu.addSubmenu(weaponMenu, weapon);

let weaponInput = new MenuFramework.InputItem("Give Weapon", 30);
let placeHolder = new MenuFramework.MenuItem("placeHolder", "placeHolder For Weapon Test");
weaponMenu.addItem(weaponInput);
weaponMenu.addItem(placeHolder);

weaponMenu.inputSubmit.on((item, id) => {
    if (item === weaponInput) {
        alt.emitServer("Server:Player:Weapon", id);
    }
});

//End Weapon Options//
//Start World Options//
let worldMenu = new MenuFramework.Menu("World Menu");
menu.addSubmenu(worldMenu, world);

let worldTime = new MenuFramework.AutoListItem("Game Clock Hours", 0, 23, 0, "Change the Game Time: Hour");
let cloudHat = new MenuFramework.AutoListItem("Cloud Hat", 0, 20, 0, "Change the Cloud Hat Alpha");
worldMenu.addItem(worldTime);
worldMenu.addItem(cloudHat);

worldMenu.autoListChange.on((item, id) => {
    switch (item) {
        case worldTime:
            alt.emitServer("Server:World:Time", id);
            break;
        case cloudHat:
            game.setCloudsAlpha(id);
            break;
    }
    return menu;
});

let weatherOptions = new MenuFramework.MenuItem("Weather Options", "Change the Weather", "", false, undefined, "➔");
let weatherMenu = new MenuFramework.Menu("Weather Menu");
worldMenu.addSubmenu(weatherMenu, weatherOptions);

let extraSunny = new MenuFramework.MenuItem(data.weather[0].name, "Switch Weather to " + data.weather[0].name);
let clear = new MenuFramework.MenuItem(data.weather[1].name, "Switch Weather to " + data.weather[1].name);
let clouds = new MenuFramework.MenuItem(data.weather[2].name, "Switch Weather to " + data.weather[2].name);
let smog = new MenuFramework.MenuItem(data.weather[3].name, "Switch Weather to " + data.weather[3].name);
let foggy = new MenuFramework.MenuItem(data.weather[4].name, "Switch Weather to " + data.weather[4].name);
let overcast = new MenuFramework.MenuItem(data.weather[5].name, "Switch Weather to " + data.weather[5].name);
let rain = new MenuFramework.MenuItem(data.weather[6].name, "Switch Weather to " + data.weather[6].name);
let thunder = new MenuFramework.MenuItem(data.weather[7].name, "Switch Weather to " + data.weather[7].name);
let clearing = new MenuFramework.MenuItem(data.weather[8].name, "Switch Weather to " + data.weather[8].name);
let neutral = new MenuFramework.MenuItem(data.weather[9].name, "Switch Weather to " + data.weather[9].name);
let snow = new MenuFramework.MenuItem(data.weather[10].name, "Switch Weather to " + data.weather[10].name);
let blizzard = new MenuFramework.MenuItem(data.weather[11].name, "Switch Weather to " + data.weather[11].name);
let snowlight = new MenuFramework.MenuItem(data.weather[12].name, "Switch Weather to " + data.weather[12].name);
let christmas = new MenuFramework.MenuItem(data.weather[13].name, "Switch Weather to " + data.weather[13].name);
let halloween = new MenuFramework.MenuItem(data.weather[14].name, "Switch Weather to " + data.weather[14].name);
weatherMenu.addItem(extraSunny);
weatherMenu.addItem(clear);
weatherMenu.addItem(clouds);
weatherMenu.addItem(smog);
weatherMenu.addItem(foggy);
weatherMenu.addItem(overcast);
weatherMenu.addItem(rain);
weatherMenu.addItem(thunder);
weatherMenu.addItem(clearing);
weatherMenu.addItem(neutral);
weatherMenu.addItem(snow);
weatherMenu.addItem(blizzard);
weatherMenu.addItem(snowlight);
weatherMenu.addItem(christmas);
weatherMenu.addItem(halloween);

weatherMenu.itemSelect.on((item) => {
    if (item == extraSunny) {
        var id = data.weather[0].id;
        alt.emitServer("Server:World:Weather", id);
    }
    if (item == clear) {
        var id = data.weather[1].id;
        alt.emitServer("Server:World:Weather", id);
    }
    if (item == clouds) {
        var id = data.weather[2].id;
        alt.emitServer("Server:World:Weather", id);
    }
    if (item == smog) {
        var id = data.weather[3].id;
        alt.emitServer("Server:World:Weather", id);
    }
    if (item == foggy) {
        var id = data.weather[4].id;
        alt.emitServer("Server:World:Weather", id);
    }
    if (item == overcast) {
        var id = data.weather[5].id;
        alt.emitServer("Server:World:Weather", id);
    }
    if (item == rain) {
        var id = data.weather[6].id;
        alt.emitServer("Server:World:Weather", id);
    }
    if (item == thunder) {
        var id = data.weather[7].id;
        alt.emitServer("Server:World:Weather", id);
    }
    if (item == clearing) {
        var id = data.weather[8].id;
        alt.emitServer("Server:World:Weather", id);
    }
    if (item == neutral) {
        var id = data.weather[9].id;
        alt.emitServer("Server:World:Weather", id);
    }
    if (item == snow) {
        var id = data.weather[10].id;
        alt.emitServer("Server:World:Weather", id);
    }
    if (item == blizzard) {
        var id = data.weather[11].id;
        alt.emitServer("Server:World:Weather", id);
    }
    if (item == snowlight) {
        var id = data.weather[12].id;
        alt.emitServer("Server:World:Weather", id);
    }
    if (item == christmas) {
        var id = data.weather[13].id;
        alt.emitServer("Server:World:Weather", id);
    }
    if (item == halloween) {
        var id = data.weather[14].id;
        alt.emitServer("Server:World:Weather", id);
    }
});

//End World Options//
//Start Misc Options//
let miscMenu = new MenuFramework.Menu("Misc Menu");
menu.addSubmenu(miscMenu, misc);

//End Misc Options//
//__________________________________________________________________________________________________________________________________/
data.vehicleColors.forEach(createvehicleColor);

function createvehicleColor(item, index, arr) {
    primaryColorMenu.addItem(new MenuFramework.MenuItem(item.description, "Paint Vehicle " + item.description + ""));
    secondaryColorMenu.addItem(new MenuFramework.MenuItem(item.description, "Paint Vehicle " + item.description + ""));
    pearlColorMenu.addItem(new MenuFramework.MenuItem(item.description, "Paint Vehicle " + item.description + ""));
    interiorColorMenu.addItem(new MenuFramework.MenuItem(item.description, "Paint Vehicle " + item.description + ""));
    wheelColorMenu.addItem(new MenuFramework.MenuItem(item.description, "Paint Vehicle " + item.description + ""));
}
//__________________________________________________________________________________________________________________________________/
