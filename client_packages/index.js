/* Kodas kurtas by Tadeh#0069
   Visos teisės saugomos! Bet koks bandymas naudoti kodą norint pasipelnyti yra draudžiamas! @ 2020
   Taip pat betkoks kodo viešinimas be mūsų sutikimo yra draudžiamas, net jei jį galite paprasčiausiai pamatyti savo kompiuteryje.
   Tačiau naudoti šį kodą mokslo tikslais, nėra draudžiama! */

// Nametagų sistema, daryta ne mano. KREDITAI HARTORITY RAGEMP FORUMO NARIUI
require('./nametagai.js')

// Custom chatas
mp.gui.execute("window.location = 'package://html/chat.html'");

// Mašinų parduotuvė
require('./mparduotuve.js')

// Mašinų valdymas
require('./mvaldymas.js')

// Degalinės sistema
require('./degaline.js')

// Vairavimo mokyklos sistema
require('./vairavimomokykla.js')

// Radijo sistema
var radijas = mp.browsers.new('package://html/radijas.html');
require('./radijas.js')

// Serverio versijos aprašymas apačioje dešinėje
var logo = mp.browsers.new('package://html/logo.html')
logo.execute(`gautiVersija("v0.1")`)

// Spidometras
var spidometras = mp.browsers.new('package://html/spidometras.html')

// Pranešimai
var pranesimai = mp.browsers.new('package://html/pranesimas.html')
mp.events.add('grp:pranesti', (tipas, zinute, laikas) => { pranesimai.execute(`pranesimas("${tipas}", "${zinute}", ${laikas})`) })

// Assetai
mp.game.vehicle.defaultEngineBehaviour = false;
mp.players.local.setConfigFlag(429, true);

// Anti-pelės užsibuginimas.
mp.events.add('render', () => {
    if(mp.game.ui.isPauseMenuActive()) {
        if(mp.gui.cursor.visible === true) {
            mp.gui.cursor.visible = false;
        }
    }
})

// Stočių sąrašas, jog galima būtų praloopinti sukuriame array.
var stotys = [
    {stotis: "RADIO_09_HIPHOP_OLD", pavadinimas: "Radijo Centras", nuoroda: "http://84.46.205.13/rc128.mp3"},
    {stotis: "RADIO_12_REGGAE", pavadinimas: "Zip FM", nuoroda: "http://84.46.205.13/zipfm128.mp3"},
    {stotis: "RADIO_13_JAZZ", pavadinimas: "Power Hit Radio", nuoroda: "http://power-stream.tv3.lt:8000/PHR.mp3"},
    {stotis: "RADIO_08_MEXICAN", pavadinimas: "M1", nuoroda: "http://radio.m-1.fm:80/m1/mp3"},
    {stotis: "RADIO_07_DANCE_01", pavadinimas: "M1 Plus", nuoroda: "http://radio.m-1.fm:80/m1plius/mp3"},
    {stotis: "RADIO_14_DANCE_02", pavadinimas: "European Hit Radio", nuoroda: "http://82.135.234.195:8000/ehr.mp3"}
];

// Patikrinam užkrautos mašinos būklę
mp.events.add("entityStreamIn", (entity) => {
    if(entity.type == 'vehicle') {
        if(entity.getVariable('bukle'))
            entity.setEngineHealth(entity.getVariable('bukle'))
        //entity.setDoorsLockedForAllPlayers(entity.getVariable('uzrakinta'))
    }
})

// Mašinų sugedimo [ištrinimo] sistema
setInterval(() => {
    mp.vehicles.forEachInStreamRange((masina) => {
        if(Math.floor(masina.getEngineHealth() / 10) <= 0 || !masina.isDriveable(false)) {
            if(mp.players.getClosest([masina.position.x, masina.position.y, masina.position.z]) == mp.players.local) {
                mp.events.callRemote("vehicleDeathHandler", `${masina.remoteId}`)
            }
        }
    })
}, 1000);

mp.events.add('render', () => {
    mp.vehicles.forEachInStreamRange((masina) => {
        if(masina.getNumberPlateText() != " FIVESA ") {
            if(JSON.parse(masina.getVariable('variklis')))
                masina.setEngineOn(JSON.parse(masina.getVariable('variklis')), true, true)
            if(JSON.parse(masina.getVariable('uzrakinta')))
                masina.setDoorsLockedForPlayer(mp.players.local.handle, JSON.parse(masina.getVariable('uzrakinta')))
        }
        //if(entity.getVariable('uzrakinta'))
            //mp.events.callRemote('grp:uzraktas', entity.remoteId, entity.getVariable('uzrakinta'))
    })
})

