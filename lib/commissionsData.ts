// /lib/commissionData.ts

// Define the structure for a commission item
export interface Commission {
    id: string; // Unique ID matching the query parameter
    title: string;
    numImages: number;
}

// Store the commission data
export const commissionsData: Commission[] = [
  {
    id: 'beautymakeup',
    title: 'Beauty & Makeup \nMM-Atelje by Medolina',
    numImages: 7
  },
  {
    id: 'gospodin-savrseni',
    title: 'Gospodin Savršeni',
    numImages: 17
  },
  {
    id: 'lelosi',
    title: 'LELOSI',
    numImages: 7
  },
  {
    id: 'schape',
    title: 'Schapé Design',
    numImages: 11
  }
];

// Helper function to find a commission by ID
export function getCommissionById(id: string | null): Commission | undefined {
    if (!id) return undefined;
    return commissionsData.find(commission => commission.id === id);
}