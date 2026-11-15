import {
  Product,
  Collection,
  WebsiteSettings,
  HomepageSection,
  NavigationItem,
  ContentPage,
  Order,
  Customer,
  DiscountCode,
  MediaItem
} from '@/types';

export const initialProducts: Product[] = [
  {
    id: 'apex-one',
    name: 'APEX ONE',
    subtitle: 'Racing performance oversized T-shirt',
    price: 1099,
    compareAtPrice: 1499,
    image: '/images/apex-one.jpg',
    backImage: '/images/apex-one.jpg',
    gallery: ['/images/apex-one.jpg', '/images/drop-001-reference.jpg'],
    color: 'Jet Black',
    tag: '01 / RACE DNA',
    category: 'Oversized T-shirts',
    description: 'The definitive APEXORA launch garment. Cut in a heavy 240 GSM combed cotton with high-density racing typography on the front chest and an aggressive angular APEX race-craft graphic stretching across the back shoulders. Built for razor-sharp track sessions and daily street presence.',
    specifications: {
      fit: 'Boxy drop-shoulder oversized fit',
      fabric: '100% Super-Combed Ring-Spun Cotton',
      weight: '240 GSM Ultra-Heavyweight',
      print: 'Dual-pass High Density + Puff Screenprint',
      origin: 'Designed in India · Track Tested',
      care: 'Machine wash cold inside-out · Do not iron direct on graphic'
    },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    sku: 'APX-001-BLK',
    stock: 45,
    active: true,
    featured: true,
    badge: 'DROP 001 EXCLUSIVE',
    createdAt: '2026-01-10T10:00:00Z'
  },
  {
    id: 'redline',
    name: 'REDLINE',
    subtitle: 'Track series oversized T-shirt',
    price: 999,
    compareAtPrice: 1399,
    image: '/images/redline.jpg',
    backImage: '/images/redline.jpg',
    gallery: ['/images/redline.jpg', '/images/drop-001-reference.jpg'],
    color: 'Off White',
    tag: '02 / TRACK SERIES',
    category: 'Oversized T-shirts',
    description: 'Raw pit-lane aesthetic. An off-white vintage canvas adorned with technical checkered flag motifs, tachometer redline gradients, and aerodynamic speed strokes. Designed to mirror the intensity of running on the rev-limiter.',
    specifications: {
      fit: 'Relaxed street oversized silhouette',
      fabric: '100% Combed Cotton Single Jersey',
      weight: '240 GSM Heavyweight Terry-touch',
      print: 'Discharge screen print with Racing Red accents',
      origin: 'Engineered in Bengaluru, India',
      care: 'Cold gentle wash · Line dry in shade'
    },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    sku: 'APX-002-WHT',
    stock: 38,
    active: true,
    featured: true,
    badge: 'BEST SELLER',
    createdAt: '2026-01-12T10:00:00Z'
  },
  {
    id: 'after-dark',
    name: 'APEX AFTER DARK',
    subtitle: 'Night ride oversized T-shirt',
    price: 1199,
    compareAtPrice: 1699,
    image: '/images/after-dark.jpg',
    backImage: '/images/after-dark.jpg',
    gallery: ['/images/after-dark.jpg', '/images/drop-001-reference.jpg'],
    color: 'Washed Charcoal',
    tag: '03 / NIGHT EDITION',
    category: 'Oversized T-shirts',
    description: 'When the circuit floodlights turn off and the city expressways open up. Washed charcoal acid-wash finish with a stealth minimalist chest emblem and a photorealistic midnight superbike racer graphic across the rear. Subtle reflective red racing highlights.',
    specifications: {
      fit: 'Oversized drop-shoulder profile',
      fabric: 'Acid-Washed 100% French Terry Cotton',
      weight: '250 GSM Heavyweight',
      print: 'Sublimated Vintage Print + Reflective Red Details',
      origin: 'Hand-finished in India',
      care: 'Gentle cycle only · Wash separately on first wash'
    },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    sku: 'APX-003-CHR',
    stock: 24,
    active: true,
    featured: true,
    badge: 'LIMITED RUN',
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 'circuit-series',
    name: 'CIRCUIT SERIES',
    subtitle: 'Apex telemetry technical oversized T-shirt',
    price: 1299,
    compareAtPrice: 1799,
    image: '/images/redline.jpg',
    backImage: '/images/apex-one.jpg',
    gallery: ['/images/redline.jpg', '/images/apexora-racing-hero.jpg'],
    color: 'Matte Asphalt',
    tag: '04 / TELEMETRY',
    category: 'Oversized T-shirts',
    description: 'Inspired by sector splits, apex speeds and circuit telemetry. Features technical circuit blueprint maps and racing sector delta times printed in micro-silver metallic ink on heavyweight asphalt cotton.',
    specifications: {
      fit: 'Signature motorsport streetwear cut',
      fabric: '100% Pre-Shrunk Ringspun Cotton',
      weight: '240 GSM Ultra-Density',
      print: 'Metallic Silver Ink & Racing Red Detailing',
      origin: 'Designed for high-speed living',
      care: 'Do not tumble dry · Dry clean or cold machine wash'
    },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    sku: 'APX-004-ASP',
    stock: 50,
    active: true,
    featured: false,
    badge: 'NEW ARRIVAL',
    createdAt: '2026-02-01T10:00:00Z'
  }
];

