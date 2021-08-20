function randomNumBetween(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
} 

const $playerHP = $('li#pHp');
const $playerMP = $('li#pMp');
const $playerAttack = $('li#pAttack');
const $playerName = $('li#pName');
const $playerDefense = $('li#pDefense');
// const playerSpeed = document.querySelector('#pSpeed');
// const playerSprite = document.querySelector('#playerSprite')

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
'url("sprite/gold.png")','url("sprite/skull-lava.png")']




startGame = () => {

    // Generate a player character
    const player = new Combatant(
        names[randomNumBetween(0,names.length - 1)],                    //NAME
        randomNumBetween(30,50),                                        //HP
        15,                                                             //MP
        randomNumBetween(3,9),                                          //ATK
        randomNumBetween(0,5),                                          //DEF
        .8,                                                             //ACC
        playerSprites[randomNumBetween(0,playerSprites.length - 1)]   // SPRITE
    )

    // Populate player information into DOM
    $playerName.text(player.name);
    $playerHP.text('HP: ' + player.hp + '/' + player.maxHp);
    $playerMP.text('MP: ' + player.mp);
    $playerAttack.text('ATK: ' + player.attack);
    $playerDefense.text('DEF: ' + player.defense);
    // playerSpeed.textContent = 'SPD: ' + Player.speed
    playerSprite.style.backgroundImage = player.sprite;
    // $('.startButton').hide();

}

$(document).on("click", ".startButton", startGame)



