(function(){
'use strict';
const T={
 en:{app:'Onco Companion',tag:'Your guide to oral cancer medicines',search:'Search your medicine…',staff:'Staff view',lang:'العربية',
  back:'← All medicines',count:n=>n+' medicine'+(n==1?'':'s'),none:'No medicine found.',
  reviewed:'✔ Reviewed by Pharmacy & Quality',draftb:'DRAFT — not yet reviewed',
  used:'What is this medicine for?',how:'How to take it',missed:'If you miss a dose',inter:'Foods, medicines & supplements to watch for',
  common:'Common side effects',commonNote:'These are often manageable — tell your care team if they bother you.',
  serious:'Call your care team right away if you notice:',monitor:'What your care team will monitor',store:'Storage & handling',
  class:'Class',form:'Form',schedule:'Typical schedule',food:'With food?',flag:'Key safety flag',brand:'Brand',
  report:'Feeling unwell, or think this medicine caused a reaction? Report it to your healthcare center or physician, and tell the pharmacy at your next visit. For severe symptoms (trouble breathing, swelling of face/throat, chest pain, fainting) seek emergency care immediately.',
  intro:'Tap a medicine to learn how to take it, what side effects to expect, and when to call your care team.',
  disc:'This app is an educational summary and does not replace advice from your doctor or pharmacist. Always follow your own prescription and instructions. Information is reviewed by the hospital pharmacy and quality teams before publishing.',
  pdf:'Download 2-page sheet (PDF, English)',noPII:'No personal information is collected or stored by this app.',
  draftBanner:'PREVIEW MODE — showing medicines that have not been approved for patients.',offline:'Works offline after the first visit.'},
 ar:{app:'رفيق الأورام',tag:'دليلك لأدوية السرطان الفموية',search:'ابحث عن دوائك…',staff:'عرض الطاقم',lang:'English',
  back:'→ جميع الأدوية',count:n=>n+' دواء',none:'لم يتم العثور على دواء.',
  reviewed:'✔ تمت المراجعة من الصيدلية وإدارة الجودة',draftb:'مسودة — لم تتم مراجعتها بعد',
  used:'ما هو استخدام هذا الدواء؟',how:'كيفية تناوله',missed:'إذا نسيت جرعة',inter:'أطعمة وأدوية ومكملات يجب الانتباه لها',
  common:'الأعراض الجانبية الشائعة',commonNote:'غالبًا يمكن التعامل معها — أخبر فريق الرعاية إذا أزعجتك.',
  serious:'اتصل بفريق الرعاية فورًا إذا لاحظت:',monitor:'ما سيتابعه فريق الرعاية',store:'التخزين والتعامل',
  class:'الفئة',form:'الشكل الصيدلاني',schedule:'الجدول المعتاد',food:'مع الطعام؟',flag:'تنبيه السلامة الرئيسي',brand:'الاسم التجاري',
  report:'إذا شعرت بتوعّك، أو تعتقد أن هذا الدواء سبّب لك تفاعلًا، فأبلغ مركزك الصحي أو طبيبك، وأخبر الصيدلية في زيارتك القادمة. وفي الأعراض الشديدة (صعوبة في التنفس، تورم الوجه/الحلق، ألم في الصدر، إغماء) اطلب الرعاية الطارئة فورًا.',
  intro:'اضغط على الدواء لمعرفة كيفية تناوله، والأعراض الجانبية المتوقعة، ومتى تتصل بفريق الرعاية.',
  disc:'هذا التطبيق ملخّص تثقيفي ولا يغني عن نصيحة طبيبك أو الصيدلي. التزم دائمًا بوصفتك وتعليماتك الخاصة. تتم مراجعة المعلومات من صيدلية المستشفى وإدارة الجودة قبل النشر.',
  pdf:'تحميل الملخص (PDF، بالإنجليزية)',noPII:'لا يجمع هذا التطبيق أي معلومات شخصية ولا يخزّنها.',
  draftBanner:'وضع المعاينة — يعرض أدوية لم يتم اعتمادها للمرضى.',offline:'يعمل دون إنترنت بعد الزيارة الأولى.'}
};
const $=s=>document.querySelector(s);
const st={lang:'en',staff:false,data:null,q:''};
try{st.lang=localStorage.getItem('lang')||((navigator.language||'').toLowerCase().startsWith('ar')?'ar':'en');st.staff=localStorage.getItem('staff')==='1'}catch(e){}
const preview=!!window.__PREVIEW__||location.hash.includes('preview')||location.search.includes('preview');
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const t=k=>T[st.lang][k];
const vis=()=>st.data.drugs.filter(d=>d.status==='approved'||preview);
const ul=a=>'<ul>'+a.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>';
function badge(d){return d.status==='approved'?'<span class="badge">'+t('reviewed')+'</span>':'<span class="badge draft-b">'+t('draftb')+'</span>'}
function chrome(){
  document.documentElement.lang=st.lang;document.documentElement.dir=st.lang==='ar'?'rtl':'ltr';
  $('#appName').textContent=t('app');$('#langBtn').textContent=t('lang');
  const b=$('#staffBtn');b.textContent=t('staff');b.setAttribute('aria-pressed',st.staff);
  $('#foot').innerHTML='<p>'+esc(t('disc'))+'</p><p class="nop">'+esc(t('noPII'))+' '+esc(t('offline'))+'</p>';
  const db=$('#draftBanner');db.hidden=!preview;db.textContent=t('draftBanner');
  document.title=t('app');
}
function home(){
  const L=vis().filter(d=>{const q=st.q.trim().toLowerCase();if(!q)return true;return [d.name.en,d.name.ar,d.brand,d.drug_class.en].join(' ').toLowerCase().includes(q)})
    .sort((a,b)=>a.name.en.localeCompare(b.name.en));
  $('#app').innerHTML='<h1>'+esc(t('tag'))+'</h1><p class="lead">'+esc(t('intro'))+'</p>'+
   '<input id="q" class="search" type="search" placeholder="'+esc(t('search'))+'" value="'+esc(st.q)+'" autocomplete="off" aria-label="'+esc(t('search'))+'">'+
   '<p class="lead" id="cnt"></p><ul class="list" id="lst"></ul>'+
   '<div class="note">'+esc(t('report'))+'</div>';
  const draw=()=>{const q=st.q.trim().toLowerCase();
   const M=vis().filter(d=>!q||[d.name.en,d.name.ar,d.brand,d.drug_class.en].join(' ').toLowerCase().includes(q)).sort((a,b)=>a.name.en.localeCompare(b.name.en));
   $('#cnt').textContent=t('count')(M.length);
   $('#lst').innerHTML=M.length?M.map(d=>'<li><a class="item" href="#/drug/'+d.id+'"><b>'+esc(d.name[st.lang])+'</b><small>'+(st.lang==='ar'?'<bdi>'+esc(d.name.en)+'</bdi> · ':'')+'<bdi>'+esc(d.brand)+'</bdi></small><br><span class="tag">'+esc(d.drug_class[st.lang].split(' — ')[0])+'</span>'+(st.staff?'<span class="tag">'+esc(d.food_cat[st.lang])+'</span>':'')+(d.status!=='approved'?'<span class="tag" style="background:#fde7c1">DRAFT</span>':'')+'</a></li>').join(''):'<li class="empty">'+esc(t('none'))+'</li>'};
  draw();
  $('#q').addEventListener('input',e=>{st.q=e.target.value;draw()});
}
function drug(id){
  const d=st.data.drugs.find(x=>x.id===id&&(x.status==='approved'||preview));
  if(!d){location.hash='#/';return}
  const l=st.lang;
  const staff=st.staff?'<div class="staff"><dl><dt>'+t('schedule')+'</dt><dd>'+esc(d.schedule[l])+'</dd><dt>'+t('food')+'</dt><dd>'+esc(d.food[l])+'</dd><dt>'+t('flag')+'</dt><dd><b>'+esc(d.flag[l])+'</b></dd><dt>'+t('form')+'</dt><dd>'+esc(d.form[l])+'</dd></dl></div>':'';
  $('#app').innerHTML='<a class="back" href="#/">'+t('back')+'</a>'+
   '<h1>'+esc(d.name[l])+'</h1><p class="lead">'+(l==='ar'?'<bdi>'+esc(d.name.en)+'</bdi> · ':'')+'<bdi>'+esc(d.brand)+'</bdi><br>'+esc(d.drug_class[l])+'</p>'+badge(d)+staff+
   '<div class="card"><h2>'+t('used')+'</h2><p>'+esc(d.used_for[l])+'</p></div>'+
   '<div class="card"><h2>'+t('how')+'</h2>'+(st.staff?'':'<p><b>'+esc(d.schedule[l])+'</b><br>'+esc(d.food[l])+'</p>')+ul(d.how_to_take[l])+'<p><b>'+t('missed')+':</b> '+esc(d.missed_dose[l])+'</p></div>'+
   '<div class="card"><h2>'+t('common')+'</h2><p class="lead">'+t('commonNote')+'</p>'+ul(d.common[l])+'</div>'+
   '<div class="alert"><h2>⚠ '+t('serious')+'</h2>'+ul(d.serious[l])+'</div>'+
   '<div class="note">'+esc(t('report'))+'</div>'+
   '<details class="card"><summary>'+t('inter')+'</summary>'+ul(d.interactions[l])+'</details>'+
   '<details class="card"><summary>'+t('monitor')+'</summary>'+ul(d.monitoring[l])+'</details>'+
   '<details class="card"><summary>'+t('store')+'</summary>'+ul(d.storage[l])+'</details>'+
   (window.__PREVIEW__?'':'<a class="btn" href="'+esc(d.pdf)+'" target="_blank" rel="noopener">'+t('pdf')+'</a>');
  window.scrollTo(0,0);
}
function route(){const m=location.hash.match(/^#\/drug\/([\w-]+)/);m?drug(m[1]):home();chrome()}
$('#langBtn').onclick=()=>{st.lang=st.lang==='en'?'ar':'en';try{localStorage.setItem('lang',st.lang)}catch(e){}route()};
$('#staffBtn').onclick=()=>{st.staff=!st.staff;try{localStorage.setItem('staff',st.staff?'1':'0')}catch(e){}route()};
window.addEventListener('hashchange',route);
function start(d){st.data=d;route()}
if(window.__DATA__)start(window.__DATA__);
else Promise.all([fetch('data.json',{cache:'no-cache'}).then(r=>r.json()),fetch('approved.json',{cache:'no-cache'}).then(r=>r.json()).catch(()=>({approved:[]}))]).then(([d,a])=>{const ok=(a.approved||[]).map(x=>String(x).toLowerCase());d.drugs.forEach(x=>{x.status=ok.includes(x.id)?'approved':'draft'});start(d)}).catch(()=>{$('#app').innerHTML='<p class="empty">Unable to load data. Please check your connection.</p>'});
if('serviceWorker' in navigator&&!window.__PREVIEW__&&location.protocol!=='file:')navigator.serviceWorker.register('sw.js').catch(()=>{});
})();
