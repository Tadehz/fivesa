// Pranešimai
var pranesimai = mp.browsers.new('package://html/pranesimas.html')

// Degalinių koordinačių sąrašas
var degalines=[new mp.Vector3(49.4187,2778.793,58.043),new mp.Vector3(263.894,2606.463,44.983),new mp.Vector3(1039.958,2671.134,39.55),new mp.Vector3(1207.26,2660.175,37.899),new mp.Vector3(2539.685,2594.192,37.944),new mp.Vector3(2679.858,3263.946,55.24),new mp.Vector3(2005.055,3773.887,32.403),new mp.Vector3(1687.156,4929.392,42.078),new mp.Vector3(1701.314,6416.028,32.763),new mp.Vector3(179.857,6602.839,31.868),new mp.Vector3(-94.4619,6419.594,31.489),new mp.Vector3(-2554.996,2334.4,33.078),new mp.Vector3(-1800.375,803.661,138.651),new mp.Vector3(-1437.622,-276.747,46.207),new mp.Vector3(-2096.243,-320.286,13.168),new mp.Vector3(-724.619,-935.1631,19.213),new mp.Vector3(-526.019,-1211.003,18.184),new mp.Vector3(-70.2148,-1761.792,29.534),new mp.Vector3(265.648,-1261.309,29.292),new mp.Vector3(819.653,-1028.846,26.403),new mp.Vector3(1208.951,-1402.567,35.224),new mp.Vector3(1181.381,-330.847,69.316),new mp.Vector3(620.843,269.1,103.089),new mp.Vector3(2581.321,362.039,108.468),new mp.Vector3(176.631,-1562.025,29.263),new mp.Vector3(176.631,-1562.025,29.263),new mp.Vector3(-319.292,-1471.715,30.549),new mp.Vector3(1784.324,3330.55,41.253)];

// Pompų objektų id sąrašas
var pompos=[-2007231801,1339433404,1694452750,1933174915,-462817101,-469694731,-164877493];

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

// Pridedam į pasaulį visus degalinių iconus
for(i=0;i<degalines.length;i++)mp.blips.new(361,degalines[i],{name:"Degaline",scale:.9,color:1,shortRange:!0});

