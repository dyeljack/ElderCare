import mongoose, { Schema } from "mongoose";

const elderlyProfileSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bloodGroup: {
      type: String,
      trim: true,
    },
    allergies: {
      type: String,
      trim: true,
    },
    mobilityStatus: {
      type: String,
      trim: true,
    },
    cognitiveStatus: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ElderlyProfile = mongoose.model("ElderlyProfile", elderlyProfileSchema);