import Swup from "swup";
import SwupHeadPlugin from "@swup/head-plugin";
import SwupScriptsPlugin from "@swup/scripts-plugin";
import SwupPreloadPlugin from '@swup/preload-plugin';

import SplitText from "../js/SplitText";
import Swiper from "swiper";
import "swiper/css";


let observer;
let observerDefis;
let swiper;
let mediaQuery;
let createSwiper;

let magnets;
let moveMagnet;
let mouseLeave;
let howItWorksButtons;
let hasRun = false;
let scrollTriggerInstance = null;
let resizeListener = null;
let rollInstance = null;
let accordionItems;
let modalElement;
let allModals;
gsap.registerPlugin(ScrollTrigger, SplitText);

//----------------------------- Launch Swup -----------------------------//
const swup = new Swup({
    animateHistoryBrowsing: true,
    linkToSelf: "scroll",
    plugins: [new SwupHeadPlugin({
        awaitAssets: true,
        persistAssets: true
    }), new SwupScriptsPlugin(), new SwupPreloadPlugin(
        { preloadVisibleLinks: true }
    )],
});
//----------------------------- End Launch Swup -----------------------------//


//----------------------------- Launch Lenis -----------------------------//
const lenis = new Lenis();
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
//----------------------------- End Launch Lenis -----------------------------//

