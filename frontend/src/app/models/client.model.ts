export interface Client {
  _id?: string;
  clientRef: string;
  fullName: string;
  email: string;
  phone: string;
  riskCategory: 'Low' | 'Medium' | 'High';
  classification: string;
  advisor: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}
