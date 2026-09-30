/* PLUMBING_V 4 — Bespoke Studio · meccanica invisibile canonica.
   ────────────────────────────────────────────────────────────────
   CONFINE (inviolabile): questo file contiene SOLO plumbing — la meccanica
   che il visitatore non percepisce come design. NIENTE markup di sezioni,
   NIENTE stile, NIENTE struttura: concept, griglia, tipografia, hero e
   animazioni-firma si progettano DA ZERO per ogni cliente (GATE #3).
   Se qui dentro scivola del layout, questo diventa il nuovo scheletro
   condiviso — cioè il difetto "copia-incolla" che il metodo combatte.

   Come si usa: si COPIA nella cartella js/ del sito e si adatta la sola
   costante SITE. Le animazioni-firma del sito si scrivono nel proprio
   main.js DOPO questo file (o in coda a questo file, sotto il marcatore).
   Ogni bug nuovo si corregge QUI (bump PLUMBING_V + changelog nel README)
   e poi nel sito: mai il contrario.

   Fix già incorporati (non rimuovere):
   - ScrollTrigger registrato SUBITO allo script load, MAI dentro l'intro
     o un setTimeout (bug APF #5 del 16/7: race col watchdog → sezioni
     che sparivano allo scroll).
   - Reveal con once:true (niente re-animazioni da zero ri-scorrendo).
   - Watchdog 1,5s che forza visibile e UCCIDE i trigger non scattati.
   - Lightbox su [hidden] + override CSS !important (bug: display:flex
     batteva [hidden] e la lightbox restava visibile).
   - Foto-contenuto MAI lazy (regola workflow §8): il plumbing non tocca
     il loading, ma il lint lo verifica.
   - Orari Europe/Rome con finestre multiple e scavalco di mezzanotte
     (pattern Il Cavallante 18:00–00:30). */

