 import mongoose, {Schema} from "mongoose";
 import { Timestamp } from "mongodb";
 
 const caretakerSchema = new Schema({
     userId: {
          type: Schema.Types.ObjectId,
            ref: "User"
     },
    liveLocation: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    accuracy: {
        type: Number,
        required: true
    },
    updatedAt: {
        type: Timestamp,
        required: true
    }
    },
    verified: {
         type: String,
         required: true,
     },
    forHire: {
         type: Boolean,
         required: true,
     },
     availability: {
         type: Boolean,
         required: true
     }
 })
 
 
 export const Caretaker = mongoose.model("Caretaker", caretakerSchema)