function initNavLinks() {
    const currentPath = window.location.pathname;
    // Add the 'active' class to the link that corresponds to the current path
    const links = document.querySelectorAll("nav .lower-container a");
    links.forEach((link) => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
        }

        link.addEventListener("click", handleClick);
    });

    function handleClick(e) {
        links.forEach((link) => {
            link.classList.remove("active");
        });
        console.log(e.target);
        e.target.classList.add("active");
        document.querySelector("#cross").click();
    }

}
let hasRunOnce = false;
let backgroundClosed, remerciementsMessage, body, bg, hub, header, crossButton, burgerButton, nav, root, lowerContainer, navHub, defaultHub, contactForm, config, fermerConfig, annulerContact, contactButtons, configButtons, remerciements;
let openNav;
function initHeader() {
    //cleanUp
    if (contactButtons) {
        contactButtons.forEach((btn) => {
            btn.removeEventListener("click", (e) => openContact(e));
        })

    } else if (configButtons) {
        configButtons.forEach((btn) => {
            btn.removeEventListener("click", (e) => openConfig(e));
        })
    }

    if (!hasRunOnce) {
        backgroundClosed = true;
        remerciementsMessage = false;
        body = document.body;
        bg = document.querySelector(".bg");
        hub = document.querySelector(".hub");
        header = document.querySelector("header");
        crossButton = document.querySelector("#cross");
        burgerButton = document.querySelector("#burger");
        nav = document.querySelector("nav");
        root = document.documentElement;
        lowerContainer = document.querySelector("nav .lower-container");
        navHub = document.querySelector("nav .nav-hub");
        defaultHub = document.querySelector(".default-hub");
        contactForm = document.querySelector(".contact");
        config = document.querySelector(".config");
        fermerConfig = document.querySelector("#fermerConfig");
        annulerContact = document.querySelector("#annulerContact");
        contactButtons = document.querySelectorAll(".contact-button");
        configButtons = document.querySelectorAll(".config-button");
        remerciements = document.querySelector(".remerciements");


        bg.addEventListener("transitionend", (e) => {
            if (e.propertyName === "scale") {
                header.classList.remove("in-transition");
                if (backgroundClosed) {
                    header.style.removeProperty("pointer-events");
                    body.style.removeProperty("pointer-events");

                    backgroundClosed = false;
                    nav.style.display = "none";
                    contactForm.style.display = "none";
                    contactForm.classList.remove("from-nav");
                    header.classList.remove("dimensions-set");
                    header.style.overflowY = "unset";
                    bg.classList.remove("transition");
                    body.classList.remove("back-normal");
                } else if (
                    body.classList.contains("nav-open") ||
                    body.classList.contains("contact-open") ||
                    body.classList.contains("config-open")
                ) {
                    defaultHub.style.visibility = "hidden";
                    header.style.pointerEvents = "all";
                    body.style.pointerEvents = "none";
                } else if (remerciementsMessage) {
                    bg.classList.remove("transition");
                    body.classList.add("new-dimensions");
                }
            }
        });
        burgerButton.addEventListener("click", openNavigation);
        crossButton.addEventListener("click", closeNavigation);
        console.log('First time');
    }




    const calculateScale = (
        hubWidth,
        hubHeight,
        endWindowHeight,
        endWindowWidth,
    ) => {
        return {
            scaleX: hubWidth / endWindowWidth,
            scaleY: hubHeight / endWindowHeight,
        };
    };

    function openNavigation() {
        if (header.classList.contains("in-transition")) return;
        backgroundClosed = false;
        nav.style.display = "block";
        header.style.overflowY = "auto";
        header.classList.add("in-transition");
        contactForm.classList.add("from-nav");
        const { scaleX, scaleY } = calculateScale(
            hub.offsetWidth,
            hub.offsetHeight,
            lowerContainer.offsetHeight + navHub.offsetHeight,
            lowerContainer.offsetWidth,
        );

        root.style.setProperty(
            "--contentHeight",
            `${(nav.offsetHeight + 12) / 16}rem`,
        );
        root.style.setProperty("--fx", scaleX);
        root.style.setProperty("--fy", scaleY);
        root.style.setProperty(
            "--height",
            `${(lowerContainer.offsetHeight + navHub.offsetHeight) / 16}rem`,
        );

        header.classList.add("dimensions-set");
        setTimeout(() => {
            bg.classList.add("transition");
            body.classList.add("nav-open");
        }, 3);
    };

    function closeNavigation() {
        if (header.classList.contains("in-transition")) return;
        header.classList.add("in-transition");

        const { scaleX, scaleY } = calculateScale(
            hub.offsetWidth,
            hub.offsetHeight,
            lowerContainer.offsetHeight + navHub.offsetHeight,
            lowerContainer.offsetWidth,
        );

        root.style.setProperty("--fx", scaleX);
        root.style.setProperty("--fy", scaleY);

        body.classList.remove("nav-open");
        defaultHub.style.visibility = "visible";
        backgroundClosed = true;
    };

    const openContact = (e) => {
        if (header.classList.contains("in-transition")) return;
        header.classList.add("in-transition");
        bg.classList.remove("transition");

        backgroundClosed = false;
        contactForm.style.display = "flex";
        header.style.overflowY = "auto";

        let scaleX, scaleY;
        ({ scaleX, scaleY } = calculateScale(
            hub.offsetWidth,
            hub.offsetHeight,
            contactForm.offsetHeight,
            contactForm.offsetWidth,
        ));

        if (body.classList.length === 1 && body.classList.contains("nav-open")) {
            ({ scaleX, scaleY } = calculateScale(
                lowerContainer.offsetWidth,
                lowerContainer.offsetHeight + navHub.offsetHeight,
                contactForm.offsetHeight,
                contactForm.offsetWidth,
            ));
        }
        root.style.setProperty("--fx", scaleX);
        root.style.setProperty("--fy", scaleY);
        root.style.setProperty("--height", `${contactForm.offsetHeight / 16}rem`);
        root.style.setProperty(
            "--contentHeight",
            `${(contactForm.offsetHeight + 12) / 16}rem`,
        );

        if (body.classList.length === 1 && body.classList.contains("nav-open")) {
            body.classList.remove("nav-open");
        } else {
            header.classList.add("dimensions-set");
        }

        setTimeout(() => {
            bg.classList.add("transition");
            body.classList.add("contact-open");
        }, 3);
    };

    const closeContact = () => {
        if (header.classList.contains("in-transition")) return;
        header.classList.add("in-transition");

        // bg.classList.remove("transition");

        let scaleX, scaleY;

        ({ scaleX, scaleY } = calculateScale(
            hub.offsetWidth,
            hub.offsetHeight,
            contactForm.offsetHeight,
            contactForm.offsetWidth,
        ));

        root.style.setProperty("--fx", scaleX);
        root.style.setProperty("--fy", scaleY);
        // root.style.setProperty("--height", `${contactForm.offsetHeight / 16}rem`);

        backgroundClosed = true;
        defaultHub.style.visibility = "visible";
        body.classList.remove("contact-open");
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const myForm = event.target;

        document.dispatchEvent(
            new CustomEvent("formSubmitted", {
                detail: { formName: myForm.getAttribute("name") },
            }),
        );
        const formData = new FormData(myForm);
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString(),
        })
            .then(() => {
                successMessage(myForm, myForm.getAttribute("name"));
            })
            .catch((error) => console.log(error));
    };

    const successMessage = (form, name) => {
        if (header.classList.contains("in-transition")) return;
        header.classList.add("in-transition");

        remerciementsMessage = true;
        // bg.classList.remove("transition");
        remerciements.style.display = "unset";
        let scaleX, scaleY;
        name == "config"
            ? ({ scaleX, scaleY } = calculateScale(
                remerciements.offsetWidth,
                remerciements.offsetHeight,
                config.offsetHeight,
                config.offsetWidth,
            ))
            : ({ scaleX, scaleY } = calculateScale(
                remerciements.offsetWidth,
                remerciements.offsetHeight,
                contactForm.offsetHeight,
                contactForm.offsetWidth,
            ));

        root.style.setProperty(
            "--heightRemerc",
            `${remerciements.offsetHeight}px`,
        );
        root.style.setProperty("--widthRemerc", `${remerciements.offsetWidth}px`);
        root.style.setProperty("--fx", scaleX);
        root.style.setProperty("--fy", scaleY);
        // body.classList.add("remerciements-open");
        // root.style.setProperty("--height", `${contactForm.offsetHeight / 16}rem`);
        name == "config"
            ? body.classList.remove("config-open")
            : body.classList.remove("contact-open");
        body.classList.add("remerciements-open");

        setTimeout(() => {
            form.reset();
            backToNormal();
        }, 2500);
    };

    const backToNormal = () => {
        backgroundClosed = true;
        if (header.classList.contains("in-transition")) return;
        header.classList.add("in-transition");
        remerciementsMessage = false;
        let scaleX, scaleY;

        ({ scaleX, scaleY } = calculateScale(
            hub.offsetWidth,
            hub.offsetHeight,
            remerciements.offsetHeight,
            remerciements.offsetWidth,
        ));

        root.style.setProperty("--fx", scaleX);
        root.style.setProperty("--fy", scaleY);
        root.style.setProperty(
            "--widthRemerc",
            `${remerciements.offsetWidth / 16}rem`,
        );
        root.style.setProperty(
            "--heightRemerc",
            `${remerciements.offsetHeight / 16}rem`,
        );

        setTimeout(() => {
            body.classList.remove("new-dimensions");
            bg.classList.add("transition");
            body.classList.add("back-normal");
            body.classList.remove("remerciements-open");
            defaultHub.style.visibility = "visible";
        }, 3);

        document
            .querySelectorAll(".wrapper input, .wrapper textarea")
            .forEach((element) => {
                element.parentNode.classList.remove("focused");
            });
    };

    const openConfig = () => {
        if (header.classList.contains("in-transition")) return;
        header.classList.add("in-transition");
        bg.classList.remove("transition");

        backgroundClosed = false;
        config.style.display = "flex";
        header.style.overflowY = "auto";

        let scaleX, scaleY;
        ({ scaleX, scaleY } = calculateScale(
            hub.offsetWidth,
            hub.offsetHeight,
            config.offsetHeight,
            config.offsetWidth,
        ));
        root.style.setProperty("--fx", scaleX);
        root.style.setProperty("--fy", scaleY);
        root.style.setProperty("--height", `${config.offsetHeight / 16}rem`);
        root.style.setProperty(
            "--contentHeight",
            `${(config.offsetHeight + 12) / 16}rem`,
        );

        header.classList.add("dimensions-set");

        setTimeout(() => {
            bg.classList.add("transition");
            body.classList.add("config-open");
        }, 3);
    };

    const closeConfig = () => {
        if (header.classList.contains("in-transition")) return;
        header.classList.add("in-transition");

        // bg.classList.remove("transition");

        let scaleX, scaleY;

        ({ scaleX, scaleY } = calculateScale(
            hub.offsetWidth,
            hub.offsetHeight,
            config.offsetHeight,
            config.offsetWidth,
        ));

        root.style.setProperty("--fx", scaleX);
        root.style.setProperty("--fy", scaleY);
        // root.style.setProperty("--height", `${contactForm.offsetHeight / 16}rem`);

        backgroundClosed = true;
        defaultHub.style.visibility = "visible";
        body.classList.remove("config-open");
    };


    contactButtons &&
        contactButtons.forEach((btn) => {
            btn.addEventListener("click", (e) => openContact(e));
        });


    let forms = document.querySelectorAll("form");
    forms && forms
        .forEach((form) => {
            form.addEventListener("submit", handleSubmit);
        });

    configButtons &&
        configButtons.forEach((btn) => {
            btn.addEventListener("click", (e) => openConfig(e));
        });

    annulerContact &&
        annulerContact.addEventListener("click", (e) => {
            e.preventDefault();
            closeContact();
        });

    fermerConfig &&
        fermerConfig.addEventListener("click", (e) => {
            e.preventDefault();
            closeConfig();
        });
}

