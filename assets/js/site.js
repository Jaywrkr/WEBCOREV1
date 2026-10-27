/* Coresolutions — sitio web. Módulos independientes: cada uno se activa solo si su sección existe en la página. */
(function(){
  'use strict';
  var doc=document.documentElement; doc.classList.add('js');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
  var clamp=function(v,a,b){return Math.max(a,Math.min(b,v))};
  var nf=function(n,d){return Number(n).toLocaleString('en-US',{minimumFractionDigits:d||0,maximumFractionDigits:d||0})};
  var usd=function(n){return 'USD '+nf(Math.round(n))};
  var ROOT=document.body.getAttribute('data-root')||'';
  function store(k,v){try{sessionStorage.setItem(k,v)}catch(e){}}
  function take(k){try{var v=sessionStorage.getItem(k);sessionStorage.removeItem(k);return v}catch(e){return null}}
  function onVisible(el,cb){if(!('IntersectionObserver' in window)){cb(true);return}new IntersectionObserver(function(es){cb(es[0].isIntersecting)}).observe(el)}
  var year=$('#year');if(year)year.textContent=new Date().getFullYear();

  /* ---------- Header, menu, progress, mobile bar ---------- */
  var hdr=$('header.site'),menu=$('#menu'),links=$('#navlinks'),prog=$('#progress'),mbar=$('#mbar'),first=$('main > section');
  function setMenu(open){if(!links)return;links.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');ui()}
  if(menu)menu.addEventListener('click',function(){setMenu(!links.classList.contains('open'))});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&links&&links.classList.contains('open'))setMenu(false)});
  function ui(){var dark=!!(first&&first.classList.contains('dark'));hdr.classList.toggle('clear',dark&&window.scrollY<12&&!(links&&links.classList.contains('open')));
    var max=doc.scrollHeight-doc.clientHeight;if(prog)prog.style.transform='scaleX('+(max>0?doc.scrollTop/max:0)+')';
    if(mbar&&first){var past=first.getBoundingClientRect().bottom<0,f=$('#form')||$('footer'),near=f&&f.getBoundingClientRect().top<window.innerHeight*.92;mbar.classList.toggle('show',past&&!near)}}
  window.addEventListener('scroll',ui,{passive:true});ui();

  /* ---------- Hero in two beats: headline shrinks as the stage takes over ---------- */
  (function(){var h=$('.h4');if(!h||reduce||!window.matchMedia('(min-width:901px)').matches)return;var top=$('.h4-top'),h1=$('.h4 h1'),sub=$('.h4-sub');var tick=false;
    function upd(){var y=window.scrollY,r=top.offsetHeight||600,p=clamp(y/(r*.9),0,1);h1.style.transform='translateY('+(y*.35)+'px) scale('+(1-p*.18)+')';h1.style.opacity=String(1-p*.55);sub.style.transform='translateY('+(y*.2)+'px)';sub.style.opacity=String(1-p*.8)}
    h1.style.transformOrigin='left top';h1.style.willChange='transform,opacity';
    window.addEventListener('scroll',function(){if(tick)return;tick=true;requestAnimationFrame(function(){upd();tick=false})},{passive:true});upd()})();

  /* ---------- Prefetch on hover + theme-color follows the band ---------- */
  (function(){var done={};document.addEventListener('pointerover',function(e){var a=e.target.closest('a[href]');if(!a)return;var u=a.getAttribute('href');if(!u||/^(https?:|mailto:|tel:|#)/.test(u))return;var abs=new URL(u,location.href).href.split('#')[0];if(done[abs]||abs===location.href.split('#')[0])return;done[abs]=1;var l=document.createElement('link');l.rel='prefetch';l.href=abs;l.as='document';document.head.appendChild(l)});
    var tc=document.querySelector('meta[name="theme-color"]');if(!tc||!('IntersectionObserver' in window))return;var bands=$$('header.site, main > section, main > div, footer');
    var io=new IntersectionObserver(function(es){es.forEach(function(x){if(!x.isIntersecting)return;var el=x.target,dark=el.classList.contains('dark')||el.tagName==='FOOTER'||el.classList.contains('deep');tc.setAttribute('content',dark?(el.classList.contains('deep')||el.tagName==='FOOTER'?'#000440':'#01095C'):(el.classList.contains('band-gray')||el.classList.contains('sector-band')?'#F2F4F7':'#FFFFFF'))})},{rootMargin:'-1px 0px -99% 0px'});
    bands.forEach(function(b){if(b.tagName!=='HEADER')io.observe(b)})})();

  /* ---------- Reveal (below the fold only) ---------- */
  if('IntersectionObserver' in window&&!reduce){
    var ro=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.remove('pre');ro.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
    $$('.reveal').forEach(function(el,k){if(el.getBoundingClientRect().top>window.innerHeight){el.classList.add('pre');el.style.transitionDelay=(k%3)*60+'ms';ro.observe(el)}});
  }

  /* ---------- Copy buttons ---------- */
  $$('[data-copy]').forEach(function(b){b.addEventListener('click',function(){var el=document.getElementById(b.dataset.copy),txt=el.textContent.trim();function ok(){b.textContent='Copiado';setTimeout(function(){b.textContent='Copiar'},1600)}function sel(){var r=document.createRange();r.selectNodeContents(el);var s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent='Seleccionado'}try{navigator.clipboard.writeText(txt).then(ok,sel)}catch(e){sel()}})});

  /* ---------- Contact: form + hand-off from other pages ---------- */
  var form=$('#form');
  function fill(msg,interest){if(!form)return;var ta=$('#f-msg');if(msg&&ta){ta.value=(ta.value.trim()?ta.value.trim()+'\n':'')+msg;ta.classList.remove('flash');void ta.offsetWidth;ta.classList.add('flash')}if(interest)$$('.chips input',form).forEach(function(c){if(c.value===interest)c.checked=true})}
  function toContact(msg,interest){if(form){fill(msg,interest);$('#contacto').scrollIntoView({behavior:reduce?'auto':'smooth'});setTimeout(function(){$('#f-name').focus({preventScroll:true})},reduce?0:600);return true}if(msg)store('cs-msg',msg);if(interest)store('cs-int',interest);return false}
  document.addEventListener('click',function(e){var a=e.target.closest('[data-msg],[data-interest]');if(!a||a.closest('#form'))return;if(toContact(a.dataset.msg,a.dataset.interest))e.preventDefault()});
  if(form){
    var m0=take('cs-msg'),i0=take('cs-int');if(m0||i0)fill(m0,i0);
    form.addEventListener('submit',function(e){e.preventDefault();var name=form.nombre.value.trim(),mail=form.correo.value.trim(),err=$('#err');
      var okMail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);form.nombre.setAttribute('aria-invalid',String(!name));form.correo.setAttribute('aria-invalid',String(!okMail));
      if(!name||!okMail){err.textContent='Ingrese su nombre y un correo válido para continuar.';err.hidden=false;(name?form.correo:form.nombre).focus();return}err.hidden=true;
      var ints=$$('.chips input:checked',form).map(function(i){return i.value}).join(', ');
      var co=form.empresa.value.trim(),msg=form.mensaje?form.mensaje.value.trim():'',btn=$('#f-send'),done=$('#done');if(!ints&&form.cargo&&form.cargo.value)ints='Cargo: '+form.cargo.value;
      function mailFallback(){var body='Nombre: '+name+'\nEmpresa: '+co+'\nCorreo: '+mail+'\nÁreas de interés: '+(ints||'-')+'\n\n'+msg;
        var a=document.createElement('a');a.href='mailto:info@coresolutions.com.ec?subject='+encodeURIComponent('Solicitud de evaluación: '+(co||name))+'&body='+encodeURIComponent(body);a.click();
        done.textContent='Abrimos su aplicación de correo con el mensaje listo. Si no se abrió, escríbanos a info@coresolutions.com.ec.';done.hidden=false}
      function sent(){done.textContent='Recibimos su solicitud. Le escribiremos a su correo en horario laboral.';done.hidden=false;form.reset();$$('.chips input',form).forEach(function(c){c.checked=c.value==='CoreOnCloud'})}
      btn.disabled=true;btn.setAttribute('aria-busy','true');
      var payload={nombre:name,empresa:co,correo:mail,interes:ints,mensaje:msg,web:form.web.value,t:Date.now()-T0};
      var p=window.fetch?fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}).then(function(r){if(r.ok)return sent();if(r.status===400||r.status===429){err.textContent=r.status===429?'Recibimos varias solicitudes seguidas. Intente en unos minutos o escríbanos por correo.':'Revise su nombre y su correo.';err.hidden=false;return}mailFallback()}).catch(mailFallback):Promise.reject();
      p.catch(mailFallback).then(function(){btn.disabled=false;btn.removeAttribute('aria-busy')})});
    var T0=Date.now();
    $$('input',form).forEach(function(i){i.addEventListener('input',function(){i.removeAttribute('aria-invalid')})});
  }

  /* ---------- Sector explorer ---------- */
  (function(){
    var tabs=$$('.sx-tab');if(!tabs.length)return;
    var SL={'Respaldo y continuidad':'respaldo-y-continuidad','Ciberseguridad':'ciberseguridad','Redes':'redes-y-conectividad','Data Center':'data-center','Virtualización':'virtualizacion-hci'};
    var D=window.__SECTORS,box=$('#sx-in'),panel=$('#sx-panel'),cur=0,AR='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';
    function render(d){return '<span class="label">'+d.n+'</span><p class="sx-msg">'+d.m+'</p><ul class="sx-pri">'+d.p.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul><div class="sx-sol"><span>Soluciones clave</span><div>'+d.s.map(function(x){return SL[x]?'<a class="tag" href="'+ROOT+'soluciones/'+SL[x]+'.html">'+x+'</a>':'<span class="tag">'+x+'</span>'}).join('')+'</div></div><a href="'+ROOT+'contacto.html" class="btn" data-msg="Sector: '+d.n+'. ">Hablar con un especialista '+AR+'</a>'}
    function set(i,focus){if(i===cur&&!focus)return;cur=i;tabs.forEach(function(t,j){t.setAttribute('aria-selected',String(j===i));t.tabIndex=j===i?0:-1});if(focus)tabs[i].focus();panel.setAttribute('aria-labelledby',tabs[i].id);
      box.innerHTML=render(D[i]);box.classList.remove('swap');void box.offsetWidth;box.classList.add('swap')}
    tabs.forEach(function(t,i){t.addEventListener('click',function(){set(i)});t.addEventListener('keydown',function(e){var d=e.key==='ArrowDown'||e.key==='ArrowRight'?1:e.key==='ArrowUp'||e.key==='ArrowLeft'?-1:0;if(!d)return;e.preventDefault();set((i+d+tabs.length)%tabs.length,true)})});
    box.innerHTML=render(D[0]);
    var h=location.hash.slice(1),hi=D.map(function(d){return d.k}).indexOf(h);if(hi>0)set(hi);
  })();

    /* ---------- HERO: network → firewall → CoreOnCloud ---------- */
    (function(){
      if(!$('#flow'))return;
      var cv=$('#flow'),hero=$('.hero'),ctx=cv.getContext('2d'),W,H,N,ptr={x:0,y:0,tx:0,ty:0,on:false},rip=[],pk=[],rep=[],fx=[],t0=performance.now(),run=true,spot=$('.spot');
      var FW,RX,RW=44,racks,last=0,mob=false;
      var C={lane:'157,165,255',data:'#FFFFFF',threat:'#DA1E28',label:'rgba(200,204,255,.75)'};
      function size(){var dpr=Math.min(2,window.devicePixelRatio||1),r=hero.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
        mob=W<700;N=mob?Math.round(clamp(H/70,8,11)):Math.round(clamp(H/58,12,16));FW=W*(mob?.12:.22);RW=mob?14:34;RX=mob?W-12:W*.88;
        racks=[{code:'CUE',top:H*.24,bot:H*.48,units:[]},{code:'GYE',top:H*.56,bot:H*.8,units:[]}];
        racks.forEach(function(k){var n=Math.floor((k.bot-k.top)/10);for(var i=0;i<n;i++)k.units.push({on:Math.random()>.5,flash:0})});
        if(!ptr.x){ptr.x=ptr.tx=W*.5;ptr.y=ptr.ty=H*.5}}
      function baseY(i){return H*(.18+.70*i/(N-1))}
      function laneY(i,x,t){var b=baseY(i),y=b+Math.sin(x*.0035+t*.6+i*.41)*5+Math.sin(x*.012-t*1.1+i)*2;
        var dx=x-ptr.x,dy=y-ptr.y,R=Math.min(140,W*.13),f=Math.exp(-(dx*dx+dy*dy)/(2*R*R));y+=(dy>=0?1:-1)*f*40;
        for(var k=0;k<rip.length;k++){var r=rip[k],d=Math.hypot(x-r.x,y-r.y),band=Math.exp(-Math.pow(d-r.r,2)/(2*34*34));y+=Math.sin((d-r.r)*.09)*band*16*r.a}
        // converge into the rack that serves this lane
        var k2=b<H*.5?racks[0]:racks[1],tgt=clamp(b,k2.top+6,k2.bot-6),u=clamp((x-(RX-W*.16))/(W*.16),0,1);u=u*u*(3-2*u);return y+(tgt-b)*u}
      function rackOf(i){return baseY(i)<H*.5?racks[0]:racks[1]}
      function spawn(t){var i=Math.floor(Math.random()*N),threat=Math.random()<.13;pk.push({i:i,x:-10,v:(mob?1.6:2.2)+Math.random()*2.4,threat:threat})}
      function frame(now){var t=reduce?3:(now-t0)/1000,dt=Math.min(50,now-(last||now))/16.7;last=now;
        if(!ptr.on){ptr.tx=W*(.45+.25*Math.sin(t*.19));ptr.ty=H*(.5+.24*Math.sin(t*.27+1.3))}
        ptr.x+=(ptr.tx-ptr.x)*.07;ptr.y+=(ptr.ty-ptr.y)*.07;
        ctx.clearRect(0,0,W,H);
        var step=mob?10:12,end=RX-RW/2;
        // lanes
        for(var i=0;i<N;i++){var near=Math.exp(-Math.pow(baseY(i)-ptr.y,2)/(2*130*130));
          ctx.beginPath();for(var x=0;x<=end;x+=step){var y=laneY(i,Math.min(x,end),t);x?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.lineTo(end,laneY(i,end,t));
          ctx.strokeStyle='rgba('+C.lane+','+((mob?.07:.08)+(mob?.14:.18)*near).toFixed(3)+')';ctx.lineWidth=1;ctx.stroke();
          }
        // firewall
        ctx.save();ctx.strokeStyle='rgba(200,204,255,'+(mob?.3:.4)+')';ctx.lineWidth=1;ctx.setLineDash([6,6]);ctx.lineDashOffset=-t*20;ctx.beginPath();ctx.moveTo(FW,H*.15);ctx.lineTo(FW,H*.9);ctx.stroke();ctx.restore();
        // racks + replication link
        racks.forEach(function(k){ctx.strokeStyle='rgba(200,204,255,.5)';ctx.lineWidth=1;ctx.strokeRect(RX-RW/2,k.top,RW,k.bot-k.top);
          k.units.forEach(function(u,j){var y=k.top+5+j*10;if(!reduce&&Math.random()<.02)u.on=!u.on;u.flash=Math.max(0,u.flash-.04*dt);
            ctx.fillStyle='rgba(200,204,255,.08)';ctx.fillRect(RX-RW/2+3,y-3,RW-6,7);
            ctx.fillStyle=u.flash>0?'#ffffff':(u.on?'#42BE65':'rgba(66,190,101,.25)');ctx.fillRect(RX+RW/2-9,y-1,3,3);})});
        ctx.save();ctx.strokeStyle='rgba(200,204,255,.45)';ctx.setLineDash([3,5]);ctx.lineDashOffset=t*14;ctx.beginPath();ctx.moveTo(RX,racks[0].bot);ctx.lineTo(RX,racks[1].top);ctx.stroke();ctx.restore();
        // labels
        ctx.font='500 11px "IBM Plex Mono",monospace';ctx.fillStyle=C.label;ctx.textAlign='left';
        if(!mob){ctx.fillText('SU EMPRESA',12,H*.15-12);ctx.textAlign='center';ctx.fillText('FIREWALL',FW,H*.15-12);ctx.fillText('CoreOnCloud',RX,racks[0].top-14);ctx.textAlign='left';ctx.fillStyle='#fff';ctx.fillRect(12,H-34,6,6);ctx.fillStyle=C.label;ctx.fillText('Datos',24,H-28);ctx.fillStyle=C.threat;ctx.fillRect(76,H-34,6,6);ctx.fillStyle=C.label;ctx.fillText('Amenaza bloqueada',88,H-28)}
        if(!mob){ctx.textAlign='center';ctx.fillText('CUE',RX,racks[0].bot+14);ctx.fillText('GYE',RX,racks[1].bot+14)}
        if(!mob){ctx.save();ctx.translate(RX+RW/2+12,(racks[0].bot+racks[1].top)/2);ctx.rotate(-Math.PI/2);ctx.fillText('réplica',0,0);ctx.restore()}
        // packets
        if(!reduce){var rate=mob?.12:.24;if(Math.random()<rate*dt)spawn(t);if(pk.length>(mob?24:40))pk.shift()}
        pk=pk.filter(function(p){p.x+=p.v*dt;var y=laneY(p.i,p.x,t);
          if(p.threat&&p.x>=FW){fx.push({x:FW,y:y,r:2,a:1,red:true});return false}
          if(p.x>=end){var k=rackOf(p.i),u=k.units[Math.floor(clamp((y-k.top)/10,0,k.units.length-1))];if(u)u.flash=1;
            if(k===racks[0]&&Math.random()<.35)rep.push({y:racks[0].bot,p:0});return false}
          var tail=p.x-(p.threat?10:(mob?12:18)),ty=laneY(p.i,tail,t),g=ctx.createLinearGradient(tail,ty,p.x,y),col=p.threat?'218,30,40':'255,255,255';
          g.addColorStop(0,'rgba('+col+',0)');g.addColorStop(1,'rgba('+col+',.95)');ctx.strokeStyle=g;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(tail,ty);ctx.lineTo(p.x,y);ctx.stroke();
          ctx.fillStyle=p.threat?C.threat:C.data;ctx.fillRect(p.x-2,y-2,4,4);return true});
        rep=rep.filter(function(r){r.p+=.02*dt;if(r.p>=1){var u=racks[1].units[Math.floor(Math.random()*racks[1].units.length)];if(u)u.flash=1;return false}var y=racks[0].bot+(racks[1].top-racks[0].bot)*r.p;ctx.fillStyle='#9DA5FF';ctx.fillRect(RX-2,y-2,4,4);return true});
        fx=fx.filter(function(f){f.r=Math.min(mob?8:14,f.r+1.2*dt);f.a-=.035*dt;if(f.a<=0)return false;ctx.strokeStyle='rgba(218,30,40,'+f.a.toFixed(3)+')';ctx.lineWidth=1.5;ctx.strokeRect(f.x-f.r,f.y-f.r,f.r*2,f.r*2);return true});
        rip=rip.filter(function(r){r.r+=7*dt;r.a*=Math.pow(.975,dt);return r.a>.04});
        spot.style.setProperty('--mx',(ptr.x/W*100).toFixed(1)+'%');spot.style.setProperty('--my',(ptr.y/H*100).toFixed(1)+'%');
        if(run&&!reduce)requestAnimationFrame(frame)}
      hero.addEventListener('pointermove',function(e){var r=hero.getBoundingClientRect();ptr.on=true;ptr.tx=e.clientX-r.left;ptr.ty=e.clientY-r.top});
      hero.addEventListener('pointerleave',function(){ptr.on=false});
      hero.addEventListener('pointerdown',function(e){if(e.target.closest('a,button'))return;var r=hero.getBoundingClientRect();rip.push({x:e.clientX-r.left,y:e.clientY-r.top,r:0,a:1})});
      var rt;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){size();if(reduce)requestAnimationFrame(frame)},120)});
      size();
      if(!reduce)for(var s0=0;s0<(mob?8:12);s0++){spawn(0);pk[pk.length-1].x=Math.random()*W*.8}
      requestAnimationFrame(frame);
      if(!reduce)setTimeout(function(){rip.push({x:W/2,y:H*.45,r:0,a:1})},900);
      onVisible(hero,function(v){var was=run;run=v;if(v&&!was&&!reduce){last=0;requestAnimationFrame(frame)}});

      /* parallax fade of hero copy */
      var intro=$('#hero-intro'),tick=false;
      if(!reduce)window.addEventListener('scroll',function(){if(tick)return;tick=true;requestAnimationFrame(function(){var y=window.scrollY,h=H||800;if(y<h){intro.style.transform='translateY('+(y*.28)+'px)';intro.style.opacity=String(Math.max(0,1-y/(h*.75)))}tick=false})},{passive:true});

      /* magnetic CTA */
      if(!reduce&&window.matchMedia('(pointer:fine)').matches)$$('.magnet').forEach(function(b){var zone=b.parentNode;zone.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);if(Math.hypot(dx,dy)<160)b.style.transform='translate('+dx*.18+'px,'+dy*.3+'px)';else b.style.transform=''});zone.addEventListener('pointerleave',function(){b.style.transform=''})});
    })();


    /* ---------- People: vows line + count-up ---------- */
    (function(){
      var vows=$$('.vow'),proof0=$('#facts');if(!vows.length&&!proof0)return;
      if(!('IntersectionObserver' in window)||reduce){vows.forEach(function(v){v.classList.add('in')});return}
      if(!proof0){vows.forEach(function(v){v.classList.add('in')})}
      var vo=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var i=vows.indexOf(e.target);setTimeout(function(){e.target.classList.add('in')},i*180);vo.unobserve(e.target)}})},{threshold:.4});
      vows.forEach(function(v){vo.observe(v)});
      var proof=proof0,dds=proof?$$('[data-count]',proof):[];
      if(proof&&proof.getBoundingClientRect().top>window.innerHeight){proof.classList.add('arm');
        var po=new IntersectionObserver(function(es){if(!es[0].isIntersecting)return;po.disconnect();proof.classList.add('in');var s0=performance.now();dds.forEach(function(d){var tgt=+d.dataset.count;(function f(n){var p=Math.min(1,(n-s0)/1600),e=1-Math.pow(1-p,4);d.textContent=nf(Math.round(tgt*e))+'+';if(p<1)requestAnimationFrame(f)})(s0)})},{threshold:.5});
        po.observe(proof)}
    })();


    /* ---------- CoreOnCloud: Ecuador map ---------- */
    (function(){
      if(!$('#map'))return;
      var cv=$('#map'),ctx=cv.getContext('2d'),tip=$('#map-tip'),W,H,dots=[],poly=[],cities=[],links=[],packets=[],mouse={x:-999,y:-999},t0=null,running=false,maxD=1;
      var EC=[[-78.85,1.45],[-79.25,1.2],[-79.65,0.98],[-80.05,0.82],[-80.1,0.45],[-80.05,0.05],[-80.3,-0.35],[-80.48,-0.62],[-80.72,-0.93],[-80.92,-1.07],[-80.82,-1.5],[-80.75,-1.9],[-80.98,-2.2],[-80.72,-2.42],[-80.4,-2.65],[-80.15,-2.55],[-79.95,-2.75],[-80.02,-3.05],[-79.95,-3.3],[-80.25,-3.42],[-80.3,-3.65],[-80.12,-4.05],[-79.62,-4.42],[-79.3,-4.92],[-78.9,-5.0],[-78.6,-4.55],[-78.35,-3.6],[-77.9,-2.98],[-76.65,-2.6],[-75.55,-1.55],[-75.22,-0.95],[-75.4,-0.15],[-76.3,0.38],[-77.1,0.4],[-77.45,0.65],[-77.7,0.85],[-78.3,1.2]];
      var CITIES=[['CUE','Cuenca',-79.0,-2.9,1],['GYE','Guayaquil',-79.89,-2.19,1],['UIO','Quito',-78.47,-0.18],['MEC','Manta',-80.72,-0.96],['PVO','Portoviejo',-80.45,-1.06],['ESM','Esmeraldas',-79.65,0.96],['STD','Santo Domingo',-79.17,-0.25],['IBR','Ibarra',-78.12,0.35],['ATO','Ambato',-78.62,-1.24],['RBB','Riobamba',-78.65,-1.67],['LOH','Loja',-79.2,-4.0],['MCH','Machala',-79.96,-3.26],['LGQ','Lago Agrio',-76.89,0.09],['TNA','Tena',-77.81,-0.99],['MAC','Macas',-78.12,-2.31]];
      var proj;
      function setup(){var dpr=Math.min(2,window.devicePixelRatio||1),r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
        var lon0=-81.2,lon1=-75.0,lat0=-5.2,lat1=1.7,pad=12,bottom=34,k=Math.min((W-pad*2)/(lon1-lon0),(H-pad-bottom)/(lat1-lat0)),ox=(W-(lon1-lon0)*k)/2,oy=pad;
        proj=function(lo,la){return [ox+(lo-lon0)*k,oy+(lat1-la)*k]};
        poly=EC.map(function(p){return proj(p[0],p[1])});
        cities=CITIES.map(function(c){var p=proj(c[2],c[3]);return {code:c[0],name:c[1],x:p[0],y:p[1],hub:!!c[4]}});
        var hub=cities[0];dots=[];var g=W<520?8:9;
        for(var y=Math.round(g/2);y<H;y+=g)for(var x=Math.round(g/2);x<W;x+=g){if(inside(x,y)){var d=Math.hypot(x-hub.x,y-hub.y);dots.push({x:x,y:y,d:d,ph:Math.random()*6.28});if(d>maxD)maxD=d}}
        links=[];var c0=cities[0],c1=cities[1];links.push(mk(c0,c1,0));
        cities.slice(2).forEach(function(c,i){var from=(Math.hypot(c.x-c0.x,c.y-c0.y)<Math.hypot(c.x-c1.x,c.y-c1.y))?c0:c1;links.push(mk(from,c,i+1))});
        packets=[];
      }
      function mk(a,b,i){var mx=(a.x+b.x)/2,my=(a.y+b.y)/2,dx=b.x-a.x,dy=b.y-a.y,L=Math.hypot(dx,dy)||1,o=Math.min(60,L*.22);return {a:a,b:b,cx:mx-dy/L*o,cy:my+dx/L*o,i:i,hub:a.hub&&b.hub}}
      function bz(l,t){var u=1-t;return [u*u*l.a.x+2*u*t*l.cx+t*t*l.b.x,u*u*l.a.y+2*u*t*l.cy+t*t*l.b.y]}
      function inside(x,y){var c=false;for(var i=0,j=poly.length-1;i<poly.length;j=i++){var xi=poly[i][0],yi=poly[i][1],xj=poly[j][0],yj=poly[j][1];if(((yi>y)!==(yj>y))&&(x<(xj-xi)*(y-yi)/(yj-yi)+xi))c=!c}return c}
      function draw(now){var t=reduce?99:(now-t0)/1000;ctx.clearRect(0,0,W,H);
        var R=t*520;
        ctx.beginPath();poly.forEach(function(p,i){i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])});ctx.closePath();
        ctx.fillStyle='rgba(43,63,232,'+(.2*clamp(R/maxD,0,1)).toFixed(3)+')';ctx.fill();
        ctx.strokeStyle='rgba(200,204,255,'+(.85*clamp((t-.4)/.8,0,1)).toFixed(3)+')';ctx.lineWidth=1.25;ctx.stroke();
        for(var i=0;i<dots.length;i++){var p=dots[i];if(p.d>R)continue;var a=.42+.14*Math.sin(t*1.2+p.ph),front=R-p.d;if(front<60&&R<maxD+60)a+=(1-front/60)*.7;var md=Math.hypot(mouse.x-p.x,mouse.y-p.y);var s=1.6;if(md<70){a+=(1-md/70)*.6;s+=(1-md/70)*1.6}ctx.fillStyle='rgba(200,204,255,'+clamp(a,0,1).toFixed(3)+')';ctx.fillRect(p.x-s/2,p.y-s/2,s,s)}
        links.forEach(function(l){var pr=clamp((t-1-l.i*.06)/.7,0,1);if(pr<=0)return;ctx.beginPath();for(var k=0;k<=24*pr;k++){var q=bz(l,k/24);k?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1])}ctx.strokeStyle=l.hub?'rgba(255,255,255,.85)':'rgba(157,165,255,.5)';ctx.lineWidth=l.hub?1.6:1;ctx.stroke()});
        if(!reduce&&t>2&&Math.random()<.18){var l=links[Math.floor(Math.random()*links.length)];packets.push({l:l,p:0,v:.008+Math.random()*.01,rev:Math.random()<.5})}
        ctx.fillStyle='#fff';packets=packets.filter(function(k){k.p+=k.v;if(k.p>=1)return false;var q=bz(k.l,k.rev?1-k.p:k.p);ctx.fillRect(q[0]-2,q[1]-2,4,4);return true});
        cities.forEach(function(c){var ap=clamp((t-.6-(c.hub?0:.9))/.5,0,1);if(!ap)return;ctx.globalAlpha=ap;
          if(c.hub){var pr=(t*.5)%1;ctx.strokeStyle='rgba(255,255,255,'+((1-pr)*.8).toFixed(3)+')';ctx.lineWidth=1;var r=7+pr*24;ctx.strokeRect(c.x-r,c.y-r,r*2,r*2);ctx.fillStyle='#fff';ctx.fillRect(c.x-6,c.y-6,12,12);ctx.fillStyle=getComputedStyle(doc).getPropertyValue('--navy');ctx.fillRect(c.x-2,c.y-2,4,4);ctx.font='500 13px "IBM Plex Mono",monospace';ctx.fillStyle='#fff';ctx.fillText(c.code,c.x+12,c.y+(c.code==='CUE'?16:-10))}
          else{ctx.fillStyle='#9DA5FF';ctx.beginPath();ctx.arc(c.x,c.y,3,0,6.283);ctx.fill();ctx.font='11px "IBM Plex Mono",monospace';ctx.fillStyle='rgba(200,204,255,.7)';ctx.fillText(c.code,c.x+6,c.y+(c.code==='PVO'?14:-5))}
          ctx.globalAlpha=1});
        if(running&&!reduce)requestAnimationFrame(draw)}
      var mapEl=cv.parentNode;
      mapEl.addEventListener('pointermove',function(e){var r=cv.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top;var hit=null;cities.forEach(function(c){if(Math.hypot(c.x-mouse.x,c.y-mouse.y)<14)hit=c});if(hit){tip.textContent=hit.code+' · '+hit.name+(hit.hub?' · Centro de datos':'');tip.style.left=hit.x+'px';tip.style.top=hit.y+'px';tip.classList.add('show')}else tip.classList.remove('show');if(reduce)requestAnimationFrame(draw)});
      mapEl.addEventListener('pointerleave',function(){mouse.x=mouse.y=-999;tip.classList.remove('show')});
      var rt;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){setup();if(reduce)requestAnimationFrame(draw)},150)});
      setup();if(reduce)requestAnimationFrame(draw);
      onVisible(cv,function(v){var was=running;running=v;if(v&&t0===null)t0=performance.now();if(v&&!was&&!reduce)requestAnimationFrame(draw)});
    })();


    /* ---------- NOC demo console ---------- */
    (function(){
      if(!$('#lat-chart'))return;
      var cv=$('#lat-chart'),ctx=cv.getContext('2d'),data=[],W,H,live=true;
      for(var i=0;i<60;i++)data.push(sample());
      function sample(){var b=7.2+Math.sin(Date.now()/9000)*.4+(Math.random()-.5)*1.1;if(Math.random()<.04)b+=3+Math.random()*4;return clamp(b,4,19)}
      function size(){var dpr=Math.min(2,window.devicePixelRatio||1),r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}
      function draw(){var L=34,R=W-46,T=8,B=H-22,ymax=20;ctx.clearRect(0,0,W,H);ctx.font='11px "IBM Plex Mono",monospace';ctx.textBaseline='middle';
        [0,5,10,15,20].forEach(function(v){var y=B-(v/ymax)*(B-T);ctx.strokeStyle='rgba(200,204,255,.12)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(L,y);ctx.lineTo(R,y);ctx.stroke();ctx.fillStyle='#9DA5FF';ctx.textAlign='right';ctx.fillText(v,L-8,y)});
        ctx.textAlign='left';ctx.textBaseline='alphabetic';ctx.fillStyle='#9DA5FF';ctx.fillText('−60 s',L,H-4);ctx.textAlign='right';ctx.fillText('ahora',R,H-4);
        var px=function(i){return L+(i/(data.length-1))*(R-L)},py=function(v){return B-(v/ymax)*(B-T)};
        var g=ctx.createLinearGradient(0,T,0,B);g.addColorStop(0,'rgba(102,114,250,.45)');g.addColorStop(1,'rgba(102,114,250,0)');
        ctx.beginPath();ctx.moveTo(px(0),B);data.forEach(function(v,i){ctx.lineTo(px(i),py(v))});ctx.lineTo(px(data.length-1),B);ctx.closePath();ctx.fillStyle=g;ctx.fill();
        ctx.beginPath();data.forEach(function(v,i){i?ctx.lineTo(px(i),py(v)):ctx.moveTo(px(i),py(v))});ctx.strokeStyle='#C8CCFF';ctx.lineWidth=1.5;ctx.stroke();
        var lx=px(data.length-1),ly=py(data[data.length-1]);ctx.fillStyle='#fff';ctx.fillRect(lx-3,ly-3,6,6);ctx.textAlign='left';ctx.textBaseline='middle';ctx.fillText(data[data.length-1].toFixed(1),lx+8,ly)}
      size();draw();window.addEventListener('resize',function(){size();draw()});
      var bk=1148,sync=12,logEl=$('#log'),ids={BKP:1182,REP:604,SNP:2291,SEC:77,MON:3410,TCK:9135};
      var EV=[['BKP','Respaldo incremental completado','GYE','ok'],['REP','Réplica CUE → GYE sincronizada','CUE','ok'],['SNP','Snapshot de máquina virtual verificado','CUE','ok'],['MON','Chequeo de salud de almacenamiento sin alertas','GYE','ok'],['SEC','Política de firewall aplicada','CUE','ok'],['TCK','Solicitud atendida por soporte N2','—','ok'],['BKP','Prueba de restauración exitosa','CUE','ok']];
      function pad(n){return n<10?'0'+n:''+n}
      function now(){var d=new Date();return pad(d.getHours())+':'+pad(d.getMinutes())+':'+pad(d.getSeconds())}
      function addLog(){var e=EV[Math.floor(Math.random()*EV.length)];ids[e[0]]++;var li=document.createElement('li');li.innerHTML='<span class="num">'+now()+'</span><span class="id">'+e[0]+'-'+ids[e[0]]+'</span><span class="msg">'+e[1]+'</span><span class="tag ok">'+e[2]+'</span>';logEl.insertBefore(li,logEl.firstChild);while(logEl.children.length>4)logEl.removeChild(logEl.lastChild)}
      for(var j=0;j<4;j++)addLog();
      function tick(){$('#clock').textContent=now();if(!live||reduce)return;data.push(sample());data.shift();draw();var cur=data[data.length-1],avg=data.reduce(function(a,b){return a+b},0)/data.length;$('#lat-now').textContent=cur.toFixed(1);$('#lat-avg').textContent=avg.toFixed(1);
        sync++;if(sync>15||Math.random()<.08)sync=Math.floor(Math.random()*4);$('#sync').textContent='hace '+sync+' s';
        if(Math.random()<.35){bk+=1;$('#bk').textContent=nf(bk)}
        if(Math.random()<.3)addLog();
        if(Math.random()<.25)$$('.site .meter').forEach(function(m){var n=$('.num',m),v=clamp(parseInt(n.textContent,10)+Math.round((Math.random()-.5)*6),18,82);n.textContent=v+'%';$('.bar i',m).style.width=v+'%'})}
      tick();setInterval(tick,1000);
      onVisible(cv,function(v){live=v});
    })();


    /* ---------- Scroll-driven process ---------- */
    (function(){
      if(!$('#stages'))return;
      var stages=$$('#stages .stage'),items=$$('#rail-list li'),fill=$('#rail-fill'),wrap=$('#stages'),cur=0;
      function upd(){var r=wrap.getBoundingClientRect(),vh=window.innerHeight,p=clamp((vh*.55-r.top)/r.height,0,1);fill.style.height=(p*100)+'%';
        var a=0;stages.forEach(function(s,i){if(s.getBoundingClientRect().top<vh*.6)a=i});
        if(a!==cur){cur=a;stages.forEach(function(s,i){s.classList.toggle('on',i===a);if(i===a){s.classList.remove('play');void s.offsetWidth;s.classList.add('play')}});items.forEach(function(li,i){li.classList.toggle('on',i<=a)})}}
      window.addEventListener('scroll',upd,{passive:true});window.addEventListener('resize',upd);upd();
    })();


    /* ---------- Tools dashboard ---------- */
    (function(){
      if(!$('#tool-grid'))return;
      var ICON={
        cost:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
        backup:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>',
        sla:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 17l5-5 4 4 8-8"/><path d="M15 8h5v5"/></svg>',
        mig:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="7" height="16"/><rect x="14" y="4" width="7" height="16"/><path d="M8 12h8M13 9l3 3-3 3"/></svg>',
        dr:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3 4.5 6v5.5c0 4.6 3.1 8 7.5 9.5 4.4-1.5 7.5-4.9 7.5-9.5V6L12 3Z"/><path d="M12 8v5M12 16h.01"/></svg>'
      };
      function dur(sec){if(sec<1)return '< 1 s';var d=Math.floor(sec/86400),h=Math.floor(sec%86400/3600),m=Math.floor(sec%3600/60),s=Math.round(sec%60);if(d)return d+' d '+h+' h';if(h)return h+' h '+pad(m)+' min';if(m)return m+' min '+pad(s)+' s';return s+' s'}
      function pad(n){return n<10?'0'+n:''+n}
      function hours(h){return h<1?Math.round(h*60)+' min':h<48?nf(h,1)+' h':nf(h/24,1)+' días'}
      function hbars(rows,activeIdx,fmt){var mx=Math.max.apply(null,rows.map(function(r){return r[1]}))||1;return '<div class="hbars">'+rows.map(function(r,i){return '<div class="hb'+(i===activeIdx?' on':'')+'"><span class="n">'+r[0]+'</span><span class="t"><i style="width:'+Math.max(1.5,r[1]/mx*100)+'%"></i></span><span class="val">'+fmt(r[1])+'</span></div>'}).join('')+'</div>'}
      var LINKS=[100,300,500,1000,10000];
      var TOOLS=[
        {id:'inactividad',icon:'cost',name:'Costo de inactividad',sub:'Cuánto cuesta una hora sin sistemas',
         desc:'Estime el impacto económico de una interrupción de sus sistemas.',
         inputs:[{id:'rev',label:'Ingresos anuales (USD)',type:'number',min:0,step:50000,value:5000000},
                 {id:'hpw',label:'Horas de operación por semana',type:'range',min:40,max:168,step:1,value:60,fmt:function(v){return v+' h'}},
                 {id:'dep',label:'Ingresos que dependen de TI',type:'range',min:10,max:100,step:5,value:60,fmt:function(v){return v+'%'}},
                 {id:'ppl',label:'Personas afectadas',type:'number',min:0,step:5,value:80},
                 {id:'cph',label:'Costo por hora por persona (USD)',type:'number',min:0,step:1,value:6},
                 {id:'inc',label:'Duración del incidente',type:'range',min:1,max:72,step:1,value:4,fmt:function(v){return v+' h'}}],
         calc:function(v){var opH=v.hpw*52,revH=opH?v.rev/opH*(v.dep/100):0,prod=v.ppl*v.cph,ph=revH+prod,inc=ph*v.inc;
           var lv=[99,99.5,99.9,99.99].map(function(a){return [a+'%',(1-a/100)*8760*(v.hpw/168)*ph]});
           return {res:[{main:1,k:'Costo estimado por hora de inactividad',v:usd(ph),s:'Ingresos no percibidos + productividad'},{k:'Incidente de '+v.inc+' h',v:usd(inc)},{k:'Productividad perdida por hora',v:usd(prod)}],
             viz:'<h4>Exposición anual según nivel de disponibilidad</h4>'+hbars(lv,-1,usd)+'<p class="note" style="margin-top:12px">Considera la proporción de interrupciones que ocurre dentro de su horario de operación.</p>',
             sum:'Costo de inactividad estimado: '+usd(ph)+' por hora; un incidente de '+v.inc+' h representa '+usd(inc)+'.'}}},
        {id:'respaldo',icon:'backup',name:'Capacidad de respaldo',sub:'Almacenamiento y ventana de respaldo',
         desc:'Calcule la capacidad necesaria para sus respaldos y el tiempo de transferencia diario.',
         inputs:[{id:'tb',label:'Datos a proteger',type:'range',min:1,max:500,step:1,value:20,fmt:function(v){return v+' TB'}},
                 {id:'chg',label:'Cambio diario',type:'range',min:1,max:20,step:.5,value:3,fmt:function(v){return v+'%'}},
                 {id:'ret',label:'Retención',type:'range',min:7,max:365,step:1,value:30,fmt:function(v){return v+' días'}},
                 {id:'red',label:'Reducción (deduplicación + compresión)',type:'select',options:[[1,'1:1 · sin reducción'],[1.5,'1.5:1'],[2,'2:1'],[3,'3:1']],value:2},
                 {id:'gro',label:'Crecimiento anual de datos',type:'range',min:0,max:100,step:5,value:20,fmt:function(v){return v+'%'}},
                 {id:'mbps',label:'Enlace hacia el repositorio',type:'select',options:LINKS.map(function(l){return [l,l>=1000?l/1000+' Gbps':l+' Mbps']}),value:1000}],
         calc:function(v){var inc=v.tb*v.chg/100,cap=(v.tb+inc*(v.ret-1))/v.red,cap12=cap*(1+v.gro/100),bw=v.mbps*.7,win=inc/v.red*8e6/bw,seed=v.tb/v.red*8e6/bw;
           return {res:[{main:1,k:'Capacidad requerida a 12 meses',v:nf(cap12,1)+' TB',s:'Hoy: '+nf(cap,1)+' TB'},{k:'Cambio diario',v:nf(inc*1000,0)+' GB'},{k:'Ventana de respaldo diaria',v:dur(win)},{k:'Carga inicial completa',v:dur(seed)},{k:'Enlace efectivo (70%)',v:nf(bw,0)+' Mbps'}],
             viz:'<h4>Composición del almacenamiento (hoy)</h4>'+hbars([['Completo',v.tb/v.red],['Incrementales',inc*(v.ret-1)/v.red],['A 12 meses',cap12]],2,function(x){return nf(x,1)+' TB'}),
             sum:'Respaldo de '+v.tb+' TB con '+v.ret+' días de retención: capacidad estimada de '+nf(cap12,1)+' TB a 12 meses.'}}},
        {id:'sla',icon:'sla',name:'Disponibilidad y SLA',sub:'Tiempo de inactividad permitido',
         desc:'Traduzca un porcentaje de disponibilidad a tiempo de inactividad real.',
         inputs:[{id:'a',label:'Disponibilidad comprometida',type:'seg',options:[99,99.5,99.9,99.95,99.97,99.99,99.999],value:99.97,fmt:function(v){return v+'%'}}],
         calc:function(v){var y=(1-v.a/100)*365.25*86400;var P=[99,99.5,99.9,99.95,99.97,99.99,99.999];
           return {res:[{main:1,k:'Inactividad máxima por año',v:dur(y),s:'Con '+v.a+'% de disponibilidad'},{k:'Por mes',v:dur(y/12)},{k:'Por semana',v:dur(y/52.1775)},{k:'Por día',v:dur(y/365.25)}],
             viz:'<h4>Comparativo de niveles</h4><div style="overflow-x:auto"><table class="tbl"><thead><tr><th>Nivel</th><th>Por año</th><th>Por mes</th><th>Por semana</th></tr></thead><tbody>'+P.map(function(p){var yy=(1-p/100)*365.25*86400;return '<tr'+(p===v.a?' class="on"':'')+'><td>'+p+'%</td><td>'+dur(yy)+'</td><td>'+dur(yy/12)+'</td><td>'+dur(yy/52.1775)+'</td></tr>'}).join('')+'</tbody></table></div>',
             sum:'Nivel de servicio de interés: '+v.a+'% de disponibilidad ('+dur(y)+' de inactividad máxima al año).'}}},
        {id:'migracion',icon:'mig',name:'Tiempo de migración',sub:'Mover datos a la nube o a otro sitio',
         desc:'Estime cuánto tarda transferir sus datos según el enlace y las ventanas disponibles.',
         inputs:[{id:'tb',label:'Volumen a migrar',type:'range',min:.5,max:200,step:.5,value:15,fmt:function(v){return v+' TB'}},
                 {id:'mbps',label:'Enlace disponible',type:'select',options:LINKS.map(function(l){return [l,l>=1000?l/1000+' Gbps':l+' Mbps']}),value:500},
                 {id:'eff',label:'Eficiencia del enlace',type:'range',min:40,max:95,step:5,value:70,fmt:function(v){return v+'%'}},
                 {id:'win',label:'Horas de ventana por día',type:'range',min:1,max:24,step:1,value:8,fmt:function(v){return v+' h'}}],
         calc:function(v){var h=function(m){return v.tb*8e6/(m*v.eff/100)/3600},hh=h(v.mbps),days=Math.ceil(hh/v.win);
           return {res:[{main:1,k:'Transferencia continua',v:hours(hh),s:'Con '+v.eff+'% de eficiencia'},{k:'Días con ventana de '+v.win+' h',v:days+(days===1?' día':' días')},{k:'Volumen',v:nf(v.tb,1)+' TB'}],
             viz:'<h4>Comparativo por tipo de enlace (horas continuas)</h4>'+hbars(LINKS.map(function(l){return [l>=1000?l/1000+' Gbps':l+' Mbps',h(l)]}),LINKS.indexOf(v.mbps),hours),
             sum:'Migración de '+v.tb+' TB por enlace de '+v.mbps+' Mbps: '+hours(hh)+' de transferencia continua ('+days+' días con ventanas de '+v.win+' h).'}}},
        {id:'continuidad',icon:'dr',name:'Nivel de continuidad',sub:'Qué protección necesita según RTO y RPO',
         desc:'Indique cuánto tiempo puede estar detenido y cuántos datos puede perder. Le sugerimos el nivel de protección.',
         inputs:[{id:'rto',label:'Tiempo máximo detenido (RTO)',type:'select',options:[[0.25,'15 minutos'],[1,'1 hora'],[4,'4 horas'],[24,'24 horas'],[72,'72 horas']],value:4},
                 {id:'rpo',label:'Pérdida de datos aceptable (RPO)',type:'select',options:[[0,'Prácticamente cero'],[0.25,'15 minutos'],[1,'1 hora'],[24,'24 horas']],value:1},
                 {id:'srv',label:'Servidores críticos',type:'number',min:1,step:1,value:10},
                 {id:'imp',label:'Impacto de una interrupción',type:'select',options:[[1,'Bajo'],[2,'Medio'],[3,'Alto'],[4,'Crítico']],value:3}],
         calc:function(v){var tier=(v.rto<=.25||v.rpo===0||(v.imp===4&&v.rto<=1))?2:(v.rto<=4||v.rpo<=1)?1:0;
           var T=[['Respaldo gestionado','Backup en CoreOnCloud con retención y pruebas de restauración.','RTO en horas o días'],['DRaaS','Réplica en CoreOnCloud y recuperación orquestada en el sitio alterno.','RTO de 1 a 4 horas'],['Alta disponibilidad','Réplica continua entre CUE y GYE con conmutación automática.','RTO en minutos']];
           var names=['Respaldo gestionado','DRaaS','Alta disponibilidad'];
           return {res:[{main:1,k:'Nivel sugerido',v:names[tier],s:T[tier][1]},{k:'Servidores a proteger',v:nf(v.srv)},{k:'Objetivo',v:'RTO '+lab(v.rto)+' · RPO '+(v.rpo===0?'≈ 0':lab(v.rpo))}],
             viz:'<h4>Niveles de protección</h4><div class="tiers">'+T.map(function(t,i){return '<div class="tier'+(i===tier?' on':'')+'"><span class="tag">'+(i===tier?'Sugerido':'Nivel '+(i+1))+'</span><b>'+t[0]+'</b><span>'+t[2]+'</span></div>'}).join('')+'</div>',
             sum:'Nivel de continuidad sugerido: '+names[tier]+' para '+v.srv+' servidores críticos (RTO '+lab(v.rto)+', RPO '+(v.rpo===0?'≈ 0':lab(v.rpo))+').'}}}
      ];
      function lab(h){return h<1?Math.round(h*60)+' min':h+' h'}
      var grid=$('#tool-grid'),panel=$('#tool'),drawer=$('#drawer'),state={},active=0,opener=null;
      var GO='<span class="go">Abrir calculadora <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></span>';
      TOOLS.forEach(function(t,i){state[t.id]={};t.inputs.forEach(function(inp){state[t.id][inp.id]=inp.value});
        var ex=t.calc(state[t.id]).res[0];
        var b=document.createElement('button');b.type='button';b.className='tcard';b.setAttribute('aria-haspopup','dialog');
        b.innerHTML='<span class="ti">'+ICON[t.icon]+'</span><b>'+t.name+'</b><span class="d">'+t.desc+'</span><span class="peek">Ejemplo: <em>'+ex.v+'</em></span>'+GO;
        b.addEventListener('click',function(){open(i,b)});grid.appendChild(b)});
      var alt=document.createElement('a');alt.href=ROOT+'contacto.html';alt.setAttribute('data-msg','Me interesa un cálculo a medida para mi organización.');alt.className='tcard alt';
      alt.innerHTML='<span class="ti"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg></span><b>Cálculo a medida</b><span class="d">Un especialista dimensiona su caso con sus datos reales.</span>'+GO.replace('Abrir calculadora','Hablar con un especialista');
      grid.appendChild(alt);
      function open(i,from){opener=from||document.activeElement;select(i);drawer.hidden=false;doc.classList.add('lock');requestAnimationFrame(function(){requestAnimationFrame(function(){drawer.classList.add('open')})});setTimeout(function(){$('.x',drawer).focus()},reduce?0:120)}
      function close(){if(drawer.hidden)return;drawer.classList.remove('open');doc.classList.remove('lock');setTimeout(function(){drawer.hidden=true},reduce?0:450);if(opener&&opener.focus)opener.focus({preventScroll:true})}
      window.__closeDrawer=close;
      drawer.addEventListener('click',function(e){if(e.target.closest('[data-close]'))close()});
      drawer.addEventListener('keydown',function(e){if(e.key==='Escape'){e.stopPropagation();close()}if(e.key==='Tab'){var f=$$('button,input,select,textarea,a[href]',drawer).filter(function(x){return x.offsetParent!==null});if(!f.length)return;var first=f[0],last=f[f.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
      $('#d-prev').addEventListener('click',function(){select((active-1+TOOLS.length)%TOOLS.length);$('.drawer-b').scrollTop=0});
      $('#d-next').addEventListener('click',function(){select((active+1)%TOOLS.length);$('.drawer-b').scrollTop=0});
      $$('[data-tool]').forEach(function(a){if(a.closest('#cmdk'))return;a.addEventListener('click',function(e){var i=TOOLS.map(function(t){return t.id}).indexOf(a.dataset.tool);if(i<0)return;e.preventDefault();open(i,a)})});
      function control(t,inp){var v=state[t.id][inp.id],id='t-'+t.id+'-'+inp.id,h='<div class="ctl">';
        if(inp.type==='range'){h+='<div class="ctl-h"><label for="'+id+'">'+inp.label+'</label><output id="'+id+'-o" for="'+id+'">'+inp.fmt(v)+'</output></div><input type="range" id="'+id+'" data-k="'+inp.id+'" min="'+inp.min+'" max="'+inp.max+'" step="'+inp.step+'" value="'+v+'">'}
        else if(inp.type==='number'){h+='<label for="'+id+'">'+inp.label+'</label><input type="text" inputmode="numeric" autocomplete="off" id="'+id+'" data-k="'+inp.id+'" data-num="1" value="'+nf(v)+'">'}
        else if(inp.type==='select'){h+='<label for="'+id+'">'+inp.label+'</label><select id="'+id+'" data-k="'+inp.id+'">'+inp.options.map(function(o){return '<option value="'+o[0]+'"'+(o[0]===v?' selected':'')+'>'+o[1]+'</option>'}).join('')+'</select>'}
        else if(inp.type==='seg'){h+='<span class="lbl" id="'+id+'">'+inp.label+'</span><div class="seg" role="group" aria-labelledby="'+id+'">'+inp.options.map(function(o){return '<button type="button" data-k="'+inp.id+'" data-v="'+o+'" aria-pressed="'+(o===v)+'">'+inp.fmt(o)+'</button>'}).join('')+'</div>'}
        return h+'</div>'}
      function setP(r){r.style.setProperty('--p',((r.value-r.min)/(r.max-r.min)*100)+'%')}
      function select(i){active=i;var t=TOOLS[i];$('#drawer-title').textContent=t.name;$('#drawer-ico').innerHTML=ICON[t.icon];
        var pv=TOOLS[(i-1+TOOLS.length)%TOOLS.length],nx=TOOLS[(i+1)%TOOLS.length];$('#d-prev').textContent='← '+pv.name;$('#d-next').textContent=nx.name+' →';
        panel.innerHTML='<div class="tool-in"><p class="desc" style="margin:0">'+t.desc+'</p>'+t.inputs.map(function(inp){return control(t,inp)}).join('')+'<button type="button" class="reset" data-reset>Restablecer valores</button></div><div class="tool-out" id="out"></div>';
        $$('input[type=range]',panel).forEach(setP);
        panel.oninput=function(e){var el=e.target,k=el.dataset.k;if(!k)return;var inp=t.inputs.filter(function(x){return x.id===k})[0];var val=parseFloat(el.dataset.num?el.value.replace(/[^0-9.]/g,''):el.value);if(isNaN(val))val=0;state[t.id][k]=val;if(e.type==='change'&&el.dataset.num)el.value=nf(val);if(el.type==='range'){setP(el);$('#'+el.id+'-o').textContent=inp.fmt(val)}compute()};
        panel.onchange=panel.oninput;
        panel.onclick=function(e){var b=e.target.closest('.seg button');if(b){state[t.id][b.dataset.k]=parseFloat(b.dataset.v);$$('.seg button',panel).forEach(function(x){x.setAttribute('aria-pressed',String(x===b))});compute()}var q=e.target.closest('[data-quote]');if(q){quote()}if(e.target.closest('[data-reset]')){t.inputs.forEach(function(inp){state[t.id][inp.id]=inp.value});select(active)}};
        compute()}
      var last='';
      function compute(){var t=TOOLS[active],r=t.calc(state[t.id]);last=r.sum;var m=r.res[0];$('#dsum').innerHTML='<span>'+m.k+'</span><b>'+m.v+'</b>';
        $('#out').innerHTML='<div class="res">'+r.res.map(function(x){return '<div'+(x.main?' class="main"':'')+'><span class="k">'+x.k+'</span><span class="v">'+x.v+'</span>'+(x.s?'<span class="s">'+x.s+'</span>':'')+'</div>'}).join('')+'</div><div class="viz">'+r.viz+'</div><div class="tool-act"><button type="button" class="btn" data-quote>Solicitar evaluación con estos datos <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></button><span class="note">Resultado orientativo.</span></div>'}
      function quote(){close();var msg='['+TOOLS[active].name+'] '+last;if(!toContact(msg))location.href=ROOT+'contacto.html'}
      function fromHash(){var i=TOOLS.map(function(t){return t.id}).indexOf(location.hash.slice(1));if(i>=0&&drawer.hidden)open(i,grid.children[i])}
      fromHash();window.addEventListener('hashchange',fromHash);
      window.__tools=TOOLS.map(function(t){return {id:t.id,name:t.name,desc:t.desc}});
    })();

  /* ---------- Home: exploded infrastructure stack ---------- */
  (function(){
    var sec=$('#capas'),cv=$('#stack-cv');if(!sec||!cv)return;
    var ctx=cv.getContext('2d'),steps=$$('.stack-steps li',sec),W,H,run=false,t0=performance.now(),p=0,act=-1,cur=-1;
    var NAMES=['Conectividad','Infraestructura','Datos','Seguridad','CoreOnCloud'],prog=$$('.stack-prog i',sec);
    if(reduce)sec.classList.add('static');
    var mq=window.matchMedia('(max-width:900px)');
    function size(){var dpr=Math.min(2,window.devicePixelRatio||1),r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}
    function ss(a,b,x){x=clamp((x-a)/(b-a),0,1);return x*x*(3-2*x)}
    function progress(){var r=sec.getBoundingClientRect(),span=r.height-window.innerHeight;return span>0?clamp(-r.top/span,0,1):0}
    var manual=-1;
    steps.forEach(function(li,i){var h=li.querySelector('h3');if(h)h.innerHTML='<button type="button">'+h.textContent+'</button>';li.addEventListener('click',function(e){if(e.target.closest('a'))return;if(mq.matches||reduce){manual=i;steps.forEach(function(s,j){s.classList.toggle('on',j===i)});return}var r=sec.getBoundingClientRect(),span=r.height-window.innerHeight,top=r.top+window.scrollY,target=top+span*(.12+((i+.5)/5)*.82);window.scrollTo({top:target,behavior:'smooth'})})});
    function frame(now){var t=(now-t0)/1000,small=mq.matches;if(!reduce)p=progress();
      var e=reduce||small?1:ss(0,.14,p),a=reduce?(manual>=0?manual+.5:-1):small?(manual>=0?manual+.5:(t*.45)%5):clamp((p-.12)/.82*5,0,4.999);var ai=reduce?-1:Math.floor(a);
      if(!small&&ai!==cur){cur=ai;steps.forEach(function(s,i){s.classList.toggle('on',i===ai)});prog.forEach(function(d,i){d.classList.toggle('on',i<=ai)})}
      ctx.clearRect(0,0,W,H);
      var w=Math.min(W*(W<700?.7:.66),470),d=w*.5,th=10,cx=W*(W<700?.46:.42),cy=H*.52,gap=(th+5)+(Math.min(H*.15,96)-(th+5))*e;
      function iso(y,u,v){return [cx+(u-v)*w/4,y+(u+v)*d/4]}
      for(var i=0;i<5;i++){var on=reduce?.55:Math.max(0,1-Math.abs(a-(i+.5))*1.1),y=cy+(2-i)*gap-(on*12);
        // sides
        var T=iso(y,-1,-1),R=iso(y,1,-1),B=iso(y,1,1),L=iso(y,-1,1);
        ctx.fillStyle='rgba(0,4,64,.95)';ctx.beginPath();ctx.moveTo(L[0],L[1]);ctx.lineTo(B[0],B[1]);ctx.lineTo(B[0],B[1]+th);ctx.lineTo(L[0],L[1]+th);ctx.closePath();ctx.fill();
        ctx.fillStyle='rgba(11,18,112,.95)';ctx.beginPath();ctx.moveTo(B[0],B[1]);ctx.lineTo(R[0],R[1]);ctx.lineTo(R[0],R[1]+th);ctx.lineTo(B[0],B[1]+th);ctx.closePath();ctx.fill();
        // top
        ctx.beginPath();ctx.moveTo(T[0],T[1]);ctx.lineTo(R[0],R[1]);ctx.lineTo(B[0],B[1]);ctx.lineTo(L[0],L[1]);ctx.closePath();
        var fo=window.__failover,col=on>.5?'43,63,232':'20,28,122';if(fo==='down'&&i===1)col='218,30,40';if(fo==='over'&&i===4)col='25,128,56';if(fo==='down'&&i===4)col='241,194,27';
        ctx.fillStyle='rgba('+col+','+(.55+.4*on).toFixed(3)+')';ctx.fill();
        ctx.strokeStyle='rgba(200,204,255,'+(.3+.6*on).toFixed(3)+')';ctx.lineWidth=1;ctx.stroke();
        ctx.save();ctx.globalAlpha=.35+.65*Math.max(on,e*.5);detail(i,y,t,iso,w,d);ctx.restore();
        // label
        if(e>.3&&R[0]+34+90<W){ctx.globalAlpha=clamp((e-.3)/.4,0,1);ctx.strokeStyle='rgba(200,204,255,.35)';ctx.beginPath();ctx.moveTo(R[0]+6,R[1]);ctx.lineTo(R[0]+28,R[1]);ctx.stroke();
          ctx.font=(on>.5?'600 ':'500 ')+(W<700?'11':'12')+'px "IBM Plex Mono",monospace';ctx.fillStyle=on>.5?'#fff':'rgba(157,165,255,.85)';ctx.textAlign='left';ctx.textBaseline='middle';
          ctx.fillText(('0'+(i+1))+' '+NAMES[i].toUpperCase(),R[0]+34,R[1]);ctx.globalAlpha=1}
      }
      // data rising through the layers
      if(e>.5&&!reduce){for(var k=0;k<6;k++){var ph=((t*.35+k/6)%1),yy=cy+2*gap-ph*4*gap-th,xx=cx+Math.sin(k*1.7)*w*.08;ctx.fillStyle='rgba(255,255,255,'+(Math.sin(ph*Math.PI)).toFixed(3)+')';ctx.fillRect(xx-2,yy-2,4,4)}}
      if(run&&!reduce)requestAnimationFrame(frame)}
    function detail(i,y,t,iso,w,d){ctx.lineWidth=1;
      if(i===0){var g=[-.6,-.2,.2,.6];ctx.strokeStyle='rgba(157,165,255,.6)';g.forEach(function(u){ctx.beginPath();var a=iso(y,u,-.6),b=iso(y,u,.6);ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke();a=iso(y,-.6,u);b=iso(y,.6,u);ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke()});
        g.forEach(function(u){g.forEach(function(v){var q=iso(y,u,v);ctx.fillStyle='#C8CCFF';ctx.fillRect(q[0]-1.5,q[1]-1.5,3,3)})});
        var s=(t*.5)%1,lane=Math.floor(t*.5)%4,q=iso(y,-.6+1.2*s,g[lane]);ctx.fillStyle='#fff';ctx.fillRect(q[0]-2,q[1]-2,4,4)}
      if(i===1){[[-.45,-.3],[0,-.3],[.45,-.3],[-.45,.3],[0,.3],[.45,.3]].forEach(function(c,k){box(y,c[0],c[1],.16,.22,14,iso,k,t)})}
      if(i===2){[[-.4,0],[0,0],[.4,0]].forEach(function(c,k){var q=iso(y,c[0],c[1]),rx=w*.07,ry=rx*.5;for(var s2=0;s2<3;s2++){var yy=q[1]-s2*7;ctx.beginPath();ctx.ellipse(q[0],yy,rx,ry,0,0,Math.PI*2);ctx.fillStyle=s2===2?'rgba(200,204,255,.9)':'rgba(102,114,250,.8)';ctx.fill();ctx.strokeStyle='rgba(0,4,64,.6)';ctx.stroke()}})}
      if(i===3){ctx.save();ctx.setLineDash([5,5]);ctx.lineDashOffset=-t*16;ctx.strokeStyle='rgba(255,255,255,.85)';ctx.beginPath();[[-.8,-.8],[.8,-.8],[.8,.8],[-.8,.8]].forEach(function(c,k){var q=iso(y-8,c[0],c[1]);k?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1])});ctx.closePath();ctx.stroke();ctx.restore();
        var ph=(t*.6)%1,q=iso(y,1.3-ph*.5,-.2);ctx.fillStyle='rgba(218,30,40,'+(1-ph).toFixed(3)+')';ctx.fillRect(q[0]-2.5,q[1]-2.5,5,5)}
      if(i===4){var A=iso(y,-.45,.1),B2=iso(y,.45,-.1);ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(A[0],A[1]-4);ctx.quadraticCurveTo((A[0]+B2[0])/2,Math.min(A[1],B2[1])-26,B2[0],B2[1]-4);ctx.stroke();
        [A,B2].forEach(function(q,k){ctx.fillStyle='#fff';ctx.fillRect(q[0]-5,q[1]-9,10,10);ctx.font='500 10px "IBM Plex Mono",monospace';ctx.fillStyle='#C8CCFF';ctx.textAlign='center';ctx.fillText(k?'GYE':'CUE',q[0],q[1]+10)});
        var s=(t*.4)%1,u=1-s,mx=(A[0]+B2[0])/2,my=Math.min(A[1],B2[1])-26,px=u*u*A[0]+2*u*s*mx+s*s*B2[0],py=u*u*(A[1]-4)+2*u*s*my+s*s*(B2[1]-4);ctx.fillStyle='#9DA5FF';ctx.fillRect(px-2,py-2,4,4)}}
    function box(y,u,v,su,sv,h,iso,k,t){var p1=iso(y-h,u-su,v-sv),p2=iso(y-h,u+su,v-sv),p3=iso(y-h,u+su,v+sv),p4=iso(y-h,u-su,v+sv),b3=[p3[0],p3[1]+h],b4=[p4[0],p4[1]+h],b2=[p2[0],p2[1]+h];
      ctx.fillStyle='rgba(0,4,64,.9)';ctx.beginPath();ctx.moveTo(p4[0],p4[1]);ctx.lineTo(p3[0],p3[1]);ctx.lineTo(b3[0],b3[1]);ctx.lineTo(b4[0],b4[1]);ctx.closePath();ctx.fill();
      ctx.fillStyle='rgba(20,28,122,.95)';ctx.beginPath();ctx.moveTo(p3[0],p3[1]);ctx.lineTo(p2[0],p2[1]);ctx.lineTo(b2[0],b2[1]);ctx.lineTo(b3[0],b3[1]);ctx.closePath();ctx.fill();
      ctx.fillStyle='rgba(157,165,255,.9)';ctx.beginPath();ctx.moveTo(p1[0],p1[1]);ctx.lineTo(p2[0],p2[1]);ctx.lineTo(p3[0],p3[1]);ctx.lineTo(p4[0],p4[1]);ctx.closePath();ctx.fill();
      var on=Math.sin(t*3+k*1.3)>0;ctx.fillStyle=on?'#42BE65':'rgba(66,190,101,.3)';ctx.fillRect((p4[0]+b4[0])/2+3,(p4[1]+b4[1])/2-1,3,3)}
    size();requestAnimationFrame(frame);
    window.addEventListener('resize',function(){size();if(reduce)requestAnimationFrame(frame)});
    onVisible(sec,function(v){var was=run;run=v;if(v&&!was&&!reduce)requestAnimationFrame(frame)});
  })();


  /* ---------- Home: failover simulator (the switch) ---------- */
  (function(){
    var sim=$('#sim');if(!sim)return;
    var sw=$('#sim-switch'),txt=$('#sw-txt'),msg=$('#sim-msg'),main=$('#sim-main'),cloud=$('#sim-cloud'),mst=$('#sim-main-st'),cst=$('#sim-cloud-st'),note=$('#sim-note'),sync=$('#sim-sync'),clock=$('#sim-clock');
    var tpm=$('#sim-tpm'),usr=$('#sim-usr'),sys=$('#sim-sys'),cv=$('#sim-spark'),ctx=cv.getContext('2d');
    var SIMD=window.__SIM||{},cfg=SIMD.general||SIMD.coop||['SU ORGANIZACIÓN','Operaciones por minuto','Usuarios conectados',1248,312],base=[cfg[3],cfg[4]];
    var state='on',data=[],W,H,vTpm=base[0],vUsr=base[1],t0=Date.now(),timer=null,run=true,hint=true;
    window.__failover='on';
    var favEl=document.querySelector('link[rel="icon"]'),favOk=favEl&&favEl.getAttribute('href'),favRed="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23DA1E28'/%3E%3Cpath d='M21.5 10.2A8 8 0 1 0 21.5 21.8' fill='none' stroke='%23ffffff' stroke-width='4'/%3E%3C/svg%3E";
    function fav(red){if(favEl)favEl.setAttribute('href',red?favRed:favOk)}
    function applySec(k){cfg=SIMD[k]||cfg;base=[cfg[3],cfg[4]];$('#sim-org').textContent='· '+cfg[0];$('#sim-l1').textContent=cfg[1];$('#sim-l2').textContent=cfg[2];if(state!=='down'){vTpm=base[0];vUsr=base[1];tpm.textContent=nf(vTpm);usr.textContent=nf(vUsr)}var cta=$('#hero-cta');if(cta)cta.setAttribute('data-msg','Sector: '+($$('.sim-sec button[aria-checked="true"]')[0]||{}).textContent+'. ')}
    $$('.sim-sec button').forEach(function(b){b.addEventListener('click',function(){$$('.sim-sec button').forEach(function(x){x.setAttribute('aria-checked',String(x===b))});applySec(b.dataset.sec)})});
    for(var i=0;i<48;i++)data.push(.5+Math.random()*.3);
    function size(){var dpr=Math.min(2,window.devicePixelRatio||1),r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);draw()}
    function draw(){ctx.clearRect(0,0,W,H);var n=data.length,px=function(i){return i/(n-1)*W},py=function(v){return H-4-v*(H-8)};
      var g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,state==='on'?'rgba(102,114,250,.45)':state==='over'?'rgba(66,190,101,.4)':'rgba(218,30,40,.25)');g.addColorStop(1,'rgba(0,0,0,0)');
      ctx.beginPath();ctx.moveTo(0,H);data.forEach(function(v,i){ctx.lineTo(px(i),py(v))});ctx.lineTo(W,H);ctx.closePath();ctx.fillStyle=g;ctx.fill();
      ctx.beginPath();data.forEach(function(v,i){i?ctx.lineTo(px(i),py(v)):ctx.moveTo(px(i),py(v))});ctx.strokeStyle=state==='on'?'#C8CCFF':state==='over'?'#42BE65':'#DA1E28';ctx.lineWidth=1.5;ctx.stroke()}
    function say(h){msg.innerHTML=h;msg.classList.remove('swap');void msg.offsetWidth;msg.classList.add('swap')}
    function pad(n){return n<10?'0'+n:''+n}
    function tick(){if(!run)return;var el=Math.floor((Date.now()-t0)/1000),h=10+Math.floor(el/3600),m=Math.floor(el/60)%60,sct=el%60;if(clock)clock.textContent=pad(h)+':'+pad(m)+':'+pad(sct);
      if(state==='down'){data.push(0);data.shift();draw();return}
      vTpm=clamp(vTpm+Math.round((Math.random()-.5)*base[0]*.05),base[0]*.72,base[0]*1.28);vUsr=clamp(vUsr+Math.round((Math.random()-.5)*Math.max(2,base[1]*.03)),base[1]*.85,base[1]*1.15);tpm.textContent=nf(vTpm);usr.textContent=nf(vUsr);
      data.push(clamp((vTpm-base[0]*.72)/(base[0]*.56)*.8+.1+(Math.random()-.5)*.08,.05,.95));data.shift();draw();
      if(state==='on'){var sv=parseInt(sync.textContent,10)+1;if(sv>20)sv=1;sync.textContent=sv}}
    setInterval(tick,1000);
    function off(){fav(true);state='down';hint=false;window.__failover='down';sim.classList.add('used');sim.classList.add('down');sim.classList.remove('over');main.classList.add('off');mst.textContent='Caída';mst.className='tag err';sys.textContent='0 / 12';tpm.textContent='0';usr.textContent='0';sw.setAttribute('aria-pressed','false');txt.textContent='Restaurar sitio principal';$('.sw-lbl small').textContent='Sitio principal · apagado';sw.setAttribute('aria-label','Interruptor del sitio principal: apagado. Pulse para restaurar.');
      say('<b>Sitio principal sin servicio.</b> CoreOnCloud está tomando el relevo…');var t1=Date.now();
      timer=setTimeout(function(){if(state!=='down')return;fav(false);state='over';window.__failover='over';sim.classList.remove('down');sim.classList.add('over');cst.textContent='Activo';cst.className='tag ok';cloud.classList.add('on');note.innerHTML='Sus sistemas ahora funcionan desde Cuenca y Guayaquil. Sus usuarios siguen trabajando.';
        sys.textContent='12 / 12';var el=((Date.now()-t1)/1000).toFixed(1);var secName=($$('.sim-sec button[aria-checked="true"]')[0]||{}).textContent||'mi organización';say('<b>Recuperado en <span class="t">'+el+' s</span>.</b> Sus usuarios siguieron trabajando sin notarlo.<br><span class="sim-acts"><a class="sim-go" href="'+ROOT+'contacto.html" data-msg="Probé el simulador. Quiero esto para '+secName.toLowerCase()+'.">Quiero esto para '+secName.toLowerCase()+' →</a><button type="button" class="sim-alt" id="sim-alt">¿Y sin CoreOnCloud?</button></span>');tick()},reduce?300:3200)}
    var lossT=null,lossStart=0,PH=1442;
    function altOff(){fav(true);clearTimeout(timer);state='down';window.__failover='down';sim.classList.remove('over');sim.classList.add('down','alt');cst.textContent='Sin contratar';cst.className='tag';cloud.classList.remove('on');note.innerHTML='Sin réplica no hay a dónde conmutar. Cada minuto detenido cuesta dinero.';sys.textContent='0 / 12';tpm.textContent='0';usr.textContent='0';main.classList.add('off');mst.textContent='Caída';mst.className='tag err';
      lossStart=Date.now();say('<b>Sin CoreOnCloud.</b> Pérdida estimada: <span class="t loss" id="sim-loss">USD 0</span> <small>(a USD '+nf(PH)+' por hora, según la calculadora · tiempo acelerado: 1 s = 1 min)</small><br><span class="sim-acts"><button type="button" class="sim-alt" id="sim-stop">Detener y volver a CoreOnCloud</button><a class="sim-go" href="'+ROOT+'herramientas.html#inactividad">Calcular con mis cifras →</a></span>');
      lossT=setInterval(function(){var el=$('#sim-loss');if(!el){clearInterval(lossT);return}var h=(Date.now()-lossStart)/3600000*60;el.textContent='USD '+nf(Math.round(PH*h))},200)}
    msg.addEventListener('click',function(e){if(e.target.closest('#sim-alt')){altOff()}else if(e.target.closest('#sim-stop')){clearInterval(lossT);sim.classList.remove('alt');on();say('<b>De vuelta con CoreOnCloud.</b> La diferencia entre perder minutos y perder el día.')}});
    function on(){fav(false);clearTimeout(timer);clearInterval(lossT);sim.classList.remove('alt');state='on';window.__failover='on';sim.classList.remove('down','over');main.classList.remove('off');mst.textContent='Operando';mst.className='tag ok';cst.textContent='En espera';cst.className='tag';cloud.classList.remove('on');sys.textContent='12 / 12';sync.textContent='2';
      note.innerHTML='Copia sincronizada hace <span class="num" id="sim-sync">2</span> s. Lista para tomar el relevo.';sync=$('#sim-sync');sw.setAttribute('aria-pressed','true');txt.textContent='Probar una falla';$('.sw-lbl small').textContent='Sitio principal · encendido';sw.setAttribute('aria-label','Interruptor del sitio principal: encendido. Pulse para simular una falla.');
      say('<b>Sitio principal restaurado.</b> La réplica vuelve a sincronizarse. Pruébelo las veces que quiera.');tick()}
    var snd=$('#sim-snd'),actx=null;
    function click(down){if(!snd||snd.getAttribute('aria-pressed')!=='true')return;try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();var t=actx.currentTime,o=actx.createOscillator(),g=actx.createGain(),f=actx.createBiquadFilter();f.type='lowpass';f.frequency.value=down?900:1400;o.type='square';o.frequency.setValueAtTime(down?180:260,t);o.frequency.exponentialRampToValueAtTime(down?60:120,t+.06);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.25,t+.004);g.gain.exponentialRampToValueAtTime(.0001,t+.09);o.connect(f);f.connect(g);g.connect(actx.destination);o.start(t);o.stop(t+.1)}catch(e){}}
    if(snd)snd.addEventListener('click',function(){var on=snd.getAttribute('aria-pressed')!=='true';snd.setAttribute('aria-pressed',String(on));snd.setAttribute('aria-label',(on?'Desactivar':'Activar')+' sonido del interruptor');if(on){click(true)}});
    sw.addEventListener('click',function(){click(state==='on');state==='on'?off():on()});
    var touched=false,seen=false;['pointerdown','keydown','wheel','touchstart'].forEach(function(ev){document.addEventListener(ev,function(){touched=true},{passive:true,once:true})});
    onVisible(sim,function(v){if(v)seen=true});
    if(!reduce)setTimeout(function(){if(touched||!seen||state!=='on'||document.hidden)return;sim.classList.add('auto');say('<span class="hint">Demostración automática: apagamos el sitio principal por usted…</span>');setTimeout(function(){if(touched)return;off();setTimeout(function(){if(state!=='on'&&!touched){on();say('<span class="hint">Eso fue una demostración. Pruébelo usted: apague el sitio principal.</span>');sim.classList.remove('auto')}},6500)},1400)},8000);
    size();window.addEventListener('resize',size);
    onVisible(sim,function(v){run=v});
  })();

  /* ---------- Home: RTO picker ---------- */
  (function(){
    var box=$('.rto');if(!box)return;var rows=$$('.rto-row',box);
    rows.forEach(function(r){r.addEventListener('click',function(){rows.forEach(function(x){x.setAttribute('aria-pressed',String(x===r))})})});
    if('IntersectionObserver' in window&&!reduce&&box.getBoundingClientRect().top>window.innerHeight){box.classList.add('arm');var o=new IntersectionObserver(function(es){if(es[0].isIntersecting){box.classList.add('in');o.disconnect()}},{threshold:.4});o.observe(box)}
  })();

  /* ---------- Inner pages: hero scenes ---------- */
  (function(){
    var box=$('.hero-vis.scene');if(!box)return;var cv=box.querySelector('canvas'),ctx=cv.getContext('2d'),W,H,run=true,t0=performance.now(),kind=box.dataset.scene;
    var C={line:'rgba(200,204,255,.55)',soft:'rgba(157,165,255,.35)',w:'#fff',g:'#42BE65',r:'#DA1E28',b:'#9DA5FF'};
    function size(){var dpr=Math.min(2,window.devicePixelRatio||1),r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}
    function mono(px){ctx.font='500 '+px+'px "IBM Plex Mono",monospace'}
    function sq(x,y,s,c){ctx.fillStyle=c;ctx.fillRect(x-s/2,y-s/2,s,s)}
    var S={
      backup:function(t){var cols=7,rows=5,cw=W*.72/cols,ch=H*.5/rows,x0=W*.14,y0=H*.22;mono(11);ctx.fillStyle=C.b;ctx.textAlign='left';ctx.fillText('CALENDARIO DE COPIAS · VERIFICADAS',x0,y0-16);
        var n=cols*rows,k=Math.floor(t*2.2)%(n+8);for(var i=0;i<n;i++){var x=x0+(i%cols)*cw,y=y0+Math.floor(i/cols)*ch;ctx.strokeStyle=C.soft;ctx.strokeRect(x+3,y+3,cw-6,ch-6);if(i<k){var ok=(i%9!==4);ctx.fillStyle=ok?'rgba(66,190,101,.9)':'rgba(241,194,27,.9)';ctx.fillRect(x+3,y+3,cw-6,ch-6);ctx.strokeStyle=C.w;ctx.lineWidth=1.5;ctx.beginPath();if(ok){ctx.moveTo(x+cw*.3,y+ch*.52);ctx.lineTo(x+cw*.45,y+ch*.68);ctx.lineTo(x+cw*.72,y+ch*.34)}else{ctx.moveTo(x+cw*.5,y+ch*.3);ctx.lineTo(x+cw*.5,y+ch*.55)}ctx.stroke();ctx.lineWidth=1}}
        var ph=(t*.5)%1,ax=x0,bx=x0+W*.72,yy=y0+H*.5+30;ctx.strokeStyle=C.line;ctx.setLineDash([4,6]);ctx.beginPath();ctx.moveTo(ax,yy);ctx.lineTo(bx,yy);ctx.stroke();ctx.setLineDash([]);sq(ax+(bx-ax)*ph,yy,6,C.w);mono(11);ctx.fillStyle=C.b;ctx.fillText('SU SITIO',ax,yy+20);ctx.textAlign='right';ctx.fillText('CoreOnCloud',bx,yy+20)},
      security:function(t){var cx=W*.62,cy=H*.5,R=Math.min(W,H)*.22;ctx.save();ctx.setLineDash([6,6]);ctx.lineDashOffset=-t*18;ctx.strokeStyle=C.w;ctx.lineWidth=1.5;ctx.strokeRect(cx-R,cy-R,R*2,R*2);ctx.restore();ctx.lineWidth=1;
        mono(11);ctx.fillStyle=C.b;ctx.textAlign='center';ctx.fillText('FIREWALL',cx,cy-R-12);for(var i=0;i<4;i++){var yy=cy-R*.6+i*R*.4;ctx.strokeStyle=C.soft;ctx.strokeRect(cx-R*.55,yy-7,R*1.1,14)}
        for(var k=0;k<7;k++){var ph=((t*.42+k/7)%1),threat=k%3===0,x=W*.06+(cx-R-W*.06)*ph,y=cy-R*.6+(k%4)*R*.4;if(threat&&ph>.98)continue;sq(x,y,5,threat?C.r:C.w);if(threat&&ph>.9){ctx.strokeStyle='rgba(218,30,40,'+(1-(ph-.9)*10)+')';ctx.strokeRect(cx-R-10,y-10,20,20)}if(!threat&&ph>.5){var x2=cx-R+(ph-.5)*2*(R*2);if(x2<cx+R)sq(x2,y,5,C.w)}}
        ctx.textAlign='left';ctx.fillStyle=C.b;ctx.fillText('AMENAZAS BLOQUEADAS',W*.06,H*.9);var n=Math.floor(t*.7)%1000+1248;ctx.fillStyle=C.w;mono(22);ctx.fillText(nf(n),W*.06,H*.9+28)},
      network:function(t){var hubs=[[W*.5,H*.5],[W*.2,H*.28],[W*.8,H*.3],[W*.22,H*.76],[W*.78,H*.74],[W*.5,H*.14]];for(var i=1;i<hubs.length;i++){ctx.strokeStyle=C.soft;ctx.beginPath();ctx.moveTo(hubs[0][0],hubs[0][1]);ctx.lineTo(hubs[i][0],hubs[i][1]);ctx.stroke();var ph=(t*.35+i*.17)%1,dir=i%2?ph:1-ph;sq(hubs[0][0]+(hubs[i][0]-hubs[0][0])*dir,hubs[0][1]+(hubs[i][1]-hubs[0][1])*dir,5,C.w)}
        hubs.forEach(function(h,i){var pr=(t*.5+i*.2)%1;if(i===0){ctx.strokeStyle='rgba(255,255,255,'+(1-pr)*.6+')';var r=8+pr*22;ctx.strokeRect(h[0]-r,h[1]-r,r*2,r*2)}sq(h[0],h[1],i?10:16,i?C.b:C.w)});mono(11);ctx.fillStyle=C.b;ctx.textAlign='center';ctx.fillText('CORE',hubs[0][0],hubs[0][1]+26);['SEDE A','SEDE B','PLANTA','BODEGA','WI-FI'].forEach(function(n,i){ctx.fillText(n,hubs[i+1][0],hubs[i+1][1]+22)})},
      datacenter:function(t){var n=14,x0=W*.22,w=W*.56,y0=H*.14,h=H*.72/n;mono(11);ctx.fillStyle=C.b;ctx.textAlign='left';ctx.fillText('RACK A-07 · CARGA',x0,y0-12);for(var i=0;i<n;i++){var y=y0+i*h;ctx.strokeStyle=C.soft;ctx.strokeRect(x0,y+2,w,h-4);var load=.3+.4*(.5+.5*Math.sin(t*.9+i*.8));ctx.fillStyle='rgba(157,165,255,'+(.25+load*.5)+')';ctx.fillRect(x0+6,y+6,(w-24)*load,h-12);var on=Math.sin(t*3+i*1.3)>0;sq(x0+w-9,y+h/2,4,on?C.g:'rgba(66,190,101,.3)')}
        ctx.textAlign='right';ctx.fillStyle=C.w;mono(12);ctx.fillText('N+1',x0+w,y0-12)},
      virt:function(t){var cols=4,rows=3,gw=W*.7,gh=H*.6,x0=W*.15,y0=H*.2,cw=gw/cols,ch=gh/rows;mono(11);ctx.fillStyle=C.b;ctx.textAlign='left';ctx.fillText('12 CARGAS · 3 NODOS',x0,y0-12);for(var i=0;i<cols*rows;i++){var c=i%cols,r=Math.floor(i/cols),x=x0+c*cw,y=y0+r*ch,mv=Math.floor(t*.6)%12===i,dx=mv?Math.sin(t*6)*4:0;ctx.fillStyle=mv?'rgba(255,255,255,.95)':'rgba(43,63,232,.8)';ctx.fillRect(x+6+dx,y+6,cw-12,ch-12);ctx.strokeStyle=C.line;ctx.strokeRect(x+6+dx,y+6,cw-12,ch-12)}
        for(var k=0;k<3;k++){var yy=y0+gh+16+k*10;ctx.strokeStyle=C.soft;ctx.beginPath();ctx.moveTo(x0,yy);ctx.lineTo(x0+gw,yy);ctx.stroke()}ctx.fillStyle=C.b;ctx.fillText('NODO 1 · NODO 2 · NODO 3',x0,y0+gh+56)},
      automation:function(t){var rows=5,x0=W*.12,y0=H*.2,gap=H*.14;mono(11);ctx.fillStyle=C.b;ctx.textAlign='left';ctx.fillText('FLUJO · DOCUMENTO → CLASIFICACIÓN → SISTEMA',x0,y0-14);for(var i=0;i<rows;i++){var y=y0+i*gap,ph=((t*.3+i*.2)%1);ctx.strokeStyle=C.soft;ctx.beginPath();ctx.moveTo(x0,y);ctx.lineTo(x0+W*.76,y);ctx.stroke();[0,.5,1].forEach(function(f){sq(x0+W*.76*f,y,8,C.b)});var x=x0+W*.76*ph;sq(x,y,6,ph>.5?C.g:C.w);if(ph>.48&&ph<.52){ctx.strokeStyle=C.w;ctx.strokeRect(x0+W*.38-12,y-12,24,24)}}ctx.fillStyle=C.b;['ENTRADA','IA','ERP'].forEach(function(n,i){ctx.textAlign=i===0?'left':i===1?'center':'right';ctx.fillText(n,x0+W*.76*i/2,y0+rows*gap+4)})},
      cloud:function(t){var a=[W*.3,H*.42],b=[W*.7,H*.58];ctx.strokeStyle=C.line;ctx.setLineDash([3,6]);ctx.lineDashOffset=-t*10;ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke();ctx.setLineDash([]);var ph=(t*.4)%1;sq(a[0]+(b[0]-a[0])*ph,a[1]+(b[1]-a[1])*ph,6,C.w);sq(a[0]+(b[0]-a[0])*(1-ph),a[1]+(b[1]-a[1])*(1-ph),6,C.b);
        [a,b].forEach(function(p,i){var pr=(t*.5+i*.5)%1;ctx.strokeStyle='rgba(255,255,255,'+(1-pr)*.7+')';var r=12+pr*28;ctx.strokeRect(p[0]-r,p[1]-r,r*2,r*2);sq(p[0],p[1],18,C.w);mono(13);ctx.fillStyle=C.w;ctx.textAlign='center';ctx.fillText(i?'GYE':'CUE',p[0],p[1]+36)});mono(11);ctx.fillStyle=C.b;ctx.fillText('RÉPLICA CONTINUA',W*.5,H*.5+40)}
    };
    function frame(now){var t=(now-t0)/1000;ctx.clearRect(0,0,W,H);ctx.lineWidth=1;(S[kind]||S.cloud)(reduce?4:t);if(run&&!reduce)requestAnimationFrame(frame)}
    size();requestAnimationFrame(frame);window.addEventListener('resize',function(){size();if(reduce)requestAnimationFrame(frame)});
    onVisible(box,function(v){var was=run;run=v;if(v&&!was&&!reduce)requestAnimationFrame(frame)});
  })();

  /* ---------- Command palette (Ctrl/⌘ K) ---------- */
  (function(){
    var box=$('#cmdk');if(!box)return;
    var q=$('#cmdk-q'),list=$('#cmdk-list'),opener=null,items=[],sel=0;
    var IDX=(window.__INDEX||[]).slice();
    IDX.push({g:'Acciones',t:'Copiar correo: info@coresolutions.com.ec',d:'Escríbanos directamente',copy:'info@coresolutions.com.ec'});
    IDX.push({g:'Acciones',t:'Copiar teléfono: +593 99 402 1631',d:'Llámenos en horario de oficina',copy:'+593 99 402 1631'});
    function norm(s){return (s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase()}
    function render(){var words=norm(q.value).split(/\s+/).filter(Boolean);items=IDX.filter(function(it){var hay=norm(it.t+' '+(it.d||'')+' '+(it.k||'')+' '+it.g);return words.every(function(w){return hay.indexOf(w)>=0})}).slice(0,12);
      sel=Math.min(sel,Math.max(0,items.length-1));var g='',h='';
      items.forEach(function(it,i){if(it.g!==g){g=it.g;h+='<li class="cmdk-g" role="presentation">'+g+'</li>'}h+='<li role="option" id="cmdk-o'+i+'" class="cmdk-o'+(i===sel?' on':'')+'" aria-selected="'+(i===sel)+'" data-i="'+i+'"><b>'+it.t+'</b>'+(it.d?'<span>'+it.d+'</span>':'')+'</li>'});
      list.innerHTML=h||'<li class="cmdk-empty">Sin resultados. Pruebe con “respaldo”, “salud” o “firewall”.</li>';q.setAttribute('aria-activedescendant',items.length?'cmdk-o'+sel:'')}
    function go(it){if(!it)return;if(it.copy){try{navigator.clipboard.writeText(it.copy)}catch(e){}q.value='';q.placeholder='Copiado: '+it.copy;render();return}close(true);location.href=ROOT+it.u}
    function open(){opener=document.activeElement;box.hidden=false;doc.classList.add('lock');requestAnimationFrame(function(){box.classList.add('open')});q.value='';sel=0;render();setTimeout(function(){q.focus()},20)}
    function close(nav){box.classList.remove('open');doc.classList.remove('lock');setTimeout(function(){box.hidden=true},reduce?0:200);if(!nav&&opener&&opener.focus)opener.focus()}
    $$('[data-cmdk]').forEach(function(b){b.addEventListener('click',open)});
    document.addEventListener('keydown',function(e){var t=e.target,typing=/INPUT|TEXTAREA|SELECT/.test(t.tagName);
      if((e.key==='k'||e.key==='K')&&(e.metaKey||e.ctrlKey)){e.preventDefault();box.hidden?open():close()}
      else if(e.key==='/'&&!typing&&box.hidden){e.preventDefault();open()}});
    box.addEventListener('click',function(e){if(e.target.closest('[data-cx]'))close();var o=e.target.closest('.cmdk-o');if(o)go(items[+o.dataset.i])});
    q.addEventListener('input',function(){sel=0;render()});
    box.addEventListener('keydown',function(e){if(e.key==='Escape'){e.preventDefault();close()}else if(e.key==='ArrowDown'){e.preventDefault();sel=Math.min(items.length-1,sel+1);render()}else if(e.key==='ArrowUp'){e.preventDefault();sel=Math.max(0,sel-1);render()}else if(e.key==='Enter'){e.preventDefault();go(items[sel])}else if(e.key==='Tab'){e.preventDefault();q.focus()}});
  })();
})();