var dujoson = false;
var dirzas = false;
var salmas = false;
mp.events.add('render', () => {
    if(mp.players.local.vehicle) {
        if(mp.players.local.vehicle.getPedInSeat(-1) == mp.game.player.getPed()) {
            if(mp.players.local.vehicle.getNumberPlateText() != " FIVESA ") {
                if(mp.game.controls.isControlJustReleased(0, 314)) {
                    if(mp.players.local.vehicle.getVariable('variklis') == false) {
                        mp.game.ui.setNotificationTextEntry("STRING");
                        mp.game.ui.setNotificationFlashColor(18, 219, 58, 200)
                        mp.game.ui.addTextComponentSubstringPlayerName("~bold~Variklis buvo ~g~ijungtas!");
                        mp.game.ui.setNotificationMessage("CHAR_PEGASUS_DELIVERY", "CHAR_PEGASUS_DELIVERY", true, 4, "~bold~Automobilis", "Variklis");
                        mp.game.ui.drawNotification(true, false);
                    } else {
                        mp.game.ui.setNotificationTextEntry("STRING");
                        mp.game.ui.setNotificationFlashColor(219, 18, 18, 200)
                        mp.game.ui.addTextComponentSubstringPlayerName("~bold~Variklis buvo ~r~išjungtas!");
                        mp.game.ui.setNotificationMessage("CHAR_PEGASUS_DELIVERY", "CHAR_PEGASUS_DELIVERY", true, 4, "~bold~Automobilis", "Variklis");
                        mp.game.ui.drawNotification(true, false);
                    }
                    mp.events.callRemote('grp:variklis', mp.players.local.vehicle.remoteId, !mp.players.local.vehicle.getVariable('variklis'))
                } else if(mp.game.controls.isControlJustReleased(0, 47)) {
                    if(mp.players.local.vehicle.getVariable('dujos') != -1) {
                        if(dujoson == false) {
                            mp.game.ui.setNotificationTextEntry("STRING");
                            mp.game.ui.setNotificationFlashColor(36, 200, 209, 200)
                            mp.game.ui.addTextComponentSubstringPlayerName("~bold~Kuro režimas buvo pakeistas i ~b~dujas~s~!");
                            mp.game.ui.setNotificationMessage("CHAR_BLOCKED", "CHAR_BLOCKED", true, 4, "~bold~Automobilis", "Dujos");
                            mp.game.ui.drawNotification(true, false);
                            mp.players.local.vehicle.rpm = -0.4;
                            dujoson = true;
                        } else {
                            mp.game.ui.setNotificationTextEntry("STRING");
                            mp.game.ui.setNotificationFlashColor(36, 209, 45, 200)
                            mp.game.ui.addTextComponentSubstringPlayerName("~bold~Kuro režimas buvo pakeistas i ~g~benziną~s~!");
                            mp.game.ui.setNotificationMessage("CHAR_BLOCKED", "CHAR_BLOCKED", true, 4, "~bold~Automobilis", "Dujos");
                            mp.game.ui.drawNotification(true, false);
                            mp.players.local.vehicle.rpm = -0.4;
                            dujoson = false;
                        }
                    }
                } else if(mp.game.controls.isControlJustReleased(0, 315)) {
                    if(mp.players.local.vehicle.getVariable('uzrakinta') == true) {
                        mp.game.ui.setNotificationTextEntry("STRING");
                        mp.game.ui.setNotificationFlashColor(18, 219, 58, 200)
                        mp.game.ui.addTextComponentSubstringPlayerName("~bold~Automobilis buvo ~g~atrakintas!");
                        mp.game.ui.setNotificationMessage("CHAR_BARRY", "CHAR_BARRY", true, 4, "~bold~Automobilis", "Raktas");
                        mp.game.ui.drawNotification(true, false);
                    } else {
                        mp.game.ui.setNotificationTextEntry("STRING");
                        mp.game.ui.setNotificationFlashColor(219, 18, 18, 200)
                        mp.game.ui.addTextComponentSubstringPlayerName("~bold~Automobilis buvo ~r~užrakintas!");
                        mp.game.ui.setNotificationMessage("CHAR_BARRY", "CHAR_BARRY", true, 4, "~bold~Automobilis", "Raktas");
                        mp.game.ui.drawNotification(true, false);
                    }
                    mp.events.callRemote('grp:uzraktas', mp.players.local.vehicle.remoteId, !mp.players.local.vehicle.getVariable('uzrakinta'))
                } else if(mp.game.controls.isControlJustReleased(0, 29)) {
                    if(!mp.game.vehicle.isThisModelABike(mp.players.local.vehicle.model)) {
                        if(dirzas == false) {
                            mp.game.ui.setNotificationTextEntry("STRING");
                            mp.game.ui.setNotificationFlashColor(219, 18, 18, 200)
                            mp.game.ui.addTextComponentSubstringPlayerName("~bold~Diržas buvo ~g~užsegtas!");
                            mp.game.ui.setNotificationMessage("CHAR_CALL911", "CHAR_CALL911", true, 4, "~bold~Automobilis", "Diržas");
                            mp.game.ui.drawNotification(true, false);
                            dirzas = true;
                        } else {
                            mp.game.ui.setNotificationTextEntry("STRING");
                            mp.game.ui.setNotificationFlashColor(219, 18, 18, 200)
                            mp.game.ui.addTextComponentSubstringPlayerName("~bold~Diržas buvo ~r~atsegtas!");
                            mp.game.ui.setNotificationMessage("CHAR_CALL911", "CHAR_CALL911", true, 4, "~bold~Automobilis", "Diržas");
                            mp.game.ui.drawNotification(true, false);
                            dirzas = false;
                        }
                    } else {
                        if(salmas == false) {
                            mp.game.ui.setNotificationTextEntry("STRING");
                            mp.game.ui.setNotificationFlashColor(219, 18, 18, 200)
                            mp.game.ui.addTextComponentSubstringPlayerName("~bold~Šalmas buvo ~g~uždetas!");
                            mp.game.ui.setNotificationMessage("CHAR_CALL911", "CHAR_CALL911", true, 4, "~bold~Automobilis", "Šalmas");
                            mp.game.ui.drawNotification(true, false);
                            salmas = true;
                        } else {
                            mp.game.ui.setNotificationTextEntry("STRING");
                            mp.game.ui.setNotificationFlashColor(219, 18, 18, 200)
                            mp.game.ui.addTextComponentSubstringPlayerName("~bold~Šalmas buvo ~r~nuimtas!");
                            mp.game.ui.setNotificationMessage("CHAR_CALL911", "CHAR_CALL911", true, 4, "~bold~Automobilis", "Šalmas");
                            mp.game.ui.drawNotification(true, false);
                            mp.players.local.removeHelmet(true)
                            salmas = false;
                        }
                    }
                }
                if(salmas == false) {
                    mp.players.local.setConfigFlag(35, false);
                } else {
                    mp.players.local.setConfigFlag(35, true);
                    mp.players.local.giveHelmet(true, 4096, 1)
                }
            }
        }
    }
})

