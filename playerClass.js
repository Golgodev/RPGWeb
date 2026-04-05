//$$$$$$$\  $$\        $$$$$$\ $$\     $$\ $$$$$$$$\ $$$$$$$\  
//$$  __$$\ $$ |      $$  __$$\\$$\   $$  |$$  _____|$$  __$$\ 
//$$ |  $$ |$$ |      $$ /  $$ |\$$\ $$  / $$ |      $$ |  $$ |
//$$$$$$$  |$$ |      $$$$$$$$ | \$$$$  /  $$$$$\    $$$$$$$  |
//$$  ____/ $$ |      $$  __$$ |  \$$  /   $$  __|   $$  __$$< 
//$$ |      $$ |      $$ |  $$ |   $$ |    $$ |      $$ |  $$ |
//$$ |      $$$$$$$$\ $$ |  $$ |   $$ |    $$$$$$$$\ $$ |  $$ |
//\__|      \________|\__|  \__|   \__|    \________|\__|  \__|

// Jak daleko položí bombu
p1_throw_range = 12;
p2_throw_range = 12;

// Životy hráče
let max_p1_health = 3;
let max_p2_health = 3;
let p1_health = max_p1_health;
let p2_health = max_p2_health;

// Cooldown střely z luku
let p1_shootingCooldown = 1000;
let p2_shootingCooldown = 1000;
let lastShotTimePlayer1 = 0;
let lastShotTimePlayer2 = 0;

// Cooldown na třelu z bomby
let p1_bombCooldown = 6000; 
let p2_bombCooldown = 6000; 
let lastBombTimePlayer1 = 0;
let lastBombTimePlayer2 = 0;

// Velikost výbuchu bomby (PS: Pokud stihnu dodělat tuhle funkci)
let p1_bomb_range = 2;
let p2_bomb_range = 2;

// Cooldown na pohyb hráčů
let movementCooldown = 250; 
let lastMoveTimePlayer1 = 0;
let lastMoveTimePlayer2 = 0;

let delay_max = 5;
let delay_cur = 0;
let p2_delay_max = 5;
let p2_delay_cur = 0;

// Název vybrané classy
let p1_class = "";
let p2_class = "";

// Statistiky classek
const classStats = {
    0: { name: "Tank", health: 5, shootingCooldown: 1000, bombCooldown: 6000 },
    1: { name: "Rogue", health: 3, shootingCooldown: 750, bombCooldown: 5000 },
    2: { name: "Bomber", health: 1, shootingCooldown: 1500, bombCooldown: 3000 },
};

// Zjistí počet class
const numberOfClasses = Object.keys(classStats).length;

// Funkce kde si hráč může změnit classu a s ní i změní statistiky
function changeClass(selectedClass, player) {
    const selectedStats = classStats[selectedClass];

    if (player === 1) {
        p1_class = selectedStats.name;
        max_p1_health = selectedStats.health;
        p1_health = selectedStats.health;
        p2_shootingCooldown = selectedStats.shootingCooldown;
        p2_bombCooldown = selectedStats.bombCooldown;
    } else if (player === 2) {
        p2_class = selectedStats.name;
        max_p2_health = selectedStats.health;
        p2_health = selectedStats.health;
        p1_shootingCooldown = selectedStats.shootingCooldown;
        p1_bombCooldown = selectedStats.bombCooldown;
    }
}

// Nastaví na ROGUE classu defaultně
changeClass(1,1)
changeClass(1,2)