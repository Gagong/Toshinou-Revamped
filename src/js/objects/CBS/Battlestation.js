class Battlestation extends Movable {
  constructor(x, y, id, name, clanTag, factionId, clanDiplomacy) {
    super(x, y);
    this.id = id;
    this.name = name;
    this.clanTag = clanTag;
    this.factionId = factionId;
    this.clanDiplomacy = clanDiplomacy;
    this.modules = {};
  }

  get isEnemy() {
    return (window.hero.factionId != this.factionId && this.clanDiplomacy != 1 && this.clanDiplomacy != 2 || this.clanDiplomacy == 3);
  }
}