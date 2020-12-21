var funkcijos = require('./funkcijos.js')
var mysql = require('mysql');
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/\\+\\+[++^A-Za-z0-9+/=]/g, "");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

var mysqlp = mysql.createConnection({
    host: 'ip',
    user: 'useris',
    password: 'slaptazodis',
    database: 'db'
});

mp.events.add('playerQuit', (player) => {
    if(!player.getVariable('gide')) {
        if(player.getVariable('prisijunges')) {
            mysqlp.query('UPDATE zaidejai SET lokacija = ?, gyvybes = ?, sarvai = ? WHERE vardas = ?', [`{"x":${player.position.x},"y":${player.position.y},"z":${player.position.z},"h":${player.heading}}`, player.health, player.armour, player.name])
        }
    } else {
        mysqlp.query('UPDATE zaidejai SET lokacija = ?, gyvybes = ?, sarvai = ? WHERE vardas = ?', [`{"x":118.7213,"y":6834.684,"z":16.4433,"h":160.0}`, player.health, player.armour, player.name])
    }
});

mp.events.add('playerReady', (player) => {
    player.call('grp:kamera')
    //player.dimension = Math.floor(Math.random() * 999999999);
    player.setVariable("prisijunges", false)
    player.alpha = 0;
    setTimeout(() => {
        funkcijos.tikrintinick(player)
    }, 1000);
});

mp.events.add('grp:slaptazodis', (player, slaptazodis) => {
    mysqlp.query('SELECT * from zaidejai WHERE vardas = ?', [player.name], function(klaida, rezultatas) {
        if(rezultatas.length > 0) {
            if(slaptazodis == Base64.decode(rezultatas[0].slaptazodis)) {
                for(i = 0; i < 10; i++) {
                    player.outputChatBox(`‏‏‎ ‎`)
                }
                player.outputChatBox(`Paskutinio prisijungimo IP: !{#e6b000}${rezultatas[0].paskutinisip}`)
                player.outputChatBox(`Paskutinio prisijungimo data: !{#e6b000}${rezultatas[0].data}`)
                player.outputChatBox(`!{#06c927}Sėkmingai prisijungėte! Gero žaidimo!`)
                // Prijungiam
                player.setVariable("prisijunges", true)
                player.call("grp:prisijungta", [`${rezultatas[0].lokacija}`])
                //Išsaugom ip ir prisijungimą paskutinį.
                mysqlp.query("UPDATE zaidejai SET data = ?, paskutinisip = ? WHERE vardas = ?", [funkcijos.formatdate(new Date()), player.ip, player.name], function() {
                    console.log(player.name + " prisijungė su IP " + player.ip)
                });
                // Mašiną atsponinam
                mysqlp.query('SELECT * from masinos WHERE savininkas = ?', [player.name], function(klaida, rezultatas2) {
                    if(rezultatas2.length > 0) {
                        if(parseInt(rezultatas2[0].bukle) != 0) {
                            let lokacija = JSON.parse(rezultatas2[0].lokacija)
                            let masina = mp.vehicles.new(mp.joaat(rezultatas2[0].modelis), new mp.Vector3(-10000, -10000, -10000), {
                                numberPlate: rezultatas2[0].numeriai,
                                color: [[255, 255, 255], [255, 255, 255]],
                                heading: lokacija.h
                            });
                            masina.setColor(parseInt(rezultatas2[0].spalva), parseInt(rezultatas2[0].spalva))
                            masina.setMod(11, parseInt(rezultatas2[0].variklis));
                            masina.setVariable('dujos', parseInt(rezultatas2[0].dujos))
                            masina.setVariable('kuras', parseInt(rezultatas2[0].kuras))
                            masina.setVariable('maxkuras', parseInt(rezultatas2[0].maxkuras))
                            masina.setVariable('bukle', parseInt(rezultatas2[0].bukle) * 10)
                            masina.setVariable('variklis', JSON.parse(rezultatas2[0].varikliostatusas));
                            masina.setVariable('uzrakinta', JSON.parse(rezultatas2[0].uzrakinta));
                            masina.setVariable('rida', rezultatas2[0].rida)
                            setTimeout(() => {
                                masina.position = new mp.Vector3(lokacija.x, lokacija.y, lokacija.z);
                            }, 100);
                        }
                    }
                });
            } else {
                player.outputChatBox(`!{#c70619}Slaptažodis neteisingas!`)
                player.call('grp:netinka')
            }
        } else {
            mysqlp.query("INSERT INTO zaidejai SET vardas = ?, slaptazodis = ?, rangas = ?, pinigai = ?, banke = ?, data = ?, paskutinisip = ?, lokacija = ?, gyvybes = ?, sarvai = ?, pirktateorija, teorija, praktika, bkategorija, akategorija, ckategorija", [player.name, Base64.encode(slaptazodis), 'Paprastas narys', 10000, 0, funkcijos.formatdate(new Date()), player.ip, '{"x":118.7213,"y":6834.684,"z":16.4433,"h":160.0}', player.health, player.armour, 'false', 'false', 'false', 'false', 'false', 'false'], function() {
                for(i = 0; i < 10; i++) {
                    player.outputChatBox(`‏‏‎ ‎`)
                }
                player.outputChatBox(`Slaptažodis: !{#06c927}${slaptazodis}.`)
                player.outputChatBox(`<s>----------------------</s>`)
                player.outputChatBox(`!{#06c927}Sėkmingai prisiregistravote! Gero žaidimo!`)
                player.outputChatBox(`Dabar aprodysime miestą bei pravesime jums mini gidą.`)
                player.outputChatBox(`Ačiū, jog pasirinkote mūsų projektą!`)
                // Prireginam
                player.call("grp:prisiregistruota")
                player.setVariable('gide', true)
            });
        }
    });
});

mp.events.add('grp:baigtasgidas', (player) => {
    function callback(cash, bank) {
        player.call("grp:hud", [cash, bank])
    }
    funkcijos.getCash(player, callback)
    
    mysqlp.query('SELECT * from zaidejai WHERE vardas = ?', [player.name], function(klaida, rezultatas) {
        player.health = rezultatas[0].gyvybes
        player.armour = rezultatas[0].sarvai
    });

    player.alpha = 255;
    player.setVariable('prisijunges', true)
    player.setVariable('gide', false);
});