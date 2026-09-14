import user_image from './user-image.png';
import code_icon from './code-icon.png';
import code_icon_dark from './code-icon-dark.png';
import edu_icon from './edu-icon.png';
import edu_icon_dark from './edu-icon-dark.png';
import project_icon from './project-icon.png';
import project_icon_dark from './project-icon-dark.png';
import vscode from './vscode.png';
import firebase from './firebase.png';
import figma from './figma.png';
import git from './git.png';
import mongodb from './mongodb.png';
import right_arrow_white from './right-arrow-white.png';
import logo from './logo.png';
import logo_dark from './logo_dark.png';
import mail_icon from './mail_icon.png';
import mail_icon_dark from './mail_icon_dark.png';
import profile_img from './profile-img.png';
import download_icon from './download-icon.png';
import hand_icon from './hand-icon.png';
import header_bg_color from './header-bg-color.png';
import moon_icon from './moon_icon.png';
import sun_icon from './sun_icon.png';
import arrow_icon from './arrow-icon.png';
import arrow_icon_dark from './arrow-icon-dark.png';
import menu_black from './menu-black.png';
import menu_white from './menu-white.png';
import close_black from './close-black.png';
import close_white from './close-white.png';
import web_icon from './web-icon.png';
import mobile_icon from './mobile-icon.png';
import ui_icon from './ui-icon.png';
import graphics_icon from './graphics-icon.png';
import right_arrow from './right-arrow.png';
import send_icon from './send-icon.png';
import right_arrow_bold from './right-arrow-bold.png';
import right_arrow_bold_dark from './right-arrow-bold-dark.png';
import ak_pro from './WhatsApp Image 2025-05-29 at 2.29.53 PM.jpeg'
import aktanha_logo from './AKtanha logo.png'
import aktanha_logo_dark from './AKtanha logod1.png'

export const assets = {
    user_image,
    code_icon,
    code_icon_dark,
    edu_icon,
    edu_icon_dark,
    project_icon,
    project_icon_dark,
    vscode,
    firebase,
    figma,
    git,
    mongodb,
    right_arrow_white,
    logo,
    logo_dark,
    mail_icon,
    mail_icon_dark,
    profile_img,
    download_icon,
    hand_icon,
    header_bg_color,
    moon_icon,
    sun_icon,
    arrow_icon,
    arrow_icon_dark,
    menu_black,
    menu_white,
    close_black,
    close_white,
    web_icon,
    mobile_icon,
    ui_icon,
    graphics_icon,
    right_arrow,
    send_icon,
    right_arrow_bold,
    right_arrow_bold_dark,
    ak_pro,
    aktanha_logo,
    aktanha_logo_dark,
};

