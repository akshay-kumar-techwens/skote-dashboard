export interface SubMenuItem {
  id: string;
  label: string;
  link: string;
}

export interface MenuItem {
  id: string;
  label?: string;
  icon?: any;
  link?: string;
  subItems?: SubMenuItem[];
  isSectionHeader?: boolean;
  title?: string;
}