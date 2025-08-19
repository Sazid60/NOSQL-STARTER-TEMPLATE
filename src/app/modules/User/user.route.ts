import { Router } from "express";
import { UserController } from "./user.controller";
import { multerUpload } from "../../config/multer.config";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";

const router = Router()

router.post("/register", multerUpload.single("file"), validateRequest(createUserZodSchema), UserController.createUser)


router.get("/all-users", checkAuth(Role.ADMIN), UserController.getAllUsers)

router.get("/me", checkAuth(...Object.values(Role)), UserController.getMe)


router.patch("/:id", validateRequest(updateUserZodSchema), checkAuth(...Object.values(Role)), UserController.updateUser)
router.get("/:id",checkAuth(Role.ADMIN), UserController.getSingleUser)


export const UserRoutes = router 