export const workData = [
    {
        id: 'Stat-Fit-Gym-Workout-Tracker-PWA',
        title: 'Stat·Fit – Gym Workout Tracker PWA',
        description: 'Next.js 16 • React 19 • TypeScript • MongoDB • PWA',
        bgImage: '/Work-3.png',
        live_link: 'https://stat-fit.vercel.app/',
        overview: 'A full-stack, mobile-first Progressive Web App for tracking gym workouts — installable on any device with offline support, no app store required.',
        features: [
          "Built a Program Builder creating multi-day workouts with exercises grouped by muscle group, including superset and giant-set grouping.",
          "Developed a Guided Workout Runner with step-by-step execution, rest timer, audio/vibration cues, and auto-logged results.",
          "Created a Progress Dashboard with workout streaks, weekly activity charts, personal record tracking, and tonnage history.",
          "Engineered a full PWA — installable on iOS/Android with a custom service worker, offline fallback page, and add-to-home-screen flow.",
          "Implemented JWT-based auth with role-based access control (user/superadmin) enforced client-side and server-side.",
          "Built an Admin Panel for user management, platform stats, and per-user data oversight.",
          "Applied Zod validation at the API boundary with React Query for cache invalidation and optimistic updates."
        ],
    },
    {
        id: 'APAN_Apparel',
        title: 'APAN Apparel — Full Stack E-commerce Platform',
        description: 'Next.js • TypeScript • Tailwind CSS • Axios',
        bgImage: '/Work-1.png',
        live_link: 'https://apontraders.vercel.app/',
        overview: 'APAN Apparel is a complete e-commerce solution built with Next.js and NestJS, featuring a modern storefront, powerful admin dashboard, and comprehensive inventory management system.',
        features: ["Developed the Next.js storefront with product catalog, categories, brands, collections, guest/authenticated carts, and order placement.",
        "Built the NestJS backend API with Prisma ORM, PostgreSQL, JWT auth, role-based access (USER/ADMIN), and Swagger documentation.",
        "Implemented inventory & procurement modules including suppliers, purchase orders, and stock movements with full traceability.",
        "Built an admin dashboard for managing products, variants, stock levels, suppliers, purchase orders, and site settings.",
        "Integrated TanStack Query for server-state caching and Zustand for client-state management.",
        "Deployed frontend and backend as serverless functions on Vercel with image uploads via Vercel Blob.",],
    },
    {
        id: 'combat-corner-bd',
        title: 'Combat Corner BD – Full Stack Sports News Portal',
        description: 'React.js • Redux • Tailwind CSS • Axios',
        bgImage: '/Work-4.jpeg',
        live_link: 'https://combatcornerbd.vercel.app/',
        overview: 'A full-stack sports news platform focused on combat sports with authentication and content management functionality.',
        features: [
          "Developed an article publishing system with category and tag management.",
          "Implemented user authentication, comments, likes, and engagement features.",
          "Used Redux for application state management.",
          "Built a responsive interface optimized for content consumption across devices.",
          "Integrated frontend functionality with a MongoDB and Express.js backend."
        ],
    },
    {
        id: 'CFC-MMA-Event-Fighter-Management-System',
        title: 'CFC – MMA Event & Fighter Management System',
        description: 'React.js • Next.js • UI Engineering',
        bgImage: '/Work-2.png',
        live_link: 'https://cage-fighting-championship.vercel.app/',
        overview: 'A comprehensive platform for managing MMA events and fighter profiles with a powerful admin panel.',
        features: [
          "Dynamic event creation, fight card management, and real-time result updates",
          "Complete fighter profile system with statistics and media management",
          "Fully responsive UI with SEO optimization and smooth user experience",
          "Robust admin dashboard for efficient event and content management"
        ],
    },
]

export const serviceData = [
  {
    id: 'react-nextjs-development',
    icon: assets.web_icon,
    title: 'React & Next.js Development',
    description: 'Expert in building fast, SEO-friendly, and scalable web applications using React.js, Next.js 14+, TypeScript, and Tailwind CSS with modern best practices.',
    link: '/services/react-nextjs-development'
  },
  {
    id: 'mern-stack-solutions',
    icon: assets.mobile_icon,
    title: 'MERN Stack Solutions',
    description: 'End-to-end web development using MongoDB, Express.js, React.js, and Node.js. Including secure authentication, dynamic APIs, and admin dashboards.',
    link: '/services/mern-stack-solutions'
  },
  {
    id: 'modern-ui-ux-development',
    icon: assets.ui_icon,
    title: 'Modern UI/UX Development',
    description: 'Crafting beautiful, responsive, and accessible user interfaces with Tailwind CSS, component-based architecture, state management, and smooth animations.',
    link: '/services/modern-ui-ux-development'
  },
  {
    id: 'ecommerce-management-systems',
    icon: assets.graphics_icon,
    title: 'E-commerce & Management Systems',
    description: 'Developing full-featured systems like e-commerce admin panels, event management platforms, blogging systems with CRUD, analytics, and secure user flows.',
    link: '/services/ecommerce-management-systems'
  },
]

export const infoList = [
    { icon: assets.code_icon, iconDark: assets.code_icon_dark, title: 'Languages', description: 'HTML, CSS, JavaScript React Js, Next Js' },
    { icon: assets.edu_icon, iconDark: assets.edu_icon_dark, title: 'Education', description: 'BSc(Honors) & MSc. in Physics' },
    { icon: assets.project_icon, iconDark: assets.project_icon_dark, title: 'Projects', description: 'Built more than 5 projects' }
];

export const toolsData = [
    assets.vscode, assets.firebase, assets.mongodb, assets.figma, assets.git
];
