
export interface Member {
  id: string | number;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  groups: string[];
  joinDate: string;
  status: 'Ativo' | 'Inativo';
}

export interface User {
  id: string | number;
  name: string;
  email: string;
  role: string;
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
  status: 'Acompanhamento' | 'Batizado' | 'Integrado';
  avatar: string;
}

export interface DiscipleshipGroup {
  id: string | number;
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
  PASTOR = 'Pastor',
  SUPERVISOR = 'Supervisor',
  LIDER = 'Líder',
  LIDER_NOVOS_MEMBROS = 'Líder de Novos Membros',
  MEMBRO = 'Membro',
  ADMIN = 'Admin'
}

export interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface ClassLesson {
  id: number;
  title: string;
  date: string;
  completed: boolean;
  attendanceCount: number;
}

export interface NewMemberClass {
  id: number;
  name: string;
  startDate: string;
  status: 'Em Andamento' | 'Concluída' | 'Cancelada';
  lessons: ClassLesson[];
  students: Member[];
}
