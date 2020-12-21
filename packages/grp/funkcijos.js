var mysql = require('mysql');

var mysqlp = mysql.createConnection({
    host: 'ip',
    user: 'useris',
    password: 'slaptazodis',
    database: 'db'
});

mp.events.addProc('hasCash', (player, suma) => {
    mysqlp.query("SELECT pinigai FROM zaidejai WHERE vardas = ?", [player.name], function(erroras, rezultatas) {
        if(rezultatas[0].pinigai >= suma) {
            return true;
        }
        return false;
    });
})

mp.events.addProc('getCash', (player) => {
    mysqlp.query("SELECT * FROM zaidejai WHERE vardas = ?", [player.name], function(erroras, rezultatas) {
        return rezultatas[0].pinigai
    });
})

mp.events.add('removeCash', (player, suma) => {
    mysqlp.query("SELECT * FROM zaidejai WHERE vardas = ?", [player.name], function(erroras, rezultatas) {
        let naujipinigai = rezultatas[0].pinigai - suma;
        mysqlp.query('UPDATE zaidejai SET pinigai = ? WHERE vardas = ?', [naujipinigai, player.name], function(error, rezult) {
            player.call("grp:naujintihud", [naujipinigai, rezultatas[0].banke])
        });
    });
})

module.exports = {
    tikrintinick: function(player) {
        let vardas = player.name;
        let ilgis = vardas.length;
        
        yra = false
        for(i = 0; i < ilgis; i++) {
            if(vardas[i] == '_') {
                if(vardas.charAt(ilgis-1) != "_") {
                    let nick = vardas.split("_")
                    if(!nick[2]) {
                        if(/^[a-zA-Z]+$/.test(nick[0]) && /^[a-zA-Z]+$/.test(nick[1])) {
                            if(nick[0].length > 2 && nick[1].length > 2) {
                                if(nick[0].length < 13 && nick[1].length < 13) {
                                    if(nick[0] == nick[0].charAt(0).toUpperCase() + nick[0].slice(1).toLowerCase()) {
                                        if(nick[1] == nick[1].charAt(0).toUpperCase() + nick[1].slice(1).toLowerCase()) {
                                            yra = true
                                        }
                                    }
                                } else {
                                    yra = "ilgas"
                                }
                            } else {
                                yra = "trumpas"
                            }
                        } else {
                            yra = "raides"
                        }
                    }
                }
            }
        }
        if(!yra) {
            player.outputChatBox(`!{#d90d0d}> !{#ffffff}Jūsų vardo formatas neteisingas!`)
            player.outputChatBox(`Teisingas: !{#16e053}Vardas_Pavarde`)
            player.outputChatBox(`Jūs buvote išmestas iš serverio!`)
            player.call('grp:sunaikintip')
            setTimeout(() => {
                player.kick("Nick formatas");
            }, 1000)
        } else if(yra == "trumpas") {
            player.outputChatBox(`!{#d90d0d}> !{#ffffff}Jūsų vardas arba pavardė yra per trumpa! Minimalus ilgis: !{#16e053}3 raidės!`)
            player.outputChatBox(`Jūs buvote išmestas iš serverio!`)
            player.call('grp:sunaikintip')
            setTimeout(() => {
                player.kick("Nick formatas");
            }, 1000)
        } else if(yra == "ilgas") {
            player.outputChatBox(`!{#d90d0d}> !{#ffffff}Jūsų vardas arba pavardė yra per ilga! Maksimalus ilgis: !{#16e053}12 raidžių!`)
            player.outputChatBox(`Jūs buvote išmestas iš serverio!`)
            player.call('grp:sunaikintip')
            setTimeout(() => {
                player.kick("Nick formatas");
            }, 1000)
        } else if(yra == "raides") {
            player.outputChatBox(`!{#d90d0d}> !{#ffffff}Vardas bei pavardė gali turėti tik raides!`)
            player.outputChatBox(`Jūs buvote išmestas iš serverio!`)
            player.call('grp:sunaikintip')
            setTimeout(() => {
                player.kick("Nick formatas");
            }, 1000)
        } else {
            player.call('grp:radijas')
            
            player.outputChatBox(`!{#ffffff}Sveiki atvykę į !{#e6b000}FiveSA !{#ffffff}serverį!`)
            player.outputChatBox(`!{#ffffff}Šis serveris yra kažkas panašaus į SA-MP platformos ,,Real Life" serverius. Tad jei jums kadaise patiko šio tipo serveriai neabejojame, jog šį serverį pamilsite!`)
            player.outputChatBox(`<s>----------------------</s>`)
            // Databazės reikalai
            mysqlp.query('SELECT * from zaidejai WHERE vardas = ?', [player.name], function(klaida, rezultatas) {
                if(rezultatas.length > 0) {
                    player.outputChatBox(`Jūsų slapyvardis: !{#e6b000}${player.name}`)
                    player.outputChatBox(`!{#e6b000}> !{#ffffff}Prašome prisijungti, norėdami tęsti žaidimą!`)
                    player.call('grp:prisijungimas')
                } else {
                    player.outputChatBox(`Jūsų slapyvardis: !{#e6b000}${player.name}`)
                    player.outputChatBox(`!{#e6b000}> !{#ffffff}Jūs atvykote pirmą kartą, prisiregistruokite!`)
                    player.call('grp:registracija')
                }
            });
        }
    },
    formatdate: function(date) {
        var monthNames = [
            "Sausio", "Vasario", "Kovo",
            "Balandžio", "Gegužės", "Birželio", "Liepos",
            "Rugpjūčio", "Rugsėjo", "Spalio",
            "Lapkričio", "Gruodžio"
        ];
        
        var monthIndex = date.getMonth();
        var day = date.getDate();
        var year = date.getFullYear();
        
        var valandos = date.getHours()
        var minutes = date.getMinutes()
        var sekundes = date.getSeconds()
        
        if(valandos < 10) { valandos = "0" + valandos }
        if(minutes < 10) { minutes = "0" + minutes }
        if(sekundes < 10) { sekundes = "0" + sekundes }
        
        return monthNames[monthIndex] + ' ' + day + ' ' + year + ' | ' + valandos + ":" + minutes + ":" + sekundes;
    },
    hasTeorija: function(player, callback) {
        mysqlp.query("SELECT teorija FROM zaidejai WHERE vardas = ?", [player.name], function(erroras, rezultatas) {
            if(rezultatas[0].teorija == 'true') {
                callback(true)
                return;
            }
            callback(false)
        });
    },
    hasPirktaTeorija: function(player, callback) {
        mysqlp.query("SELECT pirktateorija FROM zaidejai WHERE vardas = ?", [player.name], function(erroras, rezultatas) {
            if(rezultatas[0].pirktateorija == 'true') {
                callback(true)
                return;
            }
            callback(false)
        });
    },
    // PINIGŲ FUNKCIJOS
    hasCash: function(player, suma, callback) {
        mysqlp.query("SELECT pinigai FROM zaidejai WHERE vardas = ?", [player.name], function(erroras, rezultatas) {
            if(rezultatas[0].pinigai >= suma) {
                callback(true)
                return;
            }
            callback(false)
        });
    },
    getCash: function(player, callback) {
        mysqlp.query("SELECT * FROM zaidejai WHERE vardas = ?", [player.name], function(erroras, rezultatas) {
            callback(rezultatas[0].pinigai, rezultatas[0].banke)
        });
    },
    removeCash: function(player, suma) {
        mysqlp.query("SELECT * FROM zaidejai WHERE vardas = ?", [player.name], function(erroras, rezultatas) {
            let naujipinigai = rezultatas[0].pinigai - suma;
            mysqlp.query('UPDATE zaidejai SET pinigai = ? WHERE vardas = ?', [naujipinigai, player.name], function(error, rezult) {
                player.call("grp:naujintihud", [naujipinigai, rezultatas[0].banke])
            });
        });
    },
    addCash: function(player, suma) {
        mysqlp.query("SELECT * FROM zaidejai WHERE vardas = ?", [player.name], function(erroras, rezultatas) {
            let naujipinigai = rezultatas[0].pinigai + suma;
            mysqlp.query('UPDATE zaidejai SET pinigai = ? WHERE vardas = ?', [naujipinigai, player.name], function(error, rezult) {
                player.call("grp:naujintihud", [naujipinigai, rezultatas[0].banke])
            });
        });
    },
    arSudauzyta: function(masinosNumeriai, callback) {
        var sudauzyta = true;
        var masina;
        for(i = 0; i < mp.vehicles.length; i++) {
            if(masinosNumeriai == mp.vehicles.at(i).numberPlate) {
                sudauzyta = false;
                masina = i;
                break;
            }
        }
        callback(sudauzyta, masina)
    }
}