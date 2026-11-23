import type { SectionIntro } from './profile';

/** Built-in sample SVG illustrations (ProjectArt.astro), shown when there's no real image. */
export type ProjectArtName = 'whatsapp-agent' | 'order' | 'trade' | 'city' | 'access';

export interface Project {
  /** Plain part of the title, e.g. "Order " */
  title: string;
  /** Italic serif part of the title, e.g. "System". Include any leading space in `title`. */
  titleAccent: string;
  /** Optional short line shown above the title in small grey text. */
  subtitle?: string;
  year: string;
  description: string;
  tags: string[];
  /** Shows a "Latest" pill next to the year. Put featured projects first in the array. */
  featured?: boolean;
  /** Where the card links to. */
  repoUrl: string;
  /** Optional live demo. When set, a "Live ↗" pill appears next to the tags. */
  liveUrl?: string;
  /** Optional demo video. When set, a "Watch demo ↗" button appears next to the arrow. */
  demoUrl?: string;
  /**
   * Optional card image (16:10 works best). `src` is a file name in src/assets/projects/.
   * If `image` is left out, or its file isn't there yet, the card shows `art`
   * with a small "Sample image" label instead.
   */
  image?: {
    src: string;
    alt: string;
  };
  /** Fallback illustration for the card. */
  art?: ProjectArtName;
}

export const workSection: SectionIntro = {
  title: 'Featured',
  accent: 'work',
  intro: 'Academic and personal projects. Each one taught me something different about building real systems.',
};

/** Labels for the horizontal project scroller (Projects.astro). */
export const scrollerLabels = {
  region: 'Featured projects',
  prev: 'Previous project',
  next: 'Next project',
};

/** Pill shown next to the year on featured cards. */
export const featuredLabel = 'Latest';

/** Button text for projects with a demoUrl (an "↗" is added after it). */
export const demoLabel = 'Watch demo';

// TODO: point each repoUrl at the project's own repository (all default to the GitHub profile for now).
const GITHUB = 'https://github.com/rashmika1230';
const WHATSAPP_AGENT = 'https://github.com/rashmika1230/whatsapp-order-automation';
const ORDER_SYSTEM = 'https://github.com/rashmika1230/order-system-app';
const SMARTCITY360 = 'https://github.com/rashmika1230/smart-city-management-system';

/**
 * To add a project, add an object to this array. Cards render in this order.
 */
export const projects: Project[] = [
  {
    title: 'WhatsApp ',
    titleAccent: 'AI Agent',
    subtitle: 'AI automation for small businesses',
    year: '2026',
    featured: true,
    description:
      "An AI agent that answers a small business's customers on WhatsApp 24/7. Built with n8n and Google Gemini, it replies to questions, captures leads into Google Sheets and handles order updates, running on a self-hosted n8n server on AWS EC2.",
    tags: ['n8n', 'Agentic AI', 'Google Gemini', 'WhatsApp', 'Google Sheets', 'AWS EC2'],
    // TODO: replace with the WhatsApp AI Agent repository URL.
    repoUrl: WHATSAPP_AGENT,
    // TODO: add a demo video link, e.g. demoUrl: 'https://youtu.be/…',
    // Add a screenshot (n8n workflow canvas or a WhatsApp chat) as src/assets/projects/whatsapp-agent.webp
    image: {
      src: 'whatsapp-agent.webp',
      alt: 'WhatsApp AI Agent: a customer chat on WhatsApp answered automatically by an n8n workflow using Google Gemini and Google Sheets',
    },
    art: 'whatsapp-agent',
  },
  {
    title: 'Order ',
    titleAccent: 'System',
    year: '2026',
    description:
      'Spring Boot microservices — product, order and API gateway — with a production-style DevOps setup on AWS.',
    tags: ['Spring Boot', 'Microservices', 'Docker', 'AWS'],
    repoUrl: ORDER_SYSTEM,
    image: {
      src: 'order-system.webp',
      alt: 'Order System: an API gateway routing requests to product, order and inventory microservices',
    },
    art: 'order',
  },
  {
    title: 'GlobalTrade ',
    titleAccent: 'GSCM',
    year: '2026',
    description: 'Supply chain management system built on Jakarta EE with EJB-based business components.',
    tags: ['Jakarta EE', 'EJB', 'MySQL'],
    repoUrl: GITHUB,
    image: {
      src: 'globaltrade.webp',
      alt: 'GlobalTrade GSCM: global shipping routes between supply chain locations',
    },
    art: 'trade',
  },
  {
    title: 'SmartCity',
    titleAccent: '360',
    year: '2026',
    description: 'Smart city management web app designed around object-oriented design patterns.',
    tags: ['Java', 'Design patterns', 'Web'],
    repoUrl: SMARTCITY360,
    image: {
      src: 'smartcity360.webp',
      alt: 'SmartCity360: a city skyline monitored by the smart city management app',
    },
    art: 'city',
  },
  {
    title: 'Smart ',
    titleAccent: 'Access',
    year: '2026',
    description: 'ESP32-based smart access control system for the AI unit — hardware meets software.',
    tags: ['ESP32', 'IoT', 'C++'],
    repoUrl: GITHUB,
    image: {
      src: 'smart-access.webp',
      alt: 'Smart Access: an ESP32 board sending a wireless signal to an electronic lock',
    },
    art: 'access',
  },
];
