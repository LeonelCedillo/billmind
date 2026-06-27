import { Router } from "express";
import { handlerUsersCreate } from "../api/users.js";
import { handlerUsersUpdate } from "../api/users.js";
import { handlerUsersDelete } from "../api/users.js";


const router = Router();


router.post("/", async (req, res, next) => { // register new user
  try {
    await handlerUsersCreate(req, res);
  } catch (err) {
    next(err); // Pass the error to the errorMiddleware 
  }
});

router.put("/", async (req, res, next) => { // update user info
  Promise.resolve(handlerUsersUpdate(req, res).catch(next));
});

router.delete("/", async (req, res, next) => {
  Promise.resolve(handlerUsersDelete(req, res).catch(next));
});

export default router;