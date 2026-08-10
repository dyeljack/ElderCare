import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createMedicine, deleteMedicine, getAllMedicines, getMedicineById } from "../controllers/medicine.controller.js";

const router = Router()

router.use(verifyJWT)
router.route("/")
.post(
    upload.single("image"),
    createMedicine
)
.get(getAllMedicines)

router.route("/:medicineId")
.get(getMedicineById)
.delete(deleteMedicine)

export default router