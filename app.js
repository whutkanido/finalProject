function randomNumBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// cache game DOM elements

const $battleText = $('div.battleText');
const $charDivs = $('div.character')

// cache player DOM elements

const $playerHP = $('li#pHp');
const $playerMP = $('li#pMp');
const $playerAttack = $('li#pAttack');
const $playerName = $('div#pName');
const $playerDefense = $('li#pDefense');
// const playerSpeed = document.querySelector('#pSpeed');
// const playerSprite = document.querySelector('#playerSprite')

// cache enemy DOM elements

const $enemyHP = $('li#eHp');
const $enemyMP = $('li#eMp');
const $enemyAttack = $('li#eAttack');
const $enemyName = $('div#eName');
const $enemyDefense = $('li#eDefense');

// Hide game buttons until game starts
$('.attackButton').hide();
$('.spellButton').hide();

class Combatant {

    constructor(
        name,
        hp,
        mp,
        attack,
        defense,
        accuracy,
        sprite
    ) {
        this.name = name
        this.hp = hp
        this.maxHp = this.hp
        this.mp = mp
        this.attack = attack
        this.defense = defense
        this.accuracy = accuracy
        this.sprite = sprite
    }
}

const names = ['Stacked Beefchad', `Chel'thor`, `Sinderwrakk`, `Stolen Soul`, `Undead Beast`,
    `Urgonn`, `Strange Skull`, `Old Fisherman`, `Uncouth Marauder`, `Vrigskull`, `Dran'zog`,
    `Terriflogg`, `Smokeskull`, `Nmemnon`, `Lost Demon`, `Tainted Nemesis`,
    `Strange Demon`, `Lost Skull`, `Unspoken Demon`, `Lord Ragnaskull`, `Lost Ghost`,
    `Strange Ghost`, `Tempest Demon`, `Strange Memory`, `Snagg`, `Grunkleskull`, `Lazaruth`]

const playerSprites = ['url("sprite/skull-chromep.png")', 'url("sprite/skull-clearp.png")', 'url("sprite/skull-icep.png")',
    'url("sprite/skull-goldp.png")', 'url("sprite/skull-lavap.png")']

const enemySprites = ['url("sprite/skull-chrome.png")', 'url("sprite/skull-clear.png")', 'url("sprite/skull-ice.png")',
    'url("sprite/skull-gold.png")', 'url("sprite/skull-lava.png")']

// const conditions = [
//     {
//         type: 'Frail',
//         effect(obj) {
//             this.hp -= 15;
//             this.attack -= 2;

//         }
//     }
// ]

// This is where global game state is tracked

const enemy = [];
const player = [];
const state = {
    playerDead: false,
    enemyDead: false,
    playerLevel: 1,
    playerXP: 0,
    bossCounter: 0
}

render = () => {
    // Populate player information into DOM
    $playerName.text(player[0].name);
    $playerHP.text('HP: ' + player[0].hp + '/' + player[0].maxHp);
    $playerMP.text('MP: ' + player[0].mp);
    $playerAttack.text('ATK: ' + player[0].attack);
    $playerDefense.text('DEF: ' + player[0].defense);
    // playerSpeed.textContent = 'SPD: ' + Player.speed
    playerSprite.style.backgroundImage = player[0].sprite;
    // $('.startButton').hide();

    // Populate enemy information into DOM

    $enemyName.text(enemy[0].name);
    $enemyHP.text('HP: ' + enemy[0].hp + '/' + enemy[0].maxHp);
    $enemyMP.text('MP: ' + enemy[0].mp);
    $enemyAttack.text('ATK: ' + enemy[0].attack);
    $enemyDefense.text('DEF: ' + enemy[0].defense);
    // playerSpeed.textContent = 'SPD: ' + Player.speed
    enemySprite.style.backgroundImage = enemy[0].sprite;

    // Update player level & XP count
    $("div.xp").text(`LVL ` + state.playerLevel + ` || EXP: ` + state.playerXP + `/500`);
}


