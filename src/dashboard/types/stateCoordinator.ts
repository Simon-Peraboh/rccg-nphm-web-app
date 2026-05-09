export interface StateCoordinatorDTO {
  id?: number;
  full_name: string;
  state: string;
  province: string;
  facebook: string;
  twitter: string;
  instagram: string;
  image_path: File | string | null;
<<<<<<< HEAD
=======
  image_url?: string | null;
  created_at?: string;
  updated_at?: string;
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
}

export interface StateCoordinatorResponse {
  message: string;
  data?: StateCoordinatorDTO;
<<<<<<< HEAD
}
=======
}
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