function initJS() {
    ScrollTrigger.config({ ignoreMobileResize: true });
    gsap.registerPlugin(ScrollTrigger, SplitText);
    initObservers();
    initSwiper();
    initParagraph();
    initDefisCarousel();
    initMagneticButtons();
    init3Steps();
    initMarquee();
    initFAQCards();
    initModalOpenButtons();
    initModal();
    initHeader();
}

function initSwiper() {
    // Cleanup

    if (swiper) {
        if (Array.isArray(swiper)) {
            swiper.forEach(s => s.destroy(true, true));
        } else {
            swiper.destroy(true, true);
        }
        swiper = null;
    }
    if (mediaQuery && createSwiper) {
        mediaQuery.removeEventListener('change', createSwiper);
    }


    mediaQuery = window.matchMedia('(max-width: 850px)');

    createSwiper = function (e) {
        if (e.matches) {
            if (!swiper) {
                if (document.querySelector(".swiper")) {
                    swiper = new Swiper(".swiper", {
                        spaceBetween: 12,
                        slidesPerView: "auto",
                    });
                }

            }
        } else if (swiper) {
            if (Array.isArray(swiper)) {
                swiper.forEach(s => s.destroy(true, true));
            } else {
                swiper.destroy(true, true);
            }
            swiper = null;
        }
    }
    mediaQuery.addEventListener('change', createSwiper);

    createSwiper(mediaQuery);

}

