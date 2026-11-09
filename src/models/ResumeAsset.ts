import mongoose, { Schema, Document, Model } from "mongoose";

export interface IResumeAsset extends Document {
  filename: string;
  contentType: string;
  data: Buffer;
  size: number;
  updatedAt: Date;
  createdAt: Date;
}

const ResumeAssetSchema = new Schema<IResumeAsset>(
  {
    filename: {
      type: String,
      default: "resume.pdf",
    },
    contentType: {
      type: String,
      default: "application/pdf",
    },
    data: {
      type: Buffer,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ResumeAsset: Model<IResumeAsset> =
  mongoose.models.ResumeAsset ||
  mongoose.model<IResumeAsset>("ResumeAsset", ResumeAssetSchema);
