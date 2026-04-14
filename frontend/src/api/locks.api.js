import api from "./axios";

export const getLocks = async () => {
  const { data } = await api.get("/locks");
  return data;
};

export const releaseLock = async (resource, owner) => {
  const { data } = await api.post("/locks/release", {
    resource,
    owner
  });
  return data;
};