export const initialCollections: Collection[] = [
  {
    id: 'drop-001',
    slug: 'drop-001',
    title: 'DROP 001 — THE PURSUIT',
    tagline: 'THREE DESIGNS. ONE MINDSET.',
    description: 'The inaugural APEXORA release. For the ones who live for the next corner. Heavyweight racing silhouettes built to conquer both track and street.',
    bannerImage: '/images/apexora-racing-hero.jpg',
    productIds: ['apex-one', 'redline', 'after-dark', 'circuit-series'],
    active: true,
    order: 1
  },
  {
    id: 'rider-series',
    slug: 'rider-series',
    title: 'RIDER SERIES',
    tagline: 'ENGINEERED FOR THE COCKPIT',
    description: 'High-density cotton T-shirts and performance layers designed for riders who demand durability without sacrificing style.',
    bannerImage: '/images/after-dark.jpg',
    productIds: ['after-dark', 'apex-one'],
    active: true,
    order: 2
  },
  {
    id: 'track-essentials',
    slug: 'track-essentials',
    title: 'TRACK ESSENTIALS',
    tagline: 'RACE DAY PREPARATION',
    description: 'Minimalist graphics and bold racing red contrasts inspired by international paddock culture and telemetry metrics.',
    bannerImage: '/images/redline.jpg',
    productIds: ['redline', 'circuit-series'],
    active: true,
    order: 3
  }
];

export const initialSettings: WebsiteSettings = {
  siteName: 'APEXORA',
  tagline: 'BUILT FOR SPEED. DEFINED BY CULTURE.',
  logoText: '/// APEXORA',
  logoUrl: '',
  mobileLogoUrl: '',
  faviconUrl: '',
  announcementText: 'DROP 001 — THE PURSUIT',
  announcementSubtext: 'MOTORSPORT CULTURE - MADE FOR EVERYDAY',
  announcementLink: '/drop-001',
  announcementActive: true,
  primaryColor: '#08090B',
  secondaryColor: '#111418',
  accentColor: '#E10600',
  backgroundColor: '#08090B',
  headingFont: 'Barlow Condensed',
  bodyFont: 'Rajdhani',
  buttonStyle: 'skewed',
  currency: 'INR',
  currencySymbol: '₹',
  shippingCharge: 99,
  freeShippingThreshold: 1499,
  contactEmail: 'contact@apexora.store',
  businessPhone: '+91 98765 43210',
  whatsappNumber: '+91 98765 43210',
  instagramUrl: 'https://www.instagram.com/harrsha.58/',
  youtubeUrl: 'https://www.youtube.com/@harrsha.58',
  businessAddress: 'APEXORA Motorsports Culture, 42 Circuit View, Indiranagar, Bengaluru, Karnataka 560038, India',
  maintenanceMode: false,
  headerHeight: 82,
  backgroundImage: '/images/apexora-track-curb-bg.png'
};

