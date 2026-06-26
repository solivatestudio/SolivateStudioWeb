/**
 * Types & Interfaces for Solivate Studio
 */

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // Name of Lucide icon
  tags: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  link?: string;
  stars?: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
  duration: string;
}

export interface Strength {
  id: string;
  title: string;
  description: string;
  icon: string;
}
