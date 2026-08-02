const roles = ["Web Developer", "CS Student", "Aspiring Full-Stack Developer", "Problem Solver"];
    const typedEl = document.getElementById('typed-role');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      typedEl.textContent = roles[0];
    } else {
      let roleIndex = 0, charIndex = 0, deleting = false;
      function typeLoop(){
        const current = roles[roleIndex];
        if (!deleting) {
          charIndex++;
          typedEl.textContent = current.slice(0, charIndex);
          if (charIndex === current.length) {
            deleting = true;
            setTimeout(typeLoop, 1400);
            return;
          }
        } else {
          charIndex--;
          typedEl.textContent = current.slice(0, charIndex);
          if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
          }
        }
        setTimeout(typeLoop, deleting ? 35 : 60);
      }
      typeLoop();
    }

    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => revealObserver.observe(el));

    const skillSheet = document.getElementById('skill-sheet');
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.bar-fill').forEach(bar => {
            bar.style.width = bar.dataset.percent + '%';
          });
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    if (skillSheet) skillObserver.observe(skillSheet);

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section[id], footer[id]');
    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const link = document.querySelector('.nav-link[href="#' + id + '"]');
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
    sections.forEach(sec => spyObserver.observe(sec));

    document.querySelectorAll('.project-card').forEach(card => {
      const links = card.querySelectorAll('.project-links a');
      let target = null;
      links.forEach(link => {
        if (!target || link.textContent.includes('Live Demo')) target = link;
      });
      if (!target) return;
      card.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        const href = target.getAttribute('href');
        if (!href || href === '#') return;
        window.open(href, '_blank');
      });
    });