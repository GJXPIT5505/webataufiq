import React from "react";
import {
  Award,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Lightbulb,
  Newspaper,
  Users,
} from "lucide-react";

const ICONS = {
  Users,
  BookOpen,
  GraduationCap,
  CalendarDays,
  Award,
  Lightbulb,
  Newspaper,
};

// Resolves a BlogCategoryDef's icon name to the actual component. Falls back to Newspaper.
export default function BlogCategoryIcon({
  name,
  className = "",
}) {
  const Icon = ICONS[name] ?? Newspaper;
  return <Icon aria-hidden="true" className={className} />;
}

