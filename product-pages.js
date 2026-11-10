(()=>{'use strict';
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(hover: hover) and (pointer: fine)');
const reveals=[...document.querySelectorAll('[data-reveal]')];
if(!reduced.matches&&'IntersectionObserver' in window){
 document.documentElement.classList.add('pd-motion');
 const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}},{threshold:.08,rootMargin:'0px 0px 20px 0px'});
 reveals.forEach((el,i)=>{el.style.setProperty('--pd-delay',(i%3)*65+'ms');observer.observe(el);});
 reduced.addEventListener('change',e=>{if(e.matches){document.documentElement.classList.remove('pd-motion');observer.disconnect();}});
}
for(const art of document.querySelectorAll('[data-tilt]')){
 let frame=0,last=null;
 function reset(){cancelAnimationFrame(frame);frame=0;last=null;for(const key of ['--pd-rx','--pd-ry','--pd-x','--pd-y','--pd-light-x','--pd-light-y'])art.style.removeProperty(key);}
 art.addEventListener('pointermove',event=>{if(reduced.matches||!fine.matches||event.pointerType==='touch')return;last={x:event.clientX,y:event.clientY};if(frame)return;frame=requestAnimationFrame(()=>{frame=0;if(!last)return;const r=art.getBoundingClientRect(),x=Math.max(0,Math.min(1,(last.x-r.left)/r.width)),y=Math.max(0,Math.min(1,(last.y-r.top)/r.height));art.style.setProperty('--pd-rx',(0.5-y)*3+'deg');art.style.setProperty('--pd-ry',(x-.5)*3+'deg');art.style.setProperty('--pd-x',(x-.5)*7+'px');art.style.setProperty('--pd-y',(y-.5)*7+'px');art.style.setProperty('--pd-light-x',x*100+'%');art.style.setProperty('--pd-light-y',y*100+'%');});},{passive:true});
 art.addEventListener('pointerleave',reset);art.addEventListener('pointercancel',reset);reduced.addEventListener('change',reset);fine.addEventListener('change',reset);
}
for(const form of document.querySelectorAll('.pd-enquiry-form'))form.addEventListener('submit',event=>{
 event.preventDefault();if(!form.reportValidity())return;const values=Object.fromEntries(new FormData(form));
 try{sessionStorage.setItem('tt-product-enquiry',JSON.stringify({...values,savedAt:Date.now()}));}catch{}
 const url=new URL('trade.html',location.href);url.searchParams.set('product',values.product);url.hash='enquiry';location.assign(url.href);
});
const sections=[...document.querySelectorAll('[data-product-category]')],links=[...document.querySelectorAll('.pc-category-nav a')];
if(sections.length&&'IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){for(const a of links){if(a.hash==='#'+e.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');}}},{rootMargin:'-15% 0px -60% 0px'});sections.forEach(s=>observer.observe(s));}
})();