// Kuro bei dujų gavimas įlipus į automobilį
var kuras = 0;
var lastkuras = 0;
var dujos = 0;
var lastdujos = 0;
mp.events.add("playerEnterVehicle", (masina, sedyne) => {
    kuras = mp.players.local.vehicle.getVariable('kuras')
    lastkuras = mp.players.local.vehicle.getVariable('kuras')
    dujos = mp.players.local.vehicle.getVariable('dujos')
    lastdujos = mp.players.local.vehicle.getVariable('dujos')
    if(mp.players.local.vehicle.getVariable('dujoson')) {
        dujoson = mp.players.local.vehicle.getVariable('dujoson');
    }
    if(masina.getNumberPlateText() == " FIVESA ")
        mp.players.local.vehicle.setEngineOn(true, false, true)
})

// Kuro sąnaudos
setInterval(() => {
    if(mp.players.local.vehicle) {
        if(mp.players.local.vehicle.getPedInSeat(-1) == mp.game.player.getPed()) {
            if(dujoson == false) {
                if(kuras > 0.2) {
                    if(mp.players.local.vehicle.rpm <= 0) {
                        kuras = kuras - 0.01
                    } else {
                        kuras = kuras - (mp.players.local.vehicle.rpm * 10000 * 0.0000055).toFixed(2)
                    }
                }
            } else {
                if(dujos > 0.2) {
                    if(mp.players.local.vehicle.rpm <= 0) {
                        dujos = dujos - 0.01
                    } else {
                        dujos = dujos - (mp.players.local.vehicle.rpm * 10000 * 0.0000145).toFixed(2)
                    }
                }
            }
        }
    }
}, 1000);

