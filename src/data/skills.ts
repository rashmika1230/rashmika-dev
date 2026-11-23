import type { SectionIntro } from './profile';

export interface SkillGroup {
  title: string;
  description: string;
  items: string[];
}

export const skillsSection: SectionIntro = {
  title: 'What I',
  accent: 'work with',
  intro: 'Grouped by where they sit in the life of a system.',
};

export const skills: SkillGroup[] = [
  {
    title: 'Backend',
    description: 'Enterprise logic and APIs',
    items: ['Java', 'Jakarta EE', 'EJB', 'Spring Boot', 'REST', 'MySQL'],
  },
  {
    title: 'AI automation',
    description: 'Agentic AI that does the work',
    items: ['Agentic AI', 'LLM APIs', 'Google Gemini', 'MCP', 'n8n', 'Claude Code'],
  },
  {
    title: 'DevOps',
    description: 'Build, ship, automate',
    items: ['Docker', 'Kubernetes', 'GitHub Actions', 'Linux'],
  },
  {
    title: 'Cloud & tools',
    description: 'Where it runs',
    items: ['AWS', 'Git', 'Maven', 'IntelliJ'],
  },
];
