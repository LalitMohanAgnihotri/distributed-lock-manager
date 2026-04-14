import api from "./axios";

export const getDeadlocks = async () => {
  const { data } = await api.get("/deadlocks");
  return data;
};

export const resolveDeadlock = async (owner) => {
  const { data } = await api.post("/deadlocks/resolve", { owner });
  return data;
};