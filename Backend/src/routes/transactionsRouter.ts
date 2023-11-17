import express from "express";
import * as transaction from "../controllers/transactions";
import { auth } from "../middleware/auth";

const router = express.Router();

router.post("/airtime", auth, transaction.buyAirtime);
router.post("/fund", auth, transaction.fundAccount);
router.post("/sendMoney", auth, transaction.bankTransfer);

router.get('/balance', auth, transaction.getBalance);
router.get('/getTransactions', auth, transaction.getTransactions);

export default router;
