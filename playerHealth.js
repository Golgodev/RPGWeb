function DrawHearts() {
    let position1 = defaultPositionX;
    let position2 = defaultPositionX + blockSize         * gridCols - 50 * p2_health;
    
    for(let i = 0; i < p1_health; i++) {
        c.drawImage(heart, position1, 25, 60,60);
        position1 += 50;
    }

    for(let i = 0; i < p2_health; i++) {
        c.drawImage(heart, position2, 25, 60,60);
        position2 += 50;
    }
}

function DamagePlayer1(amount) {
    p1_health -= amount;
    hitAudio.play();

    if(p1_health <= 0) {
        p2_score++;
        setTimeout(NewRound, 500);
    }
}

function DamagePlayer2(amount) {
    p2_health -= amount;
    hitAudio.play();
    
    if(p2_health <= 0) {
        p1_score++;
        NewRound();
    }
}