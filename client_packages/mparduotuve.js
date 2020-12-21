// Number with Commas function by Kerry [Simplified by someone else lol]
function skaiciausFormatas(skaicius) {
    return skaicius.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

var menu = false;
var masinos = [
    {x: -41.69088, y: 6541.89, z: 30.5, h: 135.0, model: "pariah", name: "Ocelot Pariah", kaina: 700000, pardavimokaina: 420000, top: "219km/h", var: "Galiniai", laikas: "5.15 s.", bakas: "190 L."},
    {x: -34.15585, y: 6534.417, z: 30.5, h: 135.0, model: "jester3", name: "Dinka Jester Classic", kaina: 80000, pardavimokaina: 48000, top: "192km/h", var: "Galiniai", laikas: "4.98 s.", bakas: "200 L."},
    {x: -36.61781, y: 6537.136, z: 30.5, h: 135.0, model: "drafter", name: "Obey 8F Drafter", kaina: 130000, pardavimokaina: 78000, top: "189km/h", var: "Visi", laikas: "4.35 s.", bakas: "230 L."},
    {x: -48.98551, y: 6548.92, z: 30.5, h: 135.0, model: "sugoi", name: "Dinka Sugoi", kaina: 90000, pardavimokaina: 54000, top: "191km/h", var: "Priekiniai", laikas: "5.36 s.", bakas: "210 L."},
    {x: -51.50483, y: 6551.564, z: 30.5, h: 135.0, model: "toros", name: "Pegassi Toros", kaina: 350000, pardavimokaina: 210000, top: "205km/h", var: "Visi", laikas: "4.48 s.", bakas: "200 L."},
    {x: -56.49548, y: 6556.951, z: 30.5, h: 135.0, model: "sultan", name: "Karin Sultan", kaina: 20000, pardavimokaina: 12000, top: "186km/h", var: "Visi", laikas: "6.23 s.", bakas: "200 L."},
    {x: -61.17164, y: 6561.57, z: 30.5, h: 135.0, model: "entity2", name: "Overflod Entity XXR", kaina: 1000000, pardavimokaina: 600000, top: "206km/h", var: "Galiniai", laikas: "3.97 s.", bakas: "200 L."},
    {x: -63.9096, y: 6563.633, z: 30.5, h: 135.0, model: "tailgater", name: "Obey Tailgater", kaina: 20000, pardavimokaina: 12000, top: "168km/h", var: "Galiniai", laikas: "7.93 s.", bakas: "230 L."},
    {x: -77.62978, y: 6566.02, z: 30.5, h: 221.0, model: "penumbra2", name: "Maibatsu Penumbra FF", kaina: 65000, pardavimokaina: 39000, top: "181km/h", var: "Galiniai", laikas: "5.72 s.", bakas: "180 L."},
    {x: -80.12558, y: 6563.487, z: 30.5, h: 221.0, model: "gauntlet4", name: "Bravado Gauntlet Hellfire", kaina: 160000, pardavimokaina: 96000, top: "201km/h", var: "Galiniai", laikas: "5.29 s.", bakas: "210 L."},
    {x: -85.62821, y: 6558.795, z: 30.5, h: 221.0, model: "kanjo", name: "Dinka Blista Kanjo", kaina: 20000, pardavimokaina: 12000, top: "176km/h", var: "Priekiniai", laikas: "6.47 s.", bakas: "200 L."},
    {x: -46.55199, y: 6546.566, z: 30.5, h: 135.0, model: "glendale2", name: "Benefactor Glendale Custom", kaina: 30000, pardavimokaina: 18000, top: "164km/h", var: "Galiniai", laikas: "7.84 s.", bakas: "190 L."},
    {x: -91.4884, y: 6549.017, z: 30.5, h: 315.0, model: "kuruma", name: "Karin Kuruma", kaina: 35000, pardavimokaina: 21000, top: "180km/h", var: "Visi", laikas: "5.69 s.", bakas: "220 L."},
    {x: -83.60906, y: 6561.866, z: 30.5, h: 221.0, model: "bati", name: "Pegassi Bati 801", kaina: 90000, pardavimokaina: 54000, top: "217km/h", var: "Galiniai", laikas: "5.30 s.", bakas: "120 L."},
    {x: -89.5098, y: 6546.315, z: 30.5, h: 315.0, model: "carbonrs", name: "Nagasaki Carbon RS", kaina: 80000, pardavimokaina: 48000, top: "200km/h", var: "Galiniai", laikas: "5.33 s.", bakas: "120 L."},
    {x: -82.01717, y: 6538.775, z: 30.5, h: 315.0, model: "sanchez", name: "Maibatsu Sanchez", kaina: 45000, pardavimokaina: 27000, top: "192km/h", var: "Galiniai", laikas: "4.74 s.", bakas: "100 L."},
    {x: -84.37531, y: 6541.813, z: 30.5, h: 315.0, model: "blista", name: "Dinka Blista", kaina: 15000, pardavimokaina: 9000, top: "168km/h", var: "Priekiniai", laikas: "8.11 s.", bakas: "160 L."}
]

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

// Mašinų parduotuvė.
mp.events.add('render', () => {
    for(i = 0; i < masinos.length; i++) {
        if(mp.game.system.vdist2(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, masinos[i].x, masinos[i].y, masinos[i].z) < 2000) {
            if(mp.vehicles.getClosest(new mp.Vector3(masinos[i].x, masinos[i].y, masinos[i].z))) {
                Draw3DText(masinos[i].x, masinos[i].y, masinos[i].z+1+mp.vehicles.getClosest(new mp.Vector3(masinos[i].x, masinos[i].y, masinos[i].z)).getHeightAboveGround()*2, `Modelis ~y~${masinos[i].name}`)
                Draw3DText(masinos[i].x, masinos[i].y, masinos[i].z+1+mp.vehicles.getClosest(new mp.Vector3(masinos[i].x, masinos[i].y, masinos[i].z)).getHeightAboveGround()*2-0.09, `Kaina ~g~${skaiciausFormatas(masinos[i].kaina)}€`)
            }
        }
    }
    if(menu) {
        mp.game.controls.disableControlAction(0, 200, true);
        mp.game.controls.disableControlAction(0, 75, true);
        if(mp.game.controls.isControlJustReleased(1, 25)) {
            mp.gui.cursor.visible = true;
        }
    }
})

// Mini laikymo sistemėlė
mp.events.add('grp:laikomasdesinys', () => {
    mp.gui.cursor.visible = false;
})

// Pirkimo GUI
mp.events.add('grp:mpirkimas', (pavadinimas, kaina, modelis, top, varomi, laikas, bakas, spalva) => {
    // Atidarome GUI
    pirkimas = mp.browsers.new('package://html/mpirkimas.html');
    pirkimas.execute(`pirkti("${pavadinimas}", ${kaina}, "${modelis}", "${top}", "${varomi}", "${laikas}", "${bakas}")`)
    defaultspalva = spalva
    mp.gui.cursor.visible = true;
    mp.gui.chat.activate(false);
    menu = true;
    timeoutas = setTimeout(() => {
        mp.players.local.taskLeaveVehicle(mp.players.local.vehicle.handle, 0);
        pirkimas.destroy();
        setTimeout(() => {
            menu = false;
            mp.gui.cursor.visible = false;
            mp.gui.chat.activate(true);
        }, 100);
    }, 45000);
})

// Mokėjimo siuntimas į serverį
mp.events.add('grp:mmokejimas', (pavadinimas, kaina, modelis, spalva, variklis, dujos, maxkuras) => {
    // Išsiunčiam eventą
    mp.game.invoke('0x4F1D4BE3A7F24601', mp.players.local.vehicle.handle, defaultspalva, defaultspalva)
    mp.players.local.vehicle.setEngineOn(false, false, true)
    mp.events.callRemote('grp:smmokejimas', `${pavadinimas}`, parseInt(kaina), `${modelis}`, parseInt(spalva), parseInt(variklis), parseInt(dujos), parseInt(maxkuras))
    clearTimeout(timeoutas);
    setTimeout(() => {
        menu = false;
    }, 100);
})

// Meniu uždarymas paspaudus ESC
mp.events.add('grp:muzdaryti', () => {
    mp.game.invoke('0x4F1D4BE3A7F24601', mp.players.local.vehicle.handle, defaultspalva, defaultspalva)
    mp.players.local.taskLeaveVehicle(mp.players.local.vehicle.handle, 0);
    pirkimas.destroy();
    clearTimeout(timeoutas);
    setTimeout(() => {
        menu = false;
        mp.gui.cursor.visible = false;
        mp.gui.chat.activate(true);
    }, 100);
})

// Spalvos keitimas client-side
mp.events.add('grp:mpspalva', (id) => {
    mp.game.invoke('0x4F1D4BE3A7F24601', mp.players.local.vehicle.handle, id, id)
})

mp.events.add('grp:mcinematic', () => {
    var kameros = [
        {pirmavieta: new mp.Vector3(-31.65, 6518.09, 31.77), antravieta: new mp.Vector3(-31.33, 6521.37, 31.77), p1: -55.96, p2: 6520.47, p3: 31.52, p4: -59.92, p5: 6524.17, p6: 31.48},
        {pirmavieta: new mp.Vector3(-40.83, 6518.85, 31.83), antravieta: new mp.Vector3(-41.07, 6521.83, 31.89), p1: 2.18, p2: 6519.62, p3: 32.62, p4: 6.02, p5: 6522.86, p6: 32.26},
        {pirmavieta: new mp.Vector3(-35.5, 6523.81, 31.69), antravieta: new mp.Vector3(-38.98, 6524.54, 31.69), p1: -42.9, p2: 6467.93, p3: 31.69, p4: -47.05, p5: 6463.63, p6: 31.69}
    ]

    mp.game.ui.displayRadar(false);
    pirkimas.destroy();

    let kamera = mp.cameras.new('default', kameros[0].pirmavieta, new mp.Vector3(0, 0, 0), 40);
    kamera.pointAtCoord(kameros[0].p1, kameros[0].p2, kameros[0].p3);
    kamera.setActive(true);
    mp.game.cam.renderScriptCams(true, true, 0, true, false)

    let kamera2 = mp.cameras.new('default', kameros[0].antravieta, new mp.Vector3(0, 0, 0), 40);
    kamera2.pointAtCoord(kameros[0].p4, kameros[0].p5, kameros[0].p6);
    kamera2.setActiveWithInterp(kamera.handle, 5000, 0, 0);
    var i = 1;
    intervaliux = setInterval(() => {
        if(i < kameros.length) {
            let kamera = mp.cameras.new('default', kameros[i].pirmavieta, new mp.Vector3(0, 0, 0), 40);
            kamera.pointAtCoord(kameros[i].p1, kameros[i].p2, kameros[i].p3);
            kamera.setActive(true);

            let kamera2 = mp.cameras.new('default', kameros[i].antravieta, new mp.Vector3(0, 0, 0), 40);
            kamera2.pointAtCoord(kameros[i].p4, kameros[i].p5, kameros[i].p6);
            kamera2.setActiveWithInterp(kamera.handle, 5000, 0, 0);
            i++
        } else {
            mp.game.cam.renderScriptCams(false, true, 2000, true, false)
            mp.gui.cursor.visible = false;
            mp.game.ui.displayRadar(true);
            mp.gui.chat.activate(true);
            clearInterval(intervaliux)
        }
    }, 5000);
});