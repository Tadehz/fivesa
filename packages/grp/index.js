var mysql = require('mysql'); // MySQL databazė
var funkcijos = require('./funkcijos.js') // Visos funkcijos
require('./prisijungimas.js') // Prisijungimo sistema
require('./mparduotuve.js') // Mašinų parduotuvė
require('./mvaldymas.js') // Mašinų valdymas
require('./vairavimomokykla.js') // Vairavimo mokyklos sistema
var laikas = true;
setInterval(() => { if(laikas) { mp.world.time.set(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()); } }, 3000); // Realus laikas žaidime

var mysqlp = mysql.createConnection({
    host: 'ip',
    user: 'useris',
    password: 'slaptazodis',
    database: 'db'
});

mp.events.add('playerChat', (player, message) => {
    if(player.getVariable('prisijunges')) {
        mp.players.broadcast(`!{#c4c4c4}${player.name}: !{#ffffff}${message}`)
    } else {
        player.outputChatBox(`!{#c70619}Jūs neprisijungęs! Negalite rašyti.`)
    }
});

mp.events.add('playerDeath', (player, prz, zudikas) => {
    player.spawn(new mp.Vector3(-246.5762, 6330.381, 32.42614));
    player.heading = 223.63;
});

mp.events.add('grp:dimensija', (player, dimensija) => {
    player.dimension = dimensija
})

mp.events.add('grp:tikrintipinigusdegalinei', (player, id) => {
    function callback(rankose, banke) {
        player.call('grp:pilimas', [rankose, id])
    }
    funkcijos.getCash(player, callback)
})

mp.events.add('grp:gautipiniguspilimui', (player, id) => {
    function callback(cash, bank) {
        player.call('grp:pilimopinigai', [`${cash}`, id])
    }
    funkcijos.getCash(player, callback)
})

mp.events.add('grp:tikrintipinigusdujom', (player, id) => {
    function callback(rankose, banke) {
        player.call('grp:dujupilimas', [rankose, id])
    }
    funkcijos.getCash(player, callback)
})

mp.events.add('grp:gautipinigusdujupilimui', (player, id) => {
    function callback(cash, bank) {
        player.call('grp:dujupilimopinigai', [`${cash}`, id])
    }
    funkcijos.getCash(player, callback)
})

mp.events.add('grp:animacija', (player, dict, name, speed, flag) => {
    if(dict != "baigti") {
        player.playAnimation(dict, name, speed, flag)
    } else {
        player.stopAnimation();
    }
})

mp.events.addCommand('masina', (player, args) => {
    var masina = mp.vehicles.new(mp.joaat(args), player.position, {
        numberPlate: "Tadeh",
        color: [[255, 255, 255], [255, 255, 255]]
    });
    player.putIntoVehicle(masina, 0)
    let spalva = Math.floor(Math.random() * 157)
    masina.setColor(spalva, spalva)
    masina.setVariable('kuras', 100)
    masina.setVariable('maxkuras', 250)
    masina.setVariable('rida', 0)
    masina.setVariable('bukle', 1000)
    masina.setVariable('variklis', false);
    masina.setVariable('uzrakinta', false);
    masina.setColor(135, 135)
    /*masina.setMod(11, 3)
    masina.setMod(12, 2)
    masina.setMod(13, 2)
    masina.setMod(18, 0)
    masina.setMod(46, 2)*/
});

mp.events.addCommand('bokstas', (player) => {
    player.position = new mp.Vector3(-76.17, -825.63, 325.52)
})

mp.events.addCommand('pozicija', (player, args) => {
    player.outputChatBox(`${player.vehicle.position} ${player.vehicle.heading}`);
});

mp.events.addCommand('tp', (player, args) => {
    player.position = mp.players.at(args).position
});

mp.events.addCommand('isjungimas', (player, args) => {
    mysqlp.query('SELECT * from zaidejai WHERE vardas = ?', [player.name], function(klaida, rezultatas) {
        if(rezultatas[0].rangas == 'Savininkas') {
            player.outputChatBox(`‏‏‎ ‎`)
            mp.players.broadcast(`!{#db1616}ĮSPĖJIMAS! !{#fafafa}Serveris bus išjungtas už !{#db1616}${args} !{#fafafa}minučių/tės!`)
            player.outputChatBox(`‏‏‎ ‎`)
            var laikas = args*60;
            var intervalas = setInterval(() => {
                laikas--
                mp.players.forEach((player, id) => {
                    player.call("grp:isjungimas", [`${laikas}`])
                }); 
            }, 1000);
            setTimeout(() => {
                var isviso = 0;
                mp.players.forEach(async function(player, id) {
                    for(i = 0; i < 10; i++) {
                        player.outputChatBox(`‏‏‎ ‎`)
                    }
                    player.outputChatBox(`<s>----------------------</s>`)
                    player.outputChatBox("!{#db1616}Serveris katik buvo išjungtas!")
                    player.outputChatBox("!{#06c927}Jūsų visas progresas buvo išsaugotas!")
                    await mysqlp.query('UPDATE zaidejai SET lokacija = ? WHERE vardas = ?', [`{"x":${player.position.x},"y":${player.position.y},"z":${player.position.z},"h":${player.heading}}`, player.name]);
                    player.kick("Serveris off")
                    isviso++
                    if(isviso == mp.players.length) {
                        setTimeout(() => {
                            process.exit();
                        }, 500);
                    }
                });
            }, args*60000);
        } else {
            player.outputChatBox("!{#db1616}Klaida!{#fafafa}: Jūs neturite tam teisių!")
        }
    });
});