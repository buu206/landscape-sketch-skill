const $ = s => document.querySelector(s);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const canvas = $('.compare'), range = $('#compare-range');
const asset = name => typeof embeddedAssets !== 'undefined' ? embeddedAssets[name] : `assets/playground-${name}.jpg`;
let split=50, targetSplit=50, px=0,py=0,targetPX=0,targetPY=0, frame=0;
function paintComparison(){
 split=reduced?targetSplit:split+(targetSplit-split)*.2;
 px+=(targetPX-px)*.12;py+=(targetPY-py)*.12;
 canvas.style.setProperty('--split',`${split}%`);
 canvas.style.setProperty('--px',`${px}px`);canvas.style.setProperty('--py',`${py}px`);
 range.value=Math.round(split);range.setAttribute('aria-valuetext',`日景占 ${Math.round(split)}%`);
 if(Math.abs(targetSplit-split)>.03||Math.abs(targetPX-px)>.03||Math.abs(targetPY-py)>.03)frame=requestAnimationFrame(paintComparison);else frame=0;
}
function requestCompare(){if(!frame)frame=requestAnimationFrame(paintComparison);}
range.addEventListener('input',()=>{targetSplit=Number(range.value);split=targetSplit;requestCompare();});
canvas.addEventListener('pointermove',e=>{
 if(e.pointerType==='touch'||!finePointer)return;
 const r=canvas.getBoundingClientRect();const x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
 targetSplit=Math.max(0,Math.min(100,x*100));targetPX=reduced?0:(x-.5)*9;targetPY=reduced?0:(y-.5)*6;requestCompare();
});
canvas.addEventListener('pointerleave',()=>{targetPX=0;targetPY=0;requestCompare();});
let changeToken=0, morphFrame=0;
async function changeStyle(style){
 const token=++changeToken;
 const image=new Image();image.src=asset(`night-${style}`);
 try{await image.decode();}catch{toast('图片暂不可用，请重试');return;}
 if(token!==changeToken)return;
 document.querySelectorAll('[data-style]').forEach(b=>{const active=b.dataset.style===style;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active);});
 const host=$('.night-side'), current=$('#right-image');
 cancelAnimationFrame(morphFrame);host.querySelector('.morph-layer')?.remove();
 const old=document.createElement('div');old.className='morph-layer';const copy=current.cloneNode();copy.removeAttribute('id');copy.alt='';old.append(copy);host.append(old);
 current.src=image.src;current.alt=`儿童游乐园夜景${{marker:'马克笔',watercolor:'水彩淡彩',realistic:'写实渲染'}[style]}效果`;
 if(reduced){old.remove();return;}
 const start=performance.now();
 function melt(now){const t=Math.min(1,(now-start)/420);$('#morph-displacement').setAttribute('scale',String(Math.sin(t*Math.PI)*42));old.style.opacity=String(1-t*t);if(t<1)morphFrame=requestAnimationFrame(melt);else{old.remove();$('#morph-displacement').setAttribute('scale','0');}}
 morphFrame=requestAnimationFrame(melt);
}
$('#style-chips').addEventListener('click',e=>{const b=e.target.closest('[data-style]');if(b)changeStyle(b.dataset.style);});
// Stepper uses the standard tabs keyboard pattern.
const steps=[...document.querySelectorAll('[data-step]')];let currentStep=0;
function setStep(index,focus=false){currentStep=(index+4)%4;$('.step-tabs').style.setProperty('--step-index',currentStep);steps.forEach((tab,i)=>{const active=i===currentStep;tab.setAttribute('aria-selected',active);tab.tabIndex=active?0:-1;$(`#step-panel-${i}`).hidden=!active;});if(focus)steps[currentStep].focus();$('#step-next').innerHTML=currentStep===3?'回到起点 <span>↺</span>':'下一步 <span>→</span>';}
steps.forEach((b,i)=>{b.addEventListener('click',()=>setStep(i));b.addEventListener('keydown',e=>{const actions={ArrowRight:i+1,ArrowLeft:i-1,Home:0,End:3};if(e.key in actions){e.preventDefault();setStep(actions[e.key],true);}});});
$('#step-next').addEventListener('click',()=>setStep(currentStep+1));
// One click plays the entire illustrative conversation; no API is called.
const question=$('#chat-question'),response=$('#demo-response'),play=$('#demo-play');
const typingTargets=[question,response.querySelector('.bubble'),response.querySelector('.prompt-preview p')];
const typingTexts=typingTargets.map(n=>n.textContent);
async function typeInto(node,text){node.textContent='';node.classList.add('typing');if(reduced){node.textContent=text;node.classList.remove('typing');return;}await new Promise(resolve=>{let start;function tick(now){start??=now;const count=Math.min(text.length,Math.floor((now-start)/7)+1);node.textContent=text.slice(0,count);if(count<text.length)requestAnimationFrame(tick);else resolve();}requestAnimationFrame(tick);});node.classList.remove('typing');}
play.addEventListener('click',async()=>{play.disabled=true;play.textContent='正在组织场地意图…';response.hidden=true;typingTargets.forEach(n=>n.textContent='');$('.chat-result').hidden=true;await typeInto(question,typingTexts[0]);response.hidden=false;await typeInto(typingTargets[1],typingTexts[1]);await typeInto(typingTargets[2],typingTexts[2]);$('.chat-result').hidden=false;play.disabled=false;play.innerHTML='重新播放 <span>↺</span>';});
let toastTimer;
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),2400);}
async function copy(text){try{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(text);else{const area=document.createElement('textarea');area.value=text;area.style.cssText='position:fixed;left:-9999px';document.body.append(area);area.select();const ok=document.execCommand('copy');area.remove();if(!ok)throw Error();}toast('已复制');}catch{toast('请手动选择代码复制');}}
document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',()=>copy(b.dataset.copy==='install'?$('#install-code').textContent.trim():$('#trigger-text').textContent.trim())));
// Local dashed vector glyph response, with accessible heading text preserved.
const title=$('h1');title.setAttribute('aria-label','从场地意图，到可视化提示词');
if(!reduced){document.querySelectorAll('h1 > span').forEach(line=>{const chars=Array.from(line.textContent);line.textContent='';line.setAttribute('aria-hidden','true');chars.forEach(char=>{const span=document.createElement('span');span.className='tech-letter';span.textContent=char;const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('aria-hidden','true');svg.setAttribute('viewBox','0 0 100 125');svg.setAttribute('preserveAspectRatio','none');const text=document.createElementNS('http://www.w3.org/2000/svg','text');for(const [k,v] of Object.entries({x:50,y:96,'text-anchor':'middle','font-size':100,'font-family':'PingFang SC, Microsoft YaHei, sans-serif','font-weight':500}))text.setAttribute(k,v);text.textContent=char;svg.append(text);span.append(svg);line.append(span);});});const letters=[...document.querySelectorAll('.tech-letter')];title.addEventListener('pointermove',e=>letters.forEach(letter=>{const r=letter.getBoundingClientRect();letter.classList.toggle('is-near',Math.hypot(e.clientX-r.x-r.width/2,e.clientY-r.y-r.height/2)<105);}));title.addEventListener('pointerleave',()=>letters.forEach(l=>l.classList.remove('is-near')));}
// Keep the keyword motion local and pause it outside the hero viewport.
const word=$('#rotating-word'),words=['彩平','透视','剖立面','分析图','四季'];let wordIndex=0,heroVisible=true;
new IntersectionObserver(([entry])=>heroVisible=entry.isIntersecting).observe($('.hero-heading'));
if(!reduced)setInterval(()=>{if(document.hidden||!heroVisible)return;word.className='rotate-out';setTimeout(()=>{wordIndex=(wordIndex+1)%words.length;word.textContent=words[wordIndex];word.className='rotate-in';requestAnimationFrame(()=>requestAnimationFrame(()=>word.className=''));},230);},2600);
document.querySelectorAll('.cap-card').forEach(card=>card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--spot-x',`${e.clientX-r.left}px`);card.style.setProperty('--spot-y',`${e.clientY-r.top}px`);}));
// Quiet topographic contours. Redraw only on resize or pointer movement, no idle loop.
const topo=$('#topography'),ctx=topo.getContext('2d');let topoW=0,topoH=0,mouseX=-1000,mouseY=-1000,topoFrame=0;
function drawTopo(){topoFrame=0;ctx.clearRect(0,0,topoW,topoH);ctx.strokeStyle='rgba(194,209,164,.065)';ctx.lineWidth=.7;
 const centers=[[-.12,.34,1],[.94,.08,.8],[.68,1.15,.75]];
 for(const [cx,cy,scale]of centers){for(let ring=0;ring<19;ring++){const radius=(80+ring*24)*scale;ctx.beginPath();for(let n=0;n<=160;n++){const angle=n/160*Math.PI*2;const wave=1+.10*Math.sin(angle*3+cx*5)+.055*Math.cos(angle*5+cy*3);let x=cx*topoW+Math.cos(angle)*radius*wave*1.15,y=cy*topoH+Math.sin(angle)*radius*wave;const dx=x-mouseX,dy=y-mouseY,d=Math.hypot(dx,dy);if(!reduced&&d<180&&d>0){const push=Math.pow(1-d/180,2)*5;x+=dx/d*push;y+=dy/d*push;}n?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();}}
}
function resizeTopo(){topoW=innerWidth;topoH=innerHeight;const dpr=Math.min(devicePixelRatio,1.5);topo.width=topoW*dpr;topo.height=topoH*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);drawTopo();}
window.addEventListener('resize',resizeTopo);if(!reduced&&finePointer)window.addEventListener('pointermove',e=>{mouseX=e.clientX;mouseY=e.clientY;if(!topoFrame)topoFrame=requestAnimationFrame(drawTopo);},{passive:true});resizeTopo();
if('IntersectionObserver'in window&&!reduced){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.06});document.querySelectorAll('.section-top,.cap-grid,.demo-grid,.install-grid').forEach(el=>{el.classList.add('reveal');observer.observe(el);});}
// Hero-only synchronized Codex walkthrough. Runs once; replay is explicitly requested.
(() => {
 const device=document.querySelector('#hero-device');
 if(!device)return;
 const replay=document.querySelector('#hero-replay');
 const nodes=['hero-user','hero-assistant','hero-prompt'].map(id=>document.getElementById(id));
 const texts=nodes.map(node=>node.textContent);
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 const mobile=matchMedia('(max-width: 760px)');
 let run=0,started=false,phaseTimers=new Set();
 function clearTimers(){phaseTimers.forEach(clearTimeout);phaseTimers.clear();nodes.forEach(n=>n.classList.remove('hero-typing'));}
 function wait(ms){return new Promise(resolve=>{const id=setTimeout(()=>{phaseTimers.delete(id);resolve();},ms);phaseTimers.add(id);});}
 function finalState(){run++;clearTimers();device.dataset.phase='complete';nodes.forEach((node,i)=>node.textContent=texts[i]);replay.disabled=false;replay.textContent=mobile.matches&&!started?'播放演示 ▷':'重播演示 ↺';}
 async function type(node,text,token){node.textContent='';node.classList.add('hero-typing');for(const char of Array.from(text)){if(token!==run)return false;node.textContent+=char;await wait(/[\u3400-\u9fff]/.test(char)?38:29);}node.classList.remove('hero-typing');return token===run;}
 async function play(){
  started=true;
  if(motion.matches){finalState();return;}
  const token=++run;clearTimers();replay.disabled=false;replay.textContent='重新开始 ↺';device.dataset.phase='user';nodes.forEach(n=>n.textContent='');
  if(!await type(nodes[0],texts[0],token))return;
  await wait(260);if(token!==run)return;
  device.dataset.phase='assistant';document.querySelector('#hero-progress').style.width='42%';
  const progressTimer=setTimeout(()=>{if(token===run){document.querySelector('#hero-progress').style.width='76%';document.querySelector('#hero-generation-label').textContent='Generating… 76%';}},420);phaseTimers.add(progressTimer);
  document.querySelector('#hero-generation-label').textContent='Generating… 42%';
  if(!await type(nodes[1],texts[1],token))return;
  await wait(160);if(token!==run)return;
  device.dataset.phase='prompt';
  // Images follow the prompt phase, independently of the remaining typing.
  const nightTimer=setTimeout(()=>{phaseTimers.delete(nightTimer);if(token===run)device.dataset.phase='complete';},800);phaseTimers.add(nightTimer);
  await type(nodes[2],texts[2],token);if(token!==run)return;
  device.dataset.phase='complete';replay.disabled=false;replay.textContent='重播演示 ↺';
 }
 replay.addEventListener('click',play);
 motion.addEventListener('change',()=>{if(motion.matches)finalState();});
 if(motion.matches||mobile.matches){finalState();}
 else if('IntersectionObserver'in window){device.dataset.phase='user';nodes.forEach(n=>n.textContent='');const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){observer.disconnect();play();}},{threshold:.25});observer.observe(device);}
 else play();
})();
