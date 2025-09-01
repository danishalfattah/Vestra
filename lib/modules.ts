// Aggregator: maintain backward compatibility for existing imports
import { articleModules, getArticleBySlug } from "./articles";
import { videoModules, getVideoBySlug } from "./videos";
import { LearningModule } from "./module-types";

export const modules: LearningModule[] = [...articleModules, ...videoModules];

export function getModuleBySlug(slug: string) {
  return getArticleBySlug(slug) || getVideoBySlug(slug);
}

export { articleModules, videoModules, getArticleBySlug, getVideoBySlug };
