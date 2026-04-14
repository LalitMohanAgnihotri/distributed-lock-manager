import api from "./axios";

export const getMetrics = async () => {
  const { data } = await api.get("/metrics");
  return data;
};