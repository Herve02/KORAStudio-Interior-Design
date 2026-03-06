 
    // ── Cursor ─────────────────────────────────────────────
    const cur = document.getElementById('cur');
    const ring = document.getElementById('cur-ring');
    let mx=0,my=0,rx=0,ry=0;
    document.addEventListener('mousemove',e=>{
      mx=e.clientX; my=e.clientY;
      cur.style.left=mx+'px'; cur.style.top=my+'px';
    });
    (function animRing(){
      rx+=(mx-rx)*.11; ry+=(my-ry)*.11;
      ring.style.left=rx+'px'; ring.style.top=ry+'px';
      requestAnimationFrame(animRing);
    })();

    // ── Nav scroll ─────────────────────────────────────────
    const nav=document.getElementById('main-nav');
    window.addEventListener('scroll',()=>{
      nav.classList.toggle('scrolled', window.scrollY>60);
    });

    // ── Hero parallax ──────────────────────────────────────
    const heroImg=document.getElementById('hero-img');
    window.addEventListener('scroll',()=>{
      const s=window.scrollY;
      if(s<window.innerHeight){
        heroImg.style.transform=`translateY(${s*.3}px)`;
      }
    },{passive:true});

    // ── Counter animation ──────────────────────────────────
    function animCount(el){
      const target=+el.dataset.target;
      const duration=1800;
      const step=target/(duration/16);
      let cur=0;
      const t=setInterval(()=>{
        cur=Math.min(cur+step, target);
        el.textContent=Math.round(cur)+(target===100?'%':'+');
        if(cur>=target) clearInterval(t);
      },16);
    }
    const numObs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.querySelectorAll('[data-target]').forEach(animCount);
          numObs.unobserve(e.target);
        }
      });
    },{threshold:.3});
    const numSection=document.getElementById('numbers');
    if(numSection) numObs.observe(numSection);

    // ── Scroll reveals ─────────────────────────────────────
    const revObs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
    },{threshold:.1});
    document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el=>revObs.observe(el));

    // ── Mobile menu ────────────────────────────────────────
    function toggleMenu(){
      const ex=document.getElementById('mob-nav');
      if(ex){ex.remove();return;}
      const m=document.createElement('div');
      m.id='mob-nav';
      m.style.cssText=`position:fixed;inset:0;background:rgba(8,9,15,.97);
        z-index:900;display:flex;flex-direction:column;align-items:center;
        justify-content:center;gap:2.5rem;`;
      ['Studio','Services','Portfolio','Process','Contact'].forEach((t,i)=>{
        const a=document.createElement('a');
        a.href='#'+['about','services','portfolio','process','contact'][i];
        a.textContent=t;
        a.style.cssText=`font-family:'Bebas Neue',sans-serif;font-size:4rem;
          letter-spacing:.08em;color:#f0ece5;text-decoration:none;transition:color .25s;`;
        a.onmouseenter=()=>a.style.color='#d4722a';
        a.onmouseleave=()=>a.style.color='#f0ece5';
        a.onclick=()=>m.remove();
        m.appendChild(a);
      });
      const x=document.createElement('button');
      x.textContent='✕'; x.onclick=()=>m.remove();
      x.style.cssText=`position:absolute;top:2rem;right:2rem;background:none;
        border:none;color:#d4722a;font-size:1.8rem;cursor:pointer;`;
      m.appendChild(x);
      document.body.appendChild(m);
    }

    // ── Service overlays ───────────────────────────────────
    function openOv(id){
      const o=document.getElementById('ov-'+id);
      if(!o) return;
      document.body.style.overflow='hidden';
      o.classList.add('open');
      o.querySelector('.sov-panel').scrollTop=0;
    }
    function closeOv(){
      document.querySelectorAll('.svc-ov.open').forEach(o=>o.classList.remove('open'));
      document.body.style.overflow='';
    }
    document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeOv(); });

    // ── Stagger service cards ──────────────────────────────
    document.querySelectorAll('.svc-card').forEach((c,i)=>{
      c.style.cssText+=`opacity:0;transform:translateY(28px);
        transition:opacity .6s ease ${i*.1}s,transform .6s ease ${i*.1}s`;
      const o=new IntersectionObserver(([e])=>{
        if(e.isIntersecting){c.style.opacity='1';c.style.transform='translateY(0)';}
      },{threshold:.1});
      o.observe(c);
    });

    // ── Form submit ────────────────────────────────────────
    function handleSub(btn){
      btn.textContent='Sending…'; btn.style.background='#6e6c72';
      setTimeout(()=>{
        btn.textContent='Message Sent ✓'; btn.style.background='#2a6e3a';
        setTimeout(()=>{ btn.textContent='Send Message →'; btn.style.background='var(--copper)'; },3000);
      },1400);
    }
  