setInterval(() => {
    if(mp.players.local.vehicle) {
        if(mp.players.local.vehicle.getPedInSeat(-1) == mp.game.player.getPed()) {
            // Kuras
            if(dujoson == false) {
                if(Math.floor(kuras) < Math.floor(lastkuras)) {
                    lastkuras = kuras
                    mp.events.callRemote("grp:nustatytikura", mp.players.local.vehicle, kuras)
                }
            // Dujos
            } else {
                if(Math.floor(dujos) < Math.floor(lastdujos)) {
                    lastdujos = dujos
                    mp.events.callRemote("grp:nustatytidujas", mp.players.local.vehicle, dujos)
                }
            }
        }
    }
}, 5000);

var atstumas = 0;
var rida = 0;
// Ridos kėlimas
setInterval(() => {
    if(mp.players.local.vehicle) {
        atstumas = atstumas + ((mp.players.local.vehicle.getSpeed() * 3.6) / 2600)
        if(atstumas > 1) {
            atstumas = 0;
            mp.events.callRemote("grp:nustatytirida", mp.players.local.vehicle)
            rida = 1 + mp.players.local.vehicle.getVariable('rida')
        }
    }
}, 1000);

// Išsiunčiam visą info į serverį
mp.events.add("playerLeaveVehicle", (masina, sedyne) => {
    // Išsaugom kurą, dujas bei syncinam ar įjungtas kuras/dujos ar ne.
    mp.events.callRemote("grp:nustatytikura", masina, kuras)
    mp.events.callRemote("grp:nustatytidujas", masina, dujos)
    mp.events.callRemote("grp:toggledujas", masina, dujoson)
    if(dirzas == true) {
        mp.game.ui.setNotificationTextEntry("STRING");
        mp.game.ui.setNotificationFlashColor(219, 18, 18, 200)
        mp.game.ui.addTextComponentSubstringPlayerName("~bold~Diržas buvo ~r~atsegtas!");
        mp.game.ui.setNotificationMessage("CHAR_CALL911", "CHAR_CALL911", true, 4, "~bold~Automobilis", "Diržas");
        mp.game.ui.drawNotification(true, false);
        dirzas = false;
    }
    if(salmas == true) {
        mp.game.ui.setNotificationTextEntry("STRING");
        mp.game.ui.setNotificationFlashColor(219, 18, 18, 200)
        mp.game.ui.addTextComponentSubstringPlayerName("~bold~Šalmas buvo ~r~nuimtas!");
        mp.game.ui.setNotificationMessage("CHAR_CALL911", "CHAR_CALL911", true, 4, "~bold~Automobilis", "Šalmas");
        mp.game.ui.drawNotification(true, false);
        mp.players.local.removeHelmet(true)
        salmas = false;
    }
})

// Waypointo nustatymas žemėlapyje
mp.events.add('grp:nustatytimap', (masina) => {
    mp.game.ui.setNewWaypoint(masina.position.x, masina.position.y);
})

