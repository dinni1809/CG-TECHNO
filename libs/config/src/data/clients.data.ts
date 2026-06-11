export interface Client {
  id: string;
  name: string;
  industry: string;
  featured: boolean;
  abbreviation: string;
  description?: string;
}

export const clients: Client[] = [
  { id: 'c1', name: 'Bangalore Metropolitan Transport Corporation', abbreviation: 'BMTC', industry: 'Government', featured: true },
  { id: 'c2', name: 'Karnataka State Police', abbreviation: 'KSP', industry: 'Government', featured: true },
  { id: 'c3', name: 'Manipal Hospitals', abbreviation: 'MH', industry: 'Healthcare', featured: true },
  { id: 'c4', name: 'Infosys BPM', abbreviation: 'IBPM', industry: 'IT', featured: true },
  { id: 'c5', name: 'Canara Bank', abbreviation: 'CB', industry: 'Banking', featured: true },
  { id: 'c6', name: 'Indian Space Research Organisation', abbreviation: 'ISRO', industry: 'Government', featured: true },
  { id: 'c7', name: 'Wipro Limited', abbreviation: 'WIP', industry: 'IT', featured: true },
  { id: 'c8', name: 'Apollo Hospitals', abbreviation: 'AH', industry: 'Healthcare', featured: true },
  { id: 'c9', name: 'Syndicate Bank', abbreviation: 'SB', industry: 'Banking', featured: false },
  { id: 'c10', name: 'BESCOM', abbreviation: 'BES', industry: 'Government', featured: false },
  { id: 'c11', name: 'Mphasis Limited', abbreviation: 'MPH', industry: 'IT', featured: false },
  { id: 'c12', name: 'Narayana Health', abbreviation: 'NH', industry: 'Healthcare', featured: false },
];

export const industries = ['All', 'Government', 'IT', 'Healthcare', 'Banking'] as const;
