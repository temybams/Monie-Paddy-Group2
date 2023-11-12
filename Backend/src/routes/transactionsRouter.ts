import express from "express";
import * as transaction from "../controllers/transactions";
import { auth } from "../middleware/auth";

const router = express.Router();

router.post("/airtime", auth, transaction.buyAirtime);
router.get('/balance', auth, transaction.getBalance);
router.post("/fund", auth, transaction.fundAccount);
router.post("/sendMoney", auth, transaction.bankTransfer);

export default router;
