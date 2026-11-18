/* Cinematic Chronicle enhancements: deliberate motion, clean navigation */
:root{--nav-height:78px}
html{scroll-padding-top:calc(var(--nav-height) + 22px)}
body{padding-top:0}
/* Persistent glass navigation, not tied to hero layout or its smoke layers */
header.topbar.wrap{
 position:fixed!important;top:0!important;left:0!important;right:0!important;
 width:100%!important;max-width:none!important;min-height:var(--nav-height)!important;
 height:auto!important;margin:0!important;padding:12px clamp(22px,4vw,80px)!important;
 z-index:900!important;display:flex!important;flex-wrap:nowrap!important;
 justify-content:space-between!important;align-items:center!important;
 border-bottom:1px solid rgba(216,123,144,.20)!important;
 background:linear-gradient(110deg,rgba(17,12,19,.96),rgba(32,18,29,.90))!important;
 backdrop-filter:blur(18px) saturate(1.15);-webkit-backdrop-filter:blur(18px) saturate(1.15);
 box-shadow:0 5px 22px rgba(0,0,0,.25);
 transition:padding .45s ease,background .45s ease,box-shadow .45s ease!important;
}
header.topbar.wrap.scrolled{padding-top:8px!important;padding-bottom:8px!important;background:rgba(14,10,17,.96)!important;box-shadow:0 12px 30px #0009}
header.topbar .navbrand{flex-shrink:0;white-space:nowrap;font-size:clamp(.72rem,1.2vw,1rem)!important;letter-spacing:.11em!important}
header.topbar .navlinks{display:flex!important;flex:0 1 auto!important;gap:clamp(12px,2vw,32px)!important;align-items:center!important;justify-content:flex-end!important;order:initial!important;margin-right:235px;min-width:0}
header.topbar .navlinks a{position:relative;white-space:nowrap;font-size:clamp(.67rem,.9vw,.83rem)!important;letter-spacing:.115em!important;color:#e4cfd6!important;opacity:.86;transition:color .3s,opacity .3s}
header.topbar .navlinks a::after{content:"";height:2px;background:#f16785;position:absolute;left:0;right:100%;bottom:-6px;transition:right .45s cubic-bezier(.2,.7,.2,1)}
header.topbar .navlinks a:hover::after,header.topbar .navlinks a.active::after{right:0}
header.topbar .navlinks a.active{color:#fff;opacity:1}
header.topbar .nav-progress{position:absolute;bottom:0;left:0;width:var(--reading-progress,0%);height:2px;background:linear-gradient(90deg,#9b3f58,#f67a96);box-shadow:0 0 8px #e95e75a3;transition:width .12s linear}
/* Reserve top right for controls: long, legible control stays above smoke */
.motion-control{top:16px!important;right:clamp(12px,2.5vw,40px)!important;width:220px!important;min-height:48px!important;padding:8px 12px!important;z-index:1000!important;line-height:1.2!important}
#pageSmoke{z-index:115!important;pointer-events:none!important}
#lightbox{z-index:1600!important}
#motionSwitch:not(:checked) ~ main .slow-reference{animation-play-state:paused!important}
#motionSwitch:not(:checked) ~ main .hero-art{animation-play-state:paused!important}
/* Every reference image gently zooms and glides in its crop. No change to image contents. */
.lambimage,.gallery .thumb{overflow:hidden!important}
.lambimage img.slow-reference,.gallery img.slow-reference{
 display:block!important;width:100%;height:100%;object-fit:cover;
 transform-origin:52% 47%;
 animation:portraitBreath 24s cubic-bezier(.45,0,.55,1) infinite alternate!important;
 transition:filter .55s ease!important;
 will-change:transform;
}
.gallery figure:nth-child(2n) img.slow-reference{animation-name:portraitBreathReverse!important;animation-duration:28s!important;animation-delay:-9s!important}
.gallery figure:nth-child(3n) img.slow-reference{animation-duration:31s!important;animation-delay:-13s!important}
.lambimage img.slow-reference{animation-duration:26s!important;animation-delay:-5s!important}
@keyframes portraitBreath{0%{transform:scale(1.005) translate3d(0,0,0)}100%{transform:scale(1.085) translate3d(-.8%,.5%,0)}}
@keyframes portraitBreathReverse{0%{transform:scale(1.08) translate3d(.6%,-.7%,0)}100%{transform:scale(1.008) translate3d(-.4%,.4%,0)}}
/* Image hover adds a gentle edge glow without interrupting the continuous zoom. */
.gallery figure:hover .frame,.lambimage:hover{box-shadow:0 0 22px #c03a5830;transition:box-shadow .35s ease}
.cinematic-image{border:0;padding:0;width:100%;height:100%;display:block;background:transparent;cursor:zoom-in}
.cinematic-image img{pointer-events:none}
.gallery-hint{margin-top:8px;font-size:.88rem;color:#dec2cc}
/* Avoid jumps and clipping by leaving room for the persistent bar. */
section[id],.integrated-profile[id],#top{scroll-margin-top:calc(var(--nav-height) + 18px)!important}
.hero{padding-top:var(--nav-height)!important;min-height:min(860px,95svh)!important}
/* Long gentle glide also has a visible active destination indicator. */
.chapter-highlight{animation:arrivalGlow 1.6s ease-out both}
@keyframes arrivalGlow{0%{filter:brightness(1.13)}100%{filter:brightness(1)}}
@media(max-width:1050px){
 :root{--nav-height:112px}
 header.topbar.wrap{flex-wrap:wrap!important;align-content:center!important;row-gap:4px!important;padding-top:8px!important;padding-bottom:8px!important}
 header.topbar .navlinks{order:2!important;flex-basis:100%!important;justify-content:flex-start!important;margin-right:0!important;gap:clamp(10px,2vw,22px)!important;overflow:auto;scrollbar-width:none}
 header.topbar .navlinks::-webkit-scrollbar{display:none}
 header.topbar .navbrand{max-width:calc(100% - 230px)}
}
@media(max-width:620px){
 :root{--nav-height:112px}
 header.topbar.wrap{padding-left:12px!important;padding-right:12px!important}
 header.topbar .navbrand{font-size:.72rem!important;letter-spacing:.06em!important;max-width:calc(100% - 150px);overflow:hidden;text-overflow:ellipsis}
 .motion-control{width:148px!important;top:8px!important;right:8px!important;min-height:52px!important;padding:4px 8px!important}
 .motion-control .smoke-status{font-size:8px!important}
 header.topbar .navlinks a{font-size:.64rem!important}
}
@media(prefers-reduced-motion:reduce){
 .slow-reference{animation:none!important;transform:none!important}
 .chapter-highlight{animation:none!important}
}

/* Seven chapter links: match the real reading order and avoid clipping */
@media (min-width:1051px) and (max-width:1430px){
 :root{--nav-height:112px}
 header.topbar.wrap{flex-wrap:wrap!important;row-gap:4px!important;align-content:center!important;padding-top:8px!important;padding-bottom:8px!important}
 header.topbar .navlinks{order:2!important;flex-basis:100%!important;margin-right:0!important;justify-content:center!important;gap:clamp(12px,2vw,26px)!important}
 header.topbar .navbrand{margin-right:240px!important}
}
@media(min-width:1431px){header.topbar .navlinks{gap:clamp(10px,1.25vw,21px)!important;margin-right:230px!important}header.topbar .navlinks a{font-size:clamp(.65rem,.78vw,.81rem)!important;letter-spacing:.085em!important}}
@media(max-width:1050px){header.topbar .navlinks{flex-wrap:nowrap!important;overflow-x:auto!important;padding-bottom:7px!important}}
