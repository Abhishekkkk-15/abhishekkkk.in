import { cookies } from "next/headers";
import { getPortfolioData, ensureInitialAdminUser } from "../lib/portfolioService";
import { getGitHubActivity } from "../lib/github";
import TerminalTheme from "../components/themes/terminal/TerminalTheme";
import PlayerZeroTheme from "../components/themes/playerzero/PlayerZeroTheme";
import IndustrialTheme from "../components/themes/industrial/IndustrialTheme";
import MinimalTheme from "../components/themes/minimal/MinimalTheme";
import ThemeSync from "../components/ui/ThemeSync";
import GlobalRoamingShark from "../components/ui/GlobalRoamingShark";
import FloatingThemeSwitcher from "../components/ui/FloatingThemeSwitcher";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await ensureInitialAdminUser();
  const portfolio = await getPortfolioData();
  const githubData = await getGitHubActivity(
    portfolio.profile?.socials?.github,
    portfolio.githubActivity
  );

  const cookieStore = cookies();
  const cookieTheme = cookieStore.get("active_theme")?.value;
  const activeTheme =
    cookieTheme && ["terminal", "playerzero", "industrial", "minimal"].includes(cookieTheme)
      ? cookieTheme
      : (portfolio.activeTheme || "terminal");

  return (
    <>
      {/* Global Ambient Roaming ASCII Shark across all themes */}
      <GlobalRoamingShark />

      {/* Floating Theme Switcher HUD */}
      <FloatingThemeSwitcher currentTheme={activeTheme} />

      <ThemeSync
        theme={activeTheme}
        topHeadline={portfolio.profile?.matrixTopHeadline}
        bottomHeadline={portfolio.profile?.matrixBottomHeadline}
      />
      {activeTheme === "playerzero" ? (
        <PlayerZeroTheme portfolio={portfolio} githubData={githubData} />
      ) : activeTheme === "industrial" ? (
        <IndustrialTheme portfolio={portfolio} githubData={githubData} />
      ) : activeTheme === "minimal" ? (
        <MinimalTheme portfolio={portfolio} githubData={githubData} />
      ) : (
        <TerminalTheme portfolio={portfolio} githubData={githubData} />
      )}
    </>
  );
}
