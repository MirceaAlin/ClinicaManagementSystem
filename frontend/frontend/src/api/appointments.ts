import { apiGet, apiPost } from "./client";

export interface AppointmentDTO {
  id: number;
  date: string;
  time: string;
  doctor: string;
}

export async function getAppointments(patientId: number) {
  return apiGet<AppointmentDTO[]>(`/appointments/patient/${patientId}`);
}

export async function addAppointment(data: {
  date: string;
  time: string;
  patientId: number;
  doctorId: number;
}) {
  return apiPost("/appointments", data);
}
