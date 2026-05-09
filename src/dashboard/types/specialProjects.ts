export interface SpecialProjectsReportDTO {
  id: string;
  projectName: string;
  projectDescription: string;
  projectLocation: string;
  state: string;
  projectEstimate: string;
  projectCost: string;
  projectStartDate: string;
  projectCompletedDate: string;
  projectManager: string;
  projectAid: string;
<<<<<<< HEAD
  projectRemarks?: string;
=======
  projectRemarks?: string | null;
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
  projectBeforeImage?: string | File | null;
  projectInProgressImage?: string | File | null;
  projectCompletedImage?: string | File | null;
  slug?: string;
}

export interface PublicSpecialProject extends SpecialProjectsReportDTO {
  beforeImageUrl?: string | null;
  inProgressImageUrl?: string | null;
  completedImageUrl?: string | null;
}

export interface SpecialProjectsReportResponse {
  message: string;
  data: SpecialProjectsReportDTO;
}

export type SpecialProjectsListResponse =
  | SpecialProjectsReportDTO[]
  | { data: SpecialProjectsReportDTO[] };

export type PublicSpecialProjectsListResponse =
  | PublicSpecialProject[]
  | { data: PublicSpecialProject[] };

export interface SpecialProjectsReportFormValues {
  projectName: string;
  projectDescription: string;
  projectLocation: string;
  state: string;
  projectEstimate: string;
  projectCost: string;
  projectStartDate: string;
  projectCompletedDate: string;
  projectManager: string;
  projectAid: string;
<<<<<<< HEAD
  projectRemarks?: string;
=======
  projectRemarks?: string | null;
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
   projectBeforeImage?: File | null;
  projectInProgressImage?: File | null;
  projectCompletedImage?: File | null;
}
