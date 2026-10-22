import { connectToDatabase } from "./mongodb";
import {
  Portfolio,
  defaultPortfolioData,
  IPortfolioData,
} from "../models/Portfolio";
import { User } from "../models/User";
import { hashPassword } from "./auth";

export async function getPortfolioData(): Promise<IPortfolioData> {
  try {
    await connectToDatabase();
    let doc = await Portfolio.findOne().lean<IPortfolioData>();

    if (!doc) {
      const created = await Portfolio.create(defaultPortfolioData);
      doc = created.toObject() as IPortfolioData;
    }

    return JSON.parse(JSON.stringify(doc));
  } catch (err) {
    console.warn("MongoDB connection notice (using default portfolio baseline):", err);
    return defaultPortfolioData;
  }
}

export async function updatePortfolioData(
  newData: Partial<IPortfolioData>
): Promise<IPortfolioData> {
  await connectToDatabase();
  let doc = await Portfolio.findOne();

  if (!doc) {
    doc = await Portfolio.create({
      ...defaultPortfolioData,
      ...newData,
    });
  } else {
    // Merge fields
    if (newData.activeTheme) doc.activeTheme = newData.activeTheme as any;
    if (newData.profile) doc.profile = newData.profile as any;
    if (newData.architecturalFocus) doc.architecturalFocus = newData.architecturalFocus as any;
    if (newData.experience) doc.experience = newData.experience as any;
    if (newData.projects) doc.projects = newData.projects as any;
    if (newData.flagshipDossier) doc.flagshipDossier = newData.flagshipDossier as any;
    if (newData.githubActivity) doc.githubActivity = newData.githubActivity as any;
    if (newData.skillMatrix) doc.skillMatrix = newData.skillMatrix as any;
    if (newData.contactInfo) doc.contactInfo = newData.contactInfo as any;
    await doc.save();
  }

  return JSON.parse(JSON.stringify(doc.toObject()));
}

export async function ensureInitialAdminUser() {
  try {
    await connectToDatabase();
    const count = await User.countDocuments();
    if (count === 0) {
      const defaultEmail = process.env.ADMIN_EMAIL || "abhishekjangid3489@gmail.com";
      const defaultPassword = process.env.ADMIN_PASSWORD || "admin123456";
      const hashedPassword = await hashPassword(defaultPassword);
      await User.create({
        email: defaultEmail.toLowerCase(),
        password: hashedPassword,
      });
      console.log(`Initial admin user created: ${defaultEmail}`);
    }
  } catch (err) {
    console.warn("Could not ensure admin user in DB:", err);
  }
}
