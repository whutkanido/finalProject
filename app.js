const playerHP = document.querySelector('#pHp');
const playerMP = document.querySelector('#pMp');
const playerAttack = document.querySelector('#pAttack');
const playerMagic = document.querySelector('#pMagic');
const playerDefense = document.querySelector('#pDefense');
const playerSpeed = document.querySelector('#pSpeed');
const playerSprite = document.querySelector('#playerSprite')

const Player = {
    hp: 20,
    mp: 15,
    attack: 10,
    magic: 5,
    defense: 5,
    speed: 10 
}

playerHP.textContent = 'HP: ' + Player.hp;
playerMP.textContent = 'MP: ' + Player.mp;
playerAttack.textContent = 'ATK: ' + Player.attack;
playerMagic.textContent = 'MAG: ' + Player.magic;
playerDefense.textContent = 'DEF: ' + Player.defense;
playerSpeed.textContent = 'SPD: ' + Player.speed

// playerSprite.style.backgroundImage = 'url("https://img.itch.zone/aW1hZ2UvMTA5Njk0LzUxMDI5My5naWY=/original/MWSaBB.gif")';