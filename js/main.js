/* ============================================
   ESMA BEAUTY STUDIO - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // PRELOADER
    // ============================================
    var preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(function() {
            preloader.classList.add('hidden');
            document.body.classList.remove('no-scroll');
        }, 2200);
        // Fallback
        setTimeout(function() {
            preloader.classList.add('hidden');
            document.body.classList.remove('no-scroll');
        }, 3500);
    }

    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    var header = document.getElementById('header');

    function handleHeaderScroll() {
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });

    // ============================================
    // MOBILE MENU
    // ============================================
    var burgerBtn = document.getElementById('burgerBtn');
    var mobileMenu = document.getElementById('mobileMenu');
    var mobileClose = document.getElementById('mobileClose');
    var mobileLinks = document.querySelectorAll('.mobile-menu__link');

    function openMobileMenu() {
        mobileMenu.classList.add('open');
        document.body.classList.add('no-scroll');
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('open');
        document.body.classList.remove('no-scroll');
    }

    if (burgerBtn) burgerBtn.addEventListener('click', openMobileMenu);
    if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);

    for (var i = 0; i < mobileLinks.length; i++) {
        mobileLinks[i].addEventListener('click', closeMobileMenu);
    }

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    var anchors = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < anchors.length; i++) {
        anchors[i].addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href === '#') return;
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                var headerHeight = header.offsetHeight;
                var pos = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
                window.scrollTo({ top: pos, behavior: 'smooth' });
            }
        });
    }

    // ============================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ============================================
    var animatedEls = document.querySelectorAll('[data-animate]');

    var animObserver = new IntersectionObserver(function(entries) {
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
                var el = entries[i].target;
                var delay = el.getAttribute('data-delay') || 0;
                (function(element, d) {
                    setTimeout(function() {
                        element.classList.add('animated');
                    }, parseInt(d));
                })(el, delay);
                animObserver.unobserve(el);
            }
        }
    }, { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

    for (var i = 0; i < animatedEls.length; i++) {
        animObserver.observe(animatedEls[i]);
    }

    // ============================================
    // SERVICES ACCORDION
    // ============================================
    var accordionHeaders = document.querySelectorAll('[data-accordion]');

    for (var i = 0; i < accordionHeaders.length; i++) {
        accordionHeaders[i].addEventListener('click', function() {
            var body = this.nextElementSibling;
            var isActive = this.classList.contains('active');

            // Close all
            for (var j = 0; j < accordionHeaders.length; j++) {
                accordionHeaders[j].classList.remove('active');
                var b = accordionHeaders[j].nextElementSibling;
                if (b) b.classList.remove('open');
            }

            // Toggle
            if (!isActive) {
                this.classList.add('active');
                if (body) body.classList.add('open');
            }
        });
    }

    // Open first by default
    if (accordionHeaders.length > 0) {
        accordionHeaders[0].classList.add('active');
        var firstBody = accordionHeaders[0].nextElementSibling;
        if (firstBody) firstBody.classList.add('open');
    }

    // ============================================
    // FAQ ACCORDION
    // ============================================
    var faqButtons = document.querySelectorAll('[data-faq]');

    for (var i = 0; i < faqButtons.length; i++) {
        faqButtons[i].addEventListener('click', function() {
            var item = this.parentElement;
            var isActive = item.classList.contains('active');

            var allItems = document.querySelectorAll('.faq__item');
            for (var j = 0; j < allItems.length; j++) {
                allItems[j].classList.remove('active');
            }

            if (!isActive) {
                item.classList.add('active');
            }
        });
    }

    // ============================================
    // TEAM CAROUSEL
    // ============================================
    var teamPrev = document.getElementById('teamPrev');
    var teamNext = document.getElementById('teamNext');
    var seniorTrack = document.querySelector('#teamCarouselSenior .team__carousel-track');
    var seniorMembers = seniorTrack ? seniorTrack.querySelectorAll('.team__member') : [];
    var seniorIndex = 0;

    function updateSeniorCarousel() {
        if (!seniorTrack || seniorMembers.length === 0) return;
        var memberWidth = seniorMembers[0].offsetWidth + 24;
        seniorTrack.style.transform = 'translateX(-' + (seniorIndex * memberWidth) + 'px)';
    }

    function getSeniorMax() {
        if (!seniorTrack || seniorMembers.length === 0) return 0;
        var containerWidth = seniorTrack.parentElement.offsetWidth;
        var memberWidth = seniorMembers[0].offsetWidth + 24;
        var visible = Math.floor(containerWidth / memberWidth) || 1;
        return Math.max(0, seniorMembers.length - visible);
    }

    if (teamPrev) {
        teamPrev.addEventListener('click', function() {
            seniorIndex = Math.max(0, seniorIndex - 1);
            updateSeniorCarousel();
        });
    }

    if (teamNext) {
        teamNext.addEventListener('click', function() {
            seniorIndex = Math.min(getSeniorMax(), seniorIndex + 1);
            updateSeniorCarousel();
        });
    }

    window.addEventListener('resize', function() {
        seniorIndex = Math.min(seniorIndex, getSeniorMax());
        updateSeniorCarousel();
    });

    // ============================================
    // GALLERY FILTER - FIXED
    // ============================================
    var filterBtns = document.querySelectorAll('.gallery__filter');
    var galleryItems = document.querySelectorAll('.gallery__item');

    for (var i = 0; i < filterBtns.length; i++) {
        filterBtns[i].addEventListener('click', function() {
            var filter = this.getAttribute('data-filter');

            // Update active btn
            for (var j = 0; j < filterBtns.length; j++) {
                filterBtns[j].classList.remove('gallery__filter--active');
            }
            this.classList.add('gallery__filter--active');

            // Show/hide items
            for (var k = 0; k < galleryItems.length; k++) {
                var cat = galleryItems[k].getAttribute('data-category');
                if (filter === 'all' || cat === filter) {
                    galleryItems[k].style.display = '';
                } else {
                    galleryItems[k].style.display = 'none';
                }
            }
        });
    }

    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    var backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 600) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }, { passive: true });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================================
    // BOOKING FORM HANDLER
    // ============================================
    var bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var nameInput = bookingForm.querySelector('input[type="text"]');
            var btn = bookingForm.querySelector('.btn');
            var btnSpan = btn.querySelector('span');
            var originalText = btnSpan.textContent;

            btnSpan.textContent = 'Thank you, ' + nameInput.value + '!';
            btn.style.background = '#4a7c59';
            btn.style.borderColor = '#4a7c59';

            setTimeout(function() {
                btnSpan.textContent = originalText;
                btn.style.background = '';
                btn.style.borderColor = '';
                bookingForm.reset();
            }, 3000);
        });
    }

    // ============================================
    // HERO ENTRANCE ANIMATION
    // ============================================
    var heroTitle = document.querySelector('.hero__title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        setTimeout(function() {
            heroTitle.style.transition = 'opacity 1s ease, transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 2400);
    }

    var heroContent = document.querySelector('.hero__content');
    if (heroContent) {
        var children = heroContent.children;
        for (var i = 0; i < children.length; i++) {
            if (children[i] === heroTitle) continue;
            children[i].style.opacity = '0';
            children[i].style.transform = 'translateY(20px)';
            (function(child, index) {
                setTimeout(function() {
                    child.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, 2600 + (index * 150));
            })(children[i], i);
        }
    }

    // ============================================
    // COUNTER ANIMATION FOR STATS
    // ============================================
    var statNumbers = document.querySelectorAll('.hero__stat-number');

    var statsObserver = new IntersectionObserver(function(entries) {
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
                var el = entries[i].target;
                var text = el.textContent;
                var number = parseInt(text);
                var suffix = text.replace(/[0-9]/g, '');

                if (!isNaN(number)) {
                    var current = 0;
                    var increment = number / 40;
                    var timer = setInterval((function(element, target, suf) {
                        return function() {
                            current += increment;
                            if (current >= target) {
                                current = target;
                                clearInterval(timer);
                            }
                            element.textContent = Math.floor(current) + suf;
                        };
                    })(el, number, suffix), 40);
                }
                statsObserver.unobserve(el);
            }
        }
    }, { threshold: 0.5 });

    for (var i = 0; i < statNumbers.length; i++) {
        statsObserver.observe(statNumbers[i]);
    }

    // ============================================
    // ACTIVE NAV HIGHLIGHT ON SCROLL
    // ============================================
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.header__nav-link');

    window.addEventListener('scroll', function() {
        var scrollY = window.scrollY + 200;
        for (var i = 0; i < sections.length; i++) {
            var top = sections[i].offsetTop;
            var height = sections[i].offsetHeight;
            var id = sections[i].getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                for (var j = 0; j < navLinks.length; j++) {
                    navLinks[j].classList.remove('active');
                    if (navLinks[j].getAttribute('href') === '#' + id) {
                        navLinks[j].classList.add('active');
                    }
                }
            }
        }
    }, { passive: true });

});
