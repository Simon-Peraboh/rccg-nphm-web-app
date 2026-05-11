export type InActionCommentDTO = {
  id: string;
  name: string;
  email?: string | null;
  region?: string | null;
  province?: string | null;
  comment: string;
  avatarUrl?: string | null;
  createdAt?: string | null;
};

export type InActionPostDTO = {
  id: string;
  title: string;
  details: string;
  activityDate?: string | null;
  location?: string | null;
  region?: string | null;
  province?: string | null;
  imageOne?: string | null;
  imageTwo?: string | null;
  imageOneUrl?: string | null;
  imageTwoUrl?: string | null;
  commentCount: number;
  likeCount: number;
  isPublished: boolean;
  comments?: InActionCommentDTO[];
};

export type InActionPostFormValues = {
  title: string;
  details: string;
  activityDate: string;
  location: string;
  region: string;
  province: string;
  imageOne: File | null;
  imageTwo: File | null;
  isPublished: boolean;
};

export type InActionPostResponse = {
  message: string;
  data?: InActionPostDTO;
};
