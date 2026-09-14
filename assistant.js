/* Behandlungsfinder – klickbasierter Wegweiser, keine Datenerhebung */
(function () {
  var L = (document.documentElement.lang || "de").slice(0, 2);
  if (L !== "hu" && L !== "en") L = "de";
  var P = ""; // Ziele sind seitenrelativ: en/ und hu/ haben eigene Seiten

  var T = {
    de: {
      open: "Wie können wir helfen?",
      title: "Wegweiser",
      sub: "Ein paar Klicks – als erste Orientierung, nicht als Diagnose.",
      back: "Zurück",
      restart: "Von vorne",
      result: "Das könnte passen",
      more: "Zur Behandlung",
      book: "Beratung buchen",
      close: "Schließen",
      note: "Diese Einschätzung ersetzt kein ärztliches Gespräch. Was in Ihrem Fall sinnvoll " +
            "ist, klären wir gemeinsam bei der Beratung.",
      start: "qs",
      q: {
        qs: { t: "Womit können wir Ihnen helfen?", a: [
          ["Welche Behandlung passt zu mir?", "q0"],
          ["Behandlungen ansehen", "L:index.html#behandlungen"],
          ["Preise ansehen", "L:preisliste.html"],
          ["Häufige Fragen", "L:index.html#faq"],
          ["Wissenswertes lesen", "L:wissen.html"],
          ["Termin buchen", "L:termin.html"],
          ["Kontakt aufnehmen", "L:kontakt.html"]]},
        q0: { t: "Was beschäftigt Sie am meisten?", a: [
          ["Falten und Linien", "q1"],
          ["Meine Lippen", "q2"],
          ["Hautqualität und Ausstrahlung", "q3"],
          ["Volumenverlust und Kontur", "r_bio"],
          ["Ein medizinisches Anliegen", "q4"],
          ["Ich bin unsicher", "r_beratung"]]},
        q1: { t: "Sind die Linien auch sichtbar, wenn Ihr Gesicht ganz entspannt ist?", a: [
          ["Nein, nur beim Bewegen", "r_botox"],
          ["Ja, auch in Ruhe", "r_hyaluron"],
          ["Beides", "r_kombi"]]},
        q2: { t: "Was möchten Sie erreichen?", a: [
          ["Mehr Volumen und Kontur", "r_lippen"],
          ["Nur eine sichtbarere Oberlippe", "r_lipflip"],
          ["Ein früheres Ergebnis korrigieren", "r_hylase"]]},
        q3: { t: "Was steht im Vordergrund?", a: [
          ["Trockenheit, fehlender Glanz", "r_skinbooster"],
          ["Poren, Narben, unebene Textur", "r_microneedling"],
          ["Müde, fahle Haut", "r_prp"],
          ["Dünne, geschwächte Haut", "r_polynukleotide"]]},
        q4: { t: "Worum geht es?", a: [
          ["Übermäßiges Schwitzen", "r_hyperhidrose"],
          ["Zähneknirschen, Kieferschmerzen", "r_bruxismus"],
          ["Chronische Migräne", "r_migraene"]]}
      },
      r: {
        r_botox: ["Botox", "Bewegungsbedingte Linien entstehen durch Muskelaktivität – " +
          "Botulinumtoxin entspannt gezielt.", "botox-graz.html"],
        r_hyaluron: ["Hyaluronsäure-Filler", "Linien, die auch in Ruhe bleiben, entstehen " +
          "durch Volumenverlust – hier wird aufgefüllt.", "hyaluron-graz.html"],
        r_kombi: ["Botox und Hyaluron kombiniert", "Beide Ursachen zusammen behandelt – " +
          "häufig das harmonischste Ergebnis.", "vergleich-botox-hyaluron.html"],
        r_lippen: ["Lippenunterspritzung", "Hyaluronsäure für Volumen und Kontur, in einem " +
          "Maß, das zu Ihrem Gesicht passt.", "lippen-graz.html"],
        r_lipflip: ["Lip Flip", "Eine sehr kleine Menge Botulinumtoxin – die Oberlippe wirkt " +
          "sichtbarer, ohne zusätzliches Volumen.", "botox-graz.html"],
        r_hylase: ["Hylase", "Hyaluronsäure lässt sich mit einem Enzym wieder auflösen.",
          "hylase-graz.html"],
        r_skinbooster: ["Skinbooster", "Feuchtigkeit von innen – für Spannkraft und Glanz.",
          "skinbooster-graz.html"],
        r_microneedling: ["Medizinisches Microneedling", "Feine Impulse regen die " +
          "Kollagenbildung an – für Textur und Narben.", "microneedling-graz.html"],
        r_prp: ["PRP / Plasma Lifting", "Regeneration mit körpereigenen Wachstumsfaktoren.",
          "prp-graz.html"],
        r_polynukleotide: ["Polynukleotide", "Zellregeneration statt Auffüllen – auch für die " +
          "empfindliche Augenpartie.", "polynukleotide-graz.html"],
        r_bio: ["Biostimulatoren", "Kollagenaufbau aus eigener Kraft – für Dichte und Kontur.",
          "biostimulatoren-graz.html"],
        r_hyperhidrose: ["Hyperhidrose-Behandlung", "Deutlich reduzierte Schweißbildung für " +
          "mehrere Monate.", "hyperhidrose-graz.html"],
        r_bruxismus: ["Bruxismus-Behandlung", "Entlastung des Kaumuskels bei Zähneknirschen.",
          "bruxismus-graz.html"],
        r_migraene: ["Migräne-Behandlung", "Botulinumtoxin nach standardisiertem Schema.",
          "migraene-graz.html"],
        r_beratung: ["Ärztliches Beratungsgespräch", "Der beste Start: Analyse, ehrliche " +
          "Einschätzung und ein Plan – ganz ohne Festlegung.", "preisliste.html"]
      }
    },
    hu: {
      open: "Miben segíthetünk?",
      title: "Útmutató",
      sub: "Néhány kattintás – első tájékozódásnak, nem diagnózisnak.",
      back: "Vissza", restart: "Elölről", result: "Ez lehet a megfelelő",
      more: "A kezelés oldala", book: "Konzultáció foglalása", close: "Bezárás",
      note: "Ez a tájékoztatás nem helyettesíti az orvosi konzultációt. Hogy az Ön esetében mi " +
            "indokolt, azt közösen tisztázzuk.",
      start: "qs",
      q: {
        qs: { t: "Miben segíthetek?", a: [
          ["Melyik kezelés való nekem?", "q0"],
          ["Kezelések megtekintése", "L:index.html#behandlungen"],
          ["Árak megtekintése", "L:preisliste.html"],
          ["Gyakori kérdések", "L:index.html#faq"],
          ["Tudástár", "L:../wissen.html"],
          ["Időpontfoglalás", "L:termin.html"],
          ["Kapcsolatfelvétel", "L:kontakt.html"]]},
        q0: { t: "Mi foglalkoztatja leginkább?", a: [
          ["Ráncok és vonalak", "q1"],
          ["Az ajkam", "q2"],
          ["A bőr minősége és ragyogása", "q3"],
          ["Volumenvesztés és kontúr", "r_bio"],
          ["Orvosi panasz", "q4"],
          ["Bizonytalan vagyok", "r_beratung"]]},
        q1: { t: "A vonalak akkor is látszanak, ha teljesen ellazítja az arcát?", a: [
          ["Nem, csak mozgás közben", "r_botox"],
          ["Igen, nyugalomban is", "r_hyaluron"],
          ["Mindkettő", "r_kombi"]]},
        q2: { t: "Mit szeretne elérni?", a: [
          ["Több volument és kontúrt", "r_lippen"],
          ["Csak láthatóbb felső ajkat", "r_lipflip"],
          ["Egy korábbi eredmény korrigálását", "r_hylase"]]},
        q3: { t: "Mi áll a középpontban?", a: [
          ["Szárazság, fakó bőr", "r_skinbooster"],
          ["Pórusok, hegek, egyenetlen felszín", "r_microneedling"],
          ["Fáradt, élettelen bőr", "r_prp"],
          ["Vékony, meggyengült bőr", "r_polynukleotide"]]},
        q4: { t: "Miről van szó?", a: [
          ["Túlzott izzadás", "r_hyperhidrose"],
          ["Fogcsikorgatás, állkapocsfájás", "r_bruxismus"],
          ["Krónikus migrén", "r_migraene"]]}
      },
      r: {
        r_botox: ["Botox", "A mozgásból eredő ráncokat az izom okozza – a botulinum toxin " +
          "célzottan ellazít.", "botox-graz.html"],
        r_hyaluron: ["Hialuronsavas töltés", "A nyugalomban is látszó ránc volumenvesztésből " +
          "ered – itt feltöltésre van szükség.", "hyaluron-graz.html"],
        r_kombi: ["Botox és hialuron együtt", "Mindkét ok kezelve – gyakran ez adja a " +
          "legharmonikusabb eredményt.", "vergleich-botox-hyaluron.html"],
        r_lippen: ["Ajakfeltöltés", "Hialuronsav a volumenért és a kontúrért, az arcához " +
          "illő mértékben.", "lippen-graz.html"],
        r_lipflip: ["Lip flip", "Nagyon kis mennyiségű botulinum toxin – a felső ajak " +
          "láthatóbb lesz, volumen nélkül.", "botox-graz.html"],
        r_hylase: ["Hylase", "A hialuronsav enzimmel feloldható.", "hylase-graz.html"],
        r_skinbooster: ["Skinbooster", "Nedvesség belülről – a feszességért és a ragyogásért.",
          "skinbooster-graz.html"],
        r_microneedling: ["Orvosi microneedling", "Finom ingerek serkentik a kollagénépítést – " +
          "a textúráért és a hegekre.", "microneedling-graz.html"],
        r_prp: ["PRP / plazma lifting", "Regeneráció saját növekedési faktorokkal.",
          "prp-graz.html"],
        r_polynukleotide: ["Polinukleotidok", "Sejtregeneráció feltöltés helyett – az érzékeny " +
          "szemkörnyékre is.", "polynukleotide-graz.html"],
        r_bio: ["Biostimulátorok", "Kollagénépítés saját erőből – a sűrűségért és a kontúrért.",
          "biostimulatoren-graz.html"],
        r_hyperhidrose: ["Hyperhidrosis kezelése", "Érezhetően kevesebb izzadás, hónapokon át.",
          "hyperhidrose-graz.html"],
        r_bruxismus: ["Bruxizmus kezelése", "A rágóizom tehermentesítése fogcsikorgatásnál.",
          "bruxismus-graz.html"],
        r_migraene: ["Migrén kezelése", "Botulinum toxin szabványosított séma szerint.",
          "migraene-graz.html"],
        r_beratung: ["Orvosi konzultáció", "A legjobb kezdés: elemzés, őszinte vélemény és egy " +
          "terv – kötelezettség nélkül.", "preisliste.html"]
      }
    },
    en: {
      open: "How can we help?",
      title: "Guide",
      sub: "A few clicks – for orientation, not a diagnosis.",
      back: "Back", restart: "Start over", result: "This could suit you",
      more: "View treatment", book: "Book a consultation", close: "Close",
      note: "This is not a substitute for a medical consultation. What makes sense in your " +
            "case is something we clarify together.",
      start: "qs",
      q: {
        qs: { t: "How can I help you?", a: [
          ["Which treatment suits me?", "q0"],
          ["View treatments", "L:index.html#behandlungen"],
          ["View prices", "L:preisliste.html"],
          ["Frequently asked questions", "L:index.html#faq"],
          ["Knowledge base", "L:wissen.html"],
          ["Book an appointment", "L:termin.html"],
          ["Get in touch", "L:kontakt.html"]]},
        q0: { t: "What concerns you most?", a: [
          ["Lines and wrinkles", "q1"],
          ["My lips", "q2"],
          ["Skin quality and radiance", "q3"],
          ["Loss of volume and contour", "r_bio"],
          ["A medical concern", "q4"],
          ["I'm not sure", "r_beratung"]]},
        q1: { t: "Are the lines visible when your face is completely relaxed?", a: [
          ["No, only when I move", "r_botox"],
          ["Yes, also at rest", "r_hyaluron"],
          ["Both", "r_kombi"]]},
        q2: { t: "What would you like to achieve?", a: [
          ["More volume and contour", "r_lippen"],
          ["Just a more visible upper lip", "r_lipflip"],
          ["Correct an earlier result", "r_hylase"]]},
        q3: { t: "What matters most?", a: [
          ["Dryness, lack of glow", "r_skinbooster"],
          ["Pores, scars, uneven texture", "r_microneedling"],
          ["Tired, dull skin", "r_prp"],
          ["Thin, weakened skin", "r_polynukleotide"]]},
        q4: { t: "What is it about?", a: [
          ["Excessive sweating", "r_hyperhidrose"],
          ["Teeth grinding, jaw pain", "r_bruxismus"],
          ["Chronic migraine", "r_migraene"]]}
      },
      r: {
        r_botox: ["Botox", "Movement-related lines are caused by muscle activity – botulinum " +
          "toxin relaxes them selectively.", "botox-graz.html"],
        r_hyaluron: ["Hyaluronic acid fillers", "Lines that remain at rest come from volume " +
          "loss – here volume is replaced.", "hyaluron-graz.html"],
        r_kombi: ["Botox and hyaluronic acid combined", "Both causes addressed – often the " +
          "most harmonious result.", "vergleich-botox-hyaluron.html"],
        r_lippen: ["Lip augmentation", "Hyaluronic acid for volume and contour, in a measure " +
          "that suits your face.", "lippen-graz.html"],
        r_lipflip: ["Lip flip", "A very small amount of botulinum toxin – the upper lip looks " +
          "more visible, without added volume.", "botox-graz.html"],
        r_hylase: ["Hylase", "Hyaluronic acid can be dissolved with an enzyme.",
          "hylase-graz.html"],
        r_skinbooster: ["Skin boosters", "Moisture from within – for firmness and glow.",
          "skinbooster-graz.html"],
        r_microneedling: ["Medical microneedling", "Fine impulses stimulate collagen – for " +
          "texture and scars.", "microneedling-graz.html"],
        r_prp: ["PRP / plasma lifting", "Regeneration with your own growth factors.",
          "prp-graz.html"],
        r_polynukleotide: ["Polynucleotides", "Cell regeneration instead of filling – also for " +
          "the delicate eye area.", "polynukleotide-graz.html"],
        r_bio: ["Biostimulators", "Collagen built from within – for density and contour.",
          "biostimulatoren-graz.html"],
        r_hyperhidrose: ["Hyperhidrosis treatment", "Noticeably reduced sweating for months.",
          "hyperhidrose-graz.html"],
        r_bruxismus: ["Bruxism treatment", "Relieving the jaw muscle in teeth grinding.",
          "bruxismus-graz.html"],
        r_migraene: ["Migraine treatment", "Botulinum toxin to a standardised scheme.",
          "migraene-graz.html"],
        r_beratung: ["Medical consultation", "The best start: analysis, an honest assessment " +
          "and a plan – with no commitment.", "preisliste.html"]
      }
    }
  }[L];

  var hist = [];

  function push(name, extra) {
    window.dataLayer = window.dataLayer || [];
    var d = { event: name };
    if (extra) for (var k in extra) d[k] = extra[k];
    window.dataLayer.push(d);
  }

  var btn = document.createElement("button");
  btn.className = "bf-open";
  btn.type = "button";
  btn.setAttribute("aria-label", T.open);
  btn.setAttribute("title", T.open);
  btn.innerHTML = "?";

  var box = document.createElement("div");
  box.className = "bf-box";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-label", T.title);
  box.innerHTML =
    '<div class="bf-head"><div><b>' + T.title + '</b><span>' + T.sub + '</span></div>' +
    '<button class="bf-x" type="button" aria-label="' + T.close + '">&times;</button></div>' +
    '<div class="bf-body"></div>' +
    '<div class="bf-foot"><button class="bf-back" type="button">' + T.back + '</button>' +
    '<button class="bf-restart" type="button">' + T.restart + '</button></div>';

  document.body.appendChild(btn);
  document.body.appendChild(box);

  var body = box.querySelector(".bf-body");
  var backBtn = box.querySelector(".bf-back");

  function step(id) {
    backBtn.style.visibility = hist.length > 1 ? "visible" : "hidden";
    if (T.q[id]) {
      var q = T.q[id];
      var h = '<p class="bf-q">' + q.t + "</p>";
      for (var i = 0; i < q.a.length; i++) {
        h += '<button class="bf-a" type="button" data-go="' + q.a[i][1] + '">' +
             q.a[i][0] + "</button>";
      }
      body.innerHTML = h;
      body.scrollTop = 0;
      return;
    }
    var r = T.r[id];
    if (!r) return;
    push("finder_result", { finder_result: r[0] });
    body.innerHTML =
      '<p class="bf-rl">' + T.result + "</p>" +
      '<p class="bf-rt">' + r[0] + "</p>" +
      '<p class="bf-rd">' + r[1] + "</p>" +
      '<a class="bf-cta" href="' + P + r[2] + '">' + T.more + "</a>" +
      '<a class="bf-cta bf-ghost" href="' + P + 'termin.html">' + T.book + "</a>" +
      '<p class="bf-note">' + T.note + "</p>";
    body.scrollTop = 0;
  }

  function go(id) { hist.push(id); step(id); }

  btn.addEventListener("click", function () {
    box.classList.add("open");
    btn.classList.add("hide");
    if (!hist.length) { hist = []; go(T.start); }
    push("finder_open");
  });
  box.querySelector(".bf-x").addEventListener("click", function () {
    box.classList.remove("open"); btn.classList.remove("hide");
  });
  backBtn.addEventListener("click", function () {
    if (hist.length > 1) { hist.pop(); step(hist[hist.length - 1]); }
  });
  box.querySelector(".bf-restart").addEventListener("click", function () {
    hist = []; go(T.start);
  });
  body.addEventListener("click", function (e) {
    var a = e.target.closest(".bf-a");
    if (!a) return;
    var t = a.getAttribute("data-go");
    if (t.indexOf("L:") === 0) {
      push("finder_link", { finder_target: t.slice(2) });
      location.href = P + t.slice(2);
      return;
    }
    go(t);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && box.classList.contains("open")) {
      box.classList.remove("open"); btn.classList.remove("hide");
    }
  });
})();
