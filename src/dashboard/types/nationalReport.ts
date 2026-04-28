export interface NationalReportDTO {
  id?: string;
  core_duties: string;
  monthly_task: string;
  task_done: string;
  strength?: string;
  weakness?: string;
  opportunities?: string;
  threats?: string;
  amount_budgeted: string;
  amount_spent: string;
  remarks?: string;
  created_at?: string;
}

export interface NationalReportResponse {
  message: string;
  nationalReportDTO?: NationalReportDTO;
}

export type NationalReportListResponse = NationalReportDTO[];