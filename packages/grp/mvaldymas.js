var mysql = require('mysql'); // MySQL databazė
var funkcijos = require('./funkcijos.js') // Visos funkcijos

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

// Number with Commas function by Kerry [Simplified by someone else lol]
function skaiciausFormatas(skaicius) {
    return skaicius.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

mp.events.add('playerQuit', (player) => {
    vardas = player.name
    mysqlp.query('SELECT * from masinos WHERE savininkas = ?', [vardas], function(klaida, rezultatas) {
        if(rezultatas.length > 0) {
            mp.vehicles.forEach((masina) => {
                if(masina.numberPlate === rezultatas[0].numeriai) {
                    if(rezultatas[0].dujos == -1) {
                        mysqlp.query("UPDATE masinos SET bukle = ?, kuras = ?, rida = ?, lokacija = ?, varikliostatusas = ?, uzrakinta = ? WHERE savininkas = ?", [masina.engineHealth / 10, Math.floor(masina.getVariable('kuras')), Math.floor(masina.getVariable('rida')), `{"x":${masina.position.x},"y":${masina.position.y},"z":${masina.position.z},"h":${masina.rotation.z}}`, `${masina.getVariable('variklis')}`, `${masina.getVariable('uzrakinta')}`, vardas], function() {
                            masina.destroy();
                        });
                    } else {
                        mysqlp.query("UPDATE masinos SET bukle = ?, kuras = ?, dujos = ?, rida = ?, lokacija = ?, varikliostatusas = ?, uzrakinta = ? WHERE savininkas = ?", [masina.engineHealth / 10, Math.floor(masina.getVariable('kuras')), Math.floor(masina.getVariable('dujos')), Math.floor(masina.getVariable('rida')), `{"x":${masina.position.x},"y":${masina.position.y},"z":${masina.position.z},"h":${masina.rotation.z}}`, `${masina.getVariable('variklis')}`, `${masina.getVariable('uzrakinta')}`, vardas], function() {
                            masina.destroy();
                        });
                    }
                }
            });
        }
    });
});

mp.events.add("vehicleDeathHandler", (player, masinosid) => {
    let masina = mp.vehicles.at(parseInt(masinosid));
    mysqlp.query('SELECT * from masinos WHERE numeriai = ?', [masina.numberPlate], function(klaida, rezultatas) {
        if(rezultatas.length > 0) {
            if(rezultatas[0].dujos == -1) {
                mysqlp.query("UPDATE masinos SET bukle = ?, kuras = ?, rida = ?, varikliostatusas = ?, uzrakinta = ? WHERE savininkas = ?", [0, Math.floor(masina.getVariable('kuras')), Math.floor(masina.getVariable('rida')), `${masina.getVariable('variklis')}`, `${masina.getVariable('uzrakinta')}`, rezultatas[0].savininkas], function() {
                    masina.destroy();
                    mp.players.forEach((playeris) => {
                        if(playeris.name == rezultatas[0].savininkas) {
                            playeris.outputChatBox("!{#eda41c}Įspėjimas!{#fafafa}: Jūsų automobilis katik buvo sudaužytas!")
                        }
                    })
                });
            } else {
                mysqlp.query("UPDATE masinos SET bukle = ?, kuras = ?, dujos = ?, rida = ?, varikliostatusas = ?, uzrakinta = ? WHERE savininkas = ?", [0, Math.floor(masina.getVariable('kuras')), Math.floor(masina.getVariable('dujos')), Math.floor(masina.getVariable('rida')), `${masina.getVariable('variklis')}`, `${masina.getVariable('uzrakinta')}`, rezultatas[0].savininkas], function() {
                    masina.destroy();
                    mp.players.forEach((playeris) => {
                        if(playeris.name == rezultatas[0].savininkas) {
                            playeris.outputChatBox("!{#eda41c}Įspėjimas!{#fafafa}: Jūsų automobilis katik buvo sudaužytas!")
                        }
                    })
                });
            }
        } else {
            /*mp.vehicles.new("drafter", player.position, {
                numberPlate: "Tadeh",
                color: [[255, 255, 255], [255, 255, 255]]
            });*/

            masina.destroy();
        }
    });
})

mp.events.add('grp:smremontas', (player) => {
    mysqlp.query('SELECT * from masinos WHERE savininkas = ?', [player.name], function(klaida, rezultatas) {
        if(rezultatas[0].bukle == 0) {
            function callback(boolean) {
                if(boolean != false) {
                    let vietos = [
                        {x: -238.3424, y: 6196.702, z: 30.87189},
                        {x: -240.6674, y: 6199.061, z: 30.87189},
                        {x: -242.9924, y: 6201.411, z: 30.87189},
                        {x: -245.5037, y: 6203.747, z: 30.8719},
                        {x: -247.935, y: 6206.113, z: 30.87255}
                    ]
                    let randomlokacija = vietos[Math.floor(Math.random() * vietos.length)]
        
                    mysqlp.query("UPDATE masinos SET bukle = ? WHERE savininkas = ?", [100, rezultatas[0].savininkas]);
        
                    let masina = mp.vehicles.new(rezultatas[0].modelis, new mp.Vector3(randomlokacija.x, randomlokacija.y, randomlokacija.z), {
                        numberPlate: rezultatas[0].numeriai,
                        color: [[255, 255, 255], [255, 255, 255]],
                        heading: 134.0
                    });
                    masina.setColor(parseInt(rezultatas[0].spalva), parseInt(rezultatas[0].spalva))
                    masina.setMod(11, parseInt(rezultatas[0].variklis));
                    masina.setVariable("dujos", rezultatas[0].dujos);
                    masina.setVariable("kuras", rezultatas[0].kuras);
                    masina.setVariable("maxkuras", rezultatas[0].maxkuras);
                    masina.setVariable('bukle', 1000);
                    masina.setVariable('variklis', JSON.parse(rezultatas[0].varikliostatusas));
                    masina.setVariable('uzrakinta', JSON.parse(rezultatas[0].uzrakinta));
                    masina.setVariable('rida', rezultatas[0].rida)
                    funkcijos.removeCash(player, 5000)
        
                    player.call('grp:pranesti', ["tinka", "Jūsų automobilis buvo sutaisytas, jį rasite KMA!", 2000])
                } else {
                    player.call('grp:pranesti', ["klaida", "Jūs neturite pakankamai pinigų!", 2000])
                }
            }
            funkcijos.hasCash(player, 5000, callback)
        } else {
            player.call('grp:pranesti', ["klaida", "Jūsų automobilis nesudaužytas!", 2000])
        }
    })
});

mp.events.add('grp:smkelimas', (player) => {
    mysqlp.query('SELECT * from masinos WHERE savininkas = ?', [player.name], function(klaida, rezultatas) {
        function callback(boolean, masina) {
            if(boolean === false) {
                if(mp.vehicles.at(masina).getOccupants().length <= 0) {
                    function callback(boolean) {
                        if(boolean != false) {
                            let vietos = [
                                {x: -238.3424, y: 6196.702, z: 30.87189},
                                {x: -240.6674, y: 6199.061, z: 30.87189},
                                {x: -242.9924, y: 6201.411, z: 30.87189},
                                {x: -245.5037, y: 6203.747, z: 30.8719},
                                {x: -247.935, y: 6206.113, z: 30.87255}
                            ]
                            let randomlokacija = vietos[Math.floor(Math.random() * vietos.length)]
                        
                            mp.vehicles.at(masina).position = new mp.Vector3(randomlokacija.x, randomlokacija.y, randomlokacija.z);
                            mp.vehicles.at(masina).rotation = new mp.Vector3(0, 0, 134);
                            funkcijos.removeCash(player, 2500)
                        
                            player.call('grp:pranesti', ["tinka", "Sėkmingai nukėlėme jūsų automobilį į KMA!", 2000])
                        } else {
                            player.call('grp:pranesti', ["klaida", "Jūs neturite pakankamai pinigų!", 2000])
                        }
                    }
                    funkcijos.hasCash(player, 2500, callback)
                } else {
                    player.call('grp:pranesti', ["klaida", "Jūsų automobilyje kažkas sėdi!", 2000])
                }
            } else {
                player.call('grp:pranesti', ["klaida", "Jūsų automobilis sudaužytas!", 2000])
            }
        }
        funkcijos.arSudauzyta(`${rezultatas[0].numeriai}`, callback)
    })
});

mp.events.add('grp:smzemelapis', (player) => {
    mysqlp.query('SELECT * from masinos WHERE savininkas = ?', [player.name], function(klaida, rezultatas) {
        function callback(boolean, masina) {
            if(boolean === false) {
                player.call('grp:nustatytimap', [mp.vehicles.at(masina)])
                player.call('grp:pranesti', ["tinka", "Jūsų automobilio lokacija buvo pažymėta žemėlapyje!", 2000])
            } else {
                player.call('grp:pranesti', ["klaida", "Jūsų automobilis sudaužytas!", 2000])
            }
        }
        funkcijos.arSudauzyta(`${rezultatas[0].numeriai}`, callback)
    })
});

mp.events.add('grp:smisspirti', (player) => {
    mysqlp.query('SELECT * from masinos WHERE savininkas = ?', [player.name], function(klaida, rezultatas) {
        function callback(boolean, masina) {
            if(boolean === false) {
                mp.vehicles.at(masina).getOccupants().forEach((occupant) => {
                    occupant.removeFromVehicle()
                })
                player.call('grp:pranesti', ["tinka", "Visi buvo išspirti iš jūsų automobilio!", 2000])
            } else {
                player.call('grp:pranesti', ["klaida", "Jūsų automobilis sudaužytas!", 2000])
            }
        }
        funkcijos.arSudauzyta(`${rezultatas[0].numeriai}`, callback)
    })
});

mp.events.add('grp:smvariklis', (player) => {
    mysqlp.query('SELECT * from masinos WHERE savininkas = ?', [player.name], function(klaida, rezultatas) {
        function callback(boolean, masina) {
            if(boolean === false) {
                if(mp.vehicles.at(masina).getVariable('variklis') == false) {
                    mp.vehicles.at(masina).setVariable('variklis', true)
                    mp.vehicles.at(masina).engine = true;
                    player.call('grp:pranesti', ["tinka", "Jūsų automobilio variklis buvo <span style='color: #2fcf1d'>įjungtas</span>!", 2000])
                } else {
                    mp.vehicles.at(masina).setVariable('variklis', false)
                    mp.vehicles.at(masina).engine = false;
                    player.call('grp:pranesti', ["tinka", "Jūsų automobilio variklis buvo <span style='color: #db1616'>išjungtas</span>!", 2000])
                }
            } else {
                player.call('grp:pranesti', ["klaida", "Jūsų automobilis sudaužytas!", 2000])
            }
        }
        funkcijos.arSudauzyta(`${rezultatas[0].numeriai}`, callback)
    })
});

mp.events.add('grp:smuzraktas', (player) => {
    mysqlp.query('SELECT * from masinos WHERE savininkas = ?', [player.name], function(klaida, rezultatas) {
        function callback(boolean, masina) {
            if(boolean === false) {
                if(mp.vehicles.at(masina).getVariable('uzrakinta') == true) {
                    mp.vehicles.at(masina).setVariable('uzrakinta', false)
                    mp.vehicles.at(masina).locked = false;
                    player.call('grp:pranesti', ["tinka", "Jūsų automobilis buvo <span style='color: #2fcf1d'>atrakintas</span>!", 2000])
                } else {
                    mp.vehicles.at(masina).setVariable('uzrakinta', true)
                    mp.vehicles.at(masina).locked = true;
                    player.call('grp:pranesti', ["tinka", "Jūsų automobilis buvo <span style='color: #db1616'>užrakintas</span>!", 2000])
                }
            } else {
                player.call('grp:pranesti', ["klaida", "Jūsų automobilis sudaužytas!", 2000])
            }
        }
        funkcijos.arSudauzyta(`${rezultatas[0].numeriai}`, callback)
    })
});

mp.events.add('grp:smpardavimas', (player) => {
    mysqlp.query('SELECT * from masinos WHERE savininkas = ?', [player.name], function(klaida, rezultatas) {
        function callback(boolean, masina) {
            for(i = 0; i < masinos.length; i++) {
                if(masinos[i].model == rezultatas[0].modelis) {
                    let pavadinimas = masinos[i].name
                    let kaina = masinos[i].pardavimokaina
                    if(boolean === false) {
                        mysqlp.query("DELETE FROM masinos WHERE savininkas = ?", [player.name], function(err, rez) {
                            mp.vehicles.at(masina).destroy();
                            player.outputChatBox(`!{#eda41c}Įvykdyta!{#fafafa}: Sėkmingai pardavėte savo automobilį !{#eda41c}${pavadinimas}!{#fafafa} už !{#eda41c}${skaiciausFormatas(kaina)}€!{#fafafa}!`);
                            funkcijos.addCash(player, kaina);
                        });
                    } else {
                        mysqlp.query("DELETE FROM masinos WHERE savininkas = ?", [player.name], function(err, rez) {
                            player.outputChatBox(`!{#eda41c}Įvykdyta!{#fafafa}: Sėkmingai pardavėte savo automobilį !{#eda41c}${pavadinimas} !{#fafafa}už !{#eda41c}${skaiciausFormatas(kaina)}€!{#fafafa}!`);
                            funkcijos.addCash(player, kaina);
                        });
                    }
                }
            }
        }
        funkcijos.arSudauzyta(`${rezultatas[0].numeriai}`, callback)
    })
});

mp.events.add('grp:variklis', (player, masina, variklis) => {
    mp.vehicles.at(masina).setVariable('variklis', variklis);
    mp.vehicles.at(masina).engine = variklis;
});

mp.events.add('grp:uzrakintamasina', (player, masina) => {
    if(mp.vehicles.at(masina).locked == true) {
        mysqlp.query('SELECT * from masinos WHERE numeriai = ?', [mp.vehicles.at(masina).numberPlate], function(klaida, rezultatas) {
            if(rezultatas.length > 0) {
                player.call('grp:pranesti', ["klaida", `Šis automobilis yra užrakintas ir priklauso <span style='color: #db1616'>${rezultatas[0].savininkas}</span>!`, 2000])
            } else {
                player.call('grp:pranesti', ["klaida", "Šis darbo automobilis yra užrakintas!", 2000])
            }
        });
    }
})

mp.events.addCommand('fix', (player) => {
    player.vehicle.repair();
});

mp.events.addCommand('variklis', (player) => {
    player.vehicle.engine = false;
});

mp.events.add('grp:uzraktas', (player, masina, raktas) => {
    mp.vehicles.at(masina).setVariable('uzrakinta', raktas)
    mp.vehicles.at(masina).locked = raktas;
});

function masinosmenu(player) {
    mysqlp.query('SELECT * from masinos WHERE savininkas = ?', [player.name], function(klaida, rezultatas) {
        if(rezultatas.length > 0) {
            function callback(boolean, masina) {
                if(boolean != true) {
                    player.call("grp:mvaldymas", [`${rezultatas[0].pavadinimas}`, `${rezultatas[0].modelis}`, `${rezultatas[0].numeriai}`, `${mp.vehicles.at(masina).getVariable('uzrakinta')}`, `${rezultatas[0].maxkuras}`, `${Math.floor(mp.vehicles.at(masina).getVariable('kuras'))}`, `${Math.floor(mp.vehicles.at(masina).engineHealth / 10)}`, `${Math.floor(mp.vehicles.at(masina).getVariable('dujos'))}`, `${rezultatas[0].spalva}`, `${rezultatas[0].variklis}`])
                } else {
                    player.call("grp:mvaldymas", [`${rezultatas[0].pavadinimas}`, `${rezultatas[0].modelis}`, `${rezultatas[0].numeriai}`, `${rezultatas[0].uzrakinta}`, `${rezultatas[0].maxkuras}`, `${rezultatas[0].kuras}`, `${rezultatas[0].bukle}`, `${rezultatas[0].dujos}`, `${rezultatas[0].spalva}`, `${rezultatas[0].variklis}`])
                }
            }
            funkcijos.arSudauzyta(rezultatas[0].numeriai, callback)
        } else {
            player.call('grp:pranesti', ["klaida", "Jūs neturite automobilio!", 2000])
        }
    });
}

mp.events.addCommand('masina', (player) => {
    masinosmenu(player);
});

mp.events.addCommand('m', (player) => {
    masinosmenu(player);
});

mp.events.add('grp:nustatytikura', (player, masina, kuras) => {
    if(masina)
        masina.setVariable("kuras", kuras)
});

mp.events.add('grp:nustatytidujas', (player, masina, dujos) => {
    if(masina)
        masina.setVariable("dujos", dujos)
});

mp.events.add('grp:toggledujas', (player, masina, dujos) => {
    if(masina)
        masina.setVariable("dujoson", dujos)
});

mp.events.add('grp:nustatytirida', (player, masina) => {
    if(masina)
        masina.setVariable("rida", 1 + masina.getVariable('rida'))
});