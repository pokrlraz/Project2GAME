const rows = 5;
const cols =5;

const trackRight = 0; //columns to be display from image
const trackLeft = 3;

const spriteWidth = 920; 
const spriteHeight = 920;  
const width = spriteWidth / cols; 
const height = spriteHeight / rows; 

let curXFrame = 0; 
let frameCount = 5;  // 5 frames per row

let srcX = 0;  // our image has no borders or other stuff
let srcY = 0;

//Assuming that at start the character will move right side 
let left = false;
let right = true;

let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 998;
canvas.height = 803;
document.body.appendChild(canvas);

let bgReady = false;
let bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
let heroReady = false;
let heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
let monsterReady = false;
let monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = "images/monster.png";

let bombReady = false;
let bombImage = new Image();
bombImage.onload = function () {
    bombReady = true;
};
bombImage.src="images/bomb.png"



// Game objects
let hero = {
    speed: 250, // movement in pixels per second
    x: 0,  // where on the canvas are they?
    y: 0  // where on the canvas are they?
};
let monster = {
// for this version, the monster does not move, so just and x and y
    x: 0,
    y: 0
};
let bomb1 ={
    x:180,
    y:180
};
let bomb2 ={
    x:680,
    y:290
};
let bomb3 ={
    x:880,
    y:290
};
let bomb4 ={
    x:220,
    y:29
};
let bomb5 ={
    x:800,
    y:29

};


let monstersCaught = 0;

// Handle keyboard controls
let keysDown = {}; 
addEventListener("keydown", function (e) {
    
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    
    delete keysDown[e.keyCode];
}, false);

function touchingBomb(who){
    if(
        (who.x<= (bomb1.x+12)
        && bomb1.x -33<=(who.x+90 )
        &&who.y <= (bomb1.y+12)
        && bomb1.y-33<= (who.y+80)) ||
    
        (who.x <= (bomb2.x+12)
        && bomb2.x-33 <=(who.x + 90)
        &&who.y <= (bomb2.y +12)
        && bomb2.y-33 <= (who.y+80))||

        (who.x <= (bomb3.x+12)
        && bomb3.x-33 <=(who.x + 90)
        &&who.y <= (bomb3.y +12)
        && bomb3.y-33 <= (who.y+80))||

        (who.x <= (bomb4.x+12)
        && bomb4.x-33 <=(who.x + 90)
        &&who.y <= (bomb4.y +12)
        && bomb4.y-33 <= (who.y+80))||

        (who.x <= (bomb5.x+12)
        && bomb5.x-33 <=(who.x + 90)
        &&who.y <= (bomb5.y +12)
        && bomb5.y-33 <= (who.y+80))
    )
    return true;
    
}

// Update game objects
let update = function (modifier) {

    ctx.clearRect(hero.x, hero.y, width, height);
    left = false;
    right = false;
    
    if (38 in keysDown && hero.y >-20) { //  holding up key
        hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown && hero.y < canvas.height -190) { //  holding down key
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown && hero.x >-45) { // holding left key
        hero.x -= hero.speed * modifier;
        left = false;
        right = true;
    }
    if (39 in keysDown && hero.x < canvas.width -155) { // holding right key
        hero.x += hero.speed * modifier;
        left = true;
        right = false; 
    }
    
    
    // Are they touching?
    if (
        hero.x <= (monster.x )
        && monster.x +60<= (hero.x+200 )
        && hero.y <= (monster.y)
        && monster.y-20 <= (hero.y +90)
    ) {
        ++monstersCaught;       // keep track of our “score”
        reset();       // start a new cycle
    }
    if (touchingBomb(hero)){
        alert("Bird is caught by lightning and died, GAME OVER")
          
    }

    curXFrame = ++curXFrame % frameCount; 
    srcX = curXFrame * width;   	
    
    if (left) {
        //calculate srcY 
        srcY = trackLeft * height;
    }
 
    if (right) {
        //calculating y coordinate for spritesheet
        srcY = trackRight * height;
    }

};

// The main game loop
let main = function () {
    let now = Date.now();
    let delta = now - then;
    update(delta / 1000);
    render();
    then = now;
    //  Request to do this again ASAP
    requestAnimationFrame(main);
};

let render = function () {
    if (bgReady) {
        
        ctx.drawImage(bgImage, 0, 0);
    }
    if (heroReady) {
        ctx.drawImage(heroImage, srcX, srcY, width, height, hero.x, hero.y, width, height);
    }

    if (monsterReady) {
        ctx.drawImage(monsterImage, (monster.x), (monster.y));
    }
    if(bombReady){
        ctx.drawImage(bombImage, bomb1.x,bomb1.y);
        ctx.drawImage(bombImage, bomb2.x,bomb2.y);
        ctx.drawImage(bombImage, bomb3.x,bomb3.y);
        ctx.drawImage(bombImage, bomb4.x,bomb4.y);
        ctx.drawImage(bombImage, bomb5.x,bomb5.y);

    }
        // Score
        ctx.fillStyle = "rgb(250, 250, 250)";
        ctx.font = "24px black";
        
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("Bird caught: " + monstersCaught, 32, 0);
    

}
// Reset the game when the player catches a monster
let reset = function () {
    hero.x = (canvas.width / 2)- 32;
    hero.y = (canvas.height / 2)-32;

    let gameBreak = true;
    while(gameBreak){
    
        monster.x = (Math.random() * (canvas.width-45 ));
        monster.y = 32+(Math.random() * (canvas.height -120));
        if (!touchingBomb(monster)){
            gameBreak = false;
    
        }
    }
 
};


let then = Date.now();
reset();
main();