export const initialHomepageSections: HomepageSection[] = [
  {
    id: 'hero',
    type: 'hero',
    title: 'BUILT FOR THE PURSUIT.',
    subtitle: 'For the ones who live for the next corner. Racing culture, reworked for everyday life.',
    eyebrow: 'APEXORA / MOTORSPORT CULTURE BY HARSHA',
    description: 'Precision, attitude and high-octane aesthetics engineered into heavyweight oversized garments.',
    ctaText: 'SHOP DROP 001',
    ctaLink: '/drop-001',
    secondaryCtaText: 'VIEW LOOKBOOK',
    secondaryCtaLink: '#collection',
    backgroundImage: '/images/apexora-superbike-paddock.jpg',
    visible: true,
    order: 1
  },
  {
    id: 'featured',
    type: 'featured',
    title: 'THE PURSUIT.',
    subtitle: 'THREE DESIGNS. ONE MINDSET.',
    eyebrow: 'FIRST RELEASE / DROP 001',
    description: 'Track-inspired graphics. Everyday attitude. Limited quantities available per size.',
    ctaText: 'EXPLORE FULL CATALOGUE',
    ctaLink: '/shop',
    visible: true,
    order: 2
  },
  {
    id: 'manifesto',
    type: 'manifesto',
    title: "RACING ISN'T JUST A SPORT. IT'S A MINDSET.",
    subtitle: 'THE APEXORA STORY',
    eyebrow: 'THE APEXORA STORY',
    description: 'APEXORA Motorsport Culture is built around the focus, discipline and feeling of being on the limit. Created by Harsha, for riders and everyone drawn to the world of speed.',
    ctaText: "FOLLOW HARSHA'S JOURNEY ↗",
    ctaLink: 'https://www.instagram.com/harrsha.58/',
    visible: true,
    order: 3
  },
  {
    id: 'collection_spotlight',
    type: 'collection_spotlight',
    title: 'DROP 001 ARCHIVE',
    subtitle: 'ENGINEERED FOR THE STREETS',
    eyebrow: 'CURATED COLLECTIONS',
    description: 'Explore limited series releases tailored for track days, night rides, and paddock style.',
    ctaText: 'VIEW ALL COLLECTIONS',
    ctaLink: '/collections',
    visible: true,
    order: 4
  },
  {
    id: 'instagram',
    type: 'instagram',
    title: 'STAY ON THE LINE.',
    subtitle: 'FOLLOW THE MOVEMENT',
    eyebrow: 'PADDOCK & RIDERS COMMUNITY',
    description: 'New drops, race weekends, track clips and behind-the-scenes with Harsha and the APEXORA paddock.',
    ctaText: 'FOLLOW @HARRSHA.58 ↗',
    ctaLink: 'https://www.instagram.com/harrsha.58/',
    visible: true,
    order: 5
  },
  {
    id: 'newsletter',
    type: 'newsletter',
    title: 'JOIN THE RACING CLUB.',
    subtitle: 'PRIORITY ACCESS TO DROP 002',
    eyebrow: 'VIP PADDOCK PASS',
    description: 'Get first access to upcoming limited releases, private discounts, and secret track meet invites.',
    ctaText: 'GET ACCESS',
    visible: true,
    order: 6
  }
];

