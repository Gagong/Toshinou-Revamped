class NpcSettingsWindow {
  createWindow() {
    this.npcSettingsWindow = WindowFactory.createWindow({
      width: 320,
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
      "-=[ Devourer ]=- ζ25",
      "-=[ Devourer ]=- ζ27",
      "-={ demaNeR Escort }=-",
      "-={ Demaner Corsair }=-",
      "-={ demaNeR Freighter }=-",
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
      "-=[ Referee-Bot ]=-",
      "<=< Icy >=>",
      "<=< Ice Meteoroid >=>",
      "<=< Super Ice Meteoroid >=>",
      "-=[ Skoll ]=-",
      "<=< Skoll's Icy >=>",
      "-=[ Santa -1100101 ]=-",
      "<=< Gygerthrall >=>",
      "<=< Blighted Gygerthrall >=>",
      "-=[ Blighted Kristallon ]=-",
      "<=< Plagued Gygerthrall >=>",
      "-=[ Plagued Kristallin ]=-",
      "-=[ Plague Rocket ]=-"
    ];
  }
}