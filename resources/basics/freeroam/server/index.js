import * as alt from "alt-server";

const spawns = [
  { x: 230.8351593017578, y: -856.1934204101562, z: 29.8359375 },
];


/// { x: 230.8351593017578, y: -856.1934204101562, z: 29.8359375 },
const spawnModels = ["mp_m_freemode_01"];

const weapons = [
  "dagger",
  "bat",
  "bottle",
  "crowbar",
  "flashlight",
  "golfclub",
  "hammer",
  "hatchet",
  "knuckle",
  "knife",
  "machete",
  "switchblade",
  "nightstick",
  "wrench",
  "battleaxe",
  "poolcue",
  "stone_hatchet",
  "pistol",
  "pistol_mk2",
  "combatpistol",
  "appistol",
  "stungun",
  "pistol50",
  "snspistol",
  "snspistol_mk2",
  "heavypistol",
  "vintagepistol",
  "flaregun",
  "marksmanpistol",
  "revolver",
  "revolver_mk2",
  "doubleaction",
  "raypistol",
  "microsmg",
  "smg",
  "smg_mk2",
  "assaultsmg",
  "combatpdw",
  "machinepistol",
  "minismg",
  "raycarbine",
  "pumpshotgun",
  "pumpshotgun_mk2",
  "sawnoffshotgun",
  "assaultshotgun",
  "bullpupshotgun",
  "musket",
  "heavyshotgun",
  "dbshotgun",
  "autoshotgun",
  "assaultrifle",
  "assaultrifle_mk2",
  "carbinerifle",
  "carbinerifle_mk2",
  "advancedrifle",
  "specialcarbine",
  "specialcarbine_mk2",
  "bullpuprifle",
  "bullpuprifle_mk2",
  "compactrifle",
  "mg",
  "combatmg",
  "combatmg_mk2",
  "gusenberg",
  "sniperrifle",
  "heavysniper",
  "heavysniper_mk2",
  "marksmanrifle",
  "marksmanrifle_mk2",
  "rpg",
  "grenadelauncher",
  "grenadelauncher_smoke",
  "minigun",
  "firework",
  "railgun",
  "hominglauncher",
  "compactlauncher",
  "rayminigun",
  "grenade",
  "bzgas",
  "smokegrenade",
  "flare",
  "molotov",
  "stickybomb",
  "proxmine",
  "snowball",
  "pipebomb",
  "ball",
];

function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomListEntry(list) {
  return randomNumber(0, list.length - 1);
}


alt.on("playerConnect", (player) => {
  if (player.name.includes("admin")) {
    player.kick();
    return;
  }
 
  player.model = spawnModels[getRandomListEntry(spawnModels)];
  player.setMeta("vehicles", []);
  const spawn = spawns[getRandomListEntry(spawns)];
  player.spawn(spawn.x, spawn.y, spawn.z, 0);
  alt.emitClient(player, "freeroam:spawned");
  alt.emitClient(player, "freeroam:Interiors");

  let connectTimeout = alt.setTimeout(() => {
    if (player && player.valid) {
      const playerCount = alt.Player.all.length;
    }
    alt.clearTimeout(connectTimeout);
  }, 1000);
});

alt.on("playerDeath", (player, killer, weapon) => {
  const spawn = spawns[randomNumber(0, spawns.length - 1)];
  alt.emitClient(player, "freeroam:switchInOutPlayer", false, 0, 2);
  let playerDeathTimeout = alt.setTimeout(() => {
    if (player && player.valid) {
      player.spawn(spawn.x, spawn.y, spawn.z, 0);
      alt.emitClient(player, "freeroam:switchInOutPlayer", true);
      player.clearBloodDamage();
    }
    alt.clearTimeout(playerDeathTimeout);
  }, 3000);
  if (killer) {
    alt.log(`${killer.name} gave ${player.name} the rest!`);
    SendNotificationToAllPlayer(`~r~<C>${killer.name}</C> ~s~killed ~b~<C>${player.name}</C>`);
  } else {
    alt.log(`${player.name} died!`);
    SendNotificationToAllPlayer(`~s~Suicide ~b~<C>${player.name}</C>`);
  }
});

function SendNotificationToPlayer(player, message, textColor = 0, bgColor = 2, blink = false) {
  alt.emitClient(player, "freeroam:sendNotification", textColor, bgColor, message, blink);
}

function SendNotificationToAllPlayer(message, textColor = 0, bgColor = 2, blink = false) {
  alt.emitAllClients("freeroam:sendNotification", textColor, bgColor, message, blink);
}

alt.on("playerDisconnect", (player, reason) => {
  const playerCount = alt.Player.all.length;
  player.getMeta("vehicles").forEach((vehicle) => {
    if (vehicle != null) {
      vehicle.destroy();
    }
  });
  player.setMeta("vehicles", undefined);
  alt.log(`${player.name} has leaved the server becauseof ${reason}`);
});

// ========================================================================================