export const initialNavigation: NavigationItem[] = [
  { id: 'nav-home', label: 'Home', href: '/', location: 'both', order: 1, visible: true },
  { id: 'nav-shop', label: 'Shop All', href: '/shop', location: 'both', order: 2, visible: true },
  { id: 'nav-drop001', label: 'Drop 001', href: '/drop-001', location: 'header', order: 3, visible: true, badge: 'HOT' },
  { id: 'nav-collections', label: 'Collections', href: '/collections', location: 'both', order: 4, visible: true },
  { id: 'nav-culture', label: 'Our Story', href: '/culture', location: 'both', order: 5, visible: true },
  { id: 'nav-contact', label: 'Contact', href: '/contact', location: 'both', order: 6, visible: true },
  { id: 'nav-track', label: 'Track Order', href: '/track-order', location: 'footer', order: 7, visible: true },
  { id: 'nav-faq', label: 'FAQ', href: '/faq', location: 'footer', order: 8, visible: true },
  { id: 'nav-shipping', label: 'Shipping', href: '/shipping', location: 'footer', order: 9, visible: true },
  { id: 'nav-returns', label: 'Returns', href: '/returns', location: 'footer', order: 10, visible: true },
  { id: 'nav-privacy', label: 'Privacy Policy', href: '/privacy', location: 'footer', order: 11, visible: true },
  { id: 'nav-terms', label: 'Terms & Conditions', href: '/terms', location: 'footer', order: 12, visible: true }
];

