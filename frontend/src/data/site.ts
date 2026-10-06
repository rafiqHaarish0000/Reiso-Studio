/* ------------------------------------------------------------------ */
/* Reiso Studio — single source of truth for site content.             */
/* Company identity (logo, name, contact) must stay static.            */
/* ------------------------------------------------------------------ */

export const COMPANY = {
  name: "Reiso Studio",
  tagline: "Build. Automate. Grow.",
  description:
    "Technology, digital products, automation, and modern interior solutions designed to move your business forward.",
  city: "Coimbatore – 641009",
  state: "Tamil Nadu, India",
  phoneDisplay: "+91 8637470037",
  phoneHref: "tel:+918637470037",
  whatsapp:
    "https://wa.me/918637470037?text=Hi%20Reiso%20Studio!%20I%20have%20a%20project%20idea%20to%20discuss.",
  email: "reiso_studio@gamil.com",
  mapQuery: "Coimbatore 641009, Tamil Nadu, India",
} as const;

export const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
] as const;

const pic = (seed: string, w = 900, h = 700) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const IMAGES = {
  heroApp: pic("reiso-app-ui", 600, 780),
  heroDashboard: pic("reiso-saas-dash", 640, 420),
  heroMirror: pic("reiso-led-mirror", 560, 420),
  heroIot: pic("reiso-iot-home", 480, 360),
  appFeature: pic("reiso-mobile-dev", 620, 760),
  ledMain: pic("reiso-mirror-lux", 1000, 760),
  ledDetail1: pic("reiso-mirror-round", 560, 560),
  ledDetail2: pic("reiso-switch-smart", 560, 560),
  ledDetail3: pic("reiso-door-auto", 560, 560),
  aboutTeam: pic("reiso-studio-team", 1000, 640),
  aboutOffice: pic("reiso-office-tech", 800, 600),
  contactOffice: pic("reiso-contact-hq", 800, 620),
} as const;

export type Category = {
  icon: string;
  title: string;
  blurb: string;
  points: string[];
};

export const CATEGORIES: Category[] = [
  {
    icon: "📱",
    title: "Mobile Apps",
    blurb: "Our flagship craft — apps people love to use every day.",
    points: ["Android", "iOS", "React Native", "Flutter & cross-platform"],
  },
  {
    icon: "🌐",
    title: "Web Apps",
    blurb: "Modern, scalable, responsive web apps and business portals.",
    points: ["Business portals", "Responsive UI", "API-driven builds"],
  },
  {
    icon: "☁️",
    title: "SaaS Products",
    blurb: "Subscription platforms, dashboards and admin systems.",
    points: ["Dashboards", "Admin systems", "Billing & subscriptions"],
  },
  {
    icon: "🤖",
    title: "IoT & Automation",
    blurb: "Smart devices and automated systems for homes & business.",
    points: ["Smart switches", "Access automation", "Custom controllers"],
  },
  {
    icon: "📣",
    title: "Digital Marketing",
    blurb: "Campaigns and content that make brands impossible to ignore.",
    points: ["Social media", "Brand visibility", "Content strategy"],
  },
  {
    icon: "🪞",
    title: "Smart Interiors",
    blurb: "LED mirrors, automatic doors and lighting automation.",
    points: ["LED mirrors", "Automatic doors", "Lighting automation"],
  },
];

export const APP_CAPABILITIES = [
  "React Native",
  "Flutter",
  "Android",
  "iOS",
  "API Integration",
  "Authentication",
  "Payment Integration",
  "Admin Panels",
  "Push Notifications",
  "Maps & Location",
  "Real-Time Features",
  "Store Deployment",
];

export type Template = { name: string; category: string; seed: string };

export const TEMPLATES: Template[] = [
  { name: "ShopKart", category: "E-Commerce", seed: "reiso-t-ecom" },
  { name: "LearnLeap", category: "LMS", seed: "reiso-t-lms" },
  { name: "DocuVault", category: "DMS", seed: "reiso-t-dms" },
  { name: "FolioX", category: "Portfolio", seed: "reiso-t-folio" },
  { name: "BizEdge", category: "Business Website", seed: "reiso-t-biz" },
  { name: "LaunchPad", category: "Landing Page", seed: "reiso-t-land" },
  { name: "FoodHaus", category: "Restaurant", seed: "reiso-t-food" },
  { name: "AgencyPro", category: "Agency", seed: "reiso-t-agency" },
  { name: "SaaSly", category: "SaaS", seed: "reiso-t-saas" },
  { name: "MetricBoard", category: "Dashboard", seed: "reiso-t-dash" },
];

