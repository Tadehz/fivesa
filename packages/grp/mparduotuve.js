var funkcijos = require('./funkcijos.js')
var mysql = require('mysql'); // MySQL databazė

// Number with Commas function by Kerry [Simplified by someone else lol]
function skaiciausFormatas(skaicius) {
    return skaicius.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

var mysqlp = mysql.createConnection({
    host: 'ip',
    user: 'useris',
    password: 'slaptazodis',
    database: 'db'
});

var masinos = [
    {x: -41.69088, y: 6541.89, z: 30.5, h: 135.0, model: "pariah", name: "Ocelot Pariah", kaina: 700000, pardavimokaina: 420000, top: "219km/h", var: "Galiniai", laikas: "5.15 s.", bakas: 190},
    {x: -34.15585, y: 6534.417, z: 30.5, h: 135.0, model: "jester3", name: "Dinka Jester Classic", kaina: 80000, pardavimokaina: 48000, top: "192km/h", var: "Galiniai", laikas: "4.98 s.", bakas: 200},
    {x: -36.61781, y: 6537.136, z: 30.5, h: 135.0, model: "drafter", name: "Obey 8F Drafter", kaina: 130000, pardavimokaina: 78000, top: "189km/h", var: "Visi", laikas: "4.35 s.", bakas: 230},
    {x: -48.98551, y: 6548.92, z: 30.5, h: 135.0, model: "sugoi", name: "Dinka Sugoi", kaina: 90000, pardavimokaina: 54000, top: "191km/h", var: "Priekiniai", laikas: "5.36 s.", bakas: 210},
    {x: -51.50483, y: 6551.564, z: 30.5, h: 135.0, model: "toros", name: "Pegassi Toros", kaina: 350000, pardavimokaina: 210000, top: "205km/h", var: "Visi", laikas: "4.48 s.", bakas: 200},
    {x: -56.49548, y: 6556.951, z: 30.5, h: 135.0, model: "sultan", name: "Karin Sultan", kaina: 20000, pardavimokaina: 12000, top: "186km/h", var: "Visi", laikas: "6.23 s.", bakas: 200},
    {x: -61.17164, y: 6561.57, z: 30.5, h: 135.0, model: "entity2", name: "Overflod Entity XXR", kaina: 1000000, pardavimokaina: 600000, top: "206km/h", var: "Galiniai", laikas: "3.97 s.", bakas: 200},
    {x: -63.9096, y: 6563.633, z: 30.5, h: 135.0, model: "tailgater", name: "Obey Tailgater", kaina: 20000, pardavimokaina: 12000, top: "168km/h", var: "Galiniai", laikas: "7.93 s.", bakas: 230},
    {x: -77.62978, y: 6566.02, z: 30.5, h: 221.0, model: "penumbra2", name: "Maibatsu Penumbra FF", kaina: 65000, pardavimokaina: 39000, top: "181km/h", var: "Galiniai", laikas: "5.72 s.", bakas: 180},
    {x: -80.12558, y: 6563.487, z: 30.5, h: 221.0, model: "gauntlet4", name: "Bravado Gauntlet Hellfire", kaina: 160000, pardavimokaina: 96000, top: "201km/h", var: "Galiniai", laikas: "5.29 s.", bakas: 210},
    {x: -85.62821, y: 6558.795, z: 30.5, h: 221.0, model: "kanjo", name: "Dinka Blista Kanjo", kaina: 20000, pardavimokaina: 12000, top: "176km/h", var: "Priekiniai", laikas: "6.47 s.", bakas: 200},
    {x: -46.55199, y: 6546.566, z: 30.5, h: 135.0, model: "glendale2", name: "Benefactor Glendale Custom", kaina: 30000, pardavimokaina: 18000, top: "164km/h", var: "Galiniai", laikas: "7.84 s.", bakas: 190},
    {x: -91.4884, y: 6549.017, z: 30.5, h: 315.0, model: "kuruma", name: "Karin Kuruma", kaina: 35000, pardavimokaina: 21000, top: "180km/h", var: "Visi", laikas: "5.69 s.", bakas: 220},
    {x: -83.60906, y: 6561.866, z: 30.5, h: 221.0, model: "bati", name: "Pegassi Bati 801", kaina: 90000, pardavimokaina: 54000, top: "217km/h", var: "Galiniai", laikas: "5.30 s.", bakas: 120},
    {x: -89.5098, y: 6546.315, z: 30.5, h: 315.0, model: "carbonrs", name: "Nagasaki Carbon RS", kaina: 80000, pardavimokaina: 48000, top: "200km/h", var: "Galiniai", laikas: "5.33 s.", bakas: 120},
    {x: -82.01717, y: 6538.775, z: 30.5, h: 315.0, model: "sanchez", name: "Maibatsu Sanchez", kaina: 45000, pardavimokaina: 27000, top: "192km/h", var: "Galiniai", laikas: "4.74 s.", bakas: 100},
    {x: -84.37531, y: 6541.813, z: 30.5, h: 315.0, model: "blista", name: "Dinka Blista", kaina: 15000, pardavimokaina: 9000, top: "168km/h", var: "Priekiniai", laikas: "8.11 s.", bakas: 160}
]

for(i = 0; i < masinos.length; i++) {
    let masina = mp.vehicles.new(mp.joaat(masinos[i].model), new mp.Vector3(masinos[i].x, masinos[i].y, masinos[i].z), {
        numberPlate: " FIVESA ",
        color: [[255, 255, 255], [255, 255, 255]],
        heading: masinos[i].h
    });
    let spalva = Math.floor(Math.random() * 157)
    masina.setColor(spalva, spalva)
    masina.setVariable("dujos", -1);
    masina.setVariable('kuras', Math.floor(Math.random() * 87))
    masina.setVariable('maxkuras', masinos[i].bakas)
    masina.setVariable('bukle', 1000);
    masina.setVariable('rida', 0)
}

mp.events.add('playerEnterVehicle', (player, vehicle, sedyne) => {
    if(vehicle.numberPlate == " FIVESA ") {
        for(i = 0; i < masinos.length; i++) {
            if(vehicle.model == mp.joaat(masinos[i].model)) {
                player.call('grp:mpirkimas', [`${masinos[i].name}`, masinos[i].kaina, `${masinos[i].model}`, `${masinos[i].top}`, `${masinos[i].var}`, `${masinos[i].laikas}`, `${masinos[i].bakas} L.`, vehicle.getColor(0)])
            }
        }
    }
})

mp.events.add('grp:smmokejimas', (player, pavadinimas, kaina, modelis, spalva, variklis, dujos, maxkuras) => {
    function raides() { var result = ''; var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; for ( var i = 0; i < 3; i++ ) { result += characters.charAt(Math.floor(Math.random() * characters.length)); } return result; }
    function skaiciai() { var result = ''; var characters = '0123456789'; for ( var i = 0; i < 3; i++ ) { result += characters.charAt(Math.floor(Math.random() * characters.length)); } return result; }

    let numeriai = ` ${raides()} ${skaiciai()}`
    function callback(boolean) {
        if(boolean) {
            mysqlp.query('SELECT * from masinos WHERE savininkas = ?', [player.name], function(klaida, rezultatas) {
                if(rezultatas.length <= 0) {
                    if(dujos == 0) {
                        mysqlp.query("INSERT INTO masinos SET savininkas = ?, pavadinimas = ?, numeriai = ?, uzrakinta = ?, varikliostatusas = ?, rida = ?, bukle = ?, modelis = ?, kuras = ?, maxkuras = ?, dujos = ?, lokacija = ?, spalva = ?, variklis = ?", [player.name, pavadinimas, numeriai, "false", "false", 0, 100, modelis, 100, maxkuras, -1, '{"x":123.0,"y":123.0,"z":123.0,"h":123.0}', spalva, variklis], function() {
                            player.outputChatBox(`!{#0fbf35}Sveikiname!{#fafafa}: Nusipirkote automobilį !{#ebb215}${pavadinimas} !{#fafafa}už !{#ebb215}${skaiciausFormatas(kaina)}€!{#fafafa}!`)
                            funkcijos.removeCash(player, kaina);

                            let masina = mp.vehicles.new(mp.joaat(modelis), new mp.Vector3(-36.266, 6519.744, 31.004), {
                                numberPlate: numeriai,
                                heading: -135.715
                            });
                            masina.setColor(spalva, spalva);
                            masina.setMod(11, variklis);
                            player.putIntoVehicle(masina, 0);
                            masina.setVariable("dujos", -1);
                            masina.setVariable("kuras", 100);
                            masina.setVariable("maxkuras", maxkuras);
                            masina.setVariable('bukle', 1000);
                            masina.setVariable('variklis', false);
                            masina.setVariable('uzrakinta', false);
                            masina.setVariable('rida', 0)

                            player.call("grp:mcinematic")
                        });
                    } else {
                        mysqlp.query("INSERT INTO masinos SET savininkas = ?, pavadinimas = ?, numeriai = ?, uzrakinta = ?, varikliostatusas = ?, rida = ?, bukle = ?, modelis = ?, kuras = ?, maxkuras = ?, dujos = ?, lokacija = ?, spalva = ?, variklis = ?", [player.name, pavadinimas, numeriai, "false", "false", 0, 100, modelis, 100, maxkuras, 50, '{"x":123.0,"y":123.0,"z":123.0,"h":123.0}', spalva, variklis], function() {
                            player.outputChatBox(`!{#0fbf35}Sveikiname!{#fafafa}: Nusipirkote automobilį !{#ebb215}${pavadinimas} !{#fafafa}už !{#ebb215}${skaiciausFormatas(kaina)}€!{#fafafa}!`)
                            funkcijos.removeCash(player, kaina);

                            let masina = mp.vehicles.new(mp.joaat(modelis), new mp.Vector3(-36.266, 6519.744, 31.004), {
                                numberPlate: numeriai,
                                heading: -135.715
                            });
                            masina.setColor(spalva, spalva);
                            masina.setMod(11, variklis);
                            player.putIntoVehicle(masina, 0);
                            masina.setVariable("dujos", 50);
                            masina.setVariable("kuras", 100);
                            masina.setVariable("maxkuras", maxkuras);
                            masina.setVariable('bukle', 1000);
                            masina.setVariable('variklis', false);
                            masina.setVariable('uzrakinta', false);
                            masina.setVariable('rida', 0)

                            player.call("grp:mcinematic")
                        });
                    }
                } else {
                    player.outputChatBox("!{#db1616}Klaida!{#fafafa}: Jūs jau turite automobilį!")
                    player.call('grp:muzdaryti')
                }
            });
        } else {
            player.outputChatBox("!{#db1616}Klaida!{#fafafa}: Jums nepakanka pinigų!")
            player.call('grp:muzdaryti')
        }
    }
    funkcijos.hasCash(player, kaina, callback)
})