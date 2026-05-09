export interface QuarterlyReportDTO {
  id?: string;
  whichYear: string;
  period: string;
  totalSouls: string;
  totalAmount: string;
  creationDate?: string;
}

export interface QuarterlyReportResponse {
  message: string;
  quarterlyReportDTO?: QuarterlyReportDTO;
}

<<<<<<< HEAD
export type QuarterlyReportListResponse = QuarterlyReportDTO[];
=======
export type QuarterlyReportListResponse =
  | QuarterlyReportDTO[]
  | { data: QuarterlyReportDTO[] };
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
