export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  priceCents: number;
  currency: string;
  stock: number;
  category: Category | null;
  createdAt: string;
  updatedAt: string;
};
