import { Request, Response } from "express";

export async function buyAirtime(req: Request, res: Response) {
  return res.json({ message: "buy airtime logic" });
}
