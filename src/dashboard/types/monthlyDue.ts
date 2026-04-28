export interface MonthlyDuePaymentDTO {
  id?: string;
  amount: string;
  province: string;
  paymentDate: string;
  provinceCoordinator: string;
  refMonth: string;
  whoPaid?: string;
  remark?: string;
}

export interface MonthlyDuePaymentResponse {
  message: string;
  duePaymentDTO?: MonthlyDuePaymentDTO;
}

export type MonthlyDueListResponse = MonthlyDuePaymentDTO[];