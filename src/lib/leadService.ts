import { Lead, LeadFormData } from '@/types/lead';

const LEADS_STORAGE_KEY = 'enspyre_leads';

export class LeadService {
  static getLeads(): Lead[] {
    try {
      const storedLeads = localStorage.getItem(LEADS_STORAGE_KEY);
      if (!storedLeads) return [];
      
      const leads = JSON.parse(storedLeads) as Lead[];
      // Convert createdAt strings back to Date objects
      return leads.map((lead) => ({
        ...lead,
        createdAt: new Date(lead.createdAt)
      }));
    } catch (error) {
      console.error('Error loading leads:', error);
      return [];
    }
  }

  static saveLead(leadData: LeadFormData): Lead {
    const lead: Lead = {
      id: crypto.randomUUID(),
      name: leadData.name,
      email: leadData.email,
      company: leadData.company,
      website: leadData.website,
      socialMedia: {
        linkedin: leadData.linkedin,
        twitter: leadData.twitter,
        facebook: leadData.facebook,
        instagram: leadData.instagram,
      },
      notes: leadData.notes,
      createdAt: new Date(),
      status: 'new'
    };

    const existingLeads = this.getLeads();
    const updatedLeads = [...existingLeads, lead];
    
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updatedLeads));
      return lead;
    } catch (error) {
      console.error('Error saving lead:', error);
      throw new Error('Failed to save lead');
    }
  }

  static updateLeadStatus(leadId: string, status: Lead['status']): void {
    const leads = this.getLeads();
    const updatedLeads = leads.map(lead => 
      lead.id === leadId ? { ...lead, status } : lead
    );
    
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updatedLeads));
    } catch (error) {
      console.error('Error updating lead status:', error);
      throw new Error('Failed to update lead status');
    }
  }

  static deleteLead(leadId: string): void {
    const leads = this.getLeads();
    const updatedLeads = leads.filter(lead => lead.id !== leadId);
    
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updatedLeads));
    } catch (error) {
      console.error('Error deleting lead:', error);
      throw new Error('Failed to delete lead');
    }
  }
}