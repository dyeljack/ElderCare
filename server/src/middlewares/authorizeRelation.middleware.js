import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Relationship } from "../models/relationship.model.js";

export const authorizeRelation = asyncHandler( async(req, res, next)=>{

      if(!req.params.elderlyId){
        throw new ApiError(400, "elderlyId is required")
    }

    if(req.user.role !== "elderly"){ // if user not the elderly (caretaker/guardian making it for them)
    const relation = await Relationship.findOne({
        relatedUserId: req.user._id,
        elderlyId: req.params.elderlyId,
        status: "active"
    })
     if(!relation){
        throw new ApiError(403, "you are not authorized to perform this action")
     }
    }
     req.elderlyId = req.params.elderlyId
    next();
})