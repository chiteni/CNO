class Sprite {
    constructor() { }

    update() { }

    draw(ctx) { }
}

class Game {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.sprites = [];
        this.keys = {};
        this.bindKeyboardEvents();
        this.mouse = { x: 0, y: 0, clicked: false, down: false };
        this.bindMouseEvents();
    }

    addSprite(sprite) {
        this.sprites.push(sprite);
    }

    update() {
        let updatedSprites = [];
        for (let i = 0; i < this.sprites.length; i++) {
            let sprite = this.sprites[i];

            if (!sprite.update(this.sprites, this.keys, this.mouse)) {
                updatedSprites.push(sprite);
            }
        }
        this.sprites = updatedSprites;

        this.mouse.clicked = false;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.sprites.forEach(sprite => sprite.draw(this.ctx));
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }

    bindKeyboardEvents() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
    }

    bindMouseEvents() {
        this.canvas.addEventListener("mousemove", (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        this.canvas.addEventListener("mousedown", () => {
            this.mouse.down = true;
            this.mouse.clicked = true;
        });

        this.canvas.addEventListener("mouseup", () => {
            this.mouse.down = false;
        });

        this.canvas.addEventListener("mouseleave", () => {
            this.mouse.down = false;
        });
    }
}
