export interface MonthlyReportDTO {
  id?: string;
  state: string;
  region: string;
  province: string;
  coordinator_name: string;
  prison_visited?: string;
  hospital_visited?: string;
  police_station_visited?: string;
  others?: string;
  items: string;
  amount_budgeted: string;
  amount_spent: string;
  team_members: string;
  souls_won: string;
  challenges?: string;
  suggestion?: string;
  remarks?: string;
  report_created_by: string;
  activity_date: string;
}

export interface MonthlyReportResponse {
  message: string;
  monthlyReportDTO?: MonthlyReportDTO;
}

export interface RegionListResponse {
  regions: string[];
}

export interface ProvinceListResponse {
  provinces: string[];
}

export type MonthlyReportListResponse = MonthlyReportDTO[];