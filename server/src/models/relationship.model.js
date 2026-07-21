 import mongoose, {Schema} from "mongoose";
 
 const relationshipSchema = new Schema({
    elderlyId: {
           type: Schema.Types.ObjectId,
           ref: "User",
           required: true
     },
    relatedUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
     },
    type: {
        type: String,
        required: true,
        enum: ["caretaker", "guardian"]
    },
    startDate: {
        type: Date,
        required: function(){
            return this.type === "caretaker"
        }
    },
    endDate: {
        type: Date,
        required: function(){
            return this.type === "caretaker"
        }
    },
    status: {
         type: String,
         enum: ["active", "pending", "ended"],
         required: true
     }
 }, {timestamps: true})
 
 
 export const Relationship = mongoose.model("Relationship", relationshipSchema)