// Pagrindas degalų pilimui.
var pilamas = false;
var dujospilamos = false;
var kuraspilamas = false;
var kuro = 0;
mp.events.add('render', async () => {
	for(i = 0; i < pompos.length; i++) {
		if(mp.game.object.getClosestObjectOfType(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 2.0, pompos[i], false, false, false)) {
			let pompa = mp.game.object.getClosestObjectOfType(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 2.0, pompos[i], false, false, false);
			let pozicija = mp.game.invokeVector3('0x3FEF770D40960D5A', pompa)
			let masina = mp.vehicles.getClosest(new mp.Vector3(pozicija.x, pozicija.y, pozicija.z));
			if(masina) {
				if(mp.game.system.vdist2(masina.position.x, masina.position.y, masina.position.z, pozicija.x, pozicija.y, pozicija.z) < 40) {
					if(mp.players.local.vehicle) {
						Draw3DText(pozicija.x, pozicija.y, pozicija.z+1, "Išlipkite iš ~y~tr. priemones~s~!")
					} else {
						if(pilamas == false) {
							if(masina.getVariable('dujos') != -1) {
								Draw3DText(pozicija.x, pozicija.y, pozicija.z+1, "Spauskite ~y~E ~s~norint pilti kurą!")
								Draw3DText(pozicija.x, pozicija.y, pozicija.z+1-0.09, "Spauskite ~b~G ~s~norint pilti dujas!")
								Draw3DText(pozicija.x, pozicija.y, pozicija.z+1-0.18, "Kaina ~g~2€/l ~s~| ~b~1€/%")
							} else {
								Draw3DText(pozicija.x, pozicija.y, pozicija.z+1, "Spauskite ~y~E ~s~norint pilti kurą!")
								Draw3DText(pozicija.x, pozicija.y, pozicija.z+1-0.09, "Kaina ~g~2€/l")
							}
						} else {
							if(dujospilamos == false) {
								if(typeof pildymas == 'undefined') {
									mp.events.callRemote("grp:gautipiniguspilimui", masina.remoteId)
								}
								Draw3DText(pozicija.x, pozicija.y, pozicija.z+1, "Spauskite ~r~E ~s~norint sustabdyti pilimą!")
								Draw3DText(pozicija.x, pozicija.y, pozicija.z+1-0.09, `Ipilta: ~y~${kuro + Math.floor(masina.getVariable('kuras'))}/${masina.getVariable('maxkuras')}L`)
								Draw3DText(pozicija.x, pozicija.y, pozicija.z+1-0.18, `Kaina: ~g~${kuro*2}€`)	
							} else {
								if(typeof pildymas == 'undefined') {
									mp.events.callRemote("grp:gautipinigusdujupilimui", masina.remoteId)
								}
								Draw3DText(pozicija.x, pozicija.y, pozicija.z+1, "Spauskite ~b~G ~s~norint sustabdyti pilimą!")
								Draw3DText(pozicija.x, pozicija.y, pozicija.z+1-0.09, `Ipilta: ~y~${kuro + Math.floor(masina.getVariable('dujos'))}/100%`)
								Draw3DText(pozicija.x, pozicija.y, pozicija.z+1-0.18, `Kaina: ~g~${kuro}€`)
							}
						}
						if(mp.game.controls.isControlJustReleased(0, 38)) {
							if(dujospilamos == false) {
								if(mp.game.system.vdist2(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, masina.position.x, masina.position.y, masina.position.z) < 7) {
									if(Math.floor(masina.getVariable('kuras')) != masina.getVariable('maxkuras')) {
										mp.events.callRemote("grp:tikrintipinigusdegalinei", masina.remoteId)
									} else {
										pranesimai.execute(`pranesimas("klaida", "Automobilio bakas jau yra pilnas!", 2000)`)
									}
								} else {
									pranesimai.execute(`pranesimas("klaida", "Jūs esate per toli nuo automobilio!", 2000)`)
								}
							}
						}
						if(mp.game.controls.isControlJustReleased(0, 47)) {
							if(kuraspilamas == false) {
								if(masina.getVariable('dujos') != -1) {
									if(mp.game.system.vdist2(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, masina.position.x, masina.position.y, masina.position.z) < 7) {
										if(Math.floor(masina.getVariable('dujos')) != 100) {
											mp.events.callRemote("grp:tikrintipinigusdujom", masina.remoteId)
										} else {
											pranesimai.execute(`pranesimas("klaida", "Automobilio dujų bakas jau yra pilnas!", 2000)`)
										}
									} else {
										pranesimai.execute(`pranesimas("klaida", "Jūs esate per toli nuo automobilio!", 2000)`)
									}
								}
							}
						}
					}
				} else {
					Draw3DText(pozicija.x, pozicija.y, pozicija.z+1, "Pastatykite automobili šalia ~y~degalu stoteles!")
					Draw3DText(pozicija.x, pozicija.y, pozicija.z+1-0.09, "~r~Automobilis per toli arba jo nera!")
				}
			} else {
				Draw3DText(pozicija.x, pozicija.y, pozicija.z+1, "Pastatykite automobili šalia ~y~degalu stoteles!")
				Draw3DText(pozicija.x, pozicija.y, pozicija.z+1-0.09, "~r~Automobilis per toli arba jo nera!")
			}
		}
	}
})

mp.events.add('grp:pilimas', (pinigai, masina) => {
	if(pinigai > 1) {
		if(kuraspilamas == false) {
			// Animacija visiem žaidėjam
			mp.events.callRemote("grp:animacija", "timetable@gardener@filling_can", "gar_ig_5_filling_can", 1, 50)
			pranesimai.execute(`pranesimas("tinka", "Pradėjote pilti kurą į <span style='color:#06cf0d'>${mp.game.ui.getLabelText(mp.game.vehicle.getDisplayNameFromVehicleModel(mp.vehicles.atRemoteId(masina).model))}</span>, informaciją pamatysite prie stotelės!", 5000)`)
			mp.players.local.freezePosition(true);
			mp.players.local.taskTurnToFace(mp.vehicles.atRemoteId(masina).handle, 1000)

			for(i = 0; i < pompos.length; i++) {
				var pompa = mp.game.object.getClosestObjectOfType(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 2.0, pompos[i], false, false, false);
				var pozicija = mp.game.invokeVector3('0x3FEF770D40960D5A', pompa)
			}

			objektas = mp.game.object.createObject(mp.game.joaat("prop_cs_fuel_nozle"), mp.players.local.getBoneCoords(28422, 0.0, 0.0, 0.0).x, mp.players.local.getBoneCoords(28422, 0.0, 0.0, 0.0).y, mp.players.local.getBoneCoords(28422, 0.0, 0.0, 0.0).z, false, false, false)

			virve = mp.game.rope.addRope(pozicija.x, pozicija.y, pozicija.z, 0.0, 0.0, 0.0, 20.0, 4, 20.0, 1.0, 0.0, false, false, false, 5.0, false, 0)
			let objektopozicija = mp.game.invokeVector3('0x3FEF770D40960D5A', objektas)
			mp.game.rope.attachRopeToEntity(virve, objektas, objektopozicija.x, objektopozicija.y, objektopozicija.z, false)

			pilamas = true;
			kuraspilamas = true;
		} else {
			mp.game.object.deleteObject(objektas)
			mp.game.rope.deleteRope(virve)

			mp.events.callRemote("grp:animacija", "baigti", "baigti", 0, 0)
			pranesimai.execute(`pranesimas("tinka", "Baigėte pilti kurą, įpilta: <span style='color:#06cf0d'>${kuro} L.</span> už <span style='color:#06cf0d'>${kuro*2}€</span>!", 5000)`)
			mp.players.local.freezePosition(false);
			mp.events.callRemote('grp:nustatytikura', mp.vehicles.atRemoteId(masina), mp.vehicles.atRemoteId(masina).getVariable('kuras') + kuro)
			mp.events.callRemote('removeCash', kuro * 2)
			clearInterval(pildymas)
			delete pildymas;
			pilamas = false;
			kuraspilamas = false;
			kuro = 0;
		}
	} else {
		pranesimai.execute(`pranesimas("klaida", "Norint pilti kurą turite turėti nors <span style='color:#06cf0d'>2€</span>!", 2000)`)
	}
})

