class Sprite {
    constructor() { }
    update() { }
    draw(ctx) { }
}

class Game {
    constructor(callbackFunction = null) {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.sprites = [];
        this.keys = {}; // Store active keys
        this.bindKeyboardEvents();
        this.paused = false;
        this.restart = false;
        this.callbackFunction = callbackFunction; // Store the user-provided callback function
    }

    addSprite(sprite) {
        this.sprites.push(sprite);
    }

    update() {
        if (this.restart) {
            this.restart = false;
            this.paused = false;
            this.sprites = [];

            if (typeof this.callbackFunction === "function") {
                this.callbackFunction(); // Call the provided function
            }
        }

        if (this.paused) return; // Skip updating if paused

        let updatedSprites = [];
        for (let i = 0; i < this.sprites.length; i++) {
            let sprite = this.sprites[i];
            if (!sprite.update(this.sprites, this.keys)) {
                updatedSprites.push(sprite);
            }
        }
        this.sprites = updatedSprites;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.sprites.forEach((sprite) => sprite.draw(this.ctx));
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }

    bindKeyboardEvents() {
        // Handle keydown event
        window.addEventListener("keydown", (e) => {
            this.keys[e.key] = true; // Mark the key as active

            // Handle pause and continue keys
            if (e.key === "p") {
                this.paused = true; // Pause the game
            }
            if (e.key === "c") {
                this.paused = false; // Resume the game
            }
        });

        // Handle keyup event
        window.addEventListener("keyup", (e) => {
            this.keys[e.key] = false; // Mark the key as inactive
        });
    }
    clearSprites() {
        this.sprites = [];
    }
}
class Ball extends Sprite {
    constructor(game) {
        super();
        this.game = game;
        this.reset();
        this.x = game.canvas.width / 2;
        this.y = game.canvas.height / 2;
        this.radius = 10;
        this.color = "white";
    }

    reset() {
        this.x = this.game.canvas.width / 2;
        this.y = this.game.canvas.height / 2;
        this.radius = 10;
        this.speedX = Math.random() > 0.5 ? 5 : -5;
        this.speedY = (Math.random() * 4) - 2;
    }

    update(sprites) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off top and bottom walls
        if (this.y <= 0 || this.y >= this.game.canvas.height) {
            this.speedY *= -1;
        }

        // Check collision with paddles
        for (let sprite of sprites) {
            if (sprite instanceof Paddle && this.checkCollision(sprite)) {
                this.speedX *= -1;
                break;
            }
        }

        // Check scoring conditions
        if (this.x <= 0) {
            this.game.scores.computer++;
            this.reset();
        }
        if (this.x >= this.game.canvas.width) {
            this.game.scores.player++;
            this.reset();
        }

