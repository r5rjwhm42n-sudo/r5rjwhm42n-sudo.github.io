/* =====================================================================
   Hub: "Get the app" button. Chrome, Edge and Android install straight
   from the button; on iPhone, iPad and Mac Safari it opens a sheet with
   the two taps that add the site to the home screen or Dock. Hidden once
   the site is running as an installed app.
   ===================================================================== */
(function () {
  const installed = () => matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  if (installed()) return;

  const ua = navigator.userAgent;
  const IOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const ANDROID = /Android/.test(ua);
  const MAC_SAFARI = !IOS && /Macintosh/.test(ua) && /Safari/.test(ua) && !/Chrome|Chromium|Edg|Firefox|OPR/.test(ua);
  const FIREFOX = /Firefox|FxiOS/.test(ua);

  let deferred = null;
  addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); deferred = e; });
  addEventListener("appinstalled", () => document.querySelector(".btn-app")?.remove());

  const ICONS = {
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10.5 18.5h3"/></svg>',
    share: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M7.5 7.5L12 3l4.5 4.5M6 11H5v10h14V11h-1"/></svg>',
    add: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4"/><path d="M12 8v8M8 12h8"/></svg>',
    dots: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="5" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="19" r="1.6" fill="currentColor"/></svg>',
    dock: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="4" width="19" height="13" rx="2"/><path d="M6 21h12M9 17v4M15 17v4"/></svg>'
  };

  function steps() {
    if (IOS) return [[ICONS.share, "Tap <b>Share</b>", "The square with the arrow, at the bottom of Safari (top right on iPad)."],
                     [ICONS.add, "Tap <b>Add to Home Screen</b>", "Scroll down the list if you don't see it."],
                     [ICONS.phone, "Tap <b>Add</b>", "The Falcons icon lands on your home screen."]];
    if (MAC_SAFARI) return [[ICONS.dock, "Open the <b>File</b> menu", "In the menu bar at the top of the screen."],
                            [ICONS.add, "Choose <b>Add to Dock</b>", "The Falcons app opens in its own window."]];
    if (ANDROID) return [[ICONS.dots, "Open the browser <b>menu</b>", "The three dots in the corner."],
                         [ICONS.add, "Tap <b>Install app</b> or <b>Add to Home screen</b>", "The Falcons icon joins your apps."]];
    if (FIREFOX) return [[ICONS.dock, "Open this page in <b>Chrome</b>, <b>Edge</b> or <b>Safari</b>", "Firefox on computers can't install sites as apps."],
                         [ICONS.add, "Then click <b>Get the app</b> again", "It installs in one click from there."]];
    return [[ICONS.dock, "Click the <b>install</b> icon", "At the right end of the address bar."],
            [ICONS.add, "Choose <b>Install</b>", "The Falcons app opens in its own window."]];
  }

  function sheet() {
    /* a home screen of app tiles, with the Falcons icon popping in the middle of the second row */
    const tiles = Array.from({ length: 11 }, (_, i) => `<i style="--d:${i * 40}ms"></i>`);
    tiles.splice(4, 0, '<span class="app-me"><img src="images/icons/icon-192.png" alt=""><em>Falcons</em></span>');
    const dlg = document.createElement("dialog");
    dlg.className = "app-sheet";
    dlg.innerHTML = `
      <button class="app-x" type="button" aria-label="Close">×</button>
      <div class="app-in">
        <div class="app-phone" aria-hidden="true">
          <div class="app-screen">
            ${tiles.join("")}
          </div>
        </div>
        <div class="app-copy">
          <div class="eyebrow">${IOS ? "iPhone & iPad" : MAC_SAFARI ? "Mac" : ANDROID ? "Android" : "Your computer"}</div>
          <h2>Put the Falcons on your ${IOS || ANDROID ? "home screen" : MAC_SAFARI ? "Dock" : "desktop"}</h2>
          <p>Every score, schedule and game day, one tap away. It opens like an app and keeps working with a weak signal in the stands.</p>
          <ol class="app-steps">${steps().map(([ic, h, d], i) => `<li style="--i:${i}"><span class="n">${i + 1}</span><span class="ic">${ic}</span><span><b>${h}</b><small>${d}</small></span></li>`).join("")}</ol>
        </div>
      </div>`;
    document.body.appendChild(dlg);
    dlg.showModal();
    dlg.addEventListener("click", (e) => { if (e.target === dlg || e.target.closest(".app-x")) dlg.close(); });
    dlg.addEventListener("close", () => dlg.remove());
  }

  const row = document.querySelector(".hub-hero .btn-row");
  if (!row) return;
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "btn btn-ghost btn-app";
  btn.innerHTML = `${ICONS.phone}Get the app`;
  btn.addEventListener("click", async () => {
    if (deferred) {
      deferred.prompt();
      const { outcome } = await deferred.userChoice.catch(() => ({}));
      deferred = null;
      if (outcome === "accepted") btn.remove();
      return;
    }
    sheet();
  });
  row.appendChild(btn);
})();
