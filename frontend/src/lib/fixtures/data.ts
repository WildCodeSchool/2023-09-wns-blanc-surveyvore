import { SortOption } from "@/types/sortOption.type";

// Array of sort options for surveys. We can add as many as we want.

export const sortOptions: SortOption[] = [
  {
    option: "Ordre alphabétique",
    icon: "sort-alpha-up",
  },
  {
    option: "Ordre anti-alphabétique",
    icon: "sort-alpha-down",
  },
  {
    option: "Nombre de questions",
    icon: "list-check",
  },
];

