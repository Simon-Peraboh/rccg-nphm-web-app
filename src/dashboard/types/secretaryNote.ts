export interface SecretaryNoteDTO {
  id?: string;
  meetingVenue: string;
  meetingAnchor: string;
  attendanceMen: string;
  attendanceWomen: string;
  attendanceChildren: string;
  attendanceTotal: string;
  detailOfMeeting: string;
  actionablePoints: string;
  actionablePointsAssigned: string;
  meetingDate: string;
  created_at?: string;
  updated_at?: string;
}

export interface SecretaryNoteResponse {
  message: string;
  secretaryNoteDTO?: SecretaryNoteDTO;
}

export type SecretaryNoteListResponse = SecretaryNoteDTO[];