var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// POZICE KDE SE MAJÍ TILY SPAWNOVAT
let positionX = canvas.width / 2 - blockSize * (gridCols/ 2);
let positionY = (canvas.height) / 2 - blockSize / 2  - blockSize * (gridRows / 2);
let defaultPositionX = positionX;
let defaultPositionY = positionY;
// STŘED CANVASU 
const middle_width = canvas.width / 2;
const middle_height = canvas.height / 2;

// Hra funguje na bázi ticků, kde posunuje jednotlivé objekty, jako je šíp. Můžeme tick zvětšit a šipu poletí pomaleji nebo právě naopak
// PS:Je to messy code doufám že to ještě změním  (Odevzdávání projektu: "NEZMĚNIL" :D) 
function loopMap() {
    for(let i = 0; i < gridRows; i++) {
        for(let j = 0; j < gridCols; j++) {
            switch(map[i][j]) {
                case 12:
                    let move_left = j + 1;  
                    if(map[i][move_left] == "player2") DamagePlayer2(1);
                    
                    if(map[i][move_left] == 9) 
                    {
                        map[i][j] = 0;
                        map[i][move_left] = 0;
                        break;
                    }    

                    if(map[i][move_left] == 0) map[i][move_left] = 12;
                    
                    map[i][j] = 0;
                    j++;
                    break;
                case 9:
                    let move_right = j - 1;
                    if(map[i][move_right] == "player1") DamagePlayer1(1);

                    if(map[i][move_right] == 12) 
                    {
                        map[i][j] = 0;
                        map[i][move_right] = 0;
                        break;
                    }    

                    if(map[i][move_right] == 0) {
                        map[i][move_right] = 9; 
                    }    

                    map[i][j] = 0;
                    j++;
                    break;
            }        
        }    
    }    
}    

// Vytvoří to nehratelnou mapu, jako pozadí. Což jsou jesnotlivé tily
function VisualMap() {
    positionX = defaultPositionX;
    positionY = defaultPositionY;
    

    // Vytvoří šachovnicový grid jak můžeme vidět potom ve hře
    for (let i = 0; i < gridRows; i++) {
        for (let x = 0; x < gridCols; x++) {
            // Vybere správnou barvu pro specifický TILE a sleduje jestli pole je první hráče nebo druhého
            if (x >= gridCols / 2) {
                if (x % 2 == 0 && i % 2 == 1 || x % 2 == 1 && i % 2 == 0) {
                    c.fillStyle = "rgba(60, 135, 45, 1)";
                }    
                
                if (x % 2 == 0 && i % 2 == 0 || x % 2 == 1 && i % 2 == 1) {
                    c.fillStyle = "rgba(65, 140, 45, 1)";
                }    
            } else if (x < gridCols / 2) {
                if (x % 2 == 0 && i % 2 == 1 || x % 2 == 1 && i % 2 == 0) {
                    c.fillStyle = "rgba(45, 120, 45, 1)";
                }    
                
                if (x % 2 == 0 && i % 2 == 0 || x % 2 == 1 && i % 2 == 1) {
                    c.fillStyle = "rgba(50, 125, 45, 1)";
                }    
            }    


            c.fillRect(positionX, positionY, blockSize, blockSize);
            // Vytvoří border okolo tilu
            c.strokeStyle = "rgba(16,16,16, 0.1)"; 
            c.lineWidth = 2;
            c.strokeRect(positionX, positionY, blockSize,blockSize);  
            
            // Zde to vykreslí kytku 
            if(flower_map[i][x] == 1) {
                c.drawImage(flower_01, positionX, positionY, blockSize,blockSize);
            } else if(flower_map[i][x] == 2) {
                c.drawImage(flower_02, positionX, positionY, blockSize,blockSize);
            }
            
            positionX += blockSize;
        }    
        
        positionX = defaultPositionX;
        positionY += blockSize;
    }    
    positionX = defaultPositionX;
    positionY += blockSize;
}    

// Vytvoří všechny UI elementy jako je Text, Obrázky, ReadyScreen atd...
function CreateUI() {    
    // zobrazení výherní obrazovky
    if(p1_won) {
        c.fillStyle = "rgba(15,15,15,1)"
        c.fillRect(0,0, window.innerWidth, window.innerHeight)
        c.fillStyle = "white";
        c.font = "48px 'Lobster', serif";
        c.fillText("Blue Won!", middle_width - 125, middle_height);
    } else if(p2_won) {        
        c.fillStyle = "rgba(15,15,15,1)"
        c.fillRect(0,0, window.innerWidth, window.innerHeight)
        c.fillStyle = "white";
        c.font = "48px 'Lobster', serif";
        c.fillText("Purple Won!", middle_width - 125, middle_height);
    }

    c.drawImage(wooden_sign, middle_width - 260 / 2, 20, 240,100);
    text();

    c.drawImage(next_round_01, left_side_x, 0, canvas.width,canvas.height);
    c.drawImage(next_round_02, right_side_x, 0, canvas.width,canvas.height);

    DrawReadyScreen();
}

// Vykreslí na mapě jednotlivé objekty (jako je třeba strom, hráč, šíp)
function UpdateMap() {  
    c.clearRect(0,0, canvas.width, canvas.height)
    VisualMap(); 
    
    positionX = defaultPositionX;
    positionY = defaultPositionY;
    map[p1_position_x][p1_position_y] = "player2";
    map[p2_position_x][p2_position_y] = "player1";

    for (let i = 0; i < gridRows; i++) {
        for(let j = 0; j < gridCols; j++) {                 
            // Vykreslí v jaké fázy se bomba nachází
            if (bomb_map[i][j] == 17) {
                DrawBombTile(positionX, positionY, "rgba(215,20,25,0.5)");
            } else if(bomb_map[i][j] == 18) {
                DrawBombTile(positionX, positionY, "rgba(215,20,25,0.3)");
            }

            // Vykreslí všechno ostatní
            switch(map[i][j]) {
                case "player1":
                    c.drawImage(player_blue, positionX, positionY, blockSize,blockSize);
                    break;
                case "player2":
                    c.drawImage(player_purple, positionX, positionY, blockSize,blockSize);
                    break;
                case 9:
                    c.drawImage(arrow_left, positionX, positionY, blockSize,blockSize);
                    break;
                case 12:
                    c.drawImage(arrow_right, positionX, positionY, blockSize,blockSize);
                    break;
                case 1:
                    c.drawImage(treeImage, positionX, positionY, blockSize,blockSize);
                    break;
                case 15:
                    c.drawImage(bomb, positionX, positionY, blockSize,blockSize);
                    break;
                case 2:
                    c.drawImage(mountain, positionX, positionY, blockSize,blockSize);
                    break;
                case 16:
                    c.fillStyle = "rgba(220,20,25,0.3)";
                    c.fillRect(positionX, positionY, blockSize,blockSize);
                    break;
            }                                       
            positionX += blockSize;    
        }    
        
        mapPositionY[i] = positionY;
        positionX = defaultPositionX;
        positionY += blockSize;
    }    

    DrawHearts();
    CreateUI();
}                                  
                    
function text() {
    c.fillStyle = "white";
    c.font = "48px 'Lobster', serif";
    const formattedTime = (time_seconds < 10) ? `${time_minutes}:0${time_seconds}` : `${time_minutes}:${time_seconds}`;
    c.fillText(p1_score + " : " + p2_score, middle_width - 50, middle_height - 375);
    c.fillStyle = "rgba(45, 200, 45, 0)";
}

setInterval(loopMap, 100);
setInterval(UpdateMap, 1000 / 60);

