export interface Goal {
  id: string;
  title: string;
  type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  achieved: boolean;
  rating: number;
}