function initObservers() {
    if (observer) {
        observer.disconnect();
    }

    const sentences = document.querySelectorAll(
        "section.paragraph-section p span",
    );
    const marquee = document.querySelector(".marquee");
    const contactMarquee = document.querySelector(".button-content ");

    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const action = entry.target.getAttribute("data-action");
                switch (action) {

                    case "vs":
                        // Do something for action2
                        if (entry.isIntersecting) {
                            entry.target.classList.add("animate");
                            observer.unobserve(entry.target);
                            break;
                        }
                    case "marquee":
                        // Do something for action2
                        if (entry.isIntersecting) {
                            marquee.classList.add("animate");
                            observer.unobserve(entry.target);
                            break;
                        }
                    case "contact-marquee":
                        // Do something for action2
                        if (entry.isIntersecting) {
                            contactMarquee.classList.add("animate");
                            observer.unobserve(entry.target);
                            break;
                        }
                    default:
                        if (entry.isIntersecting) {
                            entry.target.classList.add("animate");
                        } else {
                            entry.target.classList.remove("animate");
                        }
                    // Add more cases as needed
                }
            });
        },
        {
            // threshold: 0.5,
            rootMargin: "0px 0px -20% 0px",
        },
    );

    document.querySelectorAll(".o-e").forEach((element) => {
        observer.observe(element);
    });
}

