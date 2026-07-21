import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const authorizeRole = (...roles) => asyncHandler( async(req, res, next)=>{

    if(!roles.includes(req.user.role)){
        throw new ApiError(403, "User does not have permissions for this action")
    }
      next();

})