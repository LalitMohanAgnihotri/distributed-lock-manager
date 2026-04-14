import api from "./axios";

export const getPolicy = async () => {
  const { data } = await api.get("/policies");
  return data;
};

export const savePolicy = async (payload) => {
  const { data } = await api.post("/policies", payload);
  return data;
};