function initParagraph() {
    ScrollTrigger.config({ ignoreMobileResize: true });

    const paragraphs = document.querySelectorAll(".split-to-words");
    if (paragraphs) {
        let splitTextRead = new SplitText(paragraphs, {
            type: "words",
            wordsClass: "single-word",
        });
        paragraphs.forEach(function (triggerElement, index) {
            let targetElements = triggerElement.querySelectorAll(".single-word");

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerElement,
                    markers: false,
                    start: "0% 70%",
                    end: "100% 35%",
                    scrub: 1,
                },
            });

            tl.fromTo(
                targetElements,
                {
                    opacity: 0.05,
                },
                {
                    duration: 0.1,
                    opacity: 1,
                    stagger: 0.01,
                    ease: "none",
                },
            );


        });
    }
}

function initDefisCarousel() {

    const items = document.querySelectorAll(".carousel-item");
    const carousel = document.querySelector(".carousel");
    const itemCount = items.length;
    let carouselInterval;
    let currentIndex = 0;
    if (!items || !carousel) {
        if (observer) {
            observer.disconnect();
            observer = null;
        }
        return;
    }


    function updateCarousel() {
        items.forEach((item, index) => {
            let relativeIndex = index - currentIndex;
            const svgItem = item.querySelector("svg");

            if (relativeIndex < 0) {
                relativeIndex += itemCount;
            }
            item.children[1].setAttribute("aria-disabled", "true");
            item.children[2].setAttribute("aria-disabled", "true");
            // Use the modified switch statement here
            switch (relativeIndex) {
                case 0:
                    item.style.opacity = 0; // Set to 0 so it's invisible
                    item.style.transform = "translateY(-120%)"; // Start above the view
                    // item.style.transition = "transform 0.5s, opacity 0.5s";
                    item.children[1].setAttribute("aria-disabled", "true");
                    item.children[2].setAttribute("aria-disabled", "true");
                    break;
                case 1:
                    item.style.opacity = 0.05;
                    item.style.transform = "translateY(0%)"; // Move into view
                    // item.style.transition = "transform 0.5s, opacity 0.5s";
                    item.children[1].setAttribute("aria-disabled", "true");
                    item.children[2].setAttribute("aria-disabled", "true");
                    break;
                case 2:
                    item.style.opacity = 0.2;
                    item.style.transform = "translateY(120%)"; // Center position
                    // item.style.transition = "transform 0.5s, opacity 0.5s";
                    svgItem.style.fill = "var(--clr-text-100)";
                    item.classList.remove("active");
                    item.children[1].setAttribute("aria-disabled", "true");
                    item.children[2].setAttribute("aria-disabled", "true");
                    break;
                case 3:
                    item.style.opacity = 1;
                    item.style.transform = "translateY(240%)"; // Move out of view
                    // item.style.transition = "transform 0.5s, opacity 0.5s";
                    svgItem.style.fill = "red";
                    item.classList.add("active");
                    item.children[1].removeAttribute("aria-disabled");
                    item.children[2].removeAttribute("aria-disabled");
                    break;
                case 4:
                    item.style.opacity = 0.2; // Set to 0 so it's invisible
                    item.style.transform = "translateY(360%)"; // Position below the view
                    // item.style.transition = "transform 0.5s, opacity 0.5s";
                    svgItem.style.fill = "var(--clr-text-100)";
                    item.classList.remove("active");
                    item.children[1].setAttribute("aria-disabled", "true");
                    item.children[2].setAttribute("aria-disabled", "true");
                    break;
                case 5:
                    item.style.opacity = 0.05; // Set to 0 so it's invisible
                    item.style.transform = "translateY(480%)"; // Position below the view
                    // item.style.transition = "transform 0.5s, opacity 0.5s";
                    item.children[1].setAttribute("aria-disabled", "true");
                    item.children[2].setAttribute("aria-disabled", "true");
                    break;
                case 6:
                    item.style.opacity = 0; // Set to 0 so it's invisible
                    item.style.transform = "translateY(600%)"; // Position below the view
                    // item.style.transition = " opacity 0.5s";
                    item.children[1].setAttribute("aria-disabled", "true");
                    item.children[2].setAttribute("aria-disabled", "true");
                    break;
                default:
                    item.style.opacity = 0; // Ensure these are invisible
                    item.style.transform = "translateY(-240%)"; // Keep above the view
                    // item.style.transition = "opacity 0.5s";
                    item.children[1].setAttribute("aria-disabled", "true");
                    item.children[2].setAttribute("aria-disabled", "true");
                    break;
            }
        });

        // Increment the current index, wrapping back to 0 if needed
        currentIndex = (currentIndex + 1) % itemCount;
    }
    // Initial setup
    updateCarousel();

    observerDefis = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                carouselInterval = setInterval(updateCarousel, 2500); // This sets the speed of the carousel
            } else {
                clearInterval(carouselInterval);
            }
        });
    });

    observerDefis.observe(carousel);
}

