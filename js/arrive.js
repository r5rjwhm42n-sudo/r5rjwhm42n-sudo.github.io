/* =====================================================================
   The second half of the hub's sport transition (js/transitions.js).
   When a team page opens straight from it, the same blue backdrop covers
   the page for a moment and then lifts away with a gold edge, so the
   hand-off reads as one move. Loaded early in each team page's <head>.
   ===================================================================== */
(function () {
  let fresh = false;
  try {
    const at = +sessionStorage.getItem("dfa-arrive");
    sessionStorage.removeItem("dfa-arrive");
    fresh = at > 0 && Math.abs(Date.now() - at) < 4000;
  } catch (e) { return; }
  if (!fresh || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const root = document.documentElement;
  root.classList.add("tx-arriving");
  const css = document.createElement("style");
  css.textContent = `
    html.tx-arriving body::after {
      content: ""; position: fixed; inset: 0; z-index: 10000; pointer-events: none;
      background: linear-gradient(115deg, #0b1f4d 0%, #18479f 62%, #2459c2 100%);
      box-shadow: 0 7px 0 #f0b429;
    }
    html.tx-arriving.tx-lift body::after {
      transform: translateY(calc(-100% - 10px));
      transition: transform .8s cubic-bezier(.76, 0, .24, 1);
    }`;
  document.head.appendChild(css);

  const lift = () => requestAnimationFrame(() => requestAnimationFrame(() => {
    root.classList.add("tx-lift");
    setTimeout(() => root.classList.remove("tx-arriving", "tx-lift"), 900);
  }));
  if (document.readyState === "loading") addEventListener("DOMContentLoaded", lift);
  else lift();
})();
