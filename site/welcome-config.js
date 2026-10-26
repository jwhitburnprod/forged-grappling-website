/* ============================================================================
   WELCOME PAGES: SHARED CONFIG
   Used by /welcome/, /welcome-kids/ and /welcome-trial/.

   Anything still written like "[THIS]" is a placeholder: replace the WHOLE
   string, brackets included. Left as-is it shows on the page in brackets and
   its link goes nowhere (the browser console lists what is still unfilled).

   Values that only one page needs sit in the config block at the top of
   that page's own index.html:
     /welcome/         FIRST_PAYMENT_DATE_NOTE
     /welcome-kids/    FIRST_PAYMENT_DATE_NOTE, CODE_OF_CONDUCT_URL,
                       SAFEGUARDING_URL, PARENT_POLICY
     /welcome-trial/   DEAL_NAME, DEAL_PRICE, DEAL_LENGTH_TEXT
   ========================================================================== */
window.WELCOME = {
  /* Meta Pixel. 1743028710308190 is the pixel the /free-trial/ page uses and
     the one confirmed under the ad account. The ID in the brief
     (1327405662591208, "Forged Data") did not show events there, so swap it
     back in here only if it now does. */
  META_PIXEL_ID: "1743028710308190",

  /* Links */
  MATTRACK_URL: "[MATTRACK_URL]",
  COMMUNITY_URL: "[COMMUNITY_URL]",

  /* Where the gym is. The map button is built from the address. */
  ADDRESS: "Unit 21, Woodlands Industrial Estate, Eden Vale Rd, Westbury, Wiltshire, BA13 3QS",
  PARKING_NOTE: "[PARKING_NOTE]",

  /* Contact. Shown as tap-to-email and tap-to-call links. */
  CONTACT_EMAIL: "info@forgedgrappling.co.uk",
  CONTACT_PHONE: "07463 580506",

  /* Adult timetable, shown on /welcome/ and /welcome-trial/.
     Edit here and both pages update. (Kids hours are on /welcome-kids/.) */
  TIMETABLE: [
    {
      days: "Mon to Fri",
      time: "6pm to 7pm",
      name: "No-Gi Grappling",
      desc: "A taught class for all levels. This is where most new members start."
    },
    {
      days: "Mon to Thu",
      time: "7pm to 8pm",
      name: "Structured Open Mat",
      desc: "Supervised mat time to drill, spar or ask the coaches questions."
    },
    {
      days: "Fri",
      time: "7pm to 8pm",
      name: "Community Open Mat",
      desc: "Relaxed mat time, open to the whole community."
    }
  ]
};
