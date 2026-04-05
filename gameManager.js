//$$$$$$\   $$$$$$\  $$\      $$\ $$$$$$$$\        $$$$$$\  $$$$$$$$\ $$$$$$$$\ $$$$$$$$\ $$$$$$\ $$\   $$\  $$$$$$\   $$$$$$\  
//$$  __$$\ $$  __$$\ $$$\    $$$ |$$  _____|      $$  __$$\ $$  _____|\__$$  __|\__$$  __|\_$$  _|$$$\  $$ |$$  __$$\ $$  __$$\ 
//$$ /  \__|$$ /  $$ |$$$$\  $$$$ |$$ |            $$ /  \__|$$ |         $$ |      $$ |     $$ |  $$$$\ $$ |$$ /  \__|$$ /  \__|
//$$ |$$$$\ $$$$$$$$ |$$\$$\$$ $$ |$$$$$\          \$$$$$$\  $$$$$\       $$ |      $$ |     $$ |  $$ $$\$$ |$$ |$$$$\ \$$$$$$\  
//$$ |\_$$ |$$  __$$ |$$ \$$$  $$ |$$  __|          \____$$\ $$  __|      $$ |      $$ |     $$ |  $$ \$$$$ |$$ |\_$$ | \____$$\ 
//$$ |  $$ |$$ |  $$ |$$ |\$  /$$ |$$ |            $$\   $$ |$$ |         $$ |      $$ |     $$ |  $$ |\$$$ |$$ |  $$ |$$\   $$ |
//\$$$$$$  |$$ |  $$ |$$ | \_/ $$ |$$$$$$$$\       \$$$$$$  |$$$$$$$$\    $$ |      $$ |   $$$$$$\ $$ | \$$ |\$$$$$$  |\$$$$$$  |
// \______/ \__|  \__|\__|     \__|\________|       \______/ \________|   \__|      \__|   \______|\__|  \__| \______/  \______/

// SCORE HRÁČŮ
let p1_score = 0;
let p2_score = 0;
// ČAS KOLA & A NASTAVENÍ KOLA
let time_minutes = 1;
let time_seconds = 30;
let cur_round = 0;
// STARTOVNÍ POZICE HRÁČE 1 (KVŮLI JEDNÉ CHYBĚ JSOU ZAMĚNĚNY NÁZVY HRÁČŮ 1 A 2)
const starting_p1_position_x = 5;
const starting_p1_position_y = 19;
let p1_position_x = starting_p1_position_x;
let p1_position_y = starting_p1_position_y;
// STARTOVNÍ POZICE HRÁČE 2
const starting_p2_position_x = 6;
const starting_p2_position_y = 2;
let p2_position_x = 6;  
let p2_position_y = 2;  

// KDO Z HRÁČŮ VYHRÁL
let p1_won = false;
let p2_won = false;

let Closed = false;
// Pozice okrajů
let left_side_x = -1200;
let right_side_x = 1200;

let isLoadingNewRound = false;

// Restartuje hru
function ResetGame() {
    location.reload();
}

function NewRound() {
    cur_round++;
    
    // Pokud jeden z hráčů dostanou 3 body tak se hra ukončí a vyhlásí to vítěze
    if(p1_score == 3) {
        victoryAudio.play();
        p1_won = true;
        setTimeout(ResetGame, 1500)
    } else if(p2_score == 3) {
        victoryAudio.play();
        p2_won = true;
        setTimeout(ResetGame, 1500)
    }

    isLoadingNewRound = true;
    setTimeout(ResetPlayers, 2000);
    
    for(let i = 0; i < gridRows; i++) {
        for(let j = 0; j < gridCols; j++) {
            if(map[i][j] == 12 || map[i][j] == 9 || map[i][j] == 15) {
                map[i][j] = 0;
            }

            if(bomb_map[i][j] == 17 || bomb_map[i][j] == 18) {
                bomb_map[i][j] = 0;
            }
        }
    }
}

function ResetPlayers() {
    p1_health = max_p1_health;
    p2_health = max_p2_health;

    map[p1_position_x][p1_position_y] = 0;  
    map[p2_position_x][p2_position_y] = 0;  

    p1_position_x =  starting_p1_position_x;
    p1_position_y = starting_p1_position_y;
    p2_position_x = starting_p2_position_x;
    p2_position_y = starting_p2_position_y;

    isLoadingNewRound = false;

}

