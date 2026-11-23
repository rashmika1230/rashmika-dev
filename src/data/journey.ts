import type { SectionIntro } from './profile';

export interface JourneyStep {
  when: string;
  title: string;
  description: string;
}

export const journeySection: SectionIntro = {
  title: 'The',
  accent: 'journey',
  intro: "Where I've been learning and what I'm building toward.",
};

export const journey: JourneyStep[] = [
  {
    when: 'Now',
    title: 'BSc (Hons) Software Engineering',
    description: 'Final year at the Java Institute of Advanced Technology, a BCU-affiliated degree.',
  },
  {
    when: 'Ongoing',
    title: 'DevOps & cloud self-study',
    description: 'Containers, CI/CD pipelines, Kubernetes and AWS — learned by deploying my own projects.',
  },
  {
    when: 'Next',
    title: 'Internship / graduate role',
    description: 'Looking for a team where I can work on Java backends and the infrastructure behind them.',
  },
];
