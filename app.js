function randomNumBetween(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
} 

// cache game DOM elements

const $battleText = $('div.battleText');

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

const names = ['Stacked Beefchad',`Chel'thor the Dominant`,`Sinderwrakk`,`Stolen Soul`,`Undead Beast`,
                `Urgonn`,`Strange Skull`,`Old Fisherman`, `Uncouth Marauder`, `Vrigskull`,`Zon Pan'zog`,
                `Terriflogg`, `Smokeskull`, `Chitinbear the Skull`, `Lost Demon`, `Placid Ghost`,
                `Strange Demon`, `Lost Skull`, `Unspoken Demon`,`Lord Ragnaskull`, `Lost Ghost`,
                `Strange Ghost`, `Tempest Demon`, `Strange Memory`, `Snagg`,`Grunkleskull`,`The Last Skullord`]

const playerSprites = ['url("sprite/skull-chromep.png")','url("sprite/skull-clearp.png")','url("sprite/skull-icep.png")',
                        'url("sprite/skull-goldp.png")','url("sprite/skull-lavap.png")']

const enemySprites = ['url("sprite/skull-chrome.png")','url("sprite/skull-clear.png")','url("sprite/skull-ice.png")',
'url("sprite/skull-gold.png")','url("sprite/skull-lava.png")']

// const conditions = [
//     {
//         type: 'Frail',
//         effect(obj) {
//             this.hp -= 15;
//             this.attack -= 2;

//         }
//     }
// ]

const enemy = [];
const player = [];
const state = {
    playerDead: false,
    enemyDead: false
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
}


startGame = () => {
    
    enemy.pop();
    player.pop();
    $('.attackButton').show();
    $('.spellButton').show();

    // Generate a player character
    player.push(new Combatant(
        names[randomNumBetween(0,names.length - 1)],                    //NAME
        randomNumBetween(30,50),                                        //HP
        15,                                                             //MP
        randomNumBetween(3,9),                                          //ATK
        randomNumBetween(0,5),                                          //DEF
        .8,                                                             //ACC
        playerSprites[randomNumBetween(0,playerSprites.length - 1)]     //SPRITE
    ))
    // $battleText.text(`Player attacks for ${player[0].attack} damage`)

    // Generate 1st enemy
    
    enemy.push(new Combatant(
        names[randomNumBetween(0,names.length - 1)],                    //NAME
        randomNumBetween(10,15),                                        //HP
        0,                                                              //MP
        randomNumBetween(3,9),                                          //ATK
        randomNumBetween(0,2),                                          //DEF
        .7,                                                             //ACC
        enemySprites[randomNumBetween(0,enemySprites.length - 1)]       //SPRITE
    ))

    
    render();
   

}

runTurn = () => {
    if (state.playerDead === false && state.enemyDead === false){
    enemy[0].hp -= (player[0].attack - enemy[0].defense);
    player[0].hp -= (enemy[0].attack - player[0].defense);
    }

    if (player[0].hp <= 0) state.playerDead = true;

    if (enemy[0].hp <= 0) state.enemyDead = true;

    if (state.playerDead === false && state.enemyDead === false){
        // render pAttack message to battleText for 3-5 seconds
        // render eAttack message to ""
        render();
    }

    if (state.playerDead === true) {
        // hide attack button
        // show start game button
        // hide enemy and player divs
        // enemy.pop() to clear enemy state for next round
        // update battleText div to GAME OVER
    }

    if (state.enemyDead === true) {
        // render pAttack message to battleText for 3-5 seconds
        // render enemy has been killed message to battleText div for 3-5 seconds
        // enemy.pop();
        // enemy.push(new Combatant);
        // render()

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
    }, 2000);
}



$(document).on("click", ".startButton", startGame);
$(document).on("click", ".attackButton", displayText);