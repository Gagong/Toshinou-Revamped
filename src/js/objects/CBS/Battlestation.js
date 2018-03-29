class Battlestation extends Movable {
  constructor(x, y, id, name, clanTag, factionId) {
    super(x, y);
    this.id = id;
    this.name = name;
    this.clanTag = clanTag;
    this.factionId = factionId;
    this.modules = {};
  }
}
