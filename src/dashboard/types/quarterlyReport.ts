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

export type QuarterlyReportListResponse =
  | QuarterlyReportDTO[]
  | { data: QuarterlyReportDTO[] };