function initMagneticButtons() {
    // Cleanup
    if (magnets) {
        magnets.forEach((magnet) => {
            magnet.removeEventListener("mousemove", moveMagnet);
            magnet.removeEventListener("mouseleave", mouseLeave);
        });
    }

    // Found via: https://codepen.io/tdesero/pen/RmoxQg
    magnets = document.querySelectorAll(".magnetic");
    // Mouse move
    moveMagnet = function (event) {
        var magnetButton = event.currentTarget;

        if (!magnetButton.classList.contains("magnetic")) return;
        var bounding = magnetButton.getBoundingClientRect();
        var magnetsStrength = magnetButton.getAttribute("data-strength");
        var magnetsStrengthText =
            magnetButton.getAttribute("data-strength-text");

        gsap.to(magnetButton, 1.5, {
            x:
                ((event.clientX - bounding.left) / magnetButton.offsetWidth - 0.5) *
                magnetsStrength,
            y:
                ((event.clientY - bounding.top) / magnetButton.offsetHeight - 0.5) *
                magnetsStrength,
            rotate: "0.001deg",
            ease: Power4.easeOut,
        });

        if (!event.currentTarget.querySelector(".btn-text")) return;
        gsap.to(event.currentTarget.querySelector(".btn-text"), 1.5, {
            x:
                ((event.clientX - bounding.left) / magnetButton.offsetWidth - 0.5) *
                magnetsStrengthText,
            y:
                ((event.clientY - bounding.top) / magnetButton.offsetHeight - 0.5) *
                magnetsStrengthText,
            rotate: "0.001deg",
            ease: Power4.easeOut,
        });
    }
    // START : If screen is bigger as 540 px do magnetic
    if (window.matchMedia("(hover: hover)").matches) {
        // Mouse Reset
        magnets.forEach((magnet) => {

            magnet.addEventListener("mousemove", moveMagnet);
            magnet.addEventListener("mouseleave", mouseLeave = function (event) {
                gsap.to(event.currentTarget, 1.5, {
                    x: 0,
                    y: 0,
                    ease: Elastic.easeOut,
                });
                if (event.currentTarget.querySelector(".btn-text")) {
                    gsap.to(event.currentTarget.querySelector(".btn-text"), 1.5, {
                        x: 0,
                        y: 0,
                        ease: Elastic.easeOut,
                    });
                }
            });
        });



    }


}

function init3Steps() {
    const changeFocus = (e) => {
        // Convert NodeList to an array to use array methods
        const buttonsArray = Array.from(howItWorksButtons);

        // Find the index of the clicked button
        const clickedButtonIndex = buttonsArray.indexOf(e.target);

        images.forEach((img) => {
            img.classList.add("blur-active");
        });
        images[clickedButtonIndex].classList.remove("blur-active");

        howItWorksButtons.forEach((button, i) => {
            button.classList.remove("actif");
        });
        e.target.classList.add("actif");
        bg.style.transform = `translateY(${clickedButtonIndex * 100}%)`;
    };
    // Cleanup
    if (howItWorksButtons) {
        howItWorksButtons.forEach((button) => {
            button.removeEventListener("click", changeFocus);
        });
    }
    howItWorksButtons = document.querySelectorAll(".comment button");
    const bg = document.querySelector(".comment button .background");
    const images = document.querySelectorAll(".comment .content-wrapper img");

    if (!howItWorksButtons || !bg || !images) return;
    images[0].classList.remove("blur-active");


    howItWorksButtons.forEach((button) => {
        button.addEventListener("click", (e) => changeFocus(e));
    });
}