export const initialPages: ContentPage[] = [
  {
    id: 'about',
    slug: 'about',
    title: 'ABOUT APEXORA',
    subtitle: 'BUILT FOR SPEED. DEFINED BY CULTURE.',
    content: `APEXORA was born on the asphalt of Indian circuits and late-night highway straightaways. Founded by Harsha, an avid motorcycle racer and motorsport purist, APEXORA bridges the gap between genuine track aggression and contemporary luxury streetwear.

Every single garment is conceived not on a generic corporate moodboard, but in the paddock: the smell of high-octane fuel, the heat radiating off slick tires, and the hyper-focused mindset required to clip an apex at the absolute limit.

Our garments are produced using custom 240+ GSM ultra-heavyweight combed cotton, custom-milled collar ribs that never sag, and dual-pass screenprints built to endure hundreds of washes. We do not do fast fashion; we create collector-grade motorsport uniforms.`,
    metaTitle: 'About APEXORA — Motorsport Culture by Harsha',
    metaDescription: 'Learn the story behind APEXORA, founded by motorcycle racer Harsha. Racing culture reworked for everyday life.',
    updatedAt: '2026-02-10T12:00:00Z',
    published: true
  },
  {
    id: 'culture',
    slug: 'culture',
    title: 'OUR MOTORSPORT CULTURE',
    subtitle: "RACING ISN'T JUST A SPORT. IT'S A MINDSET.",
    content: `To the outsider, racing looks like speed and noise. To the rider, it is pure, absolute tranquility. When you are tipped into a high-speed sweeper with your knee skimming the curbing, all worldly noise disappears. There is only the line, the revs, and the horizon.

APEXORA stands as a badge for those who understand this feeling. Whether you pilot superbikes on weekend track days, work in the pit garages, or admire the engineering marvels of MotoGP and Formula 1 from afar, APEXORA is your flag.

01 / RACING ROOTED — Every graphic is technically accurate, referencing real telemetry, apex geometries, and paddock heritage.
02 / BUILT FOR EVERYDAY — Heavyweight comfort cut in relaxed boxy silhouettes that feel just as natural off the motorcycle as they do on it.
03 / MADE TO STAND OUT — High-contrast racing red accents, bold typography, and angular iconography that command respect.`,
    metaTitle: 'Our Motorsport Culture — APEXORA Manifesto',
    metaDescription: 'Discover the philosophy of speed, discipline, and motorcycle racing that drives APEXORA.',
    updatedAt: '2026-02-10T12:00:00Z',
    published: true
  },
  {
    id: 'shipping',
    slug: 'shipping',
    title: 'SHIPPING & DELIVERY POLICY',
    subtitle: 'RAPID TRACK-SIDE DISPATCH ACROSS INDIA & WORLDWIDE',
    content: `All orders are processed and packed in our Bengaluru distribution hub within 24 to 48 business hours of order confirmation.

DOMESTIC SHIPPING (INDIA):
- Standard Delivery: 3 to 5 business days via Blue Dart / Delhivery / Xpressbees.
- Shipping Fee: Flat ₹99 for orders below ₹1,499.
- FREE Express Shipping on all orders valued at ₹1,499 and above.
- Full real-time SMS and WhatsApp tracking is provided upon package handover.

INTERNATIONAL SHIPPING:
- Express International dispatch via DHL Express (5 to 8 business days).
- Customs duties and local import taxes are the responsibility of the recipient.

PACKAGING:
Every APEXORA order arrives in a custom matte-black waterproof poly-mailer featuring our signature racing hazard stripes and a complimentary collectible APEXORA paddock sticker set.`,
    metaTitle: 'Shipping Policy — APEXORA Motorsport Store',
    metaDescription: 'Delivery times, shipping rates, and dispatch timelines for APEXORA orders across India and globally.',
    updatedAt: '2026-02-10T12:00:00Z',
    published: true
  },
  {
    id: 'returns',
    slug: 'returns',
    title: 'RETURNS & EXCHANGE POLICY',
    subtitle: 'HASSLE-FREE 7-DAY EXCHANGE POLICY',
    content: `We take immense pride in the craftsmanship of APEXORA garments. If you encounter any sizing issues or garment defects, we provide an easy 7-day exchange window from the date of package delivery.

EXCHANGE GUIDELINES:
1. Garments must be unwashed, unworn, and returned in their original packaging with all security tags intact.
2. Sizing exchanges are free of charge for your first exchange. We will arrange a reverse pickup directly from your doorstep.
3. If the desired size is out of stock, you will receive store credit valid for 12 months or a full refund back to your original payment method.

RETURN PROCESS:
To initiate an exchange or return, visit our Contact page or WhatsApp our team at +91 98765 43210 with your Order Number and photo proof of the tags. Pickups are typically completed within 48 hours.`,
    metaTitle: 'Return & Exchange Policy — APEXORA',
    metaDescription: '7-day easy exchange and return guidelines for APEXORA apparel.',
    updatedAt: '2026-02-10T12:00:00Z',
    published: true
  },
  {
    id: 'terms',
    slug: 'terms',
    title: 'TERMS & CONDITIONS',
    subtitle: 'LEGAL & USAGE GUIDELINES',
    content: `By accessing and shopping on APEXORA (apexora.store), you agree to be bound by these Terms and Conditions.

1. INTELLECTUAL PROPERTY: All trademarks, graphics, artwork, brand names, and digital content displayed on this website are the proprietary property of APEXORA and Harsha. Unauthorized replication or commercial reproduction is strictly prohibited.
2. PRODUCT ACCURACY: We make every effort to display garment colors and prints as accurately as possible. Slight variations in wash texture may occur on acid-washed apparel due to artisanal dye processes.
3. PRICING & PAYMENT: All prices are listed in Indian Rupees (INR) inclusive of applicable GST taxes. Payments are processed securely via PCI-DSS compliant gateways (Razorpay).
4. LIMITATION OF LIABILITY: APEXORA shall not be liable for any indirect or consequential damages arising from the use or inability to use our website or products.`,
    metaTitle: 'Terms and Conditions — APEXORA Motorsport Culture',
    metaDescription: 'Terms of service and purchasing terms for APEXORA.',
    updatedAt: '2026-02-10T12:00:00Z',
    published: true
  },
  {
    id: 'privacy',
    slug: 'privacy',
    title: 'PRIVACY POLICY',
    subtitle: 'HOW WE PROTECT YOUR DATA',
    content: `At APEXORA, we respect your privacy and handle your personal data with extreme care.

1. INFORMATION COLLECTED: When you place an order or create an account, we collect your name, shipping address, email address, and phone number for fulfillment and tracking updates.
2. PAYMENT DATA: We never store your credit card, debit card, or UPI credentials. All transactions are tokenized and processed directly by our RBI-compliant payment gateway (Razorpay).
3. COOKIES: We use cookies to maintain your shopping cart items, recognize returning customers, and improve browsing performance.
4. THIRD-PARTY SHARING: Your information is shared only with certified logistics partners (such as Delhivery and Blue Dart) strictly for shipping execution. We never sell your data to marketers.`,
    metaTitle: 'Privacy Policy — APEXORA',
    metaDescription: 'APEXORA privacy commitment and data handling practices.',
    updatedAt: '2026-02-10T12:00:00Z',
    published: true
  }
];

