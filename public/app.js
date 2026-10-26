(() => {
 'use strict';
 const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const ease='cubic-bezier(.22,1,.36,1)';
 const survey=$('#survey-dialog'),header=$('#site-header'),mobile=$('#mobile-menu'),menu=$('#menu-trigger');
 const scrollTo=el=>el?.scrollIntoView({behavior:reduced?'instant':'smooth',block:'start'});
 window.hmtReady=true;
 // Original HMT destinations remain visible and clickable, without leaving this homepage.
 document.addEventListener('click',event=>{
   const link=event.target.closest('a[data-noop]');if(link){event.preventDefault();return;}
   const anchor=event.target.closest('a[href^="#"]');if(anchor){const target=$(anchor.getAttribute('href'));if(target){event.preventDefault();closeMenu();scrollTo(target);}}
 });
 function closeMenu(){mobile.hidden=true;menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu');}
 menu.setAttribute('aria-controls','mobile-menu');menu.setAttribute('aria-expanded','false');
 menu.addEventListener('click',()=>{const open=mobile.hidden;mobile.hidden=!open;menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu');});
 $$('.hmt-header nav[aria-label="Primary"]>div').forEach(group=>{
   const anchor=$('a',group);const open=()=>{group.classList.add('menu-open');anchor.setAttribute('aria-expanded','true');};const close=()=>{group.classList.remove('menu-open');anchor.setAttribute('aria-expanded','false');};
   group.addEventListener('mouseenter',open);group.addEventListener('mouseleave',close);group.addEventListener('focusin',open);group.addEventListener('focusout',e=>{if(!group.contains(e.relatedTarget))close();});
   anchor.addEventListener('keydown',e=>{if(e.key==='ArrowDown'){e.preventDefault();open();$('ul a',group)?.focus();}if(e.key==='Escape'){close();anchor.focus();}});
 });
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();$$('.menu-open').forEach(g=>{g.classList.remove('menu-open');$('a',g).setAttribute('aria-expanded','false');});}});
 document.addEventListener('click',e=>{if(!e.target.closest('#site-header'))closeMenu();});
 const progress=document.createElement('div');progress.className='scroll-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
 let headerDark=false;
 function updateScroll(){const scrolled=scrollY>40;header.classList.toggle('scrolled',scrolled);if(scrolled!==headerDark){$('.hmt-header img').src=scrolled?'./assets/hmt/logo-hmt-light.png':'./assets/hmt/logo-hmt.png';headerDark=scrolled;}const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max>0?scrollY/max:0})`;}
 window.addEventListener('scroll',updateScroll,{passive:true});window.addEventListener('resize',()=>{if(innerWidth>=1024)closeMenu();updateScroll();});updateScroll();
 function openSurvey(){if(!survey.open&&!document.querySelector('dialog[open]'))survey.showModal();}
 function closeSurvey(){if(reduced){survey.close();return;}if(survey.classList.contains('closing'))return;survey.classList.add('closing');setTimeout(()=>{survey.close();survey.classList.remove('closing');},400);}
 $('[data-close-survey]').addEventListener('click',closeSurvey);
 survey.addEventListener('cancel',e=>{e.preventDefault();closeSurvey();});
 survey.addEventListener('click',e=>{if(e.target===survey){const rect=survey.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)closeSurvey();}});
 try{if(!sessionStorage.getItem('hmt-lead-popup-seen'))setTimeout(()=>{try{sessionStorage.setItem('hmt-lead-popup-seen','1');}catch{}openSurvey();},3000);}catch{setTimeout(openSurvey,3000);}
 $$('[data-project-type]').forEach(button=>button.addEventListener('click',()=>{const selected=button.getAttribute('aria-pressed')!=='true';$$('[data-project-type]').forEach(b=>{b.classList.remove('selected');b.setAttribute('aria-pressed','false');});if(selected){button.classList.add('selected');button.setAttribute('aria-pressed','true');}}));
 const status=(form,message,error=false)=>{let el=$('.preview-status',form);if(!el){el=document.createElement('p');el.className='preview-status';el.setAttribute('role','status');form.append(el);}el.textContent=message;el.style.color=error?'#dc2626':'#4f4f4f';};
 $('#survey-form').addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget;const data=new FormData(form);if(!String(data.get('name')||'').trim()||String(data.get('phone')||'').replace(/\D/g,'').length<10){status(form,'Please enter your name and a valid phone number.',true);return;}const email=$('[name="email"]',form);if(email.value&&!email.checkValidity()){email.reportValidity();return;}status(form,'Preview only — your free site survey request has not been sent.');});
 const contactStage=$('#contact-form-stage'),contactForms=$$('[data-contact-form]'),intentButtons=$$('[data-intent]');
 let currentIntent=contactForms.length-1,targetIntent=contactForms.length-1,flipping=false;
 function rotateContactForm(){
   if(flipping||targetIntent===currentIntent)return;
   if(reduced){contactForms[currentIntent].hidden=true;currentIntent=targetIntent;contactForms[currentIntent].hidden=false;return;}
   flipping=true;contactStage.classList.remove('is-returning');contactStage.classList.add('is-turning');
   setTimeout(()=>{
     contactForms[currentIntent].hidden=true;currentIntent=targetIntent;contactForms[currentIntent].hidden=false;
     contactStage.classList.add('is-returning');requestAnimationFrame(()=>contactStage.classList.remove('is-turning'));
     setTimeout(()=>{contactStage.classList.remove('is-returning');flipping=false;rotateContactForm();},510);
   },380);
 }
 function selectIntent(index,showForm=true){
   targetIntent=index;intentButtons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));rotateContactForm();
   if(showForm)scrollTo($('#contact-form'));
 }
 intentButtons.forEach((button,index)=>button.addEventListener('click',()=>selectIntent(index)));
 contactForms.forEach(form=>form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;status(form,'Preview only — your enquiry has not been sent.');}));
 if(!reduced){
   document.body.classList.add('motion-ready');
   const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{entry.target.classList.toggle('is-in-view',entry.isIntersecting);if(entry.isIntersecting&&entry.target.id==='divisions')animateProjectEntrance();}),{threshold:.12,rootMargin:'0px 0px -8% 0px'});
   ['#divisions','#process'].forEach(selector=>{const section=$(selector);if(section)revealObserver.observe(section);});
 }
 const footer=$('footer.hmt-footer'),footerTape=footer?.previousElementSibling;
 const footerLogo=footer?.querySelector('img[src*="logo-hmt-light.png"]');
 if(footerLogo)footerLogo.src='./assets/hmt/logo-hmt.png';
 if(footerTape?.textContent?.includes('Safety First')){footer.after(footerTape);footerTape.classList.add('footer-safety-tail');}
 function animateProjectDetails(){
   if(reduced)return;
   const panel=$('[data-project-panel]:not([hidden])');
   $$('h3,p,.project-scope-label,li',panel).forEach((element,index)=>element.animate([{opacity:0,clipPath:'inset(0 100% 0 0)',transform:'translateY(8px)'},{opacity:1,clipPath:'inset(0)',transform:'translateY(0)'}],{duration:650,delay:index*65,easing:ease,fill:'backwards'}));
 }
 function animateProjectEntrance(){
   if(reduced)return;
   $('.project-main-image').animate([{opacity:0,transform:'perspective(1200px) rotateY(22deg) rotateZ(-3deg) translateY(25px)'},{opacity:1,transform:'perspective(1200px) rotateY(0deg) rotateZ(0deg) translateY(0)'}],{duration:1100,easing:ease});
   animateProjectDetails();
 }
 let projectRequest=0;
 $$('[data-project-index]').forEach(button=>button.addEventListener('click',async()=>{
   const index=Number(button.dataset.projectIndex),request=++projectRequest;
   const image=$('#project-feature-image'),source=$('img',button),frame=$('.project-main-image'),info=$('.project-information');
   $$('[data-project-index]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
   if(!reduced){frame.classList.add('is-switching');info.classList.add('is-switching');}
   const incoming=new Image();incoming.src=source.src;
   await Promise.all([incoming.decode().catch(()=>{}),new Promise(resolve=>setTimeout(resolve,reduced?0:260))]);
   if(request!==projectRequest)return;
   $$('[data-project-panel]').forEach(panel=>{panel.hidden=Number(panel.dataset.projectPanel)!==index;});
   image.src=source.src;image.alt=button.getAttribute('aria-label').replace(/^Show /,'');
   $('[data-open-project-image]').setAttribute('aria-label',`Open full ${image.alt} image`);
   requestAnimationFrame(()=>{frame.classList.remove('is-switching');info.classList.remove('is-switching');animateProjectDetails();});
 }));
 const projectDialog=$('#project-image-dialog');
 $('[data-open-project-image]').addEventListener('click',()=>{const image=$('#project-feature-image'),full=$('#project-full-image');full.src=image.src;full.alt=image.alt;projectDialog.showModal();});
 $('[data-close-project-image]').addEventListener('click',()=>projectDialog.close());
 projectDialog.addEventListener('click',event=>{if(event.target===projectDialog)projectDialog.close();});

 const wheel=$('#greenfield-wheel'),wheelCards=$$('[data-wheel-card]',wheel);
 let wheelFrame=0,wheelStarted=false;
 const paintWheelCurve=()=>{
   const center=wheel.scrollLeft+wheel.clientWidth/2;
   wheelCards.forEach(card=>{
     const position=(card.offsetLeft+card.offsetWidth/2-center)/(wheel.clientWidth/2);
     const bend=Math.max(-1.6,Math.min(1.6,position)),distance=Math.abs(bend);
     const lift=30*Math.pow(distance,1.5),yaw=-bend*13,fan=bend*6;
     card.style.transform=`translate3d(0,${lift}px,0) rotateY(${yaw}deg) rotateZ(${fan}deg) scale(${1-distance*.045})`;
   });
 };
 const animateWheelTo=(destination,duration)=>{
   cancelAnimationFrame(wheelFrame);
   wheel.autoResumeAt=performance.now()+duration+1100;
   if(reduced){wheel.scrollLeft=destination;paintWheelCurve();return;}
   const start=performance.now(),from=wheel.scrollLeft;
   const frame=now=>{const t=Math.min(1,(now-start)/duration),eased=1-Math.pow(1-t,4);wheel.scrollLeft=from+(destination-from)*eased;paintWheelCurve();if(t<1)wheelFrame=requestAnimationFrame(frame);};
   wheelFrame=requestAnimationFrame(frame);
 };
 const initialSweep=Math.min(wheel.scrollWidth-wheel.clientWidth,wheelCards[0].offsetWidth*4.5);
 if(!reduced)wheel.scrollLeft=initialSweep;
 paintWheelCurve();
 wheel.addEventListener('scroll',paintWheelCurve,{passive:true});
 window.addEventListener('resize',paintWheelCurve,{passive:true});
 if(!reduced){const wheelObserver=new IntersectionObserver(entries=>{if(!entries.some(entry=>entry.isIntersecting)||wheelStarted)return;wheelStarted=true;wheelObserver.disconnect();animateWheelTo(0,3200);},{threshold:.25});wheelObserver.observe(wheel);}
 $$('[data-wheel-step]').forEach(button=>button.addEventListener('click',()=>{wheelStarted=true;animateWheelTo(wheel.scrollLeft+Number(button.dataset.wheelStep)*wheelCards[0].offsetWidth*.95,650);}));
 wheel.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();wheelStarted=true;animateWheelTo(wheel.scrollLeft+(event.key==='ArrowRight'?1:-1)*wheelCards[0].offsetWidth,600);}});

 $$('[data-scroll]').forEach(button=>button.addEventListener('click',()=>{const [id,direction]=button.dataset.scroll.split(':');if(id==='industry-row')return;const row=$(`#${id}`);row?.scrollBy({left:row.clientWidth*.78*Number(direction),behavior:reduced?'instant':'smooth'});}));
 function autoGlide(row,controls,speed){
   if(reduced||!row)return;
   let visible=false,hovered=false,focused=false,direction=1,last=0,position=row.scrollLeft,pausedUntil=performance.now()+4300;
   new IntersectionObserver(entries=>{visible=entries.some(entry=>entry.isIntersecting);},{threshold:.12}).observe(row);
   row.addEventListener('pointerenter',()=>{hovered=true;});row.addEventListener('pointerleave',()=>{hovered=false;pausedUntil=performance.now()+900;});
   row.addEventListener('focusin',()=>{focused=true;});row.addEventListener('focusout',event=>{focused=row.contains(event.relatedTarget);pausedUntil=performance.now()+1800;});
   $$(controls).forEach(button=>button.addEventListener('click',()=>{pausedUntil=performance.now()+6000;}));
   const frame=now=>{const delta=Math.min(40,now-(last||now));last=now;if(visible&&!document.hidden&&!hovered&&!focused&&now>Math.max(pausedUntil,row.autoResumeAt||0)){const max=row.scrollWidth-row.clientWidth;if(max>0){if(position>=max-1)direction=-1;if(position<=1)direction=1;position=Math.max(0,Math.min(max,position+direction*speed*delta/1000));row.scrollLeft=position;}}else{position=row.scrollLeft;}requestAnimationFrame(frame);};requestAnimationFrame(frame);
 }
 autoGlide(wheel,'[data-wheel-step]',28);
 autoGlide($('#brownfield-row'),'[data-scroll^="brownfield-row:"]',25);
 ['#brownfield-row','#why-hmt .story-accordion'].map(selector=>$(selector)).filter(Boolean).forEach(row=>{
   row.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();row.scrollBy({left:(event.key==='ArrowRight'?1:-1)*row.clientWidth*.45,behavior:reduced?'instant':'smooth'});}});
 });
 const industryImage=$('#industry-feature-image'),industryTitle=$('#industry-title'),industrySummary=$('#industry-feature-summary');
 const industryButtons=$$('[data-industry]'),industryRow=$('#industry-row');let industryPausedUntil=0,industryVisible=false;
 function selectIndustry(button,manual=true){
   if(manual)industryPausedUntil=performance.now()+12000;
   $$('[data-industry]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
   industryImage.style.opacity='0';
   industryImage.src=button.dataset.image;industryImage.alt=button.dataset.title;
   industryTitle.textContent=button.dataset.title;industrySummary.textContent=button.dataset.summary;
   industryImage.decode().catch(()=>{}).then(()=>{industryImage.style.opacity='1';});
   industryRow.scrollTo({left:button.offsetLeft-industryRow.offsetLeft-(industryRow.clientWidth-button.offsetWidth)/2,behavior:reduced?'instant':'smooth'});
 }
 industryButtons.forEach(button=>button.addEventListener('click',()=>selectIndustry(button)));
 $$('[data-scroll^="industry-row:"]').forEach(button=>button.addEventListener('click',()=>{const current=industryButtons.findIndex(item=>item.getAttribute('aria-pressed')==='true');const direction=Number(button.dataset.scroll.split(':')[1]);selectIndustry(industryButtons[(current+direction+industryButtons.length)%industryButtons.length]);}));
 if(!reduced){
   new IntersectionObserver(entries=>{industryVisible=entries.some(entry=>entry.isIntersecting);},{threshold:.35}).observe($('#industries'));
   setInterval(()=>{if(!industryVisible||document.hidden||performance.now()<industryPausedUntil||$('#industries').matches(':hover,:focus-within'))return;const current=industryButtons.findIndex(item=>item.getAttribute('aria-pressed')==='true');selectIndustry(industryButtons[(current+1)%industryButtons.length],false);},6500);
 }
 const storyButtons=$$('#why-hmt [data-story]');
 function openStory(button,center=false){
   storyButtons.forEach(trigger=>{const active=trigger===button;trigger.closest('.story-card').classList.toggle('active',active);trigger.setAttribute('aria-expanded',String(active));});
   if(center&&innerWidth<=760){const row=button.closest('.story-accordion'),item=button.closest('.story-card');
     // Wait for the flex expansion, then move only this horizontal strip.
     clearTimeout(row.storyTimer);row.storyTimer=setTimeout(()=>{const bounds=row.getBoundingClientRect(),card=item.getBoundingClientRect();row.scrollTo({left:row.scrollLeft+card.left-bounds.left-(bounds.width-card.width)/2,behavior:reduced?'instant':'smooth'});},reduced?0:710);
   }
 }
 storyButtons.forEach((button,index)=>{
   button.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'&&matchMedia('(hover: hover)').matches)openStory(button);});
   button.addEventListener('focus',()=>openStory(button,true));
   button.addEventListener('click',()=>openStory(button,true));
   button.addEventListener('keydown',event=>{let next=index;if(event.key==='ArrowRight')next=(index+1)%storyButtons.length;else if(event.key==='ArrowLeft')next=(index-1+storyButtons.length)%storyButtons.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=storyButtons.length-1;else return;event.preventDefault();storyButtons[next].focus({preventScroll:true});});
 });
})();
