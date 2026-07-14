 import mongoose, {Schema} from "mongoose";
 import { timeStamp } from "console";
 
 const scheduleSchema = new Schema({
    userId: {
         type: String,
         required: true
     },
    medicineId: {
         type: String,
         required: true
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