export const initialOrders: Order[] = [
  {
    id: 'ord-8921',
    orderNumber: 'APX-8921',
    createdAt: '2026-02-14T14:22:00Z',
    customer: {
      fullName: 'Vikramaditya Roy',
      email: 'vikram.roy@example.com',
      phone: '+91 98201 12345',
      address: 'Penthouse 14, Circuit Towers, Outer Ring Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pinCode: '560103'
    },
    items: [
      {
        productId: 'apex-one',
        name: 'APEX ONE',
        size: 'L',
        price: 1099,
        quantity: 1,
        image: '/images/apex-one.jpg'
      },
      {
        productId: 'redline',
        name: 'REDLINE',
        size: 'XL',
        price: 999,
        quantity: 1,
        image: '/images/redline.jpg'
      }
    ],
    subtotal: 2098,
    shippingFee: 0,
    discount: 209,
    discountCode: 'APEX10',
    total: 1889,
    status: 'Shipped',
    paymentMethod: 'Razorpay',
    paymentId: 'pay_NmK83xL092Za',
    trackingNumber: 'BLUEDART-88291041',
    carrier: 'Blue Dart Express'
  },
  {
    id: 'ord-8920',
    orderNumber: 'APX-8920',
    createdAt: '2026-02-13T19:05:00Z',
    customer: {
      fullName: 'Ananya Sharma',
      email: 'ananya.s@example.com',
      phone: '+91 99110 54321',
      address: 'Flat 4B, Sector 29, Golf Course Road',
      city: 'Gurugram',
      state: 'Haryana',
      pinCode: '122002'
    },
    items: [
      {
        productId: 'after-dark',
        name: 'APEX AFTER DARK',
        size: 'M',
        price: 1199,
        quantity: 1,
        image: '/images/after-dark.jpg'
      }
    ],
    subtotal: 1199,
    shippingFee: 99,
    discount: 0,
    total: 1298,
    status: 'Processing',
    paymentMethod: 'Razorpay',
    paymentId: 'pay_NxZ901LmP23q'
  },
  {
    id: 'ord-8919',
    orderNumber: 'APX-8919',
    createdAt: '2026-02-12T09:40:00Z',
    customer: {
      fullName: 'Karan Mehra',
      email: 'karan.m@example.com',
      phone: '+91 97690 98765',
      address: 'Plot 88, Bandra West, Hill Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      pinCode: '400050'
    },
    items: [
      {
        productId: 'apex-one',
        name: 'APEX ONE',
        size: 'XXL',
        price: 1099,
        quantity: 2,
        image: '/images/apex-one.jpg'
      }
    ],
    subtotal: 2198,
    shippingFee: 0,
    discount: 0,
    total: 2198,
    status: 'Delivered',
    paymentMethod: 'Razorpay',
    paymentId: 'pay_Kq92Lp0198Az',
    trackingNumber: 'DELHIVERY-9901823',
    carrier: 'Delhivery Surface'
  }
];

