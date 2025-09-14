import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { 
  Users, 
  Mail, 
  Building, 
  Globe, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Instagram, 
  Calendar,
  Trash2,
  ExternalLink,
  Filter,
  Search
} from 'lucide-react';
import { Lead } from '@/types/lead';
import { LeadService } from '@/lib/leadService';

const LeadsManagement = () => {
  const leadsManagementRef = useRef<HTMLDivElement>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Lead['status'] | 'all'>('all');

  useEffect(() => {
    loadLeads();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [filterLeads]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.leads-grid',
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: 'power2.out', 
          scrollTrigger: { 
            trigger: '.leads-grid', 
            start: 'top 80%' 
          } 
        }
      );
    }, leadsManagementRef);

    return () => ctx.revert();
  }, []);

  const loadLeads = () => {
    const storedLeads = LeadService.getLeads();
    setLeads(storedLeads);
  };

  const filterLeads = useCallback(() => {
    let filtered = leads;

    if (searchTerm) {
      filtered = filtered.filter(lead => 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }

    setFilteredLeads(filtered);
  }, [leads, searchTerm, statusFilter]);

  const updateLeadStatus = (leadId: string, status: Lead['status']) => {
    LeadService.updateLeadStatus(leadId, status);
    loadLeads();
  };

  const deleteLead = (leadId: string) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      LeadService.deleteLead(leadId);
      loadLeads();
    }
  };

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-500/20 text-blue-300 border-blue-400/20';
      case 'contacted': return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/20';
      case 'interested': return 'bg-green-500/20 text-green-300 border-green-400/20';
      case 'converted': return 'bg-purple-500/20 text-purple-300 border-purple-400/20';
      case 'not_interested': return 'bg-red-500/20 text-red-300 border-red-400/20';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-400/20';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const statusOptions: { value: Lead['status'] | 'all'; label: string }[] = [
    { value: 'all', label: 'All Leads' },
    { value: 'new', label: 'New' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'interested', label: 'Interested' },
    { value: 'converted', label: 'Converted' },
    { value: 'not_interested', label: 'Not Interested' }
  ];

  return (
    <section id="leads-management" ref={leadsManagementRef} className="animate-on-scroll py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Manage <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Leads</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            View and manage your collected leads. Track their status and contact information.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:gap-4 md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
            <input
              type="text"
              placeholder="Search leads by name, email, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as Lead['status'] | 'all')}
              className="pl-12 pr-8 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 appearance-none"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-blue-400" />
            <div className="text-2xl font-bold text-foreground">{leads.length}</div>
            <div className="text-sm text-muted-foreground">Total Leads</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{leads.filter(l => l.status === 'new').length}</div>
            <div className="text-sm text-muted-foreground">New</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{leads.filter(l => l.status === 'interested').length}</div>
            <div className="text-sm text-muted-foreground">Interested</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{leads.filter(l => l.status === 'converted').length}</div>
            <div className="text-sm text-muted-foreground">Converted</div>
          </div>
        </div>

        {/* Leads Grid */}
        <div className="leads-grid">
          {filteredLeads.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No leads found</h3>
              <p className="text-muted-foreground">
                {leads.length === 0 
                  ? "Start collecting leads using the form above."
                  : "Try adjusting your search or filter criteria."
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">{lead.name}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${lead.email}`} className="hover:text-blue-400 transition-colors">
                          {lead.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => deleteLead(lead.id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Company and Website */}
                  {(lead.company || lead.website) && (
                    <div className="space-y-2 mb-4">
                      {lead.company && (
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                          <Building className="w-4 h-4" />
                          <span>{lead.company}</span>
                        </div>
                      )}
                      {lead.website && (
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                          <Globe className="w-4 h-4" />
                          <a 
                            href={lead.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-blue-400 transition-colors flex items-center gap-1"
                          >
                            {lead.website.replace(/^https?:\/\//, '')}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Social Media */}
                  <div className="flex gap-2 mb-4">
                    {lead.socialMedia.linkedin && (
                      <a 
                        href={lead.socialMedia.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-all duration-200"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {lead.socialMedia.twitter && (
                      <a 
                        href={lead.socialMedia.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-lg transition-all duration-200"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {lead.socialMedia.facebook && (
                      <a 
                        href={lead.socialMedia.facebook} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-500 rounded-lg transition-all duration-200"
                      >
                        <Facebook className="w-4 h-4" />
                      </a>
                    )}
                    {lead.socialMedia.instagram && (
                      <a 
                        href={lead.socialMedia.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 rounded-lg transition-all duration-200"
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {/* Notes */}
                  {lead.notes && (
                    <div className="mb-4">
                      <p className="text-muted-foreground text-sm bg-white/5 p-3 rounded-lg">
                        {lead.notes}
                      </p>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex justify-between items-center">
                    <select
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value as Lead['status'])}
                      className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(lead.status)} bg-transparent focus:outline-none`}
                    >
                      <option value="new" className="bg-gray-800">New</option>
                      <option value="contacted" className="bg-gray-800">Contacted</option>
                      <option value="interested" className="bg-gray-800">Interested</option>
                      <option value="converted" className="bg-gray-800">Converted</option>
                      <option value="not_interested" className="bg-gray-800">Not Interested</option>
                    </select>
                    
                    <div className="flex items-center gap-1 text-muted-foreground text-xs">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(lead.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LeadsManagement;