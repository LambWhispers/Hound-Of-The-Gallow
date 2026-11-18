(()=>{
'use strict';
const canvas=document.querySelector('#pageSmoke');
const checkbox=document.querySelector('#motionSwitch');
if(!canvas||!checkbox) return;
const ctx=canvas.getContext('2d',{alpha:true});if(!ctx)return;
let w=0,h=0,dpr=1,puffs=[],frame=0,last=0,animate=false;
let seed=312877;const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
const range=(a,b)=>a+(b-a)*rand();
function sprite(color){
 const c=document.createElement('canvas');c.width=c.height=192;
 const x=c.getContext('2d');
 // Blobby smoke silhouette with soft dark core and faint glowing rim.
 for(let j=0;j<20;j++){
   const theta=range(0,Math.PI*2),distance=range(0,38);
   const px=96+Math.cos(theta)*distance,py=96+Math.sin(theta)*distance*.7,rad=range(23,58);
   const g=x.createRadialGradient(px,py,1,px,py,rad);
   g.addColorStop(0,`rgba(${color},.20)`);g.addColorStop(.35,`rgba(${color},.11)`);g.addColorStop(1,`rgba(${color},0)`);
   x.fillStyle=g;x.beginPath();x.arc(px,py,rad,0,Math.PI*2);x.fill();
 }
 return c;
}
const sprites=[sprite('61,55,75'),sprite('78,68,84'),sprite('90,62,78'),sprite('102,72,83'),sprite('41,40,53')];
function fresh(initial){
 let fromLeft=rand()<.5;
 return {
  x:initial?range(-w*.2,w*1.15):(fromLeft?range(-w*.18,w*.2):range(w*.8,w*1.17)),
  y:initial?range(-h*.1,h*1.12):range(h*.5,h*1.1),
  dx:range(-.27,.29)+(fromLeft?.23:-.22),dy:range(-.55,-.15),
  size:range(170,430)*Math.max(.65,Math.min(1.3,w/1400)),
  age:initial?range(60,510):0,life:range(510,1000),alpha:range(.43,.9),
  phase:range(0,6.28),sway:range(12,38),sp:sprites[Math.floor(rand()*sprites.length)]
 };
}
function resize(){
 dpr=Math.min(devicePixelRatio||1,1.5);w=window.innerWidth;h=window.innerHeight;
 canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
 puffs=Array.from({length:Math.max(22,Math.min(49,Math.floor(w/32)))},()=>fresh(true));
}
function draw(t){
 if(!animate)return;
 const dt=Math.min((t-(last||t))/16.67,2);last=t;
 ctx.clearRect(0,0,w,h);
 // Smoke is rendered in real time. Particles rise, curl, and fade independently.
 for(let i=0;i<puffs.length;i++){
  let p=puffs[i];p.age+=dt;
  if(p.age>=p.life ||p.y< -p.size*.8){puffs[i]=p=fresh(false);}
  p.x+=p.dx*dt;p.y+=p.dy*dt;
  let life=p.age/p.life,fadeIn=Math.min(1,life*8),fadeOut=Math.min(1,(1-life)*6);
  let diameter=p.size*(.7+life*1.2),x=p.x+Math.sin(p.phase+p.age*.012)*p.sway;
  ctx.save();ctx.globalAlpha=p.alpha*fadeIn*fadeOut;
  ctx.translate(x,p.y);ctx.rotate(Math.sin(p.phase+p.age*.006)*.19);
  ctx.drawImage(p.sp,-diameter/2,-diameter*.37,diameter,diameter*.74);
  ctx.restore();
 }
 ctx.globalAlpha=1;
 frame=requestAnimationFrame(draw);
}
function toggle(){
 animate=checkbox.checked;
 cancelAnimationFrame(frame);frame=0;last=0;
 if(animate){frame=requestAnimationFrame(draw)}else{ctx.clearRect(0,0,w,h)}
}
checkbox.addEventListener('change',toggle);
window.addEventListener('resize',()=>{resize();if(!animate)ctx.clearRect(0,0,w,h)},{passive:true});
document.addEventListener('visibilitychange',()=>{cancelAnimationFrame(frame);frame=0;if(!document.hidden&&animate){last=0;frame=requestAnimationFrame(draw)}});
resize();toggle();
window.houndMotionDebug=()=>({on:animate,particles:puffs.length,width:w,height:h,positions:puffs.slice(0,4).map(p=>[p.x,p.y])});
})();