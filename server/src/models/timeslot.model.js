 import mongoose, {Schema} from "mongoose";
 
 const timeslotSchema = new Schema({
    timeslot:[{
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
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
      type: Schema.Types.ObjectId,
            ref: "User",
            required: true
     },
 }, {timestamps: true})
 
 
 export const Timeslot= mongoose.model("Timeslot", timeslotSchema)