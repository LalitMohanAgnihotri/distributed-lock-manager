import Log from "./log.model.js";
import { emitUpdate } from "../../utils/socketEmit.js";

export const writeLog = async (
  message,
  level = "info",
  meta = {}
) => {
  const doc = await Log.create({
    message,
    level,
    meta,
  });

  emitUpdate("logs:update");

  return doc;
};

export const getLogs = () =>
  Log.find()
    .sort({ createdAt: -1 })
    .limit(100);