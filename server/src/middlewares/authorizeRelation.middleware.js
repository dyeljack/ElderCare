import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Relationship } from "../models/relationship.model.js";

export const authorizeRelation = () => asyncHandler( async(req, res, next)=>{


    if(req.user.role != "elderly"){
        if(!req.body.elderlyId){
        throw new ApiError(400, "elderlyId is required")
    }

    const relation = await Relationship.findOne({
        relatedUserId: req.user._id,
        elderlyId: req.body.elderlyId,
        status: "active"
    })
     if(!relation){
        throw new ApiError(403, "you are not authorized to perform this action")
     }
    }
    next();
})