/* ---------- Home de referencia ---------- */
(function(){
  var hero=document.querySelector('.r-hero');if(!hero)return;
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
  /* reloj de réplica desde la carga */
  var ck=$('#r-clock'),t0=Date.now();function pad(n){return (n<10?'0':'')+n}
  if(ck)setInterval(function(){var s=Math.floor((Date.now()-t0)/1000);ck.textContent=pad(Math.floor(s/3600))+':'+pad(Math.floor(s/60)%60)+':'+pad(s%60)},1000);
  /* el apagón: 200 ms de gris, el reloj no se detiene */
  /* el titular actúa la promesa: "se cae" cae, el home se atenúa y detrás la red se levanta desde Guayaquil */
  var fl=$('#r-fall'),st=$('#r-state'),falling=false,net=$('#r-net'),cap=$('#r-net-cap'),nctx=net&&net.getContext('2d'),NW,NH,nodes=[],links=[],hubs=[],ns=0,nrun=false,DUR=4600;
  function nsize(){var r=hero.getBoundingClientRect(),d=Math.min(2,window.devicePixelRatio||1);NW=r.width;NH=r.height;net.width=NW*d;net.height=NH*d;nctx.setTransform(d,0,0,d,0,0);
    nodes=[];links=[];var cols=NW<700?6:12,rows=NW<700?9:6,gx=NW/(cols+1),gy=NH/(rows+1),k=0;
    for(var r2=1;r2<=rows;r2++)for(var c=1;c<=cols;c++){var jx=(Math.sin(k*12.9898)*43758.5453)%1,jy=(Math.sin(k*78.233)*43758.5453)%1;nodes.push({x:gx*c+(jx-.5)*gx*.7,y:gy*r2+(jy-.5)*gy*.6,on:1,hub:0});k++}
    var A=nodes[Math.floor(nodes.length*.35)],B=nodes[Math.floor(nodes.length*.62)];A.hub=1;A.name='CUE';B.hub=2;B.name='GYE';hubs=[A,B];
    nodes.forEach(function(n,i){if(n.hub)return;var dA=Math.hypot(n.x-A.x,n.y-A.y),dB=Math.hypot(n.x-B.x,n.y-B.y);n.home=dA<dB?1:2;n.dist=Math.hypot(n.x-B.x,n.y-B.y);
      var near=nodes.map(function(m,j){return {j:j,d:Math.hypot(n.x-m.x,n.y-m.y)}}).filter(function(o){return o.j!==i&&o.d>0}).sort(function(a,b){return a.d-b.d}).slice(0,2);
      near.forEach(function(o){links.push([i,o.j])});links.push([i,nodes.indexOf(n.home===1?A:B)])});
    var far=nodes.filter(function(n){return !n.hub&&n.home===1}).map(function(n){return n.dist});ns=Math.max.apply(null,far.concat([1]))}
  function ndraw(now){var t=now-nt0,p=t/DUR;nctx.clearRect(0,0,NW,NH);var A=hubs[0],B=hubs[1];
    var cueDown=t>250&&t<DUR-700;
    /* enlaces */
    links.forEach(function(l){var a=nodes[l[0]],b=nodes[l[1]];var dead=cueDown&&((a.hub===1&&!b.lit)||(b.hub===1&&!a.lit));nctx.strokeStyle=dead?'rgba(200,204,255,.07)':'rgba(200,204,255,.3)';nctx.lineWidth=1;nctx.beginPath();nctx.moveTo(a.x,a.y);nctx.lineTo(b.x,b.y);nctx.stroke()});
    /* levantada: paquetes desde GYE a cada nodo huérfano, por distancia */
    var lit=0,total=0;
    nodes.forEach(function(n){if(n.hub)return;if(n.home===1){total++;var start=700+(n.dist/ns)*2600,end=start+500;n.lit=cueDown?t>end:false;var tr=(t-start)/(end-start);
        if(cueDown&&tr>0&&tr<1){var x=B.x+(n.x-B.x)*tr,y=B.y+(n.y-B.y)*tr;nctx.strokeStyle='rgba(255,255,255,.5)';nctx.beginPath();nctx.moveTo(B.x,B.y);nctx.lineTo(x,y);nctx.stroke();nctx.fillStyle='#fff';nctx.beginPath();nctx.arc(x,y,3,0,7);nctx.fill()}
        if(n.lit)lit++}});
    /* nodos */
    nodes.forEach(function(n){if(n.hub)return;var dim=cueDown&&n.home===1&&!n.lit;var s=dim?3:5;nctx.fillStyle=dim?'rgba(200,204,255,.22)':(n.lit&&cueDown?'#fff':'rgba(200,204,255,.9)');nctx.fillRect(n.x-s/2,n.y-s/2,s,s);
      if(n.lit&&cueDown){var age=t-(700+(n.dist/ns)*2600+500);if(age<500){nctx.strokeStyle='rgba(255,255,255,'+(1-age/500)*.6+')';nctx.beginPath();nctx.arc(n.x,n.y,4+age/25,0,7);nctx.stroke()}}});
    /* centros */
    hubs.forEach(function(h){var s=14,down=h.hub===1&&cueDown;nctx.lineWidth=down?1:1.5;nctx.strokeStyle=down?'rgba(200,204,255,.35)':'#fff';nctx.fillStyle=down?'transparent':'rgba(255,255,255,.12)';nctx.strokeRect(h.x-s/2,h.y-s/2,s,s);if(!down)nctx.fillRect(h.x-s/2,h.y-s/2,s,s);
      if(down){nctx.beginPath();nctx.moveTo(h.x-s/2,h.y-s/2);nctx.lineTo(h.x+s/2,h.y+s/2);nctx.moveTo(h.x+s/2,h.y-s/2);nctx.lineTo(h.x-s/2,h.y+s/2);nctx.stroke()}
      if(h.hub===2&&cueDown){var pu=.5+.5*Math.sin(now/180);nctx.strokeStyle='rgba(255,255,255,'+pu*.6+')';nctx.strokeRect(h.x-s/2-5,h.y-s/2-5,s+10,s+10)}
      nctx.font='10px "IBM Plex Mono",monospace';nctx.textAlign='center';nctx.fillStyle=down?'rgba(200,204,255,.5)':'#fff';nctx.fillText(h.name,h.x,h.y+s/2+14)});
    cap.textContent=cueDown?(lit<total?'LEVANTANDO SERVICIOS DESDE GUAYAQUIL · '+lit+' / '+total:'SERVICIOS RESTABLECIDOS · '+total+' / '+total+' · 0 DATOS PERDIDOS'):'';
    if(nrun)requestAnimationFrame(ndraw)}
  var nt0=0;
  function fall(){if(falling||reduce||!nctx)return;falling=true;nsize();hero.classList.add('fall');st.textContent='CUENCA FUERA DE LÍNEA · GUAYAQUIL ACTIVO';nt0=performance.now();nrun=true;requestAnimationFrame(ndraw);
    setTimeout(function(){hero.classList.remove('fall');st.textContent='RÉPLICA ACTIVA';setTimeout(function(){nrun=false;falling=false},700)},DUR)}
  if(fl){setTimeout(fall,1800);fl.addEventListener('pointerenter',fall);fl.addEventListener('click',fall)}
  /* traductor gerente / técnico */
  var list=$('#r-serv');$$('.r-toggle button').forEach(function(b){b.addEventListener('click',function(){$$('.r-toggle button').forEach(function(x){x.setAttribute('aria-pressed',String(x===b))});list.classList.toggle('t',b.dataset.lang==='t')})});
  /* cifras que cuentan una sola vez */
  var figs=$$('.r-big');if(figs.length){if(!reduce)figs.forEach(function(el){el.textContent='0'});var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var el=e.target,n=+el.dataset.n;io.unobserve(el);if(reduce){el.textContent=n;return}var st=performance.now();(function f(now){var p=Math.min(1,(now-st)/600);p=1-Math.pow(1-p,3);el.textContent=Math.round(n*p);if(p<1)requestAnimationFrame(f)})(st)})},{threshold:.4});figs.forEach(function(el){io.observe(el)})}
  /* la réplica: dos centros, un cauce de datos, una fila de sucursales */
  var cv=$('#r-cv');if(!cv)return;var ctx=cv.getContext('2d'),W,H,dpr=1,parts=[],down=false,t1=0,sec=$('#r-sec'),live=$('#r-live'),bf=$('#r-fail'),br=$('#r-reset'),run=false,last=0,secT;
  var NAVY='#01095C',GRAY='#C8CCD3',LINE='#E1E4E9',N=reduce?0:48;
  function size(){var r=cv.getBoundingClientRect();dpr=Math.min(2,window.devicePixelRatio||1);W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}
  function A(){return {x:W*.22,y:H*.3}}function B(){return {x:W*.78,y:H*.3}}
  function seed(){parts=[];for(var i=0;i<N;i++)parts.push({p:Math.random(),v:.0025+Math.random()*.002,o:(Math.random()-.5)*10,row:i%2===0})}
  function box(c,on,label){var s=Math.min(W,H)*.14;ctx.lineWidth=on?2:1;ctx.strokeStyle=on?NAVY:GRAY;ctx.fillStyle=on?NAVY:'#fff';ctx.fillRect(c.x-s/2,c.y-s/2,s,s);ctx.strokeRect(c.x-s/2,c.y-s/2,s,s);
    ctx.font='11px "IBM Plex Mono",monospace';ctx.textAlign='center';ctx.fillStyle=on?NAVY:GRAY;ctx.fillText(label,c.x,c.y+s/2+18);if(!on){ctx.fillStyle='#fff';ctx.fillRect(c.x-s/2+1,c.y-s/2+1,s-2,s-2);ctx.strokeStyle=GRAY;ctx.beginPath();ctx.moveTo(c.x-s/2,c.y-s/2);ctx.lineTo(c.x+s/2,c.y+s/2);ctx.moveTo(c.x+s/2,c.y-s/2);ctx.lineTo(c.x-s/2,c.y+s/2);ctx.stroke()}}
  function draw(now){var a=A(),b=B(),y2=H*.78,n=10,src=down?b:a;ctx.clearRect(0,0,W,H);
    /* cauce A→B */
    ctx.strokeStyle=LINE;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
    /* ramas hacia la fila */
    for(var i=0;i<n;i++){var x=W*.1+i*(W*.8/(n-1));ctx.strokeStyle=LINE;ctx.beginPath();ctx.moveTo(src.x,src.y+Math.min(W,H)*.07);ctx.lineTo(x,y2-8);ctx.stroke()}
    /* partículas */
    var ph=(now/1000)%1;
    parts.forEach(function(q){if(!reduce){q.p+=q.v*(now-last)/16;if(q.p>1)q.p-=1}
      if(q.row){var k=Math.floor(q.p*n*7)%n,x=W*.1+k*(W*.8/(n-1)),f=(q.p*n*7)%1;var sx=src.x,sy=src.y+Math.min(W,H)*.07;ctx.fillStyle=NAVY;ctx.globalAlpha=.7;ctx.beginPath();ctx.arc(sx+(x-sx)*f,sy+(y2-8-sy)*f,1.6,0,7);ctx.fill();ctx.globalAlpha=1}
      else if(!down){ctx.fillStyle=NAVY;ctx.beginPath();ctx.arc(a.x+(b.x-a.x)*q.p,a.y+q.o*Math.sin(q.p*Math.PI),2,0,7);ctx.fill()}});
    /* fila de sucursales: nunca se apagan */
    for(var j=0;j<n;j++){var xx=W*.1+j*(W*.8/(n-1)),on=reduce?1:(.55+.45*Math.sin(now/600+j));ctx.strokeStyle=NAVY;ctx.lineWidth=1;ctx.globalAlpha=on;ctx.beginPath();ctx.arc(xx,y2,6,0,7);ctx.stroke();ctx.globalAlpha=1}
    ctx.font='11px "IBM Plex Mono",monospace';ctx.textAlign='left';ctx.fillStyle='#6B707C';ctx.fillText('SUS SUCURSALES · CAJEROS · QUIRÓFANOS',W*.1,y2+28);
    box(a,!down,'CUENCA');box(b,true,'GUAYAQUIL');
    if(down){var pu=reduce?1:.6+.4*Math.sin(now/300);ctx.strokeStyle=NAVY;ctx.globalAlpha=pu*.5;ctx.lineWidth=1;var s=Math.min(W,H)*.14+10;ctx.strokeRect(b.x-s/2,b.y-s/2,s,s);ctx.globalAlpha=1}
    last=now;if(run&&!reduce)requestAnimationFrame(draw)}
  function start(){if(run)return;run=true;last=performance.now();requestAnimationFrame(draw)}function stop(){run=false}
  function setDown(v){down=v;bf.setAttribute('aria-pressed',String(v));bf.textContent=v?'Cuenca fuera de línea':'Simular falla en Cuenca';bf.disabled=v;br.hidden=!v;clearInterval(secT);
    if(v){t1=Date.now();live.textContent='Cuenca fuera de línea. Guayaquil asumió los servicios en 0 segundos. Datos intactos: sus sucursales siguen atendidas.';secT=setInterval(function(){sec.textContent=Math.floor((Date.now()-t1)/1000)},250)}
    else{sec.textContent='0';live.textContent='Cuenca de vuelta. Los dos centros vuelven a replicarse entre sí.'}
    if(reduce)draw(performance.now())}
  bf.addEventListener('click',function(){setDown(true)});br.addEventListener('click',function(){setDown(false)});
  size();seed();var vis=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){if(reduce)draw(performance.now());else start()}else stop()})},{threshold:.1});vis.observe(cv);
  var rt;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){size();if(reduce)draw(performance.now())},120)});
})();
