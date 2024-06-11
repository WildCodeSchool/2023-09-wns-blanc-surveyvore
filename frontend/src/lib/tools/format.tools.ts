import { format } from "date-fns";

export const removeAccents = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const formatDate = (timestamp: number) => {
  return format(new Date(timestamp), "dd/MM/yyyy");
};

