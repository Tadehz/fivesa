// Custom teksto rodymas pasaulyje.
function Draw3DText(x, y, z, tekstas) {
    let ekrane = mp.game.graphics.world3dToScreen2d(new mp.Vector3(x, y, z))
    let p = mp.cameras.new("gameplay").getCoord();
    let atstumas = mp.game.gameplay.getDistanceBetweenCoords(p.x, p.y, p.z, x, y, z, true)
    let dydis = (1 / atstumas) * 2
    let fov = (1 / mp.cameras.new("gameplay").getFov()) * 100
    let pcoords = mp.players.local.position;
    let distance = mp.game.gameplay.getDistanceBetweenCoords(x, y, z, pcoords.x, pcoords.y, pcoords.z, true)/20
    if(ekrane) {
        if(distance > 0.145) {
            mp.game.graphics.drawText(tekstas, [ekrane.x, ekrane.y], {
                font: 0,
                scale: [0.0, 0.05/distance],
                color: [255, 255, 255, 255],
                outline: true,
                centre: true
            });
        } else {
            mp.game.graphics.drawText(tekstas, [ekrane.x, ekrane.y], {
                font: 0,
                scale: [0.0, 0.35],
                color: [255, 255, 255, 255],
                outline: true,
                centre: true
            });
        }
    }
}

// Teorijos klausimai
var klausimai = [
    {klausimas: "Kuria kelio puse lietuvoje reikia važiuoti?", a: "Kaire", b: "Dešine", teisingas: "b"},
    {klausimas: "Ką įsėdus į automobilį pirmiausia reikia padaryti?", a: "Įjungti variklį", b: "Užsisegti diržą", teisingas: "b"},
    {klausimas: "Ar tamsiu paros metu reikia įsijungti šviesas?", a: "Taip", b: "Ne", teisingas: "a"},
    {klausimas: "Ar reikia praleisti peščiuosius perėjoje?", a: "Ne", b: "Taip", teisingas: "b"},
    {klausimas: "Ar reikia praleisti peščiuosius paprastame kelyje?", a: "Taip", b: "Ne", teisingas: "b"},
    {klausimas: "Ar reikia praleisti SPEC. tarnybas su šviturėliais?", a: "Taip", b: "Ne", teisingas: "a"},
    {klausimas: "Ar galima važiuoti į dešinę jei dega raudona?", a: "Visais atvejais ne", b: "Tik tuo atveju jei yra žalia rodyklė", teisingas: "b"},
    {klausimas: "Kas turi pirmumo teisę kelyje?", a: "Važiuojantis pagrindiniu keliu", b: "Važiuojantis šalutiniu keliu", teisingas: "a"},
    {klausimas: "Koks maksimalus leistinas greitis mūsų miesteliuose?", a: "90km/h", b: "70km/h", teisingas: "b"},
    {klausimas: "Koks maksimalus leistinas greitis užmiestyje?", a: "+90km/h", b: "+120km/h", teisingas: "a"},
    {klausimas: "Jei jūsų tr. priemonė buvo pavogta ką darote?", a: "Skambinu policijai", b: "Pranešu administracijai", teisingas: "a"},
    {klausimas: "Jei jūsų tr. priemonė sugedo, ką darote?", a: "Paprašau admino sutvarkyti", b: "Kviečiu mechanikus", teisingas: "b"},
    {klausimas: "Ar reikia apsidrausti nuosavą tr. priemonę?", a: "Taip", b: "Ne", teisingas: "a"},
    {klausimas: "Ar reikia apsidrausti darbinę tr. priemonę?", a: "Taip", b: "Ne", teisingas: "b"},
    {klausimas: "Ar reikia sustoti stabdant SPEC. tarnybos nenusižengus?", a: "Taip", b: "Ne", teisingas: "a"},
    {klausimas: "Ar reikia praleisti SPEC. tarnybas be šviturėlių?", a: "Taip", b: "Ne", teisingas: "b"},
    {klausimas: "Ar įvykus avarijai reikia padėti nukentėjusiems?", a: "Taip", b: "Ne", teisingas: "a"},
    {klausimas: "Nutrenkėte žmogų, ką darote?", a: "Pervažiuoju dar kelis kartus ir sutraiškau galutinai", b: "Sprendžiamės draugiškai/esant reikalui kviečiame policiją", teisingas: "b"},
    {klausimas: "Ar palikta tr. priemonė vidury kelio gali būti nutempta mechanikų?", a: "Taip", b: "Ne", teisingas: "a"},
    {klausimas: "Mama pakvietė eiti valgyti važiuojant su tr. priemone, ką darote?", a: "Nueinu/nuvažiuoju į saugią vietą ir einu AFK", b: "Bet kur vidury kelio palieku automobilį ir einu AFK", teisingas: "a"},
    {klausimas: "Ar SPEC. tarnybos gali viršyti greitį?", a: "Taip", b: "Ne", teisingas: "b"},
    {klausimas: "Ar SPEC. tarnybos gali viršyti greitį su šviturėliais?", a: "Taip", b: "Ne", teisingas: "a"},
    {klausimas: "Važiuojant SPEC. tarnyboms su įjungtais šviturėliais jūs?", a: "Sustosite į kelkraštį", b: "Padidinsite greitį", teisingas: "a"},
    {klausimas: "Ar galima važiuoti degant geltonam šviesoforo signalui?", a: "Taip", b: "Ne", teisingas: "a"},
    {klausimas: "Ar galima statyti automobilius ant šaligatvio?", a: "Taip", b: "Ne", teisingas: "b"},
    {klausimas: "Nuo kokio amžiaus galima vairuoti?", a: "16", b: "18", teisingas: "b"},
    {klausimas: "Ar turint automobilio teises galima vairuoti motociklą?", a: "Taip", b: "Ne", teisingas: "b"},
    {klausimas: "Ar galima statyti automobilius ant ištisinės juostos?", a: "Taip", b: "Ne", teisingas: "b"},
    {klausimas: "Pamatote žmogų vidury kelio, ką darote?", a: "Apvažiuoju kelkraščiu/esant būtinybei kita kelio puse", b: "Nutrenkiu ir važiuoju toliau", teisingas: "a"},
    {klausimas: "Ar galima parkuotis ant geležinkelio bėgių?", a: "Taip", b: "Ne", teisingas: "b"}
]

