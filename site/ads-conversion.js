/* Google Ads conversion: click on any "start free trial" link out to MatTrack.

   The visitor leaves the site, so this is a click event, not a thank-you page.
   One delegated listener on document, so links added later are covered too.

   Consent: nothing here runs until the visitor has accepted cookies
   (fg_cookie_consent === "accepted", the same flag that gates GA4). Declined or
   undecided means no Ads tag config and no conversion event.

   Load order: this file must come AFTER script.js / shared.js. They only load
   GA4 when `window.dataLayer` does not exist yet, so this file never creates it
   before they have run.

   Not loaded on /free-trial/, which has its own conversion block.

   SEND_TO is the "Free trial outbound click" action in Google Ads (same label
   the /free-trial/ block uses). Replace it with the Event snippet's send_to if
   the action is ever recreated. A value containing "TODO" disables this file. */
(function () {
  var SEND_TO = "AW-18349180655/4mHFCOm5o-8cEO-Nya1E";
  var LINK = 'a[href*="mattrack.io/forged-grappling/start-trial"]';

  if (SEND_TO.indexOf("TODO") !== -1) return;

  var adsId = SEND_TO.split("/")[0];
  var configured = false;

  function hasConsent() {
    try {
      return localStorage.getItem("fg_cookie_consent") === "accepted";
    } catch (e) {
      return false;
    }
  }

  /* Add the Ads destination to the gtag.js that GA4 consent already loads.
     shared.js keeps its gtag local, so make sure a global one exists. */
  function configure() {
    if (configured || !hasConsent()) return configured;
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== "function") {
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
    }
    /* The account's default is "tag data not consented", and the site sends
       no Consent Mode signals. We only get here after the visitor pressed
       Accept, so tell Google that, ahead of the Ads config and conversion. */
    window.gtag("consent", "update", {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
    });
    window.gtag("config", adsId);
    configured = true;
    return true;
  }

  configure();

  /* Visitor accepts the banner on this page: both banners write consent
     synchronously on click, so re-check just after. */
  document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "cookie-accept") setTimeout(configure, 60);
  });

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest(LINK);
    if (!a || !configure()) return;
    window.gtag("event", "conversion", {
      send_to: SEND_TO,
      transport_type: "beacon",
    });
  });
})();