export const initialCustomers: Customer[] = [
  {
    id: 'cust-1',
    name: 'Vikramaditya Roy',
    email: 'vikram.roy@example.com',
    phone: '+91 98201 12345',
    totalOrders: 3,
    totalSpent: 5497,
    joinedDate: '2026-01-15',
    defaultAddress: 'Penthouse 14, Circuit Towers, Bengaluru, KA',
    status: 'Active'
  },
  {
    id: 'cust-2',
    name: 'Ananya Sharma',
    email: 'ananya.s@example.com',
    phone: '+91 99110 54321',
    totalOrders: 1,
    totalSpent: 1298,
    joinedDate: '2026-02-13',
    defaultAddress: 'Flat 4B, Sector 29, Gurugram, HR',
    status: 'Active'
  },
  {
    id: 'cust-3',
    name: 'Karan Mehra',
    email: 'karan.m@example.com',
    phone: '+91 97690 98765',
    totalOrders: 2,
    totalSpent: 3297,
    joinedDate: '2026-01-20',
    defaultAddress: 'Plot 88, Bandra West, Mumbai, MH',
    status: 'Active'
  }
];

export const initialDiscounts: DiscountCode[] = [
  {
    id: 'disc-1',
    code: 'APEX10',
    type: 'percentage',
    value: 10,
    minOrderValue: 999,
    usageLimit: 500,
    usageCount: 42,
    active: true,
    description: '10% OFF on all Drop 001 orders over ₹999'
  },
  {
    id: 'disc-2',
    code: 'PURSUIT20',
    type: 'percentage',
    value: 20,
    minOrderValue: 1999,
    usageLimit: 100,
    usageCount: 18,
    active: true,
    description: '20% OFF on orders over ₹1,999'
  },
  {
    id: 'disc-3',
    code: 'FREESHIP',
    type: 'fixed',
    value: 99,
    minOrderValue: 500,
    usageLimit: 1000,
    usageCount: 88,
    active: true,
    description: 'Complimentary shipping code on any order'
  }
];

export const initialMedia: MediaItem[] = [
  {
    id: 'med-1',
    name: 'apex-one.jpg',
    url: '/images/apex-one.jpg',
    size: '50.6 KB',
    format: 'JPG',
    altText: 'APEX ONE Jet Black Oversized T-shirt front and back visual',
    category: 'products',
    uploadedAt: '2026-01-10'
  },
  {
    id: 'med-2',
    name: 'redline.jpg',
    url: '/images/redline.jpg',
    size: '59.3 KB',
    format: 'JPG',
    altText: 'REDLINE Off White Track Series Oversized T-shirt front and back visual',
    category: 'products',
    uploadedAt: '2026-01-12'
  },
  {
    id: 'med-3',
    name: 'after-dark.jpg',
    url: '/images/after-dark.jpg',
    size: '60.8 KB',
    format: 'JPG',
    altText: 'APEX AFTER DARK Washed Charcoal Night Ride T-shirt front and back visual',
    category: 'products',
    uploadedAt: '2026-01-15'
  },
  {
    id: 'med-4',
    name: 'apexora-racing-hero.jpg',
    url: '/images/apexora-racing-hero.jpg',
    size: '201 KB',
    format: 'JPG',
    altText: 'Superbike motorcycle racing on track hero background',
    category: 'banners',
    uploadedAt: '2026-01-05'
  },
  {
    id: 'med-5',
    name: 'drop-001-reference.jpg',
    url: '/images/drop-001-reference.jpg',
    size: '406 KB',
    format: 'JPG',
    altText: 'APEXORA Drop 001 master design board reference',
    category: 'lookbook',
    uploadedAt: '2026-01-08'
  },
  {
    id: 'med-6',
    name: 'apexora-track-curb-bg.png',
    url: '/images/apexora-track-curb-bg.png',
    size: '52.6 KB',
    format: 'PNG',
    altText: 'APEXORA Racing Track Curb with Checkered Flag and Carbon Texture',
    category: 'banners',
    uploadedAt: '2026-02-01'
  },
  {
    id: 'med-7',
    name: 'apexora-superbike-paddock.jpg',
    url: '/images/apexora-superbike-paddock.jpg',
    size: '243 KB',
    format: 'JPG',
    altText: 'APEXORA Superbike on wet starting grid with pit straight grandstand',
    category: 'banners',
    uploadedAt: '2026-02-01'
  }
];
