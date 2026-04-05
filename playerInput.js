let heldPlayer_1 = [];
let heldPlayer_2 = [];

let directionsPlayer_1 = {
    left: "KeyA",
    right: "KeyD",
    up: "KeyW",
    down: "KeyS",
    shoot: "Shoot",
    throw_bomb: "Bomb",
};
let directionsPlayer_2 = {
    left: "KeyLeft",
    right: "KeyRight",
    up: "KeyUp",
    down: "KeyDown",
    shoot: "Shoot",
    throw_bomb: "Bomb",
};

// připravit klávesy 
let keysPlayer_1 = {
    37: directionsPlayer_1.left,
    39: directionsPlayer_1.right,
    38: directionsPlayer_1.up,
    40: directionsPlayer_1.down,
    97: directionsPlayer_1.shoot,
    98: directionsPlayer_1.throw_bomb,
};
let keysPlayer_2 = {
    65: directionsPlayer_2.left,
    68: directionsPlayer_2.right,
    87: directionsPlayer_2.up,
    83: directionsPlayer_2.down,
    69: directionsPlayer_1.shoot,
    81: directionsPlayer_1.throw_bomb,
};


// detekce zmáčknutí kláves přidá do dokumentu event listener
function KeyDetection() {
    document.addEventListener("keydown", (e) => {
        let directoryPlayer2 = keysPlayer_2[e.which];
        if (directoryPlayer2) {
            handlePlayer2Input(directoryPlayer2);
        }

        let directoryPlayer1 = keysPlayer_1[e.which];
        if (directoryPlayer1) {
            handlePlayer1Input(directoryPlayer1);
        }
    });

    document.addEventListener("keyup", (e) => {
        let directoryPlayer1 = keysPlayer_1[e.which];
        if (directoryPlayer1) {
            heldPlayer_1.splice(heldPlayer_1.indexOf(directoryPlayer1), 1);
        }

        let directoryPlayer2 = keysPlayer_2[e.which];
        if (directoryPlayer2) {
            heldPlayer_2.splice(heldPlayer_2.indexOf(directoryPlayer2), 1);
        }
    });

    function handlePlayer1Input(direction) {
        if(!isLoadingNewRound) {
        const currentTime = new Date().getTime();
        if (currentTime - lastMoveTimePlayer1 >= movementCooldown ) {
            if (heldPlayer_1.indexOf(direction) === -1) {
                heldPlayer_1.unshift(direction);
                moveAudio.play();
                
                switch (direction) {
                    case directionsPlayer_1.up:
                        if (map[p1_position_x - 1][p1_position_y] == 12) {
                            DamagePlayer2(1);
                        }
    
                        if (map[p1_position_x - 1][p1_position_y] == 0 || map[p1_position_x - 1][p1_position_y] == 12) {
                            map[p1_position_x][p1_position_y] = 0;
                            p1_position_x--;
                        }
                        
                        break;
                        case directionsPlayer_1.down:
                        if (map[p1_position_x + 1][p1_position_y] == 12) {
                            DamagePlayer2(1);
                        }
    
                        if (map[p1_position_x + 1][p1_position_y] == 0) {
                            map[p1_position_x][p1_position_y] = 0;
                            p1_position_x++;
                        }
                        break;
                    case directionsPlayer_1.left:
                        if (map[p1_position_x][p1_position_y - 1] == 12) {
                            DamagePlayer2(1);
                        }

                        if(p1_position_y <= gridCols / 2) {
                            break;
                        }
    
                        if (map[p1_position_x][p1_position_y - 1] == 0 || map[p1_position_x][p1_position_y - 1] == 12) {
                            map[p1_position_x][p1_position_y] = 0;
                            p1_position_y--;    
                        }
                        break;
                    case directionsPlayer_1.right:
                        if (map[p1_position_x][p1_position_y + 1] == 12) {
                            DamagePlayer2(1);
                        }
    
                        if (map[p1_position_x][p1_position_y + 1] == 0 || map[p1_position_x][p1_position_y + 1] == 12) {
                            map[p1_position_x][p1_position_y] = 0;
                            p1_position_y++;
                        }
                        break;
                    case directionsPlayer_1.shoot:
                        const currentTime = new Date().getTime();
                        if(map[p1_position_x][p1_position_y - 1] == 0) {
                            if (currentTime - lastShotTimePlayer1 >= p1_shootingCooldown) {
                                map[p1_position_x][p1_position_y - 1] = 9;
                                shootAudio.play();
                                lastShotTimePlayer1 = currentTime;
                            }
                        }
                        break;
                    case directionsPlayer_1.throw_bomb:
                        const currentTime_2 = new Date().getTime();
                        if (currentTime_2 - lastBombTimePlayer1 >= p1_bombCooldown) {  
                            let throw_right = p1_position_y - p1_throw_range;
                            if(map[p1_position_x][throw_right] == 0) {
                                SetUpBomb(p1_position_x, throw_right, 18, p1_bomb_range);
                                lastBombTimePlayer1 = currentTime_2;
                            }
                        }
                        break;
                }
    
    
                lastMoveTimePlayer1 = currentTime;
            }
        }
        }
    }

    function handlePlayer2Input(direction) {
        if(!isLoadingNewRound) {
        const currentTime = new Date().getTime();
        if (currentTime - lastMoveTimePlayer2 >= movementCooldown) {
            if (heldPlayer_2.indexOf(direction) === -1) {
                heldPlayer_2.unshift(direction);
                moveAudio.play();
                switch (direction) {
                    case directionsPlayer_2.up:
                        if (map[p2_position_x - 1][p2_position_y] == 9) {
                            DamagePlayer1(1);
                        }
    
                        if (map[p2_position_x - 1][p2_position_y] == 0 || map[p2_position_x - 1][p2_position_y] == 9) {
                            map[p2_position_x][p2_position_y] = 0;
                            p2_position_x--;
                        }
                        break;
                    case directionsPlayer_2.down:
                        if (map[p2_position_x + 1][p2_position_y] == 9) {
                            DamagePlayer1(1);
                        }
    
                        if (map[p2_position_x + 1][p2_position_y] == 0 || map[p2_position_x + 1][p2_position_y] == 9) {
                            map[p2_position_x][p2_position_y] = 0;
                            p2_position_x++;
                        }
                        break;
                    case directionsPlayer_2.left:
                        if (map[p2_position_x][p2_position_y - 1] == 9) {
                            DamagePlayer1(1);
                        }
                        if (map[p2_position_x][p2_position_y - 1] == 0 || map[p2_position_x][p2_position_y - 1] == 9) {
                            map[p2_position_x][p2_position_y] = 0;
                            p2_position_y--;
                        }
                        break;
                    case directionsPlayer_2.right:
                        if (map[p2_position_x][p2_position_y + 1] == 9) {
                            DamagePlayer1(1);
                        }

                        if(p2_position_y >= gridCols / 2 - 1) {
                            break;
                        }

                        if (map[p2_position_x][p2_position_y + 1] == 0 || map[p2_position_x][p2_position_y + 1] == 9) {
                            map[p2_position_x][p2_position_y] = 0;
                            p2_position_y++;
                        }
                        break;
                    case directionsPlayer_2.shoot:
                        const currentTime = new Date().getTime();
                        if(map[p2_position_x][p2_position_y + 1] == 0) {
                            if (currentTime - lastShotTimePlayer2 >= p2_shootingCooldown) {
                                map[p2_position_x][p2_position_y + 1] = 12;
                                shootAudio.play();
                                lastShotTimePlayer2 = currentTime;
    
                            }
                        }
                        break;
                    case directionsPlayer_2.throw_bomb:
                        const currentTime_2 = new Date().getTime();
                        if (currentTime_2 - lastBombTimePlayer2 >= p2_bombCooldown) {
                            let throw_left = p2_position_y + p2_throw_range;
                            if(map[p2_position_x][throw_left] == 0) {
                                SetUpBomb(p2_position_x, throw_left, 18, p2_bomb_range);
                                lastBombTimePlayer2 = currentTime_2;
                            }
                        }
                        break;
                }

                lastMoveTimePlayer2 = currentTime;
            }
        }}
    }
}
