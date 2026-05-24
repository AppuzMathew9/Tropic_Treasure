document.addEventListener('DOMContentLoaded', () => {

    // 0. FORCE SCROLL RECOVERY
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // 1. Smooth Scrolling (Lenis)
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        mouseMultiplier: 1,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 1.5. Navbar Scroll Logic
    const navbar = document.querySelector('#navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            opacity: 1,
            duration: 0.15,
            ease: 'power2.out'
        });
    });

    // 0. Artistic Depth & Parallax
    const arrows = document.querySelectorAll('.arr-left, .arr-right');
    arrows.forEach(arr => {
        arr.addEventListener('mouseenter', () => gsap.to(arr, { scale: 1.3, color: '#b8860b', duration: 0.3 }));
        arr.addEventListener('mouseleave', () => gsap.to(arr, { scale: 1, color: 'rgba(0,0,0,0.15)', duration: 0.3 }));
    });

    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) * 0.05;
        const y = (e.clientY - window.innerHeight / 2) * 0.05;
        
        gsap.to('.hero-floating-element.item-1', { x: x * 0.5, y: y * 0.5, duration: 0.8 });
        gsap.to('.hero-floating-element.item-2', { x: -x * 0.8, y: -y * 0.8, duration: 1 });
        gsap.to('.hero-floating-element.item-3', { x: x * 0.3, y: -y * 0.4, duration: 1.2 });
    });

    gsap.to('.hero-bg-text', {
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        x: -200,
        opacity: 0.05
    });

    // 1. Hero Slider Logic
    const slidesData = [
        {
            tag: 'Wayanad, Kerala',
            title: 'GINGER <br> POWDER',
            desc: 'Sourced from the mist-covered foothills of Kerala. Our ginger is sun-dried and naturally grown to preserve its intense warmth and medicinal purity.',
            img: 'assets/pouch_ginger.png',
            side: 'assets/ginger.png'
        },
        {
            tag: 'Idukki, Kerala',
            title: 'GREEN <br> CARDAMOM',
            desc: 'The "Queen of Spices" from Kerala. Hand-picked at the perfect maturity, our cardamom pods pack an unparalleled aromatic punch.',
            img: 'assets/pouch_cardamom.png',
            side: 'assets/cardamom.png'
        },
        {
            tag: 'Kollam, Kerala',
            title: 'PREMIUM <br> CASHEWS',
            desc: 'Whole, organic cashews processed with traditional care. A creamy, mineral-rich snack directly from the coastal groves of Kollam.',
            img: 'assets/pouch_cashew_green.png',
            side: 'assets/cashew.png'
        },
        {
            tag: 'Nilgiri, Kerala',
            title: 'CEYLON <br> CINNAMON',
            desc: 'True Ceylon cinnamon sticks, hand-rolled and sun-cured. A delicate, sweet aroma that defines the luxury of Kerala spice trade.',
            img: 'assets/pouch_cinnamon.png',
            side: 'assets/cinnamon.png'
        },
        {
            tag: 'Malabar Coast, Kerala',
            title: 'BLACK <br> PEPPER',
            desc: 'The "Black Gold" of Malabar. Tellicherry-grade black pepper, celebrated globally for its bold heat and complex herbal notes.',
            img: 'assets/pouch_pepper.png',
            side: 'assets/pepper.png'
        },
        {
            tag: 'Export Quality',
            title: 'ROASTED <br> CASHEWS',
            desc: 'Slow-roasted to perfection. A versatile trade favorite, bridging the rich soils of Kerala with the global snack market.',
            img: 'assets/pouch_cashew_beige.png',
            side: 'assets/f_cashew.png'
        }
    ];

    let currentSlide = 0;
    let isAnimating = false; // PERFORMANCE FLAG
    const heroContent = document.querySelector('.hero-content');
    const heroTitle = document.querySelector('.slide-title');
    const heroTag = document.querySelector('.slide-tag');
    const heroDesc = document.querySelector('.slide-p');
    const heroPouch = document.querySelector('.pouch-img-big');
    const heroCircle = document.querySelector('.side-circle-img img');
    const dots = document.querySelectorAll('.dot');
    const nextBtn = document.querySelector('.arr-right');
    const prevBtn = document.querySelector('.arr-left');

    if (heroContent && heroTitle) {
        function updateSlide(idx) {
            if (isAnimating) return; // Stop the 'hang' overlap
            isAnimating = true;

            const data = slidesData[idx];
            const tl = gsap.timeline({
                onComplete: () => { isAnimating = false; }
            });

            // 1. Fast, Smooth Sweep Out
            tl.to(heroContent, { 
                opacity: 0, 
                x: -30, 
                scale: 0.98, 
                duration: 0.4, 
                ease: 'power2.in',
                overwrite: true 
            });

            // 2. Instantaneous Content Swap
            tl.add(() => {
                if (heroTag) heroTag.innerHTML = data.tag;
                if (heroTitle) heroTitle.innerHTML = data.title;
                if (heroDesc) heroDesc.innerHTML = data.desc;
                if (heroPouch) heroPouch.src = data.img;
                if (heroCircle) heroCircle.src = data.side;
                
                if (dots.length > 0) {
                    dots.forEach(d => d.classList.remove('active'));
                    if (dots[idx]) dots[idx].classList.add('active');
                }
            });

            // 3. Cinematic High-Performance Reveal
            tl.fromTo(heroContent, { opacity: 0, x: 50, scale: 1.02 }, { 
                opacity: 1, 
                x: 0, 
                scale: 1, 
                duration: 0.8, 
                ease: 'power3.out' 
            });
            
            // Tiered reveals for all 6 flags
            gsap.fromTo(heroTitle, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: 'expo.out' });
            if (heroPouch) gsap.fromTo(heroPouch, { opacity: 0, x: 60, scale: 0.9 }, { opacity: 1, x: 0, scale: 1, duration: 1.4, delay: 0.1, ease: 'expo.out' });
            if (heroCircle) gsap.fromTo('.side-circle-img', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 1.2, delay: 0.3, ease: 'back.out(1.2)' });
        }

        if (nextBtn) nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slidesData.length;
            updateSlide(currentSlide);
        });

        if (prevBtn) prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slidesData.length) % slidesData.length;
            updateSlide(currentSlide);
        });

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                currentSlide = i;
                updateSlide(currentSlide);
            });
        });

        // Auto Player (with long delay for initial wow)
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slidesData.length;
            updateSlide(currentSlide);
        }, 7000);
    }

    // 4. Reveal Animations (GSAP ScrollTrigger)
    
    // Soil to Soul Section
    gsap.from('.story-container', {
        scrollTrigger: {
            trigger: '.section-green-story',
            start: 'top 80%',
        },
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'expo.out'
    });

    gsap.from('.pillar', {
        scrollTrigger: {
            trigger: '.pillars-grid',
            start: 'top 90%',
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'expo.out'
    });

    // Product Grid
    gsap.from('.p-card', {
        scrollTrigger: {
            trigger: '.pouch-grid',
            start: 'top 90%',
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'expo.out'
    });

    // Conviction Cards
    gsap.from('.glass-card', {
        scrollTrigger: {
            trigger: '.glass-cards',
            start: 'top 90%',
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'expo.out'
    });

    // Parallax on Houseboat
    gsap.to('.conviction-bg img', {
        scrollTrigger: {
            trigger: '.section-conviction',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        },
        scale: 1.2,
        y: 100
    });

    // 5. Magnetic Hover Effect (Subtle)
    const magnets = document.querySelectorAll('.circle, .btn-buy, .nav-links-left a');
    magnets.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4 });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.4 });
        });
    });

});
