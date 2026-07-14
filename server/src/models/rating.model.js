 import mongoose, {Schema} from "mongoose";
 import { timeStamp } from "console";
 
 const ratingSchema = new Schema({
    caretakerId: {
         type: String,
         required: true,
     },
    assignmentId: {
         type: String,
         required: true,
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
            type: timeStamp,
            required: true
         } 
     }
 })
 
 
 export const Rating = mongoose.model("Rating", ratingSchema)