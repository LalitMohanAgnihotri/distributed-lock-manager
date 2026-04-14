import { Router } from "express";
import { scanDeadlocks, resolveDeadlock } from "./deadlock.service.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    res.json(await scanDeadlocks());
  } catch (e) {
    next(e);
  }
});

router.post("/resolve", async (req, res, next) => {
  try {
    const victim =
      req.body.victimOwner || req.body.owner;

    if (!victim) {
      return res.status(400).json({
        success: false,
        message: "victim owner required",
      });
    }

    await resolveDeadlock(victim);

    res.json({
      success: true,
      resolved: victim,
    });
  } catch (e) {
    next(e);
  }
});

export default router;