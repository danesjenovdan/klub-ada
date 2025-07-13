import { format } from "date-fns";
import { sl } from "date-fns/locale";

export const formatDate = (date: string) => {
  return format(date, "PP", { locale: sl });
};

export const formatTime = (dateTime: string) => {
  const hour = format(dateTime, "H", { locale: sl });
  const minutes = format(dateTime, "mm", { locale: sl });
  return `ob ${hour}.${minutes}`;
};
