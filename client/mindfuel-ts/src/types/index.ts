export interface Goal {
  id: string;
  title: string;
  type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  achieved: boolean;
  rating: number;
}

export interface userTypes {
  id?: string,
  name?: string,
  email?: string,
  password?: string,
  notificationPreference?: string,
  createdAt?: Date,
  updatedAt?: Date
}

export interface RegistrationState {
  user: null | userTypes;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface GoalsState {
  goals?: Goal[] | undefined;
  loading?: boolean | undefined;
  error?: string | null | undefined;
}

export interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: number;
  unit: string;
  nextReminder: Date;
}

export interface Notification {
  id: string;
  message: string;
}
export interface LoginState {
  user: null | userTypes;
  token: string | null;
  loading: boolean;
  error: string | null;
}



export interface NotificationsState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
}









