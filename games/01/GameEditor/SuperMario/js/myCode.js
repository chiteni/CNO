// Fixed-world game adapter; Sprite and Game are unchanged.
(function (global) {
  const W = 960, H = 600, floor = 550;
  const lessons = {
    1: { title: 'Make the Ball Move', objective: 'Try speed = 10, jumpPower = 16, then ballSize = 50.' },
    2: { title: 'JavaScript Conditions', objective: 'Use score to activate rewards at 5, 10 and 15 coins.' },
    3: { title: 'Combining Conditions', objective: 'Collect 15 coins, then touch the unlocked door.' }
  };
  const overlaps = (a,b) => a.x < b.x+b.width && a.x+a.width > b.x && a.y < b.y+b.height && a.y+a.height > b.y;
  class WorldSprite extends Sprite {
    constructor(runtime) { super(); this.runtime = runtime; }
    update() { return false; }
    draw(ctx) {
      const c = this.runtime.game.canvas, scale = Math.min(c.width/W,c.height/H);
      ctx.save(); ctx.setTransform(scale,0,0,scale,(c.width-W*scale)/2,(c.height-H*scale)/2);
      this.paint(ctx); ctx.restore();
    }
  }
  class Scene extends WorldSprite {
    update(sprites,keys) { this.runtime.step(keys); return false; }
    paint(ctx) {
      const r = this.runtime, s = r.state;
      ctx.fillStyle = '#0f172a'; ctx.fillRect(0,0,W,H);
      ctx.fillStyle = '#1e293b';
      for (let x=0;x<W;x+=100) ctx.fillRect(x,300+x%90,75,250);
      ctx.fillStyle = '#334155'; ctx.fillRect(0,floor,W,H-floor);
      ctx.fillStyle = '#38bdf8'; ctx.fillRect(0,floor,W,4);
      for (const p of r.platforms) {
        ctx.fillStyle = '#475569'; ctx.fillRect(p.x,p.y,p.width,p.height);
        ctx.fillStyle = '#94a3b8'; ctx.fillRect(p.x,p.y,p.width,3);
      }
      for (const c of r.coins) if (!c.collected) {
        ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(c.x+9,c.y+9,9,0,Math.PI*2); ctx.fill();
      }
      if (s.lesson !== 1) {
        ctx.fillStyle = s.doorOpen ? '#22c55e' : '#64748b';
        ctx.fillRect(r.door.x,r.door.y,r.door.width,r.door.height);
        ctx.fillStyle = '#fff'; ctx.font = '13px sans-serif';
        ctx.fillText(s.doorOpen ? 'EXIT' : 'LOCKED',r.door.x-3,r.door.y-12);
      }
      ctx.fillStyle = '#f8fafc'; ctx.font = 'bold 22px sans-serif'; ctx.fillText('CNO Coding Games',22,32);
      ctx.font = '16px sans-serif'; ctx.fillText(lessons[s.lesson].title,22,59);
      ctx.font = '14px sans-serif'; ctx.fillText(lessons[s.lesson].objective,22,84);
      ctx.fillText('Click the game | Arrow keys: move | Space: jump / double jump',22,110);
      ctx.fillText(s.lesson === 1 ? 'Speed: '+s.speed+' | Jump: '+r.jumpPower+' | Size: '+s.ballSize : 'Coins: '+s.coins+'/16 | Jump: '+r.jumpPower+' | Door: '+(s.doorOpen?'open':'locked'),22,136);
      if (r.reachedHighPlatform && s.lesson === 1) { ctx.fillStyle = '#86efac'; ctx.fillText('You reached the high platform!',22,162); }
    }
  }
  class Ball extends WorldSprite {
    constructor(r) { super(r); this.x=35; this.y=floor-r.state.ballSize; this.vy=0; this.jumps=0; }
    get width() { return this.runtime.state.ballSize; }
    get height() { return this.width; }
    paint(ctx) {
      ctx.fillStyle=this.runtime.state.ballColor; ctx.beginPath(); ctx.arc(this.x+this.width/2,this.y+this.height/2,this.width/2,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle='#fff'; ctx.lineWidth=2; ctx.stroke();
    }
  }
  class WinText extends WorldSprite {
    paint(ctx) { if (this.runtime.win) { ctx.fillStyle='#86efac'; ctx.font='bold 64px sans-serif'; ctx.textAlign='center'; ctx.fillText('WIN',W/2,260); } }
  }
  class BallRuntime {
    constructor(game,program,logger) {
      this.game=game; this.program=program; this.logger=logger;
      this.state={lesson:3,speed:5,jumpPower:12,ballSize:30,ballColor:'cyan',superJump:false,doorOpen:false,score:0,coins:0};
      program(this.state); this.validate();
      this.platforms=[{x:160,y:465,width:170,height:16},{x:390,y:400,width:170,height:16},{x:635,y:335,width:180,height:16}];
      this.ground={x:0,y:floor,width:W,height:50};
      this.coins=this.state.lesson===1?[]:Array.from({length:16},(_,i)=>({x:90+i*48,y:522,width:18,height:18,collected:false}));
      this.door={x:885,y:480,width:44,height:70};
      this.ball=new Ball(this); this.win=false; this.spaceDown=false; this.lastTime=null; this.accumulator=0; this.reachedHighPlatform=false;
    }
    validate() {
      const s=this.state;
      if (!lessons[s.lesson]) throw new Error('lesson must be 1, 2 or 3.');
      for (const [name,min,max] of [['speed',1,15],['jumpPower',1,24],['ballSize',10,70]]) {
        if (!Number.isFinite(s[name]) || s[name]<min || s[name]>max) throw new Error(name+' must be between '+min+' and '+max+'.');
      }
      if (typeof s.ballColor!=='string' || !/^[a-zA-Z]+$|^#[0-9a-fA-F]{3,8}$/.test(s.ballColor)) throw new Error('Use a color name or hex color for ballColor.');
      if (typeof s.superJump!=='boolean' || typeof s.doorOpen!=='boolean') throw new Error('superJump and doorOpen must be true or false.');
    }
    get jumpPower() { return this.state.superJump?20:this.state.jumpPower; }
    setupScene() { this.game.keys={}; this.game.sprites=[new Scene(this),this.ball,new WinText(this)]; }
    collect(coin) {
      if (coin.collected) return;
      coin.collected=true; this.state.coins++; this.state.score=this.state.coins;
      const previous={...this.state};
      try { this.program(this.state,true); this.validate(); }
      catch (error) { this.state=previous; this.logger('Code error: '+error.message); }
    }
    step(keys) {
      const now=performance.now(); if (this.lastTime===null) this.lastTime=now;
      this.accumulator+=Math.min(100,now-this.lastTime); this.lastTime=now;
      while (this.accumulator>=1000/60) { this.tick(keys); this.accumulator-=1000/60; }
    }
    tick(keys) {
      if (this.win) return;
      const active=document.activeElement===this.game.canvas, b=this.ball;
      if (active) b.x+=((keys.ArrowRight?1:0)-(keys.ArrowLeft?1:0))*this.state.speed;
      b.x=Math.max(0,Math.min(W-b.width,b.x));
      const space=active && !!keys[' '];
      if (space && !this.spaceDown && b.jumps<2) { b.vy=-this.jumpPower; b.jumps++; }
      this.spaceDown=space;
      const oldBottom=b.y+b.height; b.vy+=0.6; b.y+=b.vy;
      for (const p of [...this.platforms,this.ground]) {
        if (b.vy>=0 && oldBottom<=p.y && b.y+b.height>=p.y && b.x+b.width>p.x && b.x<p.x+p.width) {
          b.y=p.y-b.height; b.vy=0; b.jumps=0;
          if (p===this.platforms[2]) this.reachedHighPlatform=true;
        }
      }
      for (const coin of this.coins) if (!coin.collected && overlaps(b,coin)) this.collect(coin);
      if (this.state.lesson!==1 && this.state.doorOpen && overlaps(b,this.door)) { this.win=true; this.logger('WIN! You reached the unlocked exit.'); }
    }
  }
  global.CNOBall={BallRuntime,lessons,overlaps};
})(window);
