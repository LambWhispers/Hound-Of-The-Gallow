(()=>{
'use strict';
const lb=document.getElementById('lightbox'),big=document.getElementById('bigImage');
const zoomDisplay=document.getElementById('zoomValue');
let zoom=1,lastFocus=null;
function setZoom(value){zoom=Math.min(3,Math.max(1,value));big.style.setProperty('--image-zoom',String(zoom));big.classList.toggle('zoomed',zoom>1);zoomDisplay.textContent=Math.round(zoom*100)+'%'}
function hide(){if(!lb.classList.contains('show'))return;lb.classList.remove('show');lb.setAttribute('aria-hidden','true');big.removeAttribute('src');document.body.style.overflow='';setZoom(1);lastFocus?.focus?.()}
function show(btn){lastFocus=btn;const pic=btn.querySelector('img');big.src=btn.getAttribute('data-full');big.alt=pic?.alt||'Expanded image';setZoom(1);lb.classList.add('show');lb.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';document.getElementById('close').focus()}
document.querySelectorAll('[data-full]').forEach(btn=>btn.addEventListener('click',()=>show(btn)));
document.getElementById('close').addEventListener('click',hide);
lb.addEventListener('click',e=>{if(e.target===lb||e.target.classList.contains('zoom-stage'))hide()});
big.addEventListener('click',()=>setZoom(zoom>=2.95?1:zoom+.5));
document.getElementById('zoomIn').addEventListener('click',()=>setZoom(zoom+.25));
document.getElementById('zoomOut').addEventListener('click',()=>setZoom(zoom-.25));
document.getElementById('zoomReset').addEventListener('click',()=>setZoom(1));
lb.addEventListener('wheel',e=>{if(!lb.classList.contains('show'))return;e.preventDefault();setZoom(zoom+(e.deltaY<0?.2:-.2))},{passive:false});
document.addEventListener('keydown',e=>{if(e.key==='Escape')hide();if(!lb.classList.contains('show'))return;if(e.key==='+'||e.key==='=')setZoom(zoom+.25);if(e.key==='-')setZoom(zoom-.25);if(e.key==='0')setZoom(1)});

})();
