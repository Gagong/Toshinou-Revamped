/*
Created by Freshek on 11.11.2017
*/

class NpcSettingsWindow {
  createWindow() {
    this.npcSettingsWindow = WindowFactory.createWindow({
      width: 300,
      maxHeight: 300,
      text: "Exclude NPC to attack"
    });

    let controls = [];

    this.knownNpcList.forEach((n, i) => {

      controls.push({
        name: `npc${i}`,
        labelText: n,
        appendTo: this.npcSettingsWindow,
        event: function () {
          window.settings.setNpc(n, this.checked);
        }
      });

    });


    controls.forEach((control) => {
      this[control.name] = ControlFactory.createControl(control);
    });
  }

  get knownNpcList() {
    return [
      "-=[ Streuner ]=-",
      "-=[ Aider Streuner ]=-",
      "-=[ Recruit Streuner ]=-",
      "-=[ Lordakia ]=-",
      "-=[ Devolarium ]=-",
      "-=[ Mordon ]=-",
      "-=[ Sibelon ]=-",
      "-=[ Saimon ]=-",
      "-=[ Lordakium ]=-",
      "-=[ Sibelonit ]=-",
      "-=[ Kristallin ]=-",
      "-=[ Kristallon ]=-",
      "-=[ StreuneR ]=-",
      "-=[ Protegit ]=-",
      "-=[ Cubikon ]=-",
      "-=[ Interceptor ]=-",
      "-=[ Barracuda ]=-",
      "-=[ Saboteur ]=-",
      "-=[ Annihilator ]=-",
      "-=[ Battleray ]=-",
      "-=[ Infernal ]=-",
      "-=[ Scorcher ]=-",
      "-=[ Melter ]=-",
      "-=[ Devourer ]=-",
      "..::{ Boss Streuner }::..",
      "..::{ Boss Lordakia }::..",
      "..::{ Boss Mordon }::..",
      "..::{ Boss Saimon }::..",
      "..::{ Boss Devolarium }::..",
      "..::{ Boss Sibelonit }::..",
      "..::{ Boss Sibelon }::..",
      "..::{ Boss Lordakium }::...",
      "..::{ Boss Kristallin }::..",
      "..::{ Boss Kristallon }::..",
      "..::{ Boss StreuneR }::..",
      "{{{ ::: UFO ::: }}}",
      "-=[ UFONIT ]=-",
      "( UberStreuner )",
      "( UberLordakia )",
      "( UberMordon )",
      "( UberSaimon )",
      "( UberDevolarium )",
      "( UberSibelonit )",
      "( UberSibelon )",
      "( UberLordakium )",
      "( UberKristallin )",
      "( UberKristallon )",
      "( UberStreuneR )",
      "( Uber Interceptor )",
      "( Uber Barracuda )",
      "( Uber Saboteur )",
      "( Uber Annihilator )",
      "( Uber Battleray )",
      "-={ demaNeR }=-",
      "<=< Kucurbium >=>",
      "<=< BossKucurbium >=>",
      "-=[ Vagrant ]=-",
      "-=[ Marauder ]=-",
      "-=[ Outcast ]=-",
      "-=[ Corsair ]=-",
      "-=[ Hooligan ]=-",
      "-=[ Ravager ]=-",
      "-=[ Convict ]=-",
      "GG-=[ Century Falcon ]=-",
      "GG-=[ Vagrant ]=-",
      "GG-=[ Marauder ]=-",
      "GG-=[ Outcast ]=-",
      "GG-=[ Corsair ]=-",
      "GG-=[ Hooligan ]=-",
      "GG-=[ Ravager ]=-",
      "GG-=[ Convict ]=-",
      "-=[ Deadly Battleray ]=-",
      "-=[ Century Falcon ]=-",
      "-=[ Hitac-Minion ]=-",
      "-=[ Hitac 2.0 ]=-",
      "-=[ Protekid ]=-",
      "-=[ Cubikid ]=-",
      "-=[ Emperor Sibelon ]=-",
      "-=[ Emperor Lordakium ]=-",
      "-=[ Emperor Kristallon ]=-",
      "-=[ Referee-Bot ]=-",
      "<=< Icy >=>",
      "<=< Ice Meteoroid >=>",
      "<=< Super Ice Meteoroid >=>",
      "-=[ Skoll ]=-",
      "<=< Skoll's Icy >=>",
      "-=[ Santa -1100101 ]=-",
      "-=[ Demon Drone ]=-",
      "-=[ I-Hitac ]=-",
      "-=[ I-Egg ]=-",
      "-=[ I-Gygerthrall ]=-",
      "<=< Gygerthrall >=>",
      "<=< Viral Gygerthrall >=>",
      "-=[ Viral Kristallon ]=-",
      "<=< Blighted Gygerthrall >=>",
      "-=[ Blighted Kristallon ]=-",
      "<=< Plagued Gygerthrall >=>",
      "-=[ Plagued Kristallin ]=-",
      "-=[ Seeker Rocket ]=-",
      "-=[ Plague Rocket ]=-",
      "-=[P.E.T. Scout]=-",
      "-=[P.E.T. Decoy]=-",
      "-=[P.E.T. Raider]=-",
      "-=[P.E.T. Mercenary]=-",
      "-=[P.E.T. Medic]=-",
      "-=[P.E.T. Soldier]=-",
      "-=[P.E.T. Engineer]=-",
      "-=[P.E.T. Vanguard]=-",
      "-=[P.E.T. Infiltrator]=-",
      "-=[P.E.T. Destroyer]=-",
      "-=[P.E.T. Commander]=-",
      "-=[P.E.T. Stalker]=-",
      "-=[P.E.T. Berserker]=-",
      "-=[P.E.T. Pack Leader]=-",
      "-=[P.E.T. Veteran]=-",
      "-=[P.E.T. Alpha]=-",
      "-=[ Streuner Emperor ]=-",
      "-=[ Streuner Turret ]=-",
      "-=[ Streuner Specialist ]=-",
      "-=[ Streuner Soldier ]=-",
      "-=[ Streuner Rocketeer ]=-",
      "-=[ Devourer ]=- ζ25",
      "-=[ Devourer ]=- ζ27",
      "-={ demaNeR Freighter }=-",
      "-={ demaNeR Escort }=-",
      "-={ Demaner Corsair }=-"
    ];
  }
}