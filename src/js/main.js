import Swup from "swup";
import SwupHeadPlugin from "@swup/head-plugin";
import SwupScriptsPlugin from "@swup/scripts-plugin";
import SwupPreloadPlugin from '@swup/preload-plugin';
import SwupDebugPlugin from '@swup/debug-plugin';

gsap.registerPlugin(ScrollTrigger);

//----------------------------- Launch Swup -----------------------------//
const swup = new Swup({
    // animateHistoryBrowsing: true,
    linkToSelf: "scroll",
    plugins: [new SwupHeadPlugin({
        awaitAssets: true,
        persistAssets: true
    }), new SwupScriptsPlugin(), new SwupPreloadPlugin(
        { preloadVisibleLinks: true }
    ), new SwupDebugPlugin()],
});
//----------------------------- End Launch Swup -----------------------------//
swup.hooks.on("visit:start", (visit) => {
    visit.scroll.reset = false;
});

//----------------------------- Launch Lenis -----------------------------//
// const lenis = new Lenis();
// function raf(time) {
//     lenis.raf(time);
//     requestAnimationFrame(raf);
// }
// requestAnimationFrame(raf);
//----------------------------- End Launch Lenis -----------------------------//

