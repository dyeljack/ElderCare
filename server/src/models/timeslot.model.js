 import mongoose, {Schema} from "mongoose";
 import { time, timeStamp } from "console";
 
 const timeslotSchema = new Schema({
    timeslot:[{
        startTime: {
            type: time,
            required: true
        },
        endTime: {
            type: time,
            required: true
        },
        available: {
            type: Boolean,
            required: true
        }
    }],
    days: [{
        type: String,
        required: true
    }], 
    caretakerId: {
         type: String,
         required: true
     },
 }, {timestamps: true})
 
 
 export const Timeslot= mongoose.model("Timeslot", timeslotSchema)