function initMarquee() {
    ScrollTrigger.config({ ignoreMobileResize: true });
    function handleResize() {
        if (window.innerWidth > 767 && !hasRun && !isMobileDevice()) {
            initScrollingLogos();

            hasRun = true; // Set the flag to true after function runs
        }
    }
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent,
        );
    }

    if (resizeListener) {
        window.removeEventListener("resize", resizeListener);
        resizeListener = null;
    }

    if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
        scrollTriggerInstance = null;
    }

    if (rollInstance) {
        rollInstance.clear();
        rollInstance = null;
    }

    // Reset flag
    hasRun = false;

    resizeListener = handleResize;
    window.addEventListener("resize", resizeListener);

    // Logic for initial run
    if (window.innerWidth > 767 && !isMobileDevice()) {
        initScrollingLogos();
        hasRun = true;
    }


    function initScrollingLogos() {
        let direction = 1; // 1 = forward, -1 = backward scroll


        if (document.querySelector(".logos-rolling")) {
            ScrollTrigger.config({ ignoreMobileResize: true });
            if (rollInstance) {
                rollInstance.clear();
            }
            rollInstance = roll(".logos-rolling", { duration: 25 });
            const roll1 = rollInstance.tl;
            scrollTriggerInstance = ScrollTrigger.create({
                trigger: ".marquee", // Assuming '.logos-rolling-wrapper' is the parent container of the animation
                start: "top bottom", // Starts when the top of the trigger hits the bottom of the viewport
                endTrigger: ".marquee",
                end: "bottom top", // Ends when the bottom of the trigger hits the top of the viewport
                onEnter: () => {
                    if (window.innerWidth > 767) {
                        roll1.play();
                    }
                },
                onLeave: () => {
                    if (window.innerWidth > 767) {
                        roll1.pause();
                    }
                },
                onEnterBack: () => {
                    if (window.innerWidth > 767) {
                        roll1.play();
                    }
                },
                onLeaveBack: () => {
                    if (window.innerWidth > 767) {
                        roll1.pause();
                    }
                },
                onUpdate(self) {
                    // Get scroll velocity
                    const velocity = Math.abs(self.getVelocity());

                    // Update animation speed based on scroll velocity only on non-mobile devices
                    if (window.innerWidth > 767) {
                        gsap.to(roll1, {
                            timeScale: direction * (1 + velocity * 0.004),

                            overwrite: true,
                        });
                        if (self.direction !== direction) {
                            direction *= -1;
                            gsap.to(roll1, {
                                timeScale:
                                    direction *
                                    (1 + (window.innerWidth > 767 ? velocity * 0.004 : 0)),

                                overwrite: true,
                            });
                        }
                    }

                    if (window.innerWidth > 767 && window.scrollY === 0) {
                        gsap.to(roll1, {
                            timeScale: -1,
                            overwrite: true,
                        });
                    }
                },
            });
        }

        // helper function that clones the targets, places them next to the original, then animates the xPercent in a loop to make it appear to roll across the screen in a seamless loop.
        function roll(targets, vars, reverse) {
            // Set default easing if not provided
            vars.ease = vars.ease || "none";

            // Create a timeline with repeat and onReverseComplete properties
            const tl = gsap.timeline({
                repeat: -1,
                onReverseComplete() {
                    this.totalTime(this.rawTime() + this.duration() * 10);
                },
            });
            // Convert targets to an array of elements
            const elements = gsap.utils.toArray(targets);

            // Create clones of each element and append them to the parent node
            const clones = elements.map((el) => {
                let clone = el.cloneNode(true);
                el.parentNode.appendChild(clone);
                return clone;
            });
            // Function to position clones
            const positionClones = () => {
                elements.forEach((el, i) => {
                    gsap.set(clones[i], {
                        position: "absolute",
                        overwrite: false,
                        top: el.offsetTop,
                        left: el.offsetLeft + el.offsetWidth,
                    });
                });
            };

            // Position clones initially
            positionClones();

            // Add each element and its clone to the timeline
            elements.forEach((el, i) =>
                tl.to([el, clones[i]], { xPercent: reverse ? 100 : -100, ...vars }, 0),
            );
            let rollResizeListener = () => {
                let time = tl.totalTime();
                tl.totalTime(0);
                positionClones();
                tl.totalTime(time);

                if (window.innerWidth < 767) {
                    tl.pause();
                } else {
                    tl.resume();
                }
            };
            // On window resize, reposition clones and maintain timeline progress
            window.addEventListener("resize", rollResizeListener);

            // Check if the window width is less than 767px
            if (window.innerWidth < 767) {
                // If it is, pause the GSAP animation and let CSS take over
                tl.pause();
            } else {
                // If it's not, resume the GSAP animation
                tl.resume();
            }
            return {
                tl: tl,
                clear: () => window.removeEventListener("resize", rollResizeListener)
            };
        }
        return scrollTriggerInstance;
    }
}

