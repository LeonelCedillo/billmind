import { Router } from "express";
import { 
  handlerBillsCreate, 
  handlerBillMembersAdd, 
  handlerBillRemindersAdd 
} from "../api/bills.js";


const router = Router();


router.post("/", async (req, res, next) => {
  Promise.resolve(handlerBillsCreate(req, res)).catch(next);
})

router.post("/:billId/members", async (req, res, next) => {
  Promise.resolve(handlerBillMembersAdd(req, res)).catch(next);
})

router.post("/:billId/reminders", async (req, res, next) => {
  Promise.resolve(handlerBillRemindersAdd(req, res)).catch(next);
})


export default router;