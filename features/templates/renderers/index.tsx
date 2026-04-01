import { ClassicTemplate } from "./ClassicTemplate";
import { ModernTemplate } from "./ModernTemplate";

export const templates = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  // Fallbacks for the rest of the 7 requested templates
  minimal: ModernTemplate,
  bold: ClassicTemplate,
  creative: ModernTemplate,
  corporate: ClassicTemplate,
  freelancer: ModernTemplate,
};

export type TemplateKey = keyof typeof templates;
