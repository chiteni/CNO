// Bounded lesson interpreter: no eval, new Function, browser APIs or loops.
(function (global) {
  let runtime=null;
  const writable=new Set(['lesson','speed','jumpPower','ballSize','ballColor','superJump','doorOpen']);
  const readable=new Set([...writable,'score','coins']);
  function compile(source) {
    if (source.length>12000) throw new Error('Please keep your code under 12,000 characters.');
    const tokens=[]; let pos=0,line=1;
    const pattern=/^(?:\s+|\/\/[^\n]*|\d+(?:\.\d+)?|"[^"\n]*"|'[^'\n]*'|[A-Za-z_]\w*|>=|<=|===|!==|==|!=|[{}();=<>-])/;
    while (pos<source.length) {
      const match=source.slice(pos).match(pattern);
      if (!match) throw new Error('Line '+line+': unexpected character. Use variables, values and if statements.');
      const value=match[0]; if (!/^\s|^\/\//.test(value)) tokens.push({value,line});
      line+=(value.match(/\n/g)||[]).length; pos+=value.length;
    }
    tokens.push({value:'<end>',line}); let i=0;
    const peek=()=>tokens[i].value;
    const fail=message=>{throw new Error('Line '+tokens[i].line+': '+message);};
    const take=value=>{if(peek()!==value) fail('Expected '+value+'.'); i++;};
    function value() {
      const token=peek();
      if(token==='-') { i++; const operand=value(); return s=>-operand(s); }
      if(/^\d/.test(token)) { i++; return ()=>Number(token); }
      if(/^["']/.test(token)) { i++; return ()=>token.slice(1,-1); }
      if(token==='true'||token==='false') { i++; return ()=>token==='true'; }
      if(readable.has(token)) { i++; return s=>s[token]; }
      fail('Expected a number, color, true/false or a lesson variable.');
    }
    function block(depth) { if(depth>12) fail('Too many nested conditions.'); take('{'); const body=statements(depth); take('}'); return body; }
    function statements(depth=0) {
      const body=[];
      while(peek()!=='<end>' && peek()!=='}') {
        if(peek()==='if') {
          i++; take('('); const left=value(),op=peek();
          const compare={'>=':(a,b)=>a>=b,'<=':(a,b)=>a<=b,'>':(a,b)=>a>b,'<':(a,b)=>a<b,'===':(a,b)=>a===b,'==':(a,b)=>a===b,'!==':(a,b)=>a!==b,'!=':(a,b)=>a!==b}[op];
          if(!compare) fail('Use a comparison such as >=.');
          i++; const right=value(); take(')'); const yes=block(depth+1); let no=[];
          if(peek()==='else') { i++; no=block(depth+1); }
          body.push(s=>{for(const run of compare(left(s),right(s))?yes:no) run(s,false);});
        } else {
          if(['let','var','const'].includes(peek())) i++;
          const name=peek(); if(!writable.has(name)) fail('You can change lesson, speed, jumpPower, ballSize, ballColor, superJump or doorOpen.');
          i++; take('='); const read=value(); take(';');
          body.push((s,rewardsOnly)=>{if(!rewardsOnly) s[name]=read(s);});
        }
      }
      return body;
    }
    const body=statements(); take('<end>');
    return (state,rewardsOnly=false)=>{for(const run of body) run(state,rewardsOnly);};
  }
  function runStudentCode(code,logger=()=>{}) {
    try {
      const next=new global.CNOBall.BallRuntime(global.game,compile(code),logger);
      next.setupScene(); runtime=next; logger('Code ran. Click the game to play.');
      global.game.canvas.focus({preventScroll:true}); return true;
    } catch(error) { logger('Code error: '+error.message); return false; }
  }
  global.addEventListener('load',()=>{
    const canvas=document.getElementById('canvas'); canvas.tabIndex=0;
    canvas.addEventListener('pointerdown',()=>canvas.focus({preventScroll:true}));
    canvas.addEventListener('blur',()=>{if(global.game) global.game.keys={};});
    global.addEventListener('blur',()=>{if(global.game) global.game.keys={};});
    global.addEventListener('keydown',event=>{if(document.activeElement===canvas && ['ArrowLeft','ArrowRight',' '].includes(event.key)) event.preventDefault();});
  });
  global.StudentRunner={compile,translateStudentCode:code=>code,runStudentCode,getRuntime:()=>runtime};
})(window);
