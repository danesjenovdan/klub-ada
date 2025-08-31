import { format } from "date-fns";
import { sl } from "date-fns/locale";

export const formatDate = (date: string) => {
  return format(new Date(date), "PP", { locale: sl });
};

export const formatDayOfDate = (date: string) => {
  return format(new Date(date), "d", { locale: sl });
};

export const formatTime = (dateTime: string) => {
  const hour = format(new Date(dateTime), "H", { locale: sl });
  const minutes = format(new Date(dateTime), "mm", { locale: sl });
  return `${hour}.${minutes}`;
};
