let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["roigas"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'roigas', power: 5 },
  { name: 'pistoda', power: 30 },
  { name: 'sõrghaamer', power: 50 },
  { name: 'mõõk', power: 100 }
];
const monsters = [
  {
    name: "Limukas",
    level: 2,
    health: 15
  },
  {
    name: "Libahunt",
    level: 8,
    health: 60
  },
  {
    name: "Draakon",
    level: 20,
    health: 300
  }
];
const locations = [
  {
    name: "küla väljak",
    "button text": ["Mine poodi", "Mine koopasse", "Võitle draakoniga"],
    "button functions": [goStore, goCave, fightDragon],
    text: "Sa oled küla väljakul. Näed silti kus on kirjas \"Pood\"."
  },
  {
    name: "Pood",
    "button text": ["Osta 10 elu (10 kulda)", "Osta relv (30 kulda)", "Mine küla väljakule"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Sisenesid poodi."
  },
  {
    name: "Koobas",
    "button text": ["Võitle limukaga", "Võitle libahundiga", "Mine küla väljakule"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Sisenesid koopasse. Näed mõnda koletist."
  },
  {
    name: "Võitlus",
    "button text": ["Ründa", "Põikle", "Jookse linna"],
    "button functions": [attack, dodge, goTown],
    text: "Sa võitled koletisega!."
  },
  {
    name: "Koletis tapetud",
    "button text": ["Mine küla väljakule", "Mine küla väljakule", "Mine küla väljakule"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'Koletis kriiskab "Arg!" surres. Sa omandad kogemust ja leiad natuke kulda.'
  },
  {
    name: "Sa kaotasid",
    "button text": ["Mängi uuesti?", "Mängi uuesti?", "Mängi uuesti?"],
    "button functions": [restart, restart, restart],
    text: "Sa surid. &#x2620;"
  },
  { 
    name: "Sa võitsid!", 
    "button text": ["Mängi uuesti?", "Mängi uuesti?", "Mängi uuesti?"], 
    "button functions": [restart, restart, restart], 
    text: "Sa alistasid draakoni! SA VÕITSID MÄNGU! &#x1F389;" 
  },
  {
    name: "Salamäng",
    "button text": ["2", "8", "Mine küla väljakule?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "Leidsid salamängu. Vali ülalt number. Kümme numbrit loositakse suvaliselt 0-st 10-ni. Kui sinu valik ühtib ühega loositud numbritest, oled võitnud!"
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "Sul pole piisavalt kulda.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Sul on nüüd " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " Sinu arsenalis on: " + inventory;
    } else {
      text.innerText = "Sul pole piisavalt kulda.";
    }
  } else {
    text.innerText = "Sa juba omad kõige võimsamat relva!";
    button2.innerText = "Müü relv 15 kulla eest";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Sa müüsid " + currentWeapon + ".";
    text.innerText += " Sinu arsenalis on: " + inventory;
  } else {
    text.innerText = "Ära müü oma ainsat relva!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "Ärritunud " + monsters[fighting].name + " ründab.";
  text.innerText += " Tema ründamiseks on sul " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " Sa lõid mööda.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Sinu " + inventory.pop() + " puruneb.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "Jõuad põigelda kui " + monsters[fighting].name + " ründab.";
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["roigas"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "Sa valisid " + guess + ". Siin on loositud numbrid:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Õige! Sa võitsid 20 kulda!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Vale! Sa kaotasid 10 elu!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}