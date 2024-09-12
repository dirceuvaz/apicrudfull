import express from "express";
import { loginUser, addUser, deleteUser, getUsers, updateUser } from "../controllers/user.js";

const router = express.Router();

router.post("/login", loginUser);  
router.get("/", getUsers);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
