import { Router } from "express";
import { handlerUsersCreate } from "../api/users.js";
import { handlerUsersUpdate } from "../api/users.js";


const router = Router();


router.post("/register", async (req, res, next) => {
  try {
    await handlerUsersCreate(req, res);
  } catch (err) {
    next(err); // Pass the error to the errorMiddleware
  }
});

router.put("/update", async (req, res, next) => {
  Promise.resolve(handlerUsersUpdate(req, res).catch(next));
});

export default router;