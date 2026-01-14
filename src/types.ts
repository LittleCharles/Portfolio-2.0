export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum NavRoute {
  HOME = '/',
  ABOUT = '/about',
  PROJECTS = '/projects',
  CONTACT = '/contact',
  AI_TERM = '/terminal'
}