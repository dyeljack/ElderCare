 import mongoose, {Schema} from "mongoose";
 import jwt from "jsonwebtoken";
 import { Timestamp } from "mongodb";
 import { timeStamp } from "console";
 
 const caretakerSchema = new Schema({
    caretakerId: {
         type: String,
         required: true,
     },
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
         type: Boolean,
         required: true
     }
 })
 
 
 export const Caretaker = mongoose.model("Caretaker", caretakerSchema)