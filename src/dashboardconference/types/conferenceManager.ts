export interface ConferenceUser {
  id: number;
  first_name: string;
  full_name: string;
  role: "member" | "admin";
  email?: string | null;
  phone_number?: string | null;
}

export interface RegisterConferenceDTO {
  full_name: string;
  email: string;
  phone_number: string;
  state: string;
  region: string;
  province: string;
  position: string;
  accommodation: boolean;
  arrival_date?: string | null;
  departure_date?: string | null;
  first_timer: boolean;
}

export interface RegisterConferenceResponse {
  message: string;
  data: {
    first_name: string;
    registration_code: string;
    conference_theme: string;
    conference_year: string | number;
    conference_title?: string;
    is_new_user: boolean;
    already_registered?: boolean;
    temporary_password?: string | null;
  };
}

export interface MemberLoginDTO {
  first_name: string;
  registration_code: string;
  password: string;
}

export interface AdminLoginDTO {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: ConferenceUser;
  current_registration?: {
    id: number;
    registration_code: string;
    conference_event_id: number;
  };
}

export interface ConferenceActivity {
  id: number;
  conference_event_id: number;
  day_number: number;
  activity_date: string;
  start_time: string;
  end_time: string;
  title: string;
  facilitator?: string | null;
  location?: string | null;
  description?: string | null;
  sort_order: number;
}

export interface ActiveConferenceResponse {
  id: number;
  title: string;
  year: string | number;
  theme: string;
  abbreviation: string;
  start_date: string;
  end_date: string;
  registration_open_at?: string | null;
  registration_close_at?: string | null;
  status: "draft" | "open" | "closed" | "completed";
  is_active: boolean;
  activities?: ConferenceActivity[];
}

export interface AttendanceRecord {
  id: number;
  conference_registration_id: number;
  attendance_date: string;
  marked_at: string;
  status: "pending" | "approved" | "rejected";
  approved_by?: number | null;
  approved_at?: string | null;
  comments?: string | null;
  approver?: {
    id: number;
    full_name: string;
    email?: string | null;
  };
  registration?: {
    id: number;
    registration_code: string;
    conference_user?: {
      id: number;
      first_name: string;
      full_name: string;
      email?: string | null;
      phone_number?: string | null;
    };
    conference_event?: {
      id: number;
      title: string;
      year: string | number;
      theme: string;
    };
  };
}

export interface RegistrationHistory {
  id: number;
  registration_code: string;
  state: string;
  region: string;
  province: string;
  position: string;
  accommodation: boolean;
  arrival_date?: string | null;
  departure_date?: string | null;
  first_timer: boolean;
  status: string;
  conferenceEvent: {
    id: number;
    title: string;
    year: string | number;
    theme: string;
    abbreviation: string;
  };
  attendanceRecords?: AttendanceRecord[];
}

export interface DashboardResponse {
  user: ConferenceUser;
  active_conference: ActiveConferenceResponse | null;
  current_registration: {
    id: number;
    registration_code: string;
    state: string;
    region: string;
    province: string;
    position: string;
    accommodation: boolean;
    arrival_date?: string | null;
    departure_date?: string | null;
    first_timer: boolean;
    status: string;
  } | null;
  current_attendance: AttendanceRecord[];
  history: RegistrationHistory[];
  activities: ConferenceActivity[];
}

export interface MarkAttendanceDTO {
  attendance_date: string;
  comments?: string;
}

export interface CreateAdminDTO {
  full_name: string;
  email: string;
  phone_number?: string | null;
  password: string;
  password_confirmation: string;
}

export interface CreateAdminResponse {
  message: string;
  data: {
    id: number;
    first_name: string;
    full_name: string;
    email: string;
    phone_number?: string | null;
    role: "admin";
  };
}

export interface CreateConferenceEventDTO {
  title: string;
  year: number;
  theme: string;
  abbreviation: string;
  start_date: string;
  end_date: string;
  registration_open_at?: string | null;
  registration_close_at?: string | null;
  status: "draft" | "open" | "closed" | "completed";
  is_active: boolean;
}

export interface ConferenceEventListItem {
  id: number;
  title: string;
  year: number | string;
  theme: string;
  abbreviation: string;
  start_date: string;
  end_date: string;
  registration_open_at?: string | null;
  registration_close_at?: string | null;
  status: "draft" | "open" | "closed" | "completed";
  is_active: boolean;
  activities?: ConferenceActivity[];
  created_at?: string;
  updated_at?: string;
}

export interface ConferenceEventResponse {
  message: string;
  data: ConferenceEventListItem;
}

export interface CreateConferenceActivityDTO {
  day_number: number;
  activity_date: string;
  start_time: string;
  end_time: string;
  title: string;
  facilitator?: string | null;
  location?: string | null;
  description?: string | null;
  sort_order?: number;
}

export interface ConferenceActivityResponse {
  message: string;
  data: {
    id: number;
    conference_event_id: number;
    day_number: number;
    activity_date: string;
    start_time: string;
    end_time: string;
    title: string;
    facilitator?: string | null;
    location?: string | null;
    description?: string | null;
    sort_order: number;
  };
}

export interface ForgotConferencePasswordDTO {
  email: string;
}

export interface ResetConferencePasswordDTO {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ConferenceActionResponse {
  message: string;
}

export interface ConferenceSummaryResponse {
  conference?: {
    id: number;
    title: string;
    theme: string;
    start_date: string;
    end_date: string;
  } | null;
  totals?: {
    registrations: number;
    attendance_submitted: number;
    attendance_approved: number;
    attendance_pending: number;
  };
}

export interface RegistrationRecordItem {
  id: number;
  registration_code: string;
  conference_event_id: number;
  conference_user_id: number;
  state: string;
  region: string;
  province: string;
  position: string;
  accommodation: boolean;
  arrival_date?: string | null;
  departure_date?: string | null;
  first_timer: boolean;
  status: string;
  created_at?: string;
  updated_at?: string;
  conference_user?: {
    id: number;
    first_name: string;
    full_name: string;
    email?: string | null;
    phone_number?: string | null;
  };
  conference_event?: {
    id: number;
    title: string;
    year: string | number;
    theme: string;
    abbreviation?: string;
  };
}