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
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      trim: true,
    },
    allergies: {
      type: [String],
      trim: true,
    },
    mobilityStatus: {
      type: String,
      enum: [
        "independent",
        "needs assistance",
        "wheelchair user",
        "bedridden",
      ],
      trim: true,
    },
    cognitiveStatus: {
      type: String,
      enum: [
          "normal",
          "mild memory loss",
          "dementia",
          "alzheimer's",
        ],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ElderlyProfile = mongoose.model("ElderlyProfile", elderlyProfileSchema);