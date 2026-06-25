export type DataLoad<T> = {
  status: "loading" | "live" | "fallback" | "error";
  data?: T;
  error?: string;
};
