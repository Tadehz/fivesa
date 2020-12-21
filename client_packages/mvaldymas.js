// Number with Commas function by Kerry [Simplified by someone else lol]
function skaiciausFormatas(skaicius) {
    return skaicius.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

mp.events.add('grp:mvaldymas', (pavadinimas, modelis, numeriai, uzrakinta, maxkuras, kuras, bukle, dujos, spalva, variklis) => {
    mvaldymas = mp.browsers.new('package://html/mvaldymas.html');
    mvaldymas.execute(`valdymas("${pavadinimas}", "${modelis}", "${numeriai}", "${uzrakinta}", "${parseInt(maxkuras)}", "${parseInt(kuras)}", "${parseInt(bukle)}", "${parseInt(dujos)}", "${parseInt(spalva)}", "${parseInt(variklis)}")`)

    mp.gui.cursor.visible = true;
    mp.gui.chat.activate(false);
});

mp.events.add('grp:matsaukti', () => {
    mvaldymas.destroy();
    
    setTimeout(() => {
        mp.gui.cursor.visible = false;
        mp.gui.chat.activate(true);
    }, 100);
});

mp.events.add('grp:atsauktisutikima', () => {
    mvaldymas.destroy();
    
    setTimeout(() => {
        mp.gui.cursor.visible = false;
        mp.gui.chat.activate(true);
    }, 100);
});

mp.events.add('grp:mzemelapis', () => {
    mp.events.callRemote("grp:smzemelapis");

    mvaldymas.destroy();
    mp.gui.cursor.visible = false;
    mp.gui.chat.activate(true);
});

mp.events.add('grp:mparduoti', (modelis) => {
    for(i = 0; i < masinos.length; i++) {
        if(masinos[i].model == modelis) {
            pardavimomenu = mp.browsers.new('package://html/sutikimas.html')
            pardavimomenu.execute(`patvirtinimas("Pardavimas", 'Ar tikrai norite parduoti <span style="color:#16db2a">${masinos[i].name}</span> už <span style="color:#16db2a">${skaiciausFormatas(masinos[i].pardavimokaina)}€</span>?', "grp:mpardavimas")`)

            mvaldymas.destroy();
        }
    }
});

mp.events.add('grp:mpardavimas', (atsakymas) => {
    if(atsakymas != "close") {
        mp.events.callRemote("grp:smpardavimas")
        pardavimomenu.destroy();
        mp.gui.cursor.visible = false;
        mp.gui.chat.activate(true);
    } else {
        pardavimomenu.destroy();
        mp.gui.cursor.visible = false;
        mp.gui.chat.activate(true);
    }
})

mp.events.add('grp:misspirti', () => {
    mp.events.callRemote("grp:smisspirti");

    mvaldymas.destroy();
    mp.gui.cursor.visible = false;
    mp.gui.chat.activate(true);
});

mp.events.add('grp:mremontuoti', () => {
    mp.events.callRemote("grp:smremontas");

    mvaldymas.destroy();
    mp.gui.cursor.visible = false;
    mp.gui.chat.activate(true);
});

mp.events.add('grp:mkelti', () => {
    mp.events.callRemote("grp:smkelimas");

    mvaldymas.destroy();
    mp.gui.cursor.visible = false;
    mp.gui.chat.activate(true);
});

mp.events.add('grp:mvariklis', () => {
    mp.events.callRemote("grp:smvariklis");

    mvaldymas.destroy();
    mp.gui.cursor.visible = false;
    mp.gui.chat.activate(true);
});

mp.events.add('grp:mraktas', () => {
    mp.events.callRemote("grp:smuzraktas");

    mvaldymas.destroy();
    mp.gui.cursor.visible = false;
    mp.gui.chat.activate(true);
});

/*mp.events.add('grp:mvariklis', () => {
    mp.events.callRemote("grp:smkelimas");

    mvaldymas.destroy();
    mp.gui.cursor.visible = false;
    mp.gui.chat.activate(true);
});*/