        // End game if score reaches 5
        if (this.game.scores.player === 5 || this.game.scores.computer === 5) {
            this.game.paused = true;
            this.game.endMessage = this.game.scores.player === 5 ? "Player Wins!" : "Computer Wins!";
        }
    }

    checkCollision(paddle) {
        return (
            this.x - this.radius < paddle.x + paddle.width &&
            this.x + this.radius > paddle.x &&
            this.y - this.radius < paddle.y + paddle.height &&
            this.y + this.radius > paddle.y
        );
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

class Paddle extends Sprite {
    constructor(x, game, isPlayer = false) {
        super();
        this.x = x;
        this.y = game.canvas.height / 2 - 50;
        this.width = 10;
        this.height = 100;
        this.color = "white";
        this.speed = 5;
        this.isPlayer = isPlayer;
        this.game = game;
    }
    update(sprites, keys) {
        if (this.isPlayer) {
            if (keys["ArrowUp"] && this.y > 0) this.y -= this.speed;
            if (keys["ArrowDown"] && this.y + this.height < this.game.canvas.height) this.y += this.speed;
        } else {
            // Simple AI for computer paddle
            for (let sprite of sprites) {
                if (sprite instanceof Ball){
                    if (sprite.y < this.y + this.height / 2) this.y -= this.speed;
                    if (sprite.y > this.y + this.height / 2) this.y += this.speed;
                }
            }
            
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}


class Scoreboard extends Sprite {
    constructor(game) {
        super();
        this.game = game;
    }

    draw(ctx) {
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(`${this.game.scores.player} - ${this.game.scores.computer}`, ctx.canvas.width / 2, 50);
        if (this.game.paused && this.game.endMessage) {
            ctx.fillText(this.game.endMessage, this.game.canvas.width / 2, this.game.canvas.height / 2);
            ctx.fillText("Refresh Page to Restart", this.game.canvas.width / 2, this.game.canvas.height / 2 + 40);
        }
    }
}
class Music extends Sprite {
    constructor(src, loop = true) {
        super();
        this.audio = new Audio(src);
        this.audio.loop = loop; // Set whether the audio should loop
        this.audio.volume = 0.5; // Default volume
        this.isPlaying = false;
    }

    play() {
        this.audio.play();
        this.isPlaying = true;
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
    }

    setVolume(volume) {
        this.audio.volume = Math.min(1, Math.max(0, volume)); // Clamp volume between 0 and 1
    }

    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.isPlaying = false;
    }

    update() {
        // No specific update logic needed for audio
    }

    draw(ctx) {
        // Music doesn't have a visible component, so no need to draw
    }
}

class NameDisplay extends Sprite {
    constructor(game, name = "", x = 20, y = 50) {
        super();
        this.game = game;
        this.name = name;
        this.x = x; // Default x position
        this.y = y; // Default y position
        this.color = "white";
        this.fontSize = 30;
    }

    update() {
        // No update logic needed for static name display
    }

    draw(ctx) {
        ctx.font = `${this.fontSize}px Arial`;
        ctx.fillStyle = this.color;
        ctx.textAlign = "left";
        ctx.fillText(this.name, this.x, this.y);
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    setName(name) {
        this.name = name;
    }

    setColor(color) {
        this.color = color;
    }

    setFontSize(size) {
        this.fontSize = size;
    }
}

const game = new Game();
game.scores = { player: 0, computer: 0 };

// function addBackground(colorOrImage) {
//     game.canvas.style.backgroundColor = typeof colorOrImage === "string" ? colorOrImage : "black";
//     if (typeof colorOrImage !== "string") {
//         game.canvas.style.backgroundImage = `url(${colorOrImage})`;
//         game.canvas.style.backgroundSize = "cover";
//     }
// }
function addBackground(background) {
    if (typeof background === "string") {
        if (background.endsWith(".png") || background.endsWith(".jpg") || background.endsWith(".jpeg")) {
            // It's an image
            game.canvas.style.backgroundImage = `url(${background})`;
            game.canvas.style.backgroundSize = "cover";
            game.canvas.style.backgroundPosition = "center";
        } else {
            // It's a color
            game.canvas.style.backgroundColor = background;
        }
    } else {
        console.error("Invalid background type. Use a valid image path or color.");
    }
}

function addBackgroundMusic(src, options = { loop: true, volume: 0.5 }) {
    const music = new Music(src, options.loop);
    music.setVolume(options.volume);
    game.addSprite(music);
    music.play(); // Start playing the background music immediately
}

function addPaddle1() {
    const paddle1 = new Paddle(20, game, true);
    game.addSprite(paddle1);
}

function addPaddle2() {
    const paddle2 = new Paddle(game.canvas.width - 30, game, false);
    game.addSprite(paddle2);
}


function addBall({ color = "white", speedX = 5, speedY = 2 } = {}) {
    const ball = new Ball(game);
    ball.color = color;
    ball.speedX = speedX;
    ball.speedY = speedY;
    game.addSprite(ball);
}

function updateBallColor(color) {
    var sprites = game.sprites;
    for (let sprite of sprites) {
        if (sprite instanceof Ball){
            sprite.color = color;
        }
    }    
}

function updateBallSpeed(speed) {
    var sprites = game.sprites;
    for (let sprite of sprites) {
        if (sprite instanceof Ball){
            sprite.speedX = speed;
            sprite.speedY = speed;
        }
    }    
}

function addName(name = "Player", x = 20, y = 50) {
    const nameDisplay = new NameDisplay(game, name, x, y);
    game.addSprite(nameDisplay);
    game.nameDisplay = nameDisplay; // Store reference for later updates
}

function updateName(newName) {
    var sprites = game.sprites;
    for (let sprite of sprites) {
        if (sprite instanceof NameDisplay){
            sprite.name = newName;
        }
    }    
}

function updateNamePosition(x, y) {
    var sprites = game.sprites;
    for (let sprite of sprites) {
        if (sprite instanceof NameDisplay){
            sprite.setPosition(x, y);
        }
    }    
}

function updateNameColor(color) {
    var sprites = game.sprites;
    for (let sprite of sprites) {
        if (sprite instanceof NameDisplay){
            sprite.setColor(color);
        }
    }  
}

function updateNameFontSize(size) {
    var sprites = game.sprites;
    for (let sprite of sprites) {
        if (sprite instanceof NameDisplay){
            sprite.setFontSize(size);
        }
    }  
}

function changeName(newName) {
    var sprites = game.sprites;
    for (let sprite of sprites) {
        if (sprite instanceof NameDisplay){
            sprite.name = newName;
        }
    }    
}

function changeNamePosition(x, y) {
    var sprites = game.sprites;
    for (let sprite of sprites) {
        if (sprite instanceof NameDisplay){
            sprite.setPosition(x, y);
        }
    }    
}

function changeNameColor(color) {
    var sprites = game.sprites;
    for (let sprite of sprites) {
        if (sprite instanceof NameDisplay){
            sprite.setColor(color);
        }
    }  
}

function changeNameFontSize(size) {
    var sprites = game.sprites;
    for (let sprite of sprites) {
        if (sprite instanceof NameDisplay){
            sprite.setFontSize(size);
        }
    }  
}

function changeBallColor(color) {
    updateBallColor(color);
}

function changeBallSpeed(speed) {
    updateBallSpeed(speed, speed);
}

function addScore() {
    const scoreboard = new Scoreboard(game);
    game.addSprite(scoreboard);
}

// Start the animation loop
game.animate();