// Spidometras
mp.events.add('render', () => {
    if(mp.players.local.getVehicleIsTryingToEnter()) {
        // Viską nustatom, kad jau kai žaidėjas sėdi automobilyje, nebūtų parašyta ,,NaN" arba ,,undefined" prie kuro, dujų arba ridos.
        kuras = mp.vehicles.atHandle(mp.players.local.getVehicleIsTryingToEnter()).getVariable('kuras');
        dujos = mp.vehicles.atHandle(mp.players.local.getVehicleIsTryingToEnter()).getVariable('dujos');
        rida = mp.vehicles.atHandle(mp.players.local.getVehicleIsTryingToEnter()).getVariable('rida');
        // Syncinam dujas
        if(mp.vehicles.atHandle(mp.players.local.getVehicleIsTryingToEnter()).getVariable('dujoson')) {
            dujoson = mp.vehicles.atHandle(mp.players.local.getVehicleIsTryingToEnter()).getVariable('dujoson')
        }
        dirzas = false;
        salmas = false;
    }
    // Custom patikrinimas ar žaidėjas bando įlipti į užrakintą mašiną
    if(mp.game.controls.isControlJustReleased(0, 23)) {
        let masina = mp.vehicles.getClosest([mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z])
        if(mp.players.local.vehicle != masina) {
            if(mp.game.system.vdist2(masina.position.x, masina.position.y, masina.position.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z) < 300) {
                // Serverio eventas, norint sužinoti kas savininkas automobilio.
                mp.events.callRemote("grp:uzrakintamasina", masina.remoteId)
            }
        }
    }
    if(mp.players.local.vehicle) {
        // Jei žaidėjas sprogsta kur nors toli nuo miesto, reikia iškarto mašiną respawninti.
        if(Math.floor(mp.players.local.vehicle.getEngineHealth() / 10) <= 0 || !mp.players.local.vehicle.isDriveable(false)) {
            mp.events.callRemote("vehicleDeathHandler", `${mp.players.local.vehicle.remoteId}`)
        }
        if(mp.players.local.vehicle.getPedInSeat(-1) == mp.game.player.getPed()) {
            // Greičio limitas
            var limitas = 120;
            if(mp.game.system.vdist2(-184.35, 6352.85, 30.885, mp.players.local.vehicle.position.x, mp.players.local.vehicle.position.y, mp.players.local.vehicle.position.z) < 250000)
                var limitas = 70;
            // Patikrinam ar variklis įjungtas
            rpmas = mp.players.local.vehicle.rpm * 10000;
            
            if(rpmas < 0) rpmas = 0;
            if (dujoson == false) {
                if (kuras <= 1.8) {
                    if (rpmas > Math.floor(Math.random() * 7000) + 4000) mp.players.local.vehicle.rpm = -0.4;
                }
                if (kuras <= 1) {
                    if (rpmas > Math.floor(Math.random() * 6000) + 3200) mp.players.local.vehicle.rpm = -0.4;
                }
                if (kuras <= 0.5) {
                    if (mp.players.local.vehicle.getIsEngineRunning() == 1) {
                        pranesimai.execute(`pranesimas("klaida", "Jums baigėsi benzinas! Kvieskite mechanikus arba nusipirkite kanistrą!", 3000)`)
                        mp.events.callRemote('grp:variklis', mp.players.local.vehicle.remoteId, false)
                    }
                }
            }
            if(dujoson == true) { if(dujos <= 0.5) { dujoson = false; pranesimai.execute(`pranesimas("klaida", "Jums baigėsi dujos, automatiškai pereita prie benzino!", 3000)`) } }

            if(mp.players.local.vehicle.getIsEngineRunning() == 0) {
                /*if((Math.floor(mp.players.local.vehicle.getEngineHealth()/10)<=0||!mp.players.local.vehicle.isDriveable(!1))&&mp.events.callRemote("vehicleDeathHandler",mp.players.local.vehicle),"OFF"==mp.game.audio.getRadioStationName(mp.game.invoke("0xE8AF77C4C06ADC93")))var stotis="Išjungtas";else{stotis="Kita";for(i=0;i<stotys.length;i++)if(mp.game.audio.getRadioStationName(mp.game.invoke("0xE8AF77C4C06ADC93"))==stotys[i].stotis)stotis=stotys[i].pavadinimas}*/
                rpmas = 0;
            }
            if(dujoson == false) spidometras.execute(`greitis("${Math.floor(mp.players.local.vehicle.getSpeed() * 3.6)}", "${limitas}", "${rpmas}", "${(rpmas * 0.0000055).toFixed(2)}L/s", "Kuro sąnaudos", "${mp.players.local.vehicle.getVariable("rida")}", "${Math.floor(mp.players.local.vehicle.getEngineHealth() / 10)}", "${Math.floor(kuras)}", "${mp.players.local.vehicle.getVariable('maxkuras')}", "${Math.floor(dujos)}")`)
            if(dujoson == true) spidometras.execute(`greitis("${Math.floor(mp.players.local.vehicle.getSpeed() * 3.6)}", "${limitas}", "${rpmas}", "${(rpmas * 0.0000145).toFixed(2)}%/s", "Dujų sąnaudos", "${mp.players.local.vehicle.getVariable("rida")}", "${Math.floor(mp.players.local.vehicle.getEngineHealth() / 10)}", "${Math.floor(kuras)}", "${mp.players.local.vehicle.getVariable('maxkuras')}", "${Math.floor(dujos)}")`)                   

        } else spidometras.execute(`nera()`)
    } else spidometras.execute(`nera()`);
});

// Laiko formatass
function laikoFormatas(data) {
    var valandos = data.getHours()
    var minutes = data.getMinutes()
    var sekundes = data.getSeconds()
    
    if(valandos < 10) { valandos = "0" + valandos }
    if(minutes < 10) { minutes = "0" + minutes }
    if(sekundes < 10) { sekundes = "0" + sekundes }
    
    return valandos + ":" + minutes;
  }