mp.events.add('render', () => {
    // Teorijos pirkimas
    mp.game.graphics.drawMarker(29, -150.7594, 6302.931, 31.20575, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.85, 0.85, 0.85, 0, 255, 0, 100, false, true, 2, true, "", "", false);
    if(mp.game.controls.isControlJustReleased(0, 38)) {
        if(mp.game.gameplay.getDistanceBetweenCoords(-150.7594, 6302.931, 31.20575, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, true) < 1.5) {
            mp.events.callRemote('grp:pirktiteorija')
        }
    }
    if(mp.game.system.vdist2(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, -150.7594, 6302.931, 31.20575) < 500) {
        Draw3DText(-150.7594, 6302.931, 31.20575+0.49, "~g~REGITRA")
        Draw3DText(-150.7594, 6302.931, 31.20575+0.4, "Spauskite ~g~E ~w~norint sumoketi už egzaminą")
    }
    // Teorijos laikymas
    mp.game.graphics.drawMarker(20, -142.2518, 6297.668, 35.09871, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.85, 0.85, 0.85, 0, 255, 0, 100, false, true, 2, true, "", "", false);
    if(mp.game.controls.isControlJustReleased(0, 38)) {
        if(mp.game.gameplay.getDistanceBetweenCoords(-142.2518, 6297.668, 35.09871, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, true) < 1.5) {
            mp.events.callRemote("grp:laikytiteorija")
        }
    }
    if(mp.game.system.vdist2(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, -142.2518, 6297.668, 35.09871) < 500) {
        Draw3DText(-142.2518, 6297.668, 35.09871+0.49, "~g~REGITRA")
        Draw3DText(-142.2518, 6297.668, 35.09871+0.4, "Spauskite ~g~E ~w~norint laikyti teorijos egzaminą")
    }
    // Praktinis vairavimas
    mp.game.graphics.drawMarker(36, -136.8072, 6292.253, 35.09929, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.85, 0.85, 0.85, 0, 255, 0, 100, false, true, 2, true, "", "", false);
    if(mp.game.controls.isControlJustReleased(0, 38)) {
        if(mp.game.gameplay.getDistanceBetweenCoords(-136.8072, 6292.253, 35.09929, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, true) < 1.5) {
            mp.events.callRemote("grp:laikytipraktini")
        }
    }
    if(mp.game.system.vdist2(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, -136.8072, 6292.253, 35.09929) < 500) {
        Draw3DText(-136.8072, 6292.253, 35.09929+0.49, "~g~REGITRA")
        Draw3DText(-136.8072, 6292.253, 35.09929+0.4, "Spauskite ~g~E ~w~norint laikyti praktini vairavimą")
    }
});

