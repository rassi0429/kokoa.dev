export type Accent = 'lime' | 'cyan' | 'violet' | 'amber';
export type BackgroundMode = 'grid' | 'dots' | 'noise' | 'plain';
export type Language = 'jp' | 'en';
export type Density = 'compact' | 'normal' | 'airy';
export type WorkFilter = 'all' | 'web' | 'vr' | 'tool';
export type CursorMode = 'on' | 'off';

export interface Tweaks {
  accent: Accent;
  bg: BackgroundMode;
  lang: Language;
  density: Density;
  filter: WorkFilter;
  cursor: CursorMode;
}

export interface MouseState {
  x: number;
  y: number;
  rawX: number;
  rawY: number;
}

export interface Profile {
  handle: string;
  name: string;
  alias: string;
  role: string;
  location: string;
  tagline_jp: string;
  tagline_en: string;
  bio_jp: string;
  bio_en: string;
  likes: Array<{ ico: string; label: string }>;
  links: {
    github: string;
    x: string;
    misskey: string;
    resonite: string;
  };
}

export interface Work {
  id: string;
  name: string;
  tag: string;
  year: string;
  role: string;
  summary_jp: string;
  summary_en: string;
  stack: string[];
  stars: number | null;
  forks: number | null;
  visibility: string;
  accent: string;
}

export interface SkillGroup {
  group: string;
  items: string[];
}

export interface Org {
  name: string;
  role: string;
  note: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  note: string;
}
