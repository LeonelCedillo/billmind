import { Router } from "express";
import { handlerBillsCreate, handlerBillMembersAdd } from "../api/bills.js";

const router = Router();


router.post("/", async (req, res, next) => {
  Promise.resolve(handlerBillsCreate(req, res)).catch(next);
})

router.post("/:billId/members", async (req, res, next) => {
  Promise.resolve(handlerBillMembersAdd(req, res)).catch(next);
})


export default router;