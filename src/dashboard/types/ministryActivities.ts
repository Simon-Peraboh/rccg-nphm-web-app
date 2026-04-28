export interface MinistryActivityDTO {
  id: string;
  title: string;
  caption?: string | null;
  activityDate?: string | null;
  location?: string | null;
  image?: string | File | null;
  imageUrl?: string | null;
  isPublished?: boolean;
}

export interface PublicMinistryActivity extends MinistryActivityDTO {}

export interface MinistryActivityResponse {
  message: string;
  data: MinistryActivityDTO;
}

export type MinistryActivitiesListResponse =
  | MinistryActivityDTO[]
  | { data: MinistryActivityDTO[] };

export type PublicMinistryActivitiesListResponse =
  | PublicMinistryActivity[]
  | { data: PublicMinistryActivity[] };

export interface MinistryActivityFormValues {
  title: string;
  caption?: string;
  activityDate?: string;
  location?: string;
  image?: File | null;
  isPublished?: boolean;
}