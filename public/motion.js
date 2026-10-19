(() => {
 'use strict';
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const ease='cubic-bezier(.22,1,.36,1)';
 // Values copied from HMT's published motion variants: .65s, scale .92, y20;
 // children stagger .08s, delay .1s; section headings y28 over .7s.
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target;const index=Number(el.dataset.motionIndex||0);const card=el.matches('.service-card,.industry-card,.why-item,[data-intent],.division-card');el.animate(card?[{opacity:0,transform:'translateY(20px) scale(.92)'},{opacity:1,transform:'translateY(0) scale(1)'}]:[{opacity:0,transform:'translateY(28px)'},{opacity:1,transform:'translateY(0)'}],{duration:card?650:700,delay:card?100+(index%6)*80:0,easing:ease,fill:'backwards'});observer.unobserve(el);}),{rootMargin:'0px 0px -40px 0px',threshold:0.04});
 document.querySelectorAll('.service-card,.industry-card,.why-item,[data-intent],.division-card,.hmt-section h2').forEach((el,i)=>{el.dataset.motionIndex=String(i);observer.observe(el);});
 const hero=document.querySelector('#hero');
 const scene=hero.firstElementChild,heroCopy=hero.lastElementChild.firstElementChild;
 let ticking=false;
 const parallax=()=>{const progress=Math.max(0,Math.min(1,-hero.getBoundingClientRect().top/hero.offsetHeight));scene.style.transform=`translateY(${progress*22}%) scale(${1.12-progress*.12})`;heroCopy.style.transform=`translateY(${progress*100}px)`;heroCopy.style.opacity=String(Math.max(0,1-progress*2));ticking=false;};
 window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(parallax);ticking=true;}},{passive:true});parallax();
 const headline=hero.querySelectorAll('h1>span>span');headline.forEach((el,i)=>el.animate([{transform:'translateY(115%)'},{transform:'translateY(0%)'}],{duration:950,delay:i===0?80:200,easing:ease,fill:'backwards'}));
 hero.querySelectorAll('p').forEach((el,i)=>el.animate([{opacity:0,transform:`translateY(${i?20:14}px)`},{opacity:1,transform:'none'}],{duration:i?700:550,delay:i?400:0,easing:ease,fill:'backwards'}));
 const ctas=hero.querySelector('p.text-base')?.nextElementSibling;if(ctas)ctas.animate([{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'none'}],{duration:700,delay:520,easing:ease,fill:'backwards'});
 const accentLine=hero.querySelector('.h-\\[3px\\]');accentLine?.animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:900,delay:120,easing:ease,fill:'backwards'});
 document.querySelectorAll('.service-card,.industry-card,[data-intent],.division-card').forEach(el=>{el.addEventListener('pointerdown',()=>{el.style.scale='.985';});['pointerup','pointercancel','pointerleave'].forEach(event=>el.addEventListener(event,()=>{el.style.scale='';}));});
})();
