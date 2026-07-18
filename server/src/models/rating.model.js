 import mongoose, {Schema} from "mongoose";
 import { Timestamp } from "mongodb";
 
 const ratingSchema = new Schema({
    caretakerId: {
        type: Schema.Types.ObjectId,
        ref: "User"
     },
    assignmentId: {
        type: Schema.Types.ObjectId,
        ref: "Assignment"
     },
     averageRating: {
         type: Number,
     },
     ratings: {
         createdBy:{
            type: String,
            required: true
         },
         rating: {
           type: Number,
           required: true
         },
         createdAt:{
            type: timestamp,
            required: true
         } 
     }
 })
 
 
 export const Rating = mongoose.model("Rating", ratingSchema)