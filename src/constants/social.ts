import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

/**
 * Social media links and configuration
 */
export const SOCIAL_LINKS = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:hello@qaai.com', label: 'Email' },
] as const;
