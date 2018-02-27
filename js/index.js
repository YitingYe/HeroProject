"use strict";
// 設定原始角色屬性
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
  updateHtml(hpElement, hurtElement){
    hpElement.textContent = this.hp;
    hurtElement.style.width = (100 - this.hp / this.maxHp * 100) + "%";
  }
}
// 設定英雄屬性
class Hero extends BaseChacter{
  constructor(name, hp, ap){
    super(name, hp, ap);

    this.element = document.getElementById("hero-image-block");
    this.hpElement = document.getElementById("hero-hp");
    this.maxHpElement = document.getElementById("hero-max-hp");
    this.hurtElement = document.getElementById("hero-hp-hurt");

    this.hpElement.textContent = this.hp;
    this.maxHpElement.textContent = this.maxHp;

    console.log("召喚英雄" + this.name + "!");
  }

  attack(charcter){
    var damage = Math.random() * (this.ap / 2) + (this.ap /2);
    super.attack(charcter, Math.floor(damage));
  }

  getHurt(damage){
    super.getHurt(damage);
    this.updateHtml(this.hpElement, this.hurtElement);
  }
}
// 設定怪物屬性
class Monster extends BaseChacter{
  constructor(name, hp, ap){
    super(name, hp, ap);

    this.element = document.getElementById("monster-image-block");
    this.hpElement = document.getElementById("monster-hp");
    this.maxHpElement = document.getElementById("monster-max-hp");
    this.hurtElement = document.getElementById("monster-hp-hurt");

    this.hpElement.textContent = this.hp;
    this.maxHpElement.textContent = this.maxHp;

    console.log("遇到" + this.name + "怪獸!");
  }
  attack(charcter){
    var damage = Math.random() * (this.ap / 2) + (this.ap /2);
    super.attack(charcter, Math.floor(damage));
  }

  getHurt(damage){
    super.getHurt(damage);
    this.updateHtml(this.hpElement, this.hurtElement);
  }
}
// 設定新增技能事件
function addSkillEvent(){
  var skill = document.getElementById("skill");
  skill.onclick = function(){
    heroAttack();
  }
}
addSkillEvent();

function heroAttack(){
  document.getElementsByClassName("skill-block")[0].style.display = "none";

  setTimeout(function(){
    hero.element.classList.add("attacking");
    setTimeout(function(){
      hero.attack(monster);
      hero.element.classList.remove("attacking");
    },500)
  },100)

  setTimeout(function(){
    if(monster.alive){
      monster.element.classList.add("attacking");
      setTimeout(function(){
        monster.attack(hero);
        monster.element.classList.remove("attacking");
        endTurn();
        if (hero.alive == false){
          // game over
        }else{
          document.getElementsByClassName("skill-block")[0].style.display = "block";
        }
      },500);
    }else{
      // game over
    }
  },1100);
}

// 回合結束機制
var rounds = 10;
function endTurn(){
  rounds--;
  document.getElementById("round-num").textContent = rounds;
  if (rounds<1){
    // 遊戲結束
  }
}

var hero = new Hero("子芸", 130, 30);
var monster = new Monster("胖胖", 130, 10);