/* ============================================================
   translations.js
   Simple i18n for Ujwala Eco Products (English / Hindi / Telugu)

   How it works:
   - Every translatable element in index.html has a data-i18n="KEY"
     attribute (for text) or data-i18n-placeholder="KEY" (for input
     placeholders).
   - This file holds a dictionary of KEY -> text for each language.
   - applyLanguage(lang) walks the page and swaps text/placeholders.
   - The chosen language is remembered in localStorage so it
     persists across page reloads.

   NOTE: A few elements were intentionally left WITHOUT a
   translation key (the trust-name heading, the founder's photo
   tag "N.SUGUNA", and the Google Map embed) because they contain
   images/embeds or proper nouns that shouldn't be swapped out.
   ============================================================ */

const translations = {
  en: {
    nav_home: "Home",
    nav_story: "About Us",
    nav_products: "Collections",
    nav_contact_btn: "Get in touch",

    story_eyebrow: "Our Story",
    story_title: "Welcome to Ujwala Eco Products",
    story_p1:
      "We are a small-scale production unit named Ujwala Eco Products, specializing in the manufacturing of high-quality Jute Bags. Our unit is located within our residential premises at Simhadrinagar, Sector-1, Duvvada, near Duvvada Railway Station.",
    story_p2:
      "Our primary mission is to create employment opportunities for homemakers in and around our locality, thereby promoting women's empowerment and supporting their financial independence.",
    story_p3:
      "We are also committed to protecting the environment by encouraging the use of eco-friendly, biodegradable jute products. Through our initiative, we aim to reduce the use of plastic and create greater environmental awareness among the public.",
    story_p4:
      "Along with our Jute Bags, we also Supply Brass & German Silver items like Pooja related, Idols of God and Godesses for Return Gifts. We also Supply Etikoppaka wodden Toys for different occasions and for Return Gifts.",
    story_quote:
      "\"We wanted to build something people would actually reach for — not because it's eco-friendly, but because it's the better bag.\" — Founder, Ujawala Eco Products",

    why_title: "Our Collections:",

    products_eyebrow: "The Collection",
    products_title: "Bags for every day, and every load.",

    p1_label: "Grocery — Small",
    p1_title: "Stationery Pouch Bags",
    p1_desc: "Wide base and tall sides made to hold your desk essentials.",

    p2_label: "Grocery — Large",
    p2_title: "Grocery Bag (Single-Zip)",
    p2_desc: "Wide base and tall sides made to hold your grocery.",

    p3_label: "Grocery — Large",
    p3_title: "Grocery Bag (Double-Zip)",
    p3_desc: "Wide base and tall sides used in Multi-purposes.",

    p4_label: "Grocery — Medium",
    p4_title: "Gift Bag",
    p4_desc: "Wide base and tall sides made to hold your valuable gifts",

    p5_label: "Grocery — Medium",
    p5_title: "Bottle Bag",
    p5_desc: "Wide base and tall sides made to hold bottles",

    p6_label: "Grocery - Large",
    p6_title: "Shopping Bag",
    p6_desc: "Wide base and tall sides made to hold your shopping Items",

    price_tag: "Enquire for price",
    enquire_link: "Enquire →",

    cta_title: "Looking for the Added Products?",
    cta_btn: "CART",

    contact_eyebrow: "Get In Touch",
    contact_title: "Tell us what you need.",
    label_name: "Name",
    placeholder_name: "Your full name",
    label_phone: "Phone or Email",
    placeholder_phone: "How should we reach you?",
    label_message: "Message",
    placeholder_message: "Tell us about the order — quantity, bag type, etc.",
    btn_send: "Send message",

    contact_side_title: "Reach us directly",
    contact_label_phone: "Phone",
    contact_label_email: "Email",
    contact_label_workshop: "Address :",

    whatsapp_btn: "Chat on WhatsApp",

    footer_copyright: "© Ujwala Eco Products. All rights reserved.",
    footer_tagline: "Made with jute, not plastic.",
  },

  hi: {
    nav_home: "होम",
    nav_story: "हमारे बारे में",
    nav_products: "संग्रह",
    nav_contact_btn: "संपर्क करें",

    story_eyebrow: "हमारी कहानी",
    story_title: "उज्ज्वला इको प्रोडक्ट्स में आपका स्वागत है",
    story_p1:
      "हम उज्ज्वला इको प्रोडक्ट्स नामक एक लघु-स्तरीय उत्पादन इकाई हैं, जो उच्च गुणवत्ता वाले जूट बैग बनाने में विशेषज्ञता रखती है। हमारी इकाई दुव्वाडा रेलवे स्टेशन के पास, सिम्हाद्रिनगर, सेक्टर-1, दुव्वाडा में हमारे आवासीय परिसर में स्थित है।",
    story_p2:
      "हमारा प्राथमिक उद्देश्य अपने क्षेत्र और आस-पास की गृहिणियों के लिए रोजगार के अवसर पैदा करना है, जिससे महिला सशक्तिकरण को बढ़ावा मिले और उनकी आर्थिक स्वतंत्रता को समर्थन मिले।",
    story_p3:
      "हम पर्यावरण की रक्षा के लिए भी प्रतिबद्ध हैं, इसके लिए हम पर्यावरण-अनुकूल, जैव-अपघटनीय जूट उत्पादों के उपयोग को बढ़ावा देते हैं। अपनी इस पहल के माध्यम से, हमारा उद्देश्य प्लास्टिक के उपयोग को कम करना और जनता में अधिक पर्यावरण जागरूकता पैदा करना है।",
    story_p4:
      "हमारे जूट बैग के साथ-साथ, हम पूजा से संबंधित पीतल और जर्मन सिल्वर की वस्तुएं, भगवान और देवी-देवताओं की मूर्तियां भी रिटर्न गिफ्ट के लिए उपलब्ध कराते हैं। हम विभिन्न अवसरों और रिटर्न गिफ्ट के लिए एटिकोप्पाका की लकड़ी की खिलौने भी उपलब्ध कराते हैं।",
    story_quote:
      '"हम कुछ ऐसा बनाना चाहते थे जिसे लोग वास्तव में अपनाएं — इसलिए नहीं कि यह पर्यावरण-अनुकूल है, बल्कि इसलिए कि यह एक बेहतर बैग है।" — संस्थापक, उज्जावला इको प्रोडक्ट्स',

    why_title: "हमारा संग्रह:",

    products_eyebrow: "संग्रह",
    products_title: "हर दिन और हर भार के लिए बैग।",

    p1_label: "किराना — छोटा",
    p1_title: "स्टेशनरी पाउच बैग",
    p1_desc:
      "चौड़ा आधार और ऊंचे किनारे, आपकी डेस्क की ज़रूरी चीज़ों को रखने के लिए बने हैं।",

    p2_label: "किराना — बड़ा",
    p2_title: "किराना बैग (सिंगल-ज़िप)",
    p2_desc:
      "चौड़ा आधार और ऊंचे किनारे, आपके किराने के सामान को रखने के लिए बने हैं।",

    p3_label: "किराना — बड़ा",
    p3_title: "किराना बैग (डबल-ज़िप)",
    p3_desc: "चौड़ा आधार और ऊंचे किनारे, कई उपयोगों के लिए बने हैं।",

    p4_label: "किराना — मध्यम",
    p4_title: "उपहार बैग",
    p4_desc:
      "चौड़ा आधार और ऊंचे किनारे, आपके कीमती उपहारों को रखने के लिए बने हैं",

    p5_label: "किराना — मध्यम",
    p5_title: "बॉटल बैग",
    p5_desc: "चौड़ा आधार और ऊंचे किनारे, बोतलों को रखने के लिए बने हैं",

    p6_label: "किराना - बड़ा",
    p6_title: "शॉपिंग बैग",
    p6_desc:
      "चौड़ा आधार और ऊंचे किनारे, आपकी खरीदारी की चीज़ों को रखने के लिए बने हैं",

    price_tag: "मूल्य के लिए पूछताछ करें",
    enquire_link: "पूछताछ करें →",

    cta_title: "अतिरिक्त उत्पादों की तलाश है?",
    cta_btn: "कार्ट",

    contact_eyebrow: "संपर्क करें",
    contact_title: "बताएं आपको क्या चाहिए।",
    label_name: "नाम",
    placeholder_name: "आपका पूरा नाम",
    label_phone: "फ़ोन या ईमेल",
    placeholder_phone: "हम आपसे कैसे संपर्क करें?",
    label_message: "संदेश",
    placeholder_message:
      "ऑर्डर के बारे में बताएं — मात्रा, बैग का प्रकार, आदि।",
    btn_send: "संदेश भेजें",

    contact_side_title: "सीधे हमसे संपर्क करें",
    contact_label_phone: "फ़ोन",
    contact_label_email: "ईमेल",
    contact_label_workshop: "पता :",

    whatsapp_btn: "व्हाट्सएप पर चैट करें",

    footer_copyright: "© उज्ज्वला इको प्रोडक्ट्स. सर्वाधिकार सुरक्षित।",
    footer_tagline: "जूट से बना, प्लास्टिक से नहीं।",
  },

  te: {
    nav_home: "హోమ్",
    nav_story: "మా గురించి",
    nav_products: "సేకరణలు",
    nav_contact_btn: "సంప్రదించండి",

    story_eyebrow: "మా కథ",
    story_title: "ఉజ్వల ఎకో ప్రొడక్ట్స్‌కు స్వాగతం",
    story_p1:
      "మేము ఉజ్వల ఎకో ప్రొడక్ట్స్ అనే చిన్న తరహా ఉత్పత్తి యూనిట్‌గా, అధిక నాణ్యత గల జూట్ బ్యాగుల తయారీలో ప్రత్యేకత కలిగి ఉన్నాము. మా యూనిట్ దువ్వాడ రైల్వే స్టేషన్ సమీపంలో, సింహాద్రినగర్, సెక్టార్-1, దువ్వాడలో మా నివాస ప్రాంగణంలో ఉంది.",
    story_p2:
      "గృహిణులకు మా ప్రాంతంలో మరియు చుట్టుపక్కల ఉపాధి అవకాశాలు కల్పించడం, తద్వారా మహిళా సాధికారతను ప్రోత్సహించడం మరియు వారి ఆర్థిక స్వాతంత్ర్యానికి తోడ్పడటం మా ప్రధాన లక్ష్యం.",
    story_p3:
      "పర్యావరణాన్ని పరిరక్షించడంలో కూడా మేము కట్టుబడి ఉన్నాము, పర్యావరణ అనుకూలమైన, జీవఅధోకరణం చెందే జూట్ ఉత్పత్తుల వాడకాన్ని ప్రోత్సహిస్తాము. మా ఈ కార్యక్రమం ద్వారా, ప్లాస్టిక్ వాడకాన్ని తగ్గించి, ప్రజల్లో మరింత పర్యావరణ అవగాహన కల్పించడమే మా లక్ష్యం.",
    story_p4:
      "మా జూట్ బ్యాగులతో పాటు, పూజా సంబంధిత ఇత్తడి మరియు జర్మన్ సిల్వర్ వస్తువులు, దేవుళ్ళు మరియు దేవతల విగ్రహాలను రిటర్న్ గిఫ్ట్‌ల కోసం కూడా మేము అందిస్తాము. వివిధ సందర్భాలకు మరియు రిటర్న్ గిఫ్ట్‌ల కోసం ఎటికొప్పాక చెక్క బొమ్మలను కూడా అందిస్తాము.",
    story_quote:
      '"ప్రజలు నిజంగా చేరుకునేలా ఏదో ఒకటి తయారు చేయాలని మేము కోరుకున్నాము — ఇది పర్యావరణ అనుకూలమైనది కాబట్టి కాదు, ఇది మెరుగైన బ్యాగ్ కాబట్టి." — వ్యవస్థాపకులు, ఉజావల ఎకో ప్రొడక్ట్స్',

    why_title: "మా సేకరణలు:",

    products_eyebrow: "సేకరణ",
    products_title: "ప్రతి రోజుకు, ప్రతి భారానికి బ్యాగులు.",

    p1_label: "కిరాణా — చిన్నది",
    p1_title: "స్టేషనరీ పౌచ్ బ్యాగులు",
    p1_desc:
      "మీ డెస్క్ అవసరాలను పట్టుకోవడానికి వెడల్పైన బేస్ మరియు ఎత్తైన వైపులతో తయారు చేయబడింది.",

    p2_label: "కిరాణా — పెద్దది",
    p2_title: "కిరాణా బ్యాగ్ (సింగిల్-జిప్)",
    p2_desc:
      "మీ కిరాణా సరుకులను పట్టుకోవడానికి వెడల్పైన బేస్ మరియు ఎత్తైన వైపులతో తయారు చేయబడింది.",

    p3_label: "కిరాణా — పెద్దది",
    p3_title: "కిరాణా బ్యాగ్ (డబుల్-జిప్)",
    p3_desc: "బహుళ ప్రయోజనాల కోసం ఉపయోగించే వెడల్పైన బేస్ మరియు ఎత్తైన వైపులు.",

    p4_label: "కిరాణా — మధ్యస్థం",
    p4_title: "గిఫ్ట్ బ్యాగ్",
    p4_desc:
      "మీ విలువైన బహుమతులను పట్టుకోవడానికి వెడల్పైన బేస్ మరియు ఎత్తైన వైపులతో తయారు చేయబడింది",

    p5_label: "కిరాణా — మధ్యస్థం",
    p5_title: "బాటిల్ బ్యాగ్",
    p5_desc: "బాటిళ్లను పట్టుకోవడానికి వెడల్పైన బేస్ మరియు ఎత్తైన వైపులు",

    p6_label: "కిరాణా - పెద్దది",
    p6_title: "షాపింగ్ బ్యాగ్",
    p6_desc:
      "మీ షాపింగ్ వస్తువులను పట్టుకోవడానికి వెడల్పైన బేస్ మరియు ఎత్తైన వైపులతో తయారు చేయబడింది",

    price_tag: "ధర కోసం విచారించండి",
    enquire_link: "విచారించండి →",

    cta_title: "అదనపు ఉత్పత్తుల కోసం చూస్తున్నారా?",
    cta_btn: "కార్ట్",

    contact_eyebrow: "సంప్రదించండి",
    contact_title: "మీకు ఏమి కావాలో మాకు చెప్పండి.",
    label_name: "పేరు",
    placeholder_name: "మీ పూర్తి పేరు",
    label_phone: "ఫోన్ లేదా ఇమెయిల్",
    placeholder_phone: "మేము మిమ్మల్ని ఎలా సంప్రదించాలి?",
    label_message: "సందేశం",
    placeholder_message:
      "ఆర్డర్ గురించి చెప్పండి — పరిమాణం, బ్యాగ్ రకం, మొదలైనవి.",
    btn_send: "సందేశం పంపండి",

    contact_side_title: "నేరుగా మమ్మల్ని సంప్రదించండి",
    contact_label_phone: "ఫోన్",
    contact_label_email: "ఇమెయిల్",
    contact_label_workshop: "చిరునామా :",

    whatsapp_btn: "వాట్సాప్‌లో చాట్ చేయండి",

    footer_copyright: "© ఉజ్వల ఎకో ప్రొడక్ట్స్. అన్ని హక్కులు కలిగి ఉన్నాయి.",
    footer_tagline: "జూట్‌తో తయారైనది, ప్లాస్టిక్‌తో కాదు.",
  },
};

