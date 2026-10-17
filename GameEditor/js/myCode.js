// Adapted from Paddle_Party_Kids/script/myCode.js for the existing editor.
(function(global) {
function createMatch(game, settings, enabled) {
// All custom game behaviour lives here. The supplied engine stays unchanged.
const party = { left: settings.leftSC, right: settings.rightSC, target: settings.win, playing: false, winner: '', spaceDown: false, direction: 1, started: false };
const statusLabel = { textContent: 'Press Space to serve' };
const scores = { score1: {textContent: 0}, score2: {textContent: 0} };
const document = { getElementById: id => scores[id] };
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
    constructor(side, up, down) {
        super();this.x=settings[side+'X'];this.y=settings[side+'Y'];
        this.width=settings[side+'W'];this.height=settings[side+'H'];
        this.speed=settings[side+'S'];this.color=settings[side];this.up=up;this.down=down;
    }
    update(sprites, keys) {
        if(party.winner) return;
        if(keys[this.up] || keys[this.up.toUpperCase()]) this.y-=this.speed;
        if(keys[this.down] || keys[this.down.toUpperCase()]) this.y+=this.speed;
        this.y=Math.max(topWall+8,Math.min(bottomWall-this.height-8,this.y));
    }
    draw(ctx) {
        const gradient=ctx.createLinearGradient(this.x,0,this.x+this.width,0);
        gradient.addColorStop(0,this.color);gradient.addColorStop(.5,this.color);gradient.addColorStop(1,this.color);
        rounded(ctx,this.x,this.y,this.width,this.height,this.width/2,gradient);
        rounded(ctx,this.x+7,this.y+10,5,22,3,'#ffffff65');
        face(ctx,this.x+this.width/2,this.y+this.height/2,1);

    }
}
class PartyBall extends Sprite {
    constructor(){super();this.radius=settings.ballR;this.reset();}
    reset(){this.x=settings.ballX;this.y=settings.ballY;this.speedX=0;this.speedY=0;this.trail=[];party.playing=false;}
    serve(){
        if(party.playing || party.winner) return;
        this.speedX=settings.ballS*party.direction;this.speedY=(Math.random()>.5?1:-1)*2.6;
        party.playing=true;party.started=true;statusLabel.textContent='Rally on! First to '+party.target+' wins';
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
        for(const paddle of [leftPaddle,rightPaddle].filter(Boolean)){
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
        party[side]+=settings.pts;document.getElementById('score1').textContent=party.left;document.getElementById('score2').textContent=party.right;party.direction=side==='left'?1:-1;this.reset();
        if(party[side]>=party.target){party.winner=side==='left'?'Player 1':'Player 2';statusLabel.textContent=party.winner+' wins! Click Run for a new match.';}
        else statusLabel.textContent=(side==='left'?'Player 1':'Player 2')+' scores! Press Space to serve';
    }
    draw(ctx){
        this.trail.forEach((p,i)=>{ctx.globalAlpha=(8-i)/30;ctx.fillStyle='#ffffff';ctx.beginPath();ctx.arc(p.x,p.y,Math.max(2,9-i),0,Math.PI*2);ctx.fill();});ctx.globalAlpha=1;
        ctx.save();ctx.shadowColor='#ffffff';ctx.shadowBlur=0;ctx.fillStyle=settings.ball;ctx.beginPath();ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);ctx.fill();ctx.restore();
        face(ctx,this.x,this.y,.7);
    }
}
class PartyMessage extends Sprite {
    draw(ctx){
        if(party.playing || (party.started && !party.winner))return;
        ctx.save();
        if (!party.winner) {
            text(ctx,'Press Space to play',partyBall.x,partyBall.y-partyBall.radius-30,24,'#ffffff');
            ctx.restore();
            return;
        }
        ctx.fillStyle = '#00000075'; ctx.fillRect(0, topWall, 1000, 600-topWall);
        rounded(ctx,260,235,480,205,26,'#ffffff');
        text(ctx,party.winner?'YOU DID IT!':'READY, SET, BOUNCE!',500,285,16,'#78551a');
        text(ctx,party.winner?party.winner+' wins!':'Ready to play?',500,334,34,'#181820');
        text(ctx,party.winner?'Click Run to play again':'Press SPACE to launch the ball',500,377,19,'#454550');
        text(ctx,party.winner?'Final score  '+party.left+' : '+party.right:'W / S   •   PLAYER 1       PLAYER 2   •   ↑ / ↓',500,410,13,'#62626e');
        ctx.restore();
    }
}
const leftPaddle=enabled.left ? new PartyPaddle('left','w','s') : null;
const rightPaddle=enabled.right ? new PartyPaddle('right','ArrowUp','ArrowDown') : null;
const partyBall=enabled.ball ? new PartyBall() : null;
if(party.left>=party.target || party.right>=party.target) {
    party.winner=party.left>=party.target?'Player 1':'Player 2';
    statusLabel.textContent=party.winner+' wins! Click Run for a new match.';
}
if(enabled.full) game.addSprite(new PartyBackground());
for(const sprite of [leftPaddle,rightPaddle,partyBall]) if(sprite) game.addSprite(sprite);
if(enabled.full) game.addSprite(new PartyMessage());

return {party, leftPaddle, rightPaddle, ball:partyBall, status:statusLabel};
}
class Runtime {
  constructor(game, program, logger) {
    this.game=game;
    this.state={"left":"blue","leftS":7,"leftX":50,"leftY":200,"leftW":30,"leftH":150,"right":"red","rightS":7,"rightX":920,"rightY":200,"rightW":30,"rightH":150,"ball":"white","ballS":6,"ballX":500,"ballY":300,"ballR":16,"leftSC":0,"rightSC":0,"pts":1,"win":5};
    const assigned = new Set();
    program(new Proxy(this.state, {set(target, name, value) {
      assigned.add(name); target[name] = value; return true;
    }}));
    this.enabled = {
      left: [...assigned].some(name => /^left(?:[SXYWH])?$/.test(name)),
      right: [...assigned].some(name => /^right(?:[SXYWH])?$/.test(name)),
      ball: [...assigned].some(name => /^ball(?:[SXYR])?$/.test(name)),
      leftSC: assigned.has('leftSC'), rightSC: assigned.has('rightSC')
    };
    this.enabled.full = this.enabled.left && this.enabled.right && this.enabled.ball;
    const s=this.state;
    const ranges=[['leftS',1,15],['rightS',1,15],['leftW',10,150],['rightW',10,150],['leftH',40,250],['rightH',40,250],['leftX',0,1000-s.leftW],['rightX',0,1000-s.rightW],['leftY',8,592-s.leftH],['rightY',8,592-s.rightH],['ballS',1,11],['ballR',5,30],['ballX',s.ballR,1000-s.ballR],['ballY',4+s.ballR,596-s.ballR],['leftSC',0,1000],['rightSC',0,1000],['pts',1,1000],['win',1,1000]];
    for(const [name,min,max] of ranges) {
      if(!Number.isFinite(s[name]) || s[name]<min || s[name]>max) throw new Error(name+' must be between '+min+' and '+max+'.');
    }
    for(const name of ['leftSC','rightSC','pts','win']) if(!Number.isInteger(s[name])) throw new Error(name+' must be a whole number.');
    if(this.enabled.left && this.enabled.right && s.leftX+s.leftW>=s.rightX) throw new Error('Place the left paddle to the left of the right paddle.');
    for(const name of ['left','right','ball']) if(typeof s[name]!=='string' || !/^[a-zA-Z]+$|^#[0-9a-fA-F]{3,8}$/.test(s[name])) throw new Error(name+' must be a color name or hex color.');
    this.sprites=[];
    this.match=createMatch({addSprite:sprite=>this.sprites.push(sprite)},this.state,this.enabled);
    this.lastTime=null; this.accumulator=0; this.logger=logger; this.reportedWinner=false;
  }
  setupScene() {
    const runtime=this;
    this.game.keys={};
    this.game.sprites=[new class extends Sprite {
      update() { runtime.update(); return false; }
      draw(ctx) { runtime.draw(ctx); }
    }()];
  }
  update() {
    const now=performance.now();
    if(this.lastTime===null) this.lastTime=now;
    this.accumulator+=Math.min(100,now-this.lastTime); this.lastTime=now;
    while(this.accumulator>=1000/60) { this.tick(); this.accumulator-=1000/60; }
  }
  tick() {
    const keys=document.activeElement===this.game.canvas ? this.game.keys : {};
    for(const sprite of this.sprites) sprite.update(this.sprites,keys);
    if(this.match.party.winner && !this.reportedWinner) {this.reportedWinner=true; this.logger(this.match.status.textContent);}
  }
  draw(ctx) {
    const c=this.game.canvas, scale=Math.min(c.width/1000,c.height/680);
    ctx.save(); ctx.setTransform(scale,0,0,scale,(c.width-1000*scale)/2,(c.height-680*scale)/2);
    if(this.enabled.full) { ctx.fillStyle='#0e1623'; ctx.fillRect(0,0,1000,680); }
    ctx.font='bold 24px Arial'; ctx.textAlign='center';
    if(this.enabled.leftSC) { ctx.fillStyle=this.state.left;ctx.fillText('PLAYER 1: '+this.match.party.left,160,32); }
    if(this.enabled.full) { ctx.fillStyle='#fff';ctx.fillText('PADDLE PARTY',500,32); }
    if(this.enabled.rightSC) { ctx.fillStyle=this.state.right;ctx.fillText('PLAYER 2: '+this.match.party.right,840,32); }
    if(this.enabled.full) { ctx.font='14px Arial';ctx.fillStyle='#cbd5e1';ctx.fillText('W / S: Player 1     |     Up / Down: Player 2     |     Space: Serve     |     First to '+this.state.win,500,60); }
    ctx.translate(0,80);
    for(const sprite of this.sprites) {ctx.save();sprite.draw(ctx);ctx.restore();}
    if(this.enabled.full && this.match.party.started && !this.match.party.playing && !this.match.party.winner) {
      ctx.font='bold 22px Arial';ctx.textAlign='center';ctx.fillStyle='#fff';ctx.fillText(this.match.status.textContent,500,100);
    }
    ctx.restore();
  }
}
global.PaddleParty={Runtime};
})(window);