export type Product = {
  name: string;
  category: string;
  blurb: string;
  seed: string;
  cta: string;
};

export const PRODUCT_GROUPS: { title: string; items: Product[] }[] = [
  {
    title: "Digital Products",
    items: [
      { name: "Mobile Applications", category: "ANDROID · IOS", blurb: "High-performance cross-platform apps built for startups and enterprises.", seed: "reiso-p-app", cta: "Get a Quote" },
      { name: "SaaS Platforms", category: "CLOUD SOFTWARE", blurb: "Multi-tenant dashboards, billing and analytics out of the box.", seed: "reiso-p-saas", cta: "Explore Product" },
      { name: "Web Applications", category: "WEB PLATFORMS", blurb: "Responsive portals and internal tools your team will actually enjoy.", seed: "reiso-p-web", cta: "Explore Product" },
      { name: "Business Management Systems", category: "ERP · CRM", blurb: "Billing, inventory, staff and customer workflows in one place.", seed: "reiso-p-bms", cta: "Talk to Us" },
      { name: "Custom Dashboards", category: "ANALYTICS", blurb: "Real-time metrics and reports tailored to how you run business.", seed: "reiso-p-dash", cta: "Explore Product" },
      { name: "Free Website Templates", category: "STARTERS", blurb: "10 production-grade starters across e-commerce, LMS, DMS and more.", seed: "reiso-p-tpl", cta: "Explore Product" },
    ],
  },
  {
    title: "IoT & Automation",
    items: [
      { name: "Smart Switches", category: "SMART HOME", blurb: "Touch + app-controlled switches with schedules and voice support.", seed: "reiso-p-switch", cta: "Get a Quote" },
      { name: "IoT Controllers", category: "HARDWARE", blurb: "Custom controllers that connect machines, meters and motors.", seed: "reiso-p-iot", cta: "Talk to Us" },
      { name: "Smart Lighting", category: "AUTOMATION", blurb: "Scene-based lighting for homes, offices and commercial spaces.", seed: "reiso-p-light", cta: "Explore Product" },
      { name: "Access Automation", category: "SECURITY", blurb: "Biometric and RFID entry with remote monitoring and logs.", seed: "reiso-p-access", cta: "Get a Quote" },
      { name: "Sensor-Based Devices", category: "SENSORS", blurb: "Motion, water-level, temperature and occupancy sensing kits.", seed: "reiso-p-sensor", cta: "Talk to Us" },
      { name: "Smart Home Solutions", category: "BUNDLES", blurb: "Complete room-by-room automation designed and installed.", seed: "reiso-p-home", cta: "Get a Quote" },
    ],
  },
  {
    title: "Interior Technology",
    items: [
      { name: "Advanced LED Mirrors", category: "SIGNATURE", blurb: "Backlit mirrors with touch sensors and premium finishing.", seed: "reiso-p-mirror", cta: "Explore Product" },
      { name: "Touch Sensor Mirrors", category: "BATH · DRESSING", blurb: "One-touch brightness and color-temperature control.", seed: "reiso-p-touch", cta: "Get a Quote" },
      { name: "Smart Mirrors", category: "CONNECTED", blurb: "Display time, weather and stats right on the glass.", seed: "reiso-p-smart", cta: "Talk to Us" },
      { name: "Automatic Doors", category: "ENTRY SYSTEMS", blurb: "Silent sensor sliding doors for showrooms and offices.", seed: "reiso-p-door", cta: "Get a Quote" },
      { name: "Decorative Mirror Solutions", category: "DECOR", blurb: "Custom shapes, frames and etchings for luxury spaces.", seed: "reiso-p-decor", cta: "Explore Product" },
      { name: "Interior Automation Products", category: "FULL STACK", blurb: "Mirrors + lighting + entry bundled for new interiors.", seed: "reiso-p-interior", cta: "Talk to Us" },
    ],
  },
];

