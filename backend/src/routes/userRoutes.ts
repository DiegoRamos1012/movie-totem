import { Router } from "express";
import { registerUser, authUser } from "../controllers/UserController";
import validateUser, { validateLogin } from "../middlewares/validateUser";

const router = Router();

router.post("/register", validateUser, registerUser);
router.post("/login", validateLogin, authUser);

export default router;
