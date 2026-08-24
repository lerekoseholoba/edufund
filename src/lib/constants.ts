import {
  FieldOfStudy,
  Province,
  IncomeBracket,
  Bursary,
  StudyLevel,
} from '../types/bursary';

export const FIELDS_OF_STUDY: FieldOfStudy[] = [
  'Engineering',
  'Information Technology',
  'Commerce',
  'Health Sciences',
  'Law',
  'Education',
  'Humanities',
  'Natural Sciences',
];

export const PROVINCES: Province[] = [
  'Gauteng',
  'Western Cape',
  'KwaZulu-Natal',
  'Eastern Cape',
  'Free State',
  'Limpopo',
  'Mpumalanga',
  'North West',
  'Northern Cape',
];

export const INCOME_BRACKETS: IncomeBracket[] = [
  'Under R150,000',
  'R150,000 - R350,000',
  'R350,000 - R600,000',
  'Above R600,000',
];

export const FUNDING_TYPES: Bursary['fundingType'][] = [
  'Corporate',
  'NSFAS',
  'Government',
  'NGO',
];

export const STUDY_LEVELS: StudyLevel[] = [
  'Undergraduate',
  'Postgraduate',
  'Both',
];