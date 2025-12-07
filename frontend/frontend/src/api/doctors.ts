import { apiGet } from "./client";

export interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  specialization: string;
  department: string;
}

export function getDoctors() {
  return apiGet<Doctor[]>("/doctors");
}
