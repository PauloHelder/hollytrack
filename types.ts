
export interface Member {
  id: number;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  groups: string[];
  joinDate: string;
  status: 'Ativo' | 'Inativo';
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Líder' | 'Secretaria';
  avatar: string;
  lastAccess: string;
  status: 'Ativo' | 'Inativo';
}

export interface NewConvert {
  id: number;
  name: string;
  email: string;
  phone: string;
  conversionDate: string;
  mentor: string;
  status: 'Acompanhamento' | 'Batizado' | 'Integrado';
  avatar: string;
}

export interface DiscipleshipGroup {
  id: number;
  name: string;
  leader: string;
  meetingDay: string;
  meetingTime: string;
  location: string;
  membersCount: number;
  targetAudience: string;
}

export interface Department {
  id: number;
  name: string;
  leader: string;
  membersCount: number;
  description: string;
  nextMeeting: string;
  budget?: string; // Optional if we want to show budget allocation even if finance module is gone
}

export interface Report {
  id: number;
  name: string;
  date: string;
  type: 'Membros' | 'Discipulado' | 'Novos Convertidos';
}

export enum UserRole {
  ADMIN = 'Admin',
  USER = 'User'
}

export interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}
