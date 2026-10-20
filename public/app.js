(() => {
 'use strict';
 const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const ease='cubic-bezier(.22,1,.36,1)';
 const survey=$('#survey-dialog'),header=$('#site-header'),mobile=$('#mobile-menu'),menu=$('#menu-trigger');
 const scrollTo=el=>el?.scrollIntoView({behavior:reduced?'instant':'smooth',block:'start'});
 let processData=[],intent='Quote';
 fetch('./hmt-data.json').then(r=>r.json()).then(data=>{processData=data.steps;window.hmtReady=true;}).catch(()=>{window.hmtReady=true;});
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
 const intents=['Site Visit','Project Consultation','Emergency Machine Relocation','Quote'];
 $$('[data-intent]').forEach((button,i)=>button.addEventListener('click',()=>{intent=intents[i];$('#enquiry-intent').textContent=intent;$$('[data-intent]').forEach((b,j)=>b.classList.toggle('selected',j===i));if(i===2)$('#enquiry-form [name="projectType"]').value='Brownfield';scrollTo($('#contact-form'));}));
 $('#enquiry-form').addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;status(form,'Preview only — your enquiry has not been sent.');});
 function processStep(index){if(!processData[index])return;const step=processData[index];$$('[data-process]').forEach(button=>{const i=Number(button.dataset.process);button.classList.toggle('selected',i===index);button.classList.toggle('completed',i<index);button.setAttribute('aria-pressed',String(i===index));});$('#process-title').textContent=step.title;$('#process-description').textContent=step.description;const panel=$('.process-panel');panel.firstElementChild.textContent=String(index+1).padStart(2,'0');$$('#process .absolute.bg-accent').forEach(line=>{if(line.classList.contains('h-px'))line.style.width=`${index/8*100}%`;if(line.classList.contains('w-px'))line.style.height=`${index/8*100}%`;line.style.transition=`all .45s ${ease}`;});if(!reduced)panel.animate([{opacity:0,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}],{duration:350,easing:ease});}
 let processTimer=null,processManual=false;
 $$('[data-process]').forEach(button=>{button.setAttribute('aria-pressed',String(button.dataset.process==='0'));button.classList.toggle('selected',button.dataset.process==='0');button.addEventListener('click',()=>{processManual=true;clearInterval(processTimer);processStep(Number(button.dataset.process));});});
 if(!reduced){const processObserver=new IntersectionObserver(entries=>{if(!entries.some(entry=>entry.isIntersecting))return;processObserver.disconnect();if(processManual)return;let index=0;processTimer=setInterval(()=>{if(processManual||++index>=9){clearInterval(processTimer);return;}processStep(index);},700);},{rootMargin:'-20% 0px'});processObserver.observe($('#process'));}
 $$('[data-scroll]').forEach(button=>button.addEventListener('click',()=>{const [id,direction]=button.dataset.scroll.split(':');const row=$(`#${id}`);row.scrollBy({left:row.clientWidth*.78*Number(direction),behavior:reduced?'instant':'smooth'});}));
 const horizontalRows=['greenfield-row','brownfield-row','industry-row'].map(id=>$(`#${id}`)).concat($('#why-hmt .story-accordion')).filter(Boolean);
 const rowMax=row=>Math.max(0,row.scrollWidth-row.clientWidth);
 const rowInScrollZone=row=>{const rect=row.getBoundingClientRect();return rect.top<innerHeight*.54&&rect.bottom>innerHeight*.46;};
 window.addEventListener('wheel',event=>{
   if(event.defaultPrevented||event.ctrlKey||event.shiftKey||survey.open||Math.abs(event.deltaY)<=Math.abs(event.deltaX))return;
   const delta=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?innerHeight:1);
   const row=horizontalRows.find(candidate=>rowMax(candidate)>2&&rowInScrollZone(candidate));
   if(!row)return;
   const max=rowMax(row);
   if(delta>0&&row.scrollLeft>=max-2||delta<0&&row.scrollLeft<=2){
     event.preventDefault();
     window.scrollBy({top:delta,behavior:'instant'});
     return;
   }
   event.preventDefault();
   row.scrollLeft=Math.max(0,Math.min(max,row.scrollLeft+delta));
 },{passive:false});
 horizontalRows.forEach(row=>{
   let lastX=null;
   row.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')lastX=event.clientX;});
   row.addEventListener('pointermove',event=>{
     if(event.pointerType!=='mouse'||lastX===null)return;
     const delta=event.clientX-lastX;lastX=event.clientX;
     if(Math.abs(delta)>1)row.scrollLeft=Math.max(0,Math.min(rowMax(row),row.scrollLeft+delta*2.5));
   });
   row.addEventListener('pointerleave',()=>{lastX=null;});
 });
 $$('[data-industry]').forEach(button=>button.addEventListener('click',()=>{const index=Number(button.dataset.industry);$$('[data-industry]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));$$('.industry-panel').forEach((panel,i)=>panel.hidden=i!==index);const panel=$(`#industry-panel-${index}`);if(!reduced)panel.animate([{opacity:0,transform:'translateY(14px)'},{opacity:1,transform:'none'}],{duration:350,easing:ease});}));
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