startGame = () => {

    // Calculate player stats based on pLevel
    
    const pHp = () => {
        let i;
        i = randomNumBetween(20,40) + (state.playerLevel * 10);
        return i;
    }

    const pStat = (x,y) => {
        let i;
        i = randomNumBetween(x,y) + (state.playerLevel - 1);
        return i;
    }

    enemy.pop();
    player.pop();
    $('.attackButton').show();
    $('.spellButton').show();
    $charDivs.show();
    $battleText.empty();

    state.playerDead = false;

    // Generate a player character
    player.push(new Combatant(
        names[randomNumBetween(0, names.length - 1)],                    //NAME
        pHp(),                                        //HP
        15,                                                             //MP
        pStat(3, 9),                                          //ATK
        pStat(0, 5),                                          //DEF
        .8,                                                             //ACC
        playerSprites[randomNumBetween(0, playerSprites.length - 1)]     //SPRITE
    ))
    // $battleText.text(`Player attacks for ${player[0].attack} damage`)

    // Generate 1st enemy

    enemy.push(new Combatant(
        names[randomNumBetween(0, names.length - 1)],                    //NAME
        randomNumBetween(10, 15),                                        //HP
        0,                                                              //MP
        randomNumBetween(3, 6),                                          //ATK
        randomNumBetween(0, 2),                                          //DEF
        .7,                                                             //ACC
        enemySprites[randomNumBetween(0, enemySprites.length - 1)]       //SPRITE
    ))


    render();


}

runTurn = () => {

    // If enemy attack - player defense is negative, have the enemy still do 1 damage
    
    const eAtk = () => {
        let i = (enemy[0].attack - player[0].defense)
        if (i <= 0) {
            player[0].hp -= 1;
        } else {
            player[0].hp -= (enemy[0].attack - player[0].defense);
        }

    }
    
    // State change
    
    
    if (state.playerDead === false && state.enemyDead === false) enemy[0].hp -= (player[0].attack - enemy[0].defense);

    if (enemy[0].hp <= 0) state.enemyDead = true;

    if (state.playerDead === false && state.enemyDead === false) eAtk();

    if (player[0].hp <= 0) state.playerDead = true;

    
    // Render
    
    if (state.playerDead === false && state.enemyDead === false) {

        $battleText.text(`Player attacks for ` + (player[0].attack - enemy[0].defense) + ` damage`);
        setTimeout(function () {
            $battleText.empty();
            let dmg = (enemy[0].attack - player[0].defense);
            // diff damage display if enemy atack is less than player defense
            if (dmg > 0) {
            $battleText.text(`Enemy attacks for ` + (enemy[0].attack - player[0].defense) + ` damage`);
            } else {
                $battleText.text(`Enemy attacks for ` + 1 + ` damage`);
            }
            setTimeout(function () {
                $battleText.empty();
                render();
            }, 2000);
        }, 3000);

        // render();
    }

    if (state.playerDead === true) {
        $('.attackButton').hide();
        $('.spellButton').hide();
        $('.startButton').show();
        $charDivs.hide();
        // enemy.pop() to clear enemy state for next round
        $battleText.text(`${player[0].name} has died.  Try again with the next hero`)
    }

    if (state.enemyDead === true) {
        
        $battleText.text(`Player attacks for ` + (player[0].attack - enemy[0].defense) + ` damage`);
        setTimeout(function () {
            $battleText.empty();
            $battleText.text(`Enemy killed.  A new enemy appears!`);
            setTimeout(function () {
                $battleText.empty();
            }, 2000);
        }, 3000);
        
        enemy.pop();
        state.playerXP += 100;
        if (state.playerXP >= 500) {
            state.playerLevel += 1;
            state.playerXP = 0;
            player[0].hp += 10;
            player[0].maxHp += 10;
            player[0].attack += 1;
            player[0].defense +=1;
        }
        
        enemy.push(new Combatant(
            names[randomNumBetween(0, names.length - 1)],                    //NAME
            randomNumBetween(10, 15),                                        //HP
            0,                                                              //MP
            randomNumBetween(3, 6),                                          //ATK
            randomNumBetween(0, 2),                                          //DEF
            .7,                                                             //ACC
            enemySprites[randomNumBetween(0, enemySprites.length - 1)]       //SPRITE
        ))

        setTimeout(function () {
            render();
        }, 4000);
        
        // render()
        state.enemyDead = false;

    }


    // if both chars alive, attacks happen
    // each attack displays attack text for ~3-5 seconds before proceeding
    // after attack phase
    // after attack phase, check state
    // if both chars are alive after attacks,
    // render updated stats to DOM
    // if player is dead after attacks,
    // end current game and return to initial screen (hide attack button)
    // if enemy is dead after attacks,
    // create a new enemy and keep battle allow player to click attack again
    // render new enemy and updated player stats to DOM
}

displayText = () => {
    $battleText.text(`Player attacks for ${player[0].attack} damage`);
    setTimeout(function () {
        $battleText.empty();
        $battleText.text(`Enemy attacks for ${enemy[0].attack} damage`);
        setTimeout(function () {
            $battleText.empty();
        }, 2000);
    }, 3000);


}



$(document).on("click", ".startButton", startGame);
$(document).on("click", ".attackButton", runTurn);