var mysql = require('mysql'); // MySQL databazė
var funkcijos = require('./funkcijos.js') // Visos funkcijos
var mysqlp = mysql.createConnection({
    host: 'ip',
    user: 'useris',
    password: 'slaptazodis',
    database: 'db'
});

mp.events.add('grp:pirktiteorija', (player) => {
    function callback(boolean) {
        if(boolean == true) {
            player.call('grp:pranesti', ["klaida", "Jūs jau sumokėjote už teorijos egzaminą!", 2000])
        } else {
            player.call('grp:teorijospirkimas')
        }
    }
    funkcijos.hasPirktaTeorija(player, callback)
})

mp.events.add('grp:laikytiteorija', (player) => {
    function callback(boolean) {
        if(boolean == true) {
            function callbackdu(booleandu) {
                if(boolean == false) {
                    player.call('grp:teorijoslaikymas')
                } else {
                    player.call('grp:pranesti', ["klaida", "Jūs jau turite išlaikę teorijos egzaminą!", 2000])
                }
            }
            funkcijos.hasTeorija(player, callbackdu)
        } else {
            player.call('grp:pranesti', ["klaida", "Jūs nesumokėjote už teorijos egzaminą!", 2000])
        }
    }
    funkcijos.hasPirktaTeorija(player, callback)
})

mp.events.add('grp:smpirktiteorija', (player) => {
    function callback(boolean) {
        if(boolean == true) {
            mysqlp.query('UPDATE zaidejai SET pirktateorija = ? WHERE vardas = ?', ['true', player.name], function() {
                player.call('grp:pranesti', ["tinka", "Sėkmingai sumokėjote <span style='color:#0fd125'>5,000€</span> už teorijos egzaminą!", 4000])
                funkcijos.removeCash(player, 5000)
            })
        } else {
            player.call('grp:pranesti', ["klaida", "Jūs neturite pakankamai pinigų!", 2000])
        }
    }
    funkcijos.hasCash(player, 5000, callback)
})

mp.events.add('grp:laikytipraktini', (player) => {
    function callback(boolean) {
        if(boolean == true) {
            player.call('grp:praktiniolaikymas')
        } else {
            player.call('grp:pranesti', ["klaida", "Jūs neturite išlaikę teorijos egzamino!", 2000])
        }
    }
    funkcijos.hasTeorija(player, callback)
})

mp.events.add('grp:smpraktiniolaikymas', (player) => {
    let dimensija = Math.floor(Math.random() * 5000000);
    player.dimension = dimensija;
    function raides() { var result = ''; var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; for ( var i = 0; i < 3; i++ ) { result += characters.charAt(Math.floor(Math.random() * characters.length)); } return result; }
    function skaiciai() { var result = ''; var characters = '0123456789'; for ( var i = 0; i < 3; i++ ) { result += characters.charAt(Math.floor(Math.random() * characters.length)); } return result; }
    let numeriai = ` ${raides()} ${skaiciai()}`

    var masina = mp.vehicles.new(mp.joaat("blista"), new mp.Vector3(-306.5487, 6098.298, 31.04042), {
        numberPlate: numeriai,
        color: [[255, 30, 30], [255, 30, 30]],
        heading: 44.4608,
        dimension: dimensija
    });
    masina.setVariable('kuras', 100)
    masina.setVariable('dujos', -1)
    masina.setVariable('maxkuras', 250)
    masina.setVariable('rida', 0)
    masina.setVariable('bukle', 1000)
    masina.setVariable('variklis', false);
    masina.setVariable('uzrakinta', false);

    player.putIntoVehicle(masina, 0)

    player.call("grp:cmpraktiniolaikymas")
})

mp.events.add('grp:duotikategorija', (player, kategorija) => {
    mysqlp.query(`UPDATE zaidejai SET ${kategorija} = ? WHERE vardas = ?`, ['true', player.name]);
})

mp.events.add('grp:nuimtikategorija', (player, kategorija) => {
    mysqlp.query(`UPDATE zaidejai SET ${kategorija} = ? WHERE vardas = ?`, ['false', player.name]);
})