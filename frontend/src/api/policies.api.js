import api from "./axios";

export const getPolicy = async () => {
  const { data } = await api.get("/policies");
  return data.policy;
};

export const savePolicy = async (payload) => {
  const { data } = await api.put("/policies", payload);
  return data.policy;
};