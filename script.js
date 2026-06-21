/* =====================================================
   RE.vive — interactions
   ===================================================== */

(() => {
  /* --------------------------
     Year in footer
     -------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --------------------------
     Cookie consent
     -------------------------- */
  const COOKIE_KEY = "revive_cookie_consent_v1";
  const COOKIE_TTL_DAYS = 365;

  const readConsent = () => {
    try {
      const raw = localStorage.getItem(COOKIE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      const ageDays = (Date.now() - data.ts) / (1000 * 60 * 60 * 24);
      if (ageDays > COOKIE_TTL_DAYS) {
        localStorage.removeItem(COOKIE_KEY);
        return null;
      }
      return data;
    } catch (_) { return null; }
  };
  const writeConsent = (level) => {
    try {
      localStorage.setItem(COOKIE_KEY, JSON.stringify({ level, ts: Date.now() }));
    } catch (_) {}
  };

  const ensureCookieBanner = () => {
    let el = document.getElementById("cookieBanner");
    if (el) return el;
    const html = `
      <button type="button" class="cookie-banner__close" id="cookieClose" aria-label="Cerrar y guardar solo cookies técnicas">
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
          <path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/>
        </svg>
      </button>
      <div class="cookie-banner__head">
        <span class="cookie-banner__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21.6 12.4a9 9 0 1 1-9.5-9.4 4 4 0 0 0 4 4 4 4 0 0 0 4 4 4 4 0 0 0 1.5-.6"/>
            <circle cx="8" cy="14" r="0.8" fill="currentColor"/>
            <circle cx="14" cy="16.5" r="0.8" fill="currentColor"/>
            <circle cx="11" cy="10" r="0.8" fill="currentColor"/>
            <circle cx="16.5" cy="11.5" r="0.8" fill="currentColor"/>
          </svg>
        </span>
        <h3 class="cookie-banner__title">Cuidamos tu privacidad.</h3>
      </div>
      <p class="cookie-banner__text">
        Usamos cookies técnicas para que la web funcione y, con tu permiso, cookies analíticas para entender cómo se usa y mejorarla. Tú decides. Más info en nuestra <a href="cookies.html">política de cookies</a>.
      </p>
      <div class="cookie-banner__actions">
        <button type="button" class="btn btn--primary" data-cookie-accept><span>Aceptar todas</span></button>
        <div class="cookie-banner__row">
          <button type="button" class="btn btn--ghost" data-cookie-reject><span>Solo técnicas</span></button>
          <a href="cookies.html" class="btn btn--ghost"><span>Configurar</span></a>
        </div>
      </div>`;
    el = document.createElement("aside");
    el.className = "cookie-banner";
    el.id = "cookieBanner";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-live", "polite");
    el.setAttribute("aria-label", "Aviso de cookies");
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = html;
    document.body.appendChild(el);
    return el;
  };

  const banner = ensureCookieBanner();

  const openBanner = () => {
    banner.classList.add("is-open");
    banner.setAttribute("aria-hidden", "false");
    document.body.classList.add("has-cookie-banner");
  };
  const closeBanner = () => {
    banner.classList.remove("is-open");
    banner.setAttribute("aria-hidden", "true");
    document.body.classList.remove("has-cookie-banner");
  };

  const handleConsent = (level) => {
    writeConsent(level);
    closeBanner();
    document.dispatchEvent(new CustomEvent("revive:consent", { detail: { level } }));
  };

  banner.addEventListener("click", (e) => {
    const t = e.target.closest("[data-cookie-accept], [data-cookie-reject], #cookieClose");
    if (!t) return;
    if (t.matches("[data-cookie-accept]")) handleConsent("all");
    else if (t.matches("[data-cookie-reject]")) handleConsent("essential");
    else if (t.id === "cookieClose") handleConsent("essential");
  });

  document.querySelectorAll("[data-cookie-reopen]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openBanner();
    });
  });

  if (!readConsent()) {
    setTimeout(openBanner, 800);
  }

  /* --------------------------
     Sticky nav (background on scroll)
     -------------------------- */
  const nav = document.getElementById("nav");
  const onScroll = () => {
    if (window.scrollY > 24) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* --------------------------
     Mobile CTA scroll — land on the form, not the section heading
     -------------------------- */
  const formWrap = document.getElementById("contacto-form");
  if (formWrap) {
    document.querySelectorAll('[href="#contacto"]').forEach(link => {
      link.addEventListener("click", e => {
        if (window.innerWidth > 768) return;
        e.preventDefault();
        const navHeight = document.getElementById("nav")?.offsetHeight ?? 64;
        const top = formWrap.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top, behavior: "smooth" });
      });
    });
  }

  /* --------------------------
     Mobile menu
     -------------------------- */
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMenu = () => {
    burger.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };
  const openMenu = () => {
    burger.setAttribute("aria-expanded", "true");
    mobileMenu.classList.add("is-open");
    mobileMenu.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  burger.addEventListener("click", () => {
    if (mobileMenu.classList.contains("is-open")) closeMenu();
    else openMenu();
  });
  mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));

  /* --------------------------
     Reveal on scroll
     -------------------------- */
  const revealEls = document.querySelectorAll(".reveal");
  revealEls.forEach(el => {
    const delay = el.dataset.delay;
    if (delay) el.style.setProperty("--reveal-delay", `${delay}ms`);
  });

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("is-in"));
  }

  /* --------------------------
     Before / After slider
     -------------------------- */
  const baSlider = document.getElementById("baSlider");
  if (baSlider) {
    const afterWrap = baSlider.querySelector(".ba-slider__after-wrap");
    const handle = baSlider.querySelector(".ba-slider__handle");
    let dragging = false;
    let currentPct = 50;
    let targetPct = 50;
    let raf = null;

    const setSlider = (pct) => {
      pct = Math.max(2, Math.min(98, pct));
      afterWrap.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      handle.style.left = pct + "%";
      baSlider.setAttribute("aria-valuenow", String(Math.round(pct)));
    };

    const animate = () => {
      currentPct += (targetPct - currentPct) * 0.18;
      setSlider(currentPct);
      if (Math.abs(targetPct - currentPct) > 0.05) {
        raf = requestAnimationFrame(animate);
      } else {
        currentPct = targetPct;
        setSlider(currentPct);
        raf = null;
      }
    };

    const updateFromX = (clientX) => {
      const rect = baSlider.getBoundingClientRect();
      targetPct = ((clientX - rect.left) / rect.width) * 100;
      if (!raf) raf = requestAnimationFrame(animate);
    };

    // Pointer events handle mouse + touch uniformly
    baSlider.addEventListener("pointerdown", (e) => {
      dragging = true;
      baSlider.setPointerCapture(e.pointerId);
      updateFromX(e.clientX);
    });
    baSlider.addEventListener("pointermove", (e) => {
      if (!dragging) {
        // Hover preview — soft follow
        if (e.pointerType === "mouse") updateFromX(e.clientX);
        return;
      }
      updateFromX(e.clientX);
    });
    const stop = (e) => {
      if (!dragging) return;
      dragging = false;
      try { baSlider.releasePointerCapture(e.pointerId); } catch (_) {}
    };
    baSlider.addEventListener("pointerup",     stop);
    baSlider.addEventListener("pointercancel", stop);
    baSlider.addEventListener("pointerleave",  () => { /* keep position */ });

    // Keyboard accessibility
    baSlider.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft")       { targetPct = Math.max(2, targetPct - 4);  if (!raf) raf = requestAnimationFrame(animate); }
      else if (e.key === "ArrowRight") { targetPct = Math.min(98, targetPct + 4); if (!raf) raf = requestAnimationFrame(animate); }
      else if (e.key === "Home")       { targetPct = 2;  if (!raf) raf = requestAnimationFrame(animate); }
      else if (e.key === "End")        { targetPct = 98; if (!raf) raf = requestAnimationFrame(animate); }
    });

    // Init
    setSlider(50);

    // Subtle teaser after section enters viewport
    if ("IntersectionObserver" in window) {
      const teaser = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Animate from 50 → 30 → 70 → 50
            const seq = [50, 32, 68, 50];
            let i = 0;
            const step = () => {
              if (i >= seq.length) return;
              targetPct = seq[i++];
              if (!raf) raf = requestAnimationFrame(animate);
              setTimeout(step, 900);
            };
            setTimeout(step, 600);
            teaser.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      teaser.observe(baSlider);
    }
  }

  /* --------------------------
     Formulario de contacto
     -------------------------- */
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");
  const formSubmit  = document.getElementById("formSubmit");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Basic client-side validation: highlight empty required fields
      let valid = true;
      contactForm.querySelectorAll("[required]").forEach(field => {
        const empty = field.type === "radio"
          ? !contactForm.querySelector(`[name="${field.name}"]:checked`)
          : !field.value.trim();
        field.classList.toggle("is-invalid", empty);
        if (empty) valid = false;
      });
      if (!valid) return;

      const btnLabel = formSubmit.querySelector("span");
      formSubmit.disabled = true;
      btnLabel.textContent = "Enviando…";

      try {
        const formData = new FormData(contactForm);
        const payload = {
          nombre:       (formData.get("nombre") || "").trim(),
          email:        (formData.get("email") || "").trim(),
          ubicacion:    (formData.get("ubicacion") || "").trim(),
          edad:         parseInt(formData.get("edad"), 10) || 0,
          objetivo:     (formData.get("objetivo") || "").trim(),
          experiencia:  formData.get("experiencia") || "",
          expectativas: (formData.get("expectativas") || "").trim(),
          whatsapp:     (formData.get("whatsapp") || "").trim(),
          // Honeypot: se incluye para que el servidor pueda rechazar bots
          website:      (formData.get("website") || "").trim(),
        };

        // La URL es relativa (/api/contact) — nunca exponemos el webhook real
        const res = await fetch(contactForm.action, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            "Accept":       "application/json",
          },
        });
        if (res.ok) {
          if (typeof fbq === "function") {
            fbq("track", "Lead");
            fbq("track", "Contact");
          }
          btnLabel.textContent = "¡Enviado!";
          setTimeout(() => {
            contactForm.hidden = true;
            formSuccess.hidden = false;
            window.scrollTo({
              top: contactForm.closest("section").offsetTop - 100,
              behavior: "smooth"
            });
          }, 400);
        } else {
          throw new Error();
        }
      } catch {
        formSubmit.disabled = false;
        btnLabel.textContent = "Enviar solicitud";
        alert("Hubo un problema al enviar. Por favor, inténtalo de nuevo en unos minutos.");
      }
    });

    // Clear invalid state on input / change
    contactForm.querySelectorAll("input, textarea").forEach(field => {
      field.addEventListener("input", () => field.classList.remove("is-invalid"));
    });
    contactForm.querySelectorAll("input[type='radio']").forEach(radio => {
      radio.addEventListener("change", () => {
        contactForm.querySelectorAll(`[name="${radio.name}"]`).forEach(r => r.classList.remove("is-invalid"));
      });
    });
  }

  /* --------------------------
     Carousel de Cambios (Antes / Después) - Manual Navigation
     -------------------------- */
  const track = document.getElementById("cambiosTrack");
  const viewport = document.getElementById("cambiosViewport");
  const prevBtn = document.getElementById("cambiosPrev");
  const nextBtn = document.getElementById("cambiosNext");

  if (track && viewport) {
    const cards = track.querySelectorAll(".cambios-card");
    const totalCards = cards.length;
    let currentIndex = 0;

    const getMetrics = () => {
      const viewportW = viewport.offsetWidth;
      const cardW = cards[0].offsetWidth;
      const gap = 16;
      const step = cardW + gap;
      const visibleCards = Math.floor(viewportW / step) || 1;
      const maxIndex = Math.max(0, totalCards - visibleCards);
      return { step, visibleCards, maxIndex };
    };

    const updateArrows = () => {
      const { maxIndex } = getMetrics();
      if (prevBtn) prevBtn.disabled = currentIndex <= 0;
      if (nextBtn) nextBtn.disabled = currentIndex >= maxIndex;
    };

    const slideTo = (index) => {
      const { step, maxIndex } = getMetrics();
      currentIndex = Math.max(0, Math.min(index, maxIndex));
      
      // Ensure smooth transition for snaps
      track.style.transition = "transform 0.6s var(--ease)";
      track.style.transform = `translateX(-${currentIndex * step}px)`;
      
      updateArrows();
    };

    // Manual navigation (Arrows)
    if (prevBtn) prevBtn.addEventListener("click", () => slideTo(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => slideTo(currentIndex + 1));

    // Touch / pointer drag for manual swiping
    let dragStartX = 0;
    let dragDelta = 0;
    let isDragging = false;

    track.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      isDragging = true;
      dragStartX = e.clientX;
      dragDelta = 0;
      track.classList.add("is-dragging"); // disables transition in CSS
      track.setPointerCapture(e.pointerId);
    });

    track.addEventListener("pointermove", (e) => {
      if (!isDragging) return;
      dragDelta = e.clientX - dragStartX;
      const { step } = getMetrics();
      const baseOffset = currentIndex * step;
      track.style.transform = `translateX(${-baseOffset + dragDelta}px)`;
    });

    const endDrag = (e) => {
      if (!isDragging) return;
      isDragging = false;
      track.classList.remove("is-dragging");
      try { track.releasePointerCapture(e.pointerId); } catch (_) {}

      const threshold = 60; // minimum drag to trigger slide change
      if (dragDelta < -threshold) slideTo(currentIndex + 1);
      else if (dragDelta > threshold) slideTo(currentIndex - 1);
      else slideTo(currentIndex); // snap back
    };

    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);
    
    // Prevent default image drag
    track.addEventListener("dragstart", (e) => e.preventDefault());

    // Init + responsive recalc
    const initCarousel = () => { slideTo(currentIndex); };
    initCarousel();

    let resizeCarouselTO;
    window.addEventListener("resize", () => {
      clearTimeout(resizeCarouselTO);
      resizeCarouselTO = setTimeout(initCarousel, 150);
    });
  }

  /* --------------------------
     Testimonios — marquee drag + auto-scroll
     -------------------------- */
  const testiMarquee = document.querySelector('.testi-marquee');
  const testiTrack   = document.querySelector('.testi-marquee__track');

  if (testiMarquee && testiTrack &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {

    testiTrack.style.animation = 'none';

    const SPEED = 0.42;
    let pos        = 0;
    let halfWidth  = 0;
    let dragging   = false;
    let dragStartX = 0;
    let dragStartPos = 0;

    const measure = () => { halfWidth = testiTrack.scrollWidth / 2; };
    measure();
    window.addEventListener('resize', measure, { passive: true });

    const normalize = (x) => {
      while (x > 0)          x -= halfWidth;
      while (x <= -halfWidth) x += halfWidth;
      return x;
    };

    const tick = () => {
      if (!dragging) {
        pos -= SPEED;
        pos = normalize(pos);
      }
      testiTrack.style.transform = `translate3d(${pos}px, 0, 0)`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    testiMarquee.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      dragging     = true;
      dragStartX   = e.clientX;
      dragStartPos = pos;
      testiMarquee.classList.add('is-dragging');
      testiMarquee.setPointerCapture(e.pointerId);
      e.preventDefault();
    });

    testiMarquee.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      pos = normalize(dragStartPos + (e.clientX - dragStartX));
    });

    const endDrag = () => {
      if (!dragging) return;
      dragging = false;
      testiMarquee.classList.remove('is-dragging');
    };
    testiMarquee.addEventListener('pointerup',     endDrag);
    testiMarquee.addEventListener('pointercancel', endDrag);

    // Drag hint — show once when section enters view, hide on first drag
    const hint = document.getElementById('testiDragHint');
    if (hint) {
      let hintShown = false;
      let hintTimer;
      const hideHint = () => {
        hint.classList.remove('is-visible');
        clearTimeout(hintTimer);
      };
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hintShown) {
            hintShown = true;
            hintTimer = setTimeout(() => {
              hint.classList.add('is-visible');
              hintTimer = setTimeout(hideHint, 2800);
            }, 900);
            io.disconnect();
          }
        });
      }, { threshold: 0.4 });
      io.observe(testiMarquee);
      testiMarquee.addEventListener('pointerdown', hideHint, { once: true });
    }
  }

  /* --------------------------
     WhatsApp floating bubble — appear after scroll
     -------------------------- */
  const waBubble = document.getElementById("waBubble");
  if (waBubble) {
    const WA_PHONE = "34674054290";
    const WA_TEXT  = "Hola Valeria 💕 Me gustaría recibir información sobre las asesorías.";

    waBubble.addEventListener("click", (e) => {
      e.preventDefault();
      const url = "https://api.whatsapp.com/send?phone=" + WA_PHONE +
                  "&text=" + encodeURIComponent(WA_TEXT);
      window.open(url, "_blank", "noopener,noreferrer");
    });

    const SCROLL_THRESHOLD = 320;
    const onWaScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) waBubble.classList.add("is-visible");
      else waBubble.classList.remove("is-visible");
    };
    window.addEventListener("scroll", onWaScroll, { passive: true });
    onWaScroll();
  }

  /* --------------------------
     Sticky mobile CTA bar
     -------------------------- */
  const mobileCta = document.getElementById("mobileCta");
  if (mobileCta) {
    const heroCtas  = document.querySelector(".hero__ctas");
    const contactEl = document.getElementById("contacto");
    let heroPast    = false;
    let contactNear = false;
    const setBar = () => {
      const show = heroPast && !contactNear;
      mobileCta.classList.toggle("is-visible", show);
      mobileCta.setAttribute("aria-hidden", show ? "false" : "true");
      document.body.classList.toggle("has-mobile-cta", show);
    };
    if (heroCtas) {
      new IntersectionObserver(([e]) => { heroPast = !e.isIntersecting; setBar(); }, { threshold: 0 })
        .observe(heroCtas);
    }
    if (contactEl) {
      new IntersectionObserver(([e]) => { contactNear = e.isIntersecting; setBar(); }, { rootMargin: "0px 0px -10% 0px", threshold: 0 })
        .observe(contactEl);
    }
  }

  /* --------------------------
     Aurora animated background (canvas)
     -------------------------- */
  const canvas = document.getElementById("aurora");
  if (canvas && window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
    const ctx = canvas.getContext("2d", { alpha: true });

    const isMobile = matchMedia("(max-width: 720px)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.75);

    let W = 0, H = 0;
    const blobs = [];

    const palette = [
      { r: 255, g: 141, b: 210, a: 0.55 }, // pink
      { r: 255, g: 201, b: 232, a: 0.45 }, // pink soft
      { r: 185, g:  18, b:  18, a: 0.35 }, // red
      { r: 230, g:  69, b:  69, a: 0.30 }, // red soft
      { r: 255, g: 141, b: 210, a: 0.40 },
    ];

    const sparkles = [];

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width  = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Re-seed blobs
      blobs.length = 0;
      const count = isMobile ? 4 : 6;
      for (let i = 0; i < count; i++) {
        const c = palette[i % palette.length];
        blobs.push({
          x: Math.random() * W,
          y: Math.random() * H,
          baseX: Math.random() * W,
          baseY: Math.random() * H,
          r: 220 + Math.random() * (isMobile ? 220 : 360),
          color: c,
          phase: Math.random() * Math.PI * 2,
          speed: 0.00015 + Math.random() * 0.00025,
          ampX: 80 + Math.random() * 160,
          ampY: 80 + Math.random() * 160,
          tx: 0, ty: 0, // mouse offset target
          ox: 0, oy: 0, // mouse offset current
        });
      }

      // Re-seed sparkles
      sparkles.length = 0;
      const sCount = isMobile ? 14 : 26;
      for (let i = 0; i < sCount; i++) {
        sparkles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: 0.6 + Math.random() * 1.4,
          a: 0.2 + Math.random() * 0.6,
          vy: 0.05 + Math.random() * 0.15,
          twinkle: Math.random() * Math.PI * 2,
        });
      }
    };

    // Mouse parallax (very subtle, eased)
    let mx = 0.5, my = 0.5;
    window.addEventListener("pointermove", (e) => {
      mx = e.clientX / window.innerWidth;
      my = e.clientY / window.innerHeight;
    }, { passive: true });

    let last = performance.now();
    const draw = (now) => {
      const dt = Math.min(64, now - last);
      last = now;

      // Cream wash base
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#FFF0EF";
      ctx.fillRect(0, 0, W, H);

      // Blobs — additive blending for aurora glow
      ctx.globalCompositeOperation = "lighter";

      blobs.forEach((b, i) => {
        b.phase += b.speed * dt;
        // organic movement with two-frequency lissajous
        const dx = Math.sin(b.phase) * b.ampX + Math.cos(b.phase * 0.62) * (b.ampX * 0.4);
        const dy = Math.cos(b.phase * 0.78) * b.ampY + Math.sin(b.phase * 0.43) * (b.ampY * 0.45);

        // mouse parallax target — alternating directions per blob for depth
        const dir = i % 2 === 0 ? 1 : -1;
        b.tx = (mx - 0.5) * 60 * dir;
        b.ty = (my - 0.5) * 60 * dir;
        b.ox += (b.tx - b.ox) * 0.04;
        b.oy += (b.ty - b.oy) * 0.04;

        b.x = b.baseX + dx + b.ox;
        b.y = b.baseY + dy + b.oy;

        const grd = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        const c = b.color;
        grd.addColorStop(0,    `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`);
        grd.addColorStop(0.45, `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a * 0.4})`);
        grd.addColorStop(1,    `rgba(${c.r}, ${c.g}, ${c.b}, 0)`);

        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Sparkles (drift up, twinkle)
      ctx.globalCompositeOperation = "lighter";
      sparkles.forEach(s => {
        s.y -= s.vy;
        s.twinkle += 0.02;
        if (s.y < -10) { s.y = H + 10; s.x = Math.random() * W; }
        const tw = (Math.sin(s.twinkle) + 1) * 0.5;
        ctx.fillStyle = `rgba(255, 255, 255, ${s.a * (0.4 + tw * 0.6)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * (0.8 + tw * 0.4), 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = "source-over";

      requestAnimationFrame(draw);
    };

    resize();
    requestAnimationFrame(draw);

    let resizeTO;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTO);
      resizeTO = setTimeout(resize, 120);
    });
  } else if (canvas) {
    // Reduced-motion fallback: single soft gradient
    const ctx = canvas.getContext("2d");
    const W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;
    const grd = ctx.createRadialGradient(W*0.3, H*0.4, 0, W*0.3, H*0.4, W*0.7);
    grd.addColorStop(0, "rgba(255, 141, 210, 0.35)");
    grd.addColorStop(1, "rgba(255, 240, 239, 0)");
    ctx.fillStyle = "#FFF0EF"; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = grd; ctx.fillRect(0, 0, W, H);
  }
})();
