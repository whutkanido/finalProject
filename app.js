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
    bossCounter: 0,
    bossDead: false
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
        i = randomNumBetween(20, 40) + (state.playerLevel * 10);
        return i;
    }

    const pStat = (x, y) => {
        let i;
        i = randomNumBetween(x, y) + (state.playerLevel - 1);
        return i;
    }

    enemy.pop();
    player.pop();
    $('.attackButton').show();
    $('.startButton').hide();
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

    // Hide attack button while attack phase runs
    
    $('.attackButton').hide()
    setTimeout(function(){
        
        $('.attackButton').show();

    },2500); 

    // If enemy attack - player defense is negative, have the enemy still do 1 damage

    const eAtk = () => {
        let i = (enemy[0].attack - player[0].defense)
        if (i <= 0) {
            player[0].hp -= 1;
        } else {
            player[0].hp -= (enemy[0].attack - player[0].defense);
            if (player[0].hp < 0) player[0].hp = 0;
        }

    }

    const pAtk = () => {
        let i = (player[0].attack - enemy[0].defense)
        if (i <= 0) {
            enemy[0].hp -= 1;
            render();
        } else {
            enemy[0].hp -= (player[0].attack - enemy[0].defense);
            if (enemy[0].hp < 0) enemy[0].hp = 0;
            render();
        }

    }

    // State change

        // Player attack + damage
    if (state.playerDead === false && state.enemyDead === false) pAtk();

        // Check if enemy is dead
    if (enemy[0].hp <= 0) state.enemyDead = true;

        // If enemy is still alive, enemy attacks + damage
    if (state.playerDead === false && state.enemyDead === false) eAtk();

        // Check if player is dead
    if (player[0].hp <= 0) state.playerDead = true;


    // Render

        // If no one is dead, display normal turn to player (both chars attack)
    if (state.playerDead === false && state.enemyDead === false) {

            let eDmg = (enemy[0].attack - player[0].defense);
            let pDmg = (player[0].attack - enemy[0].defense);
        
        
            // displays diff text if player attack is less than enemy defense    
        if (pDmg > 0) {
            $battleText.text(`${player[0].name} attacks for ` + (player[0].attack - enemy[0].defense) + ` damage`);
        } else {
            $battleText.text(`${player[0].name} attacks for ` + 1 + ` damage`);
        }
        
            // Show player dmg text first, then show enemy dmg text after a set time
        setTimeout(function () {
            $battleText.empty();
            
            // diff damage display if enemy atack is less than player defense
            if (eDmg > 0) {
                $battleText.text(`${enemy[0].name} attacks for ` + (enemy[0].attack - player[0].defense) + ` damage`);
            } else {
                $battleText.text(`${enemy[0].name} attacks for ` + 1 + ` damage`);
            }
                // Clear all battle text once turn is over
            setTimeout(function () {
                $battleText.empty();
                render();
            }, 1000);
        }, 1500);

        
    }

        // if player is dead, show gameover screen & reset boss counter
    
    if (state.playerDead === true) {
        state.bossDead = false;
        state.bossCounter = 0;
        
        $('.attackButton').hide();
        setTimeout(function(){
        
             $('.attackButton').hide();
    
        },2500); 
        $('.spellButton').hide();
        $('.startButton').show();
        $charDivs.hide();
        $battleText.text(`${player[0].name} has died.  Try again with the next hero`)
    }

        // if boss is dead, show Victory screen
    
    if (state.enemyDead === true && state.bossDead === true) {
        $('.attackButton').hide();
        setTimeout(function(){
        
            $('.attackButton').hide();
   
       },2500); 
        $('.spellButton').hide();
        $('.startButton').show();
        $charDivs.hide();
        $battleText.text(`${player[0].name}, the ultimate hero, has defeated the boss.  You win.`)
    }

        // if enemy is dead, generate a new enemy, give player +100 XP
        // after 10 enemies have been destroyed, generate a Boss enemy instead

    if (state.enemyDead === true && state.bossDead === false) {

        $battleText.text(`${player[0].name} attacks for ` + (player[0].attack - enemy[0].defense) + ` damage`);
        
            // timer to animate battle text
        
        setTimeout(function () {
            $battleText.empty();
            $battleText.text(`Enemy killed.  A new enemy appears!`);
            setTimeout(function () {
                $battleText.empty();
            }, 1000);
        }, 1500);

        
            // clear enemy[] memory
        enemy.pop();
            // increment boss counter by 1
        state.bossCounter += 1;
            // give player 100 XP
        state.playerXP += 100;
        
            // Level up
        if (state.playerXP >= 500) {
            state.playerLevel += 1;
            state.playerXP = 0;
            player[0].hp += 10;
            player[0].maxHp += 10;
            player[0].attack += 1;
            player[0].defense += 1;
        }

            // create a boss after player defeats 10 enemies
        if (state.bossCounter === 10) {
            enemy.push(new Combatant(
                'The Big Boss',                                                  //NAME
                randomNumBetween(50, 65),                                        //HP
                15,                                                              //MP
                randomNumBetween(12, 15),                                        //ATK
                randomNumBetween(5, 9),                                          //DEF
                .8,                                                              //ACC
                enemySprites[randomNumBetween(0, enemySprites.length - 1)]       //SPRITE
            ))
            state.bossDead = true;
        } else {
            // create a new regular enemy
        enemy.push(new Combatant(
            names[randomNumBetween(0, names.length - 1)],                    //NAME
            randomNumBetween(10, 15),                                        //HP
            0,                                                               //MP
            randomNumBetween(3, 6),                                          //ATK
            randomNumBetween(0, 2),                                          //DEF
            .7,                                                              //ACC
            enemySprites[randomNumBetween(0, enemySprites.length - 1)]       //SPRITE
        ))
        
        }

        state.enemyDead = false;

        
            // small delay to let text animation play before showing new enemy
        setTimeout(function () {
            render();
        }, 2000);

        
        state.enemyDead = false;

    }


    
}

// Clicking on buttons runs the game functions
$(document).on("click", ".startButton", startGame);
$(document).on("click", ".attackButton", runTurn);