(()=>{
'use strict';
const bar=document.querySelector('header.topbar');
const anchors=[...document.querySelectorAll('header.topbar a[href^="#"]')];
const sections=anchors.map(a=>({a,el:document.getElementById(a.getAttribute('href').slice(1))})).filter(o=>o.el);
const orderedSections=[...sections].sort((a,b)=>{const pos=a.el.compareDocumentPosition(b.el);return (pos & Node.DOCUMENT_POSITION_FOLLOWING)?-1:(pos & Node.DOCUMENT_POSITION_PRECEDING)?1:0;});
let frame=0,activeAnimation=false,lastY=-1;
const cubic=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
const offset=()=>Math.ceil(bar?.getBoundingClientRect().height||84)+24;
function markActive(){
 const line=window.scrollY+offset()+65;
 let current=null;
 for(const entry of orderedSections)if(entry.el.getBoundingClientRect().top+window.scrollY<=line)current=entry.a;
 for(const entry of sections){entry.a.classList.toggle('active',entry.a===current);if(entry.a===current)entry.a.setAttribute('aria-current','location');else entry.a.removeAttribute('aria-current')}
 const denominator=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
 bar?.style.setProperty('--reading-progress', Math.min(100,100*window.scrollY/denominator).toFixed(2)+'%');
 bar?.classList.toggle('scrolled',window.scrollY>55);
}
function stop(){if(frame)cancelAnimationFrame(frame);frame=0;activeAnimation=false;}
function moveTo(el,animate=true){
 stop();
 const top=Math.max(0,window.scrollY+el.getBoundingClientRect().top-offset());
 const from=window.scrollY, delta=top-from;
 if(!animate||Math.abs(delta)<3){window.scrollTo(0,top);markActive();return;}
 const duration=Math.min(2100,Math.max(1050,800+Math.abs(delta)*.34));
 let start=null;activeAnimation=true;
 function step(time){
  if(start===null)start=time;
  const progress=Math.min(1,(time-start)/duration);
  window.scrollTo(0,from+delta*cubic(progress));
  markActive();
  if(progress<1){frame=requestAnimationFrame(step)}else{window.scrollTo(0,top);stop();markActive()}
 }
 frame=requestAnimationFrame(step);
}
anchors.forEach(a=>a.addEventListener('click',e=>{
 const el=document.getElementById(a.getAttribute('href').slice(1));if(!el)return;
 e.preventDefault();moveTo(el,true);
 try{history.replaceState(null,'',a.getAttribute('href'))}catch(_){}
}));
// User scrolling should cancel the automated glide instead of fighting it.
window.addEventListener('wheel',stop,{passive:true});
window.addEventListener('touchstart',stop,{passive:true});
window.addEventListener('keydown',e=>{if(['PageDown','PageUp','Home','End','ArrowDown','ArrowUp',' '].includes(e.key))stop()});
let scheduled=false;
window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(()=>{scheduled=false;markActive()})}},{passive:true});
window.addEventListener('resize',markActive,{passive:true});
window.addEventListener('load',()=>{if(location.hash){const el=document.getElementById(location.hash.slice(1));if(el)moveTo(el,false)}markActive()});
markActive();
})();