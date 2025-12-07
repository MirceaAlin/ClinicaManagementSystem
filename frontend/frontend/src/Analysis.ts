export interface Analysis {
    id?: number;
    testName: string;
    result: string;
    unit?: string;
    normalRange?: string;
    testDate: string; // LocalDate → string în frontend (YYYY-MM-DD)
    consultationId?: number; 
    patientId?: number;
}
