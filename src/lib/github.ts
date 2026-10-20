import { IGithubActivity } from "@/models/Portfolio";

export interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0, 1, 2, 3, 4
}

export interface FormattedGithubData {
  username: string;
  url: string;
  status: string;
  publicRepos: number;
  totalContributions: string;
  commitsCount: string;
  prsMerged: string;
  codeReviews: string;
  starsAccumulated: string;
  topLanguages: string[];
  currentYear: number;
  // 52 weeks × 7 days = 364 days
  weeks: ContributionDay[][];
}

export function extractGithubUsername(githubUrl: string): string {
  if (!githubUrl) return "Abhishekkkk-15";
  const cleaned = githubUrl.replace(/\/+$/, "");
  const match = cleaned.match(/github\.com\/([^/]+)/);
  if (match && match[1]) {
    return match[1];
  }
  return cleaned.replace(/^@/, "");
}

function generateFallbackCalendar(): ContributionDay[][] {
  const weeks: ContributionDay[][] = [];
  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() - 52 * 7);

  // Generate 52 weeks of days with an organic sine-wave distribution
  for (let w = 0; w < 52; w++) {
    const week: ContributionDay[] = [];
    for (let d = 0; d < 7; d++) {
      const cur = new Date(startDate);
      cur.setDate(startDate.getDate() + w * 7 + d);
      const dayIndex = w * 7 + d;
      // wave pattern density
      const wave = Math.sin((dayIndex / 364) * Math.PI * 4) * 0.5 + 0.5;
      const rand = (Math.sin(dayIndex * 13.37) + 1) / 2;
      let level = 0;
      let count = 0;

      const score = wave * 0.6 + rand * 0.4;
      if (score > 0.75) {
        level = 4;
        count = Math.floor(rand * 6) + 8;
      } else if (score > 0.55) {
        level = 3;
        count = Math.floor(rand * 4) + 4;
      } else if (score > 0.35) {
        level = 2;
        count = Math.floor(rand * 3) + 2;
      } else if (score > 0.18) {
        level = 1;
        count = 1;
      }

      week.push({
        date: cur.toISOString().split("T")[0],
        count,
        level,
      });
    }
    weeks.push(week);
  }
  return weeks;
}

export async function getGitHubActivity(
  githubUrl: string,
  overrides?: IGithubActivity
): Promise<FormattedGithubData> {
  const username = extractGithubUsername(githubUrl);
  const currentYear = new Date().getFullYear();

  let publicRepos = 18;
  let totalContributionsNum = 1842;
  let starsAccumulatedNum = 0;
  let topLanguages: string[] = [
    "TypeScript (48%)",
    "Go (22%)",
    "Rust (15%)",
    "Python (15%)",
  ];
  let weeks: ContributionDay[][] = [];

  // 1. Fetch user public profile
  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: { "User-Agent": "Next.js-Portfolio-Server" },
      next: { revalidate: 3600 },
    });
    if (userRes.ok) {
      const userData = await userRes.json();
      if (typeof userData.public_repos === "number") {
        publicRepos = userData.public_repos;
      }
    }
  } catch (e) {
    console.warn("GitHub user fetch fallback:", e);
  }

  // 2. Fetch public repos to calculate stars and top languages
  try {
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      {
        headers: { "User-Agent": "Next.js-Portfolio-Server" },
        next: { revalidate: 3600 },
      }
    );
    if (reposRes.ok) {
      const repos = await reposRes.json();
      if (Array.isArray(repos)) {
        starsAccumulatedNum = repos.reduce(
          (acc, r) => acc + (r.stargazers_count || 0),
          0
        );

        const langCounts: Record<string, number> = {};
        let totalLang = 0;
        repos.forEach((r) => {
          if (r.language) {
            langCounts[r.language] = (langCounts[r.language] || 0) + 1;
            totalLang++;
          }
        });

        if (totalLang > 0) {
          const sorted = Object.entries(langCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);

          topLanguages = sorted.map(
            ([lang, count]) =>
              `${lang} (${Math.round((count / totalLang) * 100)}%)`
          );
        }
      }
    }
  } catch (e) {
    console.warn("GitHub repos fetch fallback:", e);
  }

  // 3. Fetch public contributions calendar
  try {
    const contribRes = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      {
        headers: { "User-Agent": "Next.js-Portfolio-Server" },
        next: { revalidate: 3600 },
      }
    );
    if (contribRes.ok) {
      const contribData = await contribRes.json();
      if (contribData.total?.lastYear) {
        totalContributionsNum = contribData.total.lastYear;
      }

      if (Array.isArray(contribData.contributions) && contribData.contributions.length >= 350) {
        const rawDays: ContributionDay[] = contribData.contributions.map((d: any) => ({
          date: d.date,
          count: d.count || 0,
          level: d.level || 0,
        }));

        // Slice exact 52 weeks (364 days) from the most recent end
        const sliced = rawDays.slice(-364);
        const builtWeeks: ContributionDay[][] = [];
        for (let i = 0; i < 52; i++) {
          builtWeeks.push(sliced.slice(i * 7, (i + 1) * 7));
        }
        weeks = builtWeeks;
      }
    }
  } catch (e) {
    console.warn("GitHub contributions fetch fallback:", e);
  }

  // Fallback to organic wave calendar if API failed or returned empty
  if (weeks.length === 0) {
    weeks = generateFallbackCalendar();
  }

  // Formatted stats with user-overrides if present in the database
  const totalContributionsStr =
    overrides?.customCommits?.trim() ||
    totalContributionsNum.toLocaleString();

  const prsMerged = overrides?.customPrs?.trim() || "164";
  const codeReviews = overrides?.customReviews?.trim() || "312";

  const starsAccumulated =
    overrides?.customStars?.trim() ||
    (starsAccumulatedNum > 0
      ? `${starsAccumulatedNum} ★`
      : "4.2k ★");

  let finalLanguages = topLanguages;
  if (overrides?.customLanguages?.trim()) {
    finalLanguages = overrides.customLanguages
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
  }

  return {
    username,
    url: githubUrl.startsWith("http") ? githubUrl : `https://github.com/${username}`,
    status: overrides?.status || "Active Development",
    publicRepos,
    totalContributions: totalContributionsStr,
    commitsCount: totalContributionsStr,
    prsMerged,
    codeReviews,
    starsAccumulated,
    topLanguages: finalLanguages,
    currentYear,
    weeks,
  };
}
