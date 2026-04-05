// Informace o bombách na mapě (Nedal jsem to do objektu protože s tím byli problém) PS: potom změnit
const bombTimers = [];
const bomb_x = [];
const bomb_y = [];

let bomb_range;

// Přídá do arrayů informace o bombě
function SetUpBomb(x,y, type, sel_bomb_range) {
    bomb_x.push(x);
    bomb_y.push(y);
    bombTimers.push(5);
    map[x][y] = 15;
    bomb_range = sel_bomb_range;
    PlaceBomb(x,y, type, sel_bomb_range);
}

// Položí bombu do mapy s nastaveným radiusem a přidá tento radius do arraye
function PlaceBomb(x, y, type, radius = bomb_range) {
        bomb_map[x][y] = type;
    
        for (let dx = -radius; dx <= radius; dx++) {
            for (let dy = -radius; dy <= radius; dy++) {
                if (dx !== 0 || dy !== 0) {
                    if (IsWithinMapBounds(x + dx, y + dy)) {
                        bomb_map[x + dx][y + dy] = type;
                    }
                }
            }
        }
}

function IsWithinMapBounds(x, y) {
    return x >= 0 && x < bomb_map.length && y >= 0 && y < bomb_map[0].length;
}

// Nakreslí radius bomby
function DrawBombTile(x, y, fillStyle) {
    c.fillStyle = fillStyle;
    c.fillRect(x, y, blockSize, blockSize);
}

// Tick bomby který je nastavený na 350 milisekund když timer bomby bude 0 tak vybuchne
function BombTick() {
    for (let i = 0; i < bombTimers.length; i++) {
        bombTimers[i]--;

        if (bombTimers[i] === 3) {
            PlaceBomb(bomb_x[i], bomb_y[i], 17);
        }
        
        if (bombTimers[i] <= 0) {
            PlaceBomb(bomb_x[i], bomb_y[i], 16);
            HandleExplosion(i);
        }
    }
}

// Řeší samotý výbuch takže pokud v tom stojí hráči tak jim to dá damage
function HandleExplosion(index) {
    for (let x = 0; x < gridRows; x++) {
        for (let z = 0; z < gridCols; z++) {
            if (bomb_map[x][z] == 16) {
                if (map[x][z] === "player1") {
                    DamagePlayer1(1);
                }
                if (map[x][z] === "player2") {
                    DamagePlayer2(1);
                }
            }
        }
    }

    HandleBombExpire(index);
}

// Vymaže všechny objekty na mapě
function HandleBombExpire(index) {
    for (let x = 0; x < gridRows; x++) {
        for (let z = 0; z < gridCols; z++) { 
            if (bomb_map[x][z] == 16) {
                if(map[x][z] == 1 || flower_map[x][z] != 0) {
                    map[x][z] = 0;
                    flower_map[x][z] = 0;
                }
            }   
    }}

    PlaceBomb(bomb_x[index], bomb_y[index], 0);
    map[bomb_x[index]][bomb_y[index]] = 0;
    explodeAudio.play();
    bombTimers[index] = 5;
    bombTimers.splice(index, 1);
    bomb_x.splice(index, 1);
    bomb_y.splice(index, 1);
}

setInterval(BombTick, 250);