// Laikas, atnaujinam kas 1 sekundę, kad nelagintų.
setInterval(() => {
    if(typeof hud != 'undefined') {
        hud.execute(`naujintilaika("${laikoFormatas(new Date())}")`)
    }
}, 1000);

// Žaidėjo pinigų atnaujinimas hude
mp.events.add('grp:naujintipinigus', (pinigai, banke) => {
    // Atnaujiname pinigų rodymą hude
    hud.execute(`nustatytipinigus(${pinigai}, ${banke})`)
})

// Žaidėjo hud nustatymas
mp.events.add('grp:hud', (pinigai, banke) => {
    // Užkrauname dizainą
    hud = mp.browsers.new('package://html/hudas.html')
    hud.execute(`nustatytipinigus(${pinigai}, ${banke})`)
    // Baigta, tai taip paprasta kliento pusėje.
})

// Žaidėjo hud atnaujinimas
mp.events.add('grp:naujintihud', (pinigai, banke) => {
    // Atnaujinam pinigus
    hud.execute(`nustatytipinigus(${pinigai}, ${banke})`)
})

// Pradžia vos prisijungus žaidėjui
mp.events.add('grp:kamera', () => {
    // Kameros nustatymas
    var kamera = mp.cameras.new('default', new mp.Vector3(-544.61, 6163.52, 119.48), new mp.Vector3(0, 0, 0), 40)
    kamera.pointAtCoord(-227.74, 6224.46, 37.01);
    kamera.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
    // Žaidėjo atspawninimas, pavertimas nematomu bei užfreezinimas dėl renderinimo.
    mp.players.local.setCoords(-227.74, 6224.46, 37.01, false, false, false, false);
    mp.players.local.freezePosition(true);
    // Išjungiami bei įjungiami kiti dalykai.
    mp.game.ui.displayRadar(false);
    mp.game.ui.displayCash(true);
    mp.game.graphics.transitionToBlurred(0);
    mp.gui.cursor.visible = true;
    mp.gui.chat.safeMode = false;
})

// Slaptažodis netinka
mp.events.add('grp:netinka', () => {
    prisijungimas.execute(`netinka()`)
})

// Slaptažodžio nusiuntimas į serverio pusę, jog
mp.events.add('slaptazodis', (slaptazodis) => {
    // Slaptažodžio ilgio patikrinimas, self explanatory.
    if(slaptazodis.length > 4) {
        mp.events.callRemote('grp:slaptazodis', slaptazodis)
    } else {
        mp.gui.chat.push(`Jūsų slaptažodis per trumpas! Minimalus ilgis: !{#06c927}5 raidės!`)
        prisijungimas.execute(`netinka()`)
    }
})

// Mašinų užlockinimas iš naujo
mp.events.add('entityStreamIn', (entity) => {
    if(entity.type == 'vehicle') {
        // Užfreezinam bei padarom mašinas invincible iš parduotuvės.
        for(i = 0; i < masinos.length; i++) {
            if(mp.game.system.vdist2(entity.position.x, entity.position.y, entity.position.z, masinos[i].x, masinos[i].y, masinos[i].z) < 2) {
                entity.freezePosition(true);
                entity.setInvincible(true);
                entity.setCanBeVisiblyDamaged(false);
            }
        }
    }
})

// Slaptažodžiams sutapus, žaidėjas prijungiamas kliento pusėje.
mp.events.add('grp:prisijungta', (lokacija) => {
    // Išjungiame GUI
    prisijungimas.execute(`tinka()`);
    setTimeout(() => {
        prisijungimas.destroy();
    }, 1000);
    // Įjungiame viską atgal
    mp.game.ui.displayRadar(true);
    mp.game.graphics.transitionFromBlurred(1000);
    setTimeout(() => {
        mp.gui.chat.activate(true);
    }, 1100);
    mp.gui.cursor.visible = false;
    mp.events.callRemote('grp:baigtasgidas')
    // Nuteleportuojame žaidėją į jo praeitą vietą kur jis atsijungė
    var vieta = JSON.parse(lokacija);
    mp.players.local.setCoords(vieta.x, vieta.y, vieta.z, false, false, false, false);
    mp.players.local.setHeading(vieta.h)
    mp.players.local.freezePosition(false);
    mp.game.cam.renderScriptCams(false, true, 2000, true, false)
    //mp.players.local.setCoords(vieta.x, vieta.y, vieta.z, false, false, false, false)
    mp.gui.chat.safeMode = true;
})

// Dėl blogo nicko sunaikinam dėžę
mp.events.add('grp:sunaikintip', () => {
    // Įjungiame viską atgal
    mp.gui.chat.activate(true);
    mp.gui.cursor.visible = false;
})