mp.events.add('grp:pilimopinigai', (rankose, masina) => {
	if(typeof pildymas == 'undefined') {
		pildymas = setInterval(() => {
			if(Math.floor(mp.vehicles.atRemoteId(masina).getVariable('kuras') + kuro) < mp.vehicles.atRemoteId(masina).getVariable('maxkuras')) {
				if(mp.game.system.vdist2(mp.vehicles.atRemoteId(masina).position.x, mp.vehicles.atRemoteId(masina).position.y, mp.vehicles.atRemoteId(masina).position.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z) < 40) {
					if(rankose > kuro*2) {
						kuro = kuro + 1
					} else {
						mp.events.callRemote("grp:animacija", "baigti", "baigti", 0, 0)
						pranesimai.execute(`pranesimas("tinka", "Baigėte pilti kurą, įpilta: <span style='color:#06cf0d'>${kuro} L.</span> už <span style='color:#06cf0d'>${kuro*2}€</span>!", 5000)`)
						mp.players.local.freezePosition(false);
						mp.events.callRemote('grp:nustatytikura', mp.vehicles.atRemoteId(masina), mp.vehicles.atRemoteId(masina).getVariable('kuras') + kuro)
						mp.events.callRemote('removeCash', kuro * 2)
						clearInterval(pildymas)
						delete pildymas;
						pilamas = false;
						kuraspilamas = false;
						kuro = 0;
					}
				} else {
					mp.events.callRemote("grp:animacija", "baigti", "baigti", 0, 0)
					pranesimai.execute(`pranesimas("tinka", "Baigėte pilti kurą, įpilta: <span style='color:#06cf0d'>${kuro} L.</span> už <span style='color:#06cf0d'>${kuro*2}€</span>!", 5000)`)
					mp.players.local.freezePosition(false);
					mp.events.callRemote('grp:nustatytikura', mp.vehicles.atRemoteId(masina), mp.vehicles.atRemoteId(masina).getVariable('kuras') + kuro)
					mp.events.callRemote('removeCash', kuro * 2)
					clearInterval(pildymas)
					delete pildymas;
					pilamas = false;
					kuraspilamas = false;
					kuro = 0;
				}
			} else {
				mp.events.callRemote("grp:animacija", "baigti", "baigti", 0, 0)
				pranesimai.execute(`pranesimas("tinka", "Baigėte pilti kurą, įpilta: <span style='color:#06cf0d'>${kuro} L.</span> už <span style='color:#06cf0d'>${kuro*2}€</span>!", 5000)`)
				mp.players.local.freezePosition(false);
				mp.events.callRemote('grp:nustatytikura', mp.vehicles.atRemoteId(masina), mp.vehicles.atRemoteId(masina).getVariable('kuras') + kuro)
				mp.events.callRemote('removeCash', kuro * 2)
				clearInterval(pildymas)
				delete pildymas;
				pilamas = false;
				kuraspilamas = false;
				kuro = 0;
			}
		}, 500);
	}
})

