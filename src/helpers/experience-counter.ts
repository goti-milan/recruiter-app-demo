export interface ExperienceItem {
  caption?: string;
}

export interface ExperienceSummary {
  formatted: string;
}

export function calculateExperience(experiences: ExperienceItem[] = []): ExperienceSummary {
  let totalMonths = 0;

  experiences.forEach((item) => {
    const caption = item?.caption || "";
    if (typeof caption !== "string") return;

    const yearMatch = caption.match(/(\d+)\s*yrs?/);
    const monthMatch = caption.match(/(\d+)\s*mos?/);

    const years = yearMatch ? parseInt(yearMatch[1], 10) : 0;
    const months = monthMatch ? parseInt(monthMatch[1], 10) : 0;

    totalMonths += years * 12 + months;
  });

  const totalYears = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;

  return {
    formatted: `${totalYears} yr${totalYears !== 1 ? "s" : ""} ${remainingMonths} mo${remainingMonths !== 1 ? "s" : ""}`,
  };
}
