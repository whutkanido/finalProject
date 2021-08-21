function randomNumBetween(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
} 

const $playerHP = $('li#pHp');
const $playerMP = $('li#pMp');
const $playerAttack = $('li#pAttack');
const $playerName = $('div#pName');
const $playerDefense = $('li#pDefense');
// const playerSpeed = document.querySelector('#pSpeed');
// const playerSprite = document.querySelector('#playerSprite')

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




startGame = () => {

    $('.attackButton').show();
    $('.spellButton').show();

    // Generate a player character
    const player = new Combatant(
        names[randomNumBetween(0,names.length - 1)],                    //NAME
        randomNumBetween(30,50),                                        //HP
        15,                                                             //MP
        randomNumBetween(3,9),                                          //ATK
        randomNumBetween(0,5),                                          //DEF
        .8,                                                             //ACC
        playerSprites[randomNumBetween(0,playerSprites.length - 1)]     //SPRITE
    )

    // Generate 1st enemy
    const enemy = [];
    enemy.push(new Combatant(
        names[randomNumBetween(0,names.length - 1)],                    //NAME
        randomNumBetween(10,15),                                        //HP
        0,                                                             //MP
        randomNumBetween(3,9),                                          //ATK
        randomNumBetween(0,2),                                          //DEF
        .7,                                                             //ACC
        enemySprites[randomNumBetween(0,enemySprites.length - 1)]      //SPRITE
    ))

    render = () => {
        // Populate player information into DOM
        $playerName.text(player.name);
        $playerHP.text('HP: ' + player.hp + '/' + player.maxHp);
        $playerMP.text('MP: ' + player.mp);
        $playerAttack.text('ATK: ' + player.attack);
        $playerDefense.text('DEF: ' + player.defense);
        // playerSpeed.textContent = 'SPD: ' + Player.speed
        playerSprite.style.backgroundImage = player.sprite;
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
    render();
    // // Populate player information into DOM
    // $playerName.text(player.name);
    // $playerHP.text('HP: ' + player.hp + '/' + player.maxHp);
    // $playerMP.text('MP: ' + player.mp);
    // $playerAttack.text('ATK: ' + player.attack);
    // $playerDefense.text('DEF: ' + player.defense);
    // // playerSpeed.textContent = 'SPD: ' + Player.speed
    // playerSprite.style.backgroundImage = player.sprite;
    // // $('.startButton').hide();

    // // Populate enemy information into DOM

    // $enemyName.text(enemy[0].name);
    // $enemyHP.text('HP: ' + enemy[0].hp + '/' + enemy[0].maxHp);
    // $enemyMP.text('MP: ' + enemy[0].mp);
    // $enemyAttack.text('ATK: ' + enemy[0].attack);
    // $enemyDefense.text('DEF: ' + enemy[0].defense);
    // // playerSpeed.textContent = 'SPD: ' + Player.speed
    // enemySprite.style.backgroundImage = enemy[0].sprite;

}



$(document).on("click", ".startButton", startGame)



