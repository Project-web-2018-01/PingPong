const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;

const ballSize = 20;
let ballX = cw / 2 - ballSize / 2;
let ballY = ch / 2 - ballSize / 2;

const paddelHeight = 100;
const paddelWidth = 20;

const playerX = 70;
const aiX = 910;

let playerY = 200;
let aiY = 200; 

const lineWidth = 6;
const lineHeight = 16;

let ballSpeedX = 2;
let ballSpeedY = 2;

function table() {
    //Stół
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, cw, ch);

    for(let linePosition = 20; linePosition < ch; 
    linePosition += 30) {
        ctx.fillStyle = "gray";
        ctx.fillRect(cw/2 - lineWidth/2, linePosition, lineWidth, lineHeight);

    }

}


function ball() {
    //Piłka
    ctx.fillStyle = 'white';
    ctx.fillRect(ballX, ballY, ballSize, ballSize);

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY >= ch - ballSize) {
        ballSpeedY = -ballSpeedY;
        //speedUp();
    }

    if ( ((ballX < playerX + paddelWidth) && (ballY + 8 >= playerY) && (ballY - 8 < playerY + paddelHeight)) 
         || (ballX > aiX - ballSize && ballY + 8 > aiY && ballY - 8 < aiY + paddelHeight) ) { 

        if ((/*(ballY >= playerY && ballY <= playerY + paddelHeight) &&*/
            (ballY < playerY + 0.2*paddelHeight || ballY > playerY + 0.8*paddelHeight)) ||
            ((ballY > aiY && ballY < aiY + paddelHeight) && 
            (ballY < aiY + 0.2*paddelHeight || ballY > aiY + 0.8*paddelHeight))) {
                ballSpeedY = 1.3*ballSpeedY;
                ballSpeedX = -ballSpeedX;
                speedUp();
                //debugger;
            }
        else if ((/*(ballY >= playerY && ballY <= playerY + paddelHeight) &&*/
            (ballY < playerY + 0.4*paddelHeight || ballY > playerY + 0.6*paddelHeight)) ||
            ((ballY > aiY && ballY < aiY + paddelHeight) && 
            (ballY < aiY + 0.4*paddelHeight || ballY > aiY + 0.6*paddelHeight))) {
                ballSpeedY = 1.2*ballSpeedY;
                ballSpeedX = -ballSpeedX;
                //debugger;
            }
        else if ((/*(ballY >= playerY && ballY <= playerY + paddelHeight) &&*/
            (ballY > playerY + 0.4*paddelHeight || ballY < playerY + 0.6*paddelHeight)) ||
            ((ballY > aiY && ballY < aiY + paddelHeight) && 
            (ballY > aiY + 0.4*paddelHeight || ballY < aiY + 0.6*paddelHeight))) {
                ballSpeedY = 1.1*ballSpeedY;
                ballSpeedX = - ballSpeedX;
                //debugger;
            }
        else alert("Dupa");    
        // ballSpeedX = -ballSpeedX;
    }
/*  else if (ballX <= 0 || ballX >= cw - ballSize) {
        ballSpeedX = -ballSpeedX;
        speedUp();
    }*/
}


function player() {
    ctx.fillStyle = 'green';
    ctx.fillRect(playerX, playerY, paddelWidth, paddelHeight);
}


function ai() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(aiX, aiY, paddelWidth, paddelHeight);
}

topCanvas = canvas.offsetTop;
console.log(topCanvas);

function playerPosition(e) {
    console.log("pozycja myszy to " + (e.clientY - topCanvas));
    playerY = e.clientY - topCanvas - paddelHeight / 2;

    if (playerY >= ch - paddelHeight) {
        playerY = ch - paddelHeight
    }
    if (playerY <= 0) {
        playerY = 0;
    }


}

function speedUp() {
    console.log("przyśpieszam");
    //Prędkość X
    if(ballSpeedX > 0 && ballSpeedX < 16) {
        ballSpeedX += 0.4;
    }
    else if(ballSpeedX < 0 && ballSpeedX > -16) {
        ballSpeedX -= .4;
    }
    //Prędkość Y
    if(ballSpeedY > 0 && ballSpeedY < 16) {
        ballSpeedY += .3;
    }
    else if(ballSpeedY < 0 && ballSpeedY > -16) {
        ballSpeedY -= .3;
    }
}
//Sztuczna inteligencja
function aiPosition() {

    const middlePaddel = aiY + paddelHeight / 2;
    const middleBall = ballY + ballSize / 2;

    if(ballX > 500) {
        if(middlePaddel - middleBall > 200) {
            //console.log("więcej niż +200");
            aiY -= 25;

        }
        else if(middlePaddel - middleBall > 50) {
            //console.log("więcej niż 50 mniej niż 200");
            aiY -= 15;
        }
        else if(middlePaddel - middleBall < - 200) {
            //console.log("mniej niż -200");
            aiY += 25;
        }
        else if(middlePaddel - middleBall < - 50) {
            //console.log("mniej niż -50 więcej niż -200");
            aiY += 15;
        }
    }

    else if(ballX <= 500 && ballX > 150) {
        if (middlePaddel - middleBall > 100) {
            aiY -= 5;
        }
        else if (middlePaddel - middleBall < -100) {
            aiY += 5;
        }
    }
}

canvas.addEventListener("mousemove", playerPosition);


function game() {
    table();
    ball();
    player();
    ai();
    aiPosition();
}

setInterval(game, 1000 / 60)