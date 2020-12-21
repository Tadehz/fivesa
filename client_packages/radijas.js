/* Kodas kurtas by Tadeh#0069
   Visos teisės saugomos! Bet koks bandymas naudoti kodą norint pasipelnyti yra draudžiamas! @ 2020
   Taip pat betkoks kodo viešinimas be mūsų sutikimo yra draudžiamas, net jei jį galite paprasčiausiai pamatyti savo kompiuteryje.
   Tačiau naudoti šį kodą mokslo tikslais, nėra draudžiama! */

var radijas = mp.browsers.new('package://html/radijas.html');
var grojanti = "";

// Stočių sąrašas, jog galima būtų praloopinti sukuriame array.
var stotys = [
    {stotis: "RADIO_09_HIPHOP_OLD", pavadinimas: "Radijo Centras", nuoroda: "http://84.46.205.13/rc128.mp3"},
    {stotis: "RADIO_12_REGGAE", pavadinimas: "Zip FM", nuoroda: "http://84.46.205.13/zipfm128.mp3"},
    {stotis: "RADIO_13_JAZZ", pavadinimas: "Power Hit Radio", nuoroda: "http://power-stream.tv3.lt:8000/PHR.mp3}"},
    {stotis: "RADIO_08_MEXICAN", pavadinimas: "M1", nuoroda: "http://radio.m-1.fm:80/m1/mp3"},
    {stotis: "RADIO_07_DANCE_01", pavadinimas: "M1 Plus", nuoroda: "http://radio.m-1.fm:80/m1plius/mp3"},
    {stotis: "RADIO_14_DANCE_02", pavadinimas: "European Hit Radio", nuoroda: "http://82.135.234.195:8000/ehr.mp3"}
];

mp.events.add('grp:radijas', () => {
    // Vertimo pakeitimas, šiuo atveju stočių pavadinimų pakeitimas.
    // Jog viskas būtų trumpiau naudojame loopą.
    for(var i = 0; i < stotys.length; i++) {
        // GXT - Tai failų tipas kuriuos GTA 5 naudoja kalbų palaikymui.
        mp.game.gxt.set(stotys[i].stotis, stotys[i].pavadinimas)
    }
})

mp.events.add('render', () => {
    if(mp.players.local.vehicle) /* Patikriname ar žaidėjas mašinoje, kad bereikalingai neloopinti */ {
        if(mp.players.local.vehicle.getIsEngineRunning() != 0) {
            if(mp.game.audio.getRadioStationName(mp.game.invoke('0xE8AF77C4C06ADC93')) != "OFF") /* Patikriname ar žaidėjas įjungęs radiją, kad bereikalingai neloopinti */ {
                // Praloopinam stočių array ir patikrinam ar viena iš stočių atitinka dabar grojančią
                var netinka = 0;
                for(var i = 0; i < stotys.length; i++) {
                    if(mp.game.audio.getRadioStationName(mp.game.invoke('0xE8AF77C4C06ADC93')) == stotys[i].stotis) {
                        // Patikriname ar grojančios stoties pavadinimas yra toks pat kaip įjungtos
                        if(grojanti != stotys[i].stotis) {
                            // Ne toks pat, galima išjungti seną radiją ir įjungti naują.
                            grojanti = stotys[i].stotis;
                            radijas.execute(`paleisti("${stotys[i].nuoroda}")`);
                            mp.game.invoke('0xF7F26C6E9CC9EBB8', false) // Šis kodas atlieka frontend radijo įjungimą/išjungimą
                            mp.game.audio.startAudioScene("DLC_MPHEIST_TRANSITION_TO_APT_FADE_IN_RADIO_SCENE")
                        }
                    } else {
                        // Skaičiuojame ar bent viena stotis tinka stočiai iš stotys array.
                        // Taip, tai nėra vienas iš efektyviausių būdų tai daryti, bet turimę ką turime.
                        netinka = netinka+1
                    }
                }
                // Na ir jeigu netikusių stočių yra tiek pat kiek mūsų custom stočių, išjungiam radiją, nes jau nėra įjungta nei viena iš tų custom stočių.
                if(netinka == stotys.length) {
                    grojanti = "";
                    radijas.execute(`paleisti(" ")`);
                    mp.game.invoke('0xF7F26C6E9CC9EBB8', true) // Šis kodas atlieka frontend radijo įjungimą/išjungimą
                    mp.game.audio.stopAudioScene("DLC_MPHEIST_TRANSITION_TO_APT_FADE_IN_RADIO_SCENE")
                }
            // Jeigu vis dėlto išjungta radija, tai išjungiam ir per CEF
            } else {
                // Nėra išjungta nuo pat pradžių
                if(grojanti != "") {
                    // Tada išjungiame ją visiškai
                    grojanti = ""
                    radijas.execute(`paleisti(" ")`)
                    mp.game.invoke('0xF7F26C6E9CC9EBB8', true) // Šis kodas atlieka frontend radijo įjungimą/išjungimą
                    mp.game.audio.stopAudioScene("DLC_MPHEIST_TRANSITION_TO_APT_FADE_IN_RADIO_SCENE")
                }
            }
        } else {
            // Nėra išjungta nuo pat pradžių
            if(grojanti != "") {
                // Tada išjungiame ją visiškai
                grojanti = ""
                radijas.execute(`paleisti(" ")`)
                mp.game.invoke('0xF7F26C6E9CC9EBB8', true) // Šis kodas atlieka frontend radijo įjungimą/išjungimą
                mp.game.audio.stopAudioScene("DLC_MPHEIST_TRANSITION_TO_APT_FADE_IN_RADIO_SCENE")
            }
        }
    } else {
        // Nėra išjungta nuo pat pradžių
        if(grojanti != "") {
            // Tada išjungiame ją visiškai
            grojanti = ""
            radijas.execute(`paleisti(" ")`)
            mp.game.invoke('0xF7F26C6E9CC9EBB8', true) // Šis kodas atlieka frontend radijo įjungimą/išjungimą
            mp.game.audio.stopAudioScene("DLC_MPHEIST_TRANSITION_TO_APT_FADE_IN_RADIO_SCENE")
        }
    }
});