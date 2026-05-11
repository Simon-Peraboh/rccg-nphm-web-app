export interface StateCoordinatorDTO {
  id?: number;
  full_name: string;
  state: string;
  province: string;
  facebook: string;
  twitter: string;
  instagram: string;
  image_path: File | string | null;
  image_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface StateCoordinatorResponse {
  message: string;
  data?: StateCoordinatorDTO;
}
