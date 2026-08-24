export type FieldOfStudy =
  | 'Engineering'
  | 'Information Technology'
  | 'Commerce'
  | 'Health Sciences'
  | 'Law'
  | 'Education'
  | 'Humanities'
  | 'Natural Sciences';

export type Province =
  | 'Gauteng'
  | 'Western Cape'
  | 'KwaZulu-Natal'
  | 'Eastern Cape'
  | 'Free State'
  | 'Limpopo'
  | 'Mpumalanga'
  | 'North West'
  | 'Northern Cape';

export type IncomeBracket =
  | 'Under R150,000'
  | 'R150,000 - R350,000'
  | 'R350,000 - R600,000'
  | 'Above R600,000';

export type StudyLevel = 'Undergraduate' | 'Postgraduate' | 'Both';

export interface Bursary {
  id: string;
  title: string;
  provider: string;
  description: string;
  fieldsOfStudy: FieldOfStudy[];
  provinces: Province[];
  incomeBracket: IncomeBracket[];
  fundingType: 'Corporate' | 'NSFAS' | 'Government' | 'NGO';
  closingDate: string; // ISO date
  amount: string;
  requirements: string[];
  minimumAverage: string;
  workBackObligation: string;
  requiredDocuments: string[];
  benefits: string[];
  contactPerson: string;
  contactEmail: string;
  applicationUrl: string;
  studyLevel: StudyLevel;
}

export interface BursaryFilters {
  search?: string;
  province?: Province;
  fieldOfStudy?: FieldOfStudy;
  incomeBracket?: IncomeBracket;
  fundingType?: Bursary['fundingType'];
  studyLevel?: StudyLevel;
  page?: number;
}