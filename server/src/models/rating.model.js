 import mongoose, {Schema} from "mongoose";
 
 const ratingSchema = new Schema({
    caretakerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true     
     },
    assignmentId: {
        type: Schema.Types.ObjectId,
        ref: "Assignment",
        required: true
     },
     averageRating: {
         type: Number,
     },
     ratings: {
         createdBy:{
             type: Schema.Types.ObjectId,
        ref: "User",
        required: true
         },
         rating: {
           type: Number,
           required: true
         },
         createdAt:{
            type: Date,
            required: true
         } 
     }
 })
 
 
 export const Rating = mongoose.model("Rating", ratingSchema)