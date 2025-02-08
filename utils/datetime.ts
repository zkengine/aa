import { format } from 'date-fns';

export const dateFormat = (timestamp?: number | string, pattern = 'yyyy-MM-dd') => {
  return timestamp ? format(new Date(Number(timestamp)), pattern) : '-';
};

export const unixTimestampFormat = (timestamp?: number | string, pattern = 'yyyy-MM-dd') => {
  return timestamp ? format(new Date(Math.floor(Number(timestamp) * 1000)), pattern) : '-';
};

export const unixTimestampDateTimeFormat = (
  timestamp?: number | string,
  pattern = 'yyyy-MM-dd HH:mm:ss',
) => {
  return timestamp ? format(new Date(Math.floor(Number(timestamp) * 1000)), pattern) : '-';
};

export const toUnixTimestamp = (timestamp: number) => {
  return Math.floor(timestamp / 1000);
};
