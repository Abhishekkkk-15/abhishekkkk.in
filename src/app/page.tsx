import { getPortfolioData, ensureInitialAdminUser } from "../lib/portfolioService";
import { getGitHubActivity } from "../lib/github";
import MinimalTheme from "../components/MinimalTheme";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await ensureInitialAdminUser();
  const portfolio = await getPortfolioData();
  const githubData = await getGitHubActivity(
    portfolio.profile?.socials?.github,
    portfolio.githubActivity
  );

  return <MinimalTheme portfolio={portfolio} githubData={githubData} />;
}
