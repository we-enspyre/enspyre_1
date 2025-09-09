export interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  website?: string;
  socialMedia: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  notes?: string;
  createdAt: Date;
  status: 'new' | 'contacted' | 'interested' | 'converted' | 'not_interested';
}

export interface LeadFormData {
  name: string;
  email: string;
  company?: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  notes?: string;
}