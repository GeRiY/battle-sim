export default class Solider {
  death = false;
  movesCount = 0;
  attacksCount = 0;
  constructor(config) {
    this.id = config.id;
    this.name = config.name;
    this.health = config.health;

    this.x = config.x;
    this.y = config.y;
    this.teamId = config.teamId;
    this.agility = Math.round(Math.random() * 100)
    this.power = Math.round(Math.random() * 100)
    this.defense = Math.round(Math.random() * 100)
    this.class = 'SWORDMAN';
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
    this.movesCount++;
  }

  attack(target) {
    if (this.power < target.defense) {
      target.health -= 5;
      this.attacksCount++;
      if (target.health <= 0) {
        target.death = true;
      }
    } else {
      target.health -= 10;
      this.attacksCount++;
      if (target.health <= 0) {
        target.death = true;
      }
    }
    return target;
  }
}
