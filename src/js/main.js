import Swup from "swup";
import SwupHeadPlugin from "@swup/head-plugin";
import SwupScriptsPlugin from "@swup/scripts-plugin";
import SwupPreloadPlugin from '@swup/preload-plugin';

import SplitText from "../js/SplitText";

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

