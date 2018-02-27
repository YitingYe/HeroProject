class BaseChacter {
  constructor(name, hp, ap){
    this.name = name;
    this.hp = hp;
    this.maxHp = hp;
    this.ap = ap;
    this.alive = true;
  }
  attack(charcter, damage){
    if (this.alive == false){
      return;
    }
    charcter.getHurt(damage);
  }
  getHurt(damage){
    this.hp -= damage;
    if (this.hp <=0){
      this.die();
    }
  }
  die(){
    this.alive = false;
  }
}

class Hero extends BaseChacter{
  constructor(name, hp, ap){
    super(name, hp, ap);
    console.log("召喚英雄" + this.name + "!");
  }
  attack(charcter){
    var damage = Math.random() * (this.ap / 2) + (this.ap /2);
    super.attack(charcter, Math.floor(damage));
  }
}

class Monster extends BaseChacter{
  constructor(name, hp, ap){
    super(name, hp, ap);
    console.log("遇到" + this.name + "怪獸!");
  }
  attack(charcter){
    var damage = Math.random() * (this.ap / 2) + (this.ap /2);
    super.attack(charcter, Math.floor(damage));
  }
}

  var hero = new Hero("子芸", 130, 30);
  var monster = new Monster("胖胖", 130, 10);