mp.events.add('grp:teorijospirkimas', () => {
    teorijospirkimomenu = mp.browsers.new('package://html/sutikimas.html')
    teorijospirkimomenu.execute(`patvirtinimas("Regitra", 'Ar tikrai norite sumokėti <span style="color:#0fd125">5,000€</span> už teorijos egzaminą?', "grp:teorijospirkimasdu")`)

    mp.gui.cursor.visible = true;
    mp.gui.chat.activate(false);
})

mp.events.add('grp:teorijospirkimasdu', (atsakymas) => {
    if(atsakymas != "close") {
        mp.events.callRemote("grp:smpirktiteorija")
        teorijospirkimomenu.destroy();
        mp.gui.cursor.visible = false;
        mp.gui.chat.activate(true);
    } else {
        teorijospirkimomenu.destroy();
        mp.gui.cursor.visible = false;
        mp.gui.chat.activate(true);
    }
})

mp.events.add('grp:teorijoslaikymas', () => {
    teorijoslaikymomenu = mp.browsers.new('package://html/sutikimas.html')
    teorijoslaikymomenu.execute(`patvirtinimas("Regitra", "Ar tikrai norite laikyti teorijos egzaminą?<br>Norint išlaikyti, reikia atsakyti teisingai <span style='color:#10cc10'>25</span> klausimus!", "grp:teorijoslaikymasdu")`)

    mp.gui.cursor.visible = true;
    mp.gui.chat.activate(false);
})

mp.events.add('grp:teorijoslaikymasdu', (atsakymas) => {
    if(atsakymas != "close") {
        nr = 0;
        teisingi = 0;

        teorijoslaikymomenudu = mp.browsers.new('package://html/teorija.html')
        teorijoslaikymomenudu.execute(`klausimas(${nr+1}, "${klausimai[nr].klausimas}", "${klausimai[nr].a}", "${klausimai[nr].b}")`)

        teorijoslaikymomenu.destroy();
    } else {
        teorijoslaikymomenu.destroy();
        mp.gui.cursor.visible = false;
        mp.gui.chat.activate(true);
    }
})

mp.events.add('grp:vmatsakymas', (atsakymas) => {
    if(nr < 29) {
        if(atsakymas == klausimai[nr].teisingas)
            teisingi = teisingi + 1
        nr = nr + 1
        teorijoslaikymomenudu.execute(`klausimas(${nr+1}, "${klausimai[nr].klausimas}", "${klausimai[nr].a}", "${klausimai[nr].b}")`)
    } else {
        if(atsakymas == klausimai[nr].teisingas)
            teisingi = teisingi + 1
        if(teisingi > 24) {
            teorijaislaikyta = mp.browsers.new('package://html/baigta.html')
            teorijaislaikyta.execute(`baigta("Sveikiname!", "Išlaikėte teorijos testą!<br>Atsakėte <span style='color:#10cc10'>${teisingi}/30</span> klausimų teisingai!", "grp:baigtiteorija")`)
            teorijoslaikymomenudu.destroy();

            mp.events.callRemote('grp:duotikategorija', "teorija")
        } else {
            teorijaislaikyta = mp.browsers.new('package://html/baigta.html')
            teorijaislaikyta.execute(`baigta("Deja!", "Neišlaikėte teorijos testo!<br>Atsakėte <span style='color:#cf0c0c'>${teisingi}/30</span> klausimų teisingai!", "grp:baigtiteorija")`)
            teorijoslaikymomenudu.destroy();

            mp.events.callRemote('grp:nuimtikategorija', "pirktateorija")
        }
    }
})

