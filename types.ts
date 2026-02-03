
export interface MadrasaInfo {
  nameBn: string;
  nameEn: string;
  nameAr: string;
  addressBn: string;
  addressEn: string;
  addressAr: string;
  logo: string | null;
}

export interface Student {
  name: string;
  fatherName: string;
  jammat: string;
  roll: string;
  dakhila: string;
}

export type Page = 'home' | 'account';
