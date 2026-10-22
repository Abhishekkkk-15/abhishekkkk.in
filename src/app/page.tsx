import { getPortfolioData, ensureInitialAdminUser } from "../lib/portfolioService";
import { getGitHubActivity } from "../lib/github";
import TerminalTheme from "../components/themes/terminal/TerminalTheme";
import PlayerZeroTheme from "../components/themes/playerzero/PlayerZeroTheme";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await ensureInitialAdminUser();
  const portfolio = await getPortfolioData();
  const githubData = await getGitHubActivity(
    portfolio.profile?.socials?.github,
    portfolio.githubActivity
  );

  const activeTheme = portfolio.activeTheme || "terminal";

  if (activeTheme === "playerzero") {
    return <PlayerZeroTheme portfolio={portfolio} githubData={githubData} />;
  }

  return <TerminalTheme portfolio={portfolio} githubData={githubData} />;
}