// Sukurus vartotoją, paleidžiame intro.
mp.events.add('grp:prisiregistruota', () => {
    // Išjungiame GUI
    registracija.execute(`tinka()`);
    setTimeout(() => {
        registracija.destroy();
    }, 2000);

    // INTRO
    var kameros = [
        {vieta: new mp.Vector3(-22.85, 6524.34, 45), pointx: -57.79, pointy: 6539.4, pointz: 31.32, pavadinimas: `!{#e6b000}Mašinų parduotuvė`, aprasymas: `Visus serverio automobilius rasite šioje aikštelėje!`},
        {vieta: new mp.Vector3(363.37, 6455.53, 59.29), pointx: 441.49, pointy: 6493.92, pointz: 28.5, pavadinimas: `!{#0ac73c}Ūkininkų darbas`, aprasymas: `Tai pirmas serverio darbas, kuriam nereikia patirties!`},
        {vieta: new mp.Vector3(142.67, 6780.62, 32.75), pointx: 127.85, pointy: 6808.68, pointz: 20.08, pavadinimas: `!{#0ea9eb}Automobilių nuoma`, aprasymas: `Čia galite išsinuomoti automobilį!`},
        {vieta: new mp.Vector3(210.44, 6561.83, 46.73), pointx: 170.41, pointy: 6604.55, pointz: 31.47, pavadinimas: `!{#e6b000}Degalinė`, aprasymas: `Be abejo automobiliams reikia ir kuro! Čia galėsite jo įsipilti!`},
        {vieta: new mp.Vector3(-207.35, 6316.7, 43.86), pointx: -252.36, pointy: 6324.65, pointz: 30.97, pavadinimas: `!{#eb0e37}Ligoninė`, aprasymas: `Mirę būsite atiteleportuoti į šią vietą!`},
        {vieta: new mp.Vector3(-251.26, 6172.04, 41.93), pointx: -234.63, pointy: 6213.18, pointz: 31.3, pavadinimas: `!{#17bed4}KMA`, aprasymas: `Jei jūsų automobilis buvo sudaužytas, jį galite sutaisyti čia!`},
        {vieta: new mp.Vector3(3242.46, 5128.35, 39.66), pointx: 3301.05, pointy: 5171.57, pointz: 17.94, pavadinimas: `!{#e6b000}Dylerių bazė`, aprasymas: `Pas juos galėsite nusipirkti narkotikų.`},
        {vieta: new mp.Vector3(-410.5, 6058.88, 46.11), pointx: -454.43, pointy: 6013.27, pointz: 30.95, pavadinimas: `!{#06c927}Policijos departamentas`, aprasymas: `Čia galite parašyti pareiškimą ant žmogaus, taip pat šioje vietoje yra Policininkų bazė bei darbas.`},
        {vieta: new mp.Vector3(-306.99, 6086.57, 51.68), pointx: -292.27, pointy: 6121.76, pointz: 30.84, pavadinimas: `!{#e6b000}Vairavimo mokyklos aikštelė`, aprasymas: `Čia atliekamas praktinis vairavimas aikštelėje.`},
        {vieta: new mp.Vector3(-126.97, 6426.54, 43.15), pointx: -107.37, pointy: 6468.27, pointz: 30.88, pavadinimas: `!{#06c927}Bankas`, aprasymas: `Čia galite saugiai pasidėti savo pinigus!`},
        {vieta: new mp.Vector3(-210.55, 6519.15, 30.33), pointx: -216.02, pointy: 6611.68, pointz: 0.63, pavadinimas: `!{#e6b000}Žvėjybos taškas`, aprasymas: `Lengvas būdas užsidirbti pinigų, žvėjojant. Čia galima ir parduoti žuvis, ir žvėjoti.`},
        {vieta: new mp.Vector3(-294.14, 6236.7, 41.26), pointx: -301, pointy: 6268.26, pointz: 30.94, pavadinimas: `!{#d117d4}Naktinis klubas`, aprasymas: `Šioje vietoje galėsite išgerti, bei atsipalaiduoti!`},
    ]
    
    // Išjungiame blurą, paverčiam žaidėją nematomu bei paleidžiam dainą
    mp.game.graphics.transitionFromBlurred(1000);
    radijas.execute('paleisti("http://185.80.130.66/daina.mp3")')

    // Kadangi su for loopu buvo daug problemų, setTimeout nesuveikė nei atskiroje funkcijoje, nei pačiame loope.
    var kamera = mp.cameras.new('default', new mp.Vector3(-544.61, 6163.52, 119.48), new mp.Vector3(0, 0, 0), 40)
    kamera.pointAtCoord(-227.74, 6224.46, 37.01);
    kamera.setActive(true);

    var i = 0;
    var intervalas = setInterval(() => {
        if(i < kameros.length) {
            // Išvalom chatą kiek matomas
            for(i2 = 0; i2 < 10; i2++) {
                mp.gui.chat.push(`‏‏‎ ‎`)
            }
            // Aprašymas
            mp.gui.chat.push(kameros[i].pavadinimas)
            mp.gui.chat.push(kameros[i].aprasymas)
            // Kameros pakeitimas
            // Suprasit kodėl čia taip ir kaip kas, jeigu esat tikras koduotojas :)
            if(i > 0) {
                kamera = mp.cameras.new('default', kameros[i-1].vieta, new mp.Vector3(0, 0, 0), 40);
                kamera.pointAtCoord(kameros[i-1].pointx, kameros[i-1].pointy, kameros[i-1].pointz);
                kamera.setActive(true)
            }

            let kamera2 = mp.cameras.new('default', kameros[i].vieta, new mp.Vector3(0, 0, 0), 40);
            kamera2.pointAtCoord(kameros[i].pointx, kameros[i].pointy, kameros[i].pointz);
            kamera2.setActiveWithInterp(kamera.handle, 2000, 0, 0);
            // Atiteleportuojam žaidėją, kad renderintusi ta vieta.
            mp.players.local.setCoords(kameros[i].pointx, kameros[i].pointy, kameros[i].pointz, false, false, false, false)
            // Imituojam loopą.
            i++
        } else {
            // Pasibaigus gidui, išvalom šį intervalą, jog jis neveiktų backgrounde.
            clearInterval(intervalas)
            // Žinutė
            for(i2 = 0; i2 < 50; i2++) {
                mp.gui.chat.push(`‏‏‎ ‎`)
            }
            mp.gui.chat.push(`!{#e6b000}> !{#ffffff}Prisijunkite prie mūsų Discord grupės! !{#e6b000}https://discord.gg/3BwdzCD`)
            mp.gui.chat.push(`!{#e6b000}> !{#ffffff}Visas serverio vietas galite rasti atsidarę žemėlapį!`)
            mp.gui.chat.push(`!{#e6b000}> !{#ffffff}Norėdami sužinoti visas komandas, rašykite /komandos`)
            mp.gui.chat.push(`!{#06c927}Linkime jums gero žaidimo!`)
            // Įjungiame viską atgal
            mp.gui.chat.activate(true);
            mp.game.ui.displayRadar(true);
            mp.game.graphics.transitionFromBlurred(0);
            mp.gui.cursor.visible = false;
            // Nuteleportuojame žaidėją į spawną
            mp.players.local.setCoords(118.7213, 6834.684, 16.4433, false, false, false, false)
            mp.players.local.freezePosition(false);
            // Perkeliam žaidėją į pagrindinę dimensiją
            mp.events.callRemote('grp:baigtasgidas')
            // Išjungiam kameras.
            mp.game.cam.renderScriptCams(false, true, 2000, true, false)
            mp.gui.chat.safeMode = true;
        }
    }, 10000);
})

// Prisijungimo meniu, visi slaptažodžiai yra užšifruojami prieš saugant į databazę ŽAIDĖJŲ SAUGUMUI!
mp.events.add('grp:prisijungimas', () => {
    // Prisijungimo meniu
    prisijungimas = mp.browsers.new('package://html/prisijungimas.html')
    prisijungimas.execute('tipas("loginas")')
})

// Registracijos meniu, visi slaptažodžiai yra užšifruojami prieš saugant į databazę ŽAIDĖJŲ SAUGUMUI!
mp.events.add('grp:registracija', () => {
    // Registracijos meniu
    registracija = mp.browsers.new('package://html/prisijungimas.html')
    registracija.execute('tipas("registracija")')
})

// Serverio išjungimo GUI
mp.events.add('grp:isjungimas', (liko) => {
    // Išjungiami kiti dalykai
    if(liko == 3) {
        mp.gui.chat.safeMode = false;
    }
    if(typeof laikas == 'undefined') {
        laikas = mp.browsers.new('package://html/isjungimas.html')
        laikas.execute(`laikas('${liko}')`)
    }
    laikas.execute(`laikas('${liko}')`)
})