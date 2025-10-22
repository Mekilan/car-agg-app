import axios from "axios";
import type { Car } from "../types";

const api = axios.create({
  baseURL: "/api",
  timeout: 15000,
});

export const fetchCars = async (params = {}) => {
  const res = await api.get<Car[]>("/cars", { params });
  return res.data;
};

export const triggerSync = async () => {
  await api.post("/cars/sync");
};

export const updateStatus = async (id: string, isNew: boolean) => {
  await api.put(`/cars/${id}/status`, { isNew });
};

export const updateComment = async (id: string, comment: string) => {
  await api.put(`/cars/${id}/comment`, { comment });
};

export default api;
