import mongoose, { Schema, Document, Model } from "mongoose";
import {
  profile as defaultProfile,
  architecturalFocus as defaultFocus,
  experience as defaultExperience,
  projects as defaultProjects,
  flagshipDossier as defaultDossier,
  skillMatrix as defaultSkills,
  contactInfo as defaultContact,
} from "../data/content";

export interface IProfile {
  name: string;
  shortName: string;
  labBrand: string;
  role: string;
  location: string;
  tagline: string;
  headline: string;
  japaneseBio: string;
  avatar: string;
  email: string;
  socials: {
    github: string;
    linkedin: string;
    twitter?: string;
  };
  stats: {
    throughput: {
      label: string;
      value: string;
      unit: string;
    };
    coreEngines: {
      label: string;
      value: string;
    };
    status: {
      label: string;
      value: string;
    };
  };
  showCurlBadge?: boolean;
}

export interface IArchitecturalFocus {
  index: string;
  title: string;
  description: string;
}

export interface IExperienceItem {
  period: string;
  location: string;
  role: string;
  company: string;
  description: string;
  metric: string;
  metricSub: string;
  tags: string[];
}

export interface IProjectItem {
  codeIndex: string;
  category: string;
  title: string;
  version: string;
  status?: string;
  description: string;
  techStack: string;
  tech: string[];
  github: string;
  live?: string;
  metric: string;
  metricSub: string;
}

export interface IFlagshipDossier {
  sectionIndex: string;
  category: string;
  subtitle: string;
  title: string;
  description: string;
  metrics: Array<{ label: string; value: string }>;
  github: string;
  live?: string;
  showArchitecturePipeline?: boolean;
}

export interface IGithubActivity {
  status?: string;
  customCommits?: string;
  customPrs?: string;
  customReviews?: string;
  customStars?: string;
  customLanguages?: string;
}

export interface ISkillMatrix {
  category: string;
  items: string[];
}

export interface IContactInfo {
  locationLines: string[];
  connectLinks: Array<{ label: string; href: string }>;
  availability: string;
}

export interface IPortfolioData {
  profile: IProfile;
  architecturalFocus: IArchitecturalFocus[];
  experience: IExperienceItem[];
  projects: IProjectItem[];
  flagshipDossier: IFlagshipDossier;
  githubActivity?: IGithubActivity;
  skillMatrix: ISkillMatrix[];
  contactInfo: IContactInfo;
}

export interface IPortfolioDocument extends IPortfolioData, Document {
  updatedAt: Date;
  createdAt: Date;
}

const PortfolioSchema = new Schema<IPortfolioDocument>(
  {
    profile: {
      name: { type: String, required: true },
      shortName: { type: String, required: true },
      labBrand: { type: String, required: true },
      role: { type: String, required: true },
      location: { type: String, required: true },
      tagline: { type: String, required: true },
      headline: { type: String, required: true },
      japaneseBio: { type: String, required: true },
      avatar: { type: String, required: true },
      email: { type: String, required: true },
      socials: {
        github: { type: String, required: true },
        linkedin: { type: String, required: true },
        twitter: { type: String, default: "" },
      },
      stats: {
        throughput: {
          label: { type: String, required: true },
          value: { type: String, required: true },
          unit: { type: String, required: true },
        },
        coreEngines: {
          label: { type: String, required: true },
          value: { type: String, required: true },
        },
        status: {
          label: { type: String, required: true },
          value: { type: String, required: true },
        },
      },
      showCurlBadge: { type: Boolean, default: false },
    },
    architecturalFocus: [
      {
        index: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    experience: [
      {
        period: { type: String, required: true },
        location: { type: String, required: true },
        role: { type: String, required: true },
        company: { type: String, required: true },
        description: { type: String, required: true },
        metric: { type: String, required: true },
        metricSub: { type: String, required: true },
        tags: [{ type: String }],
      },
    ],
    projects: [
      {
        codeIndex: { type: String, required: true },
        category: { type: String, required: true },
        title: { type: String, required: true },
        version: { type: String, required: true },
        status: { type: String },
        description: { type: String, required: true },
        techStack: { type: String, required: true },
        tech: [{ type: String }],
        github: { type: String, required: true },
        live: { type: String, default: "" },
        metric: { type: String, required: true },
        metricSub: { type: String, required: true },
      },
    ],
    flagshipDossier: {
      sectionIndex: { type: String, required: true },
      category: { type: String, required: true },
      subtitle: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      metrics: [
        {
          label: { type: String, required: true },
          value: { type: String, required: true },
        },
      ],
      github: { type: String, required: true },
      live: { type: String, default: "" },
      showArchitecturePipeline: { type: Boolean, default: false },
    },
    githubActivity: {
      status: { type: String, default: "Active Development" },
      customCommits: { type: String, default: "" },
      customPrs: { type: String, default: "164" },
      customReviews: { type: String, default: "312" },
      customStars: { type: String, default: "4.2k" },
      customLanguages: {
        type: String,
        default: "TypeScript (48%)\nGo (20%)\nRust (15%)",
      },
    },
    skillMatrix: [
      {
        category: { type: String, required: true },
        items: [{ type: String }],
      },
    ],
    contactInfo: {
      locationLines: [{ type: String }],
      connectLinks: [
        {
          label: { type: String, required: true },
          href: { type: String, required: true },
        },
      ],
      availability: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

export const defaultGithubActivity: IGithubActivity = {
  status: "Active Development",
  customCommits: "",
  customPrs: "164",
  customReviews: "312",
  customStars: "4.2k",
  customLanguages: "TypeScript (48%)\nGo (20%)\nRust (15%)",
};

export const defaultPortfolioData: IPortfolioData = {
  profile: defaultProfile,
  architecturalFocus: defaultFocus,
  experience: defaultExperience,
  projects: defaultProjects,
  flagshipDossier: defaultDossier,
  githubActivity: defaultGithubActivity,
  skillMatrix: defaultSkills,
  contactInfo: defaultContact,
};

export const Portfolio: Model<IPortfolioDocument> =
  mongoose.models.Portfolio ||
  mongoose.model<IPortfolioDocument>("Portfolio", PortfolioSchema);