function initFAQCards() {
    if (accordionItems) {
        accordionItems.forEach((button) => {
            button.removeEventListener("click", handleClick);
        });
        accordionItems = null;
    }
    accordionItems = document.querySelectorAll(".accordion-item");
    if (!accordionItems) return;

    accordionItems.forEach((button) => {
        button.addEventListener("click", handleClick);
    });

    function handleClick() {
        const accordionContent = this.children[1];
        this.classList.toggle("expanded");

        if (this.classList.contains("expanded")) {
            accordionContent.style.height = accordionContent.scrollHeight + "px";
        } else {
            accordionContent.style.height = 4 + "px";
        }

        document.querySelectorAll(".accordion-item").forEach((otherButton) => {
            if (otherButton !== this) {
                otherButton.classList.remove("expanded");
                otherButton.children[1].style.height = 4 + "px";
            }
        });
    }
}

function initModalOpenButtons() {
    window.modalEventHandlers = {};
    const modalOpenButtons = document.querySelectorAll("button.modal-open-button");
    if (!modalOpenButtons) return;
    modalOpenButtons.forEach((btn) => {
        btn.addEventListener("click", handleClick);
    });

    function handleClick(e) {
        const modal = document.querySelector(
            `div[data-id="${e.target.dataset.modal}"]`,
        );

        modal.classList.add("is-open");

        document.body.classList.add("modal-open");
        setTimeout(() => {
            modal.classList.add("transition");
            trapFocus(modal);
        }, 1);
    }
}

function trapFocus(element) {
    if (!element) return;
    if (modalElement) {
        modalElement.removeEventListener("keydown", handleKeyDown);
    }
    modalElement = element;
    const focusableElements = modalElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (!focusableElements) return;
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement =
        focusableElements[focusableElements.length - 1];

    firstFocusableElement.focus();

    modalElement.addEventListener("keydown", handleKeyDown);

    function handleKeyDown(e) {
        if (e.key === "Tab") {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    }
}

function initModal() {
    if (allModals) {
        allModals.forEach((el) => {
            el.removeEventListener("click", handleClick);
        });
        allModals = null;
    }
    allModals = document.querySelectorAll(".close-modal");
    if (!allModals) return;

    allModals.forEach((el) => {
        el.addEventListener("click", handleClick);
    });

    function handleClick() {
        const modal = document.querySelector(".modal.is-open");
        modal?.classList.remove("is-open");
        modal?.classList.remove("transition");
        document.body.classList.remove("modal-open");
        document.querySelector(`[data-modal="${modal.dataset.id}"]`).focus();
    }
}
//----------------------------- Run Once -----------------------------//
if (document.readyState === 'complete') {
    initJS();
    initNavLinks();
} else {
    document.addEventListener('DOMContentLoaded', () => {
        initJS();
        initNavLinks();
    });
}

//----------------------------- Run On Every Page Transtition -----------------------------//
swup.hooks.on('page:view', () => initJS());



