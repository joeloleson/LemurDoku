(function(){
  const app=document.getElementById('lemurdoku-app'); if(!app) return;
  const base=app.dataset.assetBase||'assets/';
  const configs={
    1:{n:4,box:[2,2],givens:8,title:'Jungle Sprout',coach:['Tap a glowing lemur in the tray.','Tap an empty square to place it.','Each row and column needs every lemur exactly once.','The thicker 2×2 jungle zones also need one of each lemur.']},
    2:{n:5,box:null,givens:10,title:'Canopy Explorer',coach:['This board has five lemurs.','At 5×5, focus on rows and columns. Each needs all five exactly once.','Use Hint if you want one gentle nudge.']},
    3:{n:6,box:[2,3],givens:16,title:'Rainforest Ranger',coach:['Six lemurs now share the jungle.','Each 2×3 zone, row, and column must contain all six lemurs.']},
    4:{n:9,box:[3,3],givens:35,title:'Lemur Master',coach:['Classic 9×9 challenge.','Each row, column, and 3×3 zone needs all nine lemurs. Take your time.']}
  };
  let level=1, selected=1, board=[], solution=[], locked=[], moves=0, tutorialStep=0;
  const $=s=>app.querySelector(s);
  function img(v){return base+'images/lemur-'+v+'.webp'}
  function makeSolution(n,box){
    if(n===9){return Array.from({length:n},(_,r)=>Array.from({length:n},(_,c)=>( (c + (r*3+Math.floor(r/3)))%9)+1));}
    if(n===6){return Array.from({length:n},(_,r)=>Array.from({length:n},(_,c)=>( (c + (r*3+Math.floor(r/2)))%6)+1));}
    if(n===4){return Array.from({length:n},(_,r)=>Array.from({length:n},(_,c)=>( (c + (r*2+Math.floor(r/2)))%4)+1));}
    return Array.from({length:n},(_,r)=>Array.from({length:n},(_,c)=>((c+r)%n)+1));
  }
  function seedGivens(sol,count){const n=sol.length; const cells=[]; for(let r=0;r<n;r++)for(let c=0;c<n;c++)cells.push([r,c]);
    // deterministic shuffle makes puzzle stable across visits
    let x=level*7919+17; for(let i=cells.length-1;i>0;i--){x=(x*1103515245+12345)&0x7fffffff;const j=x%(i+1);[cells[i],cells[j]]=[cells[j],cells[i]];}
    const b=Array.from({length:n},()=>Array(n).fill(0)),l=Array.from({length:n},()=>Array(n).fill(false));
    cells.slice(0,count).forEach(([r,c])=>{b[r][c]=sol[r][c];l[r][c]=true}); return [b,l];
  }
  function render(){const cfg=configs[level],n=cfg.n; app.style.setProperty('--n',n); $('.ld-level').textContent='Level '+level+' · '+cfg.title; $('.ld-board').style.gridTemplateColumns=`repeat(${n},1fr)`; $('.ld-board').innerHTML='';
    board.forEach((row,r)=>row.forEach((v,c)=>{const cell=document.createElement('button');cell.className='ld-cell'+(locked[r][c]?' given':'');cell.type='button';cell.dataset.r=r;cell.dataset.c=c;cell.setAttribute('aria-label',v?`Row ${r+1}, column ${c+1}, lemur ${v}`:`Row ${r+1}, column ${c+1}, empty`); if(v){cell.innerHTML=`<img src="${img(v)}" alt="Lemur ${v}"><span class="ld-mini">${v}</span>`} const cfg2=configs[level]; if(cfg2.box){const [bh,bw]=cfg2.box;if(c>0&&c%bw===0)cell.style.borderLeft='3px solid #16491d';if(r>0&&r%bh===0)cell.style.borderTop='3px solid #16491d';} cell.addEventListener('click',()=>place(r,c,cell)); $('.ld-board').appendChild(cell);}));
    $('.ld-tray').innerHTML='';for(let v=1;v<=n;v++){const b=document.createElement('button');b.className='ld-pick'+(v===selected?' active':'');b.type='button';b.setAttribute('aria-label','Select lemur '+v);b.innerHTML=`<img src="${img(v)}" alt="Lemur ${v}">`;b.onclick=()=>{selected=v;renderTray();say('Great choice. Now find a square where this lemur belongs.');advanceCoach()};$('.ld-tray').appendChild(b)}
    updateProgress(); updateCoach();
  }
  function renderTray(){[...$('.ld-tray').children].forEach((b,i)=>b.classList.toggle('active',i+1===selected))}
  function regionCells(r,c,cfg){if(!cfg.box)return[]; const [bh,bw]=cfg.box, r0=Math.floor(r/bh)*bh,c0=Math.floor(c/bw)*bw, arr=[]; for(let rr=r0;rr<r0+bh;rr++)for(let cc=c0;cc<c0+bw;cc++)arr.push([rr,cc]); return arr}
  function validAt(r,c,v){const cfg=configs[level],n=cfg.n; for(let i=0;i<n;i++){if(i!==c&&board[r][i]===v)return false;if(i!==r&&board[i][c]===v)return false} for(const [rr,cc] of regionCells(r,c,cfg)){if((rr!==r||cc!==c)&&board[rr][cc]===v)return false} return true}
  function place(r,c,cell){if(locked[r][c]){say('That lemur is a starting clue, so it stays right there.');return} const old=board[r][c]; board[r][c]=selected; if(!validAt(r,c,selected)){board[r][c]=old;cell.classList.add('conflict');setTimeout(()=>cell.classList.remove('conflict'),300);say('Almost. That lemur is already in this row, column, or jungle zone. Try another spot.');return} moves++;render(); say(['Nice deduction!','Great spotting!','Smart move!','You are reading the jungle clues well.'][moves%4]); advanceCoach(); checkWin()}
  function boardCompleteAndValid(){const cfg=configs[level],n=cfg.n;if(!board.flat().every(Boolean))return false;for(let r=0;r<n;r++){if(new Set(board[r]).size!==n)return false;const col=board.map(row=>row[r]);if(new Set(col).size!==n)return false;}if(cfg.box){const [bh,bw]=cfg.box;for(let r0=0;r0<n;r0+=bh)for(let c0=0;c0<n;c0+=bw){const vals=[];for(let r=r0;r<r0+bh;r++)for(let c=c0;c<c0+bw;c++)vals.push(board[r][c]);if(new Set(vals).size!==n)return false;}}return true}
  function checkWin(){const n=configs[level].n; if(boardCompleteAndValid()){say('Puzzle complete! Every lemur found its perfect place.');setTimeout(()=>openVictory(),350);return} for(let r=0;r<n;r++)if(board[r].every(Boolean)) say('Row complete! Beautiful jungle logic.');}
  function updateProgress(){const total=board.length*board.length,done=board.flat().filter(Boolean).length;$('.ld-progress span').style.width=(done/total*100)+'%';$('.ld-progress-label').textContent=`${done} of ${total} spaces filled`;}
  function say(t){$('.ld-status').textContent=t}
  function updateCoach(){const tips=configs[level].coach; $('.ld-coach').innerHTML=`<span class="ld-tip-number">${Math.min(tutorialStep+1,tips.length)}</span>${tips[Math.min(tutorialStep,tips.length-1)]}`}
  function advanceCoach(){tutorialStep=Math.min(tutorialStep+1,configs[level].coach.length-1);updateCoach()}
  function hint(){const empties=[];for(let r=0;r<board.length;r++)for(let c=0;c<board.length;c++)if(!board[r][c])empties.push([r,c]);if(!empties.length)return; const [r,c]=empties[0];selected=solution[r][c];renderTray(); const cell=app.querySelector(`.ld-cell[data-r="${r}"][data-c="${c}"]`);cell.classList.add('selected');say(`Hint: look at row ${r+1}, column ${c+1}. Which lemur is missing there? I selected a helpful lemur for you.`);setTimeout(()=>cell.classList.remove('selected'),1800)}
  function reset(){start(level);say('Fresh start. You already know more than you did a minute ago.')}
  function start(l){level=l;selected=1;moves=0;tutorialStep=0;const cfg=configs[level];solution=makeSolution(cfg.n,cfg.box);[board,locked]=seedGivens(solution,cfg.givens);render();say(level===1?'Welcome, explorer. We will learn this together one step at a time.':'New jungle, new puzzle. You have got this.')}
  function openVictory(){const modal=$('.ld-modal');modal.classList.add('open');const v=$('.ld-video');v.currentTime=0;v.play().catch(()=>{});$('.ld-victory-title').textContent=`Level ${level} cleared!`;$('.ld-next').textContent=level<4?'Next Level':'Play Again';}
  function closeVictory(){const v=$('.ld-video');v.pause();$('.ld-modal').classList.remove('open')}
  $('.ld-hint').onclick=hint; $('.ld-reset').onclick=reset; $('.ld-how').onclick=()=>{tutorialStep=0;updateCoach();say('Tutorial restarted. Follow the green guide card.')}; $('.ld-close').onclick=closeVictory; $('.ld-next').onclick=()=>{closeVictory();start(level<4?level+1:1)};
  $('.ld-modal').addEventListener('click',e=>{if(e.target.classList.contains('ld-modal'))closeVictory()});
  start(1);
})();