(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) root.classList.add('reduced-motion');

  /* ══════════ CONFIG PER-SITO — l'unica parte da adattare ══════════ */
  var SITE = {
    slug: 'raviolando',
    /* WhatsApp: il numero nella loro bio Instagram («whatsapp: 3519408076») */
    whatsapp: { number: '', message: '', ids: [] },
    /* pannello Google (30/9/2026): tutti i giorni 12–21:30 */
    hours: {
      0: [['12:00', '21:30']], 1: [['12:00', '21:30']], 2: [['12:00', '21:30']], 3: [['12:00', '21:30']],
      4: [['12:00', '21:30']], 5: [['12:00', '21:30']], 6: [['12:00', '21:30']],
    },
    hoursStatusId: 'orarioStato',
    hoursTableSelector: '[data-day]',
    todayClass: 'is-today',
    introId: 'intro',
    introDuration: 1800,
    revealSelector: '.reveal',
    inViewClass: 'in-view',
    breakpointMenu: 1060,
    EN: {
      "m.salta": "Skip to the content",
      "m.top": "Raviolando: back to the top",
      "m.nav": "The sections",
      "m.lingua": "Language",
      "m.menu": "Open the menu",
      "m.ingrandisci": "Enlarge the photo",
      "m.lightbox": "Enlarged photo",
      "m.chiudi": "Close",
      "n.ravioli": "Dumplings",
      "n.bao": "Bao and noodles",
      "n.tea": "Bubble tea",
      "n.posto": "The place",
      "n.dicono": "Reviews",
      "n.dove": "Where",
      "n.domande": "Questions",
      "t.chiama": "Call",
      "t.indicazioni": "Directions",
      "h.sopra": "Chinese dumplings · Via dell'Unione 6, between Via Torino and the Duomo",
      "h.titolo": "Fried dumplings, light and crispy.",
      "h.testo": "Cooked with little oil, with teriyaki sauce and chopped pistachios. And then bao burgers, noodles, bubble tea and mochi, a short walk from the Duomo.",
      "h.senso": "on the first scroll on their wall: guests feel at home.",
      "h.chi": "Manuel Cazzaniga, in a review on Google (in Italian: «a corner of the East in Milan»)",
      "h.google": "on Google, 626 reviews",
      "p.titolo": "The fold",
      "p.desc": "On the chopping board, the round dumpling wrapper: the filling goes on, the lower flap folds over and closes the half-moon, the edge is pleated one fold at a time; in the pan it turns golden, then the line of teriyaki sauce and the chopped pistachios. Three fillings: pork and vegetables, vegetables in the green wrapper, prawns.",
      "p.d0": "Pork and vegetables: the filling, the fold, then into the pan with little oil, teriyaki and pistachios.",
      "p.d1": "Vegetables, in the green wrapper: their vegan dumpling.",
      "p.d2": "Prawns and vegetables: closed, fried, teriyaki and pistachios.",
      "p.modi": "Which filling",
      "p.b0": "Pork and vegetables",
      "p.b1": "Vegetables",
      "p.b2": "Prawns",
      "p.nota": "With teriyaki and chopped pistachios: that is how they serve them, as their menu says.",
      "r.etichetta": "The dumplings",
      "r.titolo": "Six fillings, fried with little oil",
      "r.senso": "on the second scroll: it reads like «let's make friends», but with the character for dumpling.",
      "r.1": "Pork and vegetables",
      "r.2": "Chicken and vegetables",
      "r.3": "Veal",
      "r.4": "Duck",
      "r.5": "Vegetables (vegan)",
      "r.6": "Prawns and vegetables",
      "r.porzioni": "Five per portion, with teriyaki sauce and chopped pistachios. The Mix: eight, one with prawns and seven of your choice. The Bucket: eleven.",
      "a.ravioli": "Fried dumplings in a kraft tray, with a line of teriyaki and chopped pistachios.",
      "k.ravioli": "In the kraft tray, with teriyaki and pistachios.",
      "a.tavola": "From above, on a wooden table: bowls of plain and green dumplings, noodles with wakame and lime, spring rolls.",
      "k.tavola": "A table: dumplings, noodles, spring rolls.",
      "b.etichetta": "Bao, noodles and spring rolls",
      "b.titolo": "A bao can hold a thousand flavours",
      "b.senso": "on the third scroll: a flavour that lingers.",
      "b.bao": "Bao burgers",
      "b.b1": "Beef, their best seller",
      "b.b2": "Chicken",
      "b.b3": "Cod",
      "b.b4": "Spinach (vegan)",
      "b.b5": "Pumpkin (vegan)",
      "b.noodle": "Noodles",
      "b.n1": "Chinese noodles with two or four dumplings",
      "b.n2": "All vegetarian, with wakame",
      "b.n3": "With two dumplings and fried chicken, spicy or not",
      "b.n4": "Udon with four dumplings",
      "b.antipasti": "Starters",
      "b.a1": "Spring rolls",
      "b.a2": "Prawn rolls",
      "b.a3": "Edamame",
      "b.a4": "Wakame",
      "b.a5": "Chicken nuggets",
      "a.bao": "The beef bao burger in kraft paper, in front of the calligraphy scrolls.",
      "k.bao": "The beef bao.",
      "a.baopollo": "The chicken bao burger on newspaper-print paper.",
      "k.baopollo": "The chicken bao.",
      "a.involtini": "Four spring rolls in a kraft tray, with a line of teriyaki.",
      "k.involtini": "The spring rolls.",
      "c.etichetta": "Bubble tea and mochi",
      "c.titolo": "The base, then the topping",
      "c.senso": "on the fourth scroll: contentment brings happiness.",
      "c.frutta": "Fruit, over ice",
      "c.frutta1": "Watermelon, strawberry, mango, peach, passion fruit, grape, orange, grapefruit, lychee, guava. Sparkling too: watermelon, passion fruit, lemon, strawberry, grape, peach.",
      "c.latte": "Milk tea and coffee",
      "c.latte1": "The classic with brown sugar and tapioca, matcha, taro, chocolate, caramel, coconut. And coffee bubble tea, matcha coffee, caffè latte.",
      "c.topping": "The toppings",
      "c.topping1": "Brown sugar tapioca, popping boba with passion fruit, strawberry, peach or mango, coconut jelly.",
      "c.mochi": "Mochi",
      "c.mochi1": "Two per box: green tea, sesame, taro, red bean, peanut.",
      "c.loro": "«Our lemon tea is made with fresh lemon and jasmine tea»",
      "c.chi": "— they write (in Italian)",
      "a.limonata": "An iced lemonade with the 饺局 logo on the cup, in front of the scrolls.",
      "k.limonata": "A fruit lemonade, with their logo.",
      "a.mochi": "Mochi in a black tray with the red 饺 RAVIOLANDO seal, on marble.",
      "k.mochi": "The mochi, with their seal.",
      "l.etichetta": "The place",
      "l.titolo": "On Via dell'Unione, between Via Torino and the Duomo",
      "l.senso": "on the fifth scroll: flourishing like brocade.",
      "l.testo": "A small place: the long wall with the scrolls, the white stools at the counter, the red banner with the seal. About ten seats; many people take it away.",
      "a.rotoli": "The calligraphy scrolls in black brushwork on the long wall: 宾至如归, 饺个朋友, 回味无穷, 知足常乐, 繁华似锦.",
      "k.rotoli": "The wall of scrolls.",
      "a.locale": "The long white room: the scrolls on the left, the white stools, the red banner with the seal, the counter.",
      "k.locale": "Inside: the stools, the counter.",
      "a.cavalletto": "The red sandwich board on the pavement: RAVIOLANDO, the dumpling and bubble tea logo, the dumplings drawn with their six fillings.",
      "k.cavalletto": "The sandwich board, outside.",
      "o.titolo": "Every day, 12 noon–9:30 pm",
      "o.cap": "Opening hours",
      "g.lun": "Monday",
      "g.mar": "Tuesday",
      "g.mer": "Wednesday",
      "g.gio": "Thursday",
      "g.ven": "Friday",
      "g.sab": "Saturday",
      "g.dom": "Sunday",
      "o.nota": "Hours from their Google listing (September 2026). There is also Raviolando Bocconi, at Viale Bligny 16.",
      "d.etichetta": "Reviews",
      "d.titolo": "Crispy dumplings and very kind staff",
      "d.google": "on Google, 626 reviews",
      "d.g2m": "Google, 2 months ago",
      "d.g8m": "Google, 8 months ago",
      "d.g2a": "Google, 2 years ago",
      "d.g3a": "Google, 3 years ago",
      "d.nota": "From the reviews on Google, in Italian, as they were written. The line at the top also comes from a review on Google.",
      "d.tutte": "All the reviews on Google",
      "w.etichetta": "Where",
      "w.titolo": "The side street off Via Torino, a short walk from the Duomo",
      "w.mappa": "Map: Raviolando, Via dell'Unione 6, Milan",
      "w.dove": "Where",
      "w.dovev": "Via dell'Unione 6, 20122 Milan, between Via Torino and Missori",
      "w.metro": "By metro",
      "w.metrov": "M1 and M3 Duomo, about 230 metres away; M3 Missori, about 280",
      "w.tram": "By tram",
      "w.tramv": "3, Via Torino or Duomo stop; 16 and 24 at Missori",
      "w.bus": "By bus",
      "w.busv": "60 and 61, Duomo stop",
      "w.tel": "Phone",
      "w.altra": "The other shop",
      "w.altrav": "Raviolando Bocconi, Viale Bligny 16",
      "q.etichetta": "Questions",
      "q.titolo": "Before you drop by",
      "q.1": "Are you open every day?",
      "q.1r": "Yes, from 12 noon to 9:30 pm, Sundays too.",
      "q.2": "Is there anything vegan?",
      "q.2r": "Yes: the vegetable dumplings, the spinach bao and the pumpkin bao, and the vegetarian noodles with wakame.",
      "q.3": "Can I sit down?",
      "q.3r": "Yes, at the counter: about ten seats. You can also take everything away.",
      "q.4": "Do you deliver?",
      "q.4r": "Yes, with Deliveroo and Just Eat.",
      "q.5": "How do I choose a bubble tea?",
      "q.5r": "Choose the base (fruit, sparkling, milk tea or coffee) and the topping: tapioca, popping boba or coconut jelly.",
      "q.6": "Where exactly are you?",
      "q.6r": "At Via dell'Unione 6, the side street off Via Torino, about 230 metres from the Duomo metro. There is also Raviolando Bocconi, at Viale Bligny 16.",
      "f2.orario": "Every day 12 noon–9:30 pm",
      "f2.cred": "Demo website made by <a href=\"https://bespokestud.io\" rel=\"noopener\">Bespoke Studio</a> · hours, rating and reviews from their Google listing (September 2026); the photos of the dishes from their menu on Deliveroo; the scrolls, the room and the sandwich board from photos by the restaurant and by customers on Google; their words from their menu and Instagram. We drew the dumpling on the board ourselves.",
      "f2.su": "Back to the top ↑"
    },
    LANGS: null,
    RTL: ['ar', 'he', 'fa', 'ur'],
    HOURS_I18N: null,
  };
  /* normalizzazione: EN storico -> LANGS */
  if (!SITE.LANGS) SITE.LANGS = SITE.EN && Object.keys(SITE.EN).length ? { en: SITE.EN } : {};
  var LANG_CODES = Object.keys(SITE.LANGS);   // senza 'it', che è il DOM
  /* ═════════════════════════════════════════════════════════════════ */

  /* ---------- WhatsApp wiring ---------- */
  if (SITE.whatsapp.number) {
    var waHref = 'https://wa.me/' + SITE.whatsapp.number + '?text=' +
      encodeURIComponent(SITE.whatsapp.message);
    SITE.whatsapp.ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { el.href = waHref; el.target = '_blank'; el.rel = 'noopener'; }
    });
  }

  /* ---------- GSAP: registrazione IMMEDIATA + reveal + watchdog ---------- */
  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  function showAllReveals() {
    var els = document.querySelectorAll(SITE.revealSelector);
    els.forEach(function (el) { el.classList.add(SITE.inViewClass); });
    if (hasGsap) {
      if (hasST) {
        els.forEach(function (el) {
          ScrollTrigger.getAll().forEach(function (st) {
            if (st.trigger === el && !st.progress) st.kill();
          });
        });
      }
      gsap.set(els, { opacity: 1, y: 0, x: 0 });
    }
  }
  // FIX FOUC (18/7): il watchdog è SOLO un fallback se GSAP non c'è (o reduced-motion).
  // Rivelare in anticipo tutti i .reveal mentre gli scroll-trigger sono attivi causava il
  // flash (scompaiono/ricompaiono) sotto la piega. Con GSAP attivo, rivelano gli ScrollTrigger.
  setTimeout(function () { if (!hasGsap || reducedMotion) showAllReveals(); }, 1500);

  if (hasGsap && !reducedMotion) {
    // reveal generico: le animazioni-FIRMA del sito vanno oltre questo,
    // ma si registrano ANCHE LORO subito, mai dopo l'intro.
    // ⚠️ REGOLA ANTI-FLASH (18/7): un elemento .reveal deve avere UNA SOLA animazione che
    // ne porta l'opacità a 1. Se un elemento ha una FIRMA che ne anima l'opacità (stagger,
    // timeline, ecc.), ESCLUDILO da qui via SITE.revealSelector (es. '.reveal:not(.mondo)'),
    // altrimenti il reveal generico + la firma si sovrappongono e l'elemento FLASHA.
    // immediateRender:false → lo stato "from" (opacity:0) NON viene ri-applicato ad ogni
    // ScrollTrigger.refresh() (che scatta al window.load mentre scrolli) → niente flash su refresh.
    gsap.utils.toArray(SITE.revealSelector).forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });
  } else {
    // fallback senza GSAP: IntersectionObserver + classe
    if ('IntersectionObserver' in window && !reducedMotion) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add(SITE.inViewClass); io.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
      document.querySelectorAll(SITE.revealSelector).forEach(function (el) { io.observe(el); });
    } else {
      showAllReveals();
    }
  }

  /* ---------- intro skippabile (NON gate-a nulla) ---------- */
  var intro = document.getElementById(SITE.introId);
  /* ⚠️ L'hook si legge AL MOMENTO DELLA CHIAMATA, mai catturato per valore
     qui. Il codice-firma vive sotto il marcatore di fine plumbing — cioè
     gira DOPO questa riga — quindi `window.bespokeHeroEntrance ||
     function(){}` congelava la funzione vuota e l'entrata dell'hero non
     partiva più: titolo a opacity 0 per sempre, hero vuota sul live.
     (20/7/2026, riprodotto a schermo su Benessere Futuro #159.) */
  function heroEntrance() {
    if (typeof window.bespokeHeroEntrance === 'function') window.bespokeHeroEntrance();
  }
  function hideIntro() {
    if (!intro) return;
    var el = intro; intro = null;
    el.classList.add('hide');
    setTimeout(function () { el.remove(); }, 700);
    heroEntrance();
  }
  // rimozione IMMEDIATA (niente fade): serve quando qualcosa deve stare sopra
  // l'intro subito, es. l'apertura del menu. Durante il fade l'intro resta
  // hit-testable e i link del drawer non sono cliccabili.
  function killIntroNow() {
    if (!intro) return;
    var el = intro; intro = null;
    el.remove();
    heroEntrance();
  }
  if (reducedMotion || !intro) {
    if (intro) { intro.remove(); intro = null; }
    /* ⚠️ setTimeout 0 NON è decorativo: senza intro questo ramo gira in modo
       SINCRONO, cioè PRIMA che il codice-firma — che sta sotto il marcatore
       di fine plumbing, dentro questa stessa IIFE — abbia assegnato
       `window.bespokeHeroEntrance`. Il risultato è un'entrata dell'hero MUTA:
       nessun errore, elementi visibili, animazione semplicemente mai partita.
       Rimandando di un tick la IIFE è conclusa e l'hook esiste.
       (14/8/2026, A.S.FA. Sicilia: misurato h1 a opacity 1 già al load.)
       Cugino del bug `hero-hook-congelato` del 20/7: lì l'hook era catturato
       troppo presto, qui è CHIAMATO troppo presto. */
    setTimeout(heroEntrance, 0);
  } else {
    setTimeout(hideIntro, SITE.introDuration);
    setTimeout(hideIntro, 6000); // safety net: l'intro non può incastrarsi
    intro.addEventListener('click', hideIntro);
  }

  /* ---------- burger menu (inert + focus + Escape + resize) ---------- */
  var burger = document.getElementById('burger');
  /* 26/7/2026 (Il Papiro #168) — IL PANNELLO SI RISOLVE DA `aria-controls`.
     Il canone apriva sempre `#mainNav`, dando per scontato che la nav
     desktop FOSSE anche il drawer. Molti siti invece hanno un drawer
     separato (`#mobile-menu`) con `hidden`, mentre `#mainNav` su mobile è
     `display:none`: il burger aggiungeva `nav-open` a un elemento nascosto
     e il menu non si apriva. È la stessa decisione già presa il 20/7 per
     qa-motion — «è lì che il markup accessibile dice qual è il pannello» —
     che però non era mai rientrata qui. */
  var nav = (function () {
    var byAria = burger && burger.getAttribute('aria-controls');
    return (byAria && document.getElementById(byAria)) || document.getElementById('mainNav');
  })();
  if (burger && nav) {
    var navUsaHidden = nav.hasAttribute('hidden');
    var lastFocus = null;
    var closeNav = function () {
      nav.classList.remove('nav-open');
      if (navUsaHidden) nav.hidden = true;
      burger.setAttribute('aria-expanded', 'false');
      if (lastFocus) { lastFocus.focus(); lastFocus = null; }
    };
    var openNav = function () {
      // L'intro ha z-index alto ed è figlia del body: se è ancora a schermo
      // copre il drawer (che vive nello stacking context dell'header) e i link
      // risultano non cliccabili. Aprire il menu chiude l'intro.
      // (bug trovato da qa-motion su Linea Uomo, 19/7/2026 → PLUMBING_V 2)
      if (typeof killIntroNow === 'function') killIntroNow();
      lastFocus = document.activeElement;
      if (navUsaHidden) nav.hidden = false;
      nav.classList.add('nav-open');
      burger.setAttribute('aria-expanded', 'true');
      var first = nav.querySelector('a, button');
      if (first) first.focus();
    };
    burger.addEventListener('click', function () {
      nav.classList.contains('nav-open') ? closeNav() : openNav();
    });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > SITE.breakpointMenu) closeNav();
    });
  }

  /* ---------- lightbox accessibile ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  if (lightbox && lightboxImg) {
    var opener = null;
    var openLb = function (src, alt) {
      lightboxImg.src = src; lightboxImg.alt = alt || '';
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      if (lightboxClose) lightboxClose.focus();
    };
    var closeLb = function () {
      lightbox.hidden = true; lightboxImg.src = '';
      document.body.style.overflow = '';
      if (opener) { opener.focus(); opener = null; }
    };
    document.querySelectorAll('[data-full]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        opener = btn;
        var img = btn.querySelector('img');
        openLb(btn.getAttribute('data-full'), img ? img.alt : '');
      });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !lightbox.hidden) closeLb();
    });
  }

  /* ---------- orari dinamici Europe/Rome (finestre multiple + scavalco) ---------- */
  function romeNow() {
    try {
      var f = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false,
      });
      var p = f.formatToParts(new Date());
      var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var get = function (t) { return p.find(function (x) { return x.type === t; }).value; };
      return { day: map[get('weekday')], mins: parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10) };
    } catch (e) {
      var d = new Date();
      return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() };
    }
  }
  var toMin = function (hm) {
    var a = hm.split(':');
    return parseInt(a[0], 10) * 60 + parseInt(a[1], 10);
  };
  var fmt = function (m) {
    m = m % 1440;
    return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2);
  };
  var DAYS_IT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var HOURS_BASE = {
    it: { open: 'Aperto ora', closesAt: 'chiude alle ', opensToday: 'Chiuso · apre oggi alle ',
          opensOn: 'Chiuso · apre {day} alle ', closed: 'Chiuso', days: DAYS_IT },
    en: { open: 'Open now', closesAt: 'closes at ', opensToday: 'Closed · opens today at ',
          opensOn: 'Closed · opens {day} at ', closed: 'Closed', days: DAYS_EN },
  };
  /* risolve le etichette orari per la lingua richiesta, con fallback en -> it */
  function strings(lang) {
    var custom = (SITE.HOURS_I18N && SITE.HOURS_I18N[lang]) || null;
    var base = HOURS_BASE[lang] || HOURS_BASE.en;
    if (!custom) return base;
    var outp = {};
    Object.keys(HOURS_BASE.it).forEach(function (k) {
      outp[k] = custom[k] !== undefined ? custom[k] : base[k];
    });
    return outp;
  }

  function hoursState() {
    var now = romeNow();
    // finestra del giorno corrente
    var wins = SITE.hours[now.day] || [];
    for (var i = 0; i < wins.length; i++) {
      var s = toMin(wins[i][0]), e = toMin(wins[i][1]);
      if (now.mins >= s && now.mins < Math.min(e, 1440)) {
        return { open: true, day: now.day, closesAt: fmt(e) };
      }
    }
    // coda dopo mezzanotte della sera PRIMA
    var prev = (now.day + 6) % 7;
    var pw = SITE.hours[prev] || [];
    for (var j = 0; j < pw.length; j++) {
      var pe = toMin(pw[j][1]);
      if (pe > 1440 && now.mins < pe - 1440) {
        return { open: true, day: prev, closesAt: fmt(pe) };
      }
    }
    // chiuso: prossima apertura (oggi o nei prossimi 7 giorni)
    for (var k = 0; k < wins.length; k++) {
      if (now.mins < toMin(wins[k][0])) {
        return { open: false, day: now.day, opensToday: fmt(toMin(wins[k][0])) };
      }
    }
    for (var d = 1; d <= 7; d++) {
      var nd = (now.day + d) % 7;
      var nw = SITE.hours[nd] || [];
      if (nw.length) return { open: false, day: now.day, opensDay: nd, opensAt: fmt(toMin(nw[0][0])) };
    }
    return { open: false, day: now.day };
  }

  function renderHours() {
    var el = document.getElementById(SITE.hoursStatusId);
    var st = hoursState();
    document.querySelectorAll(SITE.hoursTableSelector).forEach(function (row) {
      row.classList.toggle(SITE.todayClass,
        parseInt(row.getAttribute('data-day'), 10) === st.day);
    });
    if (!el) return;
    /* V4: le etichette si risolvono per lingua corrente, non con un booleano
       en/it. Fallback a catena lingua -> en -> it, così un sito con AR o FR
       che non traduce lo stato orari resta comunque leggibile. */
    var L = strings(root.lang);
    var txt;
    if (st.open) {
      txt = L.open + ' · ' + L.closesAt + st.closesAt;
    } else if (st.opensToday) {
      txt = L.opensToday + st.opensToday;
    } else if (st.opensAt !== undefined) {
      txt = L.opensOn.replace('{day}', L.days[st.opensDay]) + st.opensAt;
    } else {
      txt = L.closed;
    }
    el.textContent = txt;
  }
  renderHours();
  setInterval(renderHours, 60000);

  /* ---------- i18n overlay (EN sopra l'IT del DOM) ---------- */
  var originals = {}; // attr -> key -> testo IT
  var I18N_ATTRS = [
    ['data-i18n', null],
    ['data-i18n-aria', 'aria-label'],
    ['data-i18n-alt', 'alt'],
    ['data-i18n-placeholder', 'placeholder'],
    ['data-i18n-title', 'title'],
  ];
  function setLang(lang) {
    /* V4: qualunque lingua dichiarata in SITE.LANGS, non più solo 'en'.
       'it' resta la lingua del DOM: nessun dizionario, nessuna sostituzione.
       Una lingua sconosciuta ricade su 'it' invece di rompere la pagina. */
    root.lang = (lang === 'it' || LANG_CODES.indexOf(lang) !== -1) ? lang : 'it';
    root.dir = SITE.RTL.indexOf(root.lang) !== -1 ? 'rtl' : 'ltr';
    var dict = SITE.LANGS[root.lang] || null;
    I18N_ATTRS.forEach(function (pair) {
      var dattr = pair[0], target = pair[1];
      if (!originals[dattr]) originals[dattr] = {};
      document.querySelectorAll('[' + dattr + ']').forEach(function (el) {
        var key = el.getAttribute(dattr);
        var store = originals[dattr];
        /* innerHTML, NON textContent: gli elementi tradotti contengono
           quasi sempre markup (<strong>, <br>) e con textContent il primo
           passaggio a EN lo appiattisce — tornando in italiano il grassetto
           non torna più. I valori del dizionario sono statici e scritti da
           noi. (20/7/2026: la flotta era già così, il boilerplate no.) */
        if (!(key in store)) store[key] = target ? el.getAttribute(target) : el.innerHTML;
        var val = dict && dict[key] !== undefined ? dict[key] : store[key];
        if (target) el.setAttribute(target, val); else el.innerHTML = val;
      });
    });
    renderHours();
    /* stato visivo della coppia di bottoni lingua, se il sito la usa */
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      var on = b.getAttribute('data-lang') === root.lang;
      b.classList.toggle('is-on', on);
      if (b.tagName === 'BUTTON') b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    try { localStorage.setItem(SITE.slug + '-lang', lang); } catch (e) {}
  }
  /* 26/7/2026 (Il Papiro #168) — SI CABLANO ENTRAMBE LE FORME DI SELETTORE.
     Il canone conosceva solo il toggle singolo `#langToggle`, ma nella
     flotta esiste da tempo anche la COPPIA di bottoni `[data-lang]`
     (Warsa, Mido…): `i18n-roundtrip` era già stato insegnato a riconoscerle
     il 20/7, il plumbing no. Chi copiava il boilerplate e usava la coppia
     si ritrovava il cambio lingua MORTO, e nessun lint statico se ne
     accorgeva (lo becca solo qa-motion, a runtime). */
  var langToggle = document.getElementById('langToggle');
  if (langToggle) {
    /* V4: il toggle singolo CICLA sull'anello ['it', ...LANG_CODES].
       Con due lingue il comportamento è identico a prima (it <-> en). */
    var RING = ['it'].concat(LANG_CODES);
    langToggle.addEventListener('click', function () {
      var i = RING.indexOf(root.lang);
      setLang(RING[(i + 1) % RING.length]);
    });
  }
  document.querySelectorAll('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });
  try {
    var saved = localStorage.getItem(SITE.slug + '-lang');
    if (saved && saved !== 'it' && LANG_CODES.indexOf(saved) !== -1) setLang(saved);
  } catch (e) {}

  /* ---------- action-bar mobile (opzionale: #actionBar) ---------- */
  var actionBar = document.getElementById('actionBar');
  if (actionBar) {
    var onScroll = function () {
      actionBar.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ══════════ FINE PLUMBING — da qui in giù SOLO il codice-firma
     del sito (animazioni e interazioni uniche del cliente), che si
     registra comunque SUBITO, mai dentro setTimeout/intro. ══════════ */

  /* ══════════ RAVIOLANDO 饺局 — Via dell'Unione 6 ══════════
     la FIRMA — «la piega»: sul tagliere il disco di sfoglia, il ripieno, il lembo che si ribalta, le pieghe sul bordo, la frittura
     dorata, il filo di teriyaki, la granella di pistacchi. Lo stato è M (maiale e verdure, verdure, gamberetti), T (0…1) e V (0 al suo
     posto; fino a 1 il raviolo esce a destra; da −1 a 0 entra da sinistra il prossimo disco). Senza JS e alla fine: maiale e verdure,
     T = 1, V = 0 (l'HTML). L'attesa (classe nell'head): il disco aperto. Reduced-motion: tutto subito. rAF a tempo, guardia 1,5 s,
     IO al 60 %, resize solo se cambia la larghezza; un gesto durante l'animazione la ferma dov'è. */
  var DATI = {"vb":[640,400],"via":700,"fasi":{"posa":{"t":0.04,"d":0.14},"piega":{"t":0.2,"d":0.2},"pieghe":{"t":0.42,"d":0.08,"passo":0.0367},"frigge":{"t":0.74,"d":0.1},"salsa":{"t":0.84,"d":0.1},"granella":{"t":0.9,"d":0.1}},"centro":[320,246],"raggio":118,"pieghe":[208,229,250,270,290,311,332],"lunghezza":26,"ripieno":[320,205],"salsa":334.1,"modi":[{"nome":"Maiale e verdure"},{"nome":"Verdure"},{"nome":"Gamberetti"}],"tempi":{"inizio":300,"piega":5000,"servi":420,"arriva":480,"piegaV":4200}};
  /* la piega a (M, T, V) — una sola fonte: la usano _rvl_firma.mjs (l'HTML allo stato finale), main.js (via rvl_main.cjs) e la
     prova (firma-prova.mjs). T = 1, V = 0 dà gli stessi attributi dell'HTML; T = 0 gli stessi pixel dell'attesa (il CSS).
     Sul tagliere: il disco di sfoglia, il ripieno che si posa, il lembo di sotto che si ribalta e chiude la mezzaluna, le pieghe sul
     bordo una alla volta, la frittura che la fa dorata, il filo di teriyaki, la granella di pistacchi che cade. */
  function creaPiega(svg, D) {
    var c01 = function (t) { return Math.max(0, Math.min(1, t)); };
    var r1 = function (n) { return Math.round(n * 10) / 10; };
    var r3 = function (n) { return Math.round(n * 1000) / 1000; };
    /* la fine di una fase arriva a 1 esatto (#256) */
    var fase = function (t, w) { return t >= w.t + w.d - 1e-9 ? 1 : c01((t - w.t) / w.d); };
    var dolce = function (u) { return u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2; };
    var servito = svg.querySelector('.servito');
    var C = D.centro, R = D.raggio, N = D.pieghe.length;
    var P = D.modi.map(function (_, m) {
      var q = function (c) { return svg.querySelector('.' + c + '[data-m="' + m + '"]'); };
      var pieghe = [];
      for (var k = 0; k < N; k++) pieghe.push(svg.querySelector('.piega[data-m="' + m + '"][data-k="' + k + '"]'));
      return { ripieno: q('ripieno'), lembo: q('lembo'), dorato: q('dorato'), salsa: q('salsa'), granella: q('granella'), pieghe: pieghe };
    });
    /* il lembo: la metà di sotto del disco ruota sul diametro; vista dall'alto è una mezza ellisse alta R·cos(φ), sotto finché il
       coseno è positivo e poi sopra, dove alla fine copre la metà di sopra */
    var lembo = function (u) {
      var ry = R * Math.cos(Math.PI * u), s = ry >= 0 ? 0 : 1;
      return 'M' + (C[0] - R) + ' ' + C[1] + ' A' + R + ' ' + r1(Math.abs(ry)) + ' 0 0 ' + s + ' ' + (C[0] + R) + ' ' + C[1] + ' Z';
    };
    function disegna(m, t, v) {
      var F = D.fasi, q = P[m], A = D.ripieno;
      /* il ripieno scende dall'alto e si posa (si allarga da 0,3 a 1) */
      var pr = fase(t, F.posa), er = dolce(pr);
      q.ripieno.setAttribute('transform', 'translate(' + A[0] + ' ' + r1(A[1] - 60 * (1 - er)) + ') scale(' + r3(.3 + .7 * er) + ') translate(' + (-A[0]) + ' ' + (-A[1]) + ')');
      q.ripieno.setAttribute('opacity', String(r3(Math.min(1, pr / .3))));
      /* il lembo si ribalta */
      q.lembo.setAttribute('d', lembo(dolce(fase(t, F.piega))));
      /* le pieghe sul bordo, una alla volta: dal bordo verso il centro */
      D.pieghe.forEach(function (g, k) {
        var pk = dolce(fase(t, { t: F.pieghe.t + k * F.pieghe.passo, d: F.pieghe.d }));
        var a = g * Math.PI / 180, ex = C[0] + R * Math.cos(a), ey = C[1] + R * Math.sin(a), L = D.lunghezza * pk;
        var ix = ex - L * Math.cos(a), iy = ey - L * Math.sin(a), cx = (ex + ix) / 2 - 5 * Math.sin(a) * pk, cy = (ey + iy) / 2 + 5 * Math.cos(a) * pk;
        q.pieghe[k].setAttribute('d', 'M' + r1(ex) + ' ' + r1(ey) + ' Q' + r1(cx) + ' ' + r1(cy) + ' ' + r1(ix) + ' ' + r1(iy));
        q.pieghe[k].setAttribute('opacity', pk > 0 ? '1' : '0');
      });
      /* in padella: dorato */
      q.dorato.setAttribute('opacity', String(r3(dolce(fase(t, F.frigge)))));
      /* il filo di teriyaki si disegna */
      q.salsa.setAttribute('stroke-dashoffset', String(r1(D.salsa * (1 - dolce(fase(t, F.salsa))))));
      /* la granella cade e si posa */
      var pg = fase(t, F.granella);
      q.granella.setAttribute('transform', 'translate(0 ' + r1(-34 * (1 - dolce(pg))) + ')');
      q.granella.setAttribute('opacity', String(r3(Math.min(1, pg / .4))));
      /* col V il raviolo fatto esce a destra; il prossimo disco entra da sinistra */
      servito.setAttribute('transform', 'translate(' + r1(D.via * v) + ' 0)');
    }
    var completo = !!servito && P.every(function (q) {
      return q.ripieno && q.lembo && q.dorato && q.salsa && q.granella && q.pieghe.every(function (x) { return !!x; });
    });
    return { disegna: disegna, pezzi: P, completo: completo };
  }

  var prendi = function (id) { return document.getElementById(id); };
  var figuraF = prendi('piega-firma'), svgF = prendi('piegaSvg'), leggiF = prendi('piegaLeggi');
  var PIEGA = svgF ? creaPiega(svgF, DATI) : null;
  var BOTTONI = [].slice.call(document.querySelectorAll('.laboratorio__modi button[data-modo]'));
  var TF = DATI.tempi;
  var faseF = 'fatta', modoF = '', rafF = 0, guardiaF = 0, larghezzaAvvioF = 0, corseF = 0, pianoF = null;
  var MF = 0, TT = 1, VF = 0;
  var destinazioneF = { m: 0 };
  var c01 = function (t) { return Math.max(0, Math.min(1, t)); };
  var CURVE = {
    dolce: function (u) { return u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2; },
    lineare: function (u) { return u; }
  };
  function annunciaF(m) {
    var el = document.querySelector('.laboratorio__d[data-m="' + m + '"]');
    if (leggiF) leggiF.textContent = el ? el.textContent : '';
  }
  function disegnaF(m, t, v) {
    if (m !== MF || figuraF.getAttribute('data-modo') !== String(m)) {
      MF = m;
      figuraF.setAttribute('data-modo', String(m));
      BOTTONI.forEach(function (bt) { bt.setAttribute('aria-pressed', String(+bt.getAttribute('data-modo') === m)); });
    }
    TT = t; VF = v;
    PIEGA.disegna(m, t, v);
  }
  /* un piano: tratti { da, a, m, x0: {t, v}, x1: {…}, curva } */
  function fotogrammaF(t) {
    var P = pianoF.piano, cur = null;
    for (var i = 0; i < P.length; i++) if (t >= P[i].da) cur = P[i];
    if (!cur) return;
    var q = t < cur.a ? c01((t - cur.da) / Math.max(1, cur.a - cur.da)) : 1, e = CURVE[cur.curva](q), A = cur.x0, B = cur.x1;
    disegnaF(cur.m, A.t + (B.t - A.t) * e, A.v + (B.v - A.v) * e);
  }
  var st2 = function (t, v) { return { t: t, v: v }; };
  function sorvegliaF() { clearTimeout(guardiaF); guardiaF = setTimeout(chiudiF, 1500); }
  function chiudiF() {
    cancelAnimationFrame(rafF); rafF = 0;
    clearTimeout(guardiaF);
    disegnaF(destinazioneF.m, 1, 0);
    /* gli altri modi tornano come nell'HTML (#257) */
    DATI.modi.forEach(function (_, k) { if (k !== destinazioneF.m) PIEGA.disegna(k, 1, 0); });
    PIEGA.disegna(destinazioneF.m, 1, 0);
    if (figuraF) figuraF.setAttribute('data-firma', 'fatta');
    root.classList.remove('firma-attesa');
    faseF = 'fatta';
  }
  /* un gesto durante un'animazione (o nell'attesa): tutto si ferma dov'è (#244); dall'attesa resta il disco aperto */
  function fermaF() {
    cancelAnimationFrame(rafF); rafF = 0;
    clearTimeout(guardiaF);
    if (root.classList.contains('firma-attesa')) { disegnaF(MF, 0, 0); root.classList.remove('firma-attesa'); }
    else disegnaF(MF, TT, VF);
    if (figuraF) figuraF.setAttribute('data-firma', 'fatta');
    faseF = 'fatta';
  }
  function avviaF(modo, piano) {
    cancelAnimationFrame(rafF); rafF = 0;
    modoF = modo; pianoF = piano;
    root.classList.remove('firma-attesa');
    faseF = 'corre'; if (figuraF) figuraF.setAttribute('data-firma', 'corre');
    larghezzaAvvioF = window.innerWidth;
    var t0 = null, corsa = ++corseF;
    function fotogramma(ts) {
      rafF = 0;
      /* un fotogramma rimasto in coda dopo la chiusura (o di una corsa vecchia) non riapre niente */
      if (faseF !== 'corre' || corsa !== corseF) return;
      if (t0 === null) t0 = ts;
      var t = ts - t0;
      fotogrammaF(t);
      if (t >= pianoF.fine) { chiudiF(); return; }
      sorvegliaF();
      rafF = requestAnimationFrame(fotogramma);
    }
    sorvegliaF();
    rafF = requestAnimationFrame(fotogramma);
  }
  function avviaIntroF() {
    /* dalla classe d'attesa agli attributi senza cambiare un pixel: il disco aperto */
    disegnaF(0, 0, 0);
    destinazioneF = { m: 0 };
    var P = [{ da: 0, a: TF.inizio, m: 0, x0: st2(0, 0), x1: st2(0, 0), curva: 'lineare' }, { da: TF.inizio, a: TF.inizio + TF.piega, m: 0, x0: st2(0, 0), x1: st2(1, 0), curva: 'lineare' }];
    avviaF('intro', { piano: P, fine: TF.inizio + TF.piega });
  }
  /* il gesto: scegliere il ripieno. Se è quello che si sta già facendo, niente; altrimenti tutto si ferma dov'è, il raviolo
     fatto esce a destra, entra da sinistra il prossimo disco, aperto, e si rifà da capo. */
  function sceltaF(m) {
    if (faseF === 'corre' && destinazioneF.m === m) return;
    if (faseF === 'corre' || root.classList.contains('firma-attesa')) fermaF();
    destinazioneF = { m: m };
    annunciaF(m);
    if (reducedMotion) { chiudiF(); return; }
    var P = [], t = 0, mm = MF, a = st2(TT, VF);
    var passo = function (dura, m2, b, curva) { P.push({ da: t, a: t + dura, m: m2, x0: a, x1: b, curva: curva }); t += dura; a = b; };
    if (a.v >= 0) {
      passo(TF.servi, mm, st2(a.t, 1), 'dolce');
      a = st2(0, -1);
    }
    passo(TF.arriva, m, st2(0, 0), 'dolce');
    passo(TF.piegaV, m, st2(1, 0), 'lineare');
    avviaF('prepara', { piano: P, fine: t });
  }

  /* la testata segna la sezione in cui ti trovi */
  var linkVoci = [].slice.call(document.querySelectorAll('#mainNav a'));
  var bersagliVoci = linkVoci.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  function aggiornaVoci() {
    var y = (document.getElementById('testata') || { offsetHeight: 80 }).offsetHeight + 40, ora = -1;
    for (var i = 0; i < bersagliVoci.length; i++) { if (bersagliVoci[i] && bersagliVoci[i].getBoundingClientRect().top <= y) ora = i; }
    linkVoci.forEach(function (a, k) { if (k === ora) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
  }
  var tickVoci = 0;
  window.addEventListener('scroll', function () {
    if (tickVoci) return;
    tickVoci = requestAnimationFrame(function () { tickVoci = 0; aggiornaVoci(); });
  }, { passive: true });
  aggiornaVoci();

  /* lo stato degli orari anche sopra la tabella */
  function copiaStato() {
    var primo = document.getElementById(SITE.hoursStatusId);
    if (!primo) return;
    var aperto = hoursState().open;
    ['orarioStato', 'orarioStato2'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      if (el !== primo) el.textContent = primo.textContent;
      el.classList.toggle('is-aperto', aperto);
    });
  }
  copiaStato();
  setInterval(copiaStato, 60000);
  /* la copia segue lo stato principale a ogni cambio, anche di lingua (#243, stato-lingua-check) */
  (function () {
    var primoS = document.getElementById(SITE.hoursStatusId);
    if (primoS && window.MutationObserver) new MutationObserver(copiaStato).observe(primoS, { childList: true, characterData: true, subtree: true });
  })();

  /* la firma è «in vista» quando se ne vede almeno il 60% (o il 60% della finestra, se è più alta della finestra); l'altezza è quella
     del documento: all'avvio innerHeight di un telefono può non essere ancora quella vera (#233) */
  function altezzaVista() { return document.documentElement.clientHeight || window.innerHeight || 800; }
  function abbastanza(top, bottom, alto, vh) { return Math.min(bottom, vh) - Math.max(top, 0) >= 0.6 * Math.min(alto, vh); }
  function inVistaF() { var r = svgF.getBoundingClientRect(); return abbastanza(r.top, r.bottom, r.height, altezzaVista()); }

  if (figuraF && svgF && PIEGA && PIEGA.completo && BOTTONI.length === DATI.modi.length) {
    try { clearTimeout(window.__attesaPiega); } catch (e) {}
    window.__piega = {
      stato: function () {
        return { fase: faseF, modo: modoF, corse: corseF, m: MF, t: TT, v: VF, meta: destinazioneF.m };
      },
      tempi: TF,
    };
    var daFareF = !reducedMotion && root.classList.contains('firma-attesa');
    /* la pagina aperta su una sezione (#orari): il browser ci scorre dopo, la firma non si vedrebbe */
    var ancoraF = location.hash && location.hash.length > 1 && location.hash !== '#inizio';
    var inVista = inVistaF();
    /* perché la firma è partita o no (lo legge il check) */
    window.__piega.avvio = { daFare: daFareF, ancora: !!ancoraF, inVista: inVista, top: svgF.getBoundingClientRect().top, vh: altezzaVista() };
    if (!daFareF || ancoraF) chiudiF();
    else if (inVista) avviaIntroF();
    else if ('IntersectionObserver' in window) {
      /* la firma sotto la piega (sul telefono): parte quando se ne vede abbastanza; fino ad allora resta il disco aperto */
      var soglie = []; for (var sg = 0; sg <= 20; sg++) soglie.push(sg / 20);
      var ioF = new IntersectionObserver(function (voci) {
        if (!voci.some(function (v) { return v.isIntersecting && abbastanza(v.boundingClientRect.top, v.boundingClientRect.bottom, v.boundingClientRect.height, altezzaVista()); })) return;
        ioF.disconnect();
        if (faseF === 'fatta' && root.classList.contains('firma-attesa')) avviaIntroF();
      }, { threshold: soglie });
      ioF.observe(svgF);
      window.__piega.avvio.aspetta = true;
    } else chiudiF();
    /* un resize chiude la firma solo se cambia la LARGHEZZA (sul telefono arrivano resize della sola altezza, #228) */
    window.addEventListener('resize', function () {
      if (faseF !== 'corre' || Math.abs(window.innerWidth - larghezzaAvvioF) <= 1) return;
      chiudiF();
    });
    BOTTONI.forEach(function (b) { b.addEventListener('click', function () { sceltaF(+b.getAttribute('data-modo')); }); });
  }
})();
