export type IconName =
  | "factory"
  | "settings"
  | "shield"
  | "headset"
  | "ruler"
  | "spark"
  | "phone"
  | "location"
  | "clock"
  | "instagram"
  | "laser"
  | "wood"
  | "metal"
  | "tree"
  | "layers";

export type NavigationItem = {
  label: string;
  href: string;
};

export type ContactInfo = {
  phones: string[];
  whatsapp: string;
  address: string;
  workingHours: string;
  instagram: string;
};

export type FeatureItem = {
  icon: IconName;
  title: string;
  description: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type CapabilityItem = {
  icon?: IconName | "laser" | "tree" | "layers";
  title: string;
  description: string;
  status: "active-category" | "company-capability";
};

export type CategoryData = {
  slug: string;
  name: string;
  eyebrow: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  imageLabel: string;
  badge: string;
  highlights: string[];
  selectionCriteria: string[];
  materials: string[];
  targetUsers: string[];
  contentNotice: string;
  missingInformation: string[];
};

export type ProductData = {
  slug: string;
  categorySlug: string;
  name: string;
  shortDescription: string;
  overview: string;
  images: { src: string; alt: string; label: string }[];
  videoSrc?: string;
  catalogPdf?: string;
  preparationTime?: string;
  purpose: string;
  materials: string[];
  targetUsers: string[];
  benefits: string[];
  reportedClaims: string[];
};

export type SiteConfig = {
  siteName: string;
  siteTitle: string;
  pageDescription: string;
  slogan: string;
  tagline: string;
  navigation: NavigationItem[];
  contact: ContactInfo;
  hero: {
    eyebrow: string;
    title: string;
    highlightedTitle: string;
    description: string;
    primaryAction: string;
    secondaryAction: string;
    image: string;
    imageAlt: string;
    imageLabel: string;
    foregroundImage: string;
    foregroundImageAlt: string;
    trustNote: string;
  };
  about: {
    eyebrow: string;
    title: string;
    description: string;
    supportingText: string;
  };
  videoShowcase: {
    eyebrow: string;
    title: string;
    description: string;
    benefits: string[];
    status: string;
    videoSrc?: string;
    poster?: string;
  };
  interfaceShowcase: {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    completedImage: string;
    headImage: string;
    imageAlt: string;
    imageLabel: string;
  };
  features: FeatureItem[];
  processSteps: ProcessStep[];
  capabilities: CapabilityItem[];
  commercial: {
    title: string;
    description: string;
    priceFactors: string[];
    preparationTime: string;
    financing: string;
  };
  faqs: FaqItem[];
  categories: CategoryData[];
  products: ProductData[];
  stats: {
    value: number;
    prefix?: string;
    suffix?: string;
    label: string;
  }[];
  clients: string[];
};

export const siteConfig: SiteConfig = {
  siteName: "آوین ماشین پاژ",
  siteTitle: "AVIN CNC | تولید دستگاه‌های CNC و لیزر فایبر",
  pageDescription:
    "آوین CNC، طراح و تولیدکننده دستگاه‌های CNC چوب و برش لیزر فایبر با مشاوره تخصصی، ضمانت و خدمات پس از فروش.",
  slogan: "آوین، آوای نوآوری",
  tagline:
    "طراحی و ساخت ماشین‌آلات CNC و برش لیزر فایبر، همراه با مشاوره فنی و پشتیبانی پس از خرید.",
  navigation: [
    { label: "خانه", href: "/" },
    { label: "محصولات", href: "/products" },
    { label: "درباره آوین", href: "/#about" },
    { label: "فرآیند سفارش", href: "/#process" },
    { label: "تماس با ما", href: "/#contact" },
  ],
  contact: {
    phones: ["۰۹۳۷۷۴۶۷۵۸۵", "۰۵۱۳۵۴۲۵۶۷۰", "۰۵۱۳۵۴۲۵۶۷۱"],
    whatsapp: "989377467585",
    address: "مشهد، جاده قوچان، پارک علم و فناوری خراسان رضوی، نبش رشد 5",
    workingHours: "08:00 تا 17:00",
    instagram: "avin_cnc",
  },
  hero: {
    eyebrow: "طراحی و ساخت ماشین‌آلات صنعتی",
    title: "قدرت، دقت و کیفیت در",
    highlightedTitle: "هر برش",
    description:
      "شرکت آوین ماشین پاژ یک مجموعه فناور و دانش‌بنیان مستقر در پارک علم و فناوری خراسان است که با تلفیق مهندسی پیشرفته، طراحی به‌روز و فناوری‌های نوین، در زمینه ساخت دستگاه‌های CNC برش لیزر فلزات، cnc چوب و فاز فعالیت می‌کند. این شرکت با اتکا به تیم مهندسی متخصص، شاسی‌های دقیق و بهینه با استانداردهای مدرن تولید می‌کند و توانایی طراحی و ساخت دستگاه‌های پیچیده، چندمحوره و کاملاً سفارشی متناسب با نیاز مشتریان را دارد. آوین ماشین پاژ با تمرکز بر نوآوری، کیفیت و ارائه راهکارهای صنعتی کارآمد، در مسیر تبدیل‌شدن به یکی از پیشروان صنعت ماشین‌سازی کشور حرکت می‌کند و همواره در بهبود فناوری و ارتقای محصولات خود کوشا است.",
    primaryAction: "درخواست مشاوره فنی",
    secondaryAction: "مشاهده محصولات",
    image: "/images/hero-cnc-hall-v3.webp",
    imageAlt: "سالن صنعتی مدرن آوین برای ماشین‌آلات CNC",
    imageLabel: "کارخانه CNC آوین",
    foregroundImage: "/images/hero-cnc-machines-v4.webp",
    foregroundImageAlt: "دستگاه لیزر، مرکز ماشین‌کاری پنج‌محور و CNC روتر آوین",
    trustNote: "یک سال ضمانت و پنج سال خدمات پس از فروش و پشتیبانی",
  },
  about: {
    eyebrow: "معرفی شرکت آوین ماشین پاژ",
    title: "پیشرو و فناور در طراحی و تولید ماشین آلات صنعتی و CNC ",
    description:
      "شرکت آوین ماشین پاژ یک مجموعه فناور و دانش‌بنیان مستقر در پارک علم و فناوری خراسان است که با تلفیق مهندسی پیشرفته، طراحی به‌روز و فناوری‌های نوین، در زمینه ساخت دستگاه‌های CNC برش لیزر فلزات، cnc چوب و فاز فعالیت می‌کند. این شرکت با اتکا به تیم مهندسی متخصص، شاسی‌های دقیق و بهینه با استانداردهای مدرن تولید می‌کند و توانایی طراحی و ساخت دستگاه‌های پیچیده، چندمحوره و کاملاً سفارشی متناسب با نیاز مشتریان را دارد. آوین ماشین پاژ با تمرکز بر نوآوری، کیفیت و ارائه راهکارهای صنعتی کارآمد، در مسیر تبدیل‌شدن به یکی از پیشروان صنعت ماشین‌سازی کشور حرکت می‌کند و همواره در بهبود فناوری و ارتقای محصولات خود کوشا است.",
    supportingText:
      "توانمندی ساخت CNC سنگ و فلز نیز در مجموعه وجود دارد، اما این حوزه‌ها تا زمان تأیید محصول و اطلاعات کامل، به‌عنوان دسته فعال وب‌سایت معرفی نمی‌شوند.",
  },
  videoShowcase: {
    eyebrow: "دستاوردها",
    title: " دستاورد های شرکت آوین ماشین پاژ",
    description: "",
    benefits: [
      "تولید کننده اولین دستگاه شش محور چوب در ایران",
      " شرکت دانش بنیان و فناور",
      "تولید اولین فرز دروازه ای فلز با دو تا اسپیندل",
      "سازنده اولین دستگاه ورتیکال چوب در ایران",
    ],

    status: "",
    videoSrc: "/videos/avin 1.mp4",
    poster: "/images/video-showcase-poster.jpg",
  },
  interfaceShowcase: {
    eyebrow: "دقت ماشینکاری و برشکاری",
    title: "کنترل دقیق مسیر ماشین‌کاری",
    description: "",
    image: "/images/cnc-machining-uncut-aligned-v2.jpg",
    completedImage: "/images/cnc-machining-avin-engraved-v1.webp",
    headImage: "/images/cnc-spindle-transparent-v1.webp",
    imageAlt: "نمای نزدیک دستگاه CNC و قطعه آلومینیومی",
    imageLabel: "نمایش مسیر ماشین‌کاری CNC",
  },
  features: [
    {
      icon: "factory",
      title: "ساخت مهندسی‌شده",
      description:
        "طراحی و ساخت ماشین‌آلات CNC بر اساس نیاز و امکان‌سنجی فنی هر سفارش.",
    },
    {
      icon: "settings",
      title: "لیزر فایبر سایز ۱.۵ در ۳",
      description:
        "انتخاب توان، کنترلر و قطعات متناسب با کاربرد، تیراژ و بودجه واقعی مجموعه شما.",
    },
    {
      icon: "shield",
      title: "ضمانت و پشتیبانی",
      description:
        "یک سال ضمانت و پنج سال خدمات پس از فروش و پشتیبانی برای ارتباط مستقیم با سازنده.",
    },
  ],
  processSteps: [
    {
      number: "01",
      title: "تماس اولیه",
      description:
        "برای شروع بررسی می‌توانید مستقیماً با آوین تماس بگیرید یا از طریق واتساپ پیام ارسال کنید. در این مرحله امکان درخواست مشاوره فنی، اطلاعات محصول، بررسی قیمت و شرایط مالی وجود دارد.",
    },
    {
      number: "02",
      title: "بررسی نیاز",
      description:
        "نیاز مجموعه شما بر اساس حوزه فعالیت، دسته دستگاه، متریال موردنظر، ابعاد کاری و ظرفیت یا توان موردنیاز بررسی می‌شود. این اطلاعات مبنای انتخاب درست دستگاه و ادامه مشاوره خواهد بود.",
    },
    {
      number: "03",
      title: "مشاوره فنی",
      description:
        "گزینه‌های دستگاه و امکان انتخاب یا پیکربندی قطعات متناسب با سفارش بررسی می‌شوند. پیشنهاد فنی بر اساس نیاز مشتری و امکان‌سنجی فنی ارائه می‌شود و به معنی امکان تغییر نامحدود تمام مشخصات دستگاه نیست.",
    },
    {
      number: "04",
      title: "مشاوره مالی",
      description:
        "قیمت دستگاه بر اساس برند قطعات، ابعاد ماشین، فناوری انتخابی و پیکربندی نهایی بررسی می‌شود. امکان بررسی لیزینگ و اقساط بلندمدت وجود دارد، اما جزئیات و شرایط نهایی پس از مشاوره مستقیم مشخص می‌شوند.",
    },
    {
      number: "05",
      title: "ثبت سفارش",
      description:
        "پس از جمع‌بندی نیاز مشتری، مشاوره فنی و بررسی شرایط مالی، سفارش دستگاه ثبت می‌شود و فرآیند تولید آغاز خواهد شد. برآورد عمومی آماده‌سازی، بسته به نوع دستگاه، 45 تا 60 روز کاری است.",
    },
  ],
  capabilities: [
    {
      icon: "laser",
      title: "برش لیزر فایبر",
      description: "ساخت دستگاه های  برش لیزر فایبر با ابعاد و توان های مختلف",
      status: "active-category",
    },
    {
      icon: "wood",
      title: "CNC چوب",
      description: "طراحی و ساخت انواع دستگاه های CNC چوب در سایز های متفاوت",
      status: "active-category",
    },
    {
      icon: "metal",
      title: "CNC فلز",
      description: "طراحی و ساخت انواع دستگاه CNC فلزات در سایز های مختلف",
      status: "company-capability",
    },
  ],
  commercial: {
    title: "قیمت هر دستگاه بر اساس نیاز واقعی پروژه مشخص می‌شود",
    description:
      "قیمت نهایی پس از بررسی فنی و انتخاب پیکربندی تعیین می‌شود؛ برای خرید دستگاه، مشاوره مالی و امکان بررسی شرایط لیزینگ و اقساط بلندمدت نیز وجود دارد.",
    priceFactors: [
      "برند قطعات",
      "ابعاد دستگاه",
      "فناوری انتخابی",
      "پیکربندی نهایی",
    ],
    preparationTime:
      "برای دستگاه‌های CNC چوب از ۴۰ تا ۵۰ روز کاری | برای دستگاه‌های لیزر فایبر از ۷۰ تا ۹۰ روز کاری",
    financing:
      "جزئیات و شرایط نهایی تأمین مالی پس از بررسی مستقیم اعلام می‌شود.",
  },
  faqs: [
    {
      question: "آوین CNC چه دستگاه‌هایی تولید می‌کند؟",
      answer:
        "محصولات فعلی آوین در دو خانواده دستگاه‌های CNC چوب و دستگاه‌های برش لیزر فایبر ارائه می‌شوند. هر خانواده شامل مدل‌هایی با ابعاد، توان و ترکیب قطعات متفاوت است.",
    },
    {
      question: "چطور دستگاه مناسب کارگاه یا خط تولیدم را انتخاب کنم؟",
      answer:
        "نوع متریال، ابعاد قطعه، ضخامت یا نوع عملیات، حجم تولید، فضای کارگاه و بودجه بررسی می‌شوند. پس از این بررسی، ابعاد کاری، توان و اجزای کنترلی مناسب پیشنهاد خواهد شد.",
    },
    {
      question: "قیمت دستگاه‌ها چگونه محاسبه می‌شود؟",
      answer:
        "قیمت ثابت نیست و بر اساس برند قطعات، ابعاد دستگاه، فناوری انتخابی و پیکربندی نهایی محاسبه می‌شود. مبلغ نهایی پس از مشخص‌شدن پیکربندی و تأیید فنی سفارش اعلام خواهد شد.",
    },
    {
      question: "زمان آماده‌سازی دستگاه چقدر است؟",
      answer:"برای دستگاه های cnc چوب از ۴۰ تا ۵۰ روز کاریبرای دستگاه های لیزر فایبر از ۷۰ تا ۹۰ روزکاری"

    },
    {
      question: "آیا امکان سفارش دستگاه با پیکربندی اختصاصی وجود دارد؟",
      answer:
        "بله. ابعاد کاری، توان، کنترلر و برند برخی قطعات می‌توانند در محدوده امکان‌سنجی مهندسی متناسب با نیاز تولید انتخاب شوند. جزئیات نهایی پس از بررسی فنی مشخص می‌شود.",
    },
    {
      question: "ضمانت و خدمات پس از فروش شامل چه مدتی است؟",
      answer:
        "دستگاه‌ها با یک سال ضمانت و nه سال خدمات پس از فروش و پشتیبانی ارائه می‌شوند. شرایط دقیق خدمات در زمان نهایی‌شدن سفارش اعلام می‌شود.",
    },
    {
      question: "آیا امکان لیزینگ یا خرید اقساطی وجود دارد؟",
      answer:
        "امکان بررسی لیزینگ و اقساط بلندمدت وجود دارد. جزئیات و شرایط نهایی تأمین مالی پس از بررسی مستقیم اعلام می‌شود.",
    },
  ],
  categories: [
    {
      slug: "fiber-laser-cutting",
      name: "دستگاه برش لیزر فایبر",
      eyebrow: "برش ورق فلزی",
      subtitle: "",
      description:
        "مناسب برای برشکاری بسیار دقیق و سریع روی ورق های اهن ، استیل و الومینیوم ",
      image: "/images/leaser-fiber.jpg",
      imageAlt: "دستگاه برش لیزر فایبر در محیط صنعتی",
      imageLabel: "FIBER LASER",
      badge: "FIBER LASER",
      highlights: [
        "بررسی ابعاد و توان متناسب با نیاز",
        "برشکاری انواع ورق ها در ضخامت های مختلف",
        "برشکاری سریع تر و دقیق تر",
      ],
      selectionCriteria: [
        "جنس و ضخامت ورق موردنظر",
        "ابعاد مفید سطح کار",
        "توان موردنیاز و برند قطعات",
        "پیکربندی نهایی پس از بررسی فنی",
      ],
      materials: ["ورق آهن", "ورق استیل"],
      targetUsers: [
        "کسب‌وکارهای خدمات برش ورق",
        "تولیدکنندگان قطعات و محصولات فلزی",
        "تابلوسازان و مجموعه‌های با نیاز مشابه",
      ],
      contentNotice:
        "تفاوت مدل‌ها از نظر سایز، توان و برند قطعات بررسی می‌شود؛ مشخصات دقیق هر مدل نباید به کل دسته تعمیم داده شود.",
      missingInformation: [
        "فهرست کامل مدل‌ها و انواع قابل عرضه",
        "تصاویر و ویدیوهای واقعی هر محصول",
        "کاتالوگ و مشخصات کامل تأییدشده",
      ],
    },
    {
      slug: "wood-cnc",
      name: "دستگاه CNC چوب",
      eyebrow: "ماشین‌کاری چوب",
      subtitle: "طراحی و ساخت ماشین‌آلات CNC برای صنعت چوب",
      description:
        "ساخت دستگاه های CNC در سایز های مختلف و سفارشی  با آپشن تولچنج و پمپ وکیوم و تعداد محور مدنظر شما",
      image: "/images/category-wood-cnc-concept-v3.jpg",
      imageAlt: "دستگاه CNC چوب در محیط صنعتی",
      imageLabel: "CNC WOOD",
      badge: "",
      highlights: [
        "سفارشی سازی کامل دستگاه",
        "سه تا شش محور",
        "مناسب برای انواع خدمات چوب",
      ],
      selectionCriteria: [
        "نوع کاربرد و قطعه موردنظر",
        "ابعاد کاری موردنیاز",
        "ظرفیت و توان متناسب با تولید",
        "پیکربندی قطعات پس از بررسی فنی",
      ],
      materials: ["MDF", "چوب طبیعی", "نئوپان", "پلای‌وود"],
      targetUsers: [
        "کارگاه‌های فعال در صنعت چوب",
        "شرکت‌های تولیدی",
        "مجموعه‌های نیازمند ماشین‌کاری CNC",
      ],
      contentNotice:
        "نوع متریال، ابعاد، ظرفیت و توان دستگاه باید متناسب با کاربرد مجموعه در مشاوره فنی بررسی شود.",
      missingInformation: [],
    },
  ],
  products: [
    {
      slug: "2x6-fiber-laser",
      categorySlug: "fiber-laser-cutting",
      name: "لیزر فایبر سایز 2 در 6",
      shortDescription:
        "دستگاه صنعتی با سطح کار 2 در 6 متر برای برش ورق‌های آهن و استیل؛ مناسب خدمات برش، قطعه‌سازی و مجموعه‌های ورق‌کاری.",
      videoSrc: "/videos/fiber-laser-2x6.mp4",
      catalogPdf: "/catalogs/avin-2x6-fiber-laser-catalog.pdf",
      overview:
        "لیزر فایبر 2 در 6 برای مجموعه‌هایی ساخته می‌شود که با ورق‌های بزرگ آهن و استیل سروکار دارند و حجم کاری زیادی دارند. این دستگاه می‌تواند در خدمات برش، قطعه‌سازی، تابلوسازی و خطوط تولید محصولات فلزی به کار گرفته شود. سازه دستگاه با فرآیند تنش‌زدایی VSR آماده می‌شود. توان سورس لیزر، هد برش، کنترلر و دیگر قطعات براساس ضخامت ورق، سرعت برشکاری و حجم برشکاری انتخاب می‌شود. نتیجه نهایی، دستگاهی متناسب با فرآیند واقعی مجموعه و شرایط کاری آن خواهد بود.",
      images: [
        {
          src: "/images/leaser-fiber-2.webp",
          alt: "دستگاه لیزر فایبر سایز 2 در 6 در کارگاه",
          label: "لیزر فایبر 2 × 6",
        },
        {
          src: "/images/leaser-fiber.jpg",
          alt: "دستگاه لیزر فایبر سایز 2 در 6",
          label: "لیزر فایبر 2 × 6",
        },
      ],
      purpose:
        "این دستگاه برای برش صنعتی ورق‌های آهن و استیل در ابعاد بزرگ طراحی شده است. فضای کاری 2 در 6 متر امکان جانمایی ورق‌های طویل را فراهم می‌کند و برای کسب‌وکارهای خدمات برش، تولیدکنندگان قطعات فلزی، تابلوسازان و مجموعه‌های ورق‌کاری مناسب است. توان منبع لیزر با توجه به جنس و ضخامت ورق انتخاب می‌شود تا سرعت و کیفیت برش با نیاز تولید هماهنگ باشد. انتخاب هد، کنترلر، سروو و سیستم خنک‌کننده نیز در مرحله بررسی فنی انجام می‌شود. این ساختار به مجموعه کمک می‌کند دستگاهی متناسب با تیراژ، نوع سفارش‌ها و فضای کارگاه خود تهیه کند.",
      materials: ["ورق آهن", "ورق استیل", "ورق آلومینیوم"],
      targetUsers: [
        "خدمات‌دهندگان برش فلزات",
        "سازندگان قطعات صنعتی",
        "تابلوسازان و تولیدکنندگان ورق‌کاری",
      ],
      benefits: [
        "سطح کار 2 × 6 متر برای ورق‌های صنعتی بزرگ",
        "شاسی تنش‌زدایی‌شده با روش VSR",
        "مجهز به آخرین هد برش و کنترلر کارخانه Raytools ",
      ],
      preparationTime: "۸۰ روز کاری",
      reportedClaims: [
        "نسخه 1.5 کیلووات: برش ورق آهن تا ضخامت 10 میلی‌متر",
        "نسخه 3 کیلووات: برش ورق آهن تا ضخامت 20 میلی‌متر",
      ],
    },
    {
      slug: "wood-cnc-router",
      videoSrc:"/videos/IMG_1149.mp4",
      categorySlug: "wood-cnc",
      name: "دستگاه CNC چوب پنج محور",
      shortDescription:
        "دستگاه cnc چوب پنج محور با دقت و انعطاف پذیری بالا، مناسب برای ساخت پیچیده ترین طرح ها و محصولات منحصر به فرد هستش",
      catalogPdf: "/catalogs/avin-5axis-cnc-catalog.pdf",
      overview:
        "روتر CNC چوب برای کارگاه‌ها و تولیدکنندگانی مناسب است که به اجرای دقیق و تکرارپذیر طرح‌ها روی قطعات چوبی نیاز دارند. دستگاه مسیرهای تعریف‌شده را با کنترل عددی اجرا می‌کند و می‌تواند بخشی از فرآیند تولید پیوسته یا سفارش‌های متنوع کارگاهی باشد. ابعاد میز، توان اسپیندل، کنترلر و دیگر قطعات بر اساس اندازه قطعات، نوع کار و ظرفیت تولید انتخاب می‌شوند. بررسی نیاز پیش از ساخت کمک می‌کند دستگاه با فضای کارگاه و شیوه تولید هماهنگ باشد. پشتیبانی مستقیم سازنده نیز مسیر انتخاب، سفارش و استفاده از دستگاه را برای مجموعه روشن‌تر می‌کند.",
      images: [
        {
          src: "/images/IMG_1545.webp",
          alt: "دستگاه CNC چوب پنج محور در کارگاه",
          label: "CNC چوب",
        },
        {
          src: "/images/034.webp",
          alt: "دستگاه روتر CNC چوب",
          label: "CNC چوب",
        },
        {
          src: "/images/IMG_0298.webp",
          alt: "دستگاه روتر CNC چوب",
          label: "CNC چوب",
        },
      ],
      purpose:
        "این دستگاه برای اجرای عملیات ماشین‌کاری کنترل‌شده روی قطعات چوبی در کارگاه‌ها و شرکت‌های تولیدی استفاده می‌شود. مسیر حرکت ابزار بر اساس طرح آماده‌شده تعریف می‌شود و دستگاه آن را با نظم و تکرارپذیری اجرا می‌کند. نوع محصول، ابعاد قطعه، حجم سفارش و سرعت مورد انتظار در انتخاب ابعاد کاری و توان دستگاه مؤثر هستند. کنترلر، اسپیندل و اجزای حرکتی نیز متناسب با کاربرد نهایی انتخاب می‌شوند. این رویکرد باعث می‌شود روتر CNC با فرآیند واقعی تولید هماهنگ شود و ظرفیت موردنیاز مجموعه را پوشش دهد.",
      materials: ["MDF", "چوب طبیعی", "نئوپان", "پلای‌وود"],
      targetUsers: [
        "کارگاه‌های صنعت چوب",
        "شرکت‌های تولیدی",
        "خریداران ماشین‌آلات CNC",
      ],
      benefits: [
        "اجرای انواع طرح ها از ساده تا پیچیده",
        "سفارشی سازی بر اساس سایز مدنظرتون",
        "اولین دستگاه تولید شده در ایران",
      ],
      preparationTime: "۴۰ تا ۵۰ روز کاری",
      reportedClaims: [],
    },
    {
      slug: "vertical-wood-cnc",
      categorySlug: "wood-cnc",
      name: "دستگاه CNC چوب ورتیکال",
      videoSrc:"/videos/IMG_2348.MP4",
      shortDescription:
        "دستگاه ورتیکال با طراحی بهینه جهت کاهش پنجاه درصدی فضا مورد نیاز و عملکرد دقیق و ایده آل برای کارگاه های کوچک مناسب برای افرادی که به دنبال استفاده بهینه از فضا و بهره وری حداکثری هستند",
      catalogPdf: "/catalogs/avin-vertical-cnc-catalog.pdf",
      overview:
        "CNC چوب با شاسی عمودی؛ قدرت بیشتر، فضای کمتر\n\nوقتی فضای کار محدود است، طراحی هوشمندانه اهمیت بیشتری پیدا میکند. این دستگاه CNC چوب با بهرهگیری از شاسی و استراکچر عمودی، رویکردی متفاوت در طراحی ماشینآلات CNC ارائه میدهد.\n\nطراحی عمودی دستگاه باعث شده است تا ۵۰٪ فضای کمتری نسبت به ساختارهای متداول اشغال کند؛ بدون اینکه از قابلیتهای حرفهای و دقت ماشینکاری کاسته شود. این ویژگی، دستگاه را به انتخابی ایدهآل برای کارگاههایی تبدیل میکند که میخواهند از فضای موجود حداکثر استفاده را داشته باشند.\n\nترکیب طراحی نوآورانه، استحکام، دقت و ابعاد بهینه، این CNC را به راهکاری کاربردی برای اجرای انواع پروژههای چوبی و طرحهای پیچیده تبدیل کرده است.",
      images: [
        {
          src: "/images/vertical-cnc-1.webp",
          alt: "دستگاه CNC چوب ورتیکال",
          label: "CNC ورتیکال",
        },
        {
          src: "/images/vertical-cnc-3.webp",
          alt: "دستگاه CNC چوب ورتیکال در کارگاه",
          label: "CNC ورتیکال",
        },
        {
          src: "/images/vertical-cnc-2.webp",
          alt: "هد و محور عمودی دستگاه CNC چوب ورتیکال",
          label: "CNC ورتیکال",
        },
      ],
      purpose:
        "این دستگاه با شاسی عمودی برای کارگاه‌ها و خطوط تولیدی طراحی شده است که با محدودیت فضا مواجه هستند. با اشغال ۵۰٪ فضای کمتر، بالاترین سطح کارایی، دقت و بهره‌وری را در ماشین‌کاری انواع متریال‌های چوبی فراهم می‌آورد.",
      materials: ["MDF", "چوب طبیعی", "نئوپان", "پلای‌وود"],
      targetUsers: [
        "کارگاه‌های دارای محدودیت فضا",
        "تولیدکنندگان صنایع چوب و دکوراسیون",
        "کسب‌وکارهای خواهان بهره‌وری حداکثری",
      ],
      benefits: [
        "کاهش پنجاه درصدی فضا",
        "استراکچر قوی تر و محکم تر",
        "سفارشی سازی بر اساس نیاز شما",
      ],
      preparationTime: "۴۰ تا ۵۰ روز کاری",
      reportedClaims: [],
    },
    {
      slug: "1.5x3-fiber-laser",
      categorySlug: "fiber-laser-cutting",
      name: "لیزر فایبر سایز 1.5 در 3",
      shortDescription:
        "دستگاه صنعتی با سطح کار 1.5 در 3 متر برای برش ورق‌های آهن و استیل؛ مناسب خدمات برش، قطعه‌سازی و مجموعه‌های ورق‌کاری.",
      overview:
        "لیزر فایبر 1.5 در 3 برای مجموعه‌هایی ساخته می‌شود که با ورق‌های بزرگ آهن و استیل سروکار دارند و حجم کاری زیادی دارند. این دستگاه می‌تواند در خدمات برش، قطعه‌سازی، تابلوسازی و خطوط تولید محصولات فلزی به کار گرفته شود. سازه دستگاه با فرآیند تنش‌زدایی VSR آماده می‌شود. توان سورس لیزر، هد برش، کنترلر و دیگر قطعات براساس ضخامت ورق، سرعت برشکاری و حجم برشکاری انتخاب می‌شود. نتیجه نهایی، دستگاهی متناسب با فرآیند واقعی مجموعه و شرایط کاری آن خواهد بود.",
      images: [
        {
          src: "/images/fiber-laser-1.5x3-workshop.jpg",
          alt: "دستگاه لیزر فایبر سایز 1.5 در 3 در کارگاه",
          label: "لیزر فایبر 1.5 × 3",
        },
         {
          src: "/images/fiber-laser-1.5x3-delivery.jpg",
          alt: "دستگاه لیزر فایبر سایز 1.5 در 3",
          label: "لیزر فایبر 1.5 × 3",
        },
        {
          src: "/images/fiber-laser-1.5x3-model.jpg",
          alt: "دستگاه لیزر فایبر سایز 1.5 در 3",
          label: "لیزر فایبر 1.5 × 3",
        },
      
      ],
      purpose:
        "این دستگاه برای برش صنعتی ورق‌های آهن و استیل در ابعاد بزرگ طراحی شده است. فضای کاری 1.5 در 3 متر امکان جانمایی ورق‌های طویل را فراهم می‌کند و برای کسب‌وکارهای خدمات برش، تولیدکنندگان قطعات فلزی، تابلوسازان و مجموعه‌های ورق‌کاری مناسب است. توان منبع لیزر با توجه به جنس و ضخامت ورق انتخاب می‌شود تا سرعت و کیفیت برش با نیاز تولید هماهنگ باشد. انتخاب هد، کنترلر، سروو و سیستم خنک‌کننده نیز در مرحله بررسی فنی انجام می‌شود. این ساختار به مجموعه کمک می‌کند دستگاهی متناسب با تیراژ، نوع سفارش‌ها و فضای کارگاه خود تهیه کند.",
      materials: ["ورق آهن", "ورق استیل", "ورق آلومینیوم"],
      targetUsers: [
        "خدمات‌دهندگان برش فلزات",
        "سازندگان قطعات صنعتی",
        "تابلوسازان و تولیدکنندگان ورق‌کاری",
      ],
      benefits: [
        "سطح کار 1.5 × 3 متر برای ورق‌های صنعتی بزرگ",
        "شاسی تنش‌زدایی‌شده با روش VSR",
        "مجهز به آخرین هد برش و کنترلر کارخانه Raytools ",
      ],
      preparationTime: "۶۰ تا ۸۰ روز کاری",
      reportedClaims: [
        "نسخه 1.5 کیلووات: برش ورق آهن تا ضخامت 10 میلی‌متر",
        "نسخه 3 کیلووات: برش ورق آهن تا ضخامت 20 میلی‌متر",
      ],
    },
    {
      slug: "flatbed-wood-cnc",
      categorySlug: "wood-cnc",
      name: "دستگاه CNC چوب تخت",
      shortDescription:
        "دستگاه CNC چوب تخت برای برش، شیارزنی و حکاکی دقیق انواع ورق‌های MDF و چوب با کاربری کارگاهی و صنعتی.",
      overview:
        "دستگاه CNC چوب تخت برای کارگاه‌ها و خطوط تولیدی طراحی شده است که به برش و حکاکی پیوسته، سریع و دقیق انواع ورق‌های MDF، نئوپان و چوب طبیعی نیاز دارند. این دستگاه مجهز به شاسی مستحکم، میز وکیوم پرقدرت و کنترلر پیشرفته است که امکان اجرای دقیق‌ترین طرح‌ها را در صنایع مبلمان و کابینت‌سازی فراهم می‌کند.",
      images: [
        {
          src: "/images/product-wood-cnc-configurable-v1.jpg",
          alt: "دستگاه CNC چوب تخت",
          label: "CNC چوب تخت",
        },
      ],
      purpose:
        "طراحی شده برای برش، شیارزنی و حکاکی دقیق انواع ورق‌های چوبی و فرآورده‌های چوبی در کارگاه‌های کابینت، مبلمان و دکوراسیون داخلی.",
      materials: ["MDF", "چوب طبیعی", "نئوپان", "پلای‌وود"],
      targetUsers: [
        "کارگاه‌های کابینت و دکوراسیون",
        "تولیدکنندگان مبلمان",
        "صنایع چوب و نجاری مدرن",
      ],
      benefits: [
        "سطح کار تخت با سیستم وکیوم پرقدرت",
        "دقت و سرعت بالا در ماشین‌کاری",
        "امکان سفارشی‌سازی ابعاد و توان اسپیندل",
      ],
      preparationTime: "۴۰ تا ۵۰ روز کاری",
      reportedClaims: [],
    },
  ],
  stats: [
    { value: 4, label: "سال فعالیت" },
    { value: 1, suffix: "سال", label: "ضمانت رسمی" },
    { value: 5, suffix: "سال", label: "خدمات پس از فروش" },
    { value: 60, prefix: "45–", suffix: "روز", label: "بازه آماده‌سازی" },
  ],
  clients: [
    "کارگاه‌های صنعتی",
    "شرکت‌های تولیدی",
    "خدمات برش و ماشین‌کاری",
    "مدیران فنی و تولید",
    "خریداران ماشین‌آلات",
  ],
} satisfies SiteConfig;

function validateSiteConfig(config: SiteConfig) {
  const categorySlugs = new Set<string>();
  const productKeys = new Set<string>();

  for (const category of config.categories) {
    if (categorySlugs.has(category.slug)) {
      throw new Error(`Duplicate category slug: ${category.slug}`);
    }
    categorySlugs.add(category.slug);
  }

  for (const product of config.products) {
    if (!categorySlugs.has(product.categorySlug)) {
      throw new Error(
        `Product ${product.slug} references unknown category ${product.categorySlug}`,
      );
    }

    const productKey = `${product.categorySlug}/${product.slug}`;
    if (productKeys.has(productKey)) {
      throw new Error(`Duplicate product route: ${productKey}`);
    }
    productKeys.add(productKey);
  }
}

validateSiteConfig(siteConfig);

export function getCategoryBySlug(slug: string) {
  return siteConfig.categories.find((category) => category.slug === slug);
}

export function getProductsByCategory(categorySlug: string) {
  return siteConfig.products.filter(
    (product) => product.categorySlug === categorySlug,
  );
}

export function getProductBySlug(productSlug: string, categorySlug?: string) {
  return siteConfig.products.find((product) => {
    if (categorySlug) {
      return (
        product.categorySlug === categorySlug && product.slug === productSlug
      );
    }

    return product.slug === productSlug;
  });
}
