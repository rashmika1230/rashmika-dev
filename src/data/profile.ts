/**
 * Site-wide profile content: identity, links, hero, about and contact text.
 * Section-specific lists live in skills.ts, projects.ts and journey.ts.
 *
 * Headings are split into `title` + `accent`: the accent is the part set in
 * Instrument Serif italic (e.g. "About" + "me").
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface Heading {
  title: string;
  accent: string;
}

export interface SectionIntro extends Heading {
  intro: string;
}

/** Icon file names in src/assets/icons/ (without .svg) */
export type TechIcon =
  | 'java'
  | 'jakartaee'
  | 'springboot'
  | 'python'
  | 'docker'
  | 'kubernetes'
  | 'aws'
  | 'githubactions'
  | 'mysql'
  | 'n8n';

export interface TechItem {
  name: string;
  icon: TechIcon;
}

export interface Fact {
  label: string;
  value: string;
}

const firstName = 'Rashmika';
const lastName = 'Lakshan';

export const profile = {
  firstName,
  /** Set in italic serif in the hero heading */
  lastName,
  fullName: `${firstName} ${lastName}`,

  /** <title> and social-card title */
  siteTitle: 'Rashmika Lakshan',
  /** Meta description used by search engines and social cards */
  siteDescription:
    'Backend Java developer and DevOps enthusiast from Sri Lanka. I build enterprise systems with Jakarta EE and Spring Boot, then ship them with containers, pipelines and cloud.',
  jobTitle: 'Backend Java Developer',
  location: 'Sri Lanka',

  /** Logo: "rashmika" + italic ".dev" */
  logo: { text: 'rashmika', accent: '.dev' },

  // TODO: replace with your real email address (Contact section + form error fallback).
  email: 'rashmika6145@gmail.com',

  /**
   * TODO: add your WhatsApp number. While `number` is empty, the WhatsApp row is hidden.
   * number: digits only in international format, no "+" or spaces, e.g. '94771234567' (used for https://wa.me/<number>)
   * display: how it's shown on the page, e.g. '+94 77 123 4567' (defaults to "+<number>")
   */
  whatsapp: {
    number: '',
    display: '',
  },

  links: {
    github: 'https://github.com/rashmika1230',
    linkedin: 'https://www.linkedin.com/in/rashmika-lakshan-97247a369',
    /** Resolved against the site base path at build time. Replace public/cv.pdf with your CV. */
    cv: '/cv.pdf',
  },

  nav: [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Work', href: '#work' },
    { label: 'Journey', href: '#journey' },
    { label: 'Contact', href: '#contact' },
  ] satisfies NavLink[],

  hero: {
    status: 'Open to internships & graduate roles',
    lead: 'Backend Java developer and DevOps enthusiast from Sri Lanka. I build enterprise systems with Jakarta EE and Spring Boot, then ship them with containers, pipelines and cloud.',
    primaryCta: { label: 'View my work →', href: '#work' },
    secondaryCta: { label: 'Get in touch', href: '#contact' },
    diagram: {
      label:
        'Diagram: code flows from Git through CI and Docker to AWS, serving a gateway with order and product services',
      caption: 'How I like to ship: code → pipeline → container → cloud',
    },
  },

  /**
   * Tech strip under the hero: logo + name. `icon` is a file name in src/assets/icons/.
   * To add one, drop a single-colour SVG (fill="currentColor") there and add its name to TechIcon.
   */
  stack: [
    { name: 'Java', icon: 'java' },
    // TODO: jakartaee.svg is a placeholder "EE" badge; swap in the official Jakarta EE logo.
    { name: 'Jakarta EE', icon: 'jakartaee' },
    { name: 'Spring Boot', icon: 'springboot' },
    { name: 'Python', icon: 'python' },
    { name: 'Docker', icon: 'docker' },
    { name: 'Kubernetes', icon: 'kubernetes' },
    { name: 'AWS', icon: 'aws' },
    { name: 'GitHub Actions', icon: 'githubactions' },
    { name: 'MySQL', icon: 'mysql' },
    { name: 'n8n', icon: 'n8n' },
  ] satisfies TechItem[],

  about: {
    title: 'About',
    accent: 'me',
    intro:
      'Final-year software engineering undergraduate who cares about how systems are designed and how they run in production.',
    /** Image file: src/assets/portrait.webp (imported in About.astro and BaseLayout.astro) */
    portrait: {
      alt: 'Portrait of Rashmika Lakshan in a black t-shirt, arms crossed',
      caption: 'Based in Sri Lanka',
    },
    statement: {
      before: 'I enjoy the parts of software most people never see — ',
      emphasis: 'business logic, transactions, APIs',
      after:
        ' — and the machinery that keeps them alive: builds, containers and infrastructure. My goal is to grow into an engineer who can take a backend from first commit to production.',
    },
    facts: [
      { label: 'Degree', value: 'BSc (Hons) Software Engineering' },
      { label: 'University', value: 'Birmingham City University (UK)' },
      { label: 'Focus', value: 'Enterprise Java' },
      { label: 'Growing into', value: 'DevOps engineering' },
      { label: 'Based in', value: 'Sri Lanka' },
    ] satisfies Fact[],
  },

  contact: {
    /** Rendered as: Let's <em>build</em><br>something. */
    before: "Let's ",
    accent: 'build',
    after: 'something.',
    intro:
      'Hiring for a backend or DevOps role, have a project in mind, or just want to talk Java and cloud? Send a message. I read every one.',
    channels: {
      email: { label: 'Email' },
      whatsapp: { label: 'WhatsApp' },
      linkedin: { label: 'LinkedIn', detail: 'rashmika-lakshan' },
      github: { label: 'GitHub', detail: 'rashmika1230' },
      cv: { label: 'Download CV', detail: 'PDF · updated November 2026' },
    },
    reply: 'Usually replies within 24 hours · Sri Lanka (UTC+5:30)',

    form: {
      title: 'Send a',
      titleAccent: 'message',
      topicsLegend: "What's it about?",
      topics: ['Job opportunity', 'Freelance project', 'Collaboration', 'Just saying hi'],
      name: { label: 'Name', placeholder: 'Rashmika Lakshan', error: 'Please enter your name' },
      email: { label: 'Email', placeholder: 'example@gmail.com', error: 'Please enter a valid email' },
      message: {
        label: 'Message',
        placeholder: 'Tell me a little about the role or project…',
        error: 'A few more words, please',
      },
      note: 'Your details are only used to reply to you.',
      submit: 'Send message →',
      sending: 'Sending…',
      /** Email subject; {topic} is replaced with the chosen topic. */
      subject: 'Portfolio message: {topic}',
      done: {
        title: 'Message',
        titleAccent: 'sent',
        text: "Thanks, I'll get back to you soon.",
        again: 'Write another',
      },
      /** Shown when sending fails; followed by a mailto link to `email`. */
      failure: "Sorry, your message couldn't be sent. Please email me directly at",
    },
  },
};