mp.events.add('grp:dujupilimas', (pinigai, masina) => {
	if(pinigai > 1) {
		if(dujospilamos == false) {
			// Animacija visiem žaidėjam
			mp.events.callRemote("grp:animacija", "timetable@gardener@filling_can", "gar_ig_5_filling_can", 1, 50)
			pranesimai.execute(`pranesimas("tinka", "Pradėjote pilti dujas į <span style='color:#06cf0d'>${mp.game.ui.getLabelText(mp.game.vehicle.getDisplayNameFromVehicleModel(mp.vehicles.atRemoteId(masina).model))}</span>, informaciją pamatysite prie stotelės!", 5000)`)
			mp.players.local.freezePosition(true);
			mp.players.local.taskTurnToFace(mp.vehicles.atRemoteId(masina).handle, 1000)
			pilamas = true;
			dujospilamos = true;
		} else {
			mp.events.callRemote("grp:animacija", "baigti", "baigti", 0, 0)
			pranesimai.execute(`pranesimas("tinka", "Baigėte pilti dujas, įpilta: <span style='color:#06cf0d'>${kuro}%</span> už <span style='color:#06cf0d'>${kuro}€</span>!", 5000)`)
			mp.players.local.freezePosition(false);
			mp.events.callRemote('grp:nustatytidujas', mp.vehicles.atRemoteId(masina), mp.vehicles.atRemoteId(masina).getVariable('dujos') + kuro)
			mp.events.callRemote('removeCash', kuro)
			clearInterval(pildymas)
			delete pildymas;
			pilamas = false;
			dujospilamos = false;
			kuro = 0;
		}
	} else {
		pranesimai.execute(`pranesimas("klaida", "Norint pilti dujas turite turėti nors <span style='color:#06cf0d'>2€</span>!", 2000)`)
	}
})

mp.events.add('grp:dujupilimopinigai', (rankose, masina) => {
	if(typeof pildymas == 'undefined') {
		pildymas = setInterval(() => {
			if(Math.floor(mp.vehicles.atRemoteId(masina).getVariable('dujos') + kuro) < 100) {
				if(mp.game.system.vdist2(mp.vehicles.atRemoteId(masina).position.x, mp.vehicles.atRemoteId(masina).position.y, mp.vehicles.atRemoteId(masina).position.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z) < 40) {
					if(rankose > kuro) {
						kuro = kuro + 1
					} else {
						mp.events.callRemote("grp:animacija", "baigti", "baigti", 0, 0)
						pranesimai.execute(`pranesimas("tinka", "Baigėte pilti dujas, įpilta: <span style='color:#06cf0d'>${kuro}%</span> už <span style='color:#06cf0d'>${kuro}€</span>!", 5000)`)
						mp.players.local.freezePosition(false);
						mp.events.callRemote('grp:nustatytidujas', mp.vehicles.atRemoteId(masina), mp.vehicles.atRemoteId(masina).getVariable('dujos') + kuro)
						mp.events.callRemote('removeCash', kuro)
						clearInterval(pildymas)
						delete pildymas;
						pilamas = false;
						dujospilamos = false;
						kuro = 0;
					}
				} else {
					mp.events.callRemote("grp:animacija", "baigti", "baigti", 0, 0)
					pranesimai.execute(`pranesimas("tinka", "Baigėte pilti dujas, įpilta: <span style='color:#06cf0d'>${kuro}%</span> už <span style='color:#06cf0d'>${kuro}€</span>!", 5000)`)
					mp.players.local.freezePosition(false);
					mp.events.callRemote('grp:nustatytidujas', mp.vehicles.atRemoteId(masina), mp.vehicles.atRemoteId(masina).getVariable('dujos') + kuro)
					mp.events.callRemote('removeCash', kuro)
					clearInterval(pildymas)
					delete pildymas;
					pilamas = false;
					dujospilamos = false;
					kuro = 0;
				}
			} else {
				mp.events.callRemote("grp:animacija", "baigti", "baigti", 0, 0)
				pranesimai.execute(`pranesimas("tinka", "Baigėte pilti dujas, įpilta: <span style='color:#06cf0d'>${kuro}%</span> už <span style='color:#06cf0d'>${kuro}€</span>!", 5000)`)
				mp.players.local.freezePosition(false);
				mp.events.callRemote('grp:nustatytidujas', mp.vehicles.atRemoteId(masina), mp.vehicles.atRemoteId(masina).getVariable('dujos') + kuro)
				mp.events.callRemote('removeCash', kuro)
				clearInterval(pildymas)
				delete pildymas;
				pilamas = false;
				dujospilamos = false;
				kuro = 0;
			}
		}, 500);
	}
})