/* ------------------------------------------------------------
   Apply a language to the page.
   - lang: "en" | "hi" | "te"
------------------------------------------------------------ */
function applyLanguage(lang) {
  const dict = translations[lang] || translations.en;

  // Text content
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (Object.prototype.hasOwnProperty.call(dict, key)) {
      el.textContent = dict[key];
    }
  });

  // Placeholders (inputs / textareas)
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (Object.prototype.hasOwnProperty.call(dict, key)) {
      el.setAttribute("placeholder", dict[key]);
    }
  });

  // Keep <html lang="..."> in sync (helps accessibility/SEO)
  document.documentElement.setAttribute("lang", lang);

  // Remember choice
  try {
    localStorage.setItem("uep_lang", lang);
  } catch (e) {
    /* localStorage may be unavailable (e.g. private browsing) — ignore */
  }

  // Keep the dropdown in sync if this was triggered programmatically
  const select = document.getElementById("langSelect");
  if (select && select.value !== lang) {
    select.value = lang;
  }
}

/* ------------------------------------------------------------
   Wire up the language <select> and restore saved preference
   on page load.
------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("langSelect");

  let savedLang = "en";
  try {
    savedLang = localStorage.getItem("uep_lang") || "en";
  } catch (e) {
    savedLang = "en";
  }

  if (select) {
    select.value = savedLang;
    select.addEventListener("change", (e) => applyLanguage(e.target.value));
  }

  applyLanguage(savedLang);
});