mp.events.add("grp:baigtiteorija", () => {
    teorijaislaikyta.destroy();
    mp.gui.cursor.visible = false;
    mp.gui.chat.activate(true);
})

mp.events.add('grp:praktiniolaikymas', () => {
    praktiniolaikymomenu = mp.browsers.new('package://html/sutikimas.html')
    praktiniolaikymomenu.execute(`patvirtinimas("Regitra", "Ar tikrai norite atlikti praktinį vairavimą aikštutėje?", "grp:praktiniolaikymasdu")`)

    mp.gui.cursor.visible = true;
    mp.gui.chat.activate(false);
})

mp.events.add('grp:praktiniolaikymasdu', (atsakymas) => {
    if(atsakymas != "close") {
        mp.events.callRemote("grp:smpraktiniolaikymas")
        praktiniolaikymomenu.destroy();
        mp.gui.cursor.visible = false;
        mp.gui.chat.activate(true);
    } else {
        praktiniolaikymomenu.destroy();
        mp.gui.cursor.visible = false;
        mp.gui.chat.activate(true);
    }
})

mp.events.add("grp:cmpraktiniolaikymas", () => {
    var checkpointai = [
        {x: -309.4027, y: 6107.658, z: 31.49886},
        {x: -299.1898, y: 6112.306, z: 31.48964},
        {x: -296.348, y: 6120.356, z: 31.49982},
        {x: -302.4356, y: 6121.455, z: 31.49962},
        {x: -292.782, y: 6123.293, z: 31.49982},
        {x: -281.7565, y: 6129.773, z: 31.49368},
        {x: -279.6819, y: 6135.969, z: 31.5114},
        {x: -279.1763, y: 6141.496, z: 31.5001},
        {x: -292.7395, y: 6135.525, z: 31.46385},
        {x: -304.7627, y: 6118.572, z: 31.49939},
        {x: -311.7012, y: 6117.643, z: 31.69206}
    ]

    checkpointas = -1;
    pravaziuota = -1;

    var checkpointcheckeris = new mp.Event("render", () => {
        if(mp.players.local.vehicle) {
            if(checkpointas == pravaziuota) {
                checkpointas = checkpointas + 1;
            }
            if(checkpointas == pravaziuota+1) {
                if(mp.game.gameplay.getDistanceBetweenCoords(checkpointai[checkpointas].x, checkpointai[checkpointas].y, checkpointai[checkpointas].z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, false) > 75) {
                    mp.players.local.vehicle.destroy();
                    mp.players.local.position = new mp.Vector3(-137.5167, 6292.833, 35.4917);
                    mp.events.callRemote('grp:dimensija', 0)
        
                    klaida = mp.browsers.new('package://html/baigta.html')
                    klaida.execute(`baigta("Neišlaikėte!", "Jūs nuvažiavote per toli nuo aikštutės!", "grp:klaidauzdarymas")`)
        
                    mp.gui.cursor.visible = true;
                    mp.gui.chat.activate(false);

                    delete checkpointas;
                    delete pravaziuota;
                    checkpointcheckeris.destroy();
                }
                if(mp.players.local.vehicle.speed * 3.6 > 40) {
                    mp.players.local.vehicle.destroy();
                    mp.players.local.position = new mp.Vector3(-137.5167, 6292.833, 35.4917);
                    mp.events.callRemote('grp:dimensija', 0)
        
                    klaida = mp.browsers.new('package://html/baigta.html')
                    klaida.execute(`baigta("Neišlaikėte!", "Jūs viršijote leistiną greitį!", "grp:klaidauzdarymas")`)
        
                    mp.gui.cursor.visible = true;
                    mp.gui.chat.activate(false);

                    delete checkpointas;
                    delete pravaziuota;
                    checkpointcheckeris.destroy();
                }
                if(mp.game.gameplay.getDistanceBetweenCoords(checkpointai[checkpointas].x, checkpointai[checkpointas].y, checkpointai[checkpointas].z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, false) < 1) {
                    if(checkpointas == 1 || checkpointas == 5) {
                        if(mp.players.local.vehicle.getHeading() > 338 || mp.players.local.vehicle.getHeading() < 286) {
                            mp.players.local.vehicle.destroy();
                            mp.players.local.position = new mp.Vector3(-137.5167, 6292.833, 35.4917);
                            mp.events.callRemote('grp:dimensija', 0)
                
                            klaida = mp.browsers.new('package://html/baigta.html')
                            klaida.execute(`baigta("Neišlaikėte!", "Užduotį įvykdėte neteisingai!", "grp:klaidauzdarymas")`)
                
                            mp.gui.cursor.visible = true;
                            mp.gui.chat.activate(false);
        
                            delete checkpointas;
                            delete pravaziuota;
                            checkpointcheckeris.destroy();
                        }
                    }
                    if(checkpointas == 3) {
                        if(mp.players.local.vehicle.getHeading() > 358 || mp.players.local.vehicle.getHeading() < 267) {
                            mp.players.local.vehicle.destroy();
                            mp.players.local.position = new mp.Vector3(-137.5167, 6292.833, 35.4917);
                            mp.events.callRemote('grp:dimensija', 0)
                
                            klaida = mp.browsers.new('package://html/baigta.html')
                            klaida.execute(`baigta("Neišlaikėte!", "Užduotį įvykdėte neteisingai!", "grp:klaidauzdarymas")`)
                
                            mp.gui.cursor.visible = true;
                            mp.gui.chat.activate(false);
        
                            delete checkpointas;
                            delete pravaziuota;
                            checkpointcheckeris.destroy();
                        }
                    }
                    if(checkpointas == 7) {
                        if(mp.players.local.vehicle.getHeading() > 127 || mp.players.local.vehicle.getHeading() < 33) {
                            mp.players.local.vehicle.destroy();
                            mp.players.local.position = new mp.Vector3(-137.5167, 6292.833, 35.4917);
                            mp.events.callRemote('grp:dimensija', 0)
                
                            klaida = mp.browsers.new('package://html/baigta.html')
                            klaida.execute(`baigta("Neišlaikėte!", "Užduotį įvykdėte neteisingai!", "grp:klaidauzdarymas")`)
                
                            mp.gui.cursor.visible = true;
                            mp.gui.chat.activate(false);
        
                            delete checkpointas;
                            delete pravaziuota;
                            checkpointcheckeris.destroy();
                        }
                    }
                    if(checkpointas == 8) {
                        mp.players.local.vehicle.freezePosition(true);
                        let ped = mp.peds.new(mp.game.joaat("a_m_m_afriamer_01"), new mp.Vector3(-297.0493, 6135.195, 30.67327), 222, mp.players.local.dimension)
                        ped.taskGoStraightToCoord(-293.2418, 6131.204, 31.50105, 1, -1, 222, 2);
                        setTimeout(() => {
                            ped.destroy();
                            mp.players.local.vehicle.freezePosition(false);
                        }, 8000);
                    }
                    if(checkpointas == 9) {
                        if(mp.players.local.vehicle.getHeading() > 261 || mp.players.local.vehicle.getHeading() < 191) {
                            mp.players.local.vehicle.destroy();
                            mp.players.local.position = new mp.Vector3(-137.5167, 6292.833, 35.4917);
                            mp.events.callRemote('grp:dimensija', 0)
                
                            klaida = mp.browsers.new('package://html/baigta.html')
                            klaida.execute(`baigta("Neišlaikėte!", "Užduotį įvykdėte neteisingai!", "grp:klaidauzdarymas")`)
                
                            mp.gui.cursor.visible = true;
                            mp.gui.chat.activate(false);
        
                            delete checkpointas;
                            delete pravaziuota;
                            checkpointcheckeris.destroy();
                        }
                    }
                    if(checkpointas != 10 && checkpointas != 0) {
                        checkpointas = checkpointas + 1
                        pravaziuota = pravaziuota + 1
                    }
                    if(checkpointas == 0) {
                        if(dirzas == true) {
                            checkpointas = checkpointas + 1
                            pravaziuota = pravaziuota + 1
                        }
                    }
                }
                if(checkpointas == 10) {
                    if(mp.game.gameplay.getDistanceBetweenCoords(checkpointai[checkpointas].x, checkpointai[checkpointas].y, checkpointai[checkpointas].z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, false) < 1) {
                        mp.players.local.vehicle.destroy();
                        mp.players.local.position = new mp.Vector3(-137.5167, 6292.833, 35.4917);
                        mp.events.callRemote('grp:dimensija', 0)
            
                        klaida = mp.browsers.new('package://html/baigta.html')
                        klaida.execute(`baigta("Sveikiname!", "Išlaikėte praktinį vairavimą aikštutėje!", "grp:klaidauzdarymas")`)
                        mp.events.callRemote("grp:duotikategorija", "praktika")
            
                        mp.gui.cursor.visible = true;
                        mp.gui.chat.activate(false);
    
                        delete checkpointas;
                        delete pravaziuota;
                        checkpointcheckeris.destroy();
                    }
                }
                // Checkpointai
                if(checkpointas == 0) {
                    mp.game.graphics.drawMarker(1, checkpointai[checkpointas].x, checkpointai[checkpointas].y, checkpointai[checkpointas].z-1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.25, 2.25, 2.25, 255, 0, 0, 100, false, true, 2, false, "", "", false);
                    if(mp.game.system.vdist2(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, checkpointai[checkpointas].x, checkpointai[checkpointas].y, checkpointai[checkpointas].z) < 500) {
                        Draw3DText(checkpointai[checkpointas].x, checkpointai[checkpointas].y, checkpointai[checkpointas].z+0.9, "~r~Pradžia")
                        Draw3DText(checkpointai[checkpointas].x, checkpointai[checkpointas].y, checkpointai[checkpointas].z+0.8, "Neviršykite ~r~40km/h ~w~arba testo iškarto neišlaikysite")
                        Draw3DText(checkpointai[checkpointas].x, checkpointai[checkpointas].y, checkpointai[checkpointas].z+0.7, "Spauskite ~y~B ~w~diržo užsidejimui")
                        Draw3DText(checkpointai[checkpointas].x, checkpointai[checkpointas].y, checkpointai[checkpointas].z+0.6, "~y~Skaitykite užduotis prie kiekvieno taško")
                    }
                } else if(checkpointas == 1) {
                    mp.game.graphics.drawMarker(1, checkpointai[checkpointas].x, checkpointai[checkpointas].y, checkpointai[checkpointas].z-1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.25, 2.25, 2.25, 255, 0, 0, 100, false, true, 2, false, "", "", false);
                    if(mp.game.system.vdist2(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, checkpointai[checkpointas].x, checkpointai[checkpointas].y, checkpointai[checkpointas].z) < 500) {
                        Draw3DText(checkpointai[checkpointas].x, checkpointai[checkpointas].y, checkpointai[checkpointas].z+0.9, "~y~1. ~w~Priparkuokite automobili lygiai šonu")
                        Draw3DText(checkpointai[checkpointas].x, checkpointai[checkpointas].y, checkpointai[checkpointas].z+0.8, "~r~Jei automobilis bus priparkuotas nelygiai, testo neišlaikysite")
                    }
                } else if(checkpointas == 3) {
                    mp.game.graphics.drawMarker(1, checkpointai[checkpointas].x, checkpointai[checkpointas].y, checkpointai[checkpointas].z-1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.25, 2.25, 2.25, 255, 0, 0, 100, false, true, 2, false, "", "", false);
                    if(mp.game.system.vdist2(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, checkpointai[checkpointas].x, checkpointai[checkpointas].y, checkpointai[checkpointas].z) < 500) {
                        Draw3DText(checkpointai[checkpointas].x, checkpointai[checkpointas].y, checkpointai[checkpointas].z+0.9, "~y~2. ~w~Priparkuokite automobili galu")
                        Draw3DText(checkpointai[checkpointas].x, checkpointai[checkpointas].y, checkpointai[checkpointas].z+0.8, "~r~Jei automobilis bus priparkuotas priekiu, testo neišlaikysite")
                    }
                } else if(checkpointas == 5) {
                    mp.game.graphics.drawMarker(1, checkpointai[checkpointas].x, checkpointai[checkpointas].y, checkpointai[checkpointas].z-1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.25, 2.25, 2.25, 255, 0, 0, 100, false, true, 2, false, "", "", false);
                    if(mp.game.system.vdist2(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, checkpointai[checkpointas].x, checkpointai[checkpointas].y, checkpointai[checkpointas].z) < 500) {
                        Draw3DText(checkpointai[checkpointas].x, checkpointai[checkpointas].y, checkpointai[checkpointas].z+0.9, "~y~3. ~w~Priparkuokite automobili lygiai šonu")
                        Draw3DText(checkpointai[checkpointas].x, checkpointai[checkpointas].y, checkpointai[checkpointas].z+0.8, "~r~Jei automobilis bus priparkuotas nelygiai, testo neišlaikysite")
                    }
                } else if(checkpointas == 7) {
                    mp.game.graphics.drawMarker(1, checkpointai[checkpointas].x, checkpointai[checkpointas].y, checkpointai[checkpointas].z-1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.25, 2.25, 2.25, 255, 0, 0, 100, false, true, 2, false, "", "", false);
                    if(mp.game.system.vdist2(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, checkpointai[checkpointas].x, checkpointai[checkpointas].y, checkpointai[checkpointas].z) < 500) {
                        Draw3DText(checkpointai[checkpointas].x, checkpointai[checkpointas].y, checkpointai[checkpointas].z+0.9, "~y~4. ~w~Priparkuokite automobili galu")
                        Draw3DText(checkpointai[checkpointas].x, checkpointai[checkpointas].y, checkpointai[checkpointas].z+0.8, "~r~Jei automobilis bus priparkuotas priekiu, testo neišlaikysite")
                    }
                } else if(checkpointas == 8) {
                    mp.game.graphics.drawMarker(1, checkpointai[checkpointas].x, checkpointai[checkpointas].y, checkpointai[checkpointas].z-1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.25, 2.25, 2.25, 255, 0, 0, 100, false, true, 2, false, "", "", false);
                    if(mp.game.system.vdist2(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, checkpointai[checkpointas].x, checkpointai[checkpointas].y, checkpointai[checkpointas].z) < 500) {
                        Draw3DText(checkpointai[checkpointas].x, checkpointai[checkpointas].y, checkpointai[checkpointas].z+0.9, "~y~5. ~w~Praleiskite pesčiuosius")
                        Draw3DText(checkpointai[checkpointas].x, checkpointai[checkpointas].y, checkpointai[checkpointas].z+0.8, "~r~Prie šios perejos busite automatiškai sustabdytas")
                    }
                } else {
                    mp.game.graphics.drawMarker(1, checkpointai[checkpointas].x, checkpointai[checkpointas].y, checkpointai[checkpointas].z-1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.25, 2.25, 2.25, 255, 0, 0, 100, false, true, 2, false, "", "", false);
                }
            }
        } else {
            mp.vehicles.atHandle(mp.players.local.getVehicleIsIn(true)).destroy();
            mp.players.local.position = new mp.Vector3(-137.5167, 6292.833, 35.4917);
            mp.events.callRemote('grp:dimensija', 0)

            klaida = mp.browsers.new('package://html/baigta.html')
            klaida.execute(`baigta("Neišlaikėte!", "Jūs išlipote iš automobilio!", "grp:klaidauzdarymas")`)

            mp.gui.cursor.visible = true;
            mp.gui.chat.activate(false);
            checkpointcheckeris.destroy();
        }
    })
})

mp.events.add('grp:klaidauzdarymas', () => {
    klaida.destroy();
    mp.gui.cursor.visible = false;
    mp.gui.chat.activate(true);
})