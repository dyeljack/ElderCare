 import mongoose, {Schema} from "mongoose";
 
 const timeslotSchema = new Schema({ // available caretaker timeslots
    timeslot:[{
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        }
    }],
    days: [{
        type: String,
        enum: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
        required: true
    }], 
    caretakerId: {
      type: Schema.Types.ObjectId,
            ref: "User",
            required: true
     },
 }, {timestamps: true})
 
 
 export const Timeslot= mongoose.model("Timeslot", timeslotSchema)