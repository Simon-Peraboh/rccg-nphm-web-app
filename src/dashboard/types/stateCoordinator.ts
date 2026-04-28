export interface StateCoordinatorDTO {
  id?: number;
  full_name: string;
  state: string;
  province: string;
  facebook: string;
  twitter: string;
  instagram: string;
  image_path: File | string | null;
}

export interface StateCoordinatorResponse {
  message: string;
  data?: StateCoordinatorDTO;
}