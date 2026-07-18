 import mongoose, {Schema} from "mongoose";
 import { Timestamp } from "mongodb";
 
 const scheduleSchema = new Schema({
    userId: {
           type: Schema.Types.ObjectId,
            ref: "User"
     },
    medicineId: {
         type: Schema.Types.ObjectId,
            ref: "Medicine"
     },
    time: [{
         type: String,
         required: true
     }],
    startDate: {
        type: timeStamp,
        required: true
    },
    endDate: {
        type: timeStamp,
        required: true
    },
    frequency: {
         type: String,
         required: true
     },
    dosage: {
         type: String,
         required: true
     },
    status: {
         type: String,
         required: true
     },
    createdBy: {
         type: String,
         required: true
     },
    updatedBy: {
        type: String,
        required: true
    }
 }, {timestamps: true})
 
 
 export const Schedule = mongoose.model("Schedule", scheduleSchema)