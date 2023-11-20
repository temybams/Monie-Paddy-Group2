import express from "express";
import * as transaction from "../controllers/transactions";
import { auth } from "../middleware/auth";

const router = express.Router();

router.post("/airtime", auth, transaction.buyAirtime);
router.post("/fund", auth, transaction.fundAccount);
router.post("/sendMoney", auth, transaction.bankTransfer);
router.post("/buydata", auth, transaction.buyDataPlans);

router.get("/balance", auth, transaction.getBalance);
router.get("/getTransactions", auth, transaction.getTransactions);
router.get("/getNetwork", auth, transaction.getNetwork);
router.get("/getDataPlans", auth, transaction.getDataPlans);

export default router;