export const LED_FEATURES = [
  "Touch Sensor Controls",
  "LED Backlighting",
  "Anti-Fog Options",
  "Custom Sizes",
  "Round Mirrors",
  "Rectangular Mirrors",
  "Luxury Decorative Mirrors",
  "Smart Lighting",
  "Custom Designs",
  "Premium Finishing",
];

export type Service = { title: string; blurb: string; tags: string[] };

export const SERVICES: Service[] = [
  { title: "Mobile App Development", blurb: "End-to-end Android & iOS apps with Flutter or React Native — designed, built, tested and published.", tags: ["React Native", "Flutter", "Play Store", "App Store"] },
  { title: "Web Development", blurb: "Blazing-fast marketing sites, portals and web apps with modern frameworks.", tags: ["React", "Next.js", "Responsive"] },
  { title: "SaaS Development", blurb: "Multi-tenant architecture, subscriptions, roles and analytics from day one.", tags: ["Dashboards", "Billing", "Multi-tenant"] },
  { title: "UI/UX Design", blurb: "Research-backed interfaces, prototypes and design systems users love.", tags: ["Figma", "Prototypes", "Design systems"] },
  { title: "Business Software", blurb: "CRM, ERP, billing and inventory systems modelled on your workflow.", tags: ["CRM", "ERP", "Automation"] },
  { title: "API Integration", blurb: "Payments, maps, SMS, WhatsApp and third-party services wired in cleanly.", tags: ["REST", "Payments", "Webhooks"] },
  { title: "App Maintenance", blurb: "Monthly care plans — updates, monitoring, backups and small improvements.", tags: ["Monitoring", "Updates", "Backups"] },
  { title: "Bug Fixing", blurb: "Stuck with a broken build? We diagnose and fix issues fast with reports.", tags: ["Audit", "Crash fixes", "Performance"] },
  { title: "Production Deployment", blurb: "CI/CD, hosting, domains, SSL and store releases handled for you.", tags: ["CI/CD", "Cloud", "SSL"] },
  { title: "Digital Marketing", blurb: "Social media, campaigns and SEO that turn attention into enquiries.", tags: ["Social", "SEO", "Campaigns"] },
  { title: "IoT Development", blurb: "Firmware + mobile + cloud for connected products that just work.", tags: ["ESP32", "MQTT", "Cloud"] },
  { title: "Automation Solutions", blurb: "Home and office automation — lighting, access, sensors and scenes.", tags: ["Smart home", "Sensors", "Scenes"] },
  { title: "LED Mirror & Interiors", blurb: "Manufacture-grade LED mirrors, smart switches and automatic doors.", tags: ["LED mirrors", "Switches", "Doors"] },
  { title: "Smart Home Automation", blurb: "One app for your entire space — comfort, security and savings.", tags: ["Voice", "App control", "Security"] },
];

export type Project = {
  name: string;
  category: string;
  blurb: string;
  stack: string[];
  seed: string;
};

export const PROJECTS: Project[] = [
  { name: "KiranaKart", category: "E-Commerce Mobile App", blurb: "Grocery ordering app with live tracking, UPI payments and a store-owner dashboard.", stack: ["Flutter", "Firebase", "Razorpay"], seed: "reiso-w-kirana" },
  { name: "EduSpark LMS", category: "Learning Platform", blurb: "Course marketplace with video lessons, quizzes, certificates and mentor chat.", stack: ["React", "Node.js", "PostgreSQL"], seed: "reiso-w-edu" },
  { name: "SalonGlow Suite", category: "Salon + Smart Mirror", blurb: "Booking app paired with in-store LED mirror displays and review kiosks.", stack: ["React Native", "IoT", "Stripe"], seed: "reiso-w-salon" },
  { name: "HotelStay Manager", category: "SaaS Dashboard", blurb: "Reservation, housekeeping and billing suite for boutique hotels.", stack: ["Next.js", "Supabase"], seed: "reiso-w-hotel" },
  { name: "FarmSense IoT", category: "Automation System", blurb: "Soil + motor automation with mobile alerts for progressive farmers.", stack: ["ESP32", "MQTT", "Flutter"], seed: "reiso-w-farm" },
  { name: "FitFuel", category: "Fitness App", blurb: "Workout plans, diet tracking and coach video calls in one slick app.", stack: ["Flutter", "RevenueCat"], seed: "reiso-w-fit" },
];

