import { Router } from "express";
import { handlerLogin } from "../api/login.js";
import { handlerUsersCreate, handlerUsersUpdate } from "../api/users.js";
import { handlerRefresh, handlerRevoke } from "../api/refresh.js";


const router = Router();

// ------------------------ Users --------------------------------

router.post("/register", async (req, res, next) => { // TODO: change to 'users' and fix frontend
  try {
    await handlerUsersCreate(req, res);
  } catch (err) {
    next(err); // Pass the error to the errorMiddleware
  }
});

router.put("/update", async (req, res, next) => { // TODO: change to 'users' too and move to new usersRoutes file
  Promise.resolve(handlerUsersUpdate(req, res).catch(next));
});

// --------------------- Authentication ---------------------------

router.post("/login", async (req, res, next) => {
  Promise.resolve(handlerLogin(req, res)).catch(next);
});

router.post("/refresh", async (req, res, next) => {
  Promise.resolve(handlerRefresh(req, res)).catch(next);
});

router.post("/revoke", async (req, res, next) => {
  Promise.resolve(handlerRevoke(req, res)).catch(next);
});

export default router;