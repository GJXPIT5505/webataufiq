import { COMPACT_QUERY, useMediaQuery } from "@/hooks/useMediaQuery";
import AchievementsDesktop from "./AchievementsDesktop";
import AchievementsMobile from "./AchievementsMobile";
import { achievements as staticAchievements } from "@/data/achievements";

export default function AchievementsSection({ achievementsData = [] }) {
  const compact = useMediaQuery(COMPACT_QUERY);
  const achievements = achievementsData && achievementsData.length > 0
    ? achievementsData
    : staticAchievements;

  return compact ? (
    <AchievementsMobile achievements={achievements} />
  ) : (
    <AchievementsDesktop achievements={achievements} />
  );
}
