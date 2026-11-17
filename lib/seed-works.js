// Plain-data source for the portfolio's works. Kept free of image imports so it
// can be consumed by both the Next.js app and the standalone seed script.
export const seedWorks = [
  {
    id: 'Stat-Fit-Gym-Workout-Tracker-PWA',
    title: 'Stat·Fit – Gym Workout Tracker PWA',
    category: 'PWA',
    description: 'Next.js 16 • React 19 • TypeScript • MongoDB • PWA',
    bgImage: '/Work-3.png',
    live_link: 'https://stat-fit.vercel.app/',
    overview:
      'A full-stack, mobile-first Progressive Web App for tracking gym workouts — installable on any device with offline support, no app store required.',
    features: [
      'Built a Program Builder creating multi-day workouts with exercises grouped by muscle group, including superset and giant-set grouping.',
      'Developed a Guided Workout Runner with step-by-step execution, rest timer, audio/vibration cues, and auto-logged results.',
      'Created a Progress Dashboard with workout streaks, weekly activity charts, personal record tracking, and tonnage history.',
      'Engineered a full PWA — installable on iOS/Android with a custom service worker, offline fallback page, and add-to-home-screen flow.',
      'Implemented JWT-based auth with role-based access control (user/superadmin) enforced client-side and server-side.',
      'Built an Admin Panel for user management, platform stats, and per-user data oversight.',
      'Applied Zod validation at the API boundary with React Query for cache invalidation and optimistic updates.',
    ],
  },
  {
    id: 'APAN_Apparel',
    title: 'APAN Apparel — Full Stack E-commerce Platform',
    category: 'E-commerce',
    description: 'Next.js • TypeScript • Tailwind CSS • Axios',
    bgImage: '/Work-1.png',
    live_link: 'https://apontraders.vercel.app/',
    overview:
      'APAN Apparel is a complete e-commerce solution built with Next.js and NestJS, featuring a modern storefront, powerful admin dashboard, and comprehensive inventory management system.',
    features: [
      'Developed the Next.js storefront with product catalog, categories, brands, collections, guest/authenticated carts, and order placement.',
      'Built the NestJS backend API with Prisma ORM, PostgreSQL, JWT auth, role-based access (USER/ADMIN), and Swagger documentation.',
      'Implemented inventory & procurement modules including suppliers, purchase orders, and stock movements with full traceability.',
      'Built an admin dashboard for managing products, variants, stock levels, suppliers, purchase orders, and site settings.',
      'Integrated TanStack Query for server-state caching and Zustand for client-state management.',
      'Deployed frontend and backend as serverless functions on Vercel with image uploads via Vercel Blob.',
    ],
  },
  {
    id: 'Burak_mart',
    title: 'Burak Mart — E-commerce Frontend',
    category: 'E-commerce',
    description: 'Next.js • TypeScript • Tailwind CSS • Axios',
    bgImage: '/ecommerce/burak-mart.png',
    live_link: 'https://burak-mart.vercel.app/',
    overview:
      'Burak Mart is a complete e-commerce solution built with Next.js and Tailwind CSS, featuring a modern storefront and inventory management system.',
    features: [
      'Developed the Next.js storefront with product catalog, categories, brands, collections, guest/authenticated carts, and order placement.',
      'Implemented inventory & procurement modules including suppliers, purchase orders, and stock movements with full traceability.',
      'Built an admin dashboard for managing products, variants, stock levels, suppliers, purchase orders, and site settings.',
      'Integrated TanStack Query for server-state caching and Zustand for client-state management.',
      'Deployed frontend and backend as serverless functions on Vercel with image uploads via Vercel Blob.',
    ],
  },
  {
    id: 'rudra-khobor',
    title: 'Rudra Khobor – Full Stack News Portal',
    category: 'News Portal',
    description: 'Next.js • Tailwind CSS • NextRoute',
    bgImage: '/newsportal/rudrakhobor.png',
    live_link: 'https://dainikrudrakhabor.com/',
    overview:
      'A full-stack news platform with authentication and content management functionality.',
    features: [
      'Developed an article publishing system with category and tag management.',
      'Implemented user authentication, comments, likes, and engagement features.',
      'Used Redux for application state management.',
      'Built a responsive interface optimized for content consumption across devices.',
      'PostgreSQL, TypeORM, Next.js, TypeScript,',
    ],
  },
  {
    id: 'combat-corner-bd',
    title: 'Combat Corner BD – Full Stack Sports News Portal',
    category: 'News Portal',
    description: 'React.js • Redux • Tailwind CSS • Axios',
    bgImage: '/Work-4.jpeg',
    live_link: 'https://combatcornerbd.vercel.app/',
    overview:
      'A full-stack sports news platform focused on combat sports with authentication and content management functionality.',
    features: [
      'Developed an article publishing system with category and tag management.',
      'Implemented user authentication, comments, likes, and engagement features.',
      'Used Redux for application state management.',
      'Built a responsive interface optimized for content consumption across devices.',
      'Integrated frontend functionality with a MongoDB and Express.js backend.',
    ],
  },
  {
    id: 'Rolex',
    title: 'Rolex Day-Date Automatic',
    category: 'Landing Page',
    description: 'Astro • Tailwind CSS • alpinejs',
    bgImage: '/landing/landing-2.png',
    live_link: 'https://honeynuts.vercel.app/rolex-day-date',
    overview: 'A Facebook ads campaign landing page for a Rolex Day-Date Automatic watch.',
    features: [
      'Created a Facebook ads campaign landing page for a Rolex Day-Date Automatic watch.',
      'Built with Astro and Tailwind CSS for a fast and responsive user experience.',
      'Implemented a modern and user-friendly interface optimized for mobile and desktop.',
      'Designed to showcase the product with high-quality visuals and compelling copy.',
    ],
  },
  {
    id: 'T-Shirt-Combo',
    title: '6 Pcs T-Shirt Combo: New Designs, Superb Fit',
    category: 'Landing Page',
    description: 'Astro • Tailwind CSS • alpinejs',
    bgImage: '/landing/landing-3.png',
    live_link: 'https://honeynuts.vercel.app/tshirt-combo',
    overview:
      'A Facebook ads campaign landing page for a 6 Pcs T-Shirt Combo: New Designs, Superb Fit.',
    features: [
      'Created a Facebook ads campaign landing page for a 6 Pcs T-Shirt Combo: New Designs, Superb Fit.',
      'Built with Astro and Tailwind CSS for a fast and responsive user experience.',
      'Implemented a modern and user-friendly interface optimized for mobile and desktop.',
      'Designed to showcase the product with high-quality visuals and compelling copy.',
    ],
  },
  {
    id: 'Root-Wellness-Mix',
    title: 'Root Wellness Mix: Masala Herbal Tea for Immunity & Health',
    category: 'Landing Page',
    description: 'Astro • Tailwind CSS • alpinejs',
    bgImage: '/landing/landing-1.png',
    live_link: 'https://honeynuts.vercel.app/wellness-mix',
    overview:
      'A Facebook ads campaign landing page for a Root Wellness Mix: Masala Herbal Tea for Immunity & Health.',
    features: [
      'Created a Facebook ads campaign landing page for a Root Wellness Mix: Masala Herbal Tea for Immunity & Health.',
      'Built with Astro and Tailwind CSS for a fast and responsive user experience.',
      'Implemented a modern and user-friendly interface optimized for mobile and desktop.',
      'Designed to showcase the product with high-quality visuals and compelling copy.',
    ],
  },
];

export const slugify = (value) =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);