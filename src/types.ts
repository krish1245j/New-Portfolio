export interface ArchitectureNode {
  id: string;
  name: string;
  layer: string;
  protocol: string;
  badge: string;
  badgeColor: 'primary' | 'secondary' | 'tertiary';
  description: string;
  details: string[];
  techStack: string[];
}

export interface SkillItem {
  name: string;
  percentage: number;
}

export interface SkillCategory {
  number: string;
  title: string;
  iconName: string;
  color: 'primary' | 'secondary' | 'tertiary';
  skills: SkillItem[];
  footerNote?: string;
}

export interface ProjectData {
  number: string;
  badge: string;
  status: string;
  tags: { label: string; color?: 'primary' | 'secondary' | 'tertiary' | 'outline' }[];
  title: string;
  description: string;
  lifecycleTitle: string;
  lifecycleContent: string;
  githubUrl: string;
  ctaText: string;
  ctaSubject: string;
  sideNote: string;
}

export interface CliCommandResponse {
  cmd: string;
  output: string;
  isHtml?: boolean;
}
