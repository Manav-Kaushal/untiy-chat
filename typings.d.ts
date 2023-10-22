export type PricingTier = {
  name: string;
  id: string;
  href: string;
  priceMonthly: string | number | null;
  description: string;
  features: string[];
  checkout: boolean;
};
