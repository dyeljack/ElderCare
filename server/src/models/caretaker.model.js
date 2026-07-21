import mongoose, { Schema } from "mongoose";

const caretakerSchema = new Schema({
     verified: { 
          type: Boolean,
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
          min: 0,
          validate: Number.isInteger,
          required: true,
     },
     skills: {
          type: String,
          required: true,
          trim: true
     }
}, {timestamps: true})


export const CaretakerProfile = mongoose.model("CaretakerProfile", caretakerSchema)