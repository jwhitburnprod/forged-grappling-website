/* Google Ads conversion: click on any "start free trial" link out to MatTrack.

   The visitor leaves the site, so this is a click event, not a thank-you page.
   One delegated listener on document, so links added later are covered too.

   Tag and consent: the Google tag (G-KMVGE5L8JL + AW-18349180655) and the Consent
   Mode v2 defaults are inline in every page's <head>. Storage is denied until the
   visitor accepts the banner, and the conversion is sent either way: Consent Mode
   turns it into a cookieless ping when denied, so Google can still model it.
   This file therefore only fires the event, it never loads or configures the tag.

   Leaving the page: on a plain same-tab click we hold the navigation until Google
   confirms the hit (event_callback), with MAX_WAIT as the ceiling so a blocked tag
   (ad blocker) cannot stall the click. transport_type "beacon" is set as well so the
   hit survives the unload if the timeout wins. Modified clicks and target="_blank"
   links keep this page alive, so they are left alone.

   Not loaded on /free-trial/, which has its own conversion block.

   SEND_TO is the "Free trial outbound click" action in Google Ads (same label
   the /free-trial/ block uses). Replace it with the Event snippet's send_to if
   the action is ever recreated. A value containing "TODO" disables this file. */
(function () {
  var SEND_TO = "AW-18349180655/4mHFCOm5o-8cEO-Nya1E";
  var LINK = 'a[href*="mattrack.io/forged-grappling/start-trial"]';
  var MAX_WAIT = 500;

  if (SEND_TO.indexOf("TODO") !== -1) return;

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest(LINK);
    if (!a || typeof window.gtag !== "function") return;

    var plainClick =
      e.button === 0 &&
      !e.defaultPrevented &&
      !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey &&
      a.target !== "_blank";

    var navigated = false;
    function go() {
      if (navigated) return;
      navigated = true;
      window.location.href = a.href;
    }

    window.gtag("event", "conversion", {
      send_to: SEND_TO,
      transport_type: "beacon",
      event_callback: plainClick ? go : undefined,
    });

    if (plainClick) {
      e.preventDefault();
      setTimeout(go, MAX_WAIT);
    }
  });
})();
