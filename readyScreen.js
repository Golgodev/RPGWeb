// Pozice ui elementů
let position_1_1 = 0;
let position_1_2 = 0;
let position_2_1 = 0;
let position_2_2 = 0;   
// Jakou classu mají právě teď vybranou
let p1_class_index = 1;
let p2_class_index = 1;

let p1_ready = false;
let p2_ready = false;
let IsPlaying = false;

let IsMenuOpen = false;

window.addEventListener("keydown", function(event) {
    console.log("Key pressed:", event.key);
    // Pokud je ve hře nemůžou změnit classu
    if(IsPlaying == false) {
        // Změní index classy pokud hráči použijou dané klávesy + ready state
        switch (event.key) {
            case "1":
                if(p2_ready == false) {
                    p2_ready = true;
                } else {
                    p2_ready = false;
                }
                event.preventDefault();
                break;
            case "e":
                if(p1_ready == false) {
                    p1_ready = true;
                } else {
                    p1_ready = false;
                }
                event.preventDefault();
                break;
            case "a":
                if(!p1_ready) {
                    p1_class_index = (p1_class_index - 1 + numberOfClasses) % numberOfClasses;
                }
                break;
            case "d":
                if(!p1_ready) {
                    p1_class_index = (p1_class_index + 1) % numberOfClasses;
                }
                break;
            case "ArrowLeft":
                if(!p2_ready) { 
                    p2_class_index = (p2_class_index - 1 + numberOfClasses) % numberOfClasses;
                }
                break;
            case "ArrowRight":
                if(!p2_ready) {
                    p2_class_index = (p2_class_index + 1) % numberOfClasses;
                }
                break;
            case "h":
                if(IsMenuOpen) {
                    IsMenuOpen = false;
                } else {
                    IsMenuOpen = true;
                }
                break;
        }
    }

    // Pokud nejsou ready můžou změnit classu
    if (!p1_ready) {
        changeClass(p1_class_index, 1);
    }

    if(!p2_ready) {
        changeClass(p2_class_index, 2);
    }

    // Jestli jsou oba hráči připraveni hra se zapne, spustí se taky animace
    if (p1_ready && p2_ready) {
        IsPlaying = true;
        setTimeout(StartGame, 500);
    }
});

function DrawReadyScreen() {
        // Pozadí hráčů
        c.drawImage(ready_01, position_1_1, position_1_2, canvas.width,canvas.height);
        c.drawImage(ready_02, position_2_1 , position_2_2, canvas.width,canvas.height);
        // Ready Obrázky
        c.drawImage(p1_read, 325 + position_1_1, 450, 350,150);    
        c.drawImage(p2_read, 1300 + position_2_1 , 450, 350,150);    
       //c.drawImage(p2_read, position_2_1 , position_2_2, canvas.width,canvas.height);
        // Grafika postav
        c.drawImage(player_blue_scaled, 350 + position_1_1, 100, 360,360);    
        c.drawImage(player_purple_scaled, 1250 + position_2_1 , 100, 360,360);    
    
        c.fillStyle = "white";

        if(!IsPlaying) {
            c.drawImage(h_key, 10, 10, 55, 55)
            c.font = '600 20px Arial';
            c.fillText("control menu", 75, 45);
        }
        
        c.font = '800 30px Arial';
        
        // Modrý hráč, statistiky vybrané klásy
        c.fillText(p1_class, 400 + position_1_1, middle_height + 150);
        c.fillText(classStats[p1_class_index].health + " HEARTS", 400 + position_1_1, middle_height + 250);
        c.fillText(classStats[p1_class_index].shootingCooldown / 1000 + "s Shooting Cooldown", 400 + position_1_1, middle_height + 300);
        c.fillText(classStats[p1_class_index].bombCooldown / 1000 + "s Bomb Cooldown", 400 + position_1_1, middle_height + 350);
        
        // Fiolový hráč, statistiky vybrané klásy
        c.fillText(p2_class, 1350 + position_2_1, middle_height + 150);
        c.fillText(classStats[p2_class_index].health + " HEARTS", 1350 + position_2_1, middle_height + 250);
        c.fillText(classStats[p2_class_index].shootingCooldown / 1000 + "s Shooting Cooldown", 1350 + position_2_1, middle_height + 300);
        c.fillText(classStats[p2_class_index].bombCooldown / 1000 + "s Bomb Cooldown", 1350 + position_2_1, middle_height + 350);

        c.fillStyle = "rgba(45, 200, 45, 0)"; 
        
        if(p1_ready) {
            c.drawImage(ready_mark, 550 + position_1_1, 450, 150,125);
        }
        
        if(p2_ready) {
            c.drawImage(ready_mark, 1520 + position_2_1, 450, 150,125);
        }
        
        if(IsMenuOpen) {
            c.fillStyle = "rgba(25,25,25,1)";
            c.drawImage(player_inputs, middle_width / 3,middle_height / 4,window.innerWidth / 1.5,middle_height * 1.50)
        }
}

function StartGame() {
    setInterval(animation_01, 5);
    setTimeout(KeyDetection, 1000);  
}

function animation_01() {
    position_1_1 -= 3;
    position_2_1 += 3;
}