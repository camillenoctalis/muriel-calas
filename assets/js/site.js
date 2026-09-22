/*!
 * Muriel Calas — interactions du site (JavaScript natif, sans dépendance).
 * Chaque bloc ne s’active que si l’élément concerné est présent dans la page.
 */

/* ---------------------------------------------------------------------------
 * Formulaire de contact : adresse de réception.
 * Coller ici l’URL d’un service de formulaire (ex. Formspree : https://formspree.io/f/xxxxxx).
 * Tant qu’elle est vide : mode démonstration en local, message d’appel téléphonique en ligne.
 * ------------------------------------------------------------------------- */
var CONTACT_ENDPOINT = "";

(function () {
  "use strict";

  var d = document;
  var root = d.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (sel, ctx) { return (ctx || d).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || d).querySelectorAll(sel)); };

  /* Mémorise / applique les classes d’un élément et de ses descendants (états visuels) */
  function snapshot(el) {
    return [el].concat($$("*", el)).map(function (n) { return n.getAttribute("class"); });
  }
  function applySnapshot(el, snap) {
    [el].concat($$("*", el)).forEach(function (n, i) {
      if (snap[i] == null) n.removeAttribute("class");
      else n.setAttribute("class", snap[i]);
    });
  }
  function setInert(el, value) {
    if (value) el.setAttribute("inert", "");
    else el.removeAttribute("inert");
  }

  /* -------------------------------------------------------------------------
   * 1. Apparitions au scroll, parallaxe légère, traits de progression
   * ----------------------------------------------------------------------- */
  var reveals = $$("[data-reveal]");
  var progressRoots = $$("[data-progress]");

  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
    progressRoots.forEach(function (el) { el.style.setProperty("--progress", "1"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -7% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });

    var parallax = $$("[data-parallax]");
    var frame = 0;
    var update = function () {
      frame = 0;
      var vh = window.innerHeight;
      var desktop = window.innerWidth >= 768;
      parallax.forEach(function (el) {
        if (!desktop) { el.style.transform = ""; return; }
        var r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        var speed = parseFloat(el.getAttribute("data-parallax")) || 0.06;
        var shift = Math.max(-48, Math.min(48, -(r.top + r.height / 2 - vh / 2) * speed));
        el.style.transform = "translate3d(0," + shift.toFixed(1) + "px,0)";
      });
      progressRoots.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var distance = Math.max(r.height, vh * 0.25) + vh * 0.2;
        var p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / distance));
        el.style.setProperty("--progress", p.toFixed(3));
      });
    };
    var onScroll = function () { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }

  /* -------------------------------------------------------------------------
   * 2. En-tête : fond au scroll, masqué en descente, visible en remontée
   * ----------------------------------------------------------------------- */
  var header = $("[data-header]");
  var menuOpen = false;
  if (header) {
    var scrolledClasses = ["bg-paper/88", "shadow-[0_1px_0_var(--color-line)]", "backdrop-blur-xl"];
    var last = window.scrollY;
    var ticking = false;
    var headerUpdate = function () {
      ticking = false;
      var y = window.scrollY;
      var scrolled = y > 16;
      scrolledClasses.forEach(function (c) { header.classList.toggle(c, scrolled); });
      header.classList.toggle("bg-transparent", !scrolled);
      if (Math.abs(y - last) > 6) {
        var hide = y > last && y > 420 && !menuOpen;
        header.classList.toggle("-translate-y-full", hide);
        header.classList.toggle("translate-y-0", !hide);
        last = y;
      }
    };
    headerUpdate();
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(headerUpdate); }
    }, { passive: true });
  }

  /* -------------------------------------------------------------------------
   * 3. Menu mobile plein écran (focus piégé, Échap, verrouillage du scroll)
   * ----------------------------------------------------------------------- */
  var toggle = $('[aria-controls="menu-mobile"]');
  var panel = d.getElementById("menu-mobile");
  if (toggle && panel) {
    var closeBtn = $("[data-menu-close]", panel);
    var focusables = function () { return $$("a[href], button:not([disabled])", panel); };
    var onKey = function (e) {
      if (e.key === "Escape") { e.preventDefault(); closeMenu(true); }
      if (e.key === "Tab") {
        var items = focusables();
        var first = items[0];
        var lastItem = items[items.length - 1];
        if (e.shiftKey && d.activeElement === first) { e.preventDefault(); lastItem.focus(); }
        else if (!e.shiftKey && d.activeElement === lastItem) { e.preventDefault(); first.focus(); }
      }
    };
    var openMenu = function () {
      menuOpen = true;
      panel.hidden = false;
      panel.style.animation = reduce ? "" : "menu-in 0.7s var(--ease-out) both";
      toggle.setAttribute("aria-expanded", "true");
      root.style.overflow = "hidden";
      if (header) { header.classList.remove("-translate-y-full"); header.classList.add("translate-y-0"); }
      requestAnimationFrame(function () { (closeBtn || focusables()[0]).focus(); });
      d.addEventListener("keydown", onKey);
    };
    var closeMenu = function (restoreFocus) {
      menuOpen = false;
      panel.hidden = true;
      panel.style.animation = "";
      toggle.setAttribute("aria-expanded", "false");
      root.style.overflow = "";
      d.removeEventListener("keydown", onKey);
      if (restoreFocus) toggle.focus();
    };
    toggle.addEventListener("click", openMenu);
    if (closeBtn) closeBtn.addEventListener("click", function () { closeMenu(true); });
    panel.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("a")) closeMenu(false);
    });
  }

  /* -------------------------------------------------------------------------
   * 4. Barre d’action collante (mobile)
   * ----------------------------------------------------------------------- */
  var bar = $("[data-mobile-cta]");
  if (bar) {
    var pastHero = false;
    var blocked = false;
    var render = function () {
      var show = pastHero && !blocked;
      bar.classList.toggle("translate-y-0", show);
      bar.classList.toggle("translate-y-[140%]", !show);
      bar.setAttribute("aria-hidden", show ? "false" : "true");
      setInert(bar, !show);
    };
    var onBarScroll = function () {
      var next = window.scrollY > window.innerHeight * 0.85;
      if (next !== pastHero) { pastHero = next; render(); }
    };
    window.addEventListener("scroll", onBarScroll, { passive: true });
    if ("IntersectionObserver" in window) {
      var visible = [];
      var barIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          var i = visible.indexOf(e.target);
          if (e.isIntersecting && i === -1) visible.push(e.target);
          if (!e.isIntersecting && i !== -1) visible.splice(i, 1);
        });
        blocked = visible.length > 0;
        render();
      });
      $$("[data-hide-cta]").forEach(function (t) { barIo.observe(t); });
    }
    onBarScroll();
    render();
  }

  /* -------------------------------------------------------------------------
   * 5. Onglets « Pour qui ? »
   * ----------------------------------------------------------------------- */
  $$("[data-tabs]").forEach(function (wrap) {
    var tabs = $$('[role="tab"]', wrap);
    var panels = tabs.map(function (t) { return d.getElementById(t.getAttribute("aria-controls")); });
    if (tabs.length < 2) return;
    var active = tabs.findIndex(function (t) { return t.getAttribute("aria-selected") === "true"; });
    if (active < 0) active = 0;
    var onState = snapshot(tabs[active]);
    var offState = snapshot(tabs[active === 0 ? 1 : 0]);

    var select = function (i, focus) {
      if (i === active) { if (focus) tabs[i].focus(); return; }
      tabs.forEach(function (tab, j) {
        var on = j === i;
        applySnapshot(tab, on ? onState : offState);
        tab.setAttribute("aria-selected", on ? "true" : "false");
        tab.tabIndex = on ? 0 : -1;
        var p = panels[j];
        if (!p) return;
        p.classList.toggle("visible", on);
        p.classList.toggle("opacity-100", on);
        p.classList.toggle("invisible", !on);
        p.classList.toggle("opacity-0", !on);
        p.setAttribute("aria-hidden", on ? "false" : "true");
        setInert(p, !on);
        var img = $("img", p);
        if (img) { img.classList.toggle("scale-100", on); img.classList.toggle("scale-[1.06]", !on); }
      });
      active = i;
      if (focus) tabs[i].focus();
    };

    var hover = window.matchMedia("(hover: hover)").matches;
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(i); });
      if (hover) tab.addEventListener("mouseenter", function () { select(i); });
      tab.addEventListener("keydown", function (e) {
        var lastIndex = tabs.length - 1;
        var map = {
          ArrowRight: active === lastIndex ? 0 : active + 1,
          ArrowDown: active === lastIndex ? 0 : active + 1,
          ArrowLeft: active === 0 ? lastIndex : active - 1,
          ArrowUp: active === 0 ? lastIndex : active - 1,
          Home: 0,
          End: lastIndex,
        };
        if (e.key in map) { e.preventDefault(); select(map[e.key], true); }
      });
    });
  });

  /* -------------------------------------------------------------------------
   * 6. Accordéons (FAQ) : un seul panneau ouvert
   * ----------------------------------------------------------------------- */
  $$("[data-accordion]").forEach(function (acc) {
    var items = $$("button[aria-controls]", acc).map(function (btn) {
      return { btn: btn, region: d.getElementById(btn.getAttribute("aria-controls")) };
    });
    if (!items.length) return;
    var parts = function (it) { return [it.btn].concat($$("*", it.btn), [it.region]); };
    var read = function (it) { return parts(it).map(function (n) { return n.getAttribute("class"); }); };
    var write = function (it, s) { parts(it).forEach(function (n, i) { n.setAttribute("class", s[i]); }); };
    var openItem = items.find(function (it) { return it.btn.getAttribute("aria-expanded") === "true"; });
    var closedItem = items.find(function (it) { return it.btn.getAttribute("aria-expanded") !== "true"; });
    if (!openItem || !closedItem) return;
    var openState = read(openItem);
    var closedState = read(closedItem);

    items.forEach(function (it) {
      it.btn.addEventListener("click", function () {
        var willOpen = it.btn.getAttribute("aria-expanded") !== "true";
        items.forEach(function (other) {
          var on = other === it && willOpen;
          write(other, on ? openState : closedState);
          other.btn.setAttribute("aria-expanded", on ? "true" : "false");
          setInert(other.region, !on);
        });
      });
    });
  });

  /* -------------------------------------------------------------------------
   * 7. Carrousel de témoignages (défilement natif + flèches + clavier)
   * ----------------------------------------------------------------------- */
  $$("[data-slider]").forEach(function (slider) {
    var track = $("[data-slider-track]", slider);
    if (!track) return;
    var slides = Array.prototype.slice.call(track.children);
    var count = slides.length;
    var index = 0;
    var current = $("[data-slider-current]", slider);
    var barEl = $("[data-slider-bar]", slider);
    var live = $("[data-slider-live]", slider);

    var render = function () {
      if (current) current.textContent = String(index + 1).padStart(2, "0");
      if (barEl) barEl.style.width = ((index + 1) / count) * 100 + "%";
      if (live) live.textContent = "Témoignage " + (index + 1) + " sur " + count;
      slides.forEach(function (s, i) {
        var img = $("img", s);
        if (img) { img.classList.toggle("scale-100", i === index); img.classList.toggle("scale-105", i !== index); }
      });
    };
    var go = function (to) {
      var target = (to + count) % count;
      var slide = slides[target];
      var left = track.scrollLeft + slide.getBoundingClientRect().left - track.getBoundingClientRect().left;
      track.scrollTo({ left: left, behavior: reduce ? "auto" : "smooth" });
    };
    if ("IntersectionObserver" in window) {
      var sio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting && e.intersectionRatio > 0.6) { index = slides.indexOf(e.target); render(); }
        });
      }, { root: track, threshold: [0.6] });
      slides.forEach(function (s) { sio.observe(s); });
    }
    var prev = $("[data-slider-prev]", slider);
    var next = $("[data-slider-next]", slider);
    if (prev) prev.addEventListener("click", function () { go(index - 1); });
    if (next) next.addEventListener("click", function () { go(index + 1); });
    slider.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") go(index + 1);
      if (e.key === "ArrowLeft") go(index - 1);
    });
  });

  /* -------------------------------------------------------------------------
   * 8. Blog : filtre par catégorie
   * ----------------------------------------------------------------------- */
  $$("[data-blog]").forEach(function (blog) {
    var buttons = $$("[data-filter]", blog);
    var items = $$("[data-cats]", blog);
    var empty = $("[data-blog-empty]", blog);
    var pressed = buttons.find(function (b) { return b.getAttribute("aria-pressed") === "true"; }) || buttons[0];
    var other = buttons.find(function (b) { return b !== pressed; });
    if (!pressed || !other) return;
    var onState = pressed.getAttribute("class");
    var offState = other.getAttribute("class");

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var cat = btn.getAttribute("data-filter");
        buttons.forEach(function (b) {
          var on = b === btn;
          b.setAttribute("class", on ? onState : offState);
          b.setAttribute("aria-pressed", on ? "true" : "false");
        });
        var shownPosts = 0;
        items.forEach(function (it) {
          var match = !cat || it.getAttribute("data-cats").split("|").indexOf(cat) !== -1;
          it.hidden = !match;
          if (match && !it.closest("aside")) shownPosts++;
        });
        if (empty) empty.hidden = shownPosts > 0;
      });
    });
  });

  /* -------------------------------------------------------------------------
   * 9. Formulaire de contact
   * ----------------------------------------------------------------------- */
  var form = $("[data-contact-form]");
  if (form) {
    var messages = {
      firstName: "Indiquez votre prénom.",
      lastName: "Indiquez votre nom.",
      email: "Indiquez votre adresse e-mail.",
      emailInvalid: "Cette adresse e-mail ne semble pas valide.",
      message: "Quelques mots sur votre situation (10 caractères minimum).",
      consent: "Merci d’accepter le traitement de vos données pour que je puisse vous répondre.",
    };
    var setError = function (name, text) {
      var field = form.elements[name];
      if (!field) return;
      var id = name + "-error";
      var existing = d.getElementById(id);
      if (text) {
        field.setAttribute("aria-invalid", "true");
        field.setAttribute("aria-describedby", id);
        if (!existing) {
          existing = d.createElement("p");
          existing.id = id;
          existing.className = "field-error";
          var container = field.closest(".field");
          container.appendChild(existing);
        }
        existing.textContent = text;
      } else {
        field.removeAttribute("aria-invalid");
        field.removeAttribute("aria-describedby");
        if (existing) existing.remove();
      }
    };
    var validate = function () {
      var v = function (n) { return (form.elements[n] && form.elements[n].value || "").trim(); };
      var errors = {};
      if (!v("firstName")) errors.firstName = messages.firstName;
      if (!v("lastName")) errors.lastName = messages.lastName;
      if (!v("email")) errors.email = messages.email;
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) errors.email = messages.emailInvalid;
      if (v("message").length < 10) errors.message = messages.message;
      if (!form.elements.consent.checked) errors.consent = messages.consent;
      ["firstName", "lastName", "email", "message", "consent"].forEach(function (n) { setError(n, errors[n]); });
      return errors;
    };

    var submit = $('button[type="submit"]', form);
    var submitLabel = submit ? $("span", submit) : null;
    var status = $('[aria-live="polite"]', form);
    var local = location.protocol === "file:" || /^(localhost|127\.0\.0\.1)$/.test(location.hostname);

    var success = function () {
      var box = d.createElement("div");
      box.setAttribute("role", "status");
      box.className = "rounded-[var(--radius-card)] border border-line bg-paper p-8 md:p-12";
      box.innerHTML =
        '<span class="grid h-12 w-12 place-items-center rounded-full bg-navy text-paper" aria-hidden="true">' +
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></span>' +
        '<h3 class="display-sm mt-6 text-ink">Merci, votre message est bien parti.</h3>' +
        '<p class="mt-4 max-w-md text-muted">Je vous réponds personnellement dans les meilleurs délais. Si c’est urgent, n’hésitez pas à m’appeler au 06 22 06 44 59.</p>';
      form.replaceWith(box);
      box.setAttribute("tabindex", "-1");
      box.focus();
    };
    var fail = function (text) {
      if (status) status.innerHTML = '<span class="field-error"></span>';
      if (status) status.firstChild.textContent = text + " Vous pouvez aussi appeler le 06 22 06 44 59.";
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var errors = validate();
      var first = Object.keys(errors)[0];
      if (first) { form.elements[first].focus(); return; }
      if (form.elements.website && form.elements.website.value) { success(); return; }

      if (!CONTACT_ENDPOINT) {
        if (local) success();
        else fail("Le formulaire est momentanément indisponible.");
        return;
      }
      if (submit) submit.disabled = true;
      if (submitLabel) submitLabel.textContent = "Envoi en cours…";
      fetch(CONTACT_ENDPOINT, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (res) { if (!res.ok) throw new Error(); success(); })
        .catch(function () {
          if (submit) submit.disabled = false;
          if (submitLabel) submitLabel.textContent = "Envoyer mon message";
          fail("L’envoi a échoué.");
        });
    });
  }
})();
