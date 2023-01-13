
let playerLife = 200;
let enemyLife = 200;
let booost = 0;

let myHealthBar = 0;
let enemyHealthBar = 0;

const miniPotion = 10;
const maxiPotion = 30;

const weapons = ['axe', 'sword', 'fists', 'shield and drinks Thor potion'];
let choiceOfWeapon = 0;

function attackWith(p) {
    switch (p) {
        case "fists":
            logger("You punch Viking in the face !");
            enemyLife = enemyLife - 10 - booost;
            let punchSound = document.getElementById('coup');
            punchSound.play();
            break;
        case "dagger":
            logger("You stab Viking's arm !");
            enemyLife = enemyLife - 15 - booost;
            break;
        case "swords":
            logger("You hit Viking with you sword !");
            enemyLife = enemyLife - 20 - booost;
            let swordSound = document.getElementById('sword_sound');
            swordSound.play();
            break;
        case "axe":
            logger("You hit him with your axe !");
            enemyLife = enemyLife - 30 - booost;
            let AxeSound = document.getElementById('broken_shield');
            AxeSound.play();
            break;
        case "ball of fire":
            logger("You burn Viking with your magic fireball !");
            enemyLife = enemyLife / 2;
            break;
    }
    if (enemyLife > 0) {
        enemyScore(`Viking life is now at ${enemyLife} hp`);
        setTimeout(enemyAttack, 2000);
        togglebuttons(true);
    }
    else {
        enemyLife = 0;
        stopTheGame();
    }
    enemyHealth();
    enemyLifeBar();
    let begin = document.getElementById('beginthegame');
    begin.style.display = "none";
}

function lifeSteal() {
    if (playerLife > 0 && enemyLife > 10) {
        enemyLife = enemyLife - 10;
        enemyScore(`Viking life is now at ${enemyLife} hp`);
        enemyHealth();
        playerLife = playerLife + 10;
        yourScore(`Your life is now at ${playerLife} hp`);
        playerHealth();
        logger(`You steal 10 hp from Viking's life`);
        setTimeout(enemyAttack, 2000);
        togglebuttons(true);
    }
    else {
        stopTheGame();
    }
}

function takePotion(m) {
    if (playerLife > 0 && enemyLife > 0) {
        if (m === 'miniPotion' && playerLife < 190) {
            logger("Glup, taking mini potion!");
            playerLife = playerLife + 10;
            let potionSound = document.getElementById('potion_sound');
            potionSound.play();
            playerHealth();
        }
        else if (m === 'maxiPotion' && playerLife < 170) {
            logger("Glup, taking maxi potion!");
            playerLife = playerLife + 30;
            let potionSound = document.getElementById('potion_sound');
            potionSound.play();
            playerHealth();
        }
        else {
            logger("No potion! You've had enough!");
            yourScore(`Your life is now at ${playerLife} hp`);
        }
        setTimeout(enemyAttack, 2000);
        togglebuttons(true);
    }
}

function boost() {
    if (playerLife > 0 && enemyLife > 0) {
        booost = 10;
        logger("boooooooooost potion !");
        attackWith();
        setTimeout(enemyAttack, 2000);
        togglebuttons(true);
    }
    else {
        stopTheGame();
    }

}

function enemyAttack(choiceOfWeapon) {

    choiceOfWeapon = weapons[Math.floor(Math.random() * weapons.length)];
    logger(`Viking attacks you with his ${choiceOfWeapon}`);

    if (playerLife > 0) {
        switch (choiceOfWeapon) {
            case 'axe':
                playerLife = playerLife - 30;
                yourScore(`Your life is now at ${playerLife} hp`);
                let AxeSound = document.getElementById('broken_shield');
                AxeSound.play();
                break;
            case 'sword':
                playerLife = playerLife - 20;
                yourScore(`Your life is now at ${playerLife} hp`);
                let swordSound = document.getElementById('sword_sound');
                swordSound.play();
                break;
            case 'fists':
                playerLife = playerLife - 10;
                yourScore(`Your life is now at ${playerLife} hp`);
                let punchSound = document.getElementById('coup');
                punchSound.play();
                break;
            case 'head and he drinks Thor potion':
                if (enemyLife < 150)
                    enemyLife = enemyLife + 50;
                let potionSound = document.getElementById('potion_sound');
                potionSound.play();
                enemyScore(`Viking's life is now at ${enemyLife} hp`);
        }
        yourLifeBar();
        enemyLifeBar();
        togglebuttons(false);
    }
    else {
        stopTheGame();
    }
    playerHealth();
}

function playerHealth() {
    if (playerLife < 1) {
        let danger = document.getElementById('you');
        danger.style.backgroundImage = "url('images/player1_almostdead.png')";
    }
    else if (playerLife < 100) {
        let injury = document.getElementById('you');
        injury.style.backgroundImage = "url('images/player1_injured.png')";
    }
    else if (playerLife >= 150) {
        let isInGoodShape = document.getElementById('you');
        isInGoodShape.style.backgroundImage = "url('images/player1_start.png')";
    }
}

function enemyHealth() {
    if (enemyLife < 1) {
        let enemyInjury = document.getElementById('enemy');
        enemyInjury.style.backgroundImage = "url('images/enemy_almostdead.png')";
    }
    else if (enemyLife < 100) {
        let bobo = document.getElementById('enemy');
        bobo.style.backgroundImage = "url('images/enemy_injured.png')";
    }
}

function yourScore(y) {
    let YourScoreMessage = document.getElementById('your_score');
    YourScoreMessage.innerHTML = (y);
}

function enemyScore(s) {
    let enemyScoreMessage = document.getElementById('enemy_score');
    enemyScoreMessage.innerHTML = (s);
}

function logger(l) {
    let loggerMessage = document.getElementById('action_message');
    loggerMessage.innerHTML = (l);
}

function yourLifeBar() {
    myHealthBar = document.getElementById("your_healthbar");
    myHealthBar.style.width = `${playerLife / 2}%`;
}

function enemyLifeBar() {
    let enemyHealthBar = document.getElementById("enemy_healthbar");
    enemyHealthBar.style.width = `${enemyLife / 2}%`;
}

function togglebuttons(b) {
    let buttons = document.querySelectorAll('button');
    buttons.forEach(function (button) {
        button.disabled = b;
    })
}

function stopTheGame() {
    if (playerLife <= 0 || enemyLife <= 0) {

        togglebuttons(true);

        let endOfTheGame = document.getElementById('action_message');
        endOfTheGame.style.fontSize = "120%";

        if (playerLife <= 0) {
            playerLife = 0;
            yourScore("You are dead");
            logger("You are dead ! You loooose");
            let thunderSound = document.getElementById('lightening');
            thunderSound.play();
            let YouDeadSound = document.getElementById('dead_sound_you');
            YouDeadSound.play();
        }
        else if (enemyLife <= 0) {
            enemyLife = 0;
            enemyScore("Viking is dead!");
            logger("Viking is dead ! You win !");
            let youWinSound = document.getElementById('win_sound');
            youWinSound.play();
            let deadVikingSound = document.getElementById('dead_sound_viking');
            deadVikingSound.play();
        }
    }
}
