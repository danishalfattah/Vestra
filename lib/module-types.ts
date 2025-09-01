// Shared type definitions for learning modules

export type ModuleType = "article" | "video";

export interface ModuleContentSection {
  title: string;
  text: string;
}

export interface ModuleQuizQuestion {
  question: string;
  options: string[];
  correct: number; // index of correct option
}

export interface LearningModule {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string; // budgeting | investing | planning | etc
  duration: string;
  students: number;
  type: ModuleType;
  image?: string; // thumbnail (for video will fallback to YouTube thumbnail)
  youtubeId?: string; // only for video type
  content?: ModuleContentSection[]; // only for article type
  quiz?: ModuleQuizQuestion[]; // optional quiz
}
