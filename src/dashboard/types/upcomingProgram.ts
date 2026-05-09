export type UpcomingProgramDTO = {
  id: string;
  title: string;
  eventDate: string;
  eventTime?: string | null;
  location?: string | null;
  image?: string | null;
  imageUrl?: string | null;
  alertMessage?: string | null;
  isPublished: boolean;
};

export type UpcomingProgramFormValues = {
  title: string;
  eventDate: string;
  eventTime: string;
  location: string;
  alertMessage: string;
  image: File | null;
  isPublished: boolean;
};

export type UpcomingProgramResponse = {
  message: string;
  data?: UpcomingProgramDTO;
};

