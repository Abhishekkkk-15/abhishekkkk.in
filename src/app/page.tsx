import { getPortfolioData, ensureInitialAdminUser } from "../lib/portfolioService";
import { getGitHubActivity } from "../lib/github";
import TerminalTheme from "../components/themes/terminal/TerminalTheme";
import PlayerZeroTheme from "../components/themes/playerzero/PlayerZeroTheme";
import IndustrialTheme from "../components/themes/industrial/IndustrialTheme";
import ThemeSync from "../components/ui/ThemeSync";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await ensureInitialAdminUser();
  const portfolio = await getPortfolioData();
  const githubData = await getGitHubActivity(
    portfolio.profile?.socials?.github,
    portfolio.githubActivity
  );

  const activeTheme = portfolio.activeTheme || "terminal";

  return (
    <>
      <ThemeSync
        theme={activeTheme}
        topHeadline={portfolio.profile?.matrixTopHeadline}
        bottomHeadline={portfolio.profile?.matrixBottomHeadline}
      />
      {activeTheme === "playerzero" ? (
        <PlayerZeroTheme portfolio={portfolio} githubData={githubData} />
      ) : activeTheme === "industrial" ? (
        <IndustrialTheme portfolio={portfolio} githubData={githubData} />
      ) : (
        <TerminalTheme portfolio={portfolio} githubData={githubData} />
      )}
    </>
  );
}
