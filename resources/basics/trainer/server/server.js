import * as alt from 'alt-server';


console.log('==> V-Change Trainer V0.1 Geladen <==');

//VEHICLE//
alt.onClient('Server:Vehicle:getMods', (player) => {
    let vehicle = player.vehicle

    let getModsCount = {}
    let getCurrentMods = {}

    //Bodykit//
    getModsCount.spoiler=         vehicle.getModsCount(0);
    getCurrentMods.spoiler=       vehicle.getMod(0);
    getModsCount.fbumper=         vehicle.getModsCount(1);
    getCurrentMods.spoiler=       vehicle.getMod(1);
    getModsCount.rbumper=         vehicle.getModsCount(2);
    getCurrentMods.rbumper=       vehicle.getMod(2);
    getModsCount.sskirt=          vehicle.getModsCount(3);
    getCurrentMods.sskirt=        vehicle.getMod(3);
    getModsCount.exhaust=         vehicle.getModsCount(4);
    getCurrentMods.exhaust=       vehicle.getMod(4);
    getModsCount.frame=           vehicle.getModsCount(5);
    getCurrentMods.frame=         vehicle.getMod(5);
    getModsCount.grille=          vehicle.getModsCount(6);
    getCurrentMods.grille=        vehicle.getMod(6);
    getModsCount.hood=            vehicle.getModsCount(7);
    getCurrentMods.hood=          vehicle.getMod(7);
    getModsCount.lwing=           vehicle.getModsCount(8);
    getCurrentMods.lwing=         vehicle.getMod(8);
    getModsCount.rwing=           vehicle.getModsCount(9);
    getCurrentMods.rwing=         vehicle.getMod(9);
    getModsCount.roof=            vehicle.getModsCount(10);
    getCurrentMods.roof=          vehicle.getMod(10);
    getModsCount.horns=           vehicle.getModsCount(14);
    getCurrentMods.horns=         vehicle.getMod(14);
    //Bodykit//
    //Performance//
    getModsCount.engine=          vehicle.getModsCount(11);
    getCurrentMods.engine=        vehicle.getMod(11);
    getModsCount.brakes=          vehicle.getModsCount(12);
    getCurrentMods.brakes=        vehicle.getMod(12);
    getModsCount.trans=           vehicle.getModsCount(13);
    getCurrentMods.trans=         vehicle.getMod(13);
    getModsCount.suspension=      vehicle.getModsCount(15);
    getCurrentMods.suspension=    vehicle.getMod(15);
    getModsCount.turbo=           vehicle.getModsCount(18);
    getCurrentMods.turbo=         vehicle.getMod(18);
    //Performance//
    //Wheels//
    getModsCount.fwheels=         vehicle.getModsCount(23);
    getCurrentMods.fwheels=       vehicle.getMod(23);
    getModsCount.bwheels=         vehicle.getModsCount(24);
    getCurrentMods.bwheels=       vehicle.getMod(24);
    //Wheels//
    //Bennys//
    getModsCount.plateh=          vehicle.getModsCount(25);
    getCurrentMods.plateh=        vehicle.getMod(25);
    getModsCount.platev=          vehicle.getModsCount(26);
    getCurrentMods.platev=        vehicle.getMod(26);
    getModsCount.trimdesign=      vehicle.getModsCount(27);
    getCurrentMods.trimdesign=    vehicle.getMod(27);
    getModsCount.ornaments=       vehicle.getModsCount(28);
    getCurrentMods.ornaments=     vehicle.getMod(28);
    getModsCount.dash=            vehicle.getModsCount(29);
    getCurrentMods.dash=          vehicle.getMod(29);
    getModsCount.dial=            vehicle.getModsCount(30);
    getCurrentMods.dial=          vehicle.getMod(30);
    getModsCount.doorint=         vehicle.getModsCount(31);
    getCurrentMods.doorint=       vehicle.getMod(31);
    getModsCount.seats=           vehicle.getModsCount(32);
    getCurrentMods.seats=         vehicle.getMod(32);
    getModsCount.steeringw=       vehicle.getModsCount(33);
    getCurrentMods.steeringw=     vehicle.getMod(33);
    getModsCount.shiftlever=      vehicle.getModsCount(34);
    getCurrentMods.shiftlever=    vehicle.getMod(34);
    getModsCount.plaques=         vehicle.getModsCount(35);
    getCurrentMods.plaques=       vehicle.getMod(35);
    getModsCount.speakers=        vehicle.getModsCount(36);
    getCurrentMods.speakers=      vehicle.getMod(36);
    getModsCount.trunk=           vehicle.getModsCount(37);
    getCurrentMods.trunk=         vehicle.getMod(37);
    getModsCount.hydraulics=      vehicle.getModsCount(38);
    getCurrentMods.hydraulics=    vehicle.getMod(38);
    getModsCount.engineb=         vehicle.getModsCount(39);
    getCurrentMods.engineb=       vehicle.getMod(39);
    getModsCount.airfilter=       vehicle.getModsCount(40);
    getCurrentMods.airfilter=     vehicle.getMod(40);
    getModsCount.strutbar=        vehicle.getModsCount(41);
    getCurrentMods.strutbar=      vehicle.getMod(41);
    getModsCount.archcover=       vehicle.getModsCount(42);
    getCurrentMods.archcover=     vehicle.getMod(42);
    getModsCount.aerials=         vehicle.getModsCount(43);
    getCurrentMods.aerials=       vehicle.getMod(43);
    getModsCount.exteriorp=       vehicle.getModsCount(44);
    getCurrentMods.exteriorp=     vehicle.getMod(44);
    getModsCount.tank=            vehicle.getModsCount(45);
    getCurrentMods.tank=          vehicle.getMod(45);
    getModsCount.wroh=            vehicle.getModsCount(47);
    getCurrentMods.wroh=          vehicle.getMod(47);
    getModsCount.stickers=        vehicle.getModsCount(48);
    getCurrentMods.stickers=      vehicle.getMod(48);
    getModsCount.plate=           vehicle.getModsCount(53);
    getCurrentMods.plate=         vehicle.getMod(53);
    //Bennys//

    alt.emitClient(player, 'Server:Vehicle:sendMods', getModsCount, getCurrentMods);
});
alt.onClient('Server:Vehicle:Mods', (player, id, value) => {
    try {
        let vehicle = player.vehicle ? player.vehicle : null;
        vehicle.setMod(id, value);
    } catch (ex) {
        console.log(ex);
        //Todo: Add Error Notify
    }
});
alt.onClient('Server:Vehicle:Plate', (player, id) => {
    let vehicle = player.vehicle ? player.vehicle : null;
    vehicle.numberPlateIndex = id;
});
alt.onClient('Server:Vehicle:PrimaryColor', (player, id) => {
    let vehicle = player.vehicle ? player.vehicle : null;
    vehicle.primaryColor = id;
});
alt.onClient('Server:Vehicle:SecondaryColor', (player, id) => {
    let vehicle = player.vehicle ? player.vehicle : null;
    vehicle.secondaryColor = id;
});
alt.onClient('Server:Vehicle:PearlColor', (player, id) => {
    let vehicle = player.vehicle ? player.vehicle : null;
    vehicle.pearlColor = id;
});
alt.onClient('Server:Vehicle:interiorColor', (player, id) => {
    let vehicle = player.vehicle ? player.vehicle : null;
    vehicle.interiorColor = id;
    vehicle.dashboardColor = id;
});
alt.onClient('Server:Vehicle:WheelColor', (player, id) => {
    let vehicle = player.vehicle ? player.vehicle : null;
    vehicle.wheelColor = id;
});
alt.onClient('Server:Vehicle:HeadlightColor', (player, id) => {
    let vehicle = player.vehicle ? player.vehicle : null;
    vehicle.setMod(22, id);
    vehicle.headlightColor = id;
});
alt.onClient("Server:Vehicle:Window", (player, id) => {
    let vehicle = player.vehicle ? player.vehicle : null;
    vehicle.windowTint = id;
});
alt.onClient('Server:Vehicle:NeonColor', (player, id) => {
    let vehicle = player.vehicle ? player.vehicle : null;
    vehicle.neonColor = {r: id.r, g: id.g, b: id.b};
});
alt.onClient('Server:Vehicle:Repair', (player) => {
    if (player.vehicle) {
        player.vehicle.repair();
    }
});
alt.onClient('Server:Vehicle:Neon', (player, id) => {
    let vehicle = player.vehicle ? player.vehicle : null;
    switch (id) {
        case 0:
            vehicle.neon = {left: false, right: false, front: false, back: false}
            break;
        case 1:
            vehicle.neon = {left: true, right: true, front: true, back: true}
            break;
    }
});
alt.onClient('Server:Vehicle:Wheels', (player, id, value) => {
    let vehicle = player.vehicle ? player.vehicle : null;
    if (player.vehicle) {
        vehicle.modKit = 1;
        vehicle.setWheels(id, value);
    }
});
alt.onClient('Server:Vehicle:Spawn', (player, id) => {
    if (player.vehicle) {
        player.vehicle.destroy();
    }
    try {
        let vehicle = new alt.Vehicle(id, player.pos.x, player.pos.y, player.pos.z, player.rot.x, player.rot.y, player.rot.z);
        vehicle.modKit = 1;
        vehicle.engineOn = true;
        vehicle.numberPlateText = 'V-Change';
        player.setIntoVehicle(vehicle, 1);
    }
    catch (error) {
        alt.logError(error);
        return undefined;
    }
});
//VEHICLE//
//WORLD//
alt.onClient('Server:World:Weather', (player, id) => {
    if (player) {
        alt.Player.all.forEach(player => player.setWeather(id));
    }
});
alt.onClient('Server:World:Time', (player, id) => {
    if (player) {
        alt.Player.all.forEach(player => player.setDateTime(0, 0, 0, id, 0, 0));
    }
});
//WORLD//
//PLAYER//
alt.onClient('Server:Player:Heal', (player) => {
    if (player) {
        player.health = player.maxHealth;
        player.armour = player.maxArmour;
    }
});
alt.onClient('Server:Player:Model', (player, id) => {
    if (player) {
        player.model = id;
    }
});
alt.onClient('Server:Player:Weapon', (player, id) => {
    if (player) {
        player.giveWeapon(id, 250, false);
    }
});
//PLAYER//
//_________________________________________________________________________________________________________________________________//
