export interface UserProfileDTO {
  id?: number;
  title: string;
  first_name: string;
  others: string;
  last_name: string;
  email: string;
  gender: string;
  region: string;
  province: string;
  zone: string;
  area: string;
  parish: string;
  state: string;
  lga: string;
  city: string;
  position: string;
  join_ministry: string;
  occupation: string;
  dob: string;
  phone_whatsapp: string;
  social_handle: string;
  address_home: string;
  nearest_busstop: string;
  address_office: string;
  industry: string;
  next_of_kin: string;
  next_of_kin_phone: string;
  image_path: File | string | null;
  ordination_category: string;
}

export interface UserProfileResponse {
  message: string;
  userProfileDTO?: UserProfileDTO;
}

export interface UserProfileLookupResponse {
  regions: string[];
  provinces: string[];
  states: string[];
  lgas: string[];
}

export const defaultUserProfileForm: UserProfileDTO = {
  title: "",
  first_name: "",
  others: "",
  last_name: "",
  email: "",
  gender: "",
  region: "",
  province: "",
  zone: "",
  area: "",
  parish: "",
  state: "",
  lga: "",
  city: "",
  position: "",
  join_ministry: "",
  occupation: "",
  dob: "",
  phone_whatsapp: "",
  social_handle: "",
  address_home: "",
  nearest_busstop: "",
  address_office: "",
  industry: "",
  next_of_kin: "",
  next_of_kin_phone: "",
  image_path: null,
  ordination_category: "",
};