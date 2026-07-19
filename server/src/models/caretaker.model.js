import mongoose, { Schema } from "mongoose";

const caretakerSchema = new Schema({
     userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true
     },
     verified: {
          type: String,
          required: true,
     },
     forHire: {
          type: Boolean,
          required: true,
     },
     language: [
          {
               type: String,
               required: true,
               trim: true
          }
     ],
     yoe: {
          type: Number,
          required: true,
     },
     skills: {
          type: String,
          required: true,
          trim: true
     }
}, {timestamps: true})


export const Caretaker = mongoose.model("CaretakerProfile", caretakerSchema)