export type NavLink = {
  label: string;
  href: string;
};

export type TrustBadge = {
  image: string;
  label: string;
};

export type CategoryCard = {
  title: string;
  href: string;
  image: string;
  large?: boolean;
};

export type WhyRow = {
  title: string;
  body: string;
  image: string;
  imageFirst?: boolean;
  cta?: string;
};