export const COMPANIES = [
  "NOVA Retail",
  "KiranaKart",
  "EduSpark",
  "SalonGlow",
  "HotelStay",
  "FarmSense",
  "FitFuel",
  "UrbanNest",
  "MediCare+",
  "BuildRight",
];

export type Testimonial = { quote: string; name: string; role: string };

export const TESTIMONIALS: Testimonial[] = [
  { quote: "Reiso took my rough idea and shipped a polished app in weeks. The quality easily matches agencies charging 3x more.", name: "Arun Prakash", role: "Founder, KiranaKart" },
  { quote: "Communication was instant and honest. Every milestone arrived on time with a demo video I could share with my team.", name: "Sara Thomas", role: "Owner, SalonGlow" },
  { quote: "Our hotel operations finally run on one dashboard. Billing errors dropped to zero in the first month itself.", name: "Mohammed Rizwan", role: "Director, HotelStay" },
  { quote: "The LED mirrors completely changed our showroom vibe — premium finishing, perfect lighting, zero hassle.", name: "Divya Nair", role: "Interior Designer" },
  { quote: "From LMS template to full production platform with payments and certificates. Flawless deployment and support.", name: "Karthik Raja", role: "Founder, EduSpark" },
  { quote: "Affordable, fast and genuinely skilled with IoT. Our farm motors now run on autopilot with phone alerts.", name: "Senthil Kumar", role: "Agri Entrepreneur" },
];

export const STATS = [
  { value: 10, suffix: "+", label: "Free Templates" },
  { value: 25, suffix: "+", label: "Projects Delivered" },
  { value: 14, suffix: "", label: "Service Verticals" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

export const WHY_POINTS = [
  "Affordable Development",
  "Modern Technology Stack",
  "Custom Solutions",
  "Startup-Friendly Pricing",
  "Fast Development",
  "Scalable Architecture",
  "Direct Communication",
  "UI-Focused Development",
  "Post-Launch Support",
  "Software + IoT + Interiors — one brand",
];

export const PROCESS = [
  { no: "01", title: "Tell Us Your Idea", blurb: "Share your business problem, app idea, website requirement, or automation need." },
  { no: "02", title: "We Plan the Solution", blurb: "We understand requirements and prepare the right technology approach." },
  { no: "03", title: "Design & Development", blurb: "We design the interface and start building the product." },
  { no: "04", title: "Testing & Launch", blurb: "We test, optimize, deploy, and launch the product." },
  { no: "05", title: "Support & Growth", blurb: "We continue supporting improvements and future updates." },
];

export const VALUES = [
  { title: "Quality", blurb: "Pixel-perfect builds, tested on real devices before anything ships." },
  { title: "Affordability", blurb: "Startup-friendly pricing without cutting a single corner." },
  { title: "Transparency", blurb: "Fixed scopes, weekly demos, honest timelines — no surprises." },
  { title: "Innovation", blurb: "Modern stacks and creative problem-solving on every project." },
  { title: "Long-Term Support", blurb: "We stay after launch with care plans and quick fixes." },
  { title: "Business-First", blurb: "Every feature must earn revenue, save time, or delight users." },
];

export const SERVICE_OPTIONS = [
  "Mobile App",
  "Website",
  "Web Application",
  "SaaS",
  "UI/UX",
  "Digital Marketing",
  "IoT",
  "Automation",
  "LED Mirror",
  "Interior Automation",
  "Other",
];

export const FAQS = [
  { q: "How much does a mobile app cost?", a: "Most startup apps land between ₹49,999 and ₹2,50,000 depending on features. Share your idea and we will send a fixed, transparent quote within 48 hours." },
  { q: "How long does development take?", a: "A typical app takes 4–8 weeks, websites 2–4 weeks, and LED mirror orders 7–14 days including installation in and around Coimbatore." },
  { q: "Do you customize your free templates?", a: "Yes — we can rebrand, add features, integrate APIs, fix bugs, deploy, and convert any starter template into a production-ready product." },
  { q: "Do you provide support after launch?", a: "Every project includes free launch support, plus affordable monthly care plans for updates, monitoring and improvements." },
  { q: "Do you install LED mirrors and automation?", a: "Yes. We design, supply and install mirrors, smart switches and automatic doors for homes and commercial spaces." },
];
