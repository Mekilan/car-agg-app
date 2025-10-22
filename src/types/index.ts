export type Brand = "BMW" | "Audi";

export interface Car {
  company: Brand;
  carId: string;
  model: string;
  year: number;
  volume: string;
  mileage: number | null;
  price: number;
  isNew: boolean; // local field, initial from backend
  pictureUrl?: string;
  title?: string;
  detailsUrl?: string;
  comment?: string | null;
}
