/* =========================================================
   HASHTAG FITNESS — PREMIUM JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const header = document.querySelector(".header");
    const navbar = document.querySelector(".navbar");

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    const navItems = document.querySelectorAll(".nav-links a");

    const sections = document.querySelectorAll("main section[id]");

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".experience-card, " +
        ".feature, " +
        ".training-card, " +
        ".trainer-card, " +
        ".membership-card, " +
        ".testimonial, " +
        ".gallery-item, " +
        ".cafe-content, " +
        ".padel-content, " +
        ".app-content, " +
        ".location-content"
    );


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    function toggleMenu() {

        if (!menuToggle || !navLinks) return;

        const isOpen = navLinks.classList.toggle("active");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );
    }


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            toggleMenu
        );

    }


    /* =====================================================
       CLOSE MOBILE MENU
       WHEN NAV LINK IS CLICKED
    ===================================================== */

    navItems.forEach(link => {

        link.addEventListener("click", () => {

            if (!navLinks.classList.contains("active")) {
                return;
            }

            navLinks.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "menu-open"
            );

        });

    });


    /* =====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", event => {

        if (!navLinks || !menuToggle) return;

        const clickedInsideMenu =
            navLinks.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (
            navLinks.classList.contains("active") &&
            !clickedInsideMenu &&
            !clickedToggle
        ) {

            navLinks.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "menu-open"
            );

        }

    });


    /* =====================================================
       ESCAPE KEY CLOSES MOBILE MENU
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key !== "Escape") return;

        if (
            navLinks &&
            navLinks.classList.contains("active")
        ) {

            navLinks.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "menu-open"
            );

        }

    });


    /* =====================================================
       NAVBAR SCROLL STATE
    ===================================================== */

    let lastScrollY = window.scrollY;

    function handleNavbar() {

        if (!header) return;

        const currentScroll =
            window.scrollY;


        if (currentScroll > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }


        /*
         * Hide navbar when scrolling down.
         * Bring it back when scrolling up.
         */

        if (
            currentScroll > lastScrollY &&
            currentScroll > 180
        ) {

            header.classList.add("nav-hidden");

        } else {

            header.classList.remove("nav-hidden");

        }


        lastScrollY = currentScroll;

    }


    window.addEventListener(
        "scroll",
        handleNavbar,
        { passive: true }
    );


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const observerOptions = {
        root: null,

        rootMargin:
            "-35% 0px -55% 0px",

        threshold: 0
    };


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const currentId =
                        entry.target.getAttribute(
                            "id"
                        );


                    navItems.forEach(link => {

                        const href =
                            link.getAttribute("href");

                        link.classList.toggle(
                            "active",
                            href === `#${currentId}`
                        );

                    });

                });

            },
            observerOptions
        );


    sections.forEach(section => {

        sectionObserver.observe(section);

    });


    /* =====================================================
       PREMIUM REVEAL ANIMATIONS
    ===================================================== */

    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        entry.target.classList.add(
                            "revealed"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -60px 0px"
                }
            );


        revealElements.forEach(
            element => {

                element.classList.add(
                    "reveal"
                );

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "revealed"
                );

            }
        );

    }


    /* =====================================================
       STAGGERED CARD ANIMATIONS
    ===================================================== */

    const cardGroups = [

        ".experience-grid",

        ".training-grid",

        ".trainer-grid",

        ".membership-grid",

        ".testimonials",

        ".gallery"

    ];


    cardGroups.forEach(selector => {

        const group =
            document.querySelector(selector);

        if (!group) return;


        const cards =
            group.children;


        Array.from(cards).forEach(
            (card, index) => {

                card.style.setProperty(
                    "--delay",
                    `${index * 90}ms`
                );

            }
        );

    });


    /* =====================================================
       HERO IMAGE PARALLAX
    ===================================================== */

    const heroImage =
        document.querySelector(
            ".hero-media img"
        );


    const canUseParallax =
        window.matchMedia(
            "(prefers-reduced-motion: no-preference)"
        ).matches;


    if (
        heroImage &&
        canUseParallax &&
        window.innerWidth > 800
    ) {

        let ticking = false;


        function updateParallax() {

            const scroll =
                window.scrollY;

            const heroHeight =
                document.querySelector(
                    ".hero"
                )?.offsetHeight || 1;


            if (scroll <= heroHeight) {

                const movement =
                    scroll * 0.18;

                heroImage.style.transform =
                    `translate3d(0, ${movement}px, 0) scale(1.05)`;

            }


            ticking = false;

        }


        window.addEventListener(
            "scroll",
            () => {

                if (!ticking) {

                    window.requestAnimationFrame(
                        updateParallax
                    );

                    ticking = true;

                }

            },
            { passive: true }
        );

    }


    /* =====================================================
       SMOOTH ANCHOR NAVIGATION
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(anchor => {

        anchor.addEventListener(
            "click",
            event => {

                const targetId =
                    anchor.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                const headerHeight =
                    header?.offsetHeight || 0;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    headerHeight -
                    15;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });


    /* =====================================================
       BUTTON PRESS FEEDBACK
    ===================================================== */

    const interactiveElements =
        document.querySelectorAll(
            ".btn, .nav-cta, .text-link, " +
            ".membership-card a, " +
            ".training-card a, " +
            ".social-links a"
        );


    interactiveElements.forEach(
        element => {

            element.addEventListener(
                "pointerdown",
                () => {

                    element.classList.add(
                        "pressed"
                    );

                }
            );


            element.addEventListener(
                "pointerup",
                () => {

                    element.classList.remove(
                        "pressed"
                    );

                }
            );


            element.addEventListener(
                "pointerleave",
                () => {

                    element.classList.remove(
                        "pressed"
                    );

                }
            );

        }
    );


    /* =====================================================
       TOUCH FRIENDLY CARD BEHAVIOUR
    ===================================================== */

    const isTouchDevice =
        window.matchMedia(
            "(hover: none)"
        ).matches;


    if (isTouchDevice) {

        document.body.classList.add(
            "touch-device"
        );

    }


    /* =====================================================
       IMAGE LAZY LOADING
    ===================================================== */

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(image => {

        /*
         * Keep hero/logo images eager.
         * Everything else can load lazily.
         */

        if (
            !image.closest(".hero") &&
            !image.closest(".logo") &&
            !image.closest(".footer-logo")
        ) {

            image.setAttribute(
                "loading",
                "lazy"
            );

        }

    });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const footerYear =
        document.querySelector(
            ".footer-bottom p"
        );


    if (footerYear) {

        footerYear.innerHTML =
            footerYear.innerHTML.replace(
                /\b20\d{2}\b/,
                new Date().getFullYear()
            );

    }


    /* =====================================================
       WHATSAPP ANALYTICS HOOK
    ===================================================== */

    const whatsappLinks =
        document.querySelectorAll(
            'a[href*="wa.me"]'
        );


    whatsappLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                /*
                 * Future analytics can go here.
                 *
                 * Example:
                 *
                 * gtag(
                 *   "event",
                 *   "whatsapp_enquiry"
                 * );
                 */

                console.log(
                    "WhatsApp enquiry initiated."
                );

            }
        );

    });


    /* =====================================================
       INITIALIZE
    ===================================================== */

    handleNavbar();

});