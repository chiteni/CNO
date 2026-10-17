// All custom game behaviour lives here. The supplied engine stays unchanged.
const party = { left: 0, right: 0, target: 5, playing: false, winner: '', spaceDown: false, direction: 1, started: false };
const statusLabel = document.getElementById('status');
const topWall = 0;
const bottomWall = 600;
function rounded(ctx, x, y, w, h, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.roundRect(x, y, w, h, radius); ctx.fill();
}
function text(ctx, message, x, y, size, color) {
    ctx.font = 'bold ' + size + 'px Arial'; ctx.fillStyle = color;
    ctx.textAlign = 'center'; ctx.fillText(message, x, y);
}
// Friendly faces are drawn directly with the canvas, no external assets.
function face(ctx,x,y,scale) {
    ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);
    ctx.fillStyle='#15243e';
    for(const eye of [-5,5]) {ctx.beginPath();ctx.ellipse(eye,-3,2,3,0,0,Math.PI*2);ctx.fill();}
    ctx.strokeStyle='#15243e';ctx.lineWidth=2.5;ctx.lineCap='round';ctx.beginPath();ctx.arc(0,1,4,0,Math.PI);ctx.stroke();
    ctx.fillStyle='#ffb2c4';for(const cheek of [-9,9]){ctx.beginPath();ctx.ellipse(cheek,3,2.5,2,0,0,Math.PI*2);ctx.fill();}
    ctx.restore();
}
class PartyBackground extends Sprite {
    draw(ctx) {
        ctx.fillStyle='#0e1623';ctx.fillRect(0,0,1000,600);
        for(let i=0;i<42;i++) {
            ctx.fillStyle=i%7===0?'#ffda7b':'#60718e';
            const x=(i*137+29)%1000,y=(i*79+31)%600;
            if(i%7===0){ctx.beginPath();for(let j=0;j<10;j++){const a=j*Math.PI/5-Math.PI/2,r=j%2?2:5;const px=x+Math.cos(a)*r,py=y+Math.sin(a)*r;if(j===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);}ctx.closePath();ctx.fill();}
            else{ctx.beginPath();ctx.arc(x,y,1.3,0,Math.PI*2);ctx.fill();}
        }
        ctx.strokeStyle='#ffffff25';ctx.lineWidth=3;ctx.setLineDash([8,12]);ctx.beginPath();ctx.moveTo(500,0);ctx.lineTo(500,600);ctx.stroke();ctx.setLineDash([]);
    }
}
class PartyPaddle extends Sprite {
    constructor(x, color, up, down) {
        super();this.x=x;this.y=225;this.width=30;this.height=150;
        this.color=color;this.up=up;this.down=down;
    }
    update(sprites, keys) {
        if(party.winner) return;
        if(keys[this.up] || keys[this.up.toUpperCase()]) this.y-=7;
        if(keys[this.down] || keys[this.down.toUpperCase()]) this.y+=7;
        this.y=Math.max(topWall+8,Math.min(bottomWall-this.height-8,this.y));
    }
    draw(ctx) {
        const gradient=ctx.createLinearGradient(this.x,0,this.x+this.width,0);
        gradient.addColorStop(0,this.color);gradient.addColorStop(.5,this.color==='#17b8fa'?'#42ceff':'#ff8c83');gradient.addColorStop(1,this.color);
        rounded(ctx,this.x,this.y,this.width,this.height,this.width/2,gradient);
        rounded(ctx,this.x+7,this.y+10,5,22,3,'#ffffff65');
        face(ctx,this.x+this.width/2,this.y+this.height/2,1);

    }
}
class PartyBall extends Sprite {
    constructor(){super();this.radius=16;this.reset();}
    reset(){this.x=500;this.y=300;this.speedX=0;this.speedY=0;this.trail=[];party.playing=false;}
    serve(){
        if(party.playing || party.winner) return;
        this.speedX=6*party.direction;this.speedY=(Math.random()>.5?1:-1)*2.6;
        party.playing=true;party.started=true;statusLabel.textContent='Rally on! First to 5 wins';
    }
    update(sprites,keys){
        const pressed=!!keys[' '];
        if(pressed && !party.spaceDown) this.serve();
        party.spaceDown=pressed;
        if(!party.playing || party.winner)return;
        this.trail=[];
        this.x+=this.speedX;this.y+=this.speedY;
        if(this.y-this.radius<topWall+4){this.y=topWall+4+this.radius;this.speedY=Math.abs(this.speedY);}
        if(this.y+this.radius>bottomWall-4){this.y=bottomWall-4-this.radius;this.speedY=-Math.abs(this.speedY);}
        for(const paddle of [leftPaddle,rightPaddle]){
            const toward=paddle===leftPaddle?this.speedX<0:this.speedX>0;
            const overlaps=this.x-this.radius<paddle.x+paddle.width && this.x+this.radius>paddle.x && this.y-this.radius<paddle.y+paddle.height && this.y+this.radius>paddle.y;
            if(toward && overlaps){
                this.x=paddle===leftPaddle?paddle.x+paddle.width+this.radius:paddle.x-this.radius;
                const offset=(this.y-(paddle.y+paddle.height/2))/(paddle.height/2);
                this.speedX=(paddle===leftPaddle?1:-1)*Math.min(11,Math.abs(this.speedX)+.35);
                this.speedY=offset*6;
            }
        }
        if(this.x+this.radius<0)this.point('right');
        else if(this.x-this.radius>1000)this.point('left');
    }
    point(side){
        party[side]++;document.getElementById('score1').textContent=party.left;document.getElementById('score2').textContent=party.right;party.direction=side==='left'?1:-1;this.reset();
        if(party[side]>=party.target){party.winner=side==='left'?'Player 1':'Player 2';statusLabel.textContent=party.winner+' wins! Start a new match.';}
        else statusLabel.textContent=(side==='left'?'Player 1':'Player 2')+' scores! Press Space to serve';
    }
    draw(ctx){
        this.trail.forEach((p,i)=>{ctx.globalAlpha=(8-i)/30;ctx.fillStyle='#ffffff';ctx.beginPath();ctx.arc(p.x,p.y,Math.max(2,9-i),0,Math.PI*2);ctx.fill();});ctx.globalAlpha=1;
        ctx.save();ctx.shadowColor='#ffffff';ctx.shadowBlur=0;ctx.fillStyle='#ffffff';ctx.beginPath();ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);ctx.fill();ctx.restore();
        face(ctx,this.x,this.y,.7);
    }
}
class PartyMessage extends Sprite {
    draw(ctx){
        if(party.playing || (party.started && !party.winner))return;
        ctx.save();
        ctx.fillStyle = '#00000075'; ctx.fillRect(0, topWall, 1000, 600-topWall);
        rounded(ctx,260,235,480,205,26,'#ffffff');
        text(ctx,party.winner?'YOU DID IT!':'READY, SET, BOUNCE!',500,285,16,'#78551a');
        text(ctx,party.winner?party.winner+' wins!':'Ready to play?',500,334,34,'#181820');
        text(ctx,party.winner?'Click New match to play again':'Press SPACE to launch the ball',500,377,19,'#454550');
        text(ctx,party.winner?'Final score  '+party.left+' : '+party.right:'W / S   •   PLAYER 1       PLAYER 2   •   ↑ / ↓',500,410,13,'#62626e');
        ctx.restore();
    }
}
const leftPaddle=new PartyPaddle(25,'#17b8fa','w','s');
const rightPaddle=new PartyPaddle(945,'#ff7068','ArrowUp','ArrowDown');
const partyBall=new PartyBall();
game.addSprite(new PartyBackground());game.addSprite(leftPaddle);game.addSprite(rightPaddle);game.addSprite(partyBall);game.addSprite(new PartyMessage());
function newMatch(){
    party.left=0;party.right=0;document.getElementById('score1').textContent='0';document.getElementById('score2').textContent='0';party.winner='';party.direction=1;party.started=false;
    game.paused=false;game.keys={};party.spaceDown=false;
    leftPaddle.y=rightPaddle.y=225;partyBall.reset();
    statusLabel.textContent='Press Space to serve';game.canvas.focus();
}
document.getElementById('restart').addEventListener('click',newMatch);
document.getElementById('serve').addEventListener('click',()=>partyBall.serve());
window.addEventListener('keydown',event=>{
    if([' ','ArrowUp','ArrowDown'].includes(event.key) && event.target.tagName!=='BUTTON')event.preventDefault();
});
window.addEventListener('blur',()=>{game.keys={};party.spaceDown=false;});
for(const button of document.querySelectorAll('[data-key]')){
    button.addEventListener('pointerdown',event=>{event.preventDefault();button.setPointerCapture(event.pointerId);game.keys[button.dataset.key]=true;});
    for(const eventName of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(eventName,()=>{game.keys[button